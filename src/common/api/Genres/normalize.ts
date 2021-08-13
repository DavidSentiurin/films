import { AxiosResponse } from 'axios';
import { GenresMap } from 'src/common/duck/Genres';
import { IGenresData } from 'src/common/duck/Genres/reducer';
import { IGenre } from '../dto';
import { IGenresRes } from '../dto/genre';
import { normalizeResponse } from '../utils';

export const normalizeResponseGeners = (
  data: AxiosResponse<IGenresRes>,
): AxiosResponse<IGenresData> => {
  const normilizedData = normalizeResponse(data);

  normilizedData.data = {
    flat: normilizedData.data.genres,
    map: normilizedData.data.genres.reduce((acc: GenresMap, genre: IGenre) => {
      acc[genre.id] = genre.name;

      return acc;
    }, {}),
  };

  return normilizedData;
};
