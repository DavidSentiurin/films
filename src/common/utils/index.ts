import { camelCase, isNumber } from 'lodash';

type Data = { [key: string]: any } | any[];

export const camelizeKeys = (data: Data): Data => {
  if (Array.isArray(data)) {
    return data.map((v) => camelizeKeys(v));
  } else if (data != null && data.constructor === Object) {
    return Object.keys(data).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(data[key]),
      }),
      {},
    );
  }

  return data;
};

export const getImageRatio = (widthOrHeight: number, ratio: number) => {
  if (isNumber(widthOrHeight) && isNumber(ratio)) {
    return ratio * widthOrHeight;
  }
};
