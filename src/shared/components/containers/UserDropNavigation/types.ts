import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/shared/interfaces/common/react';
import { styles } from './styles';

export interface UserDropNavigationProps extends WithStyles<typeof styles>, WithRouter {
    isUserLoggedIn?: boolean;
    popoverPosLeft: number;
    popoverPosTop: number;
    logout?(): void;
}

export interface UserDropNavigationState {
    anchorEl: HTMLElement | null;
}
