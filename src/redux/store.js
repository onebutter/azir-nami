import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from './sagas';

import { createReducers } from './reducers';

const reducers = createReducers();
const sagaMiddleware = createSagaMiddleware();

const configureStore = ({ history }) => {
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
