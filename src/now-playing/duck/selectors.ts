import { RootState } from 'src/store';
import { INowPlayingMap } from './reducer';

export const receiveNowPlaying = (store: RootState) => ({
  films: store.nowPlaying.data,
  loading: store.nowPlaying.loading,
  error: store.nowPlaying.error,
});
export const receiveNowPlayingFilmsByPage = (
  store: RootState,
  page: number | string,
) => (store.nowPlaying.data.map as INowPlayingMap)?.[page];
