import { store } from './store';
import authActions from './auth/actions';
import userActions from './user/actions';
export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());    
    store.dispatch(userActions.checkActiveAccount());
  });
