hexo.on('generateBefore', function () {
    const rootConfig = hexo.config;
    if (hexo.locals.get) {
        const data = hexo.locals.get('data');
        if (data && data._config) {
            hexo.theme.config = data._config;
        }
    }
    hexo.theme.config.rootConfig = rootConfig;
});