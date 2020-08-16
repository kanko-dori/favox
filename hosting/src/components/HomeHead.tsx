import React from 'react';
import { Helmet } from 'react-helmet';

const UserHead: React.FC = () => (
  <Helmet>
    <title>Favox - My favorite things.</title>
    <meta
      name="description"
      content="Favoxはあなたのお気に入りを集めてみんなに共有できます。"
    />
    <meta property="og:url" content="https://favox.cf" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Favox - My favorite things." />
    <meta property="og:description" content="Favoxはあなたのお気に入りを集めてみんなに共有できます。" />
    <meta property="og:site_name" content="Favox" />
    <meta property="og:image" content="https://favox.cf/logo256.png" />
    <meta name="twitter:card" content="summary" />
  </Helmet>
);

export default UserHead;
