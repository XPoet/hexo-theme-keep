window.addEventListener('DOMContentLoaded', () => {

  ILS.utils.navItems = document.querySelectorAll('.post-toc-wrap .post-toc li');
  ILS.utils.articleToc_dom = document.querySelector('.article-toc');
  ILS.utils.postTocWrap_dom = document.querySelector('.post-toc-wrap');

  if (ILS.utils.navItems.length > 0) {

    ILS.utils = {

      ...ILS.utils,

      findActiveIndexByTOC() {
        if (!Array.isArray(ILS.utils.sections)) return;
        let index = ILS.utils.sections.findIndex(element => {
          return element && element.getBoundingClientRect().top - 20 > 0;
        });
        if (index === -1) {
          index = ILS.utils.sections.length - 1;
        } else if (index > 0) {
          index--;
        }
        ILS.utils.activateNavByIndex(index);
      },

      registerSidebarTOC() {
        ILS.utils.sections = [...document.querySelectorAll('.post-toc li a.nav-link')].map(element => {
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
                  ILS.utils.pageTop_dom.style.transform = 'translateY(-100%)';
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
        ILS.utils.leftSideToggle.toggleBar.style.display = 'flex';
        ILS.utils.leftSideToggle.isOpenPageAside = true;
        ILS.utils.leftSideToggle.changePageLayoutWhenOpenToggle(ILS.utils.leftSideToggle.isOpenPageAside);
      }
    }

    ILS.utils.showPageAsideWhenHasTOC();
    ILS.utils.registerSidebarTOC();


  } else {

    if (ILS.utils.postTocWrap_dom) {
      ILS.utils.postTocWrap_dom.innerHTML = '';
      ILS.utils.postTocWrap_dom.style.display = 'none';
    }

    if (ILS.utils.articleToc_dom) {
      ILS.utils.articleToc_dom.style.display = 'none';
    }
  }
});

