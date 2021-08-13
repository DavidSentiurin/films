import { AnyAction } from 'redux';
import { IGenre } from 'src/common/api/dto';
import {
  GET_GENRES,
  LOAD_FAILD_GENRES,
  LOAD_SUCCESS_GENRES,
} from './actionTypes';

export interface IGenresState {
  data: {
    flat: IGenre[];
    map: GenresMap;
  };
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

export const reducer = (
  state: IGenresState = initalState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GET_GENRES: {
      return {
        ...state,
        data: {
          flat: action.payload.flat,
          map: action.payload.map,
        },
      };
    }
    case LOAD_SUCCESS_GENRES: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case LOAD_FAILD_GENRES: {
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
