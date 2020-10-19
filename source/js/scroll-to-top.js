(function () {
  const scrollToTopDom = document.querySelector('.scroll-to-top');
  const headerProgressDom = document.querySelector('.header-progress');
  const headerWrapper = document.querySelector('.header-wrapper');

  const backToTop = () => {
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
  };

  scrollToTopDom.addEventListener('click', () => {
    backToTop();
  });

  let prevScroll = 0;
  window.addEventListener('scroll', function (_e) {
    // back to top & show scroll percent
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    const percent = Math.round(scrollTop / (scrollHeight - clientHeight) * 100).toFixed(0);
    const ProgressPercent = (scrollTop / (scrollHeight - clientHeight) * 100).toFixed(3);

    if (percent === '0') {
      scrollToTopDom.style.display = 'none';
      headerProgressDom.style.display = 'none';
    } else {
      scrollToTopDom.style.display = 'flex';
      headerProgressDom.style.display = 'block';
      headerProgressDom.style.width = `${ProgressPercent}%`;
    }

    // hide header handle
    const opacity = headerWrapper.style.opacity
    if (scrollTop > prevScroll && scrollTop > 360) {
      if (opacity > 0) headerWrapper.style.opacity = '0';
    } else {
      if (opacity < 1) headerWrapper.style.opacity = '1';
    }
    prevScroll = scrollTop
  });

})();
