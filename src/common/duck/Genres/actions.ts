import { TYPE_KEYS } from './actionTypes';
import { IGenresData } from './reducer';

export interface IFetchGenresAction {
  type: TYPE_KEYS.GENRES_REQUEST;
}

export interface ISuccessFetchGenresAction {
  type: TYPE_KEYS.GENRES_SUCCESS;
  payload: IGenresData;
}

export interface IFailureFetchGenresAction {
  type: TYPE_KEYS.GENRES_FAILURE;
  payload: {
    message: string;
  };
}

export const fetchGenres = (): IFetchGenresAction => ({
  type: TYPE_KEYS.GENRES_REQUEST,
});

export const successFetchGenres = (
  data: IGenresData,
): ISuccessFetchGenresAction => ({
  type: TYPE_KEYS.GENRES_SUCCESS,
  payload: {
    flat: data.flat,
    map: data.map,
  },
});

export const failureFetchGenres = (
  error: string,
): IFailureFetchGenresAction => ({
  type: TYPE_KEYS.GENRES_FAILURE,
  payload: {
    message: error,
  },
});

export type GenresActionTypes =
  | IFetchGenresAction
  | ISuccessFetchGenresAction
  | IFailureFetchGenresAction;
