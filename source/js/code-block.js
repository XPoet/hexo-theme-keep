/* global KEEP */

KEEP.initCodeBlockTools = () => {
  HTMLElement.prototype.wrap = function (wrapper) {
    this.parentNode.insertBefore(wrapper, this)
    this.parentNode.removeChild(this)
    wrapper.appendChild(this)
  }

  const { style: codeBlockStyle } = KEEP.theme_config?.code_block || {}
  const { style: codeBlockToolsStyle } = KEEP.theme_config?.code_block?.tools || {}

  const isMac = (codeBlockStyle || codeBlockToolsStyle || 'default') === 'mac'
  const foldedIconClassName = isMac ? 'fas fa-chevron-left' : 'fas fa-chevron-right'
  const {
    copy: copyLang,
    copied: copiedLang,
    fold: foldLang,
    folded: foldedLang
  } = KEEP.language_code_block
  const foldDom = `<span class="tool fold tooltip" data-tooltip-content="${foldLang}" data-tooltip-offset-y="-2px"><i class="fas fa-chevron-down"></i></span>`

  document.querySelectorAll('figure.highlight').forEach((element) => {
    let codeLang = element.classList.length ? element.classList[1].toUpperCase() : ''
    if (codeLang === 'PLAINTEXT') {
      codeLang = ''
    }
    const highlightContainer = document.createElement('div')
    highlightContainer.classList.add('highlight-container')
    if (isMac) {
      highlightContainer.classList.add('mac')
    }
    element.wrap(highlightContainer)

    const codeLangDom = `${codeLang ? '<span class="code-lang">' + codeLang + '</span>' : ''}`

    highlightContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="code-tools-box">
        ${isMac ? foldDom + codeLangDom : '<span>' + foldDom + codeLangDom + '</span>'}
        <span class="tool copy tooltip" data-tooltip-content="${copyLang}" data-tooltip-offset-y="-2px"><i class="fas fa-copy"></i></span>
      </div>`
    )
    const codeToolsBox = element.parentNode.querySelector('.code-tools-box')
    const copyDom = codeToolsBox.querySelector('.copy')
    const targetFoldDom = codeToolsBox.querySelector('.fold')

    copyDom.addEventListener('click', (event) => {
      const target = event.currentTarget
      const code = [...element.querySelectorAll('.code .line')]
        .map((line) => line.innerText)
        .join('\n')
      const tta = document.createElement('textarea')
      tta.style.top = window.scrollY + 'px'
      tta.style.position = 'absolute'
      tta.style.opacity = '0'
      tta.readOnly = true
      tta.value = code
      document.body.append(tta)
      const selection = document.getSelection()
      const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false
      tta.select()
      tta.setSelectionRange(0, code.length)
      tta.readOnly = false
      const result = document.execCommand('copy')

      const copyIconDom = target.querySelector('i')
      const copyTooltipDom = codeToolsBox.querySelector('.copy .tooltip-content')

      if (result) {
        copyIconDom.className = 'fas fa-check'
        copyTooltipDom && (copyTooltipDom.innerHTML = copiedLang)
      } else {
        copyIconDom.className = 'fas fa-times'
      }

      tta.blur()
      target.blur()
      if (selected) {
        selection.removeAllRanges()
        selection.addRange(selected)
      }
      document.body.removeChild(tta)
    })

    copyDom.addEventListener('mouseleave', (event) => {
      setTimeout(() => {
        event.target.querySelector('i').className = 'fas fa-copy'
        const copyTooltipDom = codeToolsBox.querySelector('.copy .tooltip-content')
        copyTooltipDom && (copyTooltipDom.innerHTML = copyLang)
      }, 500)
    })

    let isFold = false
    targetFoldDom.addEventListener('click', (event) => {
      const target = event.currentTarget
      const icon = target.querySelector('i')
      const foldTooltipDom = codeToolsBox.querySelector('.fold .tooltip-content')
      isFold = !isFold
      if (isFold) {
        icon.className = foldedIconClassName
        element.classList.add('folded')
        codeToolsBox.classList.add('folded')
        foldTooltipDom && (foldTooltipDom.innerHTML = foldedLang)
      } else {
        icon.className = 'fas fa-chevron-down'
        element.classList.remove('folded')
        codeToolsBox.classList.remove('folded')
        foldTooltipDom && (foldTooltipDom.innerHTML = foldLang)
      }
    })
  })
}
