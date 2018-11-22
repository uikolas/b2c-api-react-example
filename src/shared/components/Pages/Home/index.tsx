import * as React from 'react';
import { RouteProps } from 'react-router';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { reduxify } from '../../../lib/redux-helper';
import { SearchState } from '../../../reducers/Pages/Search';
import CatalogSearchComponent from '../../Common/CatalogSearch';

import { AppMain } from '../../Common/AppMain';

import { styles } from './styles';


interface HomePageProps extends WithStyles<typeof styles> {

}

interface HomePageState {
}

export const pageTitle = 'Search results for ';

export class HomePageBase extends React.Component<HomePageProps, HomePageState> {

  public state: HomePageState = {};

  public render() {
    const {classes} = this.props;
    console.info('this.props', this.props);

    return (
      <AppMain>

        <Grid container
              justify="center"
              alignItems="center"
              className={ classes.heroBlock }
        >
          <Grid item xs={ 12 } sm={ 6 }>
            <CatalogSearchComponent id={'1'}/>
          </Grid>
        </Grid>

        <Grid container
              justify="center"
              alignItems="center"
              className={ classes.contentBlock }
        >
          <Grid item xs={ 12 } sm={ 6 }>
            <Typography variant="title" color="textPrimary" align="center">
              Content block
            </Typography>
          </Grid>

        </Grid>

        <Grid container
              justify="center"
              alignItems="center"
              className={ classes.footerBlock }
        >
          <Grid item xs={ 12 } sm={ 6 }>
            <Typography variant="title" color="textPrimary" align="center">
              Footer
            </Typography>
          </Grid>

        </Grid>


      </AppMain>
    );
  }
}

export const HomePage = withStyles(styles)(HomePageBase);

export const ConnectedHomePage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const pageSearchProps: SearchState = state.pageSearch ? state.pageSearch : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
      }
    );
  },
)(HomePage);
