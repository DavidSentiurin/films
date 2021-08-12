import { REQUEST_NOW_PLAYING } from './actionTypes';

export const fetchNowPlayingAction = (page: number | string) => ({
  type: REQUEST_NOW_PLAYING,
  payload: page,
});
