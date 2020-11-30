/* global hexo */

'use strict'

const url = require('url');

hexo.extend.helper.register('isInHomePaging', function (pagePath, route) {
  if (pagePath.length > 5 && route === '/') {
    return pagePath.slice(0, 5) === 'page/';
  } else {
    return false;
  }
});

hexo.extend.helper.register('createNewArchivePosts', function (posts) {
  const postList = [], postYearList = [];
  posts.forEach(post => postYearList.push(post.date.year()));
  Array.from(new Set(postYearList)).forEach(year => {
    postList.push({
      year: year,
      postList: []
    })
  });
  postList.sort((a, b) => b.year - a.year)
  postList.forEach(item => {
    posts.forEach(post => item.year === post.date.year() && item.postList.push(post))
  });
  postList.forEach(item => item.postList.sort((a, b) => b.date.unix() - a.date.unix()));
  return postList;
});

hexo.extend.helper.register('getLevel', function (postCount) {
  return Math.ceil(postCount / 10);
});

hexo.extend.helper.register('getPostUrl', function (rootUrl, path) {
  if (rootUrl) {
    return url.parse(rootUrl).href + path;
  } else {
    return path;
  }
});

hexo.extend.helper.register('__js', function (path) {

  const cdnPathHandle = (path_2) => {

    const _js = hexo.extend.helper.get('js').bind(hexo);

    return this.theme.cdn.enable
        ? `<script src="//cdn.jsdelivr.net/npm/hexo-theme-keep@${this.theme.version}/source/${path_2}"></script>`
        : _js(path_2)
  }

  let t = ``;

  if (Array.isArray(path)) {
    for (const p of path) {
      t += cdnPathHandle(p);
    }
  } else {
    t = cdnPathHandle(path);
  }

  return t;
});

hexo.extend.helper.register('__css', function (path) {
  const _css = hexo.extend.helper.get('css').bind(hexo);
  if (this.theme.cdn.enable) {
    return `<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hexo-theme-keep@${this.theme.version}/source/${path}">`;
  } else {
    return _css(path);
  }
});
