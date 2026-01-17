# デザイン仕様書 - リッチアニメーション版

## 概要
SHOE DOGを参考にしつつ、2025年のWebデザイントレンドを取り入れた
おしゃれでリッチなページデザイン。

## 採用するアニメーション技法

### 1. Scrollytelling（スクロールテリング）
スクロールに応じて物語が展開するような演出
- テキストの段階的な出現
- 本の画像が浮かび上がる効果
- 背景のパララックス

### 2. タイポグラフィアニメーション
- メインキャッチの文字が1文字ずつ出現
- 数字のカウントアップアニメーション
- テキストのグラデーションアニメーション

### 3. マイクロインタラクション
- ボタンホバー時のリップル効果
- カードホバー時の傾き（tilt）効果
- アイコンの回転・バウンス

### 4. パーティクル＆装飾アニメーション
- 浮遊する装飾要素
- グラデーション背景のゆっくりした変化
- キラキラエフェクト

---

## ヒーローセクション デザイン仕様

### 背景
- **アニメーションするグラデーション背景**
  - `background-size: 400% 400%`
  - ゆっくりと色が変化する演出
  - 15秒サイクルで無限ループ

- **浮遊する装飾パーティクル**
  - 半透明の円形要素が5〜6個
  - 異なる速度でふわふわ浮遊
  - `animation: float 8s ease-in-out infinite`

### メインキャッチコピー
```
「普通じゃないから、見えた景色がある。」
```
- **文字が1文字ずつフェードイン**
- `animation-delay` で0.05秒ずつずらす
- 完了後に全体がパルスするような光る演出

### 実績バッジ
- **バウンスして登場**
- ホバー時に拡大＋光る
- 「200万円」の数字部分にカウントアップ

### 統計数字
- **カウントアップアニメーション**
  - 「15歳」→ 0から15へカウント
  - 「200万円」→ 0から200へカウント
  - Intersection Observer でスクロールイン時に発火

### 本の画像
- **3D回転しながら登場**
- 常時ふわふわ浮遊アニメーション
- ホバー時に傾きが変わる
- 周囲に光のグロー効果

### CTAボタン
- **シマーエフェクト**（光が横切る）
- ホバー時にスケールアップ＋影が大きくなる
- クリック時にリップル効果

---

## 試し読みセクション デザイン仕様

### 背景
- ダークテーマ（現状維持）
- 星のようなパーティクルが浮遊
- グラデーションのオーバーレイ

### タイトル「BOOK PREVIEW」
- **タイピングアニメーション**
- 文字が1文字ずつ表示される
- カーソルが点滅する演出

### 引用テキスト
- **スライドインアニメーション**
- 左から右にスライドしながらフェードイン
- ボーダーも伸びるアニメーション

### チャプターカード
- **スタガードアニメーション**
  - 1枚目 → 0.1秒遅延
  - 2枚目 → 0.2秒遅延
  - 3枚目 → 0.3秒遅延
- ホバー時の3D傾き（tilt）効果
- ホバー時にグロー効果

---

## 追加すべきCSS アニメーション

### 1. 文字1文字ずつ出現
```css
@keyframes fadeInChar {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.char-animate span {
  display: inline-block;
  opacity: 0;
  animation: fadeInChar 0.5s forwards;
}
```

### 2. カウントアップ（JavaScript連携）
```css
.count-up {
  font-variant-numeric: tabular-nums;
}
```

### 3. タイピングエフェクト
```css
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--color-primary); }
}

.typing-text {
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid var(--color-primary);
  animation: typing 2s steps(20) forwards, blink-caret 0.75s step-end infinite;
}
```

### 4. シマーエフェクト
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.btn-shimmer {
  position: relative;
  overflow: hidden;
}

.btn-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.4),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

### 5. 3D Tilt エフェクト
```javascript
// カードにマウス位置に応じた傾きを付与
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
```

### 6. パーティクル浮遊
```css
@keyframes float-particle {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translate(10px, -20px) rotate(90deg);
    opacity: 0.6;
  }
  50% {
    transform: translate(-5px, -40px) rotate(180deg);
    opacity: 0.3;
  }
  75% {
    transform: translate(-15px, -20px) rotate(270deg);
    opacity: 0.6;
  }
}
```

---

## コーダーへの指示

### 優先度：高
1. ヒーローセクションのパーティクル背景追加
2. メインキャッチの文字アニメーション実装
3. 統計数字のカウントアップ実装
4. 本の画像の3D浮遊効果強化
5. CTAボタンのシマー効果

### 優先度：中
6. 試し読みセクションのタイピングアニメーション
7. チャプターカードの3D tilt効果
8. スタガードアニメーションの強化

### 優先度：低
9. 星パーティクル背景
10. 追加のマイクロインタラクション

---

## レスポンシブ対応

### モバイル (max-width: 768px)
- パーティクル数を減らす（パフォーマンス考慮）
- tilt効果を無効化
- アニメーション時間を短縮
- シマー効果は維持

### タブレット (768px - 1024px)
- パーティクル数を中程度に
- すべてのアニメーション有効

### デスクトップ (1024px+)
- フルアニメーション
- すべての効果を有効化

---

## パフォーマンス考慮事項

1. `will-change` を適切に使用
2. GPU アクセラレーション有効化 (`transform: translateZ(0)`)
3. `prefers-reduced-motion` メディアクエリ対応
4. requestAnimationFrame 使用
5. Intersection Observer でビューポート外はアニメーション停止

---

## 完成イメージ

- **第一印象**: 「おしゃれ！」「動きが楽しい！」
- **読後感**: 「この本、読んでみたい」「応援したくなる」
- **ターゲットへの訴求**: 温かみと希望を感じるデザイン
