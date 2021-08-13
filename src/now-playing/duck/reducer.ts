import { INowPlayingFilm } from '../api';
import {
  IfailureFetchNowPlayingAction,
  IRequestNowPlayingAction,
  ISuccessFetchNowPlayingAction,
} from './actions';
import { TYPE_KEYS } from './actionTypes';

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

type ActionTypes =
  | IRequestNowPlayingAction
  | ISuccessFetchNowPlayingAction
  | IfailureFetchNowPlayingAction;

export const reducer = (
  state: INowPlayingStore = initialState,
  action: ActionTypes,
): INowPlayingStore => {
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
