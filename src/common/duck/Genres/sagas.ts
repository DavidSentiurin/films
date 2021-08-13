import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchGenres } from 'src/common/api/Genres';
import { ERRORS } from 'src/common/constants';
import {
  GET_GENRES,
  LOAD_FAILD_GENRES,
  LOAD_GENRES,
  LOAD_SUCCESS_GENRES,
  REQUEST_GENRES,
} from './actionTypes';

export function* watcher() {
  yield takeLatest(REQUEST_GENRES, getGenres);
}

function* getGenres() {
  yield put({ type: LOAD_GENRES });
  const { status, data }: AxiosResponse = yield call(fetchGenres);

  if (status === 200) {
    yield put({
      type: GET_GENRES,
      payload: {
        flat: data.flat,
        map: data.map,
      },
    });
    yield put({ type: LOAD_SUCCESS_GENRES });

    return;
  }

  yield put({
    type: LOAD_FAILD_GENRES,
    payload: {
      message: ERRORS.GENERAL,
    },
  });
}
