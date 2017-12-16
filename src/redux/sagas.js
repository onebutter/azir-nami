import { all } from 'redux-saga/effects';
import auth from 'Features/Auth/sagas';
import namecard from 'Features/Namecard/sagas';
import register from 'Features/Register/sagas';

export default function* rootSaga() {
  yield all([...namecard, ...register, ...auth]);
}
