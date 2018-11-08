import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {ICartItem} from "src/shared/reducers/Common/Cart";

export interface CheckoutPageProps extends WithStyles<typeof styles>, RouteProps {
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isInitiated: boolean;

  products: Array<ICartItem> | null;
  isCartFulfilled: boolean;
  isCartRejected: boolean;
}

export interface CheckoutPageState {

}
