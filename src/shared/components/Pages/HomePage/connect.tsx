import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import {SearchState} from "src/shared/reducers/Pages/Search";
import { RouteProps } from 'react-router';

const mapStateToProps = (state: any, ownProps: any) => {
  const routerProps: RouteProps = state.routing ? state.routing : {};
  const pageSearchProps: SearchState = state.pageSearch ? state.pageSearch : null;
  return ({
    routerProps,
    pageSearchProps,
  });
};

export const connect = reduxify(
  mapStateToProps,
  (dispatch: Function) => ({

  }),
);
