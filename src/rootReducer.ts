import { combineReducers } from 'redux';

import { reducer as session } from './session/duck';
import { reducer as genres } from './common/duck/Genres';
import { reducer as nowPlaying } from './now-playing/duck';

export function rootReducer() {
  return combineReducers({
    session,
    genres,
    nowPlaying,
  });
}
