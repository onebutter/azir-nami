import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from './sagas';

import { createReducers } from './reducers';

const reducers = createReducers();
const sagaMiddleware = createSagaMiddleware();

const persistReducerConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistCombineReducers(persistReducerConfig, reducers);

const configureStore = ({ history }) => {
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor };
};

export default configureStore;
