import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ERRORS } from 'src/common/constants';
import { fetchNowPlaying } from '../api';
import { failureFetchNowPlaying, successFetchNowPlaying } from './actions';
import { TYPE_KEYS } from './actionTypes';

export function* watcher() {
  yield takeLatest(TYPE_KEYS.NOW_PLAYING_REQUEST, fetchNowPlayingWorker);
}

function* fetchNowPlayingWorker(action: AnyAction) {
  try {
    const { data } = yield call(fetchNowPlaying, action.payload);

    yield put(successFetchNowPlaying(data));
  } catch (exception) {
    yield put(failureFetchNowPlaying(ERRORS.GENERAL));
  }
}
