/* global KEEP */

KEEP.initModeToggle = () => {
  KEEP.utils.modeToggle = {
    themeModeToggleBtn: document.querySelector('.tool-dark-light-toggle'),
    iconDom: document.querySelector('.tool-dark-light-toggle i'),

    enableLightMode() {
      document.body.classList.remove('dark-mode')
      document.body.classList.add('light-mode')
      this.iconDom.className = 'fas fa-moon'
      KEEP.styleStatus.isDark = false
      KEEP.setStyleStatus()
    },

    enableDarkMode() {
      document.body.classList.add('dark-mode')
      document.body.classList.remove('light-mode')
      this.iconDom.className = 'fas fa-sun'
      KEEP.styleStatus.isDark = true
      KEEP.setStyleStatus()
    },

    isDarkPrefersColorScheme() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    },

    initModeStatus() {
      const styleStatus = KEEP.getStyleStatus()

      if (styleStatus) {
        styleStatus.isDark ? this.enableDarkMode() : this.enableLightMode()
      } else {
        this.isDarkPrefersColorScheme().matches ? this.enableDarkMode() : this.enableLightMode()
      }
    },

    initModeToggleButton() {
      this.themeModeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode')
        isDark ? this.enableLightMode() : this.enableDarkMode()
      })
    },

    initModeAutoTrigger() {
      const isDarkMode = this.isDarkPrefersColorScheme()
      isDarkMode.addEventListener('change', (e) => {
        e.matches ? this.enableDarkMode() : this.enableLightMode()
      })
    }
  }

  KEEP.utils.modeToggle.initModeStatus()
  KEEP.utils.modeToggle.initModeToggleButton()
  KEEP.utils.modeToggle.initModeAutoTrigger()
}
