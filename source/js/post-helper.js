/* global KEEP */

function initToggleShowToc() {
  KEEP.utils.postHelper = {
    postPageContainerDom: document.querySelector('.post-page-container'),
    toggleShowTocBtnDom: document.querySelector('.toggle-show-toc'),
    toggleShowTocIcon: document.querySelector('.toggle-show-toc i'),
    mainContentDom: document.querySelector('.main-content'),
    postToolsDom: document.querySelector('.page-container .post-tools'),
    isShowToc: false,

    initToggleToc() {
      this.toggleShowTocBtnDom &&
        this.toggleShowTocBtnDom.addEventListener('click', () => {
          this.isShowToc = !this.isShowToc
          KEEP.styleStatus.isShowToc = this.isShowToc
          KEEP.setStyleStatus()
          this.handleToggleToc(this.isShowToc)
        })
    },

    handleToggleToc(isOpen) {
      if (isOpen) {
        this.postPageContainerDom.classList.add('show-toc')
        document.body.classList.add('has-toc')
      } else {
        this.postPageContainerDom.classList.remove('show-toc')
        document.body.classList.remove('has-toc')
      }
    },

    hasToc(isOpen) {
      this.toggleShowTocBtnDom.style.display = 'flex'
      this.isShowToc = isOpen
      this.handleToggleToc(isOpen)
    },

    setPostToolsLeft() {
      const winWidth = window.innerWidth
      const mcWidth = this.mainContentDom.getBoundingClientRect().width.toFixed(0)
      let offsetX = 5

      if (winWidth <= 800) {
        offsetX = 3
      }

      this.postToolsDom.style.opacity = `1`
      this.postToolsDom.style.left = `calc((100vw - ${mcWidth}px) / 2 - ${offsetX}rem)`
    },

    initSetPostToolsLeft() {
      setTimeout(() => {
        this.setPostToolsLeft()
      }, 150)

      window.addEventListener('resize', () => {
        this.setPostToolsLeft()
      })
    }
  }
  KEEP.utils.postHelper.initToggleToc()
  KEEP.utils.postHelper.initSetPostToolsLeft()
}

if (KEEP.theme_config.pjax.enable === true && KEEP.utils) {
  initToggleShowToc()
} else {
  window.addEventListener('DOMContentLoaded', initToggleShowToc)
}
