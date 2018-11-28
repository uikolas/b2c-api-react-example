import * as React from 'react';
import {FormEvent, ChangeEvent} from "react";

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {homePageStyles} from './homePageStyles';
import {connect} from './connect';
import {IHomePageProps, IHomePageState} from "./types";
import {AppMain} from '../../Common/AppMain';
import {Banner} from "src/shared/components/Pages/HomePage/Banner/index";
import {
  HomePageBannerBtnText,
  HomePageBannerIntro,
  HomePageBannerTitleFirst,
  HomePageBannerTitleSecond
} from "src/shared/constants/content/homePage";
import {pathCategoryComputers} from "src/shared/routes/categoriesRoutes";


@connect
export class HomePageBase extends React.Component<IHomePageProps, IHomePageState> {

  public state: IHomePageState = {};

  public render() {
    const {classes} = this.props;
    console.info('HomePage this.props', this.props);
    console.info('HomePage this.state', this.state);

    return (
      <React.Fragment>
        <Banner
          titleFirst={HomePageBannerTitleFirst}
          titleSecond={HomePageBannerTitleSecond}
          intro={HomePageBannerIntro}
          linkPath={pathCategoryComputers}
          linkTitle={HomePageBannerBtnText}
        />
        <AppMain>
        <Grid container
              justify="center"
              alignItems="center"
              className={classes.contentBlock}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="title" color="textPrimary" align="center">
              Content block
            </Typography>
          </Grid>
        </Grid>

      </AppMain>
      </React.Fragment>
    );
  }
}

export const HomePage = withStyles(homePageStyles)(HomePageBase);
export default HomePage;
