import { RouteProps } from 'react-router';
import { WithRouter } from 'src/interfaces/common';

export interface Props extends RouteProps, WithRouter {
    pageTitle?: string;
    isUserLoggedIn?: boolean;
    isInitStateFulfilled?: boolean;
    anonymId?: string;
    getGuestCartAction?: (anonymId: string) => void;
}
