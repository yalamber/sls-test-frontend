import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class AppRouter extends Component {
  render() {
    const {url, style, routes} = this.props;
    return (
      <div style={style}>
        <Switch>
        {routes.map(singleRoute => {
          const {path, exact, ...otherProps} = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
