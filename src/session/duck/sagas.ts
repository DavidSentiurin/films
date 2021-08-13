import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ERRORS } from 'src/common/constants';
import {
  requestSessionId,
  requestTheRequestToken,
  requestDeleteSession,
} from '../api';
import {
  failureFetchDeleteSession,
  failureFetchRequestToken,
  failureFetchSessionId,
  successFetchDeleteSession,
  successFetchRequestToken,
  successFetchSessionId,
} from './actions';
import { TYPE_KEYS } from './actionTypes';
import { receiveRequestToken } from './index';

export function* watcher() {
  yield takeLatest(TYPE_KEYS.REQUEST_TOKEN_REQUEST, fetchRequestTokenWorker);
  yield takeLatest(TYPE_KEYS.SESSION_ID_REQUEST, fetchSessionIdWorker);
  yield takeLatest(TYPE_KEYS.DELETE_SESSION_REQUEST, fetchDeleteSessionWorker);
}

function* fetchRequestTokenWorker() {
  try {
    const { data }: AxiosResponse = yield call(requestTheRequestToken);

    if (data.success) {
      yield put(successFetchRequestToken(data));

      return;
    }

    yield put(failureFetchRequestToken(ERRORS.GENERAL));
  } catch (exception) {
    yield put(failureFetchRequestToken(ERRORS.GENERAL));
  }
}

function* fetchSessionIdWorker(action: AnyAction) {
  try {
    const requestToken: string = yield select(receiveRequestToken);
    const { data }: AxiosResponse = yield call(requestSessionId, {
      ...action.payload,
      requestToken: requestToken,
    });

    if (data.success) {
      yield put(successFetchSessionId(data));

      return;
    }

    if (data.statusCode === 30 || data.statusCode === 32) {
      yield put(failureFetchSessionId(data.statusMessage || ERRORS.GENERAL));

      return;
    }

    yield put(failureFetchSessionId(ERRORS.GENERAL));
  } catch (exception) {
    yield put(failureFetchSessionId(ERRORS.GENERAL));
  }
}

function* fetchDeleteSessionWorker(action: AnyAction) {
  try {
    const { data }: AxiosResponse = yield requestDeleteSession(action.payload);

    if (data.success) {
      yield put(successFetchDeleteSession(data.success));

      return;
    }

    yield put(failureFetchDeleteSession(ERRORS.GENERAL));
  } catch (exception) {
    yield put(failureFetchDeleteSession(ERRORS.GENERAL));
  }
}
