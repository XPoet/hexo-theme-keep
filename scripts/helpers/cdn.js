/* global hexo */

'use strict'

const getSourceCdnUrl = (type, themeConfig, path) => {
  const version = require('../../package.json').version
  let { provider, custom } = themeConfig?.cdn || {}
  const isCustomCdn = custom?.enable || false
  const customCdnUrl = custom?.url || ''
  let cdnUrl = ''

  const providerEnum = {
    jsdelivr: 'jsdelivr',
    unpkg: 'unpkg',
    cdnjs: 'cdnjs',
    custom: 'custom'
  }

  if (!provider) {
    provider = providerEnum.cdnjs
  }

  if (isCustomCdn) {
    provider = providerEnum.custom
  }

  switch (provider?.toLocaleLowerCase()) {
    case providerEnum.jsdelivr:
      cdnUrl = '//cdn.jsdelivr.net/npm/hexo-theme-keep'
      if (type === 'js') {
        return `<script src="${cdnUrl}@${version}/source/${path}"></script>`
      } else {
        return `<link rel="stylesheet" href="${cdnUrl}@${version}/source/${path}">`
      }

    case providerEnum.unpkg:
      cdnUrl = '//unpkg.com/hexo-theme-keep'
      if (type === 'js') {
        return `<script src="${cdnUrl}@${version}/source/${path}"></script>`
      } else {
        return `<link rel="stylesheet" href="${cdnUrl}@${version}/source/${path}">`
      }

    case providerEnum.cdnjs:
      cdnUrl = 'https://cdnjs.cloudflare.com/ajax/libs/hexo-theme-keep'
      if (type === 'js') {
        path = path.includes('.min.js') ? path : path.replace('.js', '.min.js')
        return `<script src="${cdnUrl}/${version}/${path}"></script>`
      } else {
        path = path.includes('.min.css') ? path : path.replace('.css', '.min.css')
        return `<link rel="stylesheet" href="${cdnUrl}/${version}/${path}">`
      }

    case providerEnum.custom:
      cdnUrl = customCdnUrl
      if (type === 'js') {
        return `<script src="${cdnUrl}@${version}/source/${path}"></script>`
      } else {
        return `<link rel="stylesheet" href="${cdnUrl}@${version}/source/${path}">`
      }
  }
}

hexo.extend.helper.register('__js', function (path) {
  const { enable } = this.theme?.cdn || {}
  const developMode = this.config?.theme_develop || false
  const _js = hexo.extend.helper.get('js').bind(hexo)
  const cdnPathHandle = (pa) => {
    return enable && !developMode ? getSourceCdnUrl('js', this.theme, pa) : _js(pa)
  }

  let t = ``

  if (Array.isArray(path)) {
    for (const p of path) {
      t += cdnPathHandle(p)
    }
  } else {
    t = cdnPathHandle(path)
  }

  return t
})

hexo.extend.helper.register('__css', function (path) {
  const { enable } = this.theme?.cdn || {}
  const developMode = this.config?.theme_develop || false
  const _css = hexo.extend.helper.get('css').bind(hexo)
  return enable && !developMode ? getSourceCdnUrl('css', this.theme, path) : _css(path)
})
