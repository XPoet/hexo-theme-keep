/* global KEEP */

window.addEventListener('DOMContentLoaded', () => {
  const { version, local_search, code_block, code_copy, lazyload } = KEEP.theme_config

  KEEP.themeInfo = {
    theme: `Keep v${version}`,
    author: 'XPoet',
    repository: 'https://github.com/XPoet/hexo-theme-keep'
  }

  KEEP.localStorageKey = 'KEEP-THEME-STATUS'

  KEEP.styleStatus = {
    isExpandPageWidth: false,
    isDark: false,
    fontSizeLevel: 0,
    isShowToc: true
  }

  // print theme base info
  KEEP.printThemeInfo = () => {
    console.log(
      `\n %c ${KEEP.themeInfo.theme} %c ${KEEP.themeInfo.repository} \n`,
      `color: #fadfa3; background: #333; padding: 6px 0;`,
      `padding: 6px 0;`
    )
  }

  // set styleStatus to localStorage
  KEEP.setStyleStatus = () => {
    localStorage.setItem(KEEP.localStorageKey, JSON.stringify(KEEP.styleStatus))
  }

  // get styleStatus from localStorage
  KEEP.getStyleStatus = () => {
    let temp = localStorage.getItem(KEEP.localStorageKey)
    if (temp) {
      temp = JSON.parse(temp)
      for (let key in KEEP.styleStatus) {
        KEEP.styleStatus[key] = temp[key]
      }
      return temp
    } else {
      return null
    }
  }

  KEEP.refresh = () => {
    KEEP.initUtils()
    KEEP.initHeaderShrink()
    KEEP.initModeToggle()
    KEEP.initBack2Top()

    if (local_search?.enable === true) {
      KEEP.initLocalSearch()
    }

    if (
      code_block?.tools?.enable === true ||
      code_block?.enable === true ||
      code_copy?.enable === true
    ) {
      KEEP.initCodeBlockTools()
    }

    if (lazyload?.enable === true) {
      KEEP.initLazyLoad()
    }
  }

  KEEP.printThemeInfo()
  KEEP.refresh()
})
