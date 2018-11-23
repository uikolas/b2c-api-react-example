import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { emptyOrderText } from 'src/shared/constants/messages/orders';
import { IOrderDetailsItem, IOrderDetailsSelectedItems } from 'src/shared/interfaces/order';
import { emptyValueErrorText } from 'src/shared/constants/messages/errors';
import { ICartAddItem, TCartAddItemCollection } from 'src/shared/interfaces/cart';
import { SprykerButton } from '../../UI/SprykerButton';
import { OrderDetailsGeneralInfo } from './OrderDetailsGeneralInfo';
import { OrderProductList } from './OrderProductsList';
import { OrderDetailsTotals } from './OrderDetailsTotals';
import { OrderDetailsContext } from './context';
import { styles } from './styles';
import { OrderDetailsPageProps as Props, OrderDetailsPageState as State } from './types';

export const pageTitle = 'Orders History';
const reorderSelectedBtnTitle = 'Reorder selected items';
const reorderAllBtnTitle = 'Reorder all';

export class OrderDetailsPageBase extends React.Component<Props, State> {
  public state: State = {
    selectedItems: {},
    selectedItemsData: null,
  };

  public componentDidMount = () => {
    if (!this.props.isOrderExist || (this.props.isOrderExist && this.props.orderIdParam !== this.props.order.id)) {
      this.initRequestData();
    }
  };

  public componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (!this.props.isRejected && !this.props.isOrderExist) {
      this.initRequestData();
    }
  };

  public selectItemHandler = (event: any): any => {
    const key = event.target.value;

    if (!key) {
      throw new Error(emptyValueErrorText);
      return;
    }

    this.setState((prevState: State) => {
      const newSelectedItems = {
        ...prevState.selectedItems,
        [key]: !prevState.selectedItems[key],
      };

      return ({
        ...prevState,
        selectedItems: newSelectedItems,
        selectedItemsData: this.getSelectedItemsData(newSelectedItems),
      });
    });
  };

  public reorderSelectedClickHandler = (event: any): any => {
    const items = [...this.state.selectedItemsData];
    if (!items) {
      return false;
    }
    this.props.addMultipleItemsToCart(items, this.props.cartId, this.props.payloadForCreateCart);
    return true;
  };

  public isReorderSelectedDisabled = (): boolean => {
    return Boolean(!this.state.selectedItemsData || !this.state.selectedItemsData.length);
  };

  public reorderAllClickHandler = (event: any): any => {
    const allSelectedItemsData = this.props.order.items.map((item: IOrderDetailsItem): ICartAddItem => ({
      sku: item.sku,
      quantity: item.quantity,
    }));

    const allSelectedItems: IOrderDetailsSelectedItems = {};
    for (const item of allSelectedItemsData) {
      allSelectedItems[item.sku] = true;
    }

    this.setState((prevState: State) => {
      return ({
        ...prevState,
        selectedItems: allSelectedItems,
        selectedItemsData: allSelectedItemsData,
      });
    });

    this.props.addMultipleItemsToCart(allSelectedItemsData, this.props.cartId, this.props.payloadForCreateCart);
    return true;
  };

  public isReorderAllDisabled = (): boolean => Boolean(!this.props.order.items.length);

  private getSelectedItemsData = (selectedItems: IOrderDetailsSelectedItems): TCartAddItemCollection => {
    const result = [];
    for (let sku in selectedItems) {
      if (selectedItems[sku]) {
        result.push({
          sku,
          quantity: this.props.order.items.filter((item: IOrderDetailsItem) => (item.sku === sku))[0].quantity,
        });
      }
    }
    return result.length ? result : null;
  };

  private initRequestData = () => {
    if (this.props.isLoading) {
      return;
    }
    if (this.props.isAppDataSet && this.props.orderIdParam) {
      this.props.getOrderData(this.props.orderIdParam as string);
      return true;
    }
    return false;
  };

  public render(): JSX.Element {
    console.info('props: ', this.props);
    console.info('state: ', this.state);
    const {classes, isOrderExist, isFulfilled, routerGoBack, currency, order} = this.props;

    return (
      <div>
        { (isFulfilled === false)
          ? null
          : (
            <OrderDetailsContext.Provider
              value={ {
                selectItemHandler: this.selectItemHandler,
                currency,
                selectedItems: this.state.selectedItems,
              } }
            >
              <div className={ classes.root }>
                <Grid container justify="center">
                  <Grid item xs={ 12 }>
                    <Typography align="center" variant="headline" gutterBottom={ true }>
                      { pageTitle }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  { isOrderExist
                    ? <Grid item xs={ 12 }>
                      <OrderDetailsGeneralInfo
                        orderId={ order.id }
                        date={ order.dateCreated }
                        btnBackHandler={ routerGoBack }
                      />
                      <OrderProductList items={ order.items }/>
                      <OrderDetailsTotals
                        currency={ currency }
                        expenses={ order.expenses }
                        canceledTotal={ order.totals.canceledTotal }
                        expenseTotal={ order.totals.expenseTotal }
                        discountTotal={ order.totals.discountTotal }
                        taxTotal={ order.totals.taxTotal }
                        subtotal={ order.totals.subtotal }
                        grandTotal={ order.totals.grandTotal }
                      />
                      <Grid item xs={ 12 } className={ `${classes.section} ${classes.btnOuter}` }>
                        <SprykerButton
                          title={ reorderSelectedBtnTitle }
                          extraClasses={ classes.reorderBtn }
                          onClick={ this.reorderSelectedClickHandler }
                          disabled={ this.isReorderSelectedDisabled() }
                        />
                        <SprykerButton
                          title={ reorderAllBtnTitle }
                          extraClasses={ classes.reorderBtn }
                          onClick={ this.reorderAllClickHandler }
                          disabled={ this.isReorderAllDisabled() }
                        />
                      </Grid>
                    </Grid>
                    : <Typography variant="title" color="inherit" gutterBottom={ true }>
                      { emptyOrderText }
                    </Typography>
                  }
                </Grid>
              </div>
            </OrderDetailsContext.Provider>
          )
        }
      </div>
    );
  }
}

export const OrderDetailsPage = withStyles(styles)(OrderDetailsPageBase);
