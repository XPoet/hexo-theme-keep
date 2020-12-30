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
    KEEP.initLocalSearch();
    KEEP.initBack2Top();
    KEEP.initCodeCopy();
  }

  KEEP.refresh();
});
