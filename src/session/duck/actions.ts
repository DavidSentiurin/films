import {
  REQUEST_DELETE_SESSION,
  REQUEST_SESSION_ID,
  REQUEST_THE_REQUEST_TOKEN,
  SET_SESSION_ID,
} from './actionTypes';

export interface ISingInAction {
  username: string;
  password: string;
}

export const signInAction = (formData: ISingInAction) => ({
  type: REQUEST_SESSION_ID,
  payload: formData,
});
export const getRequestTokenAction = () => ({
  type: REQUEST_THE_REQUEST_TOKEN,
});
export const setSession = (sessionId: string, expireAt: string) => ({
  type: SET_SESSION_ID,
  payload: {
    sessionId,
    expireAt,
  },
});
export const singOutAction = (sessionId: string) => ({
  type: REQUEST_DELETE_SESSION,
  payload: sessionId,
});
