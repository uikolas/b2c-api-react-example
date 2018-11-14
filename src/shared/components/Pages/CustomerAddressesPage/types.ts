import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItem } from 'src/shared/interfaces/addresses';

export interface CustomerAddressPageProps extends WithStyles<typeof styles> {
  location: string;
  customer: string;
  addresses: Array<IAddressItem>;
  currentAddress: IAddressItem;
  isLoading: boolean;
  isInitial: boolean;
  dispatch: Function;
  getAddressesList: Function;
  deleteAddress: Function;
  routerPush: Function;
}

export interface CustomerAddressPageState {}
