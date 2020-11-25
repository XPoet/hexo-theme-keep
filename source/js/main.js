window.addEventListener('DOMContentLoaded', () => {

  KEEP.themeInfo = {
    author: 'XPoet',
    name: 'Keep',
    version: KEEP.theme_config.version,
    repository: 'https://github.com/XPoet/hexo-theme-keep'
  }

  // print theme info
  KEEP.utils.printThemeInfo();

  // init scroll
  KEEP.utils.registerWindowScroll();

  // toggle show tools list
  KEEP.utils.toggleShowToolsList();

  // global font adjust
  KEEP.utils.globalFontAdjust();

  KEEP.utils.contentAreaWidthAdjust();

  // comment
  KEEP.utils.goComment();

  // init page height handle
  KEEP.utils.initPageHeightHandle();

  // init first screen height
  KEEP.utils.initFirstScreenHeight();

  // big image viewer handle
  KEEP.utils.imageViewer();

  // set how long age in home article block
  KEEP.utils.setHowLongAgoInHome();
});
