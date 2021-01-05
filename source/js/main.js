window.addEventListener('DOMContentLoaded', () => {

  KEEP.themeInfo = {
    author: 'XPoet',
    name: 'Keep',
    version: KEEP.theme_config.version,
    repository: 'https://github.com/XPoet/hexo-theme-keep'
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
  }

  KEEP.refresh();
});
