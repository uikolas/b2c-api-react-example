import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { push } from 'react-router-redux';

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {SprykerFilterElement} from '../../../components/UI/SprykerFilter';
import {SprykerRange} from '../../../components/UI/SprykerRangeFilter';
import {SprykerButton} from '../../../components/UI/SprykerButton';
import {getProductDataAction} from '../../../actions/Pages/Product';
import {sendSearchAction, getCategoriesAction} from '../../../actions/Pages/Search';

import {AppMain} from '../../Common/AppMain';
import {ProductCard} from '../../Common/ProductCard';
import {ISearchPageData} from "../../../interfaces/searchPageData";
import config from '../../../config';

import {styles} from './styles';


interface SearchPageProps extends WithStyles<typeof styles>, ISearchPageData {
  isLoading: boolean;
}

interface SearchPageState {
  activeFilters: object;
  rangeFilters: object;
  sort: string;
  selectedCategory: number | string;
}

export const pageTitle = 'Search results for ';

export class SearchPageBase extends React.Component<SearchPageProps, SearchPageState> {

  public componentWillMount() {
    this.props.dispatch(getCategoriesAction());
  }

  public state: SearchPageState = {
    activeFilters: {},
    rangeFilters: {},
    sort: '',
    selectedCategory: 0,
  }

  public updateActiveFilters = (name: string, values: Array<string>) => {
    this.setState((prevState) => ({activeFilters: {...prevState.activeFilters, [name]: values}}));
  }

  public updateRangeFilters = (name: string, values: {min: number | string, max: number | string}) => {
    this.setState((prevState) => ({rangeFilters: {...prevState.rangeFilters, [name]:  {min: values.min, max: values.max}}}));
  }

  public updateSearch = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.dispatch(sendSearchAction({
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      ...this.state.activeFilters,
    }));
  }

  public handleSetSorting = (e: any) => {
    this.setState({sort: e.target.value})
  }

  public handlePagination = (e: any, value: number | string) => {
    this.props.dispatch(sendSearchAction({
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      page: value,
      ...this.state.activeFilters,
    }));
  }

  public renderProduct = (sku: string, name: string) => {
    this.props.dispatch(getProductDataAction(sku));
    this.props.dispatch(push(`${config.WEB_PATH}product/${name}`));
  }

  public selectCategory = (category: string | number) => (e: any) => {
    this.setState({selectedCategory: category});
    this.props.dispatch(sendSearchAction({
      q: this.props.searchTerm,
      currency: this.props.currency,
      sort: this.state.sort,
      category,
      ...this.state.activeFilters,
    }));
  }

  public render() {
    const { classes, items, searchTerm, currency, filters, rangeFilters, isLoading, sortParams, pagination, categories } = this.props;

    const renderFilters: any[] = [];

    if (filters && filters.length) {
      filters.forEach((filter: any) => {
        if (Array.isArray(filter.values) && filter.values.length) {
          renderFilters.push(
            <Grid item xs={3} key={filter.name}>
              <SprykerFilterElement
                attributeName={filter.name}
                menuItems={filter.values}
                handleChange={this.updateActiveFilters}
              />
            </Grid>
          );
        }
      });
    }

    const renderRangeFilters = rangeFilters && rangeFilters.length
      ? rangeFilters.map((filter: any) => (
        <Grid item xs={4} key={filter.name}>
          <SprykerRange
            attributeName={filter.name}
            min={filter.min} max={filter.max}
            handleChange={this.updateRangeFilters}
          />
        </Grid>
      ))
      : null;

    const pages = [];

    for (let i = 1; i <= pagination.maxPage; i++) {
      pages.push(
        <BottomNavigationAction
          showLabel
          label={i}
          value={i}
          key={`page-${i}`}
          className={classes.pageNumber}
        />);
    }

    const categoryList = categories.map((category) => {
      const pureListItem = (data: any) => (
        <ListItem
          button
          key={`category-${data.nodeId}`}
          onClick={this.selectCategory(data.nodeId)}
          selected={this.state.selectedCategory === data.nodeId}
        >
          <ListItemText primary={data.name} />
        </ListItem>
      );

      const nestedList = (data: any) => (
        <li key={`category-${data.nodeId}`}>
          <ListItem button onClick={this.selectCategory(data.nodeId)} selected={this.state.selectedCategory === data.nodeId}>
            <ListItemText primary={data.name} />
          </ListItem>
          <List dense className={classes.nestedList}>
            {
              data.children.map((child: any) => {
                return Array.isArray(child.children) && child.children.length
                  ? nestedList(child)
                  : pureListItem(child);
              })
            }
          </List>
        </li>
      );

      return Array.isArray(category.children) && category.children.length
        ? nestedList(category)
        : pureListItem(category);
    });


    return (
      <React.Fragment>
        <AppMain isLoading={isLoading}>
          <Grid container
                justify="center"
                alignItems="center"
          >
            {searchTerm
              ? <Typography variant="title" color="inherit" align="center" className={classes.pageHeader} id="pageTitle">
                  {pageTitle}
                  <Typography variant="title" component="span" className={classes.searchTerm} id="searchTerm" >
                    {searchTerm}
                  </Typography>
                </Typography>
              : null
            }
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <List
                component="nav"
                subheader={<ListSubheader component="div">Categories</ListSubheader>}
              >
                {categoryList}
              </List>
            </Grid>
            <Grid item xs={9} container>
              {renderFilters}

              {/*{renderRangeFilters}*/}

              <Grid item xs={12} container className={classes.buttonsRow}>
                <Grid
                  item
                  xs={3}
                >
                  <Button variant="contained" color="primary" onClick={this.updateSearch}>
                    Filter
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <FormControl className={classes.formControl}>
                    <Select
                      value={this.state.sort}
                      onChange={this.handleSetSorting}
                      name="sort"
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Sorting...
                      </MenuItem>
                      {
                        sortParams && sortParams.map((param) => <MenuItem value={param} key={`sort-${param}`}>{param}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" onClick={this.updateSearch}>
                    Sort
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                spacing={32}
              >
                {
                  items && items.length > 0
                    ? items.map((item: any) => (
                      <Grid item xs={12} sm={6} md={3}
                            key={item.abstract_sku || item.abstractSku}
                      >
                        <ProductCard
                          currency={currency}
                          images={item.images}
                          price={item.price}
                          prices={item.prices}
                          abstract_name={item.abstract_name || item.abstractName}
                          abstract_sku={item.abstract_sku || item.abstractSku}
                          onSelectProduct={this.renderProduct}
                        />
                      </Grid>
                    ))
                    : <Paper elevation={1} className={classes.empty} id="emptyResult" >
                      <Typography variant="headline" component="h3">
                        Nothing to show.
                      </Typography>
                      <Typography component="p">
                        {isLoading ? 'Waiting results' : 'Try another search'}
                      </Typography>
                    </Paper>
                }
              </Grid>
              <Grid item xs={12} container justify="center" alignItems="center">
                <BottomNavigation
                  value={pagination.currentPage}
                  onChange={this.handlePagination}
                  className={classes.pagesContainer}
                >
                  {pages}
                </BottomNavigation>
              </Grid>
            </Grid>
          </Grid>
        </AppMain>
      </React.Fragment>
    );
  }
}

export const SearchPage = withStyles(styles)(SearchPageBase);

export const ConnectedSearchPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const pageSearchProps: SearchState = state.pageSearch ? state.pageSearch : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        items: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.items : ownProps.items,
        searchTerm: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.searchTerm : ownProps.searchTerm,
        currency: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.currency : ownProps.currency,
        filters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.filters : ownProps.filters,
        rangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.rangeFilters : ownProps.rangeFilters,
        sortParams: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.sortParams : ownProps.sortParams,
        pagination: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.pagination : ownProps.pagination,
        categories: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.categories : ownProps.categories,
        // isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : ownProps.pending,
      }
    );
  }
)(SearchPage);
