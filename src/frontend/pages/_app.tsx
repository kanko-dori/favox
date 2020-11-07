import Helmet from '@/components/Helmet';
import type { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Helmet title="Favox" description="好きを共有する" color="#ffcc33">
        <meta charSet="utf8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Helmet>
      <Component {...pageProps} />
    </>
  );
};

export default App;
