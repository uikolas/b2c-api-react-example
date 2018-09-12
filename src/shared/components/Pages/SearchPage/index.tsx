import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';

import {AppMain} from '../../Common/AppMain';
import {AppHeader} from '../../Common/AppHeader';

import {styles} from './styles/page';

interface SearchPageProps extends WithStyles<typeof styles> {

}

interface SearchPageState {

}

class SearchPageBase extends React.Component<SearchPageProps, SearchPageState> {

  public state: SearchPageState = {

  };

  public render() {
    const {classes} = this.props;

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
