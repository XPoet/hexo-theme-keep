window.addEventListener('DOMContentLoaded', () => {
  ILS.utils = {

    ...ILS.utils,

    back2TopButton_dom: document.querySelector('.scroll-to-top'),

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

    initBack2TopButton() {
      if (ILS.utils.back2TopButton_dom) {
        ILS.utils.back2TopButton_dom.addEventListener('click', () => {
          this.back2top();
        });
      }
    },
  }

  ILS.utils.initBack2TopButton();
});


