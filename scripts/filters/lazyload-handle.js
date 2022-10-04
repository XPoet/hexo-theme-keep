/* global hexo */

'use strict'

hexo.extend.filter.register(
  'after_post_render',
  function (data) {
    const theme = hexo.theme.config
    if (!theme.lazyload || !theme.lazyload.enable) return
    data.content = data.content.replace(
      // Match 'img' tags the src attribute.
      /<img([^>]*)src="([^"]*)"([^>\/]*)\/?\s*>/gim,
      function (match, attrBegin, src, attrEnd) {
        if (!src) return match
        return `<img ${attrBegin}
                     lazyload
                     data-src="${src}"
                     ${attrEnd}
                >`
      }
    )
  },
  1
)
