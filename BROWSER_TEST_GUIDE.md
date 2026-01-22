# Braille Finder 動作確認ガイド

## アプリケーション概要

- **URL**: http://localhost:3000
- **機能**: 256個の点字Unicode文字（U+2800〜U+28FF）をビジュアル検索するツール

## ページ構成

1. **ヘッダー**: "Braille Finder" タイトルと説明文
2. **検索フォーム**: 8つのドットボタン（Dot 1〜8）とクリアボタン
3. **点字一覧**: 256個の点字文字がグリッド表示

## 動作確認項目

### 1. ページの表示確認

```bash
agent-browser open http://localhost:3000
agent-browser screenshot ./screenshots/initial.png
```

**確認ポイント**:
- タイトル「Braille Finder」が表示される
- 検索フォームに8つのドットが表示される
- 256個の点字文字がグリッド表示される

### 2. ドット選択機能

```bash
# Dot 1を選択
agent-browser eval "document.querySelector('button[aria-label*=\"Dot 1\"]')?.click()"
agent-browser screenshot ./screenshots/dot1-selected.png

# Dot 2も追加選択
agent-browser eval "document.querySelector('button[aria-label*=\"Dot 2\"]')?.click()"
agent-browser screenshot ./screenshots/dot12-selected.png
```

**確認ポイント**:
- 選択したドットが青色に変わる
- 完全一致する点字文字が緑背景でハイライトされる
- 部分一致する点字文字が青色で表示される
- 一致しない点字文字がグレーアウトされる

### 3. クリア機能

```bash
agent-browser snapshot -i
# ref=e1 または ref=e4 がクリアボタン
agent-browser click @e4
agent-browser screenshot ./screenshots/cleared.png
```

**確認ポイント**:
- すべてのドットが「未選択」状態に戻る
- 点字一覧のハイライトがリセットされる

### 4. 点字セルのクリック（コピー機能）

```bash
# 点字セルをクリック
agent-browser eval "document.querySelectorAll('div[class*=\"cursor-pointer\"][class*=\"braille-cell\"]')[5]?.click()"
```

**確認ポイント**:
- クリックした点字文字がクリップボードにコピーされる
- トースト通知が表示される（確認が必要）

### 5. キーボードショートカット

```bash
# ドットを選択した状態で cmd+c / ctrl+c
agent-browser eval "document.querySelector('button[aria-label*=\"Dot 1\"]')?.click()"
agent-browser press Control+c
```

**確認ポイント**:
- 検索中に cmd+c / ctrl+c で対象文字がコピーされる

### 6. Backspaceでクリア

```bash
agent-browser eval "document.querySelector('button[aria-label*=\"Dot 1\"]')?.click()"
agent-browser press Backspace
agent-browser snapshot
```

**確認ポイント**:
- Backspaceキーで選択がクリアされる

## 要素のセレクタ情報

| 要素 | セレクタ |
|------|----------|
| クリアボタン | `button` with aria-label "Backspace / ⌫ でクリア" |
| ドットボタン | `button[aria-label*="Dot N"]` (N=1〜8) |
| 点字セル | `div[class*="cursor-pointer"][class*="braille-cell"]` |

## 状態確認用コマンド

```bash
# インタラクティブ要素の一覧
agent-browser snapshot -i

# 全体構造の確認
agent-browser snapshot

# ドットの選択状態確認
agent-browser snapshot | grep "Dot"
```

## 注意事項

- ドットボタンは `snapshot -i` では表示されないが、aria-labelで操作可能
- 点字セルはbutton要素ではなくdiv要素（cursor-pointerクラス付き）
- コピー機能はクリップボードAPIを使用するため、ブラウザの権限が必要な場合あり
