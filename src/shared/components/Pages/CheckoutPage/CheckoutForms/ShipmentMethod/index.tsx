import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {CheckoutPageContext} from '../../context';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {SprykerForm} from "src/shared/components/UI/SprykerForm/index";
import {IShipmentMethodProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/ShipmentMethod/types";
import {IShipmentMethodsGrouped} from "src/shared/components/Pages/CheckoutPage/types";
import {
  getShipmentMethodsFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/shipmentSettings";


export const ShipmentMethodBase: React.SFC<IShipmentMethodProps> = (props): JSX.Element => {
  const {
    classes,
  }  = props;

  return (
    <CheckoutPageContext.Consumer>
      {({
          submitHandler,
          selectionsChangeHandler,
          shipmentMethods,
          currentValueShipmentMethod,
      }) => {


        const isShipmentMethodsExist = Boolean(Array.isArray(shipmentMethods) && shipmentMethods.length > 0);

        if (!isShipmentMethodsExist) {
          return null;
        }

        const shipmentMethodsGrouped: IShipmentMethodsGrouped = {};
        for (let shipmentMethod of shipmentMethods) {
          if (!shipmentMethodsGrouped[shipmentMethod.carrierName]) {
            shipmentMethodsGrouped[shipmentMethod.carrierName] = [];
          }
          shipmentMethodsGrouped[shipmentMethod.carrierName].push(shipmentMethod);
        }

        // TODO: Change any
        const shipmentMethodsForms: Array<JSX.Element> = [];
        for (let groupName in shipmentMethodsGrouped) {
          const shipmentMethodsParams = {
            shipmentMethods: shipmentMethodsGrouped[groupName],
            currentValueShipmentMethod,
            submitHandler,
            inputChangeHandler: selectionsChangeHandler,
          };
          const shipmentMethodFormSettings = getShipmentMethodsFormSettings(`shipmentMethod-${groupName}`,
                                                                            shipmentMethodsParams
          );
          shipmentMethodsForms.push(<SprykerForm key={groupName} form={shipmentMethodFormSettings} />);
        }

        return (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              Shipment
              {shipmentMethodsForms}
            </Grid>
          </Grid>
        );
      }}
    </CheckoutPageContext.Consumer>
  );
};

export const ShipmentMethod = withStyles(formStyles)(ShipmentMethodBase);
