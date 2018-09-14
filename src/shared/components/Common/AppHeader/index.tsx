import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {AppLogo} from '../AppLogo';
import CatalogSearch from '../CatalogSearch';
import {styles} from './styles';

interface AppHeaderProps extends WithStyles<typeof styles> {

}

export const AppHeaderBase: React.SFC<AppHeaderProps> = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container direction="row">

            <Grid item sm={3}
                  direction="row"
                  container
                  justify="flex-start"
                  alignItems="center">
              <AppLogo />
            </Grid>

            <Grid item sm={5}>
              <CatalogSearch />
            </Grid>
            <Grid item sm={4}
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
            >
              <Button variant="contained" component="button" className={classes.button}>
                Register/Login
              </Button>

              <Button variant="contained" component="button" className={classes.button}>
                Cart
              </Button>
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export const AppHeader = withStyles(styles)(AppHeaderBase);
