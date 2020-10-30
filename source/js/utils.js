ILS.utils = {

  themeInfo: {
    author: 'XPoet',
    name: 'ILS',
    version: '2.1.3',
    repository: 'https://github.com/XPoet/hexo-theme-ils'
  },

  printThemeInfo() {
    const themeInfo = `${this.themeInfo.name} v${this.themeInfo.version}`;
    console.log(themeInfo);
    const footThemeInfoDom = document.querySelector('.footer .info-container .theme-info a.theme-version');
    if (footThemeInfoDom) {
      footThemeInfoDom.setAttribute('href', this.themeInfo.repository);
      footThemeInfoDom.innerHTML = themeInfo;
    }

  }
}

ILS.utils = {

  ...ILS.utils,

  headerProgress_dom: document.querySelector('.header-progress'),
  pageTop_dom: document.querySelector('.page-main-content-top'),

  // Scroll Style Handle
  prevScrollValue: 0,
  styleHandleWhenScroll() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    const percent = Math.round(scrollTop / (scrollHeight - clientHeight) * 100).toFixed(0);
    const ProgressPercent = (scrollTop / (scrollHeight - clientHeight) * 100).toFixed(3);

    if (this.headerProgress_dom) {
      this.headerProgress_dom.style.visibility = percent === '0' ? 'hidden' : 'visible';
      this.headerProgress_dom.style.width = `${ProgressPercent}%`;
    }

    // hide header handle
    if (scrollTop > this.prevScrollValue && scrollTop > 500) {
      this.pageTop_dom.style.transform = 'translateY(-100%)';
    } else {
      this.pageTop_dom.style.transform = 'translateY(0)';
    }
    this.prevScrollValue = scrollTop;
  },

  // register window scroll event
  registerWindowScroll() {
    window.addEventListener('scroll', () => {
      // style handle when scroll
      this.styleHandleWhenScroll();

      // TOC scroll handle
      if (CONFIG.toc.enable && ILS.utils.hasOwnProperty('findActiveIndexByTOC')) {
        ILS.utils.findActiveIndexByTOC();
      }

      // header shrink
      ILS.utils.headerShrink.headerShrink();
    });
  },

  // tools
  registerToolsButtonClick() {

    let isOpen = false
    this.toolsMenuButton_dom = document.querySelector('.tools-button');
    this.toolsWrapperList_dom = document.querySelectorAll('.tools-wrapper li');

    this.toolsMenuButton_dom.addEventListener('click', e => {
      isOpen = !isOpen;

      const toolsMenuButtonIcon = this.toolsMenuButton_dom.querySelector('i');
      if (isOpen) {
        toolsMenuButtonIcon.classList.add('fa-minus');
        toolsMenuButtonIcon.classList.remove('fa-plus');
      } else {
        toolsMenuButtonIcon.classList.add('fa-plus');
        toolsMenuButtonIcon.classList.remove('fa-minus');
      }
      this.toolsWrapperList_dom.forEach((li, index) => {

        if (isOpen) {
          li.style.transform = `translate3d(0, -${138 * (index + 1)}%, 0)`;
          li.style.opacity = '1';
        } else {
          li.style.opacity = '0';
          li.style.transform = 'translate3d(0, 0, 0)';
        }

      });
    });
  },

  // calculate transform value
  calculateTransformValue(index) {
    const x = 3;
    const y = Math.floor(index / x) + 1;
    const z = index % x + 1;

    switch (z) {
      case 1:
        return `0, -${150 * y}%, 0`;
      case 2:
        return `-${150 * y}%, -${150 * y}%, 0`;
      case 3:
        return `-${150 * y}%, 0, 0`;
    }
  },

  // go comment
  goComment() {
    this.goComment_dom = document.querySelector('.go-comment');
    if (this.goComment_dom) {
      this.goComment_dom.addEventListener('click', () => {
        document.querySelector('#comment-anchor').scrollIntoView();
      });
    }

  },

  // get dom element height
  getElementHeight(selectors) {
    const dom = document.querySelector(selectors);
    return dom ? dom.getBoundingClientRect().height : 0;
  },


  initPageHeightHandle() {
    const h1 = this.getElementHeight('.header-progress');
    const h2 = this.getElementHeight('.page-main-content-top');
    const h3 = this.getElementHeight('.page-main-content-middle');
    const h4 = this.getElementHeight('.page-main-content-bottom');
    const allDomHeight = h1 + h2 + h3 + h4;
    const innerHeight = window.innerHeight;
    const pb_dom = document.querySelector('.page-main-content-bottom');
    if (allDomHeight < innerHeight) {
      pb_dom.style.marginTop = (innerHeight - allDomHeight) + 'px';
    }
  },
}
