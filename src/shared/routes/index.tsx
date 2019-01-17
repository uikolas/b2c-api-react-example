import React from 'react';
import { Route } from 'react-router';

import config from '../config';
import { AppHandler } from '../containers/AppHandler';

export default () => (
    <Route path={ config.WEB_PATH } component={ AppHandler } />
);
