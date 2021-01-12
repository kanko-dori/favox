import Helmet from '@/components/Helmet';
import { FirebaseProvider } from '@/lib/firebase';
import { UserProvider } from '@/lib/UserProvider';
import type { AppProps } from 'next/app';
import './_app.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Helmet title="Favox" description="好きを共有する" color="#ffbf00">
        <meta charSet="utf8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;900&family=Roboto:wght@400;900&display=swap"
          rel="stylesheet"
        />
        <meta key="twitter:image" name="twitter:image" content="/images/icon512.png" />
        <meta key="og:image" property="og:image" content="/images/icon512.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favox.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/icon192.png" />
      </Helmet>
      <FirebaseProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </FirebaseProvider>
    </>
  );
};

export default App;
