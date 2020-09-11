window.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.post-toc-wrap .post-toc li');
  const toggleDom = document.querySelector('.page-aside-toggle');

  if (navItems.length) {
    toggleDom.style.display = 'flex';
    window.utils.openToggle();
  }

});
