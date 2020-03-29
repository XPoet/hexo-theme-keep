/* global hexo */

'use strict';

hexo.extend.helper.register('next_inject', function(point) {
  return hexo.theme.config.injects[point]
    .map(item => this.partial(item.layout, item.locals, item.options))
    .join('');
});

hexo.extend.helper.register('next_js', function(...urls) {
  const { js } = hexo.theme.config;
  return urls.map(url => this.js(`${js}/${url}`)).join('');
});

hexo.extend.helper.register('next_vendors', function(url) {
  if (url.startsWith('//')) return url;
  const internal = hexo.theme.config.vendors._internal;
  return this.url_for(`${internal}/${url}`);
});

hexo.extend.helper.register('post_edit', function(src) {
  const theme = hexo.theme.config;
  if (!theme.post_edit.enable) return '';
  return this.next_url(theme.post_edit.url + src, '<i class="fa fa-pencil"></i>', {
    class: 'post-edit-link',
    title: this.__('post.edit')
  });
});

hexo.extend.helper.register('post_nav', function(post) {
  const theme = hexo.theme.config;
  if (theme.post_navigation === false || (!post.prev && !post.next)) return '';
  const prev = theme.post_navigation === 'right' ? post.prev : post.next;
  const next = theme.post_navigation === 'right' ? post.next : post.prev;
  const left = prev ? `
    <a href="${this.url_for(prev.path)}" rel="prev" title="${prev.title}">
      <i class="fa fa-chevron-left"></i> ${prev.title}
    </a>` : '';
  const right = next ? `
    <a href="${this.url_for(next.path)}" rel="next" title="${next.title}">
      ${next.title} <i class="fa fa-chevron-right"></i>
    </a>` : '';
  return `
    <div class="post-nav">
      <div class="post-nav-item">${left}</div>
      <div class="post-nav-item">${right}</div>
    </div>`;
});
