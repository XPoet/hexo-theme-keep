const scrollToTop = document.querySelector('.scroll-to-top');
scrollToTop.addEventListener('click', () => {
    let scrollTopTimer = setInterval(function () {
        let top = document.body.scrollTop || document.documentElement.scrollTop;
        let speed = top / 4;
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

if (document.body.scrollHeight <= window.document.documentElement.clientHeight) {
    scrollToTop.style.display = 'none';
}


