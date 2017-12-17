import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import createHistory from 'history/createBrowserHistory';
import routes from './routes';
import configureStore from './redux/store';

const history = createHistory();
const { store, persistor } = configureStore({ history });

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>{routes}</ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}
