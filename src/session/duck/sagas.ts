import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { call, put, select, takeLatest, ForkEffect } from 'redux-saga/effects';
import { IErrorRes } from 'src/common/api/dto';
import { ERRORS } from 'src/common/constants';
import {
  requestSessionId,
  requestTheRequestToken,
  requestDeleteSession,
  reqeustSessionWithLogin,
} from '../api';
import {
  ISessionWithLoginRes,
  ISessionIdRes,
  IDeleteSessionRes,
} from '../api/dto';
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

// TODO: ask the mentor about the return type
export function* watcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(TYPE_KEYS.REQUEST_TOKEN_REQUEST, fetchRequestTokenWorker);
  yield takeLatest(TYPE_KEYS.SESSION_ID_REQUEST, fetchSessionIdWorker);
  yield takeLatest(TYPE_KEYS.DELETE_SESSION_REQUEST, fetchDeleteSessionWorker);
}

function* fetchRequestTokenWorker() {
  try {
    const resRequestToken:
      | AxiosResponse<ISessionWithLoginRes | IErrorRes>
      | undefined = yield call(requestTheRequestToken);

    if (
      resRequestToken &&
      'requestToken' in resRequestToken.data &&
      resRequestToken.data.success
    ) {
      yield put(successFetchRequestToken(resRequestToken.data));

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
    const resSessionWithLogin:
      | AxiosResponse<ISessionWithLoginRes | IErrorRes>
      | undefined = yield call(reqeustSessionWithLogin, {
      ...action.payload,
      requestToken,
    });

    // Success response session with login
    if (resSessionWithLogin && 'requestToken' in resSessionWithLogin.data) {
      const resSessionId: AxiosResponse<ISessionIdRes | IErrorRes> | undefined =
        yield call(requestSessionId, requestToken);

      if (resSessionId && 'sessionId' in resSessionId.data) {
        yield put(successFetchSessionId(resSessionId.data));

        return;
      }
    }

    // Failure response session with login with statusCode
    if (
      resSessionWithLogin &&
      'statusCode' in resSessionWithLogin.data &&
      (resSessionWithLogin.data.statusCode === 30 ||
        resSessionWithLogin.data.statusCode === 32)
    ) {
      yield put(
        failureFetchSessionId(
          resSessionWithLogin.data.statusMessage || ERRORS.GENERAL,
        ),
      );

      return;
    }

    yield put(failureFetchSessionId(ERRORS.GENERAL));
  } catch (exception) {
    yield put(failureFetchSessionId(ERRORS.GENERAL));
  }
}

function* fetchDeleteSessionWorker(action: AnyAction) {
  try {
    const resDeleteSession:
      | AxiosResponse<IDeleteSessionRes | IErrorRes>
      | undefined = yield call(requestDeleteSession, action.payload);

    if (resDeleteSession && resDeleteSession.data.success) {
      yield put(successFetchDeleteSession(resDeleteSession.data.success));

      return;
    }

    yield put(failureFetchDeleteSession(ERRORS.GENERAL));
  } catch (exception) {
    yield put(failureFetchDeleteSession(ERRORS.GENERAL));
  }
}
