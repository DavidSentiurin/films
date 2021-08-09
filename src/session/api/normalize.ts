import { AxiosError, AxiosResponse } from 'axios';
import { cloneDeep } from 'lodash';
import { keysToCamelCase } from 'src/common/api/utils';
import { IUserData } from './index';

export function normalizeResponse(response: AxiosResponse) {
  const cloneResponse = cloneDeep(response);
  cloneResponse.data = keysToCamelCase(cloneResponse.data);

  return cloneResponse;
}

export function normalizeResponseError(error: AxiosError) {
  const { response } = error;
  const cloneResponseError = cloneDeep(response);

  if (cloneResponseError?.data) {
    cloneResponseError.data = keysToCamelCase(cloneResponseError.data);
  }

  return cloneResponseError;
}

export function normalizeSessionIdRequest(userData: IUserData) {
  return {
    username: userData.username,
    password: userData.password,
    request_token: userData.requestToken,
  };
}
