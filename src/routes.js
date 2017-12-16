import React from 'react';
import { Switch } from 'react-router-dom';

import RegisterView from './views/register';
import LoginView from './views/login';

const routes = (
  <Switch>
    <LoginView exact path="/login" />
    <RegisterView path="/register" />
  </Switch>
);

export default routes;
