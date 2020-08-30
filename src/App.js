import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';

import Home from './containers/Home/index';
import LoginPage from './containers/Auth/screens/LoginPage';
import PageNotFound from './components/PageNotFound';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route exact path="/">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/404PageNotFound">
          <PageNotFound></PageNotFound>
        </Route>
        <Redirect from="*" to="/404PageNotFound" />
      </Switch>
    </div>
  );
}

export default App;
