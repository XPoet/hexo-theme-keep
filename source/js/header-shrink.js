const pageTemplateDom = document.querySelector('.page-template');
const articleTocContainerDom = document.querySelector('.article-toc-container');
const headerDom = document.querySelector('.header-wrapper');
const menuBarDom = document.querySelector('.menu-bar');
const windowMaskDom = document.querySelector('.window-mask');
const scrollPercentDom = document.querySelector('.scroll-percent');

let isHeaderShrink = false;
const headerHeight = headerDom.getBoundingClientRect().height;

window.addEventListener('scroll', function (_e) {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (!isHeaderShrink && scrollTop > headerHeight) {
        isHeaderShrink = true;
        headerDom.classList.add('header-wrapper-shrink');
        pageTemplateDom.classList.add('page-top-shrink');

        if (articleTocContainerDom) {
            articleTocContainerDom.classList.add('article-toc-container-shrink');
        }
    } else if (isHeaderShrink && scrollTop <= headerHeight) {
        isHeaderShrink = false;
        headerDom.classList.remove('header-wrapper-shrink');
        pageTemplateDom.classList.remove('page-top-shrink');

        if (articleTocContainerDom) {
            articleTocContainerDom.classList.remove('article-toc-container-shrink');
        }
    }
});


menuBarDom.addEventListener('click', function (_e) {
    headerDom.classList.toggle('header-drawer-show');
});

windowMaskDom.addEventListener('click', function (_e) {
    headerDom.classList.toggle('header-drawer-show');
});


