import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  PageLoading,
  SignIn as SignInComponent,
} from '../../common/components';
import { useAlert } from '../../common/hooks';
import { RootState } from '../../store';
import { REGEX } from '../../common/constants';
import { useSession } from '../index';

export type OnFinish = (values: { username: string; password: string }) => any;

export const SignInContainer: React.FC = () => {
  const session = useSelector((state: RootState) => state.session);
  const { showAlert } = useAlert();
  const { signIn, getRequestToken, isAuthorized } = useSession();

  useEffect(() => {
    if (!session.sessionId.loading) {
      showAlert({
        content: session.sessionId.error,
        duration: 3,
        type: 'error',
      });
    }

    if (!session.requestToken.loading) {
      showAlert({
        content: session.requestToken.error,
        duration: 3,
        type: 'error',
      });
    }
  }, [
    showAlert,
    session.sessionId.error,
    session.sessionId.loading,
    session.requestToken.error,
    session.requestToken.loading,
  ]);

  useEffect(() => {
    if (session.requestToken.loading === null) {
      getRequestToken();
    }
  }, [session.requestToken.loading, getRequestToken]);

  const onFinish: OnFinish = (values) => {
    if (
      values.username &&
      values.password &&
      new RegExp(REGEX.USERNAME).test(values.username)
    ) {
      signIn(values);
    }
  };

  if (session.requestToken.loading || session.deleteSession.loading) {
    return <PageLoading />;
  }

  return (
    <>
      <SignInComponent
        disableForm={!!session.sessionId.loading}
        loadingFormBtn={!!session.sessionId.loading}
        onFinish={onFinish}
        done={isAuthorized}
        error={!!session.requestToken.error}
      />
    </>
  );
};
