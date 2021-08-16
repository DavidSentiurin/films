import { NowPlayingActionTypes } from './index';
import { INowPlayingFilm } from '../api';
import { TYPE_KEYS } from './actionTypes';

export interface INowPlayingMap {
  [pageNumber: string]: INowPlayingFilm[];
}

const initialState = {
  data: {
    map: {} as INowPlayingMap,
    totalPages: 0,
    totalResults: 0,
  },
  loading: null as null | boolean,
  error: false as boolean | string,
};

export type NowPlayingState = typeof initialState;

export const reducer = (
  state: NowPlayingState = initialState,
  action: NowPlayingActionTypes,
): NowPlayingState => {
  switch (action.type) {
    case TYPE_KEYS.NOW_PLAYING_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case TYPE_KEYS.NOW_PLAYING_SUCCESS: {
      const { totalPages, totalResults, page, results } = action.payload;

      return {
        ...state,
        data: {
          map: {
            ...state.data.map,
            [page]: results,
          },
          totalPages,
          totalResults,
        },
        loading: false,
      };
    }

    case TYPE_KEYS.NOW_PLAYING_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    }

    default: {
      return state;
    }
  }
};
