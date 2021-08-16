import { RootState } from '../../store';
import { ISessionIdData } from './actions';

export const receiveRequestToken = (state: RootState): string =>
  state.session.requestToken.data;
export const receiveSessionId = (state: RootState): ISessionIdData =>
  state.session.session.data;
