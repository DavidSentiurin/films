import { AxiosResponse } from 'axios';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { fetchGenres } from 'src/common/api/Genres';
import { ERRORS } from 'src/common/constants';
import { failureFetchGenres, successFetchGenres } from './actions';
import { TYPE_KEYS } from './actionTypes';
import { IGenresData } from './reducer';

export function* watcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(TYPE_KEYS.GENRES_REQUEST, getGenres);
}

function* getGenres() {
  try {
    const { data }: AxiosResponse<IGenresData> = yield call(fetchGenres);

    if (data.flat.length > 0) {
      yield put(successFetchGenres(data));
      return;
    }

    yield put(failureFetchGenres(ERRORS.GENERAL));
  } catch (exceptions) {
    yield put(failureFetchGenres(ERRORS.GENERAL));
  }
}
