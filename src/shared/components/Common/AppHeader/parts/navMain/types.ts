import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface MainNavProps extends WithStyles<typeof styles> {
  mobileNavState: boolean;
}
