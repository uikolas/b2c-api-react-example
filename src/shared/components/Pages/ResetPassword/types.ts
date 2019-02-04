import { WithStyles } from '@material-ui/core';
import { styles } from '@components/Pages/ResetPassword/styles';
import { TRouterMatchParam } from '@helpers/router/types';

export interface ResetPasswordPageProps extends WithStyles<typeof styles> {
    dispatch?: Function;
    restoreKey?: TRouterMatchParam;
}

export interface ResetPasswordPageState {
    password: string;
    confirmPassword: string;
    submitted: boolean;
}
