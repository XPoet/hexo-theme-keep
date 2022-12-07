/* global hexo */

'use strict'

hexo.extend.filter.register(
  'after_post_render',
  function (data) {
    data.content = data.content.replace(/::::::/gim, function (match, attrBegin, src, attrEnd) {
      return `<div class="tag "></div>`
    })
  },
  1
)
