window.addEventListener('DOMContentLoaded', () => {
  ILS.utils = {

    ...ILS.utils,

    back2TopButton_dom: document.querySelector('.scroll-to-top'),
    back2BottomButton_dom: document.querySelector('.scroll-to-bottom'),

    back2top() {
      const scrollTopTimer = setInterval(function () {
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
    },

    back2Bottom() {
      let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const scrollBottomTimer = setInterval(function () {
        if (!scrollTop) scrollTop = 10;
        scrollTop = Math.floor(scrollTop + scrollTop / 2);
        window.scrollTo(0, scrollTop);
        if (scrollTop >= scrollHeight) {
          clearInterval(scrollBottomTimer);
        }
      }, 50);
    },

    initBack2TopButton() {
      if (ILS.utils.back2TopButton_dom) {
        ILS.utils.back2TopButton_dom.addEventListener('click', () => {
          this.back2top();
        });
      }
    },

    initBack2BottomButton() {
      if (ILS.utils.back2BottomButton_dom) {
        ILS.utils.back2BottomButton_dom.addEventListener('click', () => {
          this.back2Bottom();
        });
      }
    },
  }

  ILS.utils.initBack2TopButton();
  ILS.utils.initBack2BottomButton();
});
