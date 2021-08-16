import { RootState } from 'src/store';
import { IGenresData } from './reducer';

export interface IReceiveGenres {
  genres: IGenresData;
  loading: boolean | null;
  error: string | boolean;
}

export const receiveGenres = (state: RootState): IReceiveGenres => ({
  genres: state.genres.data,
  loading: state.genres.loading,
  error: state.genres.error,
});
