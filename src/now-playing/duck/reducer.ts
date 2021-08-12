import { AnyAction } from 'redux';
import { INowPlayingFilm } from '../api';
import {
  GET_NOW_PLAYING,
  LOAD_FAILD_NOW_PLAYING,
  LOAD_NOW_PLAYING,
  LOAD_SUCCESS_NOW_PLAYING,
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
    case GET_NOW_PLAYING: {
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
      };
    }
    case LOAD_NOW_PLAYING: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_SUCCESS_NOW_PLAYING: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case LOAD_FAILD_NOW_PLAYING: {
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
