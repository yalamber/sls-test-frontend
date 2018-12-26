import Auth from './auth/reducer';
import App from './app/reducer';
import My from './my/reducer';
import SystemAppReducers from '@app/SystemApp/redux/reducer';
import ClientAppReducers from '@app/ClientApp/redux/reducer';
import AgencyAppReducers from '@app/AgencyApp/redux/reducer';
import FreelancerAppReducers from '@app/FreelancerApp/redux/reducer';

export default {
  Auth,
  App,
  My,
  ...SystemAppReducers,
  ...ClientAppReducers,
  ...AgencyAppReducers,
  ...FreelancerAppReducers,
};
