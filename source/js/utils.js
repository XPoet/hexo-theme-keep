ILS.utils = {
  printThemeInfo() {
    console.log(`${CONFIG.themeInfo.name} v${CONFIG.themeInfo.version}`);
  }
}

ILS.utils = {

  ...ILS.utils,

  headerProgress_dom: document.querySelector('.header-progress'),
  headerWrapper_dom: document.querySelector('.header-wrapper'),

  // Scroll Style Handle
  prevScrollValue: 0,
  styleHandleWhenScroll() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    const percent = Math.round(scrollTop / (scrollHeight - clientHeight) * 100).toFixed(0);
    const ProgressPercent = (scrollTop / (scrollHeight - clientHeight) * 100).toFixed(3);

    if (CONFIG.back2top.enable && ILS.utils.back2TopButton_dom) {
      ILS.utils.back2TopButton_dom.style.display = percent === '0' ? 'none' : 'flex';
    }

    if (ILS.utils.headerProgress_dom) {
      ILS.utils.headerProgress_dom.style.display = percent === '0' ? 'none' : 'block';
      ILS.utils.headerProgress_dom.style.width = `${ProgressPercent}%`;
    }

    // hide header handle
    const opacity = ILS.utils.headerWrapper_dom.style.opacity;
    if (scrollTop > ILS.utils.prevScrollValue && scrollTop > 500) {
      if (opacity !== '0') ILS.utils.headerWrapper_dom.style.opacity = '0';
    } else {
      if (opacity !== '1') ILS.utils.headerWrapper_dom.style.opacity = '1';
    }
    ILS.utils.prevScrollValue = scrollTop;
  },

  // 初始 window scroll 事件
  initWindowScroll() {
    window.addEventListener('scroll', function (_e) {
      // style handle when scroll
      ILS.utils.styleHandleWhenScroll();

      // TOC scroll handle
      if (CONFIG.toc.enable && ILS.utils.hasOwnProperty('findActiveIndexByTOC')) {
        ILS.utils.findActiveIndexByTOC();
      }

      // header shrink
      ILS.utils.headerShrink.headerShrink();
    });
  },
}



