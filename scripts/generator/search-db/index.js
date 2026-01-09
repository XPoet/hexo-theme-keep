/* global hexo */

'use strict'

hexo.extend.generator.register('keep-search', function (locals) {
  if (!this.theme.config.local_search?.enable) {
    return null
  }

  const config = Object.assign(
    {
      root: this.config.root || '/',
      path: this.theme.config.search_db_path,
      field: 'post',
      content: true,
      format: 'striptags'
    },
    this.theme.config.local_search
  )

  const database = require('./database')(locals, config)
  return {
    path: config.path,
    data: JSON.stringify(database)
  }
})
