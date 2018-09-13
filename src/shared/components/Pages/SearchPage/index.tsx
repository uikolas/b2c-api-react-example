import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {IProductCard} from '../../../interfaces/productCard';
import {sendSearchAction} from '../../../actions/Pages/Search';


import {AppMain} from '../../Common/AppMain';
import {AppHeader} from '../../Common/AppHeader';
import {ProductCard} from '../../Common/ProductCard';

import {styles} from './styles/page';

interface SearchPageProps extends WithStyles<typeof styles> {
  items?: Array<IProductCard> | null;
  searchTerm?: string;
  currency: string;
}

interface SearchPageState {

}

class SearchPageBase extends React.Component<SearchPageProps, SearchPageState> {

  public state: SearchPageState = {

  };

  public render() {
    const {classes, items, searchTerm, currency} = this.props;
    console.log('SearchPageBase this.props', this.props);

    // TODO: isLoading should be in props
    const isLoading = false;
    const pageTitle = 'Search results for ';

    return (
      <React.Fragment>
        <AppHeader />
        <AppMain isLoading={isLoading}>

          <Grid container
                direction="column"
                justify="center"
                alignItems="center"
          >
            <Typography variant="title" color="inherit" align="center" className={classes.pageHeader}>
              {pageTitle}
              <Typography variant="title" component="span" className={classes.searchTerm} >
                {searchTerm}
              </Typography>
            </Typography>
          </Grid>

          <Grid container
                spacing={32}
                className={classes.container}
          >
            { (items && items.length > 0)
              ? items.map((item) => (
                <Grid item xs={12} sm={6} md={3}
                      key={item.abstractSku}
                >
                <ProductCard
                  currency={currency}
                  images={item.images}
                  prices={item.prices}
                  price={item.price}
                  abstractName={item.abstractName}
                  abstractSku={item.abstractSku}
                />
                </Grid>
              ))
              : null
            }
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
        items: pageSearchProps && pageSearchProps.data.items ? pageSearchProps.data.items : ownProps.items,
        searchTerm: pageSearchProps && pageSearchProps.data.searchTerm ? pageSearchProps.data.searchTerm : ownProps.searchTerm,
        currency: pageSearchProps && pageSearchProps.data.currency ? pageSearchProps.data.currency : ownProps.currency,
        // isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : ownProps.pending,
      }
    );
  }
)(SearchPage);
