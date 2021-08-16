import { AxiosResponse } from 'axios';
import { Api } from 'src/common/api';
import { IErrorRes } from 'src/common/api/dto';
import { IGenresRes } from 'src/common/api/dto/genre';
import {
  normalizeResponse,
  normalizeResponseError,
} from 'src/common/api/utils';
import { NOW_PLAYING } from './endpoints';

export function fetchNowPlaying(
  page: number | string,
): Promise<AxiosResponse<IGenresRes | IErrorRes> | undefined> {
  return Api.get(NOW_PLAYING, {
    params: {
      page,
    },
  })
    .then((data) => normalizeResponse<IGenresRes>(data))
    .catch((error) => normalizeResponseError<IErrorRes>(error));
}
