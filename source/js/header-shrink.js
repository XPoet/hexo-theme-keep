window.addEventListener('DOMContentLoaded', () => {
  ILS.utils.headerShrink = {

    pageTemplateDom: document.querySelector('.page-main-content'),
    sidebarToolsDom: document.querySelector('.sidebar-tools'),
    headerDom: document.querySelector('.header-wrapper'),
    menuBarDom: document.querySelector('.menu-bar'),
    windowMaskDom: document.querySelector('.window-mask'),

    isHeaderShrink: false,

    init() {
      this.headerHeight = this.headerDom.getBoundingClientRect().height;
    },

    headerShrink() {

      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      if (!this.isHeaderShrink && scrollTop > this.headerHeight) {
        this.isHeaderShrink = true;
        this.headerDom.classList.add('header-wrapper-shrink');
        this.pageTemplateDom.classList.add('page-main-content-top-shrink');
        this.sidebarToolsDom.classList.add('sidebar-tools-shrink');

      } else if (this.isHeaderShrink && scrollTop <= this.headerHeight) {
        this.isHeaderShrink = false;
        this.headerDom.classList.remove('header-wrapper-shrink');
        this.pageTemplateDom.classList.remove('page-main-content-top-shrink');
        this.sidebarToolsDom.classList.remove('sidebar-tools-shrink');
      }

    },

    initMenuBarButton() {
      this.menuBarDom.addEventListener('click', () => {
        this.headerDom.classList.toggle('header-drawer-show');
      });
    },

    initWindowMask() {
      this.windowMaskDom.addEventListener('click', () => {
        this.headerDom.classList.toggle('header-drawer-show');
      });
    },
  }
  ILS.utils.headerShrink.init();
  ILS.utils.headerShrink.initMenuBarButton();
  ILS.utils.headerShrink.initWindowMask();
});
