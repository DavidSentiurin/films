import { INowPlaying } from '../api';
import {
  NOW_PLAYING_FAILURE,
  NOW_PLAYING_REQUEST,
  NOW_PLAYING_SUCCESS,
} from './actionTypes';

export const requestNowPlaying = (page: number | string) => ({
  type: NOW_PLAYING_REQUEST,
  payload: page,
});

export const successFetchNowPlaying = (data: INowPlaying) => ({
  type: NOW_PLAYING_SUCCESS,
  payload: data,
});

export const failureFetchNowPlaying = (message: string) => ({
  type: NOW_PLAYING_FAILURE,
  payload: { message },
});
