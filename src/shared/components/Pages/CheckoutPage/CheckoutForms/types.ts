import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {
  IBillingAddress,
  IShippingAddress,
} from "src/shared/interfaces/checkout/index";
import {
  IBillingSelection,
  IDeliverySelection,
  TCheckoutPageContext
} from "src/shared/components/Pages/CheckoutPage/types";
import {IRadioItem} from "src/shared/components/UI/SprykerForm/types";
import {ICountries} from "src/shared/reducers/Common/Init";
import {IAddressItem} from "src/shared/interfaces/addresses/index";

// TODO: fix extends
export interface ICheckoutFormsProps extends WithStyles<typeof formStyles> {
  shippingAddress: IShippingAddress;
  billingAddress: IBillingAddress;
  addressesCollection: IAddressItem[] | null;
  selections: IAddressesSelections;
  isAddressesLoading: boolean;
  extraAddressesOptions: IExtraAddressesOptions | null;
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
