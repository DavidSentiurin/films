import React, { useContext, useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {
  ISingInAction,
  signInAction,
  getRequestTokenAction,
  receiveSessionId,
  setSessionId,
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
  const sessionId = useSelector(receiveSessionId);
  // null means isAuthorized is not yet defined
  const [isAuthorized, setIsAuthorized] = useState<IsAuthorized>(null);

  // get sessionId with cookie store when
  useEffect(() => {
    if (!sessionId) {
      const sessionIdWithCookie = cookie.get(COOKIE_KEYS.SESSION_ID);

      if (sessionIdWithCookie) {
        dispatch(setSessionId(sessionIdWithCookie));

        setIsAuthorized(true);
        return;
      }
    }

    setIsAuthorized(false);
  }, []);

  // when we are logged in, we set the sessionId in the cookie
  useEffect(() => {
    if (sessionId && dispatch) {
      cookie.set(COOKIE_KEYS.SESSION_ID, sessionId);

      setIsAuthorized(true);
    }
  }, [sessionId, dispatch]);

  useGuard(isAuthorized);

  const getRequestToken = () => {
    dispatch(getRequestTokenAction());
  };

  const signIn: SignIn = (formData) => {
    dispatch(signInAction(formData));
  };

  const signOut: SignOut = () => {
    dispatch(singOutAction(sessionId));

    cookie.remove(COOKIE_KEYS.SESSION_ID);
    setIsAuthorized(false);
  };

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
    ? ROUTES.NOW_WATCHING.PATH
    : ROUTES.SIGN_IN.PATH;

  useEffect(() => {
    if (isAuthorized !== null) {
      const currentRoute: IRoute = Object.values(ROUTES).find(
        (route) => route.PATH === router.pathname,
      );

      if (currentRoute?.AUTHORIZED.ACCESS !== isAuthorized) {
        const redirect = currentRoute.AUTHORIZED.REDIRECT || defaultRedirect;
        router.replace(redirect);
      }
    }
  }, [isAuthorized, router.pathname]);
}

export const useSession = () => {
  return useContext(SessionContext);
};
