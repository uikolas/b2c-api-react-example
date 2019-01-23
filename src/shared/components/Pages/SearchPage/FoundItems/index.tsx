import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import { IFoundItemsProps } from 'src/shared/components/Pages/SearchPage/FoundItems/types';
import {
    NoFoundMessage,
    CartItemTitle,
    OrderDetailTableHeaderItems,
    FoundTitle
} from 'src/shared/translation/translations';

export const FoundItemsBase: React.SFC<IFoundItemsProps> = (props) => {
  const {
    classes,
    numberFound,
  } = props;

  return (
    <Grid container
          justify="flex-start"
          alignItems="center"
          className={ classes.root }
    >
      <Grid item xs={ 12 }>
        <Typography color="inherit" component="p" className={ classes.paragraph }>
          { numberFound
            ? `${numberFound} ${(numberFound === 1) ? CartItemTitle : OrderDetailTableHeaderItems} ${FoundTitle}`
            : NoFoundMessage
          }
        </Typography>
      </Grid>
    </Grid>
  );

};

export const FoundItems = withStyles(styles)(FoundItemsBase);
