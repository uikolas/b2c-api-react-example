import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { Links } from './parts/Links';
import { Logos } from './parts/Logos';
import { Logo } from './parts/Logo';
import { categoriesLinks, socialMediaLinks } from './footer-links';
import { AppFooterProps as Props } from './types';
import { styles } from './styles';

export const AppFooterComponent: React.SFC<Props> = ({classes}) => (
  <div className={ classes.footer }>
    <Grid container direction="row" justify="space-between" className={ classes.footerContainer }>
      <Grid item sm={ 2 }>
        <Logo/>
      </Grid>

      <Grid item sm={ 2 }>
        <Links title="Categories" links={ categoriesLinks }/>
      </Grid>

      <Grid item sm={ 2 }>
        <Links title="Social Media" links={ socialMediaLinks } external/>
      </Grid>

      <Grid
        item
        sm={ 2 }
        container
        direction="column"
        justify="flex-end"
        alignItems="flex-end"
      >
        <Grid item>
          <Logos/>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export const AppFooter = withStyles(styles)(AppFooterComponent);
