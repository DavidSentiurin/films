import { AxiosResponse } from 'axios';
import { GenresMap } from 'src/common/duck/Genres';
import { IGenre } from '../dto';
import { normalizeResponse } from '../utils';

export function normalizeResponseGeners(data: AxiosResponse) {
  const normilizedData = normalizeResponse(data);

  normilizedData.data = {
    flat: normilizedData.data.genres,
    map: normilizedData.data.genres.reduce((acc: GenresMap, genre: IGenre) => {
      acc[genre.id] = genre.name;

      return acc;
    }, {}),
  };

  return normilizedData;
}
