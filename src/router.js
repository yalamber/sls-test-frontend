import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import asyncComponent from './helpers/AsyncFunc';
import App from './containers/App/App';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path={"/"}
          component={asyncComponent(() => import("./containers/Page/auth"))}
        />
        <Route
          exact
          path={'/request-account'}
          component={asyncComponent(() => import('./containers/Page/auth/request-account'))}
        />
        <RestrictedRoute path="/admin" component={App} isLoggedIn={isLoggedIn} />
        <RestrictedRoute path="/my-agency" component={App} isLoggedIn={isLoggedIn} />
        <RestrictedRoute path="/my-client" component={App} isLoggedIn={isLoggedIn} />
        <RestrictedRoute path="/my" component={App} isLoggedIn={isLoggedIn} />
        <Route path="*" component={asyncComponent(() => import('./containers/Page/common/404'))}/>
      </Switch>
    </ConnectedRouter>
  );
};

export default connect(state => {
  return ({
    isLoggedIn: state.Auth.userToken !== null
  });
})(PublicRoutes);
