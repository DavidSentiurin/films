import { IGenre } from 'src/common/api/dto';
import { GenresActionTypes } from '.';
import { TYPE_KEYS } from './actionTypes';

export type IGenresData = {
  flat: IGenre[];
  map: GenresMap;
};

export type GenresMap = {
  [id: string]: string;
};

const initalState = {
  data: {
    flat: [],
    map: {},
  } as IGenresData,
  loading: null as boolean | null,
  error: false as boolean | string,
};

export type GenresState = typeof initalState;

export const reducer = (
  state: GenresState = initalState,
  action: GenresActionTypes,
): GenresState => {
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
