import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

import {IconLogo} from '../../../assets/icons/IconLogo';
import {styles} from './styles';

interface AppLogoProps extends WithStyles<typeof styles> {

}

export const AppLogoBase: React.SFC<AppLogoProps> = (props) => {
  const { classes } = props;
  return (
    <NavLink className={classes.logo} id="AppLogo" to="/"><IconLogo/></NavLink>
  );
};

export const AppLogo = withStyles(styles)(AppLogoBase);
