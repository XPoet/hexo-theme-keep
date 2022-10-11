/* global KEEP */

function initToggleShowToc() {
  KEEP.utils.toggleShowTocHandler = {
    postPageContainerDom: document.querySelector('.post-page-container'),
    toggleShowTocBtnDom: document.querySelector('.toggle-show-toc'),
    toggleShowTocIcon: document.querySelector('.toggle-show-toc i'),
    isShowToc: false,

    initToggle() {
      this.toggleShowTocBtnDom &&
      this.toggleShowTocBtnDom.addEventListener('click', () => {
        this.isShowToc = !this.isShowToc
        KEEP.styleStatus.isShowToc = this.isShowToc
        KEEP.setStyleStatus()
        this.handleToggle(this.isShowToc)
      })
    },

    handleToggle(isOpen) {
      if (isOpen) {
        this.postPageContainerDom.classList.add('show-toc')
      } else {
        this.postPageContainerDom.classList.remove('show-toc')
      }
    },

    hasToc(isOpen) {
      this.toggleShowTocBtnDom.style.display = 'flex'
      this.isShowToc = isOpen
      this.handleToggle(isOpen)
    }
  }
  KEEP.utils.toggleShowTocHandler.initToggle()
}

if (KEEP.theme_config.pjax.enable === true && KEEP.utils) {
  initToggleShowToc()
} else {
  window.addEventListener('DOMContentLoaded', initToggleShowToc)
}
