hexo.extend.helper.register('isInHomePaging', function (pagePath, route) {
    if (pagePath.length > 5 && route === '/' ) {
        return pagePath.slice(0, 5) === 'page/';
    } else {
        return false;
    }
});