import { RouteProps } from 'react-router';
import { WithRouter } from 'src/shared/interfaces/common/index';

export interface Props extends RouteProps, WithRouter {
    pageTitle?: string;
    isUserLoggedIn?: boolean;
    isInitStateFulfilled?: boolean;
    anonymId?: string;
    getGuestCartAction?: (anonymId: string) => void;
}
