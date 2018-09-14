import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

import {logoIcon} from '../../../../assets/icons/logo';
import {styles} from './styles';

interface AppLogoProps extends WithStyles<typeof styles> {

}

export const AppLogoBase: React.SFC<AppLogoProps> = (props) => {
  const { classes } = props;
  return (
    <Typography variant="title" color="inherit" noWrap className={classes.logo}>
      <NavLink to="/">{logoIcon}</NavLink>
    </Typography>
  );
};

export const AppLogo = withStyles(styles)(AppLogoBase);
