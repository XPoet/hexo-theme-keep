/* global hexo */

'use strict'

hexo.extend.helper.register('getPostCoverUrl', function (post, cover) {
  if (
    hexo.config.post_asset_folder &&
    post?._id &&
    typeof cover === 'string' &&
    !/^(?:[a-z][a-z\d+.-]*:|\/|#|\?)/i.test(cover)
  ) {
    const [, path, suffix = ''] = cover.match(/^([^?#]*)([?#].*)?$/)
    const asset = hexo.model('PostAsset').findOne({
      post: post._id,
      slug: path.replace(/^(?:\.\/)+/, '')
    })

    if (asset) {
      return this.url_for(asset.path.replace(/^\/+/, '') + suffix)
    }
  }

  return this.url_for(cover)
})
