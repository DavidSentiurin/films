import { IUserData } from './index';

export function normalizeSessionIdRequest(userData: IUserData) {
  return {
    username: userData.username,
    password: userData.password,
    request_token: userData.requestToken,
  };
}
