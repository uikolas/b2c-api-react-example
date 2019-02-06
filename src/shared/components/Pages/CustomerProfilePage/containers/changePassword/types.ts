import { ICustomerDataParsed, ICustomerProfilePassword, TCustomerReference } from '@interfaces/customer';
import { WithStyles } from '@material-ui/core';
import { styles } from '../../styles';

export interface ChangePasswordProps extends ICustomerProfilePassword, WithStyles<typeof styles> {
    customerData: ICustomerDataParsed;
    customerReference: TCustomerReference;
    passwordUpdated: boolean;

    updateCustomerPassword(customerReference: TCustomerReference, payload: ICustomerProfilePassword): void;
}

export interface ChangePasswordState extends ICustomerProfilePassword {
    [index:string]: string | number | object | boolean;
}
