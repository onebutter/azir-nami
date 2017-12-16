import React from 'react';
import { Switch } from 'react-router-dom';

import RegisterView from './views/register';
import LoginView from './views/login';
import RootView from './views/root';

const routes = (
  <Switch>
    <LoginView exact path="/login" />
    <RegisterView path="/register" />
    <RootView />
  </Switch>
);

export default routes;
