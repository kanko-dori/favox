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

Node.js(v10↑)を用いるのでインストールしてください。
また、ローカル開発環境ではFirebaseのエミュレータを用いるために JDK(v12↑) も必要です。

Firebase開発用CLIツールのインストール

```sh
npm install -g firebase-tools
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
