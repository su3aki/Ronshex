# Ronshex 概要

React と Spotify API で構築された楽曲の[検索サイト](https://ronshex.com/)です。
楽曲を検索して選択すると、Spotify に登録された
・アーティスト情報
・楽曲パラメータ (BPM、踊りやすさ、明るさ...etc)
・詳細なジャンルデータ
を基に似ている曲をサジェストしてくれます。

サジェストされた曲を選ぶと、最初に選択された曲(以下シードトラック)をパラメータ比較したグラフが表示されるので
出会ったことのない音楽を探しやすくなります。

また、Spotify が提供している３０秒のプレビュー再生機能も備えており
音楽を視て聴いて、探すことができます。

##

## アプリケーション使用方法

このアプリケーションは Credential 認証を使用しています。
Spotify Premium アカウントを所持している方が登録できる[Spotify Developer](https://developer.spotify.com/)で
公開鍵、秘密鍵を入手した後 Credentials.js の
process.env.REACT_APP_clientId
process.env.REACT_APP_clientSecret
を変更した場合、利用可能となります。
その後

### `npm install`

### `npm start`

localhost:3000 でアプリケーションが動きます。
