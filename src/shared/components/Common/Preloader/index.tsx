import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';

import {styles} from './styles';

interface PreloaderProps extends WithStyles<typeof styles> {

}

const PreloaderBase: React.SFC<PreloaderProps> = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
        <br />
      <LinearProgress color="secondary" />
    </div>
  );
};

export const Preloader = withStyles(styles)(PreloaderBase);
