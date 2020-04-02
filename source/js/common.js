let isHeaderShrink = false;
const header = document.querySelector('.header-wrapper');
const pageTemplateContainer = document.querySelector('.page-template');
const menuBar = document.querySelector('.menu-bar');
const windowMask = document.querySelector('.window-mask');
const headerHeight = header.getBoundingClientRect().height;

window.addEventListener('scroll', function (e) {

    const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    if (!isHeaderShrink && scrollTop > headerHeight) {
        isHeaderShrink = true;
        header.classList.add('header-wrapper-shrink');
        pageTemplateContainer.classList.add('page-top-shrink');
    } else if (isHeaderShrink && scrollTop <= headerHeight) {
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


const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', function (e) {
});
