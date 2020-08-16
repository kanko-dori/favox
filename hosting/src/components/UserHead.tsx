import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  username: string;
}

const UserHead: React.FC<Props> = ({ username }: Props) => (
  <Helmet>
    <title>{`Favox - ${username}`}</title>
    <meta
      name="description"
      content="Favoxはあなたのお気に入りを集めてみんなに共有できます。"
    />
    <meta property="og:url" content={`https://favox.cf/${username}`} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={`Favox - ${username}'s favorite things.`} />
    <meta property="og:description" content={`${username}さんのFavox`} />
    <meta property="og:site_name" content="Favox" />
    <meta property="og:image" content={`https://favox.cf/og_image/${username}`} />
    <meta name="twitter:card" content="summary" />
  </Helmet>
);

export default UserHead;
