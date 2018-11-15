import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {
  ISameAsDelivery,
  IShippingAddress
} from "src/shared/interfaces/checkout";
import { IAddressItem } from "src/shared/interfaces/addresses";
import {
  IBillingSelection,
  IDeliverySelection,
} from "src/shared/components/Pages/CheckoutPage/types";
import {IRadioItem} from "src/shared/components/UI/SprykerForm/types";
import {ICountries} from "src/shared/reducers/Common/Init";

export interface ICheckoutFormsProps extends WithStyles<typeof formStyles> {
  shippingAddress: IAddressItem;
  billingAddress: IAddressItem;
  addressesCollection: IAddressItem[] | null;
  selections: IAddressesSelections;
  isAddressesFulfilled: boolean;
  extraAddressesOptions: IExtraAddressesOptions | null;
  isUserLoggedIn: boolean;
}

export type TAddressType = 'delivery' | 'billing';

export interface IExtraAddressesOptions {
  delivery: Array<IRadioItem> | null;
  billing: Array<IRadioItem> | null;
}

export interface IAddressesSelections {
  delivery: IDeliverySelection;
  billing: IBillingSelection;
}
