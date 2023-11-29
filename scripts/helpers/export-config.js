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

  // ----------------------------- hexo config -----------------------------
  const hexoConfig = {
    hostname: url.parse(config.url).hostname || config.url,
    root: config?.root || '/',
    language: config.language
  }

  if (config.search) {
    hexoConfig.path = config.search.path
  }
  // -----------------------------------------------------------------------

  // ----------------------------- theme config ----------------------------
  const themeConfig = theme
  themeConfig.version = require('../../package.json').version
  // -----------------------------------------------------------------------

  return `<script class="keep-theme-configurations">
    const KEEP = window.KEEP || {}
    KEEP.hexo_config = ${JSON.stringify(hexoConfig)}
    KEEP.theme_config = ${JSON.stringify(themeConfig)}
    KEEP.language_ago = ${JSON.stringify(languageContent['ago'])}
    KEEP.language_code_block = ${JSON.stringify(languageContent['code_block'])}
    KEEP.language_copy_copyright = ${JSON.stringify(languageContent['copy_copyright'])}
  </script>`
})
