/**
 * 学校が合わない僕は、高一で起業して、国立大へ行くことにした。
 * 書籍紹介ランディングページ - メインスクリプト v8
 *
 * 最適化版: 統合IntersectionObserver・統合スクロールハンドラ
 * パフォーマンス改善: 6+ Observers → 1, 4+ scroll listeners → 1 RAF loop
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollHandler();
  initMobileMenu();
  initSmoothScroll();
  initTocAccordion();
  initUnifiedObserver();
  initMessageTabs();
  initTextAnimations();
  initHoverEffects();
  initFunInteractions();
});

/* ==========================================================================
 * 統合スクロールハンドラ
 * header / scroll-indicator / fixed-cta / scroll-progress / parallax を一括処理
 * ========================================================================== */

/**
 * すべてのスクロール連動処理を単一の requestAnimationFrame ループで実行
 */
function initScrollHandler() {
  const header = document.querySelector('.header');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const heroSection = document.querySelector('.hero');
  const fixedCTA = document.getElementById('fixed-cta');
  const footer = document.querySelector('.footer');
  const progressBar = document.querySelector('.scroll-progress');
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ticking = false;
  let lastScrollY = 0;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Header: shadow + show/hide on scroll direction
      if (header) {
        header.classList.toggle('scrolled', scrollY > 50);
        if (scrollY > 300) {
          header.classList.toggle('header--hidden', scrollY > lastScrollY);
        } else {
          header.classList.remove('header--hidden');
        }
      }

      // Scroll Indicator: hide after hero passes
      if (scrollIndicator && heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        scrollIndicator.classList.toggle('is-hidden', heroBottom < windowHeight * 0.5);
      }

      // Fixed CTA: show between hero and footer
      if (fixedCTA && heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const footerTop = footer?.getBoundingClientRect().top || Infinity;
        fixedCTA.classList.toggle('is-visible', heroBottom < windowHeight * 0.5 && footerTop > windowHeight);
      }

      // Scroll Progress bar width
      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - windowHeight;
        progressBar.style.width = `${(scrollY / docHeight) * 100}%`;
      }

      // Parallax elements
      if (!prefersReducedMotion && parallaxElements.length > 0) {
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.5;
          const rect = el.getBoundingClientRect();
          if (rect.top < windowHeight && rect.bottom > 0) {
            const elementTop = rect.top + scrollY;
            el.style.transform = `translateY(${(scrollY - elementTop) * speed}px)`;
          }
        });
      }

      lastScrollY = scrollY;
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial state check
  onScroll();

  // Scroll indicator click → scroll to next section
  if (scrollIndicator && heroSection) {
    scrollIndicator.addEventListener('click', () => {
      const nextSection = heroSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
 * 統合 IntersectionObserver
 * すべてのビューポート進入検知を単一 Observer で処理
 * ========================================================================== */

/**
 * 全要素の表示アニメーションを1つの IntersectionObserver で管理
 *
 * 対象:
 *  - .fullscreen-section → is-visible + stagger children
 *  - [data-aos]          → aos-animate (with delay)
 *  - .image-reveal       → revealed
 *  - .count-up           → trigger animateCountUp
 *  - .stagger-children   → is-visible
 *  - [data-stagger-group]→ stagger children is-visible
 *  - .reveal-scale       → is-visible
 *  - section, .fullscreen-section → animate-in / pop-in for titles & cards
 */
function initUnifiedObserver() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // IntersectionObserver not supported — show everything immediately
  if (!('IntersectionObserver' in window)) {
    revealAllImmediately();
    return;
  }

  // Reduced motion — show everything without animation
  if (prefersReducedMotion) {
    revealAllImmediately();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // --- .fullscreen-section → add is-visible, trigger stagger children ---
      if (el.classList.contains('fullscreen-section')) {
        el.classList.add('is-visible');
        const staggerElements = el.querySelectorAll('[data-stagger]');
        staggerElements.forEach((child, index) => {
          setTimeout(() => child.classList.add('is-visible'), index * 100);
        });
      }

      // --- [data-aos] → add aos-animate with optional delay ---
      if (el.hasAttribute('data-aos')) {
        const delay = parseInt(el.dataset.aosDelay, 10) || 0;
        setTimeout(() => el.classList.add('aos-animate'), Math.min(delay, 500));
        observer.unobserve(el);
        return; // data-aos elements only need this behavior
      }

      // --- .image-reveal → add revealed ---
      if (el.classList.contains('image-reveal')) {
        el.classList.add('revealed');
        observer.unobserve(el);
        return;
      }

      // --- .count-up → trigger count animation ---
      if (el.classList.contains('count-up')) {
        const target = parseInt(el.dataset.target, 10) || 0;
        const duration = parseInt(el.dataset.duration, 10) || 2000;
        const suffix = el.dataset.suffix || '';
        animateCountUp(el, 0, target, duration, suffix);
        observer.unobserve(el);
        return;
      }

      // --- .stagger-children → add is-visible ---
      if (el.classList.contains('stagger-children')) {
        el.classList.add('is-visible');
        observer.unobserve(el);
        return;
      }

      // --- [data-stagger-group] → stagger children ---
      if (el.hasAttribute('data-stagger-group')) {
        const children = el.querySelectorAll('[data-stagger]');
        children.forEach((child, index) => {
          const delay = parseInt(child.dataset.stagger, 10) || (index * 100);
          setTimeout(() => child.classList.add('is-visible'), delay);
        });
        observer.unobserve(el);
        return;
      }

      // --- .reveal-scale → add is-visible ---
      if (el.classList.contains('reveal-scale')) {
        el.classList.add('is-visible');
        observer.unobserve(el);
        return;
      }

      // --- section / .fullscreen-section → animate titles & cards ---
      if (el.tagName === 'SECTION' || el.classList.contains('fullscreen-section')) {
        const titles = el.querySelectorAll('.section-title, h2');
        titles.forEach((title, index) => {
          setTimeout(() => title.classList.add('animate-in'), index * 100);
        });

        const cards = el.querySelectorAll('.about__card, .author__card, .preview__chapter, .testimonial');
        cards.forEach((card, index) => {
          setTimeout(() => card.classList.add('pop-in'), index * 150);
        });

        observer.unobserve(el);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  // Collect and observe all target elements
  const selectors = [
    '.fullscreen-section',
    '[data-aos]',
    '.image-reveal',
    '.count-up',
    '.stagger-children',
    '[data-stagger-group]',
    '.reveal-scale',
    'section'
  ];

  const observed = new Set();

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!observed.has(el)) {
        observed.add(el);
        observer.observe(el);
      }
    });
  });
}

/**
 * アニメーション無効時にすべての要素を即座に表示する
 */
function revealAllImmediately() {
  document.querySelectorAll('.fullscreen-section, [data-aos]').forEach(el => {
    el.classList.add('is-visible', 'aos-animate');
  });
  document.querySelectorAll('.image-reveal').forEach(el => {
    el.classList.add('revealed');
  });
  document.querySelectorAll('.stagger-children, .reveal-scale').forEach(el => {
    el.classList.add('is-visible');
  });
  document.querySelectorAll('[data-stagger]').forEach(el => {
    el.classList.add('is-visible');
  });
}

/* ==========================================================================
 * UI コンポーネント
 * ========================================================================== */

/**
 * モバイルメニューの初期化
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.header__menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  const closeBtn = document.querySelector('.mobile-nav__close');

  if (!menuBtn || !mobileNav) return;

  // メニューを閉じる共通関数
  function closeMenu() {
    mobileNav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';

    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  // メニューボタンのクリック処理
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');

    // ボタンのアニメーション
    const spans = menuBtn.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }

    // スクロール制御
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // 閉じるボタンのクリック処理
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // リンククリックでメニューを閉じる
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Escapeキーでメニューを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
      menuBtn.focus();
    }
  });
}

/**
 * スムーズスクロールの初期化
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // フルスクリーンセクションの場合はセクションの先頭にスナップ
      const isFullscreen = target.classList.contains('fullscreen-section');
      const headerHeight = isFullscreen ? 0 : (document.querySelector('.header')?.offsetHeight || 70);
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // フォーカス管理（アクセシビリティ）
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

/**
 * 目次アコーディオンの初期化
 */
function initTocAccordion() {
  const tocItems = document.querySelectorAll('.toc__item');

  tocItems.forEach(item => {
    const header = item.querySelector('.toc__header');
    const content = item.querySelector('.toc__content');

    if (!header || !content) return;

    // 一意のIDを設定
    const id = `toc-content-${Math.random().toString(36).substring(2, 11)}`;
    content.id = id;
    header.setAttribute('aria-controls', id);

    header.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      header.setAttribute('aria-expanded', isOpen);
    });

    // キーボード操作
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

/**
 * メッセージセクションのタブ切り替え
 */
function initMessageTabs() {
  const tabContainer = document.querySelector('.message-v2__tabs') || document.querySelector('.message__tabs');
  if (!tabContainer) return;

  const isV2 = tabContainer.classList.contains('message-v2__tabs');
  const tabClass = isV2 ? 'message-v2__tab' : 'message__tab';
  const activeTabClass = isV2 ? 'message-v2__tab--active' : 'message__tab--active';
  const panelClass = isV2 ? 'message-v2__panel' : 'message__panel';
  const activePanelClass = isV2 ? 'message-v2__panel--active' : 'message__panel--active';

  const tabs = tabContainer.querySelectorAll(`.${tabClass}`);
  const panels = document.querySelectorAll(`.${panelClass}`);

  if (tabs.length === 0 || panels.length === 0) return;

  // タブクリックイベント
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanel = tab.getAttribute('data-tab');

      // 全タブの状態をリセット
      tabs.forEach(t => {
        t.classList.remove(activeTabClass);
        t.setAttribute('aria-selected', 'false');
      });

      // 全パネルを非表示
      panels.forEach(p => {
        p.classList.remove(activePanelClass);
        p.setAttribute('hidden', '');
      });

      // クリックされたタブをアクティブに
      tab.classList.add(activeTabClass);
      tab.setAttribute('aria-selected', 'true');

      // 対応するパネルを表示（アニメーション付き）
      const activePanel = document.querySelector(`[data-panel="${targetPanel}"]`);
      if (activePanel) {
        activePanel.classList.add(activePanelClass);
        activePanel.removeAttribute('hidden');

        // フェードインアニメーション
        activePanel.style.opacity = '0';
        activePanel.style.transform = 'translateY(10px)';
        requestAnimationFrame(() => {
          activePanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          activePanel.style.opacity = '1';
          activePanel.style.transform = 'translateY(0)';
        });
      }
    });

    // キーボードナビゲーション
    tab.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(tab);
      let newIndex;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = currentIndex === 0 ? tabArray.length - 1 : currentIndex - 1;
          tabArray[newIndex].focus();
          tabArray[newIndex].click();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = currentIndex === tabArray.length - 1 ? 0 : currentIndex + 1;
          tabArray[newIndex].focus();
          tabArray[newIndex].click();
          break;
        case 'Home':
          e.preventDefault();
          tabArray[0].focus();
          tabArray[0].click();
          break;
        case 'End':
          e.preventDefault();
          tabArray[tabArray.length - 1].focus();
          tabArray[tabArray.length - 1].click();
          break;
      }
    });
  });
}

/* ==========================================================================
 * テキスト・画像アニメーション
 * ========================================================================== */

/**
 * テキストアニメーション（文字分割）
 */
function initTextAnimations() {
  // モーション設定を確認
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // .text-reveal クラスを持つ要素を文字分割
  const textRevealElements = document.querySelectorAll('.text-reveal');

  textRevealElements.forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    el.setAttribute('aria-label', text);

    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'text-reveal__char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${index * 0.05}s`;
      el.appendChild(span);
    });
  });

  // .word-reveal クラスを持つ要素を単語分割
  const wordRevealElements = document.querySelectorAll('.word-reveal');

  wordRevealElements.forEach(el => {
    const text = el.textContent;
    const words = text.split(' ');
    el.innerHTML = '';
    el.setAttribute('aria-label', text);

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word-reveal__word';
      span.textContent = word;
      span.style.animationDelay = `${index * 0.1}s`;
      el.appendChild(span);

      if (index < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });
  });
}

/**
 * カウントアップアニメーション実行
 */
function animateCountUp(element, start, end, duration, suffix) {
  const startTime = performance.now();

  const updateCount = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // イーズアウト
    const easeOutQuad = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOutQuad);

    element.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  };

  requestAnimationFrame(updateCount);
}

/**
 * ホバーエフェクト強化
 */
function initHoverEffects() {
  // タッチデバイスではホバーエフェクトを無効化
  if ('ontouchstart' in window) {
    return;
  }

  // カード要素に3Dチルト効果を追加
  const cards = document.querySelectorAll('.about__card, .turning-point, .ifjuku__feature');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ボタンにリップル効果を追加（タッチデバイスでは無効化）
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: rippleEffect 0.6s ease-out forwards;
          pointer-events: none;
        `;

        btn.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // リップルアニメーションをスタイルシートに追加
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes rippleEffect {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

/* ==========================================================================
 * ページ読み込み・ビューポート
 * ========================================================================== */

/**
 * ページ読み込み完了後の処理
 */
window.addEventListener('load', () => {
  // ページ読み込み完了後にアニメーションを有効化
  document.body.classList.add('loaded');

  // ヒーローセクションのアニメーションを開始
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.classList.add('is-visible');
  }

  // スクロールインジケーターを表示
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    setTimeout(() => {
      scrollIndicator.classList.add('is-visible');
    }, 1000);
  }
});

/**
 * ビューポートの高さをCSS変数として設定（iOS対応）
 */
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(setViewportHeight, 100);
});

/* ==========================================================================
 * Fun Interactive Animations (2025 Trends)
 * ========================================================================== */

/**
 * 紙吹雪エフェクト
 */
function createConfetti(count = 50) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#D4824A', '#2D5A47', '#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1'];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(confetti);
  }

  setTimeout(() => container.remove(), 5000);
}

/**
 * リップルクリックエフェクト（デスクトップのみ）
 */
function initRippleEffect() {
  // タッチデバイスでは無効化（ボタン変形問題を防止）
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  document.querySelectorAll('.ripple-effect').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      this.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/**
 * マグネティックボタンエフェクト（デスクトップのみ）
 */
function initMagneticButtons() {
  // タッチデバイスまたはモーション軽減設定では無効化
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

/**
 * タイピングアニメーション
 */
function initTypewriter(element, text, speed = 50) {
  if (!element) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = text;
    return;
  }

  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

/**
 * ボタンのホバーで揺れるアニメーション
 */
function initButtonWobble() {
  document.querySelectorAll('.btn--cta').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.classList.add('wobble');
    });

    btn.addEventListener('animationend', function() {
      this.classList.remove('wobble');
    });
  });
}

/**
 * 絵文字のポップアニメーション
 */
function initEmojiPop() {
  document.querySelectorAll('.emoji-pop, .about__icon, .message-v2__message-icon').forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.classList.add('heartbeat');
    });

    el.addEventListener('mouseleave', function() {
      this.classList.remove('heartbeat');
    });
  });
}

/**
 * CTAボタンクリック時の紙吹雪（リンクナビゲーションをブロックしない）
 */
function initCTAConfetti() {
  document.querySelectorAll('.btn--cta').forEach(btn => {
    btn.addEventListener('click', function() {
      createConfetti(30);
    });
  });
}

/**
 * マウスカーソル追従グローエフェクト
 */
function initMouseGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.mouse-glow').forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.setProperty('--mouse-x', x + 'px');
      this.style.setProperty('--mouse-y', y + 'px');
    });
  });
}

/**
 * スクロールインジケーターのバウンスアニメーション強化
 */
function enhanceScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;

  indicator.classList.add('bounce');
}

/**
 * 楽しいインタラクション初期化
 */
function initFunInteractions() {
  // モバイルデバイス判定
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 必須の初期化（すべてのデバイス）
  initRippleEffect();
  enhanceScrollIndicator();

  // デスクトップ・非モバイルのみの効果
  if (!isMobile && !isTouchDevice && !prefersReducedMotion) {
    initMagneticButtons();
    initMouseGlow();
  }

  // 軽量な効果（モバイルでも許可）
  if (!prefersReducedMotion) {
    initButtonWobble();
    initEmojiPop();
    initCTAConfetti();
  }
}
