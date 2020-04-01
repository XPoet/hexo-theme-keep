let isHeaderShrink = false;
let header = document.querySelector('.header-wrapper');
let pageTemplateContainer = document.querySelector('.page-template');
let menuBar = document.querySelector('.menu-bar');
let windowMask = document.querySelector('.window-mask');



window.addEventListener('scroll', function (e) {
    var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    if (!isHeaderShrink && scrollTop > 10) {
        isHeaderShrink = true;
        header.classList.add('header-wrapper-shrink');
        pageTemplateContainer.classList.add('page-top-shrink');
    } else if (isHeaderShrink && scrollTop <= 10) {
        isHeaderShrink = false;
        header.classList.remove('header-wrapper-shrink');
        pageTemplateContainer.classList.remove('page-top-shrink');
    }
});

menuBar.addEventListener('click', function (e) {
    header.classList.toggle('header-drawer-show');
});

windowMask.addEventListener('click', function (e) {
    header.classList.toggle('header-drawer-show');
});

