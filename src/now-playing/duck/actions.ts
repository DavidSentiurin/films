import { INowPlaying } from '../api';
import { TYPE_KEYS } from './actionTypes';

type Page = number | string;
export interface IRequestNowPlayingAction {
  type: TYPE_KEYS.NOW_PLAYING_REQUEST;
  payload: Page;
}

export interface ISuccessFetchNowPlayingAction {
  type: TYPE_KEYS.NOW_PLAYING_SUCCESS;
  payload: INowPlaying;
}

export interface IfailureFetchNowPlayingAction {
  type: TYPE_KEYS.NOW_PLAYING_FAILURE;
  payload: {
    message: string;
  };
}

export const requestNowPlaying = (page: Page): IRequestNowPlayingAction => ({
  type: TYPE_KEYS.NOW_PLAYING_REQUEST,
  payload: page,
});

export const successFetchNowPlaying = (
  data: INowPlaying,
): ISuccessFetchNowPlayingAction => ({
  type: TYPE_KEYS.NOW_PLAYING_SUCCESS,
  payload: data,
});

export const failureFetchNowPlaying = (
  message: string,
): IfailureFetchNowPlayingAction => ({
  type: TYPE_KEYS.NOW_PLAYING_FAILURE,
  payload: { message },
});

export type NowPlayingActionTypes =
  | IRequestNowPlayingAction
  | ISuccessFetchNowPlayingAction
  | IfailureFetchNowPlayingAction;
