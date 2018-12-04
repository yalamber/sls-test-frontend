import Auth from './auth/reducer';
import App from './app/reducer';
import User from './user/reducer';
import Agencies from './agencies/reducer';
import Companies from './companies/reducer';
import CompanyUsers from './companies/users/reducer';
import SystemAppReducers from '@app/SystemApp/redux/reducer';
import ClientAppReducers from '@app/ClientApp/redux/reducer';
import AgencyAppReducers from '@app/AgencyApp/redux/reducer';
import FreelancerAppReducers from '@app/FreelancerApp/redux/reducer';

export default {
  Auth,
  App,
  User,
  Agencies,
  Companies,
  CompanyUsers,
  ...SystemAppReducers,
  ...ClientAppReducers,
  ...AgencyAppReducers,
  ...FreelancerAppReducers,
};
