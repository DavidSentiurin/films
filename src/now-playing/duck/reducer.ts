import { AnyAction } from 'redux';
import { INowPlayingFilm } from '../api';
import {
  NOW_PLAYING_REQUEST,
  NOW_PLAYING_SUCCESS,
  NOW_PLAYING_FAILURE,
} from './actionTypes';

export interface INowPlayingStore {
  data: {
    map: INowPlayingMap;
    totalPages: number;
    totalResults: number;
  };
  loading: boolean | null;
  error: boolean | string;
}

export interface INowPlayingMap {
  [pageNumber: string]: INowPlayingFilm[];
}

const initialState = {
  data: {
    map: {},
    totalPages: 0,
    totalResults: 0,
  },
  loading: null,
  error: false,
};

export const reducer = (
  state: INowPlayingStore = initialState,
  action: AnyAction,
): INowPlayingStore => {
  switch (action.type) {
    case NOW_PLAYING_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case NOW_PLAYING_SUCCESS: {
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

    case NOW_PLAYING_FAILURE: {
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
