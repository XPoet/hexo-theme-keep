/* global KEEP */

function initToggleShowToc() {
  KEEP.utils.postHelper = {
    postPageContainerDom: document.querySelector('.post-page-container'),
    toggleShowTocBtnDom: document.querySelector('.toggle-show-toc'),
    toggleShowTocIcon: document.querySelector('.toggle-show-toc i'),
    mainContentDom: document.querySelector('.main-content'),
    postToolsDom: document.querySelector('.post-tools'),
    goToCommentsDom: document.querySelector('.post-tools .go-to-comments'),

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

      setTimeout(() => {
        this.setPostToolsLeft()
      }, 120)
    },

    hasToc(isOpen) {
      this.toggleShowTocBtnDom.style.display = 'flex'
      this.isShowToc = isOpen
      this.handleToggleToc(isOpen)
    },

    setPostToolsLeft(mcw) {
      const mainContainerWidth = mcw
        ? mcw
        : this.mainContentDom.getBoundingClientRect().width.toFixed(0)
      let offsetX = 5

      if (window.innerWidth <= 800) {
        offsetX = 3
      }

      this.postToolsDom.style.opacity = `1`
      this.postToolsDom.style.left = `calc((100vw - ${mainContainerWidth}px) / 2 - ${offsetX}rem)`
    },

    initSetPostToolsLeft() {
      setTimeout(() => {
        this.setPostToolsLeft()
      }, 150)

      window.addEventListener('resize', () => {
        this.setPostToolsLeft()
      })
    },

    // go comment anchor
    goToComments() {
      const commentsAnchor = document.querySelector('#comments-anchor')
      if (this.goToCommentsDom && commentsAnchor) {
        this.goToCommentsDom.addEventListener('click', (event) => {
          event.preventDefault()
          let winScrollY = window.scrollY
          winScrollY = winScrollY === 0 ? -20 : winScrollY
          const offset = commentsAnchor.getBoundingClientRect().top + winScrollY
          window.anime({
            targets: document.scrollingElement,
            duration: 300,
            easing: 'linear',
            scrollTop: offset,
            complete: () => {
              setTimeout(() => {
                KEEP.utils.pageTop_dom.classList.add('hide')
              }, 150)
            }
          })
        })
      }
    },

    // watch comments count
    watchPostCommentsCount() {
      const commentsCountDom = this.postToolsDom.querySelector('.post-comments-count')
      if (!commentsCountDom) return
      const config = { attributes: true, childList: true }

      const callback = function (mutationsList) {
        mutationsList.forEach((item) => {
          if (item.type === 'childList') {
            const count = Number(item.target.innerHTML)
            if (count > 0) {
              commentsCountDom.style.display = 'flex'
              if (count > 99) {
                commentsCountDom.innerHTML = '99+'
                observer.disconnect()
              }
            }
          }
        })
      }

      const observer = new MutationObserver(callback)
      observer.observe(commentsCountDom, config)
    },

    // set post link
    initSetPostLink() {
      const postLinkContentDom = document.querySelector(
        '.copyright-info-content .post-link .content'
      )
      postLinkContentDom && (postLinkContentDom.innerHTML = decodeURI(window.location.href))
    },

    // copy copyright info
    copyCopyrightInfo() {
      const cicDom = document.querySelector('.copyright-info-content')
      const copyDom = document.querySelector('.copy-copyright-info')
      const copyIcon = copyDom.querySelector('i')

      const ccLang = KEEP.language_copy_copyright
      const colon = KEEP.hexo_config.language === 'en' ? ': ' : '：'

      let isCopied = false

      const setCopyDomContent = (class1, class2, content, copied) => {
        if (copyIcon) {
          copyIcon.classList.remove(class1)
          copyIcon.classList.add(class2)
        }
        const tooltipDom = copyDom.querySelector('.tooltip-content')
        tooltipDom && (tooltipDom.innerHTML = content)
        isCopied = copied
      }

      copyDom.addEventListener('click', () => {
        if (!isCopied) {
          const author = cicDom.querySelector('.post-author .content').innerHTML
          const link = cicDom.querySelector('.post-link .content').innerHTML
          const tgtTxt = `${ccLang.author}${colon}${author}\n${ccLang.link}${colon}${link}`
          navigator.clipboard.writeText(tgtTxt).then(() => {
            setCopyDomContent('fa-copy', 'fa-check', ccLang.copied, true)
          })
        }
      })

      copyDom.addEventListener('mouseleave', () => {
        setTimeout(() => {
          setCopyDomContent('fa-check', 'fa-copy', ccLang.copy, false)
        }, 500)
      })
    },

    // set article aging tips
    setArticleAgingDays() {
      const agingTipsDom = document.querySelector('.article-content .article-aging-tips')
      if (agingTipsDom) {
        const daysDom = agingTipsDom.querySelector('.days')
        const nowTimestamp = Date.now()
        const tmpTimeLength = 24 * 60 * 60 * 1000
        const agingDaysTimestamp = (agingTipsDom.dataset?.agingDays || 30) * tmpTimeLength
        const postUpdateTimestamp = new Date(agingTipsDom.dataset.updateDate).getTime()
        const timeDifference = nowTimestamp - postUpdateTimestamp
        const timeDifferenceDays = (timeDifference / tmpTimeLength).toFixed(0)
        if (timeDifference >= agingDaysTimestamp) {
          daysDom.innerHTML = timeDifferenceDays
          agingTipsDom.style.display = 'block'
        }
      }
    }
  }
  KEEP.utils.postHelper.initSetPostToolsLeft()
  KEEP.utils.postHelper.setArticleAgingDays()

  if (KEEP.theme_config.toc?.enable === true) {
    KEEP.utils.postHelper.initToggleToc()
  }
  if (KEEP.theme_config.comment?.enable === true) {
    KEEP.utils.postHelper.goToComments()
    KEEP.utils.postHelper.watchPostCommentsCount()
  }
  if (KEEP.theme_config.post?.copyright_info === true) {
    KEEP.utils.postHelper.initSetPostLink()
    KEEP.utils.postHelper.copyCopyrightInfo()
  }
}

if (KEEP.theme_config.pjax?.enable === true && KEEP.utils) {
  initToggleShowToc()
} else {
  window.addEventListener('DOMContentLoaded', initToggleShowToc)
}
