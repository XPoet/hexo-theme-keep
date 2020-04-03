const scrollToTop = document.querySelector('.scroll-to-top');
const scrollToTopValue = document.querySelector('.scroll-to-top-value');
scrollToTop.addEventListener('click', () => {
    let scrollTopTimer = setInterval(function () {
        let top = document.body.scrollTop || document.documentElement.scrollTop;
        let speed = top / 5;
        if (document.body.scrollTop !== 0) {
            document.body.scrollTop -= speed;
        } else {
            document.documentElement.scrollTop -= speed;
        }
        if (top === 0) {
            clearInterval(scrollTopTimer);
        }
    }, 30);
});


const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
const clientHeight = window.innerHeight || document.documentElement.clientHeight;
window.addEventListener('scroll', function (_e) {
    var validH = scrollHeight - clientHeight;
    var scrollH = document.body.scrollTop || document.documentElement.scrollTop;
    scrollToTopValue.innerHTML = Math.round(scrollH / validH * 100).toFixed(0) + '%';

});


