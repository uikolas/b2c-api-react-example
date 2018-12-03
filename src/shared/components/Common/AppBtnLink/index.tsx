import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import {NavLink} from 'react-router-dom';
import {IAppBtnLinkProps} from "./types";
import {styles} from "./styles";


export const AppBtnLinkBase: React.SFC<IAppBtnLinkProps> = (props): JSX.Element => {
  const {
    classes, title, path, extraClassName
  }  = props;

  return (
    <NavLink className={`${classes.root} ${extraClassName ? extraClassName : ''}`} to={path}>{title}</NavLink>
  );
};

export const AppBtnLink = withStyles(styles)(AppBtnLinkBase);
