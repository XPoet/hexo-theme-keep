/**
 * Hexo 扩展：辅助函数（Helper）
 * 补充复杂的业务逻辑
 * https://hexo.io/zh-cn/api/helper.html
 * 用法：<%= helper_test('xxx') %>
 */
hexo.extend.helper.register('helper_test', function (character) {
    return character + '😁';
});