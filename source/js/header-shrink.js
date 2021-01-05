KEEP.initHeaderShrink = () => {
  KEEP.utils.headerShrink = {
    headerDom: document.querySelector('.header-wrapper'),
    isHeaderShrink: false,

    init() {
      this.headerHeight = this.headerDom.getBoundingClientRect().height;
    },

    headerShrink() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      if (!this.isHeaderShrink && scrollTop > this.headerHeight) {
        this.isHeaderShrink = true;
        document.body.classList.add('header-shrink');
      } else if (this.isHeaderShrink && scrollTop <= this.headerHeight) {
        this.isHeaderShrink = false;
        document.body.classList.remove('header-shrink');
      }

    },

    initMenuBarButton() {
      document.querySelector('.menu-bar').addEventListener('click', () => {
        document.body.classList.toggle('header-drawer-show');
      });
    },

    initWindowMask() {
      document.querySelector('.window-mask').addEventListener('click', () => {
        document.body.classList.toggle('header-drawer-show');
      });
    },
  }
  KEEP.utils.headerShrink.init();
  KEEP.utils.headerShrink.initMenuBarButton();
  KEEP.utils.headerShrink.initWindowMask();
}
