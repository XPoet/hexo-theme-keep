/* global hexo */

'use strict';

const url = require('url');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Export theme config to js
 */
hexo.extend.helper.register('export_config', function () {

  let { config, theme } = this;

  // ------ export language to js ------
  const languageDir = path.join(__dirname, '../../languages');
  let file = fs.readdirSync(languageDir).find(v => v === `${config.language}.yml`);
  file = languageDir + '/' + (file ? file : 'en.yml');
  let languageContent = fs.readFileSync(file, 'utf8');
  try {
    languageContent = yaml.safeLoad(languageContent);
  } catch (e) {
    console.log(e);
  }
  // ---------------------------------



  let hexo_config = {
    hostname: url.parse(config.url).hostname || config.url,
    root: config.root
  };
  if (config.search) {
    hexo_config.path = config.search.path;
  }

  let theme_config = {
    toc: theme.toc,
    style: theme.style,
    local_search: theme.local_search,
    side_tools: theme.side_tools,
    version: theme.version,
  }

  return `<script id="hexo-configurations">
    let KEEP = window.KEEP || {};
    KEEP.hexo_config = ${JSON.stringify(hexo_config)};
    KEEP.theme_config = ${JSON.stringify(theme_config)};
    KEEP.language = ${JSON.stringify(languageContent)};
  </script>`;
});
