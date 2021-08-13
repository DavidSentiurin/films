import { IGenre } from 'src/common/api/dto';
import {
  IFailureFetchGenresAction,
  IFetchGenresAction,
  ISuccessFetchGenresAction,
} from './actions';
import { TYPE_KEYS } from './actionTypes';

export type IGenresData = {
  flat: IGenre[];
  map: GenresMap;
};
export interface IGenresState {
  data: IGenresData;
  loading: boolean | null;
  error: boolean | string;
}

export type GenresMap = {
  [id: string]: string;
};

const initalState = {
  data: {
    flat: [],
    map: {},
  },
  loading: null,
  error: false,
};

type ActionTypes =
  | IFetchGenresAction
  | ISuccessFetchGenresAction
  | IFailureFetchGenresAction;

export const reducer = (
  state: IGenresState = initalState,
  action: ActionTypes,
) => {
  switch (action.type) {
    case TYPE_KEYS.GENRES_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case TYPE_KEYS.GENRES_SUCCESS: {
      return {
        ...state,
        data: {
          flat: action.payload.flat,
          map: action.payload.map,
        },
        loading: false,
      };
    }
    case TYPE_KEYS.GENRES_FAILURE: {
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
