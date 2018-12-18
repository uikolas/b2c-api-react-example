import * as React from 'react';
import {IScrollToTopRouteProps, IScrollToTopRouteState} from "./types";
// import { WithRouter } from 'src/shared/interfaces/commoon/react';
import { Route, withRouter } from 'react-router';
// import {withRouter} from "react-router";


@(withRouter as any)
export class ScrollToTopRoute extends React.Component<IScrollToTopRouteProps, IScrollToTopRouteState> {
  public state: IScrollToTopRouteState = {
  };

  public componentDidMount() {
    console.info('%c ++++ ScrollToTopRoute componentDidMount ++++', 'background: #3d5afe; color: #ffea00');
  }

  public componentDidUpdate = (prevProps: IScrollToTopRouteProps, prevState: IScrollToTopRouteState): void => {
    console.info('%c ++++ ScrollToTopRoute componentDidUpdate ++++', 'background: #3d5afe; color: #ffea00');
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  };

  public render(): React.ReactNode {
    return this.props.children;
  }
}

// export const ScrollToTopRoute = withRouter(ScrollToTopRouteBase);
