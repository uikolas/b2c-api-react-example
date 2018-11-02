import * as React from 'react';
import {ChangeEvent, ReactNode} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { Location } from 'history';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';

import { sendSearchAction } from 'src/shared/actions/Pages/Search';
import {ISearchPageData, RangeFacets, ValueFacets} from 'src/shared/interfaces/searchPageData';
import { ICategory } from 'src/shared/reducers/Common/Init';
import { pathProductPageBase, pathSearchPage } from 'src/shared/routes/contentRoutes';
import { AppMain } from '../../Common/AppMain';
import { connect } from './connect';
import { styles } from './styles';
import {AppPageTitle} from "src/shared/components/Common/AppPageTitle/index";
import {SearchIntro} from "./SearchIntro";
import {CategoriesList} from "./CategoriesList";
import {SearchFilterList} from "./SearchFilterList";
import {SearchPageContext} from './context';
import {
  filterTypeFilter,
  filterTypeRange,
  IFilterItemToDelete,
  ISearchQuery,
  rangeMaxType,
  rangeMinType,
  RangeType,
  TActiveFilters,
  TActiveRangeFilters,
  TCategoryId,
  TFilterItemValue,
} from "./types";
import {TRangeInputName} from "src/shared/components/UI/SprykerRangeFilter/index";
import {ActiveFiltersList} from "src/shared/components/Pages/SearchPage/ActiveFiltersList/index";
import {resetFilterSuccessText} from "src/shared/constants/messages/search";
import {validateRangeInputsError} from "src/shared/constants/messages/errors";
import {AppBackdrop} from "src/shared/components/Common/AppBackdrop/index";
import {SortPanel} from "src/shared/components/Pages/SearchPage/SortPanel/index";
import {FoundItems} from "src/shared/components/Pages/SearchPage/FoundItems/index";
import {SprykerSelect} from "src/shared/components/UI/SprykerSelect/index";
import {ProductsList} from "src/shared/components/Pages/SearchPage/ProductsList/index";
import {rangeFilterValueToFront} from "src/shared/helpers/common/transform";
import {AppPagination} from "src/shared/components/Common/AppPagination/index";
import {isValidRangeInput} from "src/shared/components/Pages/SearchPage/helper";

interface SearchPageProps extends WithStyles<typeof styles>, ISearchPageData {
  isLoading: boolean;
  changeLocation: Function;
  categoriesTree: ICategory[];
  location: Location;
  isFulfilled: boolean;
}

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
    // (prevState.isFiltersReset === false && this.state.isFiltersReset) ? toast.success(resetFilterSuccessText) : null;

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

    // if searchTerm was changed
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.runResetActiveFilters(false);
    }

  }

  public categorySearch = (categoryId: TCategoryId): void => {
    const query: ISearchQuery = {
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

    const query: ISearchQuery = {
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
    const query: ISearchQuery = {
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

  private validateData = (): boolean => {
    return isValidRangeInput(this.state.activeRangeFilters, this.props.rangeFilters);
  }

  public resetRangeFilterOneValue = ({name, rangeSubType}: IFilterItemToDelete): boolean => {
    if (!rangeSubType) {
      return false;
    }
    const defaultValuesArr = this.props.rangeFilters.filter((item: RangeFacets) => (item.name === name));
    if (!defaultValuesArr || !defaultValuesArr[0] || !defaultValuesArr[0][rangeSubType]) {
      return;
    }

    let defaultValue = rangeFilterValueToFront(defaultValuesArr[0][rangeSubType], rangeSubType);

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
    const values = [...this.state.activeFilters[name]].filter((val: TFilterItemValue) => val !== value);
    this.updateActiveFilters(name, values);
    return true;
  }

  public updateSearch = (): boolean => {

    if(!this.validateData()) {
      console.error('can\'t make request in updateSearch method!!!');
      toast.error(validateRangeInputsError);
      return;
    }
    console.info('%c ++++ Run Request!!! ++++', 'background: #3d5afe; color: #ffea00');
    const query: ISearchQuery = {
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

  public handlePagination = (event: ChangeEvent<{}>, value: number | string): void => {
    const query: ISearchQuery = {
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      include: '',
      ipp: this.state.itemsPerPage,
      page: value,
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
  };

  public onSelectProductHandler = (sku: string, name: string) => {
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

  private runResetActiveFilters = async (needUpdateSearch: boolean = true): Promise<any> => {
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

    if (needUpdateSearch) {
      const resultUpdate = await this.updateSearch();
    }

    return true;
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
    const isSortParamsExist = (sortParams.length > 0);
    const isProductsExist = (items.length > 0);
    const isCategoriesExist = (category.length > 0);

    const sortPanelNumberMode = (
      <SprykerSelect
        currentMode={this.state.itemsPerPage}
        changeHandler={this.handleSetItemsPerPage}
        menuItems={pagination.validItemsPerPageOptions.map((item: number) => ({value: item, name: item}))}
        menuItemFirst={{value: " ", name: "products per page", disabled: true}}
        name="pages"
      />);

    const sortPanelSorterMode = (
      <SprykerSelect
        currentMode={this.state.sort || " "}
        changeHandler={this.handleSetSorting}
        menuItems={sortParams.map((item: string) => ({value: item, name: `${item}`}))}
        menuItemFirst={{
          value: " ",
          name: (!isSortParamsExist && !this.state.sort) ? "Choose sort mode" : "relevance",
          disabled: !isSortParamsExist,
        }}
        name="sort"
        title={(isSortParamsExist) ? "Sort by " : null}
      />
    );

    return (
      <AppMain>
        {isLoading ? <AppBackdrop isOpen={true} /> : null}
        <AppPageTitle
          title={searchTerm ? `${pageTitle} "${searchTerm}"` :  pageTitleDefault}
          intro={<SearchIntro className={classes.spellingSuggestion} spellingSuggestion={spellingSuggestion} />}
        />
        <Grid container className={classes.container}>
          <SearchPageContext.Provider
            value={{
              selectCategoryHandler: this.selectCategory,
              deleteActiveFilterHandler: this.deleteActiveFilterHandler,
            }}
          >

            <Grid item xs={isCategoriesExist ? 12 : null} md={isCategoriesExist ? 3 : null}>
              <CategoriesList
                categories={category}
                categoriesTree={categoriesTree}
                selectedCategory={currentCategory}
              />
            </Grid>

            <Grid item xs={12} md={isCategoriesExist ? 9 : 12}>
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
                  isFiltersReset={this.state.isFiltersReset}
                  isProductsExist={isProductsExist}
                />
                <ActiveFiltersList
                  activeValuesFilters={this.state.activeFilters}
                  activeValuesRanges={this.state.activeRangeFilters}
                  rangeFilters={rangeFilters}
                  resetHandler={this.resetActiveFilters}
                />
                <SortPanel
                  foundItems={<FoundItems numberFound={this.props.pagination.numFound} />}
                  numberMode={sortPanelNumberMode}
                  sorterMode={sortPanelSorterMode}
                  isProductsExist={isProductsExist}
                />
                <ProductsList
                  products={items}
                  selectProductHandler={this.onSelectProductHandler}
                  currency={currency}
                  isLoading={!!isLoading}
                />
                <AppPagination pagination={pagination} onChangeHandler={this.handlePagination} />

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
