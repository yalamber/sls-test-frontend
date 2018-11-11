import React, {Component} from "react";
import {Route} from "react-router-dom";
import testingProviderRoutes from './Routes/TestingProvidersRoutes';
import companyRoutes from './Routes/CompanyRoutes';
import dashboardRoutes from './Routes/DashboardRoutes';
import testManagerRoutes from './Routes/TestManagerRoutes';
import testQueueRoutes from './Routes/TestQueuesRoutes';
import agencyRoutes from './Routes/AgencyRoutes';
import editRolesRoutes from './Routes/EditRolesRoutes';

const routes = [
  ...companyRoutes,
  ...testingProviderRoutes,
  ...dashboardRoutes,
  ...testManagerRoutes,
  ...testQueueRoutes,
  ...agencyRoutes,
  ...editRolesRoutes
];

class AppRouter extends Component {
  render() {
    const {url, style} = this.props;
    return (
      <div style={style}>
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
      </div>
    );
  }
}

export default AppRouter;
