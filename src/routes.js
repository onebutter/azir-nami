import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NamecardView from './views/namecard';
import RegisterView from './views/register';

const routes = (
  <Switch>
    <Route exact path="/" component={null} />
    <Route exact path="/register" component={RegisterView} />
    <Route path="/user/:username" component={NamecardView} />
  </Switch>
);

export default routes;
