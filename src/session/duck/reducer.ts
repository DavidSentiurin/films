import { AnyAction } from 'redux';
import moment from 'moment';
import {
  GET_REQUEST_TOKEN,
  LOAD_FAILD_REQUEST_TOKEN,
  LOAD_FAILD_SESSION_ID,
  LOAD_REQUEST_TOKEN,
  LOAD_SESSION_ID,
  LOAD_SUCCESS_REQUEST_TOKEN,
  LOAD_SUCCESS_SESSION_ID,
  GET_SESSION_ID,
  DELETE_SESSION,
  LOAD_DELETE_SESSION,
  LOAD_SUCCESS_DELETE_SESSION,
  LOAD_FAILD_DELETE_SESSION,
  SET_SESSION_ID,
} from './actionTypes';

export interface ISessionState {
  session: {
    data: {
      id: string;
      expireAt: string;
    };
    // loading: null is initial loading.
    loading: boolean | null;
    error: string | boolean;
  };
  requestToken: {
    data: string;
    // loading: null is initial loading.
    loading: boolean | null;
    error: string | boolean;
  };
  deleteSession: {
    data: boolean | null;
    loading: boolean | null;
    error: string | boolean;
  };
}

const requestTokenInital = {
  data: '',
  loading: null,
  error: false,
};

const sessionInitial = {
  data: {
    id: '',
    expireAt: '',
  },
  loading: null,
  error: false,
};

const deleteSessionInitial = {
  data: null,
  loading: null,
  error: false,
};

const initialState = {
  requestToken: requestTokenInital,
  session: sessionInitial,
  deleteSession: deleteSessionInitial,
};

export function reducer(
  state: ISessionState = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case GET_REQUEST_TOKEN: {
      const { requestToken } = action.payload;

      return {
        ...state,
        requestToken: {
          ...state.requestToken,
          data: requestToken,
        },
      };
    }
    case LOAD_REQUEST_TOKEN: {
      return {
        ...state,
        requestToken: {
          ...state.requestToken,
          loading: true,
        },
      };
    }
    case LOAD_SUCCESS_REQUEST_TOKEN: {
      return {
        ...state,
        requestToken: {
          ...state.requestToken,
          loading: false,
          error: false,
        },
      };
    }
    case LOAD_FAILD_REQUEST_TOKEN: {
      return {
        ...state,
        requestToken: {
          ...state.requestToken,
          loading: false,
          error: action.payload.message,
        },
      };
    }

    case GET_SESSION_ID: {
      const { sessionId } = action.payload.data;

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
        },

        // reset state of deleteSession
        deleteSession: deleteSessionInitial,
      };
    }
    case LOAD_SESSION_ID: {
      return {
        ...state,
        session: {
          ...state.session,
          loading: true,
        },
      };
    }
    case LOAD_SUCCESS_SESSION_ID: {
      return {
        ...state,
        session: {
          ...state.session,
          loading: false,
          error: false,
        },
      };
    }
    case LOAD_FAILD_SESSION_ID: {
      return {
        ...state,
        session: {
          ...state.session,
          loading: false,
          error: action.payload.message,
        },
      };
    }
    case SET_SESSION_ID: {
      const { sessionId, expireAt } = action.payload;

      return {
        ...state,
        session: {
          ...state.session,
          data: {
            id: sessionId,
            expireAt,
          },
        },
      };
    }

    case DELETE_SESSION: {
      return {
        ...state,
        deleteSession: {
          ...state.deleteSession,
          data: action.payload,
        },
        // reset session state
        session: sessionInitial,
        // reset requestToken state
        requestToken: requestTokenInital,
      };
    }
    case LOAD_DELETE_SESSION: {
      return {
        ...state,
        deleteSession: {
          ...state.deleteSession,
          loading: true,
        },
      };
    }
    case LOAD_SUCCESS_DELETE_SESSION: {
      return {
        ...state,
        deleteSession: {
          ...state.deleteSession,
          loading: false,
          error: false,
        },
      };
    }
    case LOAD_FAILD_DELETE_SESSION: {
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
}
