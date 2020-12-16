# Favox

FavoxはSpotifyのプレイリストを**いい感じ**に共有できるWebアプリ

## 機能

- Spotifyアカウントによるログイン
- Spotifyアカウントに登録されているプレイリストのインポート
- プレイリストの共有

## 使用技術

- Firebase
  - Authentication
  - Cloud Functions
  - Firestore
- Next.js / React

## 起動方法

### セットアップ

Node.js(v10↑)とJDK(v12↑)を用いるのでそれぞれインストールしてください。

Firebase開発用CLIツールのインストール

```sh
npm i -g firebase-tools
```

プロジェクトの依存関係解消

```sh
npm install
```

### 起動

```sh
npm run serve
```

- 本体: http://localhost:5000
- Firebaseエミュレータコンソール: http://localhost:4000
