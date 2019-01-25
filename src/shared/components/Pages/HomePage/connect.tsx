import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import {IReduxOwnProps, IReduxStore} from "src/shared/stores/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  return ({
  });
};

export const connect = reduxify(
  mapStateToProps,
  (dispatch: Function) => ({
    dispatch
  }),
);
