import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {
    TCustomerEmail,
    TCustomerFirstName,
    TCustomerLastName, TCustomerPassword,
    TCustomerSalutation,
} from 'src/shared/interfaces/customer/index';

export interface RegisterFormProps extends WithStyles<typeof styles> {
    handleSubmit: Function;
}

export interface RegisterFormState {
    salutation: TCustomerSalutation;
    firstName: TCustomerFirstName;
    lastName: TCustomerLastName;
    email: TCustomerEmail;
    password: TCustomerPassword;
    confirmPassword: TCustomerPassword;
    acceptedTerms: boolean;
}
