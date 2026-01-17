/**
 * 学校が合わない僕は、高一で起業して、国立大へ行くことにした。
 * 書籍紹介ランディングページ - メインスクリプト
 */

document.addEventListener('DOMContentLoaded', () => {
  // 初期化
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initTocAccordion();
  initScrollAnimations();
});

/**
 * ヘッダーのスクロール処理
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  const updateHeader = () => {
    const scrollY = window.scrollY;

    // スクロール位置に応じてシャドウを追加
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
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

  if (!menuBtn || !mobileNav) return;

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

  // リンククリックでメニューを閉じる
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'メニューを開く');
      document.body.style.overflow = '';

      const spans = menuBtn.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // Escapeキーでメニューを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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

      const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

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
    const id = `toc-content-${Math.random().toString(36).substr(2, 9)}`;
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
 * スクロールアニメーションの初期化（Intersection Observer）
 */
function initScrollAnimations() {
  // Intersection Observerが利用可能かチェック
  if (!('IntersectionObserver' in window)) {
    // フォールバック：全要素を即座に表示
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.classList.add('aos-animate');
    });
    return;
  }

  const options = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 遅延がある場合は適用
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay, 10));

        observer.unobserve(entry.target);
      }
    });
  }, options);

  // data-aos属性を持つ要素を監視
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * ナビゲーションリンクのアクティブ状態を更新
 */
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-50% 0px -50% 0px'
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

/**
 * ページ読み込み完了後の処理
 */
window.addEventListener('load', () => {
  // ページ読み込み完了後にアニメーションを有効化
  document.body.classList.add('loaded');

  // アクティブナビゲーションの初期化
  initActiveNavigation();
});

/**
 * プリファレンス：アニメーション削減の確認
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // アニメーションを無効化
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.removeAttribute('data-aos');
    el.removeAttribute('data-aos-delay');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
