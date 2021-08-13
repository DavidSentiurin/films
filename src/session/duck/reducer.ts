import moment from 'moment';
import { TYPE_KEYS } from './actionTypes';
import {
  IFailureFetchDeleteSessionAction,
  IFailureFetchRequestTokenAction,
  IFailureFetchSessionIdAction,
  IRequestDeleteSessionAction,
  IRequestSessionIdAction,
  IRequestTheRequestTokenAction,
  ISetSessionIdDataAction,
  ISuccessFetchDeleteSessionAction,
  ISuccessFetchRequestTokenAction,
  ISuccessFetchSessionIdAction,
} from './actions';

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

type ActionsTypes =
  | IRequestTheRequestTokenAction
  | ISuccessFetchRequestTokenAction
  | IFailureFetchRequestTokenAction
  | IRequestSessionIdAction
  | ISuccessFetchSessionIdAction
  | IFailureFetchSessionIdAction
  | ISetSessionIdDataAction
  | IRequestDeleteSessionAction
  | ISuccessFetchDeleteSessionAction
  | IFailureFetchDeleteSessionAction;

export const reducer = (
  state: ISessionState = initialState,
  action: ActionsTypes,
): ISessionState => {
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
