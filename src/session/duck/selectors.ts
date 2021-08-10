import { RootState } from '../../store';

export const receiveRequestToken = (state: RootState) =>
  state.session.requestToken.data;
export const receiveSessionId = (state: RootState) =>
  state.session.session.data;
