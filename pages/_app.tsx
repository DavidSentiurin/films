import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { LayoutContainer } from '../common/containers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutContainer>
      <Component {...pageProps} />
    </LayoutContainer>
  );
}
export default MyApp;
