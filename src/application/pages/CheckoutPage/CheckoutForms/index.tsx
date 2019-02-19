import * as React from 'react';
import { Grid } from '@material-ui/core';
import { FormWrapper } from '@components/containers/FormWrapper';
import { DeliveryForm } from './DeliveryForm/index';
import { BillingFormComponent } from './BillingForm/index';
import { ShipmentMethod } from './ShipmentMethod/index';
import { PaymentMethod } from './PaymentMethod/index';
import { ICheckoutFormsProps } from './types';
import { ErrorBoundary } from '@components/hoc/ErrorBoundary';

export const CheckoutForms: React.SFC<ICheckoutFormsProps> = (props): JSX.Element => {
    const { panels } = props;

    return (
        <Grid container>
            <Grid item xs={ 12 }>
                <ErrorBoundary>
                    <FormWrapper
                        title={ panels.first.title }
                        isDisabled={ panels.first.isDisabled }
                    >
                        <DeliveryForm />
                    </FormWrapper>
                </ErrorBoundary>
                <ErrorBoundary>
                    <FormWrapper
                        title={ panels.second.title }
                        isDisabled={ panels.second.isDisabled }
                    >
                        <BillingFormComponent />
                    </FormWrapper>
                </ErrorBoundary>
                <ErrorBoundary>
                    <FormWrapper
                        title={ panels.third.title }
                        isDisabled={ panels.third.isDisabled }
                    >
                        <ShipmentMethod />
                    </FormWrapper>
                </ErrorBoundary>
                <ErrorBoundary>
                    <FormWrapper
                        title={ panels.fourth.title }
                        isDisabled={ panels.fourth.isDisabled }
                    >
                        <PaymentMethod />
                    </FormWrapper>
                </ErrorBoundary>
            </Grid>
        </Grid>
    );
};

