import * as React from 'react';
import { connect } from './connect';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { CheckoutPageContext } from '../../context';
import { formStyles } from '@components/Pages/CheckoutPage/CheckoutForms/styles';
import { SprykerForm } from '@components/UI/SprykerForm';
import { IShipmentMethodProps } from './types';
import {
    getShipmentMethodsFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/shipmentSettings';
import { PartnerIconDhl } from 'src/shared/assets/icons/partnerIconDhl';
import { PartnerIconHermes } from 'src/shared/assets/icons/partnerIconHermes';
import { IShippingMethodsParams } from '@components/Pages/CheckoutPage/types/formSettingsTypes';
import { IShipmentMethodsGrouped } from '@components/Pages/CheckoutPage/types/constantTypes';
import { checkoutFormsNames } from '@components/Pages/CheckoutPage/constants';
import { InputChangeEvent } from '@interfaces/common/react';

export const ShipmentMethodBase: React.SFC<IShipmentMethodProps> = (props): JSX.Element => {
    const {
        classes,
        shipmentMethod,
        shipmentMethods
    } = props;

    const handleSelectionsChange = (event: InputChangeEvent): void => {
        const {value} = event.target;
        const {mutateShipmentMethod} = props;

        mutateShipmentMethod(value);
    };

    const shipmentCarrierNameToIcon: IShippingMethodsParams['shipmentCarrierNameToIcon'] = {
        'Spryker Dummy Shipment': <PartnerIconDhl />,
        'Spryker Drone Shipment': <PartnerIconHermes />
    };

    return (
        <CheckoutPageContext.Consumer>
            {({
                  submitHandler
              }) => {
                const isShipmentMethodsExist = Boolean(Array.isArray(shipmentMethods) && shipmentMethods.length > 0);
                if (!isShipmentMethodsExist) {
                    return null;
                }

                const shipmentMethodsGrouped: IShipmentMethodsGrouped = {};
                for (const shipmentMethod of shipmentMethods) {
                    if (!shipmentMethodsGrouped[shipmentMethod.carrierName]) {
                        shipmentMethodsGrouped[shipmentMethod.carrierName] = [];
                    }
                    shipmentMethodsGrouped[shipmentMethod.carrierName].push(shipmentMethod);
                }

                const shipmentMethodsForms: JSX.Element[] = [];
                for (const carrierName in shipmentMethodsGrouped) {
                    const shipmentMethodsParams: IShippingMethodsParams = {
                        shipmentMethods: shipmentMethodsGrouped[carrierName],
                        currentValueShipmentMethod: shipmentMethod,
                        carrierName,
                        shipmentCarrierNameToIcon,
                        submitHandler,
                        inputChangeHandler: handleSelectionsChange
                    };
                    const shipmentMethodFormSettings = getShipmentMethodsFormSettings(
                        `${checkoutFormsNames.shipmentMethodBase}${carrierName}`,
                        shipmentMethodsParams
                    );

                    shipmentMethodsForms.push(<SprykerForm key={carrierName} form={shipmentMethodFormSettings} />);
                }

                return (
                    <Grid container className={classes.root}>
                        <Grid item xs={12} className={classes.shipmentMethodsParentForms}>
                            {shipmentMethodsForms}
                        </Grid>
                    </Grid>
                );
            }}
        </CheckoutPageContext.Consumer>
    );
};

export const ShipmentMethod = connect(withStyles(formStyles)(ShipmentMethodBase));
