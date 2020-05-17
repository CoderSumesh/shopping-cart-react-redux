import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import ProductList from './productList';
import CartList from './cartList';

const Routes = () => (
  <Suspense fallback="loading">
    <Switch>
      <Redirect from="/" exact to="/list" />
      <Route path="/list" component={ProductList} />
      <Route path="/cart" component={CartList} />
    </Switch>
  </Suspense>
);

export default Routes;
