import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { Api } from 'src/common/api';
import {
  CREATE_SESSION,
  REQUEST_TOKEN,
  SESSION_WITH_LOGIN,
  DELETE_SESSION,
} from './index';
import {
  normalizeResponse,
  normalizeResponseError,
  normalizeSessionIdRequest,
} from './index';

export function requestTheRequestToken() {
  return Api.get(REQUEST_TOKEN)
    .then((data) => normalizeResponse(data))
    .catch((error) => normalizeResponseError(error));
}

export interface IUserData {
  username: string;
  password: string;
  requestToken: string;
}

export function requestSessionId(userData: IUserData) {
  // Create Session With Login
  return Api.post(SESSION_WITH_LOGIN, normalizeSessionIdRequest(userData))
    .then((resSessionWithLogin) => {
      const { data } = normalizeResponse(resSessionWithLogin);

      if (data.requestToken) {
        // Create Session Id
        return Api.post(CREATE_SESSION, {
          request_token: userData.requestToken,
        });
      }

      return {};
    })
    .then((resSessionId) => {
      if (isEmpty(resSessionId)) {
        return {};
      }

      return normalizeResponse(resSessionId as AxiosResponse);
    })
    .catch((error) => normalizeResponseError(error));
}

export function requestDeleteSession(sessionId: string) {
  return Api.delete(DELETE_SESSION, {
    data: {
      session_id: sessionId,
    },
  })
    .then((data) => normalizeResponse(data))
    .catch((error) => normalizeResponseError(error));
}
