import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {IProduct} from '../../../interfaces/product';
import {sendSearchAction} from '../../../actions/Pages/Search';


import {AppMain} from '../../Common/AppMain';
import {AppHeader} from '../../Common/AppHeader';

import {styles} from './styles/page';

interface SearchPageProps extends WithStyles<typeof styles> {
  items?: Array<IProduct> | null;
  searchTerm?: string;
}

interface SearchPageState {

}

class SearchPageBase extends React.Component<SearchPageProps, SearchPageState> {

  public state: SearchPageState = {

  };

  public render() {
    const {classes, items, searchTerm} = this.props;
    console.log('SearchPageBase this.props', this.props);
    console.log('SearchPageBase items', items);
    console.log('SearchPageBase searchTerm', searchTerm);

    // TODO: isLoading should be in props
    const isLoading = false;

    return (
      <React.Fragment>
        <AppHeader />
        <AppMain isLoading={isLoading}>
          <Typography variant="title" color="inherit" noWrap>
            Search
          </Typography>
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
        // isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : ownProps.pending,
      }
    );
  }
)(SearchPage);
