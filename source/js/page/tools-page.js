/* global KEEP */

function toolsPageHandle() {
  const toolsNavBox = document.querySelector('.tools-nav-box')

  if (!toolsNavBox) {
    return
  }

  const toolItemList = toolsNavBox.querySelector('.tool-item-list')
  const toolItemDoms = toolItemList.querySelectorAll('.tool-item')
  const toolCategoryAnchorDoms = toolItemList.querySelectorAll('.tool-category-name')
  const toolNavList = toolsNavBox.querySelectorAll('.tools-nav-list .tool-nav-category')

  const toolItemHandle = () => {
    const toolsCount = toolItemDoms.length
    let columns = 2

    if (toolsCount >= 80) {
      columns = 4
    } else if (toolsCount >= 60) {
      columns = 3
    }

    toolItemList.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
    toolCategoryAnchorDoms.forEach((ltd) => {
      ltd.style.gridColumn = `span ${columns}`

      let folded = false
      const siblings = []
      let nextSibling = ltd.nextElementSibling

      while (nextSibling) {
        if (nextSibling.classList.contains('tool-item')) {
          siblings.push(nextSibling)
          nextSibling = nextSibling.nextElementSibling
        } else {
          break
        }
      }

      const foldDom = ltd.querySelector('.fold')
      foldDom.addEventListener('click', () => {
        folded = !folded
        foldDom.classList.remove(`fa-chevron-${folded ? 'down' : 'left'}`)
        foldDom.classList.add(`fa-chevron-${folded ? 'left' : 'down'}`)
        siblings.forEach((link) => (link.style.display = folded ? 'none' : 'block'))
      })
    })
  }
  toolItemHandle()

  const clearToolNavActive = () => {
    toolNavList.forEach((tn) => tn.classList.remove('active'))
  }

  const toolNavHandle = () => {
    toolNavList.forEach((tn) => {
      const anchor = toolsNavBox.querySelector(`#${tn.dataset.anchor}`)
      KEEP.utils.title2Top4HTag(tn, anchor, 300, () => {
        clearToolNavActive()
        tn.classList.add('active')
      })
    })

    const toolCategoryAnchorScrollTopList = [...toolCategoryAnchorDoms].map(
      (x) => x.getBoundingClientRect().top
    )
    let headerHeight = KEEP.utils.headerWrapperDom.getBoundingClientRect().height
    if (KEEP.utils.isHideHeader) {
      headerHeight = 0
    }

    window.addEventListener('scroll', () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      toolCategoryAnchorScrollTopList.forEach((st, idx) => {
        if (scrollTop + headerHeight > st) {
          clearToolNavActive()
          toolNavList[idx].classList.add('active')
        }
      })
    })
  }

  toolNavHandle()
}

if (KEEP.theme_config?.pjax?.enable === true && KEEP.utils) {
  toolsPageHandle()
} else {
  window.addEventListener('DOMContentLoaded', toolsPageHandle)
}