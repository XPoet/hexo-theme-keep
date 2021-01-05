function initLeftSideToggle() {
  KEEP.utils.leftSideToggle = {

    init() {
      this.toggleBar = document.querySelector('.page-aside-toggle');
      this.pageTopDom = document.querySelector('.page-main-content-top');
      this.containerDom = document.querySelector('.page-container');
      this.leftAsideDom = document.querySelector('.page-aside');
      this.isOpenPageAside = false;
    },

    initToggleBarButton() {
      if (this.toggleBar) {
        const toggleBarIcon = this.toggleBar.querySelector('i');
        this.toggleBar.addEventListener('click', () => {
          this.isOpenPageAside = !this.isOpenPageAside;
          if (this.isOpenPageAside) {
            toggleBarIcon.classList.add('fa-outdent');
            toggleBarIcon.classList.remove('fa-indent');
          } else {
            toggleBarIcon.classList.add('fa-indent');
            toggleBarIcon.classList.remove('fa-outdent');
          }
          this.changePageLayoutWhenOpenToggle(this.isOpenPageAside);
        })
      }
    },

    changePageLayoutWhenOpenToggle(isOpen) {
      const pageAsideWidth = KEEP.theme_config.style.left_side_width || '260px';
      this.containerDom.style.paddingLeft = isOpen ? pageAsideWidth : '0';
      this.pageTopDom.style.paddingLeft = isOpen ? pageAsideWidth : '0';
      this.leftAsideDom.style.left = isOpen ? '0' : `-${pageAsideWidth}`;
    },
  }
  KEEP.utils.leftSideToggle.init();
  KEEP.utils.leftSideToggle.initToggleBarButton();
}

if (KEEP.theme_config.pjax.enable === true  && KEEP.utils) {
  initLeftSideToggle();
} else {
  window.addEventListener('DOMContentLoaded', initLeftSideToggle);
}
