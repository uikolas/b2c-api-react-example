import * as React from 'react';
import {ChangeEvent, ReactNode} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { Location } from 'history';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import { sendSearchAction } from 'src/shared/actions/Pages/Search';
import {ISearchPageData, RangeFacets, ValueFacets} from 'src/shared/interfaces/searchPageData';
import { TAppCurrency, ICategory } from 'src/shared/reducers/Common/Init';
import { pathProductPageBase, pathSearchPage } from 'src/shared/routes/contentRoutes';
import { AppMain } from '../../Common/AppMain';
import { ProductCard } from '../../Common/ProductCard';
import { connect } from './connect';
import { styles } from './styles';
import {sprykerTheme} from "src/shared/theme/sprykerTheme";
import {IProductLabel} from "src/shared/interfaces/product/index";
import {AppPageTitle} from "src/shared/components/Common/AppPageTitle/index";
import {SearchIntro} from "./SearchIntro";
import {CategoriesList} from "./CategoriesList";
import {SearchFilterList} from "./SearchFilterList";
import {SearchPageContext} from './context';
import {
  filterTypeFilter,
  filterTypeRange,
  IFilterItemToDelete,
  TActiveFilters,
  TActiveRangeFilters,
  TCategoryId,
  TFilterItemValue
} from "./types";
import {TRangeInputName} from "src/shared/components/UI/SprykerRangeFilter/index";
import {ActiveFiltersList} from "src/shared/components/Pages/SearchPage/ActiveFiltersList/index";
import {resetFilterSuccessText} from "src/shared/constants/messages/search";
import {validateRangeInputsError} from "src/shared/constants/messages/errors";
import {AppBackdrop} from "src/shared/components/Common/AppBackdrop/index";
import {SortPanel} from "src/shared/components/Pages/SearchPage/SortPanel/index";
import {FoundItems} from "src/shared/components/Pages/SearchPage/FoundItems/index";
import {SprykerSelect} from "src/shared/components/UI/SprykerSelect/index";

type IQuery = {
  q?: string,
  currency: TAppCurrency,
  sort?: string,
  category?: TCategoryId,
  [key: string]: string | number,
};

interface SearchPageProps extends WithStyles<typeof styles>, ISearchPageData {
  isLoading: boolean;
  changeLocation: Function;
  categoriesTree: ICategory[];
  location: Location;
  isFulfilled: boolean;
}

type RangeType = {min: number, max: number};

interface SearchPageState {
  activeFilters: TActiveFilters;
  activeRangeFilters: TActiveRangeFilters;
  sort: string;
  itemsPerPage: number;
  isFiltersReset: boolean;
  isNeedNewRequest: boolean;
  isReadyToNewRequest: boolean;
}

export const pageTitle = 'Results for ';
export const pageTitleDefault = 'Start searching';

@connect
export class SearchPageBase extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);

    const activeFilters: {[key: string]: string[]} = {};
    const activeRangeFilters: {[key: string]: RangeType} = {};

    props.filters.forEach((filter: ValueFacets) => {
      if (filter.activeValue && filter.activeValue.length) {
        activeFilters[filter.name] = filter.activeValue;
      }
    });

    props.rangeFilters.forEach((filter: RangeFacets) => {
      if (filter.activeMin && filter.activeMax) {
        activeRangeFilters[filter.name] = {min: filter.activeMin, max: filter.activeMax};
      }
    });

    this.state = {
      activeFilters,
      activeRangeFilters,
      sort: props.currentSort,
      itemsPerPage: props.pagination.currentItemsPerPage,
      isFiltersReset: false,
      isNeedNewRequest: false,
      isReadyToNewRequest: false,
    };

    if (!props.location.pathname.endsWith(pathSearchPage) && !props.location.pathname.endsWith(pathSearchPage + '/')) {
      this.makeLocationSearch();
    }
  }

  public componentDidUpdate = (prevProps: any, prevState: any): void => {
    // Init showing a message if filters is reset
    (prevState.isFiltersReset === false && this.state.isFiltersReset) ? toast.success(resetFilterSuccessText) : null;

    // Init new request if it's needed
    if (this.state.isReadyToNewRequest === true) {
      if (prevState.isReadyToNewRequest === false && this.state.isNeedNewRequest === true) {
        this.updateSearch();
        this.setState({isReadyToNewRequest: false});
      }
      if (this.state.isReadyToNewRequest === true && this.state.isNeedNewRequest === false) {
        this.setState({isReadyToNewRequest: false});
      }
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.makeLocationSearch();
    }
  }

  public categorySearch = (categoryId: TCategoryId): void => {
    const query: IQuery = {
      q: '',
      currency: this.props.currency,
      category: categoryId,
    };

    this.props.dispatch(sendSearchAction(query));

    let name: string = '';

    // TODO: DUPLICATE in selectCategory - should be fixed
    const searchName = (leaf: any) => {
      const path: string = `/${leaf.name.split(/\s+/).join('-')}`;
      name += path;

      if (leaf.nodeId === +categoryId) {
        return true;
      }

      if (Array.isArray(leaf.children) && leaf.children.length) {
        const result = leaf.children.some(searchName);

        if (!result) {
          name = name.replace(path, '');
        }

        return result;
      }

      name = name.replace(path, '');
      return false;
    };

    this.props.categoriesTree.some(searchName);

    this.props.changeLocation(`${pathSearchPage}${name}`);
  };

  public selectCategory = (categoryId: TCategoryId): any => (event: React.MouseEvent<HTMLElement>) => {

    const query: IQuery = {
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      include: '',
      ipp: this.state.itemsPerPage,
      category: categoryId,
      ...this.state.activeFilters,
    };

    Object.keys(this.state.activeRangeFilters).forEach((key: string) => {
      query[`${key.includes('price') ? 'price' : key}[min]`] = this.state.activeRangeFilters[key].min;
      query[`${key.includes('price') ? 'price' : key}[max]`] = this.state.activeRangeFilters[key].max;
    });

    this.props.dispatch(sendSearchAction(query));

    let name: string = '';

    // TODO: DUPLICATE in categorySearch - should be fixed
    const searchName = (leaf: any) => {
      const path: string = `/${leaf.name.split(/\s+/).join('-')}`;
      name += path;

      if (leaf.nodeId === +categoryId) {
        return true;
      }

      if (Array.isArray(leaf.children) && leaf.children.length) {
        const result = leaf.children.some(searchName);

        if (!result) {
          name = name.replace(path, '');
        }

        return result;
      }

      name = name.replace(path, '');
      return false;
    };

    this.props.categoriesTree.some(searchName);

    this.props.changeLocation(`${pathSearchPage}${name}`);
  };

  public labelSearch = (label: string): void => {
    const query: IQuery = {
      q: '',
      currency: this.props.currency,
      label,
    };

    this.props.dispatch(sendSearchAction(query));
  };

  public updateActiveFilters = (name: string, values: Array<string>) => {
    this.setState((prevState: SearchPageState) => ({
      activeFilters: {
        ...prevState.activeFilters,
        [name]: values
      },
      isFiltersReset: false,
      isNeedNewRequest: true,
    }));
  };

  public updateRangeFilters = (name: TRangeInputName, {min, max}: RangeType) => {
    this.setState((prevState: SearchPageState) => ({
      activeRangeFilters: {
        ...prevState.activeRangeFilters,
        [name]: {min, max},
      },
      isFiltersReset: false,
      isNeedNewRequest: true,
    }));
  };

  private validateRangeInput = (): boolean => {
    const activeRanges: {[key: string]: any} = {...this.state.activeRangeFilters};
    const defaultRanges = [...this.props.rangeFilters];
    let canMakeNewRequest: boolean = true;

    defaultRanges.forEach((filter: RangeFacets) => {
      if (activeRanges[filter.name]) {
        const defaultMin = this.rangeValueToFront(filter.min);
        const defaultMax = this.rangeValueToFront(filter.max);

        for (let prop in activeRanges[filter.name]) {
          if (activeRanges[filter.name][prop] < defaultMin
            || activeRanges[filter.name][prop] > defaultMax
          ) {
            canMakeNewRequest = false;
          }
        }
      }
    });
    return canMakeNewRequest;
  }

  public resetRangeFilterOneValue = ({name, rangeSubType}: IFilterItemToDelete): boolean => {
    if (!rangeSubType) {
      return false;
    }
    const defaultValuesArr = this.props.rangeFilters.filter((item: RangeFacets) => (item.name === name));
    if (!defaultValuesArr || !defaultValuesArr[0] || !defaultValuesArr[0][rangeSubType]) {
      return;
    }

    let defaultValue = this.rangeValueToFront(defaultValuesArr[0][rangeSubType]);

    this.setState((prevState: SearchPageState) => ({
      activeRangeFilters: {
        ...prevState.activeRangeFilters,
        [name]: {
          ...prevState.activeRangeFilters[name],
          [rangeSubType]: defaultValue,
        },
      },
      isFiltersReset: false,
      isNeedNewRequest: true,
    }));
    return true;
  }

  public resetFilterOneValue = ({name, value}: IFilterItemToDelete): boolean => {
    const values = [...this.state.activeFilters[name]]
      .filter((val: TFilterItemValue) => val !== value);

    this.updateActiveFilters(name, values);
    return true;
  }

  public updateSearch = (): boolean => {

    if(!this.validateRangeInput()) {
      console.error('can\'t make request in updateSearch method!!!');
      toast.error(validateRangeInputsError);
      return;
    }
    console.info('%c ++++ Run Request!!! ++++', 'background: #3d5afe; color: #ffea00');
    const query: IQuery = {
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      include: '',
      ipp: this.state.itemsPerPage,
      ...this.state.activeFilters,
    };

    if (this.props.currentCategory) {
      query.category = this.props.currentCategory;
    }

    Object.keys(this.state.activeRangeFilters).forEach((key: string) => {
      query[`${key.includes('price') ? 'price' : key}[min]`] = this.state.activeRangeFilters[key].min;
      query[`${key.includes('price') ? 'price' : key}[max]`] = this.state.activeRangeFilters[key].max;
    });

    this.props.dispatch(sendSearchAction(query));

    this.setState((prevState: SearchPageState) => ({
      ...prevState,
      isReadyToNewRequest: false,
      isNeedNewRequest: false,
    }));

    return true;
  };

  public handleSetSorting = (event: ChangeEvent<HTMLSelectElement>, child: ReactNode): void => {
    const result = this.runSetSorting(event.target.value);
  };

  public handleSetItemsPerPage = (event: ChangeEvent<HTMLSelectElement>, child: ReactNode): void => {
    const result = this.runSetItemsPerPage(+event.target.value);
  };

  public handlePagination = (e: any, value: number | string) => {
    const query: IQuery = {
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      include: '',
      ipp: this.state.itemsPerPage,
      page: value,
      ...this.state.activeFilters,
    };

    if (value === 'prev') {
      query.page = this.props.pagination.currentPage - 1;
    }

    if (value === 'next') {
      query.page = this.props.pagination.currentPage + 1;
    }

    if (this.props.currentCategory) {
      query.category = this.props.currentCategory;
    }

    Object.keys(this.state.activeRangeFilters).forEach((key: string) => {
      query[`${key.includes('price') ? 'price' : key}[min]`] = this.state.activeRangeFilters[key].min;
      query[`${key.includes('price') ? 'price' : key}[max]`] = this.state.activeRangeFilters[key].max;
    });

    this.props.dispatch(sendSearchAction(query));
  };

  public renderProduct = (sku: string, name: string) => {
    this.props.changeLocation(`${pathProductPageBase}/${sku}`);
  };

  public deleteActiveFilterHandler = (itemToDelete: IFilterItemToDelete): any =>
                                        (event: React.MouseEvent<HTMLElement>) => {
    if (itemToDelete.type === filterTypeFilter) {
      this.resetFilterOneValue(itemToDelete);
    } else if (itemToDelete.type === filterTypeRange) {
      this.resetRangeFilterOneValue(itemToDelete);
    }

    this.setState({isReadyToNewRequest: true});
  };

  public resetActiveFilters = (event: React.MouseEvent<HTMLDivElement>): void => {
    const resultReset = this.runResetActiveFilters();
  };

  public onCloseFilterHandler = (event: React.ChangeEvent<{}>): void => {
    this.setState({isReadyToNewRequest: true});
  }

  public onBlurRangeFiltersHandler = (event: React.ChangeEvent<{}>): void => {
    this.setState({isReadyToNewRequest: true});
  }

  private makeLocationSearch = (): void => {
    const nodeId: string = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
    if (nodeId && !Number.isNaN(parseInt(nodeId, 10))) {
      this.categorySearch(+nodeId);
    } else if (nodeId && nodeId === 'outlet') {
      this.labelSearch('SALE %');
    } else if (nodeId && nodeId === 'new') {
      this.labelSearch('NEW');
    }
  }

  private runResetActiveFilters = async (): Promise<any> => {
    await this.setState((prevState: SearchPageState) => {
      return ({
        ...prevState,
        activeFilters: {},
        activeRangeFilters: {},
        selectedCategory: null,
        isFiltersReset: true,
        isNeedNewRequest: false,
        isReadyToNewRequest: false,
      });
    });

    const resultUpdate = await this.updateSearch();
    return resultUpdate;
  }

  private runSetItemsPerPage = async (itemsPerPage: SearchPageState["itemsPerPage"]): Promise<any> => {
    await this.setState({itemsPerPage, isReadyToNewRequest: true});
    const resultUpdate = await this.updateSearch();
    return resultUpdate;
  }

  private runSetSorting = async (sortMode: SearchPageState["sort"]): Promise<any> => {
    await this.setState({sort: sortMode, isReadyToNewRequest: true});
    const resultUpdate = await this.updateSearch();
    return resultUpdate;
  }

  private rangeValueToFront = (value: number): number => (value / 100);

  private rangeValueToBack = (value: number): number => (value * 100);

  public render() {
    const {
      classes,
      items,
      searchTerm,
      currency,
      filters,
      rangeFilters,
      isLoading,
      sortParams,
      pagination,
      category,
      spellingSuggestion,
      categoriesTree,
      currentCategory,
    } = this.props;

    console.log('SearchPage props', this.props);
    console.log('SearchPage state', this.state);
    const isSortParamsExist = (sortParams.length);
    const pages: any[] = [];

    const start = pagination.currentPage <= 5 ? 1 : pagination.currentPage - 4;
    const end = pagination.maxPage > 5
      ? pagination.currentPage <= 5 ? 5 : pagination.currentPage
      : pagination.maxPage;

    for (let i = start; i <= end; i++) {
      pages.push(
        <BottomNavigationAction
          showLabel
          label={ i }
          value={ i }
          key={ `page-${i}` }
          className={ classes.pageNumber }
        />);
    }

    pages.push(
      <BottomNavigationAction
        showLabel
        icon={ <ChevronRight/> }
        value="next"
        key="next"
        className={ classes.pageNumber }
      />,
    );

    pages.unshift(
      <BottomNavigationAction
        showLabel
        icon={ <ChevronLeft/> }
        value="prev"
        key="prev"
        className={ classes.pageNumber }
      />,
    );

    // TODO: Get label programmatically
    const label: IProductLabel = {
      type: 'sale',
      text: 'Sale',
    };

    return (
      <AppMain>
        {isLoading ? <AppBackdrop isOpen={true} /> : null}
        <AppPageTitle
          title={searchTerm ? `${pageTitle} "${searchTerm}"` :  pageTitleDefault}
          intro={<SearchIntro className={classes.spellingSuggestion} spellingSuggestion={spellingSuggestion} />}
        />
        <Grid container>
          <SearchPageContext.Provider
            value={{
              selectCategoryHandler: this.selectCategory,
              deleteActiveFilterHandler: this.deleteActiveFilterHandler,
            }}
          >

            <Grid item xs={ 12 } sm={ 4 } md={ 3 }>
              <CategoriesList
                categories={category}
                categoriesTree={categoriesTree}
                selectedCategory={currentCategory}
              />
            </Grid>

            <Grid item xs={ 12 } sm={ 8 } md={ 9 }>
              <Grid container>

                <SearchFilterList
                  filters={filters}
                  updateFilterHandler={this.updateActiveFilters}
                  activeValuesFilters={this.state.activeFilters}
                  ranges={rangeFilters}
                  activeValuesRanges={this.state.activeRangeFilters}
                  updateRangeHandler={this.updateRangeFilters}
                  onCloseFilterHandler={this.onCloseFilterHandler}
                  onBlurRangeFilter={this.onBlurRangeFiltersHandler}
                  rangeValueToFront={this.rangeValueToFront}
                  isFiltersReset={this.state.isFiltersReset}
                />

                <ActiveFiltersList
                  activeValuesFilters={this.state.activeFilters}
                  activeValuesRanges={this.state.activeRangeFilters}
                  rangeFilters={rangeFilters}
                  resetHandler={this.resetActiveFilters}
                  rangeValueToFront={this.rangeValueToFront}
                />

                <SortPanel
                  foundItems={<FoundItems numberFound={this.props.pagination.numFound} />}
                  numberMode={<SprykerSelect
                                currentMode={this.state.itemsPerPage}
                                changeHandler={this.handleSetItemsPerPage}
                                menuItems={pagination.validItemsPerPageOptions.map((item: number) => ({
                                  value: item,
                                  name: item,
                                }))}
                                menuItemFirst={{
                                  value: " ",
                                  name: "products per page",
                                  disabled: true,
                                }}
                                name="pages"
                              />}
                  sorterMode={<SprykerSelect
                                currentMode={this.state.sort || " "}
                                changeHandler={this.handleSetSorting}
                                menuItems={sortParams.map((item: string) => ({
                                  value: item,
                                  name: `${item}`,
                                }))}
                                menuItemFirst={{
                                  value: " ",
                                  name: (!isSortParamsExist && !this.state.sort) ? "Choose sort mode" : "relevance",
                                  disabled: !isSortParamsExist,
                                }}
                                name="sort"
                                title={(isSortParamsExist) ? "Sort by " : null}
                              />}
                />

                <Grid item xs={ 12 } container spacing={ sprykerTheme.appFixedDimensions.gridSpacing }>
                  { items && items.length > 0
                    ? items.map((item: any) => (
                      <Grid item xs={ 12 } sm={ 6 } md={ 4 }
                            key={ item.abstract_sku || item.abstractSku }
                      >
                        <ProductCard
                          currency={ currency }
                          images={ item.images }
                          price={ item.price }
                          prices={ item.prices }
                          name={ item.abstract_name || item.abstractName }
                          sku={ item.abstract_sku || item.abstractSku }
                          onSelectProduct={ this.renderProduct }
                          label={label}
                        />
                      </Grid>
                    ))
                    : <Paper elevation={ 1 } className={ classes.empty } id="emptyResult">
                      <Typography variant="headline" component="h3">
                        Nothing to show.
                      </Typography>
                      <Typography component="p">
                        { isLoading ? 'Waiting results' : 'Try another search' }
                      </Typography>
                    </Paper>
                  }
                </Grid>

                <Grid item xs={ 12 } container justify="center" alignItems="center">
                  <BottomNavigation
                    value={ pagination.currentPage }
                    onChange={ this.handlePagination }
                    className={ classes.pagesContainer }
                  >
                    { pages }
                  </BottomNavigation>
                </Grid>

            </Grid>
            </Grid>

          </SearchPageContext.Provider>

        </Grid>
      </AppMain>
    );
  }
}

export const SearchPage = withStyles(styles)(SearchPageBase);

export default SearchPage;
