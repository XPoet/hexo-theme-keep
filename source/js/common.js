let isHeaderShrink = false;
const header = document.querySelector('.header-wrapper');
const pageTemplateContainer = document.querySelector('.page-template');
const menuBar = document.querySelector('.menu-bar');
const windowMask = document.querySelector('.window-mask');
const headerHeight = header.getBoundingClientRect().height;
const scrollToTopValue = document.querySelector('.scroll-to-top-value');

window.addEventListener('scroll', function (_e) {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (!isHeaderShrink && scrollTop > headerHeight) {
        isHeaderShrink = true;
        header.classList.add('header-wrapper-shrink');
        pageTemplateContainer.classList.add('page-top-shrink');
    } else if (isHeaderShrink && scrollTop <= headerHeight) {
        isHeaderShrink = false;
        header.classList.remove('header-wrapper-shrink');
        pageTemplateContainer.classList.remove('page-top-shrink');
    }

    // show scroll percent
    const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    const percent = Math.round(scrollTop / (scrollHeight - clientHeight) * 100).toFixed(0);
    scrollToTopValue.innerHTML = percent === '0' ? '' : percent + '%';

});


menuBar.addEventListener('click', function (_e) {
    header.classList.toggle('header-drawer-show');
});

windowMask.addEventListener('click', function (_e) {
    header.classList.toggle('header-drawer-show');
});


