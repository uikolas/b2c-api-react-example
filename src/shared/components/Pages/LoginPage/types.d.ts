import { WithStyles } from '@material-ui/core';
import { styles } from '@components/Pages/LoginPage/styles';
import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common/react';

export interface LoginPageProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    dispatch?: Function;
    isAuth?: boolean;
    handleSubmitRegisterForm: Function;
    handleSubmitLoginForm: Function;
    getCustomerCart: Function;
}

export interface LoginPageState {}
