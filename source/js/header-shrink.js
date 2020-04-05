const pageTemplateDom = document.querySelector('.page-template');
const headerDom = document.querySelector('.header-wrapper');
const menuBarDom = document.querySelector('.menu-bar');
const windowMaskDom = document.querySelector('.window-mask');
const scrollPercentDom = document.querySelector('.scroll-percent');
const scrollToTopDom = document.querySelector('.scroll-to-top');

let isHeaderShrink = false;
const headerHeight = headerDom.getBoundingClientRect().height;

window.addEventListener('scroll', function (_e) {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (!isHeaderShrink && scrollTop > headerHeight) {
        isHeaderShrink = true;
        headerDom.classList.add('header-wrapper-shrink');
        pageTemplateDom.classList.add('page-top-shrink');
    } else if (isHeaderShrink && scrollTop <= headerHeight) {
        isHeaderShrink = false;
        headerDom.classList.remove('header-wrapper-shrink');
        pageTemplateDom.classList.remove('page-top-shrink');
    }

    // show scroll percent
    const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    const percent = Math.round(scrollTop / (scrollHeight - clientHeight) * 100).toFixed(0);


    if (percent === '0') {
        scrollToTopDom.style.display = 'none';
    } else {
        scrollToTopDom.style.display = 'block';
        scrollPercentDom.innerHTML = percent + '%';
    }


});


menuBarDom.addEventListener('click', function (_e) {
    headerDom.classList.toggle('header-drawer-show');
});

windowMaskDom.addEventListener('click', function (_e) {
    headerDom.classList.toggle('header-drawer-show');
});


