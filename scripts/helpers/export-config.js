/* global hexo */

'use strict'

const url = require('url')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * Export theme config to js
 */
hexo.extend.helper.register('exportThemeConfig', function () {
  const { config, theme } = this

  // -------------------------- export languages --------------------------
  const languageDir = path.join(__dirname, '../../languages')
  let file = fs.readdirSync(languageDir).find((v) => v === `${config.language}.yml`)
  file = languageDir + '/' + (file ? file : 'en.yml')
  let languageContent = fs.readFileSync(file, 'utf8')
  try {
    languageContent = yaml.load(languageContent)
  } catch (err) {
    console.log(err)
  }
  // -----------------------------------------------------------------------

  let hexo_config = {
    hostname: url.parse(config.url).hostname || config.url,
    root: config.root,
    language: config.language
  }

  if (config.search) {
    hexo_config.path = config.search.path
  }

  let theme_config = {
    toc: theme.toc || {},
    style: theme.style || {},
    local_search: theme.local_search || {},
    code_block: theme.code_block || {},
    pjax: theme.pjax || {},
    lazyload: theme.lazyload || {},
    comment: theme.comment || {},
    post: theme.post || {},
    website_count: theme.website_count || {},
    version: require('../../package.json').version
  }

  return `<script class="keep-theme-configurations">
    const KEEP = window.KEEP || {}
    KEEP.hexo_config = ${JSON.stringify(hexo_config)}
    KEEP.theme_config = ${JSON.stringify(theme_config)}
    KEEP.language_ago = ${JSON.stringify(languageContent['ago'])}
    KEEP.language_code_block = ${JSON.stringify(languageContent['code_block'])}
    KEEP.language_copy_copyright = ${JSON.stringify(languageContent['copy_copyright'])}
  </script>`
})
