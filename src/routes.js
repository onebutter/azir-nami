import React from 'react';
import { Switch } from 'react-router-dom';

import AuthLayout from './layout/auth';
import DefaultLayout from './layout/default';

import RegisterView from './views/register';
import LoginView from './views/login';
import ManageNamecardView from './views/manageNamecard';
import MainProfileView from './views/mainProfile';
import RootView from './views/root';

const routes = (
  <Switch>
    <AuthLayout exact path="/login" component={LoginView} />
    <AuthLayout exact path="/register" component={RegisterView} />

    <DefaultLayout path="/manage" component={ManageNamecardView} />

    <DefaultLayout path="/:username" component={MainProfileView} />
    <DefaultLayout component={RootView} />
  </Switch>
);

export default routes;
