import * as React from 'react';
import { Location } from 'history';

import { reduxify } from '../../../lib/redux-helper';
import { IHomeState } from '../../../reducers/Pages/Home';
import { getDataAction } from '../../../actions/Pages/Home';


export const title = 'Home';

export interface IProps {
  dispatch?: Function;
  location?: Location;
  items?: any[];
  itemsCount?: number;
}


export class Home extends React.PureComponent<IProps, any> {
  public displayName: string = 'Home';

  public componentDidMount() {
    this.props.dispatch(getDataAction());
  }

  public componentDidCatch(error: any, info: any) {
    console.error('Home->componentDidCatch->error', error);
    console.error('Home->componentDidCatch->info', info);
  }

  public render() {
    return (
      <React.Fragment>
        <div>{ title }</div>
        { this.props.items ? this.props.items.map(
          (item: any, index: number) => (
            <span id={ item._id } key={ item._id }>{ item.company } { item.balance }</span>),
        ) : null }
      </React.Fragment>
    );
  }
}

export const ConnectedHome = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: IProps = state.routing ? state.routing : {};
    const pagesHomeProps: IHomeState = state.pagesHome ? state.pagesHome : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        items: pagesHomeProps && pagesHomeProps.data.items ? pagesHomeProps.data.items : ownProps.items,
        itemsCount: pagesHomeProps && pagesHomeProps.data.items_count ?
          pagesHomeProps.data.items_count : ownProps.itemsCount,
      }
    );
  },
)(Home);
