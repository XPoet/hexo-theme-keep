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

  // register window scroll event
  registerWindowScroll() {
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

}



