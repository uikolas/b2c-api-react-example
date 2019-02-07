import { WithStyles } from '@material-ui/core';
import { styles } from 'styles.ts';
import { RouteProps } from 'react-router';
import { TRouterMatchParam } from 'src/shared/helpers/router/types';
import { IOrderDetailsParsed, IOrderDetailsSelectedItems } from '@interfaces/order';
import { ICartCreatePayload } from '@services/Common/Cart/types';
import { TCartAddItemCollection, TCartId } from '@interfaces/cart';
import { TAppCurrency } from '@interfaces/currency';

export interface IOrderDetailsPageProps extends WithStyles<typeof styles>, RouteProps {
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isAppDataSet: boolean;
    isUserLoggedIn: boolean;
    isInitiated: boolean;
    isOrderExist: boolean;
    getOrderData: Function;
    orderIdParam: TRouterMatchParam;
    order: IOrderDetailsParsed;
    currency: TAppCurrency;

    payloadForCreateCart: ICartCreatePayload;
    cartId: TCartId;
    addMultipleItemsToCart: Function;
}

export interface IOrderDetailsPageState {
    selectedItems: IOrderDetailsSelectedItems;
    selectedItemsData: TCartAddItemCollection;
}
