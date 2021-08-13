import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { LayoutContainer } from '../src/common/containers';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { SessionProvider } from 'src/session/provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <LayoutContainer>
          <Component {...pageProps} />
        </LayoutContainer>
      </SessionProvider>
    </Provider>
  );
}
export default MyApp;
