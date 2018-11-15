import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/shared/interfaces/commoon/react';
import { styles } from './styles';

export interface AppHeaderState {
  showSearch: boolean;
  stickyTriggerOffset: number;
}
export interface AppHeaderProps extends WithStyles<typeof styles>, WithRouter {
  isLoading: boolean;
  onMobileNavToggle(): void;
  isMobileNavOpened: boolean;
}
