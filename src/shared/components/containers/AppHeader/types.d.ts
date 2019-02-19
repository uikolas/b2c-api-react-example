import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/shared/interfaces/common/index';
import { styles } from './styles';

export interface IAppHeaderState {
    showSearch: boolean;
    stickyTriggerOffset: number;
    pageWidth: number;
    pageHeight: number;
}

export interface IAppHeaderProps extends WithStyles<typeof styles>, WithRouter {
    isLoading: boolean;
    isMobileNavOpened: boolean;
    locale: string;
    onMobileNavToggle(): void;
}
