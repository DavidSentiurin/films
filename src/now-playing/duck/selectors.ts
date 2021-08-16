import { RootState } from 'src/store';
import { INowPlayingFilm } from '../api';
import { INowPlayingMap } from './reducer';

export interface INowPlayingState {
  films: {
    map: INowPlayingMap;
    totalPages: number;
    totalResults: number;
  };
  loading: boolean | null;
  error: boolean | string;
}

export const receiveNowPlaying = (store: RootState): INowPlayingState => ({
  films: store.nowPlaying.data,
  loading: store.nowPlaying.loading,
  error: store.nowPlaying.error,
});

export const receiveNowPlayingFilmsByPage = (
  store: RootState,
  page: number | string,
): INowPlayingFilm[] => store.nowPlaying.data.map?.[page];
