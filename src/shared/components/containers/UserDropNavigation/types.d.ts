import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/shared/interfaces/common/index';
import { styles } from './styles';

export interface IUserDropNavigationProps extends WithStyles<typeof styles>, WithRouter {
    isUserLoggedIn?: boolean;
    popoverPosLeft: number;
    popoverPosTop: number;
    logout?(): void;
}

export interface IUserDropNavigationState {
    anchorElement: HTMLElement | null;
}
