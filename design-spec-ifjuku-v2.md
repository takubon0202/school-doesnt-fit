# if塾セクション デザイン仕様書 v2

## 概要
if-juku.netを参考にした改善デザイン。評価基準3倍厳しい基準で設計。

---

## 変更点サマリー

### 1. ロゴ画像への置き換え
- **現状**: `<span class="ifjuku-new__logo">if(塾)</span>` テキスト
- **変更後**: `<img src="public/images/ifjuku-logo.png" alt="if塾ロゴ">` 画像

### 2. オフラインイベントカードの削除
- **現状**: 6枚のサービスカード
- **変更後**: 5枚（オフラインイベントを削除）
  1. オンライン授業
  2. 教育相談
  3. 案件割振
  4. 独立サポート
  5. AI先生

### 3. if(塾)についてセクションの追加
CTAの前に新規セクションを追加

---

## 詳細デザイン仕様

### A. ロゴ画像部分

```html
<div class="ifjuku-new__logo-wrapper">
  <img
    src="public/images/ifjuku-logo.png"
    alt="if塾ロゴ"
    class="ifjuku-new__logo-img"
    width="300"
    loading="lazy"
  >
  <span class="ifjuku-new__logo-glow"></span>
</div>
```

#### CSS仕様
```css
.ifjuku-new__logo-img {
  max-width: 300px;
  height: auto;
  filter: drop-shadow(0 0 20px var(--neon-cyan));
  animation: logo-glow-pulse 2s ease-in-out infinite;
}

@keyframes logo-glow-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 20px var(--neon-cyan))
            drop-shadow(0 0 40px var(--neon-cyan));
  }
  50% {
    filter: drop-shadow(0 0 10px var(--neon-cyan))
            drop-shadow(0 0 20px var(--neon-cyan));
  }
}
```

---

### B. サービスカード（5枚）

#### グリッドレイアウト
- **モバイル**: 1列
- **タブレット (768px+)**: 2列 + 最後1枚中央
- **デスクトップ (1024px+)**: 5列均等

```css
.ifjuku-new__features--5col {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .ifjuku-new__features--5col {
    grid-template-columns: repeat(2, 1fr);
  }

  .ifjuku-new__features--5col .ifjuku-new__feature:last-child {
    grid-column: 1 / -1;
    max-width: 300px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .ifjuku-new__features--5col {
    grid-template-columns: repeat(5, 1fr);
  }

  .ifjuku-new__features--5col .ifjuku-new__feature:last-child {
    grid-column: auto;
    max-width: none;
    margin: 0;
  }
}
```

---

### C. if(塾)についてセクション（新規）

#### レイアウト構成
スクリーンショット参照: 2列レイアウト
- **左側 (60%)**: メイン動画/画像エリア
- **右側 (40%)**: 3つの特徴画像を縦に配置

#### HTML構造
```html
<!-- if(塾)についてセクション -->
<div class="ifjuku-about" data-aos="fade-up" data-aos-delay="200">
  <h3 class="ifjuku-about__title">
    <span class="neon-text neon-text--cyan">if(塾)</span>について
  </h3>

  <div class="ifjuku-about__grid">
    <!-- メインビジュアル -->
    <div class="ifjuku-about__main">
      <div class="ifjuku-about__video-wrapper">
        <div class="ifjuku-about__video-placeholder">
          <img
            src="public/images/ifjuku-logo.png"
            alt="if塾"
            class="ifjuku-about__video-logo"
          >
          <p class="ifjuku-about__video-text">は</p>
          <h4 class="ifjuku-about__video-headline">
            <span class="highlight-orange">誰</span>でも通えて、<br>
            <span class="highlight-white">AI</span>と<span class="highlight-white">起業</span>が学べる
          </h4>
          <p class="ifjuku-about__video-subtitle">未来型教室</p>
        </div>
      </div>
    </div>

    <!-- 特徴リスト -->
    <div class="ifjuku-about__features">
      <div class="ifjuku-about__feature-item">
        <div class="ifjuku-about__feature-bg" style="background-image: url('...')"></div>
        <p class="ifjuku-about__feature-text">
          好きなことを好きなだけ<br>
          <span class="highlight-cyan">やれる場</span>
        </p>
      </div>

      <div class="ifjuku-about__feature-item">
        <div class="ifjuku-about__feature-bg" style="background-image: url('...')"></div>
        <p class="ifjuku-about__feature-text">
          専門家、AI、当事者の<br>
          <span class="highlight-magenta">トリプルサポート</span>
        </p>
      </div>

      <div class="ifjuku-about__feature-item">
        <div class="ifjuku-about__feature-bg" style="background-image: url('...')"></div>
        <p class="ifjuku-about__feature-text">
          好きなことで自分の<br>
          <span class="highlight-lime">やりたいまま実現</span>
        </p>
      </div>
    </div>
  </div>
</div>
```

#### CSS仕様
```css
/* if(塾)についてセクション */
.ifjuku-about {
  margin: var(--spacing-3xl) 0;
}

.ifjuku-about__title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  text-align: center;
  color: var(--neon-text);
  margin-bottom: var(--spacing-xl);
}

.ifjuku-about__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .ifjuku-about__grid {
    grid-template-columns: 6fr 4fr;
  }
}

/* メインビジュアル */
.ifjuku-about__main {
  position: relative;
}

.ifjuku-about__video-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid rgba(0, 255, 204, 0.3);
}

.ifjuku-about__video-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  text-align: center;
}

.ifjuku-about__video-logo {
  max-width: 150px;
  height: auto;
  margin-bottom: var(--spacing-sm);
}

.ifjuku-about__video-headline {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  color: var(--neon-text);
  line-height: 1.4;
  margin: var(--spacing-sm) 0;
}

.ifjuku-about__video-subtitle {
  font-size: var(--font-size-lg);
  color: #ff6b35;
  font-weight: 700;
}

/* ハイライトカラー */
.highlight-orange { color: #ff6b35; }
.highlight-white { color: #ffffff; }
.highlight-cyan { color: var(--neon-cyan); }
.highlight-magenta { color: var(--neon-magenta); }
.highlight-lime { color: var(--neon-lime); }

/* 特徴リスト */
.ifjuku-about__features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.ifjuku-about__feature-item {
  position: relative;
  height: 100px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background: var(--neon-bg-card);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.ifjuku-about__feature-item:hover {
  border-color: var(--neon-cyan);
  transform: translateX(-5px);
}

.ifjuku-about__feature-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.3;
}

.ifjuku-about__feature-text {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--neon-text);
  line-height: 1.4;
  text-align: right;
}
```

---

## レスポンシブ対応

### モバイル (max-width: 767px)
- ロゴ画像: max-width: 200px
- サービスカード: 1列
- if(塾)について: 1列（メイン上、特徴下）
- 特徴アイテム: 横並びスクロール可能

### タブレット (768px - 1023px)
- ロゴ画像: max-width: 250px
- サービスカード: 2列
- if(塾)について: 6:4の2列

### デスクトップ (1024px+)
- ロゴ画像: max-width: 300px
- サービスカード: 5列均等
- if(塾)について: 6:4の2列

---

## アクセシビリティ考慮

1. **画像alt属性**: すべての画像に適切なalt属性
2. **prefers-reduced-motion**: アニメーション無効化対応
3. **フォーカス可視化**: キーボードナビゲーション対応
4. **コントラスト比**: WCAG AA基準以上

---

## パフォーマンス考慮

1. **画像最適化**: loading="lazy"属性
2. **will-change**: アニメーション要素のみに適用
3. **GPU acceleration**: transform使用

---

## コーダーへの指示

### 優先度：高（必須）
1. ロゴをテキストから画像に置き換え
2. オフラインイベントカードを削除
3. 5列グリッドCSS追加
4. if(塾)についてセクションのHTML追加
5. if(塾)についてセクションのCSS追加

### 優先度：中
6. レスポンシブ調整
7. アニメーション調整

### 注意事項
- 既存のネオンスタイルを維持
- if-juku.netの雰囲気を再現
- 評価基準3倍厳しいため、細部まで確認すること
