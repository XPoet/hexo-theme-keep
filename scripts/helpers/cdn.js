/* global hexo */

'use strict'

// Build the resource url according to the given cdn style.
// - cdnjs: `${baseUrl}/${version}/${minPath}` (no `@version`, no `/source/`, minified files only)
// - jsdelivr / unpkg: `${baseUrl}@${version}/source/${path}`
// - raw: `${baseUrl}/${path}` (append the path directly to the base url, no version handling)
const buildResourceUrl = (style, baseUrl, version, type, path) => {
  switch (style) {
    case 'cdnjs':
      if (type === 'js') {
        path = path.includes('.min.js') ? path : path.replace('.js', '.min.js')
      } else {
        path = path.includes('.min.css') ? path : path.replace('.css', '.min.css')
      }
      return `${baseUrl}/${version}/${path}`

    case 'raw':
      return `${baseUrl}/${path}`

    case 'jsdelivr':
    case 'unpkg':
    default:
      return `${baseUrl}@${version}/source/${path}`
  }
}

const getSourceCdnUrl = (type, themeConfig, path) => {
  const version = require('../../package.json').version
  let { provider, custom } = themeConfig?.cdn || {}
  const isCustomCdn = custom?.enable || false

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

  let style = ''
  let baseUrl = ''

  switch (provider?.toLocaleLowerCase()) {
    case providerEnum.jsdelivr:
      style = 'jsdelivr'
      baseUrl = '//cdn.jsdelivr.net/npm/hexo-theme-keep'
      break

    case providerEnum.unpkg:
      style = 'unpkg'
      baseUrl = '//unpkg.com/hexo-theme-keep'
      break

    case providerEnum.cdnjs:
      style = 'cdnjs'
      baseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/hexo-theme-keep'
      break

    case providerEnum.custom:
      // `custom.type` controls the url path format so that mirrors with different
      // path structures (e.g. cdnjs / BootCDN) can be used correctly.
      // Defaults to `jsdelivr` style to keep backward compatibility.
      style = (custom?.type || 'jsdelivr').toLocaleLowerCase()
      baseUrl = custom?.url || ''
      break

    default:
      return
  }

  const resourceUrl = buildResourceUrl(style, baseUrl, version, type, path)

  if (type === 'js') {
    return `<script src="${resourceUrl}"></script>`
  } else {
    return `<link rel="stylesheet" href="${resourceUrl}">`
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
