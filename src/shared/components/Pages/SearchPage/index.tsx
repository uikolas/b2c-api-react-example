import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { push } from 'react-router-redux';

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {SprykerFilterElement} from '../../../components/UI/SprykerFilter';
import {SprykerRange} from '../../../components/UI/SprykerRangeFilter';
import {SprykerButton} from '../../../components/UI/SprykerButton';
import {getProductDataAction} from '../../../actions/Pages/Product';
import {sendSearchAction} from '../../../actions/Pages/Search';

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
}

export const pageTitle = 'Search results for ';

export class SearchPageBase extends React.Component<SearchPageProps, SearchPageState> {

  public state: SearchPageState = {
    activeFilters: {},
    rangeFilters: {},
  }

  public updateActiveFilters = (name: string, values: Array<string>) => {
    this.setState((prevState) => ({activeFilters: {...prevState.activeFilters, [name]: values}}));
  }

  public updateRangeFilters = (name: string, values: {gte: number | string, lte: number | string}) => {
    this.setState((prevState) => ({rangeFilters: {...prevState.rangeFilters, [name]:  {min: values.gte, max: values.lte}}}));
  }

  public updateSearch = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.info(this.state.rangeFilters);
    this.props.dispatch(sendSearchAction({
      q: this.props.searchTerm,
      currency: this.props.currency,
      ...this.state.activeFilters,
    }));
  }

  public renderProduct = (sku: string, name: string) => {
    this.props.dispatch(getProductDataAction(sku));
    this.props.dispatch(push(`${config.WEB_PATH}product/${name}`));
  }

  public render() {
    const { classes, items, searchTerm, currency, filters, rangeFilters, isLoading } = this.props;

    const renderFilters = filters && filters.length
      ? filters.map((filter: any) => (
          <Grid item xs={3} key={filter.name}>
            <SprykerFilterElement
              attributeName={filter.name}
              menuItems={filter.values && filter.values.length ? filter.values : []}
              handleChange={this.updateActiveFilters}
            />
          </Grid>
        ))
      : null;

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
            </Grid>
            <Grid item xs={9} container>
              {renderFilters}

              {renderRangeFilters}

              <Grid item xs={12} container className={classes.buttonsRow}>
                <Grid
                  item
                  xs={4}
                >
                  <SprykerButton title="Filter" onClick={this.updateSearch} />
                </Grid>
                <Grid
                  item
                  xs={8}
                >
                  Sorting
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
        // isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : ownProps.pending,
      }
    );
  }
)(SearchPage);
