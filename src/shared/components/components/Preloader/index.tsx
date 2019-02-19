import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { styles } from './styles';

interface PreloaderProps extends WithStyles<typeof styles> {
    extraClasses?: string;
}

export const PreloaderBase: React.SFC<PreloaderProps> = (props): JSX.Element => {
    const {classes, extraClasses} = props;

    return (
        <div className={`${classes.root} ${extraClasses}`}>
            <LinearProgress color="primary"/>
        </div>
    );
};

export const Preloader = withStyles(styles)(PreloaderBase);
