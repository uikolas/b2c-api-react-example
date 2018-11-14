import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICountries } from 'src/shared/reducers/Common/Init';

export interface AddressInformationFormProps extends WithStyles<typeof styles> {
  zipCode: string;
  submitted: string;
  city: string;
  iso2Code: string;
  countries: ICountries[];
  handleChange(): void;
  handleChangeCountry(): void;
}
