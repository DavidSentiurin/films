import { all } from 'redux-saga/effects';
import { watcher as genresSaga } from './common/duck/Genres';
import { watcher as sessionSaga } from './session/duck';
import { watcher as nowPlayingSaga } from './now-playing/duck';

const sagas = [sessionSaga(), genresSaga(), nowPlayingSaga()];

export function* rootSaga() {
  yield all(sagas);
}
