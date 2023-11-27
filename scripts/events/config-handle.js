/* global hexo */

'use strict'

const themeRootHandle = (root) => {
  if (root === '/') {
    return ''
  }

  if (root.length > 1 && root.charAt(0) !== '/') {
    root = '/' + root
  }

  const lastIdx = root.length - 1
  if (root.charAt(lastIdx) === '/') {
    root = root.slice(0, lastIdx)
  }

  return root
}

hexo.on('generateBefore', function () {
  hexo.theme.config.root = themeRootHandle(this.config.root)

  if (hexo.locals.get) {
    const data = hexo.locals.get('data')

    if (data) {
      // theme config file data
      if (data._config) {
        hexo.theme.config = { ...hexo.theme.config, ...data._config }
      } else if (data.keep) {
        hexo.theme.config = { ...hexo.theme.config, ...data.keep }
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
