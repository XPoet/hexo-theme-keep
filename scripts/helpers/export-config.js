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
        themeInfo: theme.theme_info,
        codeblock: theme.codeblock
    };
    if (config.search) {
        exportConfig.path = config.search.path;
    }
    return `<script id="hexo-configurations">
    let CONFIG = ${JSON.stringify(exportConfig)};
  </script>`;
});
