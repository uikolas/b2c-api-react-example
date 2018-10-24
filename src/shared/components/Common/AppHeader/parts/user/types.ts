import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface UserProps extends WithStyles<typeof styles> {}
export interface UserState {
  anchorEl: HTMLElement | null;
}

export interface UserDropProps extends WithStyles<typeof styles> {
  // connect
  isUserLoggedIn?: boolean;
  logout?(): void;
}
