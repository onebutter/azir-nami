import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import namecard from 'Features/Namecard/reducer';
import register from 'Features/Register/reducer';
import auth from 'Features/Auth/reducer';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['status', 'error'],
  debug: true
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  namecard,
  register,
  router: routerReducer
});

export default rootReducer;
