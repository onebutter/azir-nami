import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import namecard from 'Features/Namecard/reducer';
import register from 'Features/Register/reducer';
import auth from 'Features/Auth/reducer';
import extService from 'Features/ExtService/reducer';
import formData from 'Features/AddForm/reducer';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['status', 'error']
};

const extServicePersistConfig = {
  key: 'extService',
  storage,
  whitelist: ['requested']
};

const formDataPersistConfig = {
  key: 'formData',
  storage,
  whitelist: ['data']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  extService: persistReducer(extServicePersistConfig, extService),
  formData: persistReducer(formDataPersistConfig, formData),
  namecard,
  register,
  router: routerReducer
});

export default rootReducer;
