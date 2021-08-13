import React, { useContext, useEffect, useRef, useState } from 'react';
import cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  ISingInAction,
  signInAction,
  getRequestTokenAction,
  receiveSessionId,
  setSession,
  singOutAction,
} from '../duck';
import { useRouter } from 'next/router';
import { IRoute, ROUTES } from 'src/common/constants';

const COOKIE_KEYS = {
  SESSION_ID: 'session/sessionId',
};

interface ISession {
  readonly isAuthorized: IsAuthorized;
  readonly signIn: SignIn;
  readonly getRequestToken: GetRequestToken;
  readonly signOut: SignOut;
}

export type IsAuthorized = boolean | null;
export type SignIn = (formData: ISingInAction) => void;
export type SignOut = () => void;
export type GetRequestToken = () => void;

const initialState = {
  isAuthorized: null,
  signIn: () => null,
  getRequestToken: () => null,
  signOut: () => null,
};

const SessionContext = React.createContext<ISession>(initialState);

export const SessionProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const session = useSelector(receiveSessionId);
  // null means isAuthorized is not yet defined
  const [isAuthorized, setIsAuthorized] = useState<IsAuthorized>(null);

  // get sessionId with cookie store when
  useEffect(() => {
    if (!session.id) {
      const sessionDataWithCookie = cookie.get(COOKIE_KEYS.SESSION_ID);

      if (sessionDataWithCookie) {
        const { sessionId, expireAt } = JSON.parse(sessionDataWithCookie);

        dispatch(setSession(sessionId, expireAt));

        setIsAuthorized(true);
        return;
      }
    }

    setIsAuthorized(false);
  }, []);

  // when we are logged in, we set the sessionId in the cookie
  useEffect(() => {
    if (session.id && dispatch) {
      const sessionData = JSON.stringify({
        sessionId: session.id,
        expireAt: moment()
          .add(process.env.NEXT_PUBLIC_EXPIRED_SESSION_ID_MINUTES, 'minutes')
          .utc()
          .format(process.env.NEXT_PUBLIC_DATE_FORMAT),
      });

      cookie.set(COOKIE_KEYS.SESSION_ID, sessionData);

      setIsAuthorized(true);
    }
  }, [session.id, dispatch]);

  useGuard(isAuthorized);
  useSessionObserver(session.id, session.expireAt, signOut);

  function getRequestToken() {
    dispatch(getRequestTokenAction());
  }

  function signIn(formData: ISingInAction) {
    dispatch(signInAction(formData));
  }

  function signOut() {
    dispatch(singOutAction(session.id));

    cookie.remove(COOKIE_KEYS.SESSION_ID);
    setIsAuthorized(false);
  }

  return (
    <SessionContext.Provider
      value={{
        isAuthorized,
        getRequestToken,
        signIn,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

function useGuard(isAuthorized: IsAuthorized) {
  const router = useRouter();
  const defaultRedirect = isAuthorized
    ? ROUTES.NOW_PLAYING.PATH
    : ROUTES.SIGN_IN.PATH;

  useEffect(() => {
    if (isAuthorized !== null) {
      const currentRoute: IRoute = Object.values(ROUTES).find(
        (route) => route.PATH === router.pathname,
      );

      if (
        currentRoute?.AUTHORIZED.ACCESS !== undefined &&
        currentRoute.AUTHORIZED.ACCESS !== isAuthorized
      ) {
        const redirect = currentRoute.AUTHORIZED.REDIRECT || defaultRedirect;
        router.replace(redirect);
      }
    }
  }, [isAuthorized, router.pathname]);
}

function useSessionObserver(
  sessionId: string,
  expireAt: string,
  signOut: SignOut,
) {
  const removeId = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (sessionId && expireAt) {
      removeId.current = setInterval(() => {
        const nowUnix = moment().unix();
        const expireAtUnix = moment(expireAt).unix();

        if (nowUnix >= expireAtUnix) {
          signOut();
        }
      }, 1000);
    }

    return () => {
      if (removeId.current) {
        clearInterval(removeId.current);
      }
    };
  }, [sessionId, expireAt]);
}

export const useSession = () => {
  return useContext(SessionContext);
};
