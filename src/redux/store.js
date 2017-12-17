import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxReset from 'redux-reset';
import sagas from './sagas';
import createTokenMiddleware from 'Features/Auth/utils/tokenMiddleware';
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
  const middlewares = [
    createTokenMiddleware(),
    routerMiddleware(history),
    sagaMiddleware
  ];

  const enhancedCreateStore = compose(
    reduxReset(),
    composeWithDevTools(applyMiddleware(...middlewares))
  )(createStore);

  const store = enhancedCreateStore(persistedReducer);
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
