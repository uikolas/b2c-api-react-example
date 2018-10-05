import * as React from 'react';
import { Route, Switch } from 'react-router';

import {ConnectedHomePage} from '../components/Pages/Home';
import {NotFound} from '../components/Pages/NotFound';
import {ConnectedLogin} from '../components/Pages/LoginPage';
import {ConnectedSearchPage} from '../components/Pages/SearchPage';
import {ConnectedProductPage} from '../components/Pages/ProductPage';
import {ConnectedCartPage} from '../components/Pages/CartPage';
import {ConnectedWishlistPage} from '../components/Pages/WishListPage';
import config from '../config';

export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path={`${config.WEB_PATH}`} exact component={ConnectedHomePage}/>
      <Route path={`${config.WEB_PATH}search`} component={ConnectedSearchPage} />
      <Route path={`${config.WEB_PATH}product`} component={ConnectedProductPage} />
      <Route path={`${config.WEB_PATH}login`} component={ConnectedLogin} />
      <Route path={`${config.WEB_PATH}cart`} component={ConnectedCartPage} />
      <Route path={`${config.WEB_PATH}wishlist`} component={ConnectedWishlistPage} />
      <Route path={`${config.WEB_PATH}*`} component={NotFound} />
    </Switch>
  );
};
