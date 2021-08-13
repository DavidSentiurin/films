import { isString } from 'lodash';
import { camelizeKeys } from 'src/common/utils';

export function keysToCamelCase(data: any) {
  const parseData = isString(data) ? JSON.parse(data) : data;

  return camelizeKeys(parseData);
}
