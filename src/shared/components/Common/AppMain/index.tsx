import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import {styles} from './styles';

interface AppMainProps extends WithStyles<typeof styles> {

}

const AppMainBase: React.SFC<AppMainProps> = (props) => {
  const { classes } = props;
  return (
    <main className={classes.layout}>
      {props.children}
    </main>
  );
};

export const AppMain = withStyles(styles)(AppMainBase);
