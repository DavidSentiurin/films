import { isString } from 'lodash';
import { camelizeKeys } from 'src/common/utils';

//eslint-disable-next-line
export function keysToCamelCase(data: any) {
  const parseData = isString(data) ? JSON.parse(data) : data;

  return camelizeKeys(parseData);
}
