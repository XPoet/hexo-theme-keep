KEEP.utils = {

  headerProgress_dom: document.querySelector('.header-progress'),
  pageTop_dom: document.querySelector('.page-main-content-top'),
  firstScreen_dom: document.querySelector('.first-screen-container'),
  html_root_dom: document.querySelector('html'),

  printThemeInfo() {
    const themeInfo = `${KEEP.themeInfo.name} v${KEEP.themeInfo.version}`;
    console.info(themeInfo + '\n' + KEEP.themeInfo.repository);
    const footThemeInfoDom = document.querySelector('.footer .info-container .theme-info a.theme-version');
    if (footThemeInfoDom) {
      footThemeInfoDom.setAttribute('href', KEEP.themeInfo.repository);
      footThemeInfoDom.innerHTML = themeInfo;
    }
  },

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
      if (KEEP.theme_config.toc.enable && KEEP.utils.hasOwnProperty('findActiveIndexByTOC')) {
        KEEP.utils.findActiveIndexByTOC();
      }

      // header shrink
      KEEP.utils.headerShrink.headerShrink();
    });
  },

  // toggle show tools list
  toggleShowToolsList() {
    document.querySelector('.tool-toggle-show').addEventListener('click', () => {
      document.querySelector('.side-tools-list').classList.toggle('show');
    });
  },

  // global font adjust
  defaultFontSize: 0,
  globalFontAdjust() {
    const initFontSize = document.defaultView.getComputedStyle(document.body).fontSize;
    const fs = Number(initFontSize.substring(0, initFontSize.length - 2));

    const setFontSize = (defaultFontSize) => {
      this.html_root_dom.style.fontSize = `${fs * (1 + defaultFontSize * 0.05)}px`;
    }

    document.querySelector('.tool-font-adjust-plus').addEventListener('click', () => {
      if (this.defaultFontSize >= 5) return;
      this.defaultFontSize++;
      setFontSize(this.defaultFontSize);
    });

    document.querySelector('.tool-font-adjust-minus').addEventListener('click', () => {
      if (this.defaultFontSize <= 0) return;
      this.defaultFontSize--;
      setFontSize(this.defaultFontSize);
    });
  },

  contentAreaWidthAdjust() {
    const toolExpandDom = document.querySelector('.tool-expand-width');
    const mainContentDom = document.querySelector('.main-content');
    const headerContentDom = document.querySelector('.header-content');
    const iconDom = toolExpandDom.querySelector('i');

    let isExpand = false;
    const expandWidth = '90%';
    const notExpandWidth = (KEEP.theme_config.style.content_max_width || '1000px');

    toolExpandDom.addEventListener('click', () => {
      isExpand = !isExpand;

      if (isExpand) {
        iconDom.classList.remove('fa-arrows-alt-h');
        iconDom.classList.add('fa-compress-arrows-alt');
        mainContentDom.style.maxWidth = expandWidth;
        headerContentDom.style.maxWidth = expandWidth;
      } else {
        iconDom.classList.remove('fa-compress-arrows-alt');
        iconDom.classList.add('fa-arrows-alt-h');
        mainContentDom.style.maxWidth = notExpandWidth;
        headerContentDom.style.maxWidth = notExpandWidth;
      }

    });
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
  },


  setLanguage(p1, p2) {
    return p2.replace(/%s/g, p1)
  },

  getHowLongAgo(timestamp) {

    let l = KEEP.language

    timestamp /= 1000;

    const __Y = Math.floor(timestamp / (60 * 60 * 24 * 30) / 12)
    const __M = Math.floor(timestamp / (60 * 60 * 24 * 30))
    const __W = Math.floor(timestamp / (60 * 60 * 24) / 7)
    const __d = Math.floor(timestamp / (60 * 60 * 24))
    const __h = Math.floor(timestamp / (60 * 60) % 24)
    const __m = Math.floor(timestamp / 60 % 60)
    const __s = Math.floor(timestamp % 60)

    if (__Y > 0) {
      return this.setLanguage(__Y, l.ago.year)

    } else if (__M > 0) {
      return this.setLanguage(__M, l.ago.month)

    } else if (__W > 0) {
      return this.setLanguage(__W, l.ago.week)

    } else if (__d > 0) {
      return this.setLanguage(__d, l.ago.day)

    } else if (__h > 0) {
      return this.setLanguage(__h, l.ago.hour)

    } else if (__m > 0) {
      return this.setLanguage(__m, l.ago.minute)

    } else if (__s > 0) {
      return this.setLanguage(__s, l.ago.second)
    }
  },

  setHowLongAgoInHome() {
    const post = document.querySelectorAll('.home-article-meta-info .home-article-date');
    post && post.forEach(v => {
      v.innerHTML = this.getHowLongAgo(Date.now() - new Date(v.dataset.date).getTime())
    })
  }
}
