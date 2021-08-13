import { IRequestTokenRes, ISessionIdRes } from '../api';
import { TYPE_KEYS } from './actionTypes';

export interface IRequestTheRequestTokenAction {
  type: TYPE_KEYS.REQUEST_TOKEN_REQUEST;
}
export interface ISuccessFetchRequestTokenAction {
  type: TYPE_KEYS.REQUEST_TOKEN_SUCCESS;
  payload: IRequestTokenRes;
}
export interface IFailureFetchRequestTokenAction {
  type: TYPE_KEYS.REQUEST_TOKEN_FAILURE;
  payload: {
    message: string;
  };
}

export interface ISessionIdFormData {
  username: string;
  password: string;
}
export interface ISessionIdData {
  sessionId: string;
  expireAt: string;
}
export interface IRequestSessionIdAction {
  type: TYPE_KEYS.SESSION_ID_REQUEST;
  payload: ISessionIdFormData;
}
export interface ISuccessFetchSessionIdAction {
  type: TYPE_KEYS.SESSION_ID_SUCCESS;
  payload: ISessionIdRes;
}
export interface IFailureFetchSessionIdAction {
  type: TYPE_KEYS.SESSION_ID_FAILURE;
  payload: {
    message: string;
  };
}
export interface ISetSessionIdDataAction {
  type: TYPE_KEYS.SET_SESSION_ID;
  payload: ISessionIdData;
}

export interface IRequestDeleteSessionAction {
  type: TYPE_KEYS.DELETE_SESSION_REQUEST;
  payload: string;
}
export interface ISuccessFetchDeleteSessionAction {
  type: TYPE_KEYS.DELETE_SESSION_SUCCESS;
  payload: boolean;
}
export interface IFailureFetchDeleteSessionAction {
  type: TYPE_KEYS.DELETE_SESSION_FAILURE;
  payload: {
    message: string;
  };
}

export const requestTheRequestToken = (): IRequestTheRequestTokenAction => ({
  type: TYPE_KEYS.REQUEST_TOKEN_REQUEST,
});
export const successFetchRequestToken = (
  data: IRequestTokenRes,
): ISuccessFetchRequestTokenAction => ({
  type: TYPE_KEYS.REQUEST_TOKEN_SUCCESS,
  payload: data,
});
export const failureFetchRequestToken = (
  error: string,
): IFailureFetchRequestTokenAction => ({
  type: TYPE_KEYS.REQUEST_TOKEN_FAILURE,
  payload: {
    message: error,
  },
});

export const requestSessionId = (
  formData: ISessionIdFormData,
): IRequestSessionIdAction => ({
  type: TYPE_KEYS.SESSION_ID_REQUEST,
  payload: formData,
});
export const successFetchSessionId = (
  data: ISessionIdRes,
): ISuccessFetchSessionIdAction => ({
  type: TYPE_KEYS.SESSION_ID_SUCCESS,
  payload: data,
});
export const failureFetchSessionId = (
  error: string,
): IFailureFetchSessionIdAction => ({
  type: TYPE_KEYS.SESSION_ID_FAILURE,
  payload: {
    message: error,
  },
});
export const setSessionIdData = (
  sessionId: string,
  expireAt: string,
): ISetSessionIdDataAction => ({
  type: TYPE_KEYS.SET_SESSION_ID,
  payload: {
    sessionId,
    expireAt,
  },
});

export const requestDeleteSession = (
  sessionId: string,
): IRequestDeleteSessionAction => ({
  type: TYPE_KEYS.DELETE_SESSION_REQUEST,
  payload: sessionId,
});
export const successFetchDeleteSession = (
  success: boolean,
): ISuccessFetchDeleteSessionAction => ({
  type: TYPE_KEYS.DELETE_SESSION_SUCCESS,
  payload: success,
});
export const failureFetchDeleteSession = (
  error: string,
): IFailureFetchDeleteSessionAction => ({
  type: TYPE_KEYS.DELETE_SESSION_FAILURE,
  payload: {
    message: error,
  },
});
