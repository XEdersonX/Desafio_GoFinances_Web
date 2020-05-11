import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import Create from '../pages/Create';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/cadastrar" component={Create} />
    <Route path="/import" component={Import} />
  </Switch>
);

export default Routes;
