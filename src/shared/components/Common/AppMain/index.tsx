import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {Preloader} from '../Preloader';

import {styles} from './styles';

interface AppMainProps extends WithStyles<typeof styles> {
  isLoading: boolean;
}

const AppMainBase: React.SFC<AppMainProps> = (props) => {
  const { classes, isLoading } = props;
  return (
    <main className={classes.layout}>
      {isLoading ? <Preloader/> : null}
      {props.children}
    </main>
  );
};

export const AppMain = withStyles(styles)(AppMainBase);
