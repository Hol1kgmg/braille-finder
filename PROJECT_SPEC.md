## プロジェクト仕様書

### 目的

アスキーアートを書く際に、任意の形の点字Unicodeをすばやく検索してコピーできるツールを作成する

---

## 技術仕様

### 技術スタック

- **Next.js 16 (App Router) + React 19 + Tailwind CSS v4**
- フロントエンドのみで完結（完全静的サイト）
- デプロイ先：**Cloudflare Pages**（運用コスト$0）

### 開発環境

**バージョン管理：**

- **mise** を使用して開発ツールのバージョンを管理
- `.mise.toml` でプロジェクトの必要なツールバージョンを定義

**管理対象ツール：**

- Node.js 20
- oxlint（高速リンター）

**セットアップ手順：**

```bash
# miseで開発ツール（Node.js, oxlint）をインストール
mise install

# frontendディレクトリに移動
cd frontend

# 依存関係をインストール
npm install

# 開発サーバー起動（http://localhost:3000）
npm run dev
```

**開発コマンド：**

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# リント実行（oxlint直接実行）
oxlint

# リント自動修正
oxlint --fix
```

**必要なファイル：**

- `.mise.toml` - Node.jsとoxlintのバージョン指定
- `frontend/.oxlintrc.json` - oxlintの設定ファイル

### デプロイ方法

```bash
cd frontend
npm run build
# Cloudflare Pagesにfrontend/outフォルダをデプロイ
# （Next.jsの静的エクスポート機能を使用）
```

---

## 機能仕様

### 1. 検索フォーム（上部）

- **2×4のクリック可能グリッド**
  - 点字の標準配置（左列：1,2,3,4 / 右列：5,6,7,8）
  - クリックで点のON/OFF切り替え
  - 選択状態を視覚的に表示
- **状態管理：** React useState（8ビットの配列）

### 2. 点字テーブル（下部）

- **16×16グリッド表示**
  - 全256文字の点字Unicode（U+2800～U+28FF）を表示
  - スクロール可能なエリア

### 3. フィルタリング機能（リアルタイム）

**色分けルール：**

- 🟢 **黄緑**：選択パターンと完全一致（1文字のみ）
- ⚪ **白**：選択した点をすべて含む候補（追加の点があってもOK）
- ⚫ **灰色**：選択した点の一部が欠けている（候補外）
- **初期状態**（何も選択していない）：全て白

**ロジック例：** 点1と点5を選択

- ⠑（1,5のみ）→ 黄緑
- ⠛（1,2,5）→ 白
- ⠇（1,2,3）→ 灰色（5が欠けている）

### 4. コピー機能

- テーブル内の点字文字をクリックでコピー
- コピー完了のフィードバック表示（トースト通知など）

### 5. リセット機能

- 選択した点をすべてクリアするボタン

---

## UI/UX要件

- シンプルで直感的な操作
- レスポンシブ対応（デスクトップ・モバイル両対応）
- 視覚的フィードバックを重視
- アクセシビリティ考慮（適切なコントラスト比）

---

## ファイル構成

```
braille-finder/
├── .mise.toml                  # 開発ツールバージョン管理（Node.js, oxlint）
├── .gitignore
├── PROJECT_SPEC.md             # プロジェクト仕様書
├── CLAUDE.md                   # Claude Code設定
├── README.md                   # プロジェクトREADME
└── frontend/                   # Webアプリケーション
    ├── .oxlintrc.json         # oxlint設定
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts         # Next.js設定
    ├── postcss.config.mjs     # PostCSS設定（Tailwind CSS）
    ├── public/                # 静的ファイル
    ├── src/
    │   └── app/
    │       ├── layout.tsx    # ルートレイアウト
    │       ├── page.tsx      # メインページ
    │       ├── globals.css   # グローバルスタイル（Tailwind CSS）
    │       └── favicon.ico   # ファビコン
    └── node_modules/
```

---

## デプロイ仕様

- **プラットフォーム：** Cloudflare Pages
- **ビルド設定：**
  - ビルドコマンド：`cd frontend && npm install && npm run build`
  - 出力ディレクトリ：`frontend/out`
  - フレームワーク：Next.js (Static Export)
- **運用コスト：** $0（無料枠内）
- **URL：** `*.pages.dev`（カスタムドメイン設定可能）

---
