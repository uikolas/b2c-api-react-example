import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import {NavLink} from 'react-router-dom';
import {IAppBtnLinkProps} from "src/shared/components/Common/AppBtnLink/types";
import {appBtnLinkStyles} from "src/shared/components/Common/AppBtnLink/appBtnLinkStyles";


export const AppBtnLinkBase: React.SFC<IAppBtnLinkProps> = (props): JSX.Element => {
  const {
    classes, title, path, extraClassName
  }  = props;

  return (
    <NavLink className={`${classes.root} ${extraClassName ? extraClassName : ''}`} to={path}>{title}</NavLink>
  );
};

export const AppBtnLink = withStyles(appBtnLinkStyles)(AppBtnLinkBase);
