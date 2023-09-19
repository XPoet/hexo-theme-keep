/* global KEEP */

KEEP.initBack2Top = () => {
  KEEP.utils.back2Top = {
    back2BottomBtn: document.querySelector('.tool-scroll-to-bottom'),
    back2TopBtn: document.querySelector('.tool-scroll-to-top'),

    back2top() {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (c) {
          return setTimeout(c, 17) // (1000/60)
        }
      }
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const scroll = function () {
        scrollTop = Math.floor(scrollTop - scrollTop / 8)
        if (scrollTop > 0) {
          window.scrollTo(0, scrollTop)
          requestAnimationFrame(scroll)
        }
      }
      scroll()
    },

    back2Bottom() {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (c) {
          return setTimeout(c, 17) // (1000/60)
        }
      }
      let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const scroll = function () {
        scrollTop = Math.max(Math.floor(scrollTop + scrollTop / 8), 8)
        if (scrollTop < scrollHeight) {
          window.scrollTo(0, scrollTop)
          requestAnimationFrame(scroll)
        }
      }
      scroll()
    },

    initBack2Top() {
      this.back2TopBtn.addEventListener('click', () => {
        this.back2top()
      })
    },

    initBack2Bottom() {
      this.back2BottomBtn.addEventListener('click', () => {
        this.back2Bottom()
      })
    }
  }

  KEEP.utils.back2Top.initBack2Top()
  KEEP.utils.back2Top.initBack2Bottom()
}
