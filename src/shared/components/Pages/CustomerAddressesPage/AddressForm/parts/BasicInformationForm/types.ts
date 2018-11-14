import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface BasicInformationFormProps extends WithStyles<typeof styles> {
  submitted: boolean;
  salutation: string;
  firstName: string;
  lastName: string;
  handleChange(): void;
}
