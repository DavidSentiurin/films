import { IUserData } from './index';

export interface INormalizeUserDataForReq {
  username: string;
  password: string;
  request_token: string;
}

export function normalizeSessionWithLoginRequest(
  userData: IUserData,
): INormalizeUserDataForReq {
  return {
    username: userData.username,
    password: userData.password,
    request_token: userData.requestToken,
  };
}
