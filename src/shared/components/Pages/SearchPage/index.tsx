import * as React from 'react';
import { ChangeEvent, ReactNode } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';

import { sendSearchAction } from 'src/shared/actions/Pages/Search';
import { RangeFacets, ValueFacets } from 'src/shared/interfaces/searchPageData';
import { ICategory } from 'src/shared/reducers/Common/Init';
import { pathProductPageBase, pathSearchPage } from 'src/shared/routes/contentRoutes';
import { AppMain } from '../../Common/AppMain';
import { connect } from './connect';
import { styles } from './styles';
import { AppPageTitle } from 'src/shared/components/Common/AppPageTitle';
import { SearchIntro } from './SearchIntro';
import { CategoriesList } from './CategoriesList';
import { SearchFilterList } from './SearchFilterList';
import { SearchPageContext } from './context';
import {
  filterTypeFilter,
  filterTypeRange,
  IFilterItemToDelete,
  ISearchPageProps,
  ISearchPageState,
  ISearchQuery,
  RangeType,
  TCategoryId,
  TFilterItemValue,
} from './types';
import { TRangeInputName } from 'src/shared/components/UI/SprykerRangeFilter';
import { ActiveFiltersList } from 'src/shared/components/Pages/SearchPage/ActiveFiltersList';
import { validateRangeInputsError } from 'src/shared/constants/messages/errors';
import { AppBackdrop } from 'src/shared/components/Common/AppBackdrop';
import { SortPanel } from 'src/shared/components/Pages/SearchPage/SortPanel';
import { FoundItems } from 'src/shared/components/Pages/SearchPage/FoundItems';
import { SprykerSelect } from 'src/shared/components/UI/SprykerSelect';
import { ProductsList } from 'src/shared/components/Pages/SearchPage/ProductsList';
import { rangeFilterValueToFront } from 'src/shared/helpers/common/transform';
import { AppPagination } from 'src/shared/components/Common/AppPagination';
import { isValidRangeInput } from 'src/shared/components/Pages/SearchPage/helper';


export const pageTitle = 'Results for ';
export const pageTitleDefault = 'Start searching';

@connect
export class SearchPageBase extends React.Component<ISearchPageProps, ISearchPageState> {
  constructor(props: ISearchPageProps) {
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

  public componentDidUpdate = (prevProps: ISearchPageProps, prevState: ISearchPageState): void => {
    // Init showing a message if filters is reset
    // (prevState.isFiltersReset === false && this.state.isFiltersReset) ? toast.success(resetFilterSuccessText) : null;

    // Init new request if it's needed
    if (this.state.isReadyToNewRequest) {
      if (!prevState.isReadyToNewRequest && this.state.isNeedNewRequest) {
        this.updateSearch();
        this.setState({isReadyToNewRequest: false});
      }
      if (this.state.isReadyToNewRequest && !this.state.isNeedNewRequest) {
        this.setState({isReadyToNewRequest: false});
      }
    }

    if (!prevProps.categoriesTree.length && this.props.categoriesTree.length) {
      this.searchAfterInitCategories();
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.makeLocationSearch();
    }

    // if searchTerm was changed
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.runResetActiveFilters(false);
    }
  };

  private getCategoryNameById = (categoryId: TCategoryId): string => {
    let name: string = '';

    const searchName = (leaf: ICategory) => {
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

    return name;
  };

  public categorySearch = (categoryId: TCategoryId): void => {
    const query: ISearchQuery = {
      q: '',
      currency: this.props.currency,
      category: categoryId,
    };

    this.props.dispatch(sendSearchAction(query));

    const name: string = this.getCategoryNameById(categoryId);

    if (this.props.location.pathname !== `${pathSearchPage}${name}`) {
      this.props.changeLocation(`${pathSearchPage}${name}`);
    }
  };

  public selectCategory = (categoryId: TCategoryId): any => (event: React.MouseEvent<HTMLElement>) => {

    const query: ISearchQuery = {
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      ipp: this.state.itemsPerPage,
      category: categoryId,
      ...this.state.activeFilters,
    };

    Object.keys(this.state.activeRangeFilters).forEach((key: string) => {
      query[`${key.includes('price') ? 'price' : key}[min]`] = this.state.activeRangeFilters[key].min;
      query[`${key.includes('price') ? 'price' : key}[max]`] = this.state.activeRangeFilters[key].max;
    });

    this.props.dispatch(sendSearchAction(query));

    const name: string = this.getCategoryNameById(categoryId);

    if (this.props.location.pathname !== `${pathSearchPage}${name}`) {
      this.props.changeLocation(`${pathSearchPage}${name}`);
    }
  };

  public labelSearch = (label: string): void => {
    const query: ISearchQuery = {
      q: '',
      currency: this.props.currency,
      label,
    };

    this.props.dispatch(sendSearchAction(query));
  };

  public searchAfterInitCategories = (): void => {
    const nodeId: string = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);

    const name = nodeId.split('-').join(' ');
    let id: number | string = 0;

    const searchNodeId = (leaf: ICategory) => {
      if (leaf.name === name) {
        id = leaf.nodeId;
        return true;
      }

      if (leaf.name.includes('/') && leaf.name.endsWith(name)) {
        id = leaf.nodeId;
        return true;
      }

      if (Array.isArray(leaf.children) && leaf.children.length) {
        const result = leaf.children.some(searchNodeId);
        return result;
      }

      return false;
    };

    this.props.categoriesTree.some(searchNodeId);

    if (id) {
      this.categorySearch(+id);
    }
  };

  public updateActiveFilters = (name: string, values: Array<string>) => {
    this.setState((prevState: ISearchPageState) => ({
      activeFilters: {
        ...prevState.activeFilters,
        [name]: values,
      },
      isFiltersReset: false,
      isNeedNewRequest: true,
    }));
  };

  public updateRangeFilters = (name: TRangeInputName, {min, max}: RangeType) => {
    this.setState((prevState: ISearchPageState) => ({
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
  };

  public resetRangeFilterOneValue = ({name, rangeSubType}: IFilterItemToDelete): boolean => {
    if (!rangeSubType) {
      return false;
    }
    const defaultValuesArr = this.props.rangeFilters.filter((item: RangeFacets) => (item.name === name));
    if (!defaultValuesArr || !defaultValuesArr[0] || !defaultValuesArr[0][rangeSubType]) {
      return;
    }

    let defaultValue = rangeFilterValueToFront(defaultValuesArr[0][rangeSubType], rangeSubType);

    this.setState((prevState: ISearchPageState) => ({
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
  };

  public resetFilterOneValue = ({name, value}: IFilterItemToDelete): boolean => {
    const values = [...this.state.activeFilters[name]].filter((val: TFilterItemValue) => val !== value);
    this.updateActiveFilters(name, values);
    return true;
  };

  public updateSearch = (): boolean => {

    if (!this.validateData()) {
      console.error('can\'t make request in updateSearch method!!!');
      toast.error(validateRangeInputsError);
      return;
    }
    console.info('%c ++++ Run Request!!! ++++', 'background: #3d5afe; color: #ffea00');
    const query: ISearchQuery = {
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
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

    this.setState((prevState: ISearchPageState) => ({
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

  public onSelectProductHandler = (sku: string) => {
    this.props.changeLocation(`${pathProductPageBase}/${sku}`);
  };

  public deleteActiveFilterHandler = (itemToDelete: IFilterItemToDelete): any =>
    (event: React.MouseEvent<HTMLElement>) => {
      if (itemToDelete.type === filterTypeFilter) {
        this.resetFilterOneValue(itemToDelete);
      } else {
        if (itemToDelete.type === filterTypeRange) {
          this.resetRangeFilterOneValue(itemToDelete);
        }
      }

      this.setState({isReadyToNewRequest: true});
    };

  public resetActiveFilters = (event: React.MouseEvent<HTMLDivElement>): void => {
    const resultReset = this.runResetActiveFilters();
  };

  public onCloseFilterHandler = (event: React.ChangeEvent<{}>): void => {
    this.setState({isReadyToNewRequest: true});
  };

  public onAfterChangeRangeFilterHandler = (value: number[]): void => {
    this.setState({isReadyToNewRequest: true});
  };

  private makeLocationSearch = (): void => {
    const nodeId: string = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
    if (nodeId && !Number.isNaN(parseInt(nodeId, 10))) {
      this.categorySearch(+nodeId);
    } else {
      if (nodeId && nodeId === 'outlet') {
        this.labelSearch('SALE %');
      } else {
        if (nodeId && nodeId === 'new') {
          this.labelSearch('NEW');
        }
      }
    }
  };

  private runResetActiveFilters = async (needUpdateSearch: boolean = true): Promise<any> => {
    await this.setState((prevState: ISearchPageState) => {
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
  };

  private runSetItemsPerPage = async (itemsPerPage: ISearchPageState['itemsPerPage']): Promise<any> => {
    await this.setState({itemsPerPage, isReadyToNewRequest: true});
    const resultUpdate = await this.updateSearch();
    return resultUpdate;
  };

  private runSetSorting = async (sortMode: ISearchPageState['sort']): Promise<any> => {
    await this.setState({sort: sortMode, isReadyToNewRequest: true});
    const resultUpdate = await this.updateSearch();
    return resultUpdate;
  };

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
      productsLabeled,
      availableLabels,
    } = this.props;

    const isSortParamsExist = (sortParams.length > 0);
    const isProductsExist = (items.length > 0);
    const isCategoriesExist = (category.length > 0);

    const sortPanelNumberMode = (
      <SprykerSelect
        currentMode={ this.state.itemsPerPage }
        changeHandler={ this.handleSetItemsPerPage }
        menuItems={ pagination.validItemsPerPageOptions.map((item: number) => ({value: item, name: item})) }
        menuItemFirst={ {value: ' ', name: 'products per page', disabled: true} }
        name="pages"
      />);

    const sortPanelSorterMode = (
      <SprykerSelect
        currentMode={ this.state.sort || ' ' }
        changeHandler={ this.handleSetSorting }
        menuItems={ sortParams.map((item: string) => ({value: item, name: `${item}`})) }
        menuItemFirst={ {
          value: ' ',
          name: (!isSortParamsExist && !this.state.sort) ? 'Choose sort mode' : 'relevance',
          disabled: !isSortParamsExist,
        } }
        name="sort"
        title={ (isSortParamsExist) ? 'Sort by ' : null }
      />
    );

    return (
      <AppMain>
        { isLoading ? <AppBackdrop isOpen={ true }/> : null }
        <AppPageTitle
          title={ searchTerm ? `${pageTitle} "${searchTerm}"` : pageTitleDefault }
          intro={ <SearchIntro className={ classes.spellingSuggestion } spellingSuggestion={ spellingSuggestion }/> }
        />
        <Grid container className={ classes.container }>
          <SearchPageContext.Provider
            value={ {
              selectCategoryHandler: this.selectCategory,
              deleteActiveFilterHandler: this.deleteActiveFilterHandler,
            } }
          >

            <Grid item xs={ isCategoriesExist ? 12 : null } md={ isCategoriesExist ? 3 : null }>
              <CategoriesList
                categories={ category }
                categoriesTree={ categoriesTree }
                selectedCategory={ currentCategory }
              />
            </Grid>

            <Grid item xs={ 12 } md={ isCategoriesExist ? 9 : 12 }>
              <Grid container>

                <SearchFilterList
                  filters={ filters }
                  updateFilterHandler={ this.updateActiveFilters }
                  activeValuesFilters={ this.state.activeFilters }
                  ranges={ rangeFilters }
                  activeValuesRanges={ this.state.activeRangeFilters }
                  updateRangeHandler={ this.updateRangeFilters }
                  onCloseFilterHandler={ this.onCloseFilterHandler }
                  onAfterChangeRangeFilter={ this.onAfterChangeRangeFilterHandler }
                  isFiltersReset={ this.state.isFiltersReset }
                  isProductsExist={ isProductsExist }
                />
                <ActiveFiltersList
                  activeValuesFilters={ this.state.activeFilters }
                  activeValuesRanges={ this.state.activeRangeFilters }
                  rangeFilters={ rangeFilters }
                  resetHandler={ this.resetActiveFilters }
                />
                <SortPanel
                  foundItems={ <FoundItems numberFound={ pagination.numFound }/> }
                  numberMode={ sortPanelNumberMode }
                  sorterMode={ sortPanelSorterMode }
                  isProductsExist={ isProductsExist }
                />
                <ProductsList
                  products={ items }
                  selectProductHandler={ this.onSelectProductHandler }
                  currency={ currency }
                  isLoading={ !!isLoading }
                  productsLabeled={ productsLabeled }
                  availableLabels={ availableLabels }
                />
                <AppPagination pagination={ pagination } onChangeHandler={ this.handlePagination }/>

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
