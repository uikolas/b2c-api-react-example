import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { styles } from './styles';

interface CustomerPageTitleProps extends WithStyles<typeof styles> {
  title: string;
  extraClasses?: string;
}

export const CustomerPageTitleBase: React.SFC<CustomerPageTitleProps> = (props): JSX.Element => {
  const {
    classes,
    extraClasses = '',
    title,
  } = props;

  return (
    <React.Fragment>
      <Typography
        component="h1"
        align="left"
        className={ extraClasses ? classes.pageHeader : `${classes.pageHeader} ${extraClasses}` }
      >
        { title }
      </Typography>

      <Divider />
    </React.Fragment>
  );
};

export const CustomerPageTitle = withStyles(styles)(CustomerPageTitleBase);
