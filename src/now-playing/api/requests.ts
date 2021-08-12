import { Api } from 'src/common/api';
import {
  normalizeResponse,
  normalizeResponseError,
} from 'src/common/api/utils';
import { NOW_PLAYING } from './endpoints';

export function fetchNowPlaying(page: number | string) {
  return Api.get(NOW_PLAYING, {
    params: {
      page,
    },
  })
    .then((data) => normalizeResponse(data))
    .catch((error) => normalizeResponseError(error));
}
