import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory as createHistory  } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from '@redux/reducers';
import rootSaga from '@redux/sagas';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers
});
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware];

const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export { store, history };
