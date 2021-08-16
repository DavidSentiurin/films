import { AxiosResponse } from 'axios';
import { IGenresData } from 'src/common/duck/Genres/reducer';
import { Api } from '../base';
import { IErrorRes } from '../dto';
import { normalizeResponseError } from '../utils';
import { GENRES } from './index';
import { normalizeResponseGeners } from './index';

export function fetchGenres(): Promise<
  AxiosResponse<IGenresData | IErrorRes> | undefined
> {
  return Api.get(GENRES)
    .then((data) => normalizeResponseGeners(data))
    .catch((error) => normalizeResponseError<IErrorRes>(error));
}
