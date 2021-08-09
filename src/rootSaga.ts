import { all } from 'redux-saga/effects';
import { watcher as sessionSagas } from './session';

const sagas = [sessionSagas()];

export function* rootSaga() {
  yield all(sagas);
}
