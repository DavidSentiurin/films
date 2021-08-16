import moment from 'moment';
import { TYPE_KEYS } from './actionTypes';
import { ISessionIdData, SessionActionsTypes } from './actions';

const requestTokenInital = {
  data: '',
  loading: null as boolean | null,
  error: false as boolean | string,
};

const sessionInitial = {
  data: {
    id: '',
    expireAt: '',
  } as ISessionIdData,
  loading: null as boolean | null,
  error: false as boolean | string,
};

const deleteSessionInitial = {
  data: null as boolean | null,
  loading: null as boolean | null,
  error: false as boolean | string,
};

const initialState = {
  requestToken: requestTokenInital,
  session: sessionInitial,
  deleteSession: deleteSessionInitial,
};

export type SessionState = typeof initialState;

export const reducer = (
  state: SessionState = initialState,
  action: SessionActionsTypes,
): SessionState => {
  switch (action.type) {
    case TYPE_KEYS.REQUEST_TOKEN_REQUEST: {
      return {
        ...state,
        requestToken: {
          ...state.requestToken,
          loading: true,
          error: false,
        },
      };
    }
    case TYPE_KEYS.REQUEST_TOKEN_SUCCESS: {
      const { requestToken } = action.payload;

      return {
        ...state,
        requestToken: {
          ...state.requestToken,
          data: requestToken,
          loading: false,
        },
      };
    }
    case TYPE_KEYS.REQUEST_TOKEN_FAILURE: {
      return {
        ...state,
        requestToken: {
          ...state.requestToken,
          loading: false,
          error: action.payload.message,
        },
      };
    }

    case TYPE_KEYS.SESSION_ID_REQUEST: {
      return {
        ...state,
        session: {
          ...state.session,
          loading: true,
          error: false,
        },
      };
    }
    case TYPE_KEYS.SESSION_ID_SUCCESS: {
      const { sessionId } = action.payload;

      return {
        ...state,
        session: {
          ...state.session,
          data: {
            id: sessionId,
            expireAt: moment()
              .add(
                process.env.NEXT_PUBLIC_EXPIRED_SESSION_ID_MINUTES,
                'minutes',
              )
              .utc()
              .format(process.env.NEXT_PUBLIC_DATE_FORMAT),
          },
          loading: false,
        },

        // reset state of deleteSession
        deleteSession: deleteSessionInitial,
      };
    }
    case TYPE_KEYS.SESSION_ID_FAILURE: {
      return {
        ...state,
        session: {
          ...state.session,
          loading: false,
          error: action.payload.message,
        },
      };
    }
    case TYPE_KEYS.SET_SESSION_ID: {
      const { id, expireAt } = action.payload;

      return {
        ...state,
        session: {
          ...state.session,
          data: {
            id,
            expireAt,
          },
        },
      };
    }

    case TYPE_KEYS.DELETE_SESSION_REQUEST: {
      return {
        ...state,
        deleteSession: {
          ...state.deleteSession,
          loading: true,
          error: false,
        },
      };
    }
    case TYPE_KEYS.DELETE_SESSION_SUCCESS: {
      return {
        ...state,
        deleteSession: {
          ...state.deleteSession,
          data: action.payload,
          loading: false,
        },
        // reset session state
        session: sessionInitial,
        // reset requestToken state
        requestToken: requestTokenInital,
      };
    }
    case TYPE_KEYS.DELETE_SESSION_FAILURE: {
      return {
        ...state,
        deleteSession: {
          ...state.deleteSession,
          loading: false,
          error: action.payload.message,
        },
      };
    }

    default:
      return state;
  }
};
