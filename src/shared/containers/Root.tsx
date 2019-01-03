import React from 'react';
import {Provider, ProviderProps} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

import { getRoutes } from '../routes';
import { configureStore } from '../stores/configureStore';
import {ScrollToTopRoute} from "src/shared/routes/ScrollToTopRoute/index";


export const Root = ({history}: {history: History}) => {
  const store: ProviderProps["store"] = configureStore(history);
  const routes = getRoutes();

  return (
    <Provider store={ store }>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={ history }>
        <ScrollToTopRoute>
          { routes }
        </ScrollToTopRoute>
      </ConnectedRouter>
    </Provider>
  );
};
