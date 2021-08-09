import { combineReducers } from 'redux';

import { reducer as session } from './session';

export function rootReducer() {
  return combineReducers({
    session,
  });
}
