import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  PageLoading,
  SignIn as SignInComponent,
} from '../../common/components';
import { useAlert } from '../../common/hooks';
import { RootState } from '../../store';
import { REGEX } from '../../common/constants';
import { useSession } from '../provider';

export type OnFinish = (values: { username: string; password: string }) => void;

export const SignInContainer: React.FC = () => {
  const session = useSelector((state: RootState) => state.session);
  const { showAlert } = useAlert();
  const { signIn, getRequestToken, isAuthorized } = useSession();

  useEffect(() => {
    if (!session.session.loading) {
      showAlert({
        content: session.session.error,
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
    session.session.error,
    session.session.loading,
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
        disableForm={!!session.session.loading}
        loadingFormBtn={!!session.session.loading}
        onFinish={onFinish}
        done={isAuthorized}
        error={!!session.requestToken.error}
      />
    </>
  );
};
