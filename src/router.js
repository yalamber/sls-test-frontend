import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import asyncComponent from '@helpers/AsyncFunc';
import App from '@containers/App';
import My from '@page/My';
import Setting from '@page/Setting';

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

const PublicRoutes = ({ history, isLoggedIn, activeAppType }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path={"/"}
          component={asyncComponent(() => import("./containers/Page/Auth"))}
        />
        <Route
          exact
          path={'/request-account'}
          component={asyncComponent(() => import('./containers/Page/Auth/RequestAccount'))}
        />
        {activeAppType === 'system' &&
          <AppWrappedRoute appType="system" path="/admin" isLoggedIn={isLoggedIn} />
        }
        {activeAppType === 'agency' &&
          <AppWrappedRoute appType="agency" path="/my-agency" isLoggedIn={isLoggedIn} />
        }
        {activeAppType === 'client' &&
          <AppWrappedRoute appType="client" path="/my-client" isLoggedIn={isLoggedIn} />
        }
        {activeAppType === 'freelancer' &&
          <AppWrappedRoute appType="freelancer" path="/freelancer" isLoggedIn={isLoggedIn} />
        }
        <RestrictedRoute path="/my" isLoggedIn={isLoggedIn} Component={My}/>
        <RestrictedRoute path="/settings" isLoggedIn={isLoggedIn} Component={Setting} />
        <Route path="*" component={asyncComponent(() => import('./containers/Page/Common/404'))}/>
      </Switch>
    </ConnectedRouter>
  );
};

export default connect(state => {
  return ({
    isLoggedIn: state.Auth.userToken !== null,
    activeAppType: state.My.activeAppType
  });
})(PublicRoutes);
