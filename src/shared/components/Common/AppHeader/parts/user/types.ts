import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/shared/interfaces/commoon/react';
import { styles } from './styles';

export interface UserProps extends WithStyles<typeof styles>, WithRouter {
  // connect
  isUserLoggedIn?: boolean;
}

export interface UserState {
  anchorEl: HTMLElement | null;
}

export interface UserDropProps extends WithStyles<typeof styles>, WithRouter {
  // connect
  isUserLoggedIn?: boolean;
  anonymId?: string;
  logout?(): void;
  getGuestCartAction: Function;
}
