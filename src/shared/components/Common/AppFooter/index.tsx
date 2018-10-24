import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { Links } from './parts/Links';
import { categoriesLinks, socialMediaLinks } from './footer-links';
import { AppFooterProps as Props } from './types';
import { styles } from './styles';

export const AppFooterComponent: React.SFC<Props> = ({ classes }) => (
  <div className={ classes.footer }>
    <Grid container direction="row" justify="space-between" className={classes.footerContainer}>
      <Grid item sm={3}>
        <div>Logo</div>
      </Grid>

      <Grid item sm={2}>
        <Links title="Categories" links={ categoriesLinks }/>
      </Grid>

      <Grid item sm={2}>
        <Links title="Social Media" links={ socialMediaLinks } external/>
      </Grid>

      <Grid
        item
        sm={4}
        container
        direction="column"
        justify="flex-end"
      >
        <span>Logos</span>
      </Grid>
    </Grid>
  </div>
);

export const AppFooter = withStyles(styles)(AppFooterComponent);
