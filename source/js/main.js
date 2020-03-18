console.log('this is main.js');
(() => {
    // 选择分页器元素里面的 a 标签，但不包含 .page-number，给指定元素追加类 btn 和 设置属性 role=navigation
    document.querySelectorAll('.article-post .paginator a:not(.page-number)').forEach(e => {
        e.classList.add('btn');
        e.setAttribute('role', 'navigation');
    });
})();