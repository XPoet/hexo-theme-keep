/* global hexo */

'use strict'

hexo.extend.helper.register('isInHomePaging', function (pagePath, route) {
  if (pagePath.length > 5 && route === '/') {
    return pagePath.slice(0, 5) === 'page/'
  } else {
    return false
  }
})

hexo.extend.helper.register('createNewArchivePosts', function (posts) {
  const postList = [],
    postYearList = []
  posts.forEach((post) => postYearList.push(post.date.year()))
  Array.from(new Set(postYearList)).forEach((year) => {
    postList.push({
      year: year,
      postList: []
    })
  })
  postList.sort((a, b) => b.year - a.year)
  postList.forEach((item) => {
    posts.forEach((post) => item.year === post.date.year() && item.postList.push(post))
  })
  postList.forEach((item) => item.postList.sort((a, b) => b.date.unix() - a.date.unix()))
  return postList
})

hexo.extend.helper.register('getAuthorLabel', function (postCount, isAuto, labelList) {
  let level = Math.floor(Math.log2(postCount))
  level = level < 2 ? 1 : level - 1

  if (isAuto === false && Array.isArray(labelList) && labelList.length > 0) {
    return level > labelList.length ? labelList[labelList.length - 1] : labelList[level - 1]
  } else {
    return `Lv${level}`
  }
})

const getSourceCdnUrl = (tyle, themeConfig, path) => {
  const version = require('../../package.json').version
  const cdn = themeConfig?.cdn || {}
  const { provider = 'jsdelivr' } = cdn

  let urlPrefix = ''
  switch (provider.toLocaleLowerCase()) {
    case 'jsdelivr':
      urlPrefix = '//cdn.jsdelivr.net/npm/hexo-theme-keep'
      if (tyle === 'js') {
        return `<script src="${urlPrefix}@${version}/source/${path}"></script>`
      } else {
        return `<link rel="stylesheet" href="${urlPrefix}@${version}/source/${path}">`
      }
    case 'unpkg':
      urlPrefix = '//unpkg.com/hexo-theme-keep'
      if (tyle === 'js') {
        return `<script src="${urlPrefix}@${version}/source/${path}"></script>`
      } else {
        return `<link rel="stylesheet" href="${urlPrefix}@${version}/source/${path}">`
      }
  }
}

hexo.extend.helper.register('__js', function (path) {
  const { enable } = this.theme.cdn
  const _js = hexo.extend.helper.get('js').bind(hexo)
  const cdnPathHandle = (pa) => {
    return enable ? getSourceCdnUrl('js', this.theme, pa) : _js(pa)
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
  const { enable } = this.theme.cdn
  const _css = hexo.extend.helper.get('css').bind(hexo)
  return enable ? getSourceCdnUrl('css', this.theme, path) : _css(path)
})
