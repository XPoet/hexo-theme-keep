window.addEventListener('DOMContentLoaded', () => {
  // print theme info
  ILS.utils.printThemeInfo();

  // init scroll
  ILS.utils.registerWindowScroll();

  // init tools button
  ILS.utils.registerToolsButtonClick();

  // comment
  ILS.utils.goComment();

  // init page height handle
  ILS.utils.initPageHeightHandle();
});
