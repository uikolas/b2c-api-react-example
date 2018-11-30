import * as React from 'react';
import { toast } from 'react-toastify';
import { Route, withRouter } from 'react-router';

import { Props } from './types';
import { connect } from './connect';
import { pathLoginPage } from '../contentRoutes';
import {customerLogout} from "src/shared/constants/messages/customer";

@connect
@(withRouter as any)
export class ProtectedRoute extends React.PureComponent<Props> {
  public static defaultProps = {
    pageTitle: '',
  };

  // Component lifecycle methods

  public componentWillMount(): void {
    this.checkAuthorized();
    this.setTitle();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.isUserLoggedIn && !this.props.isUserLoggedIn) {
      toast.success(customerLogout);
    }

    this.checkAuthorized();

    this.setTitle();
  }

  // Helper functions

  private checkAuthorized = (): void => {
    if (!this.props.isUserLoggedIn) {
      this.props.history.push(pathLoginPage);
    }
  };

  private setTitle = (): void => {
    document.title = this.props.pageTitle;
  };

  // RENDER

  public render(): React.ReactNode {
    return this.props.isUserLoggedIn ? <Route { ...this.props } /> : null;
  }
}
