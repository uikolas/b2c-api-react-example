import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import { getCategoriesAction, sendSearchAction } from 'src/shared/actions/Pages/Search';
import {ISearchPageData, RangeFacets, ValueFacets} from 'src/shared/interfaces/searchPageData';
import { TAppCurrency } from 'src/shared/reducers/Common/Init';
import { pathProductPageBase, pathSearchPage } from 'src/shared/routes/contentRoutes';
import { AppMain } from '../../Common/AppMain';
import { ProductCard } from '../../Common/ProductCard';
import { connect } from './connect';
import { styles } from './styles';
import {sprykerTheme} from "src/shared/theme/sprykerTheme";
import {IProductLabel} from "src/shared/interfaces/product/index";
import {AppPageTitle} from "src/shared/components/Common/AppPageTitle/index";
import {SearchIntro} from "src/shared/components/Pages/SearchPage/SearchIntro/index";
import {CategoriesList} from "src/shared/components/Pages/SearchPage/CategoriesList/index";
import {SearchFilterList} from "src/shared/components/Pages/SearchPage/SearchFilterList/index";
import {SearchPageContext} from './context';
import {
  filterTypeFilter,
  filterTypeRange,
  IFilterItemToDelete,
  TActiveFilters, TActiveRangeFilters, TCategoryId, TFilterItemName,
  TFilterItemValue
} from "src/shared/components/Pages/SearchPage/types";
import {TRangeInputName} from "src/shared/components/UI/SprykerRangeFilter/index";
import {ActiveFiltersList} from "src/shared/components/Pages/SearchPage/ActiveFiltersList/index";
import {resetFilterErrorText, resetFilterSuccessText} from "src/shared/constants/messages/search";

type IQuery = {
  q?: string,
  currency: TAppCurrency,
  sort?: string,
  [key: string]: string | number,
};

// TODO: Should be full list of props
interface SearchPageProps extends WithStyles<typeof styles>, ISearchPageData {
  isLoading: boolean;
  changeLocation: Function;
  isFulfilled: boolean;
}

type RangeType = {min: number, max: number};

interface SearchPageState {
  activeFilters: TActiveFilters;
  activeRangeFilters: TActiveRangeFilters;
  sort: string;
  selectedCategory: TCategoryId;
  itemsPerPage: number;
  isFiltersReset: boolean;
  isNeedNewRequest: boolean;
  isReadyToNewRequest: boolean;
}

export const pageTitle = 'Results for ';
export const pageTitleDefault = 'All products';

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
      selectedCategory: props.currentCategory,
      itemsPerPage: props.pagination.currentItemsPerPage,
      isFiltersReset: false,
      isNeedNewRequest: false,
      isReadyToNewRequest: false,
    };
  }

  public componentDidMount() {
    this.props.dispatch(getCategoriesAction());
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    // Init showing a message if filters is reset
    (prevState.isFiltersReset === false && this.state.isFiltersReset) ? toast.success(resetFilterSuccessText) : null;

    // Init new request if it's needed
    if (this.state.isReadyToNewRequest === true) {
      if (prevState.isReadyToNewRequest === false && this.state.isNeedNewRequest === true) {
        console.info('%c ++++ Run Request!!! ++++', 'background: #3d5afe; color: #ffea00');
        this.updateSearch();
        this.setState({isReadyToNewRequest: false});
      }
      if (this.state.isReadyToNewRequest === true && this.state.isNeedNewRequest === false) {
        this.setState({isReadyToNewRequest: false});
      }
    }
  }

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

  public resetRangeFilterOneValue = ({name, rangeSubType}: IFilterItemToDelete): boolean => {
    if (!rangeSubType) {
      return false;
    }
    const defaultValuesArr = this.props.rangeFilters.filter((item: RangeFacets) => (item.name === name));
    if (!defaultValuesArr || !defaultValuesArr[0] || !defaultValuesArr[0][rangeSubType]) {
      return;
    }
    this.setState((prevState: SearchPageState) => ({
      activeRangeFilters: {
        ...prevState.activeRangeFilters,
        [name]: {
          ...prevState.activeRangeFilters[name],
          [rangeSubType]: (defaultValuesArr[0][rangeSubType] / 100),
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
    const query: IQuery = {
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      include: '',
      ipp: this.state.itemsPerPage,
      ...this.state.activeFilters,
    };

    if (this.state.selectedCategory) {
      query.category = this.state.selectedCategory;
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

  public handleSetSorting = (e: any) => {
    this.setState({sort: e.target.value});
  };

  public handleSetItemsPerPage = (e: any) => {
    this.setState({itemsPerPage: e.target.value});
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

    if (this.state.selectedCategory) {
      query.category = this.state.selectedCategory;
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

  public selectCategory = (categoryId: TCategoryId): any => (event: React.MouseEvent<HTMLElement>) => {
    this.setState({selectedCategory: categoryId});

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

    const searchName = (leaf: any) => {
      const path: string = `/${leaf.name.split(/\s+/).join('-')}`;
      name += path;

      if (leaf.nodeId === categoryId) {
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

  public deleteActiveFilterHandler = (itemToDelete: IFilterItemToDelete): any =>
                                        (event: React.MouseEvent<HTMLElement>) => {
    if (itemToDelete.type === filterTypeFilter) {
      this.resetFilterOneValue(itemToDelete);
    } else if (itemToDelete.type === filterTypeRange) {
      this.resetRangeFilterOneValue(itemToDelete);
    }

    this.setState({isReadyToNewRequest: true});
  };

  private runResetActiveFilters = async (event: any): Promise<any> => {
    await this.setState((prevState: SearchPageState) => {
      return ({
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

  public resetActiveFilters = (event: React.MouseEvent<HTMLDivElement>): void => {
    const resultReset = this.runResetActiveFilters(event);
  };

  public onCloseFilterHandler = (event: React.ChangeEvent<{}>): void => {
    this.setState({isReadyToNewRequest: true});
  }

  public onBlurRangeFiltersHandler = (event: React.ChangeEvent<{}>): void => {
    this.setState({isReadyToNewRequest: true});
  }

  private numberToPrice = (value: number): number => (value / 100);

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
    } = this.props;

    console.log('SearchPage props', this.props);
    console.log('SearchPage state', this.state);
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
                selectedCategory={this.state.selectedCategory}
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
                  numberToPrice={this.numberToPrice}
                />

                <ActiveFiltersList
                  activeValuesFilters={this.state.activeFilters}
                  activeValuesRanges={this.state.activeRangeFilters}
                  rangeFilters={this.props.rangeFilters}
                  resetHandler={this.resetActiveFilters}
                  numberToPrice={this.numberToPrice}
                />

                <Grid item xs={ 12 } container className={ classes.buttonsRow }>
                  <Grid item xs={ 3 }>
                    <Button variant="contained" color="primary" onClick={ this.updateSearch }>
                      Filter
                    </Button>
                  </Grid>
                  <Grid item xs={ 6 }>
                    <FormControl>
                      <Select
                        value={ this.state.itemsPerPage }
                        onChange={ this.handleSetItemsPerPage }
                        name="pages"
                      >
                        {
                          pagination.validItemsPerPageOptions.map((qty: number) => (
                            <MenuItem value={ qty } key={ `pages-${qty}` }>
                              { qty }
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                    <FormControl className={ classes.formControl }>
                      <Select
                        value={ this.state.sort }
                        onChange={ this.handleSetSorting }
                        name="sort"
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Sorting...
                        </MenuItem>
                        {
                          sortParams && sortParams.map((param) => <MenuItem value={ param }
                                                                            key={ `sort-${param}` }>{ param }</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={ 3 }>
                    <Button variant="contained" color="primary" onClick={ this.updateSearch }>
                      Sort
                    </Button>
                  </Grid>
                </Grid>

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
