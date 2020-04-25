(function () {
    const scrollToTopDom = document.querySelector('.scroll-to-top');

    scrollToTopDom.addEventListener('click', () => {
        let scrollTopTimer = setInterval(function () {
            let top = document.body.scrollTop || document.documentElement.scrollTop;
            let speed = top / 2;
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

    window.addEventListener('scroll', function (_e) {
        // back to top
        // show scroll percent
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight || document.documentElement.clientHeight;
        const percent = Math.round(scrollTop / (scrollHeight - clientHeight) * 100).toFixed(0);
        if (percent === '0') {
            scrollToTopDom.style.display = 'none';
        } else {
            scrollToTopDom.style.display = 'block';
            scrollPercentDom.innerHTML = parseInt(percent) < 10 ? `0${percent}` : percent;
        }
    });

})();