# デザイン仕様書 v4 - ワクワクするフルスクリーンデザイン

## 概要
フルスクリーンセクションと洗練されたアニメーションで、ユーザーをワクワクさせるデザイン。
AIっぽさは排除しつつ、モダンで楽しい体験を提供。

---

## デザインコンセプト

### キーワード
- **ワクワク** - 見ていて楽しい、次を見たくなる
- **没入感** - フルスクリーンで集中できる
- **温かみ** - 人間味のある優しいトーン
- **プロフェッショナル** - 信頼感のある構成

### フルスクリーンセクション
各セクションが画面いっぱいに表示され、スクロールで次のセクションへ移動。
スクロールスナップで快適なナビゲーションを実現。

---

## セクション構成

| セクション | 背景色 | 特徴 |
|-----------|--------|------|
| Hero | ベージュグラデーション | 書籍画像、CTAボタン |
| Preview | ダークグリーン | チャプターカード |
| About | ホワイト | 3カラムカード |
| Author | ライトグレー | 著者カード2枚 |
| Author Story | ホワイト | タイムライン、ターニングポイント |
| TOC | ベージュ | アコーディオン目次 |
| Testimonials | ダークグリーン | 読者カード |
| Message | ホワイト | タブ切り替えパネル |
| If塾 | ライトグレー | サービス紹介 |
| CTA | プライマリーグリーン | 最終CTA |

---

## アニメーション設計

### セクション表示アニメーション
```css
/* セクションが画面に入った時 */
.fullscreen-section.is-visible .hero__content {
  animation: fadeInUp 0.8s ease forwards;
}

.fullscreen-section.is-visible .hero__visual {
  animation: slideInRight 0.8s ease 0.2s forwards;
}
```

### スタッガードアニメーション
```css
/* 複数要素が順番に表示 */
[data-stagger].is-visible {
  animation: fadeInUp 0.6s ease forwards;
}
```

### ホバーエフェクト
```css
/* カードの3D効果 */
.card:hover {
  transform: translateY(-8px) rotateX(2deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
```

### スクロールインジケーター
```css
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  animation: scrollBounce 2s ease-in-out infinite;
}
```

---

## デバイス別最適化

### iPhone 17 (430px)
- フォントサイズ: clamp()で調整
- タッチターゲット: 最小48px
- スクロールスナップ: 有効

### Google Pixel 10 (412px)
- Material You対応の角丸
- Chrome最適化

### iPad Air (768-1180px)
- Split View対応
- 縦横両方のレイアウト

### ノートPC (1280-1440px)
- 最大幅1200pxのコンテナ
- ホバーエフェクト有効

---

## カラーパレット

```css
:root {
  /* プライマリー */
  --color-primary: #2D5A47;
  --color-primary-light: #4A7A67;
  --color-primary-dark: #1A3D2F;

  /* セカンダリー */
  --color-secondary: #F5EDE4;
  --color-secondary-light: #FBF8F5;

  /* アクセント */
  --color-accent: #D4824A;
  --color-accent-dark: #B86D3A;

  /* テキスト */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #4A4A4A;

  /* 背景 */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9F7F4;
}
```

---

## タイポグラフィ

```css
:root {
  --font-family-base: "游ゴシック体", "Yu Gothic", "Noto Sans JP", sans-serif;
  --font-family-heading: "游明朝体", "Yu Mincho", "Noto Serif JP", serif;

  /* Fluid Typography */
  --font-size-hero: clamp(2rem, 5vw, 3.5rem);
  --font-size-h1: clamp(1.75rem, 4vw, 2.5rem);
  --font-size-h2: clamp(1.5rem, 3vw, 2rem);
  --font-size-body: clamp(0.95rem, 2vw, 1.125rem);
}
```

---

## コンポーネント

### ボタン
```css
.btn {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
```

### カード
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
```

---

## 禁止事項（AIっぽさ排除）

1. パーティクルアニメーション
2. ネオンカラー（シアン、マゼンタ）
3. グロー効果
4. タイピングエフェクト
5. シマーエフェクト
6. 過剰な3D回転

---

## 実装済み機能

- [x] フルスクリーンセクション（100vh/100dvh）
- [x] スクロールスナップ
- [x] スクロールインジケーター
- [x] スクロール進捗バー
- [x] セクションリビールアニメーション
- [x] スタッガードアニメーション
- [x] パララックス効果
- [x] デバイス別レスポンシブ対応
- [x] iOS 100vh問題対策（JS）
- [x] prefers-reduced-motion対応

---

## 今後の改善案

1. 画像の遅延読み込み最適化
2. Core Web Vitals改善
3. 実機テストと微調整
4. Lighthouseスコア監視
