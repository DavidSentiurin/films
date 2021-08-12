import { RootState } from 'src/store';

export const receiveGenres = (state: RootState) => ({
  genres: state.genres.data,
  loading: state.genres.loading,
  error: state.genres.error,
});
