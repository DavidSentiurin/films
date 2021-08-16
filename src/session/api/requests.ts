import { AxiosResponse } from 'axios';
import { Api } from 'src/common/api';
import { IErrorRes } from 'src/common/api/dto';
import {
  normalizeResponse,
  normalizeResponseError,
} from 'src/common/api/utils';
import {
  IDeleteSessionRes,
  IRequestTokenRes,
  ISessionIdRes,
  ISessionWithLoginRes,
} from './dto';
import {
  CREATE_SESSION,
  REQUEST_TOKEN,
  SESSION_WITH_LOGIN,
  DELETE_SESSION,
} from './index';
import { normalizeSessionWithLoginRequest } from './index';

export function requestTheRequestToken(): Promise<
  AxiosResponse<IRequestTokenRes | IErrorRes> | undefined
> {
  return Api.get(REQUEST_TOKEN)
    .then((data) => normalizeResponse<IRequestTokenRes>(data))
    .catch((error) => normalizeResponseError<IErrorRes>(error));
}

export interface IUserData {
  username: string;
  password: string;
  requestToken: string;
}

export function reqeustSessionWithLogin(
  userData: IUserData,
): Promise<AxiosResponse<ISessionWithLoginRes | IErrorRes> | undefined> {
  return Api.post(
    SESSION_WITH_LOGIN,
    normalizeSessionWithLoginRequest(userData),
  )
    .then((resSessionId) =>
      normalizeResponse<ISessionWithLoginRes>(resSessionId),
    )
    .catch((error) => normalizeResponseError<IErrorRes>(error));
}

export function requestSessionId(
  requestToken: string,
): Promise<AxiosResponse<ISessionIdRes | IErrorRes> | undefined> {
  return Api.post(CREATE_SESSION, {
    request_token: requestToken,
  })
    .then((resSessionWithLogin) =>
      normalizeResponse<ISessionIdRes>(resSessionWithLogin),
    )
    .catch((error) => normalizeResponseError<IErrorRes>(error));
}

export function requestDeleteSession(
  sessionId: string,
): Promise<AxiosResponse<IDeleteSessionRes | IErrorRes> | undefined> {
  return Api.delete(DELETE_SESSION, {
    data: {
      session_id: sessionId,
    },
  })
    .then((data) => normalizeResponse<IDeleteSessionRes>(data))
    .catch((error) => normalizeResponseError<IErrorRes>(error));
}
