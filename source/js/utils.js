/* global KEEP */

KEEP.initUtils = () => {
  KEEP.utils = {
    rootHtmlDom: document.querySelector('html'),
    pageTopDom: document.querySelector('.page-main-content-top'),
    scrollProgressBarDom: document.querySelector('.scroll-progress-bar'),
    pjaxProgressBarDom: document.querySelector('.pjax-progress-bar'),
    pjaxProgressIcon: document.querySelector('.pjax-progress-icon'),
    back2TopBtn: document.querySelector('.tool-scroll-to-top'),
    headerWrapperDom: document.querySelector('.header-wrapper'),

    innerHeight: window.innerHeight,
    pjaxProgressBarTimer: null,
    prevScrollValue: 0,
    fontSizeLevel: 0,
    isHasScrollProgressBar: false,
    isHasScrollPercent: false,
    isHeaderTransparent: false,
    hasToc: false,

    initData() {
      const { scroll, first_screen } = KEEP.theme_config?.style || {}
      this.isHasScrollProgressBar = scroll?.progress_bar === true
      this.isHasScrollPercent = scroll?.percent === true
      const { enable, header_transparent } = first_screen || {}
      this.isHeaderTransparent =
        enable === true &&
        header_transparent === true &&
        !window.location.pathname.includes('/page/')
      if (!this.isHeaderTransparent) {
        this.headerWrapperDom.classList.remove('transparent-1', 'transparent-2')
      }
    },

    // Scroll Style Handle
    styleHandleWhenScroll() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
      const clientHeight = window.innerHeight || document.documentElement.clientHeight

      const percent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100) || 0

      if (this.isHasScrollProgressBar && this.scrollProgressBarDom) {
        const progressPercent = ((scrollTop / (scrollHeight - clientHeight)) * 100).toFixed(3)
        this.scrollProgressBarDom.style.visibility = percent === 0 ? 'hidden' : 'visible'
        this.scrollProgressBarDom.style.width = `${progressPercent}%`
      }

      if (this.isHasScrollPercent && this.back2TopBtn) {
        const percentDom = this.back2TopBtn.querySelector('.percent')
        if (percent === 0 || percent === undefined) {
          this.back2TopBtn.classList.remove('show')
        } else {
          this.back2TopBtn.classList.add('show')
          percentDom.innerHTML = percent.toFixed(0)
        }
      }

      // hide header handle
      if (scrollTop > this.prevScrollValue && scrollTop > this.innerHeight) {
        this.pageTopDom.classList.add('hide')
        if (this.isHeaderTransparent) {
          this.headerWrapperDom.classList.remove('transparent-1', 'transparent-2')
        }
      } else {
        this.pageTopDom.classList.remove('hide')
        if (this.isHeaderTransparent) {
          if (scrollTop <= this.headerWrapperDom.getBoundingClientRect().height) {
            this.headerWrapperDom.classList.remove('transparent-2')
            this.headerWrapperDom.classList.add('transparent-1')
          } else if (scrollTop < this.innerHeight) {
            this.headerWrapperDom.classList.add('transparent-2')
          }
        }
      }
      this.prevScrollValue = scrollTop
    },

    // register window scroll event
    registerWindowScroll() {
      window.addEventListener('scroll', () => {
        // style handle when scroll
        this.styleHandleWhenScroll()

        // TOC scroll handle
        if (KEEP.theme_config.toc.enable === true && KEEP.utils.hasOwnProperty('activeNav')) {
          KEEP.utils.activeNav()
        }

        // header shrink
        KEEP.utils.headerShrink.headerShrink()
      })
    },

    // toggle show tools list
    toggleShowToolsList() {
      const sideToolsListDom = document.querySelector('.side-tools-list')
      const toggleShowToolsDom = document.querySelector('.tool-toggle-show')
      toggleShowToolsDom.addEventListener('click', (e) => {
        sideToolsListDom.classList.toggle('show')
        e.stopPropagation()
      })
      sideToolsListDom.querySelectorAll('.tools-item').forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation()
        })
      })
      document.addEventListener('click', () => {
        sideToolsListDom.classList.contains('show') && sideToolsListDom.classList.remove('show')
      })
    },

    // global font adjust
    globalFontAdjust() {
      const fontSize = document.defaultView.getComputedStyle(document.body).fontSize
      const fs = parseFloat(fontSize)

      const initFontSize = () => {
        const styleStatus = KEEP.getStyleStatus()
        if (styleStatus) {
          this.fontSizeLevel = styleStatus.fontSizeLevel
          setFontSize(this.fontSizeLevel)
        }
      }

      const setFontSize = (fontSizeLevel) => {
        this.rootHtmlDom.style.fontSize = `${fs * (1 + fontSizeLevel * 0.05)}px`
        KEEP.styleStatus.fontSizeLevel = fontSizeLevel
        KEEP.setStyleStatus()
      }

      initFontSize()

      document.querySelector('.tool-font-adjust-plus').addEventListener('click', () => {
        if (this.fontSizeLevel === 5) return
        this.fontSizeLevel++
        setFontSize(this.fontSizeLevel)
      })

      document.querySelector('.tool-font-adjust-minus').addEventListener('click', () => {
        if (this.fontSizeLevel <= 0) return
        this.fontSizeLevel--
        setFontSize(this.fontSizeLevel)
      })
    },

    // init has TOC
    initHasToc() {
      const tocNavDoms = document.querySelectorAll('.post-toc-wrap .post-toc li')
      if (tocNavDoms.length > 0) {
        this.hasToc = true
        document.body.classList.add('has-toc')
      } else {
        this.hasToc = false
        document.body.classList.remove('has-toc')
      }
    },

    // zoom in image
    zoomInImage() {
      let SIDE_GAP = 40
      let isZoomIn = false
      let curWinScrollY = 0
      let selectedImgDom = null
      const imgDomList = document.querySelectorAll('.keep-markdown-body img')
      const zoomInImgMask = document.querySelector('.zoom-in-image-mask')
      const zoomInImg = zoomInImgMask?.querySelector('.zoom-in-image')

      const zoomOut = () => {
        if (isZoomIn) {
          isZoomIn = false
          curWinScrollY = 0
          zoomInImg && (zoomInImg.style.transform = `scale(1)`)
          zoomInImgMask && zoomInImgMask.classList.remove('show')
          setTimeout(() => {
            selectedImgDom && selectedImgDom.classList.remove('hide')
          }, 300)
        }
      }

      const zoomOutHandle = () => {
        zoomInImgMask &&
          zoomInImgMask.addEventListener('click', () => {
            zoomOut()
          })

        document.addEventListener('scroll', () => {
          if (isZoomIn && Math.abs(curWinScrollY - window.scrollY) >= 50) {
            zoomOut()
          }
        })
      }

      const setSideGap = () => {
        const w = document.body.offsetWidth
        if (w <= 500) {
          SIDE_GAP = 10
        } else if (w <= 800) {
          SIDE_GAP = 20
        } else {
          SIDE_GAP = 40
        }
      }

      if (imgDomList.length) {
        zoomOutHandle()
        imgDomList.forEach((img) => {
          img.addEventListener('click', () => {
            curWinScrollY = window.scrollY
            isZoomIn = !isZoomIn
            setSideGap()
            zoomInImg.setAttribute('src', img.getAttribute('src'))
            selectedImgDom = img
            if (isZoomIn) {
              const imgRect = selectedImgDom.getBoundingClientRect()
              const imgW = imgRect.width
              const imgH = imgRect.height
              const imgL = imgRect.left
              const imgT = imgRect.top
              const winW = document.body.offsetWidth - SIDE_GAP * 2
              const winH = document.body.offsetHeight - SIDE_GAP * 2
              const scaleX = winW / imgW
              const scaleY = winH / imgH
              const scale = (scaleX < scaleY ? scaleX : scaleY) || 1
              const translateX = winW / 2 - (imgRect.x + imgW / 2) + SIDE_GAP
              const translateY = winH / 2 - (imgRect.y + imgH / 2) + SIDE_GAP

              selectedImgDom.classList.add('hide')
              zoomInImgMask.classList.add('show')
              zoomInImg.style.top = imgT + 'px'
              zoomInImg.style.left = imgL + 'px'
              zoomInImg.style.width = imgW + 'px'
              zoomInImg.style.height = imgH + 'px'
              zoomInImg.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) `
            }
          })
        })
      }
    },

    // set how long ago language
    setHowLongAgoLanguage(p1, p2) {
      return p2.replace(/%s/g, p1)
    },

    getHowLongAgo(timestamp) {
      const lang = KEEP.language_ago
      const __Y = Math.floor(timestamp / (60 * 60 * 24 * 30) / 12)
      const __M = Math.floor(timestamp / (60 * 60 * 24 * 30))
      const __W = Math.floor(timestamp / (60 * 60 * 24) / 7)
      const __d = Math.floor(timestamp / (60 * 60 * 24))
      const __h = Math.floor((timestamp / (60 * 60)) % 24)
      const __m = Math.floor((timestamp / 60) % 60)
      const __s = Math.floor(timestamp % 60)

      if (__Y > 0) {
        return this.setHowLongAgoLanguage(__Y, lang.year)
      } else if (__M > 0) {
        return this.setHowLongAgoLanguage(__M, lang.month)
      } else if (__W > 0) {
        return this.setHowLongAgoLanguage(__W, lang.week)
      } else if (__d > 0) {
        return this.setHowLongAgoLanguage(__d, lang.day)
      } else if (__h > 0) {
        return this.setHowLongAgoLanguage(__h, lang.hour)
      } else if (__m > 0) {
        return this.setHowLongAgoLanguage(__m, lang.minute)
      } else if (__s > 0) {
        return this.setHowLongAgoLanguage(__s, lang.second)
      }
    },

    setHowLongAgoInHome() {
      const post = document.querySelectorAll('.article-meta-info .home-article-history')
      post &&
        post.forEach((v) => {
          const nowDate = Date.now()
          const postDate = new Date(v.dataset.updated.split(' GMT')[0]).getTime()
          v.innerHTML = this.getHowLongAgo(Math.floor((nowDate - postDate) / 1000))
        })
    },

    // loading progress bar start
    pjaxProgressBarStart() {
      this.pjaxProgressBarTimer && clearInterval(this.pjaxProgressBarTimer)
      if (this.isHasScrollProgressBar) {
        this.scrollProgressBarDom.classList.add('hide')
      }

      this.pjaxProgressBarDom.style.width = '0'
      this.pjaxProgressIcon.classList.add('show')

      let width = 1
      const maxWidth = 99

      this.pjaxProgressBarDom.classList.add('show')
      this.pjaxProgressBarDom.style.width = width + '%'

      this.pjaxProgressBarTimer = setInterval(() => {
        width += 5
        if (width > maxWidth) width = maxWidth
        this.pjaxProgressBarDom.style.width = width + '%'
      }, 100)
    },

    // loading progress bar end
    pjaxProgressBarEnd() {
      this.pjaxProgressBarTimer && clearInterval(this.pjaxProgressBarTimer)
      this.pjaxProgressBarDom.style.width = '100%'

      const temp_1 = setTimeout(() => {
        this.pjaxProgressBarDom.classList.remove('show')
        this.pjaxProgressIcon.classList.remove('show')

        if (this.isHasScrollProgressBar) {
          this.scrollProgressBarDom.classList.remove('hide')
        }

        const temp_2 = setTimeout(() => {
          this.pjaxProgressBarDom.style.width = '0'
          clearTimeout(temp_1), clearTimeout(temp_2)
        }, 200)
      }, 200)
    },

    // insert tooltip content dom
    insertTooltipContent() {
      const init = () => {
        // tooltip
        document.querySelectorAll('.tooltip').forEach((element) => {
          const { content, offsetX, offsetY } = element.dataset

          let style = ''
          let sTop = ''
          let sLeft = ''
          if (offsetX) {
            sTop = `left: ${offsetX};`
          }
          if (offsetY) {
            sLeft = `top: ${offsetY};`
          }
          if (offsetX || offsetY) {
            style = ` style="${sLeft}${sTop}"`
          }

          if (content) {
            element.insertAdjacentHTML(
              'afterbegin',
              `<span class="tooltip-content"${style}>${content}</span>`
            )
          }
        })

        // tooltip-img
        const imgsSet = {}

        const toggleShowImg = (dom, nameIdx) => {
          document.addEventListener('click', () => {
            if (imgsSet[nameIdx].isShowImg) {
              dom.classList.remove('show-img')
              imgsSet[nameIdx].isShowImg = false
            }
          })
        }

        const loadImg = (img, imgLoaded) => {
          const temp = new Image()
          const { src } = img.dataset
          temp.src = src
          temp.onload = () => {
            img.src = src
            img.removeAttribute('lazyload')
            imgLoaded = true
          }
        }

        document.querySelectorAll('.tooltip-img').forEach((dom, idx) => {
          const { imgUrl, name } = dom.dataset
          if (imgUrl) {
            const imgDomClass = `tooltip-img-${name}`
            const nameIdx = `${name}_${idx}`
            const imgDom = `<img class="${imgDomClass}" lazyload data-src="${imgUrl}" alt="${name}">`
            const imgTooltipBox = `<div class="tooltip-img-box">${imgDom}</div>`

            imgsSet[nameIdx] = {
              imgLoaded: false,
              isShowImg: false
            }

            dom.insertAdjacentHTML('afterbegin', imgTooltipBox)
            dom.addEventListener('click', (e) => {
              if (!imgsSet[nameIdx].imgLoaded) {
                loadImg(
                  document.querySelector(`.tooltip-img-box img.${imgDomClass}`),
                  imgsSet[nameIdx].imgLoaded
                )
              }
              imgsSet[nameIdx].isShowImg = !imgsSet[nameIdx].isShowImg
              dom.classList.toggle('show-img')
              e.stopPropagation()
            })

            toggleShowImg(dom, nameIdx)
          }
        })
      }
      setTimeout(() => {
        init()
      }, 1000)
    },

    // busuanzi initialize handle
    siteCountInitialize() {
      if (KEEP.theme_config?.website_count?.busuanzi_count?.enable === true) {
        const script = document.createElement('script')
        script.async = true
        script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
        document.body.appendChild(script)

        const getText = (selector) => {
          return document.querySelector(selector)?.innerText
        }

        script.onload = () => {
          setTimeout(() => {
            if (
              getText('#busuanzi_value_site_uv') ||
              getText('#busuanzi_value_site_pv') ||
              getText('#busuanzi_value_page_pv')
            ) {
              const tmpDom1 = document.querySelector('.footer .count-item .uv')
              const tmpDom2 = document.querySelector('.footer .count-item .pv')
              const tmpDom3 = document.querySelector('.article-meta-info .article-pv')
              tmpDom1 && (tmpDom1.style.display = 'flex')
              tmpDom2 && (tmpDom2.style.display = 'flex')
              tmpDom3 && (tmpDom3.style.display = 'inline-block')
            }
          }, 1000)
        }
      }
    },

    // page number jump handle
    pageNumberJump() {
      const inputDom = document.querySelector('.paginator .page-number-input')
      inputDom &&
        inputDom.addEventListener('change', (e) => {
          const min = 1
          const max = Number(e.target.max)
          let current = Number(e.target.value)

          if (current <= 0) {
            inputDom.value = min
            current = min
          }

          if (current > max) {
            inputDom.value = max
            current = max
          }

          const tempHref = window.location.href.replace(/\/$/, '').split('/page/')[0]

          if (current === 1) {
            window.location.href = tempHref
          } else {
            window.location.href = tempHref + '/page/' + current
          }
        })
    }
  }

  // init data
  KEEP.utils.initData()

  // init scroll
  KEEP.utils.registerWindowScroll()

  // toggle show tools list
  KEEP.utils.toggleShowToolsList()

  // global font adjust
  KEEP.utils.globalFontAdjust()

  // check whether TOC exists
  KEEP.utils.initHasToc()

  // big image viewer handle
  KEEP.utils.zoomInImage()

  // set how long age in home article block
  KEEP.utils.setHowLongAgoInHome()

  // insert tooltip content dom
  KEEP.utils.insertTooltipContent()

  // busuanzi initialize
  KEEP.utils.siteCountInitialize()

  // page number jump handle
  KEEP.utils.pageNumberJump()
}
