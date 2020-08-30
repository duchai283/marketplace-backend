import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import About from '../components/About';
import Category from 'src/containers/Category';
import Product from 'src/containers/Product';
import Order from 'src/containers/Order';
import OrderDetails from 'src/containers/Order/components/OrderDetails';

const Router = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/category`}>
        <Category />
      </Route>
      <Route exact path={`${path}/product`}>
        <Product />
      </Route>
      <Route exact path={`${path}/order`}>
        <Order></Order>
      </Route>
      <Route exact path={`${path}/order/:id`}>
        <OrderDetails></OrderDetails>
      </Route>
    </Switch>
  );
};

export default Router;
