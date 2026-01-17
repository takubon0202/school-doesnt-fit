# デザインリサーチレポート

## 調査対象
- SANKOU! (https://sankoudesign.com/) - 日本のWebデザインギャラリー
- Awwwards (https://www.awwwards.com/) - 世界のWebデザインアワード
- coliss.com - モダンCSS技術解説

## 発見したトレンド（2025年）

### アニメーション
1. **テキストスプリットアニメーション**
   - 1文字ずつ順番に表示
   - 単語単位でフェードイン
   - 実装: CSS + JavaScript

2. **スクロール駆動アニメーション**
   - scroll-timeline, view-timeline
   - スクロール位置に連動した要素の変化
   - パララックス効果

3. **Springyホバーエフェクト**
   - linear()イージングでバウンス効果
   - 弾力のある動き
   - 例: `linear(0, 0.5 50%, 1 70%, 0.8 80%, 1)`

4. **カード3D変形**
   - ホバー時のperspective効果
   - rotateX/rotateYでの傾き
   - box-shadowの変化

5. **マイクロインタラクション**
   - ボタンのリップル効果
   - アイコンの回転
   - 細かいフィードバック

### デザインパターン
1. **高コントラストCTA**
   - 背景色と明確に区別されるボタン
   - ホバー時の明確な変化
   - アクセシビリティ重視

2. **グラデーション背景**
   - 複数色の滑らかな遷移
   - 動的なグラデーション

3. **テキストマスク効果**
   - 背景画像をテキストでマスク
   - グラデーションテキスト

## 実装提案

### 1. テキストリビールアニメーション
```css
.text-reveal {
  overflow: hidden;
}
.text-reveal span {
  display: inline-block;
  transform: translateY(100%);
  animation: textReveal 0.6s ease forwards;
}
@keyframes textReveal {
  to { transform: translateY(0); }
}
```

### 2. Springyホバー
```css
.springy-hover {
  transition: transform 0.5s linear(
    0, 0.5 36.36%,
    0.75 54.55%,
    0.875 72.73%,
    1 100%
  );
}
.springy-hover:hover {
  transform: scale(1.1);
}
```

### 3. グラデーションテキスト
```css
.gradient-text {
  background: linear-gradient(135deg, #D4824A, #2D5A47);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 4. カード3Dエフェクト
```css
.card-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}
.card-3d:hover {
  transform: rotateX(5deg) rotateY(-5deg) translateZ(20px);
}
```

## 色味改善提案

### 現状の問題
- セカンダリボタンの視認性が低い
- CTAボタンとテキストのコントラストが不十分

### 改善案
- ボタンの境界線を太くする（2px → 3px）
- ホバー時の色変化を大きくする
- テキストと背景のコントラスト比を4.5:1以上に確保

## 次のアクション
1. [x] CSSにアニメーション追加
2. [x] JSにテキストアニメーション追加
3. [x] ボタンの視認性改善
4. [ ] 背景画像の検討
