window.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.post-toc-wrap .post-toc li');
  navItems.length > 0 && window.utils.openToggle();
});
