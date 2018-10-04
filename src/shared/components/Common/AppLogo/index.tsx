import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { NavLink } from 'react-router-dom';

import config from '../../../config';
import {IconLogo} from '../../../assets/icons/IconLogo';
import {styles} from './styles';

interface AppLogoProps extends WithStyles<typeof styles> {

}

export const AppLogoBase: React.SFC<AppLogoProps> = (props) => {
  const { classes } = props;
  return (
    <NavLink className={classes.logo} id="AppLogo" to={config.WEB_PATH}><IconLogo/></NavLink>
  );
};

export const AppLogo = withStyles(styles)(AppLogoBase);
