import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IBannerProps} from "./types";
import {bannerStyles} from "./bannerStyles";


export const BannerBase: React.SFC<IBannerProps> = (props): JSX.Element => {
  const {
    classes,
  }  = props;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        Banner
      </Grid>
    </Grid>
  );
};

export const Banner = withStyles(bannerStyles)(BannerBase);
