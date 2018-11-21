import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartItem } from 'src/shared/reducers/Common/Cart/types';
import { styles } from '../styles';

export interface CartRowsProps extends WithStyles<typeof styles> {
  items: Array<ICartItem>;
  heightListItem: number;
  handleDeleteItem(sky: string): void;
  handleChangeQty(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
}
