import React from 'react';
import { Provider, Store } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

import { getRoutes } from '../routes';
import { configureStore } from '../stores/configureStore';


export const Root = ({history}: {history: History}) => {
  const store: Store<any> = configureStore(history);
  const routes = getRoutes();
  return (
    <Provider store={ store }>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={ history }>
        { routes }
      </ConnectedRouter>
    </Provider>
  );
};
