/* global hexo */

hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    const data = hexo.locals.get('data')

    if (data) {
      // theme config file handle
      if (data._config) {
        hexo.theme.config = data._config
      } else if (data.keep) {
        hexo.theme.config = data.keep
      }

      // friends link file handle
      if (data.links) {
        hexo.theme.config.links = data.links
      }

      // custom social contact icon handle
      if (data.icons) {
        hexo.theme.config.icons = data.icons
      }
    }
  }
})
