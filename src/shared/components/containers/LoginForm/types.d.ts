import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TCustomerPassword, TCustomerUsername } from '@interfaces/customer';

export interface LoginFormProps extends WithStyles<typeof styles> {
    handleSubmit: Function;
}

export interface LoginFormState {
    username: TCustomerUsername;
    password: TCustomerPassword;
    isSubmitting: boolean;
    isSubmitted: boolean;
}
