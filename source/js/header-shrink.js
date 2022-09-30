/* global KEEP */

KEEP.initHeaderShrink = () => {
  KEEP.utils.headerShrink = {
    headerDom: document.querySelector('.header-wrapper'),
    isHeaderShrink: false,

    init() {
      this.headerHeight = this.headerDom.getBoundingClientRect().height
    },

    headerShrink() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const headerWrapperDom = document.querySelector('.header-wrapper')
      const { enable, header_transparent } = KEEP.theme_config.style.first_screen
      if (!this.isHeaderShrink && scrollTop > this.headerHeight) {
        this.isHeaderShrink = true
        document.body.classList.add('header-shrink')
        if (enable === true && header_transparent === true) {
          headerWrapperDom.classList.add('transparent-2')
        }
      } else if (this.isHeaderShrink && scrollTop <= this.headerHeight) {
        this.isHeaderShrink = false
        document.body.classList.remove('header-shrink')
        if (enable === true && header_transparent === true) {
          headerWrapperDom.classList.remove('transparent-2')
        }
      }
    },

    toggleHeaderDrawerShow() {
      const domList = [document.querySelector('.window-mask'), document.querySelector('.menu-bar')]

      if (KEEP.theme_config.pjax.enable === true) {
        domList.push(
          ...document.querySelectorAll('.header-drawer .drawer-menu-list .drawer-menu-item')
        )
      }

      domList.forEach((v) => {
        v.addEventListener('click', () => {
          document.body.classList.toggle('header-drawer-show')
        })
      })
    }
  }
  KEEP.utils.headerShrink.init()
  KEEP.utils.headerShrink.headerShrink()
  KEEP.utils.headerShrink.toggleHeaderDrawerShow()
}
