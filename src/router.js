import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import asyncComponent from './helpers/AsyncFunc';
import App from './containers/App/App';

const RestrictedRoute = ({Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const AppWrappedRoute = ({isLoggedIn, appType,  ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <App appType={appType} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
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
        <AppWrappedRoute appType="system" path="/admin" isLoggedIn={isLoggedIn} />
        <AppWrappedRoute appType="agency" path="/my-agency" isLoggedIn={isLoggedIn} />
        <AppWrappedRoute appType="client" path="/my-client" isLoggedIn={isLoggedIn} />
        <AppWrappedRoute appType="freelancer" path="/freelancer" isLoggedIn={isLoggedIn} />
        <RestrictedRoute path="/settings" isLoggedIn={isLoggedIn} />
        <Route path="*" component={asyncComponent(() => import('./containers/Page/common/404'))}/>
      </Switch>
    </ConnectedRouter>
  );
};

export default connect(state => {
  return ({
    isLoggedIn: state.Auth.userToken !== null,
    activeAppType: state.User.activeAppType
  });
})(PublicRoutes);
