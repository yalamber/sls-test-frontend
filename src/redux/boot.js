import { store } from './store';
import authActions from './auth/actions';
import myActions from './my/actions';
export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());    
    store.dispatch(myActions.checkActiveAccount());
  });
