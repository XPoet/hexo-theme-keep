/* global hexo */

'use strict';

const url = require('url');

/**
 * Export theme config to js
 */
hexo.extend.helper.register('export_config', function () {
  let {config, theme} = this;
  let exportConfig = {
    hostname: url.parse(config.url).hostname || config.url,
    root: config.root,
    localsearch: theme.local_search,
    codeblock: theme.codeblock,
    toc: theme.toc,
    back2top: theme.back2top,
    side_tools: theme.side_tools,
    style: theme.style
  };
  if (config.search) {
    exportConfig.path = config.search.path;
  }
  return `<script id="hexo-configurations">
    let KEEP = window.KEEP || {};
    let CONFIG = ${JSON.stringify(exportConfig)};
  </script>`;
});
