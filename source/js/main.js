window.addEventListener('DOMContentLoaded', () => {
  // print theme info
  KEEP.utils.printThemeInfo();

  // init scroll
  KEEP.utils.registerWindowScroll();

  // init tools button
  KEEP.utils.registerToolsButtonClick();

  // comment
  KEEP.utils.goComment();

  // init page height handle
  KEEP.utils.initPageHeightHandle();

  // init first screen height
  KEEP.utils.initFirstScreenHeight();

  // big image viewer handle
  KEEP.utils.imageViewer();
});
