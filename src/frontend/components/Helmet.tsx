import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  description?: string;
  color?: string;
  children?: React.ReactNode;
}

const Helmet: React.FC<Props> = ({ title, description, color, children }) => {
  const { pathname } = useRouter();

  return (
    <Head>
      {title && (
        <>
          <title key="title">{title}</title>
          <meta key="og:title" property="og:title" content={title} />
          <meta key="og:site_name" property="og:site_name" content={title} />
          <meta key="twitter:title" name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta key="description" name="description" content={description} />
          <meta key="og:description" property="og:description" content={description} />
          <meta key="twitter:description" name="twitter:description" content={description} />
        </>
      )}
      {color && <meta key="theme-color" name="theme-color" content={color} />}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={pathname} />
      <meta key="twitter:url" name="twitter:url" content={pathname} />
      <meta key="twitter:card" name="twitter:card" content="summary" />
      {children}
    </Head>
  );
};

export default Helmet;
