/* global KEEP */

function toolsPageHandle() {
  const toolsNavBox = document.querySelector('.tools-nav-box')

  if (!toolsNavBox) {
    return
  }

  const toolItemList = toolsNavBox.querySelector('.tool-item-list')
  const toolCategoryAnchorDoms = toolItemList.querySelectorAll('.tool-category-name')
  const toolNavList = toolsNavBox.querySelectorAll('.tools-nav-list .tool-nav-category')

  const tooltip = document.createElement('div')
  tooltip.className = 'tool-item-tooltip'
  tooltip.hidden = true
  document.body.appendChild(tooltip)

  const tooltipEvents = new AbortController()
  const { signal } = tooltipEvents

  const hideTooltip = () => {
    tooltip.hidden = true
  }

  const showTooltip = (text) => {
    if (!text || text.scrollWidth <= text.clientWidth) {
      hideTooltip()
      return
    }

    tooltip.textContent = text.textContent.trim()
    tooltip.hidden = false

    const rect = text.getBoundingClientRect()
    const margin = 12
    const gap = 8
    const width = tooltip.offsetWidth
    const height = tooltip.offsetHeight
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight
    const left = Math.max(
      margin,
      Math.min(rect.left + (rect.width - width) / 2, viewportWidth - width - margin)
    )
    const top = rect.bottom + gap

    tooltip.style.left = `${left}px`
    tooltip.style.top = `${
      top + height > viewportHeight - margin ? rect.top - height - gap : top
    }px`
  }

  toolItemList.querySelectorAll('.tool-item-text').forEach((text) => {
    text.addEventListener('mouseenter', () => showTooltip(text), { signal })
    text.addEventListener('mouseleave', hideTooltip, { signal })
  })

  toolItemList.addEventListener(
    'focusin',
    (event) => {
      const link = event.target.closest('.tool-item .a-wrap')
      const text = [...(link?.querySelectorAll('.tool-item-text') || [])].find(
        (item) => item.scrollWidth > item.clientWidth
      )
      showTooltip(text)
    },
    { signal }
  )
  toolItemList.addEventListener('focusout', hideTooltip, { signal })
  window.addEventListener('scroll', hideTooltip, { capture: true, passive: true, signal })
  window.addEventListener('resize', hideTooltip, { signal })
  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') hideTooltip()
    },
    { signal }
  )
  document.addEventListener('pjax:send', hideTooltip, { signal })
  document.addEventListener(
    'pjax:success',
    () => {
      tooltip.remove()
      tooltipEvents.abort()
    },
    { once: true, signal }
  )

  const toolItemHandle = () => {
    toolCategoryAnchorDoms.forEach((ltd) => {
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
      const scrollTop = KEEP.utils.getScrollTop()
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
