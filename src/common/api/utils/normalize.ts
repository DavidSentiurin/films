import { AxiosError, AxiosResponse } from 'axios';
import { cloneDeep } from 'lodash';
import { keysToCamelCase } from 'src/common/api/utils';

export function normalizeResponse<Data>(
  response: AxiosResponse,
): AxiosResponse<Data> {
  const cloneResponse = cloneDeep(response);
  cloneResponse.data = keysToCamelCase(cloneResponse.data);

  return cloneResponse;
}

export function normalizeResponseError<Error>(
  error: AxiosError,
): AxiosResponse<Error> | undefined {
  const { response } = error;
  const cloneResponseError = cloneDeep(response);

  if (cloneResponseError?.data) {
    cloneResponseError.data = keysToCamelCase(cloneResponseError.data);
  }

  return cloneResponseError;
}
