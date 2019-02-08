import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem, ICartTotals } from '@interfaces/cart';
import { ClickEvent } from '@interfaces/common/react';

export interface ICartDataProps extends WithStyles<typeof styles> {
    isUserLoggedIn: boolean;
    products: ICartItem[];
    totals: ICartTotals;
    isSendBtnDisabled: boolean;
    order: string;
    sendData: (event: ClickEvent) => void;
    updateCart: () => void;
    updateGuestCart: (anonymId: string) => void;
    anonymId: string;
}

export interface ICartDataState {
    heightListItem?: number;
    products: ICartItem[];
    totals: ICartTotals;
    order: string;
}
