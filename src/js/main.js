/**
 * 学校が合わない僕は、高一で起業して、国立大へ行くことにした。
 * 書籍紹介ランディングページ - メインスクリプト v7
 *
 * フルスクリーンセクション対応・ワクワクするアニメーション強化版
 * 2025年トレンド: マイクロインタラクション・3Dエフェクト・紙吹雪
 */

document.addEventListener('DOMContentLoaded', () => {
  // 基本初期化
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initTocAccordion();
  initSectionReveal();
  initScrollIndicator();
  initParallaxEffects();
  initFixedCTA();
  initMessageTabs();
  initStaggeredAnimations();
  initScrollProgress();
  initTextAnimations();
  initImageReveal();
  initCountUp();
  initHoverEffects();
  initStaggerChildren();

  // 楽しいインタラクション（2025年トレンド）
  initFunInteractions();
});

/**
 * ヘッダーのスクロール処理
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  let lastScrollY = 0;

  const updateHeader = () => {
    const scrollY = window.scrollY;

    // スクロール位置に応じてシャドウを追加
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // スクロール方向に応じてヘッダーを表示/非表示
    if (scrollY > 300) {
      if (scrollY > lastScrollY) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
    } else {
      header.classList.remove('header--hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

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
 * セクションリビール（表示時のアニメーション）
 */
function initSectionReveal() {
  // Intersection Observerが利用可能かチェック
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fullscreen-section, [data-aos]').forEach(el => {
      el.classList.add('is-visible', 'aos-animate');
    });
    return;
  }

  // アニメーション削減設定を確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.fullscreen-section, [data-aos]').forEach(el => {
      el.classList.add('is-visible', 'aos-animate');
    });
    return;
  }

  // フルスクリーンセクション用のObserver
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // 子要素のスタッガードアニメーションをトリガー
        const staggerElements = entry.target.querySelectorAll('[data-stagger]');
        staggerElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('is-visible');
          }, index * 100);
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-10% 0px -10% 0px',
    threshold: 0.1
  });

  // data-aos属性用のObserver
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay, 10) || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, Math.min(delay, 500));
        aosObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  // フルスクリーンセクションを監視
  document.querySelectorAll('.fullscreen-section').forEach(section => {
    sectionObserver.observe(section);
  });

  // data-aos属性を持つ要素を監視
  document.querySelectorAll('[data-aos]').forEach(el => {
    aosObserver.observe(el);
  });
}

/**
 * スクロールインジケーター
 */
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (!scrollIndicator) return;

  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  let ticking = false;

  const updateIndicator = () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    // ヒーローセクションが画面から出たらインジケーターを非表示
    if (heroBottom < windowHeight * 0.5) {
      scrollIndicator.classList.add('is-hidden');
    } else {
      scrollIndicator.classList.remove('is-hidden');
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateIndicator);
      ticking = true;
    }
  }, { passive: true });

  // クリックで次のセクションへスクロール
  scrollIndicator.addEventListener('click', () => {
    const nextSection = heroSection.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/**
 * パララックス効果
 */
function initParallaxEffects() {
  // モーション設定を確認
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length === 0) return;

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const offsetY = (scrollY - elementTop) * speed;

      // 視野内にある要素のみ更新
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${offsetY}px)`;
      }
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 固定CTAボタンの表示制御
 */
function initFixedCTA() {
  const fixedCTA = document.getElementById('fixed-cta');
  const heroSection = document.querySelector('.hero');
  const footer = document.querySelector('.footer');

  if (!fixedCTA || !heroSection) return;

  let ticking = false;

  const updateCTAVisibility = () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const footerTop = footer?.getBoundingClientRect().top || Infinity;
    const windowHeight = window.innerHeight;

    // ヒーローセクションを過ぎたら表示、フッター手前で非表示
    if (heroBottom < windowHeight * 0.5 && footerTop > windowHeight) {
      fixedCTA.classList.add('is-visible');
    } else {
      fixedCTA.classList.remove('is-visible');
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateCTAVisibility);
      ticking = true;
    }
  }, { passive: true });

  // 初期チェック
  updateCTAVisibility();
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

/**
 * スタッガードアニメーション（要素の順次表示）
 */
function initStaggeredAnimations() {
  // モーション設定を確認
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-stagger]').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // グループ化されたスタッガードアニメーション
  const staggerGroups = document.querySelectorAll('[data-stagger-group]');

  staggerGroups.forEach(group => {
    const children = group.querySelectorAll('[data-stagger]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          children.forEach((child, index) => {
            const delay = parseInt(child.dataset.stagger, 10) || (index * 100);
            setTimeout(() => {
              child.classList.add('is-visible');
            }, delay);
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    observer.observe(group);
  });
}

/**
 * スクロール進捗インジケーター
 */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  let ticking = false;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = `${progress}%`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
}

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
 * 画像リビールアニメーション
 */
function initImageReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.image-reveal').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.image-reveal').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        imageObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  });

  document.querySelectorAll('.image-reveal').forEach(el => {
    imageObserver.observe(el);
  });
}

/**
 * カウントアップアニメーション
 */
function initCountUp() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const countUpElements = document.querySelectorAll('.count-up');
  if (countUpElements.length === 0) return;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10) || 0;
        const duration = parseInt(el.dataset.duration, 10) || 2000;
        const suffix = el.dataset.suffix || '';

        animateCountUp(el, 0, target, duration, suffix);
        countObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  countUpElements.forEach(el => {
    countObserver.observe(el);
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

/**
 * スタッガー子要素アニメーション
 */
function initStaggerChildren() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.stagger-children').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.stagger-children').forEach(el => {
    staggerObserver.observe(el);
  });
}

/**
 * ==========================================================================
 * Fun Interactive Animations (2025 Trends)
 * ==========================================================================
 */

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
 * 3Dチルトカードエフェクト（マウス追従）
 */
function initTiltCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.card-3d, .about__card, .author__card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

/**
 * スクロール連動パララックス
 */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }, { passive: true });
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
 * スクロール時のリビールアニメーション（スケール版）
 */
function initRevealScale() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-scale').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.reveal-scale').forEach(el => {
    observer.observe(el);
  });
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
 * CTAボタンクリック時の紙吹雪
 */
function initCTAConfetti() {
  document.querySelectorAll('.btn--cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // 外部リンクの場合は少し遅延させて紙吹雪を表示
      if (this.href && this.href.includes('amazon')) {
        e.preventDefault();
        createConfetti(30);
        setTimeout(() => {
          window.open(this.href, '_blank');
        }, 500);
      }
    });
  });
}

/**
 * スクロールで現れるセクションにアニメーション追加
 */
function initSectionAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;

        // セクション内のタイトルにアニメーション
        const titles = section.querySelectorAll('.section-title, h2');
        titles.forEach((title, index) => {
          setTimeout(() => {
            title.classList.add('animate-in');
          }, index * 100);
        });

        // カードにスタッガーアニメーション
        const cards = section.querySelectorAll('.about__card, .author__card, .preview__chapter, .testimonial');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('pop-in');
          }, index * 150);
        });

        observer.unobserve(section);
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('section, .fullscreen-section').forEach(section => {
    observer.observe(section);
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
  initRevealScale();
  initSectionAnimations();
  enhanceScrollIndicator();
  // initHorizontalScroll(); // 縦並びタイムラインに変更したため無効化

  // デスクトップ・非モバイルのみの効果
  if (!isMobile && !isTouchDevice && !prefersReducedMotion) {
    initMagneticButtons();
    initTiltCards();
    initParallax();
    initMouseGlow();
    initCursorGlow();
    init3DTiltEnhanced();
  }

  // 軽量な効果（モバイルでも許可）
  if (!prefersReducedMotion) {
    initButtonWobble();
    initEmojiPop();
    initCTAConfetti();
  }
}

/**
 * ==========================================================================
 * 横スクロールセクション・マーキー関連
 * ==========================================================================
 */

/**
 * 横スクロールセクションの初期化
 */
function initHorizontalScroll() {
  const wrapper = document.querySelector('.horizontal-scroll-wrapper');
  const track = document.querySelector('.horizontal-scroll-track');
  const prevBtn = document.querySelector('.scroll-nav-btn--prev');
  const nextBtn = document.querySelector('.scroll-nav-btn--next');
  const dots = document.querySelectorAll('.scroll-dot');

  if (!wrapper || !track) return;

  // ドラッグスクロール
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    wrapper.classList.add('active');
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.classList.remove('active');
  });

  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.classList.remove('active');
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
    updateDots();
  });

  // ボタンナビゲーション
  const cards = track.querySelectorAll('.scroll-card');
  const cardWidth = cards.length > 0 ? cards[0].offsetWidth + 32 : 352; // カード幅 + gap

  prevBtn?.addEventListener('click', () => {
    wrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    setTimeout(updateDots, 300);
  });

  nextBtn?.addEventListener('click', () => {
    wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
    setTimeout(updateDots, 300);
  });

  // ドット更新
  function updateDots() {
    if (dots.length === 0) return;
    const scrollProgress = wrapper.scrollLeft / (wrapper.scrollWidth - wrapper.clientWidth);
    const activeIndex = Math.round(scrollProgress * (dots.length - 1));

    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('scroll-dot--active');
      } else {
        dot.classList.remove('scroll-dot--active');
      }
    });
  }

  // スクロールイベント
  wrapper.addEventListener('scroll', () => {
    requestAnimationFrame(updateDots);
  }, { passive: true });

  // ホイールスクロール対応（横スクロール）
  wrapper.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      wrapper.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // タッチスワイプ対応
  let touchStartX = 0;
  let touchEndX = 0;

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // スワイプ左（次へ）
        wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
      } else {
        // スワイプ右（前へ）
        wrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
      setTimeout(updateDots, 300);
    }
  }, { passive: true });

  // ドットクリックでジャンプ
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const targetScroll = (wrapper.scrollWidth - wrapper.clientWidth) * (index / (dots.length - 1));
      wrapper.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setTimeout(updateDots, 300);
    });
  });
}

/**
 * カーソル追従グロー効果
 */
function initCursorGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glowElements = document.querySelectorAll('.glow-effect');

  glowElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      el.style.setProperty('--mouse-x', `${x}%`);
      el.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

/**
 * 3Dカードチルト効果（強化版）
 */
function init3DTiltEnhanced() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // タッチデバイスでは無効

  const cards = document.querySelectorAll('.card-3d-tilt');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(20px)
        scale(1.02)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
    });
  });
}

/**
 * スクロール連動パララックス強化版
 */
function initAdvancedParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const fadeElements = document.querySelectorAll('[data-scroll-fade]');
  const scaleElements = document.querySelectorAll('[data-scroll-scale]');

  let ticking = false;

  function updateElements() {
    const windowHeight = window.innerHeight;

    // フェードイン/アウト
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const viewportMid = windowHeight / 2;
      const elementMid = rect.top + rect.height / 2;
      const distance = Math.abs(viewportMid - elementMid);
      const maxDistance = windowHeight / 2 + rect.height / 2;
      const opacity = 1 - (distance / maxDistance) * 0.7;

      el.style.opacity = Math.max(0.3, Math.min(1, opacity));
    });

    // スケールエフェクト
    scaleElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const progress = 1 - (rect.top / windowHeight);
      const scale = 0.9 + (Math.min(1, Math.max(0, progress)) * 0.1);

      if (rect.top < windowHeight && rect.bottom > 0) {
        el.style.transform = `scale(${scale})`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateElements);
      ticking = true;
    }
  }, { passive: true });

  // 初期実行
  updateElements();
}
