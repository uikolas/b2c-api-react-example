import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from '@components/Pages/CustomerProfilePage/styles';
import { TCustomerReference } from '@interfaces/customer';

export interface AccountActionsProps extends WithStyles<typeof styles> {
    customerReference: TCustomerReference;
    routerPush: Function;

    deleteCustomerEntity(customerReference: TCustomerReference): void;
}

export interface AccountActionsState {
    isDeleteProfileDialogOpen: boolean;
}
