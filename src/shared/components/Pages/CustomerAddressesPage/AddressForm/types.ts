import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from '../styles';
import { IAddressItem } from 'src/shared/interfaces/addresses';
import { ICountry } from 'src/shared/interfaces/country';

export interface AddressFormProps extends WithStyles<typeof styles> {
    customer: string;
    currentAddress: IAddressItem;
    countries: ICountry[];
    routerGoBack: Function;
    isLoading: boolean;
    dispatch: Function;

    addAddress(payload: IAddressItem, customerId: string): void;

    updateAddress(addressId: string, customerId: string, payload: IAddressItem): void;
}

export interface AddressFormState extends IAddressItem {
    submitted: boolean;

    [key: string]: string | number | boolean;
}
