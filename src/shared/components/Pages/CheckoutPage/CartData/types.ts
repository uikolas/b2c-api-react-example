import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem, ICartTotals } from 'src/shared/interfaces/cart';

export interface CartDataProps extends WithStyles<typeof styles> {
    products: ICartItem[];
    totals: ICartTotals;
    isSendBtnDisabled: boolean;
    order: string;
    sendData: (event: React.ChangeEvent) => void;
}

export interface CartDataState {
    heightListItem: number;
}
