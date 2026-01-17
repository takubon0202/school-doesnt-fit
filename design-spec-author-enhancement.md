# 著者セクション拡充 デザイン仕様書

## 概要
山﨑琢己氏のコンテンツ(takumi_lp_content.md)を活用し、読者に刺さる感情的なストーリーを伝える著者セクションを設計。

---

## 変更方針

### 追加するセクション・要素
1. **著者ストーリーセクション（新規）** - 著者セクションの後に配置
2. **メッセージセクションの拡充** - 既存セクションをタブ形式に改良
3. **推薦コメント** - 相原嘉子氏のコメントを追加

### 採用するコンテンツ（厳選）
- キャッチコピー「普通じゃない⁉ だから人生は楽しい！」
- ストーリータイムライン（5段階に圧縮）
- ターニングポイント3つ（最も印象的なもの）
- 保護者へ・子どもたちへのメッセージ（2つに絞る）
- 推薦コメント
- 座右の銘（既存を強化）

---

## セクション詳細設計

### A. 著者ストーリーセクション（新規追加）

#### 配置場所
- 既存の著者紹介セクション(`#author`)の**直後**に配置
- `#toc`セクションの**前**

#### セクションID
`#author-story`

#### 構成要素

```
┌─────────────────────────────────────────────────────────────┐
│  [セクションヘッダー]                                        │
│  キャッチコピー: 普通じゃない⁉ だから人生は楽しい！           │
│  サブコピー: みんなと違う？変わってる？...                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ストーリータイムライン]                                    │
│                                                             │
│   ●───────●───────●───────●───────●                         │
│   幼少期   小学校  中学校  高校    現在                      │
│                                                             │
│  各ポイントをクリック/ホバーで詳細表示                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ターニングポイント カード3枚]                              │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│  │ 暴れた  │  │ ITとの  │  │ if塾   │                      │
│  │ ワケ    │  │ 出会い  │  │ 開業   │                      │
│  └─────────┘  └─────────┘  └─────────┘                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [座右の銘 - 強調表示]                                       │
│  「一歩動けば世界は変わる」                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### HTML構造

```html
<section id="author-story" class="author-story" aria-labelledby="author-story-title">
  <div class="container">
    <!-- キャッチコピー -->
    <div class="author-story__header" data-aos="fade-up">
      <h2 id="author-story-title" class="author-story__catchphrase">
        普通じゃない⁉<br>
        <span class="text-gradient-accent">だから人生は楽しい！</span>
      </h2>
      <p class="author-story__subtitle">
        みんなと違う？ 変わってる？ 勉強ができない。<br>
        でもチャレンジを恐れなかったからこそ今がある
      </p>
    </div>

    <!-- タイムライン -->
    <div class="author-story__timeline" data-aos="fade-up" data-aos-delay="100">
      <div class="timeline">
        <div class="timeline__item" data-period="childhood">
          <div class="timeline__marker"></div>
          <div class="timeline__content">
            <span class="timeline__period">幼少期</span>
            <p class="timeline__text">大阪で誕生、秋田へ移住</p>
          </div>
        </div>
        <!-- ... 他のタイムラインアイテム -->
      </div>
    </div>

    <!-- ターニングポイント -->
    <div class="author-story__turning-points">
      <h3 class="author-story__section-title">ターニングポイント</h3>
      <div class="turning-points">
        <!-- カード3枚 -->
      </div>
    </div>

    <!-- 座右の銘 -->
    <div class="author-story__motto" data-aos="zoom-in">
      <blockquote class="motto">
        <span class="motto__icon">❝</span>
        <p class="motto__text">一歩動けば世界は変わる</p>
        <cite class="motto__author">— 山﨑琢己の座右の銘</cite>
      </blockquote>
    </div>
  </div>
</section>
```

#### CSS仕様

```css
/* ========================================
   著者ストーリーセクション
   ======================================== */

.author-story {
  background: linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%);
  padding: var(--section-padding-y) 0;
  position: relative;
  overflow: hidden;
}

/* キャッチコピー */
.author-story__header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.author-story__catchphrase {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
  margin-bottom: var(--spacing-md);
}

.text-gradient-accent {
  background: linear-gradient(135deg, var(--color-accent) 0%, #E67E22 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.author-story__subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

/* タイムライン */
.timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-3xl);
}

.timeline::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg,
    var(--color-primary) 0%,
    var(--color-accent) 50%,
    var(--color-primary) 100%
  );
  border-radius: 2px;
  transform: translateY(-50%);
}

.timeline__item {
  position: relative;
  flex: 1;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.timeline__item:hover {
  transform: translateY(-5px);
}

.timeline__marker {
  width: 24px;
  height: 24px;
  background: var(--color-accent);
  border: 4px solid var(--color-bg-primary);
  border-radius: 50%;
  margin: 0 auto var(--spacing-md);
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.timeline__item:hover .timeline__marker {
  transform: scale(1.3);
  background: var(--color-primary);
}

.timeline__period {
  display: block;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.timeline__text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* モバイル対応: 縦並び */
@media (max-width: 768px) {
  .timeline {
    flex-direction: column;
    align-items: flex-start;
    padding-left: var(--spacing-xl);
  }

  .timeline::before {
    top: 0;
    bottom: 0;
    left: 12px;
    right: auto;
    width: 4px;
    height: auto;
    transform: none;
  }

  .timeline__item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    text-align: left;
  }

  .timeline__marker {
    flex-shrink: 0;
    margin: 0;
  }
}

/* ターニングポイント */
.turning-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-3xl);
}

.turning-point {
  background: var(--color-bg-card);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid var(--color-accent);
  transition: all 0.3s ease;
}

.turning-point:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.turning-point__number {
  display: inline-block;
  width: 32px;
  height: 32px;
  background: var(--color-accent);
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.turning-point__title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.turning-point__text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

/* 座右の銘 */
.motto {
  background: linear-gradient(135deg, var(--color-primary) 0%, #4A7B6F 100%);
  color: white;
  padding: var(--spacing-2xl) var(--spacing-3xl);
  border-radius: var(--border-radius-xl);
  text-align: center;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(91, 123, 111, 0.3);
}

.motto__icon {
  font-size: 3rem;
  opacity: 0.3;
  display: block;
  margin-bottom: var(--spacing-sm);
}

.motto__text {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.motto__author {
  font-size: var(--font-size-sm);
  opacity: 0.8;
  font-style: normal;
}
```

---

### B. メッセージセクション拡充

#### 現状
- 4つのメッセージカードがグリッド表示
- 「一歩動けば世界は変わる」の引用

#### 変更点
1. タブ形式で「保護者へ」「子どもたちへ」を切り替え
2. 詳細なメッセージを表示
3. 推薦コメントを追加

#### 構成

```
┌─────────────────────────────────────────────────────────────┐
│  心に響くメッセージ                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [タブ切り替え]                                              │
│  ┌──────────────┐ ┌──────────────┐                          │
│  │ 保護者の方へ  │ │ 子どもたちへ │                          │
│  └──────────────┘ └──────────────┘                          │
│                                                             │
│  [メッセージ内容]                                            │
│  詳細なメッセージテキスト...                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [推薦コメント]                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  "山﨑くんは..."                                      │   │
│  │                                                      │   │
│  │  相原嘉子氏 / 山形大学非常勤講師                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### HTML構造

```html
<!-- メッセージタブ -->
<div class="message__tabs" role="tablist">
  <button class="message__tab message__tab--active"
          role="tab"
          aria-selected="true"
          data-tab="parents">
    <i class="fas fa-heart"></i>
    保護者の方へ
  </button>
  <button class="message__tab"
          role="tab"
          aria-selected="false"
          data-tab="children">
    <i class="fas fa-child"></i>
    子どもたちへ
  </button>
</div>

<div class="message__tab-content">
  <div class="message__panel message__panel--active" data-panel="parents">
    <p class="message__detail-text">
      焦ったり、必要以上に心配したりせず、一方的、また感情的にならずに
      子どもの話を聞いてほしい。子どもの言動を否定しないで！
      「普通じゃない」「ダメ」といった否定言葉は聞かせないで！
      冷静に子どもが何を感じているのか、順を追って話をじっくり聞き、
      「〜だったらどう？」と視点を変えて考えさせてほしい。
    </p>
  </div>
  <div class="message__panel" data-panel="children">
    <p class="message__detail-text">
      親や周りに理解されない、学校が合わない、自分だけできない、
      そんなことがたくさんあると思う。でもできなくてもどうとでもなるし、
      学校がすべてじゃない。他人に迷惑をかけなければ大丈夫！
      楽しいと感じることを探して、触れて、多種多様な職業や活動をしている
      いろんな人に出会ってみて。生き方に正解はなく、生き方はたくさんある！
    </p>
  </div>
</div>

<!-- 推薦コメント -->
<div class="message__testimonial" data-aos="fade-up">
  <div class="testimonial">
    <blockquote class="testimonial__quote">
      山﨑くんは、ADHDであることを公表し著書も持つ、私が受け持つ大学の生徒の一人です。
      授業でChatGPTなどAIを活用し自らの特性を主体的にマネジメントする姿は、
      その難しさにとらわれるのではなく自分の特性を生かして工夫する視点を
      クラスに広げています。
    </blockquote>
    <div class="testimonial__author">
      <div class="testimonial__author-info">
        <span class="testimonial__author-name">相原 嘉子</span>
        <span class="testimonial__author-title">
          医療法人健希会 常任理事 / 山形大学 非常勤講師 / MBA
        </span>
      </div>
    </div>
  </div>
</div>
```

#### CSS仕様

```css
/* タブ */
.message__tabs {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.message__tab {
  padding: var(--spacing-md) var(--spacing-xl);
  background: transparent;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.message__tab:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.message__tab--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.message__panel {
  display: none;
  animation: fadeIn 0.3s ease;
}

.message__panel--active {
  display: block;
}

.message__detail-text {
  font-size: var(--font-size-lg);
  line-height: 2;
  color: var(--color-text-primary);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* 推薦コメント */
.testimonial {
  background: var(--color-bg-card);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-2xl);
  margin-top: var(--spacing-3xl);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid var(--color-accent);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.testimonial__quote {
  font-size: var(--font-size-lg);
  font-style: italic;
  color: var(--color-text-primary);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
  position: relative;
  padding-left: var(--spacing-lg);
}

.testimonial__quote::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -10px;
  font-size: 4rem;
  color: var(--color-accent);
  opacity: 0.3;
  font-family: Georgia, serif;
}

.testimonial__author {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.testimonial__author-name {
  display: block;
  font-weight: 700;
  color: var(--color-text-primary);
}

.testimonial__author-title {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
```

---

## レスポンシブ対応

### ブレークポイント

| サイズ | 幅 | 対応 |
|--------|-----|------|
| モバイル | ~767px | タイムライン縦並び、カード1列 |
| タブレット | 768px~1023px | タイムライン横並び、カード2列 |
| デスクトップ | 1024px~ | フル表示、カード3列 |

### モバイル特有の調整
- キャッチコピー: font-size縮小
- タイムライン: 縦並びに変更
- タブ: 幅100%で縦並び
- 推薦コメント: パディング縮小

---

## アニメーション

### 使用するAOS設定
- fade-up: 基本的なフェードイン
- zoom-in: 座右の銘の強調
- fade-up with delay: 順次表示

### prefers-reduced-motion対応
```css
@media (prefers-reduced-motion: reduce) {
  .timeline__item,
  .turning-point,
  .motto {
    transition: none;
    transform: none !important;
  }
}
```

---

## アクセシビリティ

1. **見出し階層**: h2 → h3 の正しい順序
2. **タブ操作**: role="tablist", role="tab", aria-selected
3. **フォーカス管理**: キーボードナビゲーション対応
4. **コントラスト比**: WCAG AA基準以上
5. **スクリーンリーダー**: 適切なaria-label

---

## コーダーへの指示

### 優先度：高（必須）
1. 著者ストーリーセクション(`#author-story`)を `#author` と `#toc` の間に追加
2. タイムラインコンポーネントの実装
3. ターニングポイントカード3枚の実装
4. 座右の銘の強調表示

### 優先度：中
5. メッセージセクションにタブ機能追加
6. 推薦コメント追加
7. レスポンシブ対応

### 優先度：低
8. アニメーション調整
9. タブのJavaScript実装

### 採用するコンテンツ（takumi_lp_content.mdより）

#### タイムライン（5段階）
1. **幼少期**: 大阪で誕生、秋田へ移住
2. **小学校**: 教室に入れなくなる、ADHD・ASD診断
3. **中学校**: 特別支援学級、ネガティブな日々
4. **高校**: IT専攻、起業、200万円補助金獲得
5. **現在**: 国立大合格、if塾塾長、NPO理事

#### ターニングポイント（3つ厳選）
1. **暴れたワケ**: 我慢の限界、気持ちを伝えるための極端な行動
2. **ITとの出会い**: 面白そうから始まった起業への挑戦
3. **if塾開業**: 好きなことを伸ばせる居場所づくりの決意

#### メッセージ（2つ）
- 保護者へ: 否定しないで、じっくり話を聞いて
- 子どもたちへ: 学校がすべてじゃない、生き方はたくさんある

---

## 画像素材について

現時点で必要な追加画像はありません。
既存の著者画像(`author-yamazaki.png`)を活用します。

---

## 最終確認チェックリスト

- [ ] キャッチコピーが目立つ位置に配置されているか
- [ ] タイムラインが視覚的にわかりやすいか
- [ ] ターニングポイントが感情に訴えるか
- [ ] メッセージがターゲットペルソナに刺さるか
- [ ] 推薦コメントが信頼性を高めているか
- [ ] 座右の銘が印象に残るか
- [ ] 既存デザインとの調和が取れているか
