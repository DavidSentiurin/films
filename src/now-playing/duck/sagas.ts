import { AnyAction } from 'redux';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { ERRORS } from 'src/common/constants';
import { fetchNowPlaying } from '../api';
import { failureFetchNowPlaying, successFetchNowPlaying } from './actions';
import { TYPE_KEYS } from './actionTypes';

export function* watcher(): Generator<ForkEffect<never>, void, unknown> {
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
