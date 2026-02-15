# Gemini CLI連携スキル

Google Gemini CLIを使用してコード生成・エラー解決・デザイン修正・**Webリサーチ**を行います。
**Gemini AI Pro サブスクリプション**に含まれており、追加費用なしで利用できます。

## 使用方法

```
/gemini タスク内容
```

## 実行されるコマンド

$ARGUMENTS を受け取り、Gemini CLIを実行します：

```bash
gemini -m gemini-3-pro "$ARGUMENTS"
```

## 利用可能なモデル

### メイン（常にこちらを使用）

| モデル | 説明 | 用途 |
|--------|------|------|
| `gemini-3-pro-preview` | **推奨** - 最高品質の推論・コーディング | 複雑なタスク、設計、デザイン分析 |
| `gemini-3-flash-preview` | **高速** - 低レイテンシ | 単純なタスク、素早い回答 |

> **重要**: Gemini 3系のみ使用します。2.5系へのフォールバックは行いません。

## Webリサーチ機能（重要）

**このプロジェクトでは、Web検索が必要な場合にGemini CLIを活用できます。**

Gemini CLIはGoogle Search（グラウンディング）機能を内蔵しており、最新のWeb情報にアクセスできます。

### Webリサーチの実行方法

```bash
# Webリサーチ（Google Search グラウンディング使用）
gemini "2026年のWebデザイントレンド glassmorphism 最新動向を調べて"

# URL指定でのフェッチ
gemini "https://example.com/design-trends の内容を要約して"

# 複合リサーチ
gemini "不登校支援 Webサイト デザイン ベストプラクティス 2026年を調査して"
```

## コマンド例

```bash
# 推奨：Gemini 3 Pro Preview（デフォルト）
gemini "CSSのscroll-snapとfullscreenセクションの最適な実装方法を教えて"
gemini -m gemini-3-pro-preview "glassmorphismカードのCSS最適化を提案して"

# 高速処理：Gemini 3 Flash Preview
gemini -m gemini-3-flash-preview "flexboxとgridの使い分けを教えて"

# 自動承認モード（YOLO）
gemini -y "style.cssのモバイル対応を修正して"
gemini --yolo "JavaScriptのパフォーマンスを改善して"

# 対話モード
gemini
```

## このプロジェクトでの主な用途

### コーディング
- HTML/CSS/JavaScriptの実装・修正
- レスポンシブデザインの最適化
- アニメーション・インタラクションの実装
- パフォーマンス最適化

### デザイン修正
- CSSスタイルの改善提案
- Anti-Gravityデザインの微調整
- カラーパレット・タイポグラフィの最適化
- セクションレイアウトの改善
- hover/トランジションエフェクトの調整
- モバイルUI/UXの改善

### リサーチ
- **Webリサーチ・情報収集**（Google Search グラウンディング）
- 2026年Webデザイントレンド調査
- 不登校支援関連サイトの調査
- CSS/JavaScript最新テクニック調査
- アクセシビリティ基準の確認
- SEOベストプラクティスの調査

### マルチモーダル処理
- スクリーンショットからのデザイン分析
- 画像ベースのレイアウト提案

## Agent Skills

```bash
gemini skills list       # スキル一覧
gemini skills enable X   # スキル有効化
gemini skills disable X  # スキル無効化
```

## 拡張機能

```bash
gemini extensions list        # 拡張機能一覧
gemini extensions install X   # インストール
gemini extensions enable X    # 有効化
gemini extensions disable X   # 無効化
```

### nanobanana（画像生成拡張 - 有効化済み）

**バージョン**: v1.0.10
**モデル**: `gemini-3-pro-image-preview`（環境変数 `NANOBANANA_MODEL` で設定）

画像生成・編集・復元をGemini CLI内で直接実行できる拡張機能です。

#### APIキー設定

以下のいずれかの環境変数にAPIキーを設定する必要があります：
- `NANOBANANA_GEMINI_API_KEY`（推奨）
- `NANOBANANA_GOOGLE_API_KEY`（推奨）
- `GEMINI_API_KEY`（フォールバック）
- `GOOGLE_API_KEY`（フォールバック）

#### 利用可能なコマンド

| コマンド | 機能 | 用途 |
|---------|------|------|
| `/generate` | テキストから画像生成 | ヒーロー画像、セクション背景、イラスト作成 |
| `/edit` | 既存画像の編集 | 画像の色調整、要素追加・削除 |
| `/restore` | 画像の復元・向上 | 低品質画像の改善 |
| `/icon` | アイコン・ファビコン生成 | サイトアイコン作成 |
| `/pattern` | シームレスパターン生成 | 背景テクスチャ作成 |
| `/diagram` | 技術図・フローチャート | 図解作成 |
| `/nanobanana` | 自然言語インターフェース | 自由記述で画像操作 |

#### 生成オプション

```bash
# 基本的な画像生成
/generate "温かみのある水彩画風の本のイラスト"

# スタイル指定
/generate "読書する子どものシルエット" --styles watercolor

# 複数バリエーション生成
/generate "緑と茶色の自然背景" --count=4

# シード指定（再現可能）
/generate "穏やかな森の風景" --seed=42 --styles minimalist
```

#### このプロジェクトでの用途
- ヒーローセクションの背景画像生成
- 著者ストーリーのタイムライン画像
- 転機セクションのイラスト
- サイトのファビコン・OGP画像
- セクション背景のパターン・テクスチャ

## セットアップ

```bash
npm install -g @google/gemini-cli
gemini  # 初回起動時にGoogleログイン
```

## 必要なもの

- **Gemini AI Pro** サブスクリプション ($19.99/月)
- Node.js
- **nanobanana用**: Gemini APIキー（環境変数で設定）

OAuth認証のみで利用可能（nanobanana以外はAPIキー不要）。

## 使用量上限について

使用量上限に達した場合、即座に報告し使用を停止します。
追加課金を防ぐため、制限が回復するまで該当CLIは使用しません。
