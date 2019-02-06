import { WithStyles } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { styles } from './styles';
import {
    ICustomerProfile,
    TCustomerInputValue,
} from 'src/shared/interfaces/customer';
import { TCustomerReference } from '@interfaces/customer';

export interface ICustomerProfilePageProps extends WithStyles<typeof styles>, RouteProps {
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isCustomerDataExist: boolean;
    isAppDataSet: boolean;
    customerReference: TCustomerReference;
    routerPush: Function;

    getCustomerData: (customerReference: TCustomerReference) => void;
}

export interface IProfileFieldInput {
    name: (keyof ICustomerProfile);
    value: TCustomerInputValue;
}
