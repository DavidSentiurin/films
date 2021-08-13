import { Api } from '../base';
import { normalizeResponseError } from '../utils';
import { GENRES } from './index';
import { normalizeResponseGeners } from './index';

export function fetchGenres() {
  return Api.get(GENRES)
    .then((data) => normalizeResponseGeners(data))
    .catch((error) => normalizeResponseError(error));
}
