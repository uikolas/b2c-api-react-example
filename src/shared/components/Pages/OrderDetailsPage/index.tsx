import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {AppMain} from '../../Common/AppMain';
import {styles} from './styles';
import {
  getRouterHistoryBack,
  getRouterLocation,
  getRouterMatchParam,
  TRouterMatchParam
} from "../../../selectors/Common/router";
import {emptyOrderText} from "../../../constants/messages/orders";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {getAppCurrency, isAppInitiated, TAppCurrency} from "../../../reducers/Common/Init";
import {
  getOrderDetailsFromStore,
  isOrderDetailsFulfilled,
  isOrderDetailsInitiated,
  isOrderDetailsLoading,
  isOrderDetailsPresent,
  isOrderDetailsStateRejected,
} from "../../../reducers/Pages/OrderDetails";
import {getOrderDetailsAction} from "../../../actions/Pages/Order";
import {
  IOrderDetailsItem,
  IOrderDetailsParsed, IOrderDetailsSelectedItems,
  TOrderId
} from "../../../interfaces/order/index";
import {OrderDetailsGeneralInfo} from "./OrderDetailsGeneralInfo/index";
import {OrderProductList} from "./OrderProductsList/index";
import {OrderDetailsContext} from './context';
import {emptyValueErrorText} from "../../../constants/messages/errors";
import {OrderDetailsTotals} from "./OrderDetailsTotals/index";
import {SprykerButton} from "../../UI/SprykerButton/index";
import {TCartAddItemCollection} from "../../../interfaces/cart/index";


export const pageTitle = "Orders History";

interface OrderDetailsPageProps extends WithStyles<typeof styles>, RouteProps {
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
  routerGoBack: Function;
  currency: TAppCurrency;
}

interface OrderDetailsPageState {
  selectedItems: IOrderDetailsSelectedItems;
  selectedItemsData: TCartAddItemCollection;
}

const reorderSelectedBtnTitle = "Reorder selected items";
const reorderAllBtnTitle = "Reorder all";

export class OrderDetailsPageBase extends React.Component<OrderDetailsPageProps, OrderDetailsPageState> {

  public state: OrderDetailsPageState = {
    selectedItems: {},
    selectedItemsData: null,
  };

  public componentDidMount = () => {
    const requestOrderCondition = (
      !this.props.isOrderExist
      ||(this.props.isOrderExist && this.props.orderIdParam !== this.props.order.id)
    );
    if (requestOrderCondition) {
      this.initRequestData();
    }
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    const requestOrderCondition = (!this.props.isLoading && !this.props.isOrderExist);
    if (requestOrderCondition) {
      this.initRequestData();
    }
    console.log('*** selectedItems ***', this.state.selectedItems);
  }

  public selectItemHandler = (event: any): any => {
    const key = event.target.value;

    if (!key) {
      throw new Error(emptyValueErrorText);
      return;
    }

    this.setState( (prevState: OrderDetailsPageState) => {
      return ({
        ...prevState,
        selectedItems: {
          ...prevState.selectedItems,
          [key]: !prevState.selectedItems[key],
        },
        selectedItemsData: [...this.getSelectedItemsData()]
      });
    });
  }

  public reorderSelectedClickHandler = (event: any): any => {
    console.log('reorderSelectedClickHandler clicked');
  }

  public isReorderSelectedDisabled = (): boolean => {
    const result = this.getSelectedItemsData();
    console.log('getSelectedItemsData result ', result);
    return true;
  }

  public reorderAllClickHandler = (event: any): any => {
    console.log('reorderAllClickHandler clicked');
  }

  public isReorderAllDisabled = (): boolean => {
    if (this.props.order.items.length) {
      return false;
    }
    return true;
  }

  private getSelectedItemsData = (): TCartAddItemCollection => {
    const items = {...this.state.selectedItems};
    const result = [];
    for (let sku in items) {
      if (items[sku]) {
        result.push({
          sku,
          quantity: this.props.order.items.filter((item: IOrderDetailsItem) => (item.sku === sku))[0].quantity,
        });
      }
    }
    return result.length ? result : null;
  }

  private initRequestData = () => {
    const requestOrderCondition = (this.props.isAppDataSet && this.props.orderIdParam);
    if (requestOrderCondition) {
      this.props.getOrderData(this.props.orderIdParam);
      return true;
    }
    return false;
  }

  public render(): JSX.Element {
    console.info('props: ', this.props);
    console.info('state: ', this.state);
    const {classes, isOrderExist, isFulfilled, routerGoBack, currency, order} = this.props;

    return (
      <AppMain>
        { (isFulfilled === false)
          ? null
          : (
            <OrderDetailsContext.Provider
              value={{
                selectItemHandler: this.selectItemHandler,
                currency,
                selectedItems: this.state.selectedItems
              }}
            >
              <div className={classes.root} >
                <Grid container justify="center" >
                  <Grid item xs={12}>
                    <Typography align="center" variant="headline" gutterBottom={true}>
                      {pageTitle}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justify="center" >
                  {isOrderExist
                    ? <React.Fragment>
                      <Grid item xs={12} sm={3}>

                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <OrderDetailsGeneralInfo
                          orderId={order.id}
                          date={order.dateCreated}
                          btnBackHandler={routerGoBack}
                        />
                        <OrderProductList items={order.items} />
                        <OrderDetailsTotals
                          currency={currency}
                          expenses={order.expenses}
                          canceledTotal={order.totals.canceledTotal}
                          expenseTotal={order.totals.expenseTotal}
                          discountTotal={order.totals.discountTotal}
                          taxTotal={order.totals.taxTotal}
                          subtotal={order.totals.subtotal}
                          grandTotal={order.totals.grandTotal}
                        />


                        <Grid item xs={12} className={`${classes.section} ${classes.btnOuter}`}>
                          <SprykerButton
                            title={reorderSelectedBtnTitle}
                            extraClasses={classes.reorderBtn}
                            onClick={this.reorderSelectedClickHandler}
                            disabled={this.isReorderSelectedDisabled()}
                          />
                          <SprykerButton
                            title={reorderAllBtnTitle}
                            extraClasses={classes.reorderBtn}
                            onClick={this.reorderAllClickHandler}
                            disabled={this.isReorderAllDisabled()}
                          />
                        </Grid>
                      </Grid>
                    </React.Fragment>
                    : <Typography variant="title" color="inherit" gutterBottom={true}>
                      {emptyOrderText}
                    </Typography>
                  }

                </Grid>
              </div>
            </OrderDetailsContext.Provider>

          )
        }
      </AppMain>
    );
  }
}

export const OrderDetailsPage = withStyles(styles)(OrderDetailsPageBase);

export const ConnectedOrderDetailsPage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    const isLoading = isOrderDetailsLoading(state, ownProps);
    const isRejected = isOrderDetailsStateRejected(state, ownProps);
    const isFulfilled = isOrderDetailsFulfilled(state, ownProps);
    const isInitiated = isOrderDetailsInitiated(state, ownProps);
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isOrderExist = isOrderDetailsPresent(state, ownProps);
    const order = getOrderDetailsFromStore(state, ownProps);
    const orderIdParam = getRouterMatchParam(state, ownProps, 'orderId');
    const routerGoBack = getRouterHistoryBack(state, ownProps);
    const currency = getAppCurrency(state, ownProps);

    return ({
      location,
      isLoading,
      isRejected,
      isFulfilled,
      isAppDataSet,
      isUserLoggedIn,
      isInitiated,
      isOrderExist,
      orderIdParam,
      order,
      routerGoBack,
      currency,
    });
  },
  (dispatch: Function) => ({
    getOrderData: (orderId: TOrderId) => dispatch(getOrderDetailsAction(orderId)),
  })
)(OrderDetailsPage);
