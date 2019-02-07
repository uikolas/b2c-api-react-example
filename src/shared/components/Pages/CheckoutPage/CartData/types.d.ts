import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem, ICartTotals } from '@interfaces/cart';
import { ClickEvent } from '@interfaces/common/react';

export interface CartDataProps extends WithStyles<typeof styles> {
    products: ICartItem[];
    totals: ICartTotals;
    isSendBtnDisabled: boolean;
    order: string;
    sendData: (event: ClickEvent) => void;
}

export interface CartDataState {
    heightListItem: number;
}
