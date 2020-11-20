KEEP.utils = {

  themeInfo: {
    author: 'XPoet',
    name: 'Keep',
    version: '3.0.0',
    repository: 'https://github.com/XPoet/hexo-theme-keep'
  },

  printThemeInfo() {
    const themeInfo = `${this.themeInfo.name} v${this.themeInfo.version}`;
    console.info(themeInfo + '\n' + this.themeInfo.repository);
    const footThemeInfoDom = document.querySelector('.footer .info-container .theme-info a.theme-version');
    if (footThemeInfoDom) {
      footThemeInfoDom.setAttribute('href', this.themeInfo.repository);
      footThemeInfoDom.innerHTML = themeInfo;
    }

  }
}

KEEP.utils = {

  ...KEEP.utils,

  headerProgress_dom: document.querySelector('.header-progress'),
  pageTop_dom: document.querySelector('.page-main-content-top'),
  firstScreen_dom: document.querySelector('.first-screen-container'),

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
      if (CONFIG.toc.enable && KEEP.utils.hasOwnProperty('findActiveIndexByTOC')) {
        KEEP.utils.findActiveIndexByTOC();
      }

      // header shrink
      KEEP.utils.headerShrink.headerShrink();
    });
  },

  // tools
  registerToolsButtonClick() {
    if (!CONFIG.side_tools.enable) return;

    let isOpen = false;
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

  // init first screen height
  initFirstScreenHeight() {
    this.firstScreen_dom && (this.firstScreen_dom.style.height = window.innerHeight + 'px');
  },

  // init page height handle
  initPageHeightHandle() {
    if (this.firstScreen_dom) return;

    const temp_h1 = this.getElementHeight('.header-progress');
    const temp_h2 = this.getElementHeight('.page-main-content-top');
    const temp_h3 = this.getElementHeight('.page-main-content-middle');
    const temp_h4 = this.getElementHeight('.page-main-content-bottom');
    const allDomHeight = temp_h1 + temp_h2 + temp_h3 + temp_h4;
    const innerHeight = window.innerHeight;
    const pb_dom = document.querySelector('.page-main-content-bottom');
    if (allDomHeight < innerHeight) {
      pb_dom.style.marginTop = (innerHeight - allDomHeight) + 'px';
    }
  },

  // big image viewer
  imageViewer() {
    let isBigImage = false;

    const showHandle = (dom, isShow) => {
      document.body.style.overflow = isShow ? 'hidden' : 'auto';
      dom.style.display = isShow ? 'flex' : 'none';
    }

    const imageViewerDom = document.querySelector('.image-viewer-container');
    const targetImg = document.querySelector('.image-viewer-container img');
    imageViewerDom && imageViewerDom.addEventListener('click', () => {
      isBigImage = false;
      showHandle(imageViewerDom, isBigImage);
    });

    const imgDoms = document.querySelectorAll('.markdown-body img');
    imgDoms && imgDoms.forEach(img => {

      img.addEventListener('click', () => {
        isBigImage = true;
        showHandle(imageViewerDom, isBigImage);
        targetImg.setAttribute('src', img.getAttribute('src'))
      });
    });
  }
}
