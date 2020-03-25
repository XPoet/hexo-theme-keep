/**
 * Hexo 扩展：辅助函数（Helper）
 * 补充复杂的业务逻辑
 * https://hexo.io/zh-cn/api/helper.html
 * eg 用法：<%= helper_test('xxx') %>
 */
hexo.extend.helper.register('isInHomePaging', function (pagePath, route) {
    if (pagePath.length > 5 && route === '/' ) {
        return pagePath.slice(0, 5) === 'page/';
    } else {
        return false;
    }
});