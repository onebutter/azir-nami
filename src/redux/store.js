import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxReset from 'redux-reset';
import sagas from './sagas';
import createTokenMiddleware from 'Features/Auth/utils/tokenMiddleware';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

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

  const store = enhancedCreateStore(reducers);
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
