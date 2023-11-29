/* global hexo */

'use strict'

const isAddRootPath = (root, src) => {
  if (/^(https?:\/\/)/.test(src)) {
    return src
  } else {
    return root + src
  }
}

const regExpImg = /<img([^>]*)src="([^"]*)"([^>\/]*)\/?\s*>/gim

hexo.extend.filter.register(
  'before_post_render',
  function (data) {
    const theme = hexo.theme.config
    data.content = data.content.replace(regExpImg, function (match, attrBegin, src, attrEnd) {
      if (!src) return match
      return `<img ${attrBegin} src="${isAddRootPath(theme.root, src)}" ${attrEnd}>`
    })
  },
  1
)

hexo.extend.filter.register(
  'after_post_render',
  function (data) {
    const theme = hexo.theme.config

    data.content = data.content.replace(regExpImg, function (match, attrBegin, src, attrEnd) {
      if (!src) return match
      // image lazy load
      if (theme?.lazyload?.enable === true) {
        let hasAlt = false
        if (attrBegin.includes('alt="')) {
          hasAlt = true
        }
        return `<img ${attrBegin}
                       lazyload
                       ${hasAlt ? '' : 'alt="image"'}
                       data-src="${src}"
                       ${attrEnd}
                 >`
      } else {
        return `<img ${attrBegin} src="${src}" ${attrEnd}>`
      }
    })
  },
  1
)
