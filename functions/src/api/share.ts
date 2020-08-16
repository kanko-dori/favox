import * as express from 'express';
import * as cors from 'cors';

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/share/:username', (req: express.Request, res: express.Response) => {
  const { username } = req.params;
  res.send(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
    <title>Favox - ${username}</title>
    <meta
      name="description"
      content="Favoxはあなたのお気に入りを集めてみんなに共有できます。"
    />
    <meta property="og:url" content="https://favox.cf/${username}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Favox - ${username}'s favorite things." />
    <meta property="og:description" content="${username}さんのFavox" />
    <meta property="og:site_name" content="Favox" />
    <meta property="og:image" content="https://favox.cf/og_image/${username}" />
    <meta name="twitter:card" content="summary" />
    </head>
    <body>
      <p>自動で遷移しない場合、<a href="/${username}">こちら</a>をクリックしてください。</p>
      <script>
        location.replace('/${username});
      </script>
    </body>
    </html>
  `);
});

export default app;
