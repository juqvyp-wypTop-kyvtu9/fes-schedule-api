## プロジェクト概要

このリポジトリは、Laravel Sanctum を用いた SPA 認証を実装した API サーバと、React（Vite）製フロントエンドからなるサンプルアプリです。  
フロントエンドから Cookie ベースのセッション認証でログインし、`/api/user` 経由でログイン中ユーザー情報を取得できる構成になっています。  

バックエンドは Laravel を使用して RESTful な API と認証処理を提供し、フロントエンドは React + Chakra UI を用いてログインフォームなどのUIを実装しています。開発環境では `http://localhost:8000`（API） と `http://localhost:5173`（フロント）の組み合わせで動作するように設定されています。

## 2. 前提環境

このプロジェクトを動かすために、以下の環境を想定しています。

- PHP >= 8.2
- Composer
- Node.js >= 18.x
- npm >= 9.x
- SQLite（または .env で設定した任意のデータベース）
- Git（任意）

開発用 URL は次の通りです。

- API（Laravel）: `http://localhost:8000`
- フロントエンド（React + Vite）: `http://localhost:5173`


## 3. セットアップ手順（Backend / Laravel）

### 3-1. 依存関係のインストール

```bash
cd backend   # Laravel プロジェクトのディレクトリに移動（構成に合わせて変更）
composer install

## 5. 認証（Sanctum SPA）のポイント

- 認証フロー  
  1. `GET /sanctum/csrf-cookie` で CSRF 用 Cookie を取得する  
  2. `POST /login`（メール・パスワード）でログインする  
  3. `GET /api/user` でログイン中ユーザー情報を取得する  

- axios 設定のポイント  
  - `baseURL` は `http://localhost:8000` を指定する  
  - `withCredentials: true` を指定して Cookie を送信する  

- Laravel 側設定のポイント  
  - `.env`
    - `SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost,localhost:8000`
    - `SESSION_DOMAIN=localhost`
  - `config/cors.php`
    - `allowed_origins` に `http://localhost:5173`
    - `supports_credentials` を `true` にする  


## 6. 動作確認方法

1. Backend（Laravel）を起動する  

   ```bash
   php artisan serve --host=localhost --port=8000


