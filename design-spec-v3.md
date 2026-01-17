# デザイン仕様書 v3 - 洗練されたデザイン

## 概要
日本自然保護協会・日本香堂のサイトを参考に、AIっぽさを排除した洗練されたデザインへ進化。
温かみと信頼感を両立し、ターゲットペルソナに寄り添うデザイン。

---

## デザインコンセプト

### キーワード
- **温かみ** - 手触り感のあるテクスチャ、自然な色彩
- **信頼感** - 余白を活かしたプロフェッショナルな構成
- **希望** - 明るく前向きなトーン
- **人間味** - 実写写真、手描き風要素

### AIっぽさ排除リスト（禁止事項）
1. パーティクル・星のアニメーション
2. グラデーション背景のアニメーション
3. シマーエフェクト（光が横切る演出）
4. ネオンカラー（シアン、マゼンタ、ライム）
5. 過剰な3D効果
6. カウントアップアニメーション
7. 浮遊するデコレーション要素
8. グロー効果

---

## カラーパレット（更新版）

```css
:root {
  /* プライマリーカラー：深みのある緑（信頼・成長） */
  --color-primary: #2D5A47;
  --color-primary-light: #4A7A67;
  --color-primary-dark: #1A3D2F;

  /* セカンダリーカラー：温かみのあるベージュ */
  --color-secondary: #F5EDE4;
  --color-secondary-light: #FBF8F5;
  --color-secondary-dark: #E8DED1;

  /* アクセントカラー：落ち着いたオレンジ */
  --color-accent: #D4824A;
  --color-accent-light: #E09A67;
  --color-accent-dark: #B86D3A;

  /* テキストカラー */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #4A4A4A;
  --color-text-light: #7A7A7A;
  --color-text-inverse: #FFFFFF;

  /* 背景カラー */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9F7F4;
  --color-bg-accent: #F5EDE4;
  --color-bg-dark: #2D5A47;
}
```

---

## タイポグラフィ（更新版）

```css
:root {
  /* フォントファミリー */
  --font-family-base: "游ゴシック体", "Yu Gothic", "YuGothic",
                       "Noto Sans JP", "Hiragino Sans", sans-serif;
  --font-family-heading: "游明朝体", "Yu Mincho", "YuMincho",
                          "Noto Serif JP", "Hiragino Mincho ProN", serif;
  --font-family-accent: "Zen Old Mincho", "Yu Mincho", serif;

  /* フォントサイズ */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 2rem;        /* 32px */
  --font-size-4xl: 2.5rem;      /* 40px */
  --font-size-5xl: 3rem;        /* 48px */

  /* 行の高さ */
  --line-height-tight: 1.4;
  --line-height-base: 1.8;
  --line-height-relaxed: 2.0;

  /* 文字間隔 */
  --letter-spacing-tight: 0;
  --letter-spacing-base: 0.05em;
  --letter-spacing-wide: 0.1em;
}
```

---

## レイアウト構成

### ヘッダー
- 白背景、シンプルなロゴ
- ナビゲーションは右寄せ
- スクロール時に軽いシャドウのみ追加
- 装飾なし

### ヒーローセクション
- **背景**: 単色（温かみのあるベージュ `#F5EDE4`）
- **パーティクル/装飾**: 完全削除
- **レイアウト**: 左テキスト + 右書籍画像（シンプル）
- **キャッチコピー**: 明朝体、縦書きも検討
- **バッジ**: シンプルなタグスタイル（アニメーションなし）
- **統計数字**: 静的表示（カウントアップ削除）
- **CTAボタン**: シンプルなソリッドカラー

### 試し読みセクション
- **背景**: ダークグリーン（`#2D5A47`）単色
- **星/パーティクル**: 完全削除
- **タイピングアニメーション**: 削除
- **チャプターカード**: シンプルなカードデザイン、ホバーは軽いシャドウのみ

### 著者紹介セクション
- 白背景
- 2カラムレイアウト
- 写真は角丸なし、または軽い角丸
- 装飾を最小限に

### 著者ストーリーセクション
- **タイムライン**: シンプルな縦線デザイン
- **ターニングポイント**: カード形式、装飾控えめ
- **座右の銘**: シンプルな引用スタイル

### if(塾)セクション
- **ネオンカラー**: 完全削除
- **背景**: 白またはライトグレー
- **アイコン**: シンプルなラインアイコン
- **全体**: プロフェッショナルなビジネスサイト風

### CTAセクション
- **背景**: プライマリーカラー（グリーン）
- **装飾**: なし
- **ボタン**: 白背景 + グリーンテキスト

---

## アニメーション方針（控えめ）

### 許可するアニメーション
1. **フェードイン**: `opacity: 0 → 1` のみ（0.6s）
2. **軽いスライド**: `translateY(20px) → 0` のみ
3. **ホバー時のシャドウ変化**: ボタン・カードのみ
4. **スムーズスクロール**: ページ内リンク

### 禁止するアニメーション
1. パーティクル
2. グラデーションアニメーション
3. 3D回転・傾き（tilt）
4. カウントアップ
5. タイピングエフェクト
6. シマー（光の横切り）
7. グロー効果
8. バウンス・パルス

---

## コンポーネント仕様

### ボタン
```css
.btn {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

/* プライマリーボタン */
.btn--primary {
  background: #D4824A;
  color: #FFFFFF;
  border: none;
}

/* セカンダリーボタン */
.btn--secondary {
  background: transparent;
  color: #2D5A47;
  border: 2px solid #2D5A47;
}
```

### カード
```css
.card {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
```

### セクション見出し
```css
.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  font-weight: 500;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.section-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.8;
}
```

---

## 画像方針

### 推奨
- 実写写真（温かみのあるもの）
- 手描き風イラスト（シンプルなライン）
- 書籍カバーはそのまま使用

### 非推奨
- AI生成感の強いイラスト
- 抽象的な幾何学模様
- グラデーションを多用した画像

---

## レスポンシブ対応

### モバイル (max-width: 767px)
- ヒーロー: 1カラム（画像上、テキスト下）
- ナビゲーション: ハンバーガーメニュー
- カード: 1カラム
- フォントサイズ: やや小さく調整

### タブレット (768px - 1023px)
- ヒーロー: 2カラム
- カード: 2カラム

### デスクトップ (1024px+)
- フルレイアウト
- 最大幅: 1200px

---

## 実装優先順位

### Phase 1: 構造改善
1. パーティクル・装飾要素の削除
2. カラーパレットの更新
3. フォントの変更

### Phase 2: セクション改善
4. ヒーローセクションのシンプル化
5. if(塾)セクションの再デザイン
6. CTAセクションの改善

### Phase 3: 細部調整
7. アニメーションの控えめ化
8. カード・ボタンのスタイル統一
9. レスポンシブ対応の確認

---

## 参考サイト

- 日本自然保護協会: https://www.nacsj.or.jp/
- 日本香堂ホールディングス: https://www.nipponkodohd.com/
- BOK: スクリーンショット参照

これらのサイトから学んだ要素：
- 縦書きタイポグラフィの活用
- 実写写真による温かみ
- 余白を活かしたレイアウト
- 控えめなアニメーション
- プロフェッショナルな色使い
