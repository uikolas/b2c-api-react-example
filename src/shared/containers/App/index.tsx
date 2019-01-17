import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, Store } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from '../../routes';
import { ScrollToTopRoute } from '../../routes/ScrollToTopRoute';

import { configureStore } from '../../stores/configureStore';
import createHistory from 'history/createBrowserHistory';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
const store: Store<any> = configureStore(history);

export const App = () => (
    <BrowserRouter>
        <Provider store={ store }>
            { /* ConnectedRouter will use the store from Provider automatically */ }
            <ConnectedRouter history={ history }>
                <ScrollToTopRoute>
                    <Routes />
                </ScrollToTopRoute>
            </ConnectedRouter>
        </Provider>
    </BrowserRouter>
);
