/* global hexo */

'use strict'

hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    const data = hexo.locals.get('data')

    if (data) {
      // theme config file data
      if (data._config) {
        hexo.theme.config = data._config
      } else if (data.keep) {
        hexo.theme.config = data.keep
      }

      // friends link data
      if (data.links) {
        hexo.theme.config.links = data.links
      }

      // custom social contact icon data
      if (data.icons) {
        hexo.theme.config.icons = data.icons
      }

      // photo album data
      if (data.photos) {
        hexo.theme.config.photos = data.photos
      }
    }
  }
})
