import { AxiosError, AxiosResponse } from 'axios';
import { cloneDeep } from 'lodash';
import { keysToCamelCase } from 'src/common/api/utils';

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
