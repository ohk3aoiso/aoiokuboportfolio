// ===== スクロール時のフェードインアニメーション =====
(function () {
  const fadeEls = document.querySelectorAll('.fade-in');

  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 少しずつ遅延させて順番に表示
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in'));
          const index = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeEls.forEach((el) => observer.observe(el));
})();

// ===== ページ読み込み時にすでに見えている要素をすぐ表示 =====
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), i * 100);
    }
  });
});

// ===== ハンバーガーメニュー =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-nav-close');

  if (!hamburger || !mobileNav) return;

  const openMenu = () => mobileNav.classList.add('open');
  const closeMenu = () => mobileNav.classList.remove('open');

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // ナビリンクをタップしたら閉じる
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
});
