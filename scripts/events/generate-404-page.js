/* global hexo */

'use strict'

hexo.extend.generator.register('generate-404-page', function () {
  return {
    path: '404.html',
    layout: ['page'],
    data: {
      type: '404',
      title: '404'
    }
  }
})
