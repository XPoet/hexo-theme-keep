window.addEventListener('DOMContentLoaded', () => {

  ILS.utils.leftSideToggle = {

    init() {
      this.toggleBar = document.querySelector('.page-aside-toggle');
      this.pageTopDom = document.querySelector('.page-main-content-top');
      this.containerDom = document.querySelector('.page-container');
      this.leftAsideDom = document.querySelector('.page-aside');
      this.headerContentDom = document.querySelector('.header-wrapper .header-content');
      this.mainContentDom = document.querySelector('.page-main-content-middle .main-content');
      this.isOpenPageAside = false;
    },

    initToggleBarButton() {
      if (this.toggleBar) {
        this.toggleBar.addEventListener('click', () => {
          this.isOpenPageAside = !this.isOpenPageAside;
          this.changePageLayoutWhenOpenToggle(this.isOpenPageAside);
        })
      }
    },

    changePageLayoutWhenOpenToggle(isOpen) {
      const pageAsideWidth = '258px';
      this.containerDom.style.paddingLeft = isOpen ? pageAsideWidth : '0';
      this.pageTopDom.style.paddingLeft = isOpen ? pageAsideWidth : '0';
      this.pageTopDom.style.paddingLeft = isOpen ? pageAsideWidth : '0';
      this.leftAsideDom.style.left = isOpen ? '0' : `-${pageAsideWidth}`;
      this.headerContentDom.style.width = isOpen ? '76%' : '62%';
      this.mainContentDom.style.width = isOpen ? '76%' : '62%';
    },
  }

  ILS.utils.leftSideToggle.init();
  ILS.utils.leftSideToggle.initToggleBarButton();

});
