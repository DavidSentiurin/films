import Head from 'next/head';
import { ROUTES } from '../src/common/constants';
import { SignInContainer } from '../src/common/containers';

export default function SignIn() {
  const pageName = ROUTES.SIGN_IN.NAME;

  return (
    <>
      <Head>
        <title>{pageName}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <SignInContainer />
    </>
  );
}
