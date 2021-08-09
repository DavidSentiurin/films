import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  requestSessionId,
  requestTheRequestToken,
  requestDeleteSession,
} from '../api';
import {
  GET_REQUEST_TOKEN,
  LOAD_FAILD_REQUEST_TOKEN,
  LOAD_FAILD_SESSION_ID,
  LOAD_REQUEST_TOKEN,
  LOAD_SESSION_ID,
  LOAD_SUCCESS_REQUEST_TOKEN,
  LOAD_SUCCESS_SESSION_ID,
  REQUEST_SESSION_ID,
  REQUEST_THE_REQUEST_TOKEN,
  GET_SESSION_ID,
  REQUEST_DELETE_SESSION,
  LOAD_DELETE_SESSION,
  DELETE_SESSION,
  LOAD_SUCCESS_DELETE_SESSION,
  LOAD_FAILD_DELETE_SESSION,
} from './actionTypes';
import { receiveRequestToken } from './index';

const GENERAL_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

export function* watcher() {
  yield takeLatest(REQUEST_THE_REQUEST_TOKEN, getRequestTokenWorker);
  yield takeLatest(REQUEST_SESSION_ID, signInWorker);
  yield takeLatest(REQUEST_DELETE_SESSION, signOutWorker);
}

function* getRequestTokenWorker() {
  yield put({ type: LOAD_REQUEST_TOKEN });
  const { data, status }: AxiosResponse = yield call(requestTheRequestToken);

  if (status === 200 && data.success) {
    yield put({ type: GET_REQUEST_TOKEN, payload: data });
    yield put({ type: LOAD_SUCCESS_REQUEST_TOKEN });

    return;
  }

  yield put({
    type: LOAD_FAILD_REQUEST_TOKEN,
    payload: {
      message: GENERAL_ERROR_MESSAGE,
    },
  });
}

function* signInWorker(action: AnyAction) {
  yield put({ type: LOAD_SESSION_ID });
  const requestToken: string = yield select(receiveRequestToken);
  const response: AxiosResponse = yield call(requestSessionId, {
    ...action.payload,
    requestToken: requestToken,
  });

  if (response && response.status === 200 && response.data.success) {
    yield put({ type: GET_SESSION_ID, payload: response });
    yield put({ type: LOAD_SUCCESS_SESSION_ID });

    return;
  }

  if (response.status === 401) {
    if (response.data.statusCode === 30 || response.data.statusCode === 32) {
      yield put({
        type: LOAD_FAILD_SESSION_ID,
        payload: {
          message: response.data.statusMessage || GENERAL_ERROR_MESSAGE,
        },
      });

      return;
    }
  }

  yield put({
    type: LOAD_FAILD_SESSION_ID,
    payload: {
      message: GENERAL_ERROR_MESSAGE,
    },
  });
}

function* signOutWorker(action: AnyAction) {
  yield put({ type: LOAD_DELETE_SESSION });
  const response: AxiosResponse = yield requestDeleteSession(action.payload);

  if (response && response.status === 200 && response.data.success) {
    yield put({ type: DELETE_SESSION, payload: response.data.success });
    yield put({ type: LOAD_SUCCESS_DELETE_SESSION });

    return;
  }

  yield put({
    type: LOAD_FAILD_DELETE_SESSION,
    payload: {
      message: GENERAL_ERROR_MESSAGE,
    },
  });
}
