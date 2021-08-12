import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ERRORS } from 'src/common/constants';
import { fetchNowPlaying } from '../api';
import {
  GET_NOW_PLAYING,
  LOAD_FAILD_NOW_PLAYING,
  LOAD_NOW_PLAYING,
  LOAD_SUCCESS_NOW_PLAYING,
  REQUEST_NOW_PLAYING,
} from './actionTypes';

export function* watcher() {
  yield takeLatest(REQUEST_NOW_PLAYING, fetchNowPlayingWorker);
}

function* fetchNowPlayingWorker(action: AnyAction) {
  yield put({ type: LOAD_NOW_PLAYING });
  const { data, status } = yield call(fetchNowPlaying, action.payload);

  if (status === 200) {
    yield put({ type: GET_NOW_PLAYING, payload: data });
    yield put({ type: LOAD_SUCCESS_NOW_PLAYING });

    return;
  }

  yield put({
    type: LOAD_FAILD_NOW_PLAYING,
    payload: { message: ERRORS.GENERAL },
  });
}
