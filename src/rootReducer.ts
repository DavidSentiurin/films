import { CombinedState, combineReducers, Reducer } from 'redux';
import {
  reducer as session,
  SessionActionsTypes,
  SessionState,
} from './session/duck';
import { GenresState, reducer as genres } from './common/duck/Genres';
import {
  NowPlayingActionTypes,
  reducer as nowPlaying,
} from './now-playing/duck';
import { NowPlayingState } from './now-playing/duck/reducer';

type RootReducer = Reducer<
  CombinedState<{
    session: SessionState;
    genres: GenresState;
    nowPlaying: NowPlayingState;
  }>,
  SessionActionsTypes | NowPlayingActionTypes | NowPlayingActionTypes
>;

export function rootReducer(): RootReducer {
  return combineReducers({
    session,
    genres,
    nowPlaying,
  });
}
