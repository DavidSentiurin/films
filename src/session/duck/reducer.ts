import { AnyAction } from 'redux';
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
} from './actionTypes';

export interface ISessionState {
  sessionId: {
    data: string;
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

const sessionIdInitial = {
  data: '',
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
  sessionId: sessionIdInitial,
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
        sessionId: {
          ...state.sessionId,
          data: sessionId,
        },

        // reset state of deleteSession
        deleteSession: deleteSessionInitial,
      };
    }
    case LOAD_SESSION_ID: {
      return {
        ...state,
        sessionId: {
          ...state.sessionId,
          loading: true,
        },
      };
    }
    case LOAD_SUCCESS_SESSION_ID: {
      return {
        ...state,
        sessionId: {
          ...state.sessionId,
          loading: false,
          error: false,
        },
      };
    }
    case LOAD_FAILD_SESSION_ID: {
      return {
        ...state,
        sessionId: {
          ...state.sessionId,
          loading: false,
          error: action.payload.message,
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
        // reset sessionId state
        sessionId: sessionIdInitial,
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
