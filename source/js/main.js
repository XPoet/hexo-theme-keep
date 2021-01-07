window.addEventListener('DOMContentLoaded', () => {

  KEEP.themeInfo = {
    author: 'XPoet',
    name: 'Keep',
    version: KEEP.theme_config.version,
    repository: 'https://github.com/XPoet/hexo-theme-keep'
  }

  // print theme base info
  KEEP.printThemeInfo = () => {
    const themeInfo = `${KEEP.themeInfo.name} v${KEEP.themeInfo.version}`;
    console.log(`\n %c ${themeInfo} %c ${KEEP.themeInfo.repository} \n`, `color: #fadfa3; background: #333; padding: 5px 0;`, `background: #fadfa3; padding: 5px 0;`);
    const footThemeInfoDom = document.querySelector('.footer .info-container .theme-info a.theme-version');
    if (footThemeInfoDom) {
      footThemeInfoDom.setAttribute('href', KEEP.themeInfo.repository);
      footThemeInfoDom.innerHTML = themeInfo;
    }
  }

  KEEP.refresh = () => {
    KEEP.initUtils();
    KEEP.initHeaderShrink();
    KEEP.initModeToggle();
    KEEP.initBack2Top();

    if (KEEP.theme_config.local_search.enable === true) {
      KEEP.initLocalSearch();
    }

    if (KEEP.theme_config.code_copy.enable === true) {
      KEEP.initCodeCopy();
    }

    if (KEEP.theme_config.lazyload.enable === true) {
      KEEP.initLazyLoad();
    }
  }

  KEEP.printThemeInfo();
  KEEP.refresh();
});
