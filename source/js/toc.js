window.addEventListener('DOMContentLoaded', () => {

  KEEP.utils.navItems = document.querySelectorAll('.post-toc-wrap .post-toc li');
  KEEP.utils.articleToc_dom = document.querySelector('.article-toc');
  KEEP.utils.postTocWrap_dom = document.querySelector('.post-toc-wrap');

  if (KEEP.utils.navItems.length > 0) {

    KEEP.utils = {

      ...KEEP.utils,

      findActiveIndexByTOC() {
        if (!Array.isArray(KEEP.utils.sections)) return;
        let index = KEEP.utils.sections.findIndex(element => {
          return element && element.getBoundingClientRect().top - 20 > 0;
        });
        if (index === -1) {
          index = KEEP.utils.sections.length - 1;
        } else if (index > 0) {
          index--;
        }
        KEEP.utils.activateNavByIndex(index);
      },

      registerSidebarTOC() {
        KEEP.utils.sections = [...document.querySelectorAll('.post-toc li a.nav-link')].map(element => {
          const target = document.getElementById(decodeURI(element.getAttribute('href')).replace('#', ''));
          element.addEventListener('click', event => {
            event.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY;
            window.anime({
              targets: document.scrollingElement,
              duration: 500,
              easing: 'linear',
              scrollTop: offset - 10,
              complete: function () {
                setTimeout(() => {
                  KEEP.utils.pageTop_dom.style.transform = 'translateY(-100%)';
                }, 100)
              }
            });
          });
          return target;
        });
      },

      activateNavByIndex: function (index) {
        const target = document.querySelectorAll('.post-toc li a.nav-link')[index];
        if (!target || target.classList.contains('active-current')) return;

        document.querySelectorAll('.post-toc .active').forEach(element => {
          element.classList.remove('active', 'active-current');
        });
        target.classList.add('active', 'active-current');
        let parent = target.parentNode;
        while (!parent.matches('.post-toc')) {
          if (parent.matches('li')) parent.classList.add('active');
          parent = parent.parentNode;
        }
        // Scrolling to center active TOC element if TOC content is taller then viewport.
        const tocElement = document.querySelector('.post-toc-wrap');
        window.anime({
          targets: tocElement,
          duration: 200,
          easing: 'linear',
          scrollTop: tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top
        });
      },

      showPageAsideWhenHasTOC() {
        KEEP.utils.leftSideToggle.toggleBar.style.display = 'flex';
        KEEP.utils.leftSideToggle.isOpenPageAside = true;
        KEEP.utils.leftSideToggle.changePageLayoutWhenOpenToggle(KEEP.utils.leftSideToggle.isOpenPageAside);
      }
    }

    KEEP.utils.showPageAsideWhenHasTOC();
    KEEP.utils.registerSidebarTOC();


  } else {

    if (KEEP.utils.postTocWrap_dom) {
      KEEP.utils.postTocWrap_dom.innerHTML = '';
      KEEP.utils.postTocWrap_dom.style.display = 'none';
    }

    if (KEEP.utils.articleToc_dom) {
      KEEP.utils.articleToc_dom.style.display = 'none';
    }
  }
});

