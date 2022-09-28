/* global KEEP */

KEEP.initCodeBlockTools = () => {
  HTMLElement.prototype.wrap = function (wrapper) {
    this.parentNode.insertBefore(wrapper, this);
    this.parentNode.removeChild(this);
    wrapper.appendChild(this);
  };

  const { style: codeCopyStyle } = KEEP.theme_config?.code_copy;
  const { style: codeBlockStyle } = KEEP.theme_config?.code_block_tools;
  const isMac = (codeBlockStyle || codeCopyStyle || 'default') === 'mac';
  const foldedIconClassName = isMac ? 'fas fa-chevron-left' : 'fas fa-chevron-right';

  const foldDom = `<span class="tool fold"><i class="fas fa-chevron-down"></i></span>`

  document.querySelectorAll('figure.highlight').forEach(element => {
    let codeLang = element.classList.length ? element.classList[1].toUpperCase() : '';
    if (codeLang === 'PLAINTEXT') { codeLang = '' }
    const highlightContainer = document.createElement('div');
    highlightContainer.classList.add('highlight-container');
    element.wrap(highlightContainer);

    const codeLangDom = `${codeLang ? '<span class="code-lang">' + codeLang + '</span>' : ''}`

    highlightContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="code-tools-box">
        ${isMac ? foldDom + codeLangDom : '<span>' + foldDom + codeLangDom + '</span>'}
        <span class="tool copy"><i class="fas fa-copy"></i></span>
      </div>`
    );
    const codeToolsBox = element.parentNode.querySelector('.code-tools-box');
    const copyDom = codeToolsBox.querySelector('.copy');
    const targetFoldDom = codeToolsBox.querySelector('.fold');

    copyDom.addEventListener('click', event => {
      const target = event.currentTarget;
      const code = [...element.querySelectorAll('.code .line')].map(line => line.innerText).join('\n');
      const tta = document.createElement('textarea');
      tta.style.top = window.scrollY + 'px';
      tta.style.position = 'absolute';
      tta.style.opacity = '0';
      tta.readOnly = true;
      tta.value = code;
      document.body.append(tta);
      const selection = document.getSelection();
      const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
      tta.select();
      tta.setSelectionRange(0, code.length);
      tta.readOnly = false;
      const result = document.execCommand('copy');
      target.querySelector('i').className = result ? 'fas fa-check' : 'fas fa-times';
      tta.blur();
      target.blur();
      if (selected) {
        selection.removeAllRanges();
        selection.addRange(selected);
      }
      document.body.removeChild(tta);
    });

    copyDom.addEventListener('mouseleave', event => {
      setTimeout(() => {
        event.target.querySelector('i').className = 'fas fa-copy';
      }, 500);
    });

    let isFold = false
    targetFoldDom.addEventListener('click', event => {
      const target = event.currentTarget;
      const icon = target.querySelector('i');
      isFold = !isFold
      if (isFold) {
        icon.className = foldedIconClassName
        element.classList.add('folded');
        codeToolsBox.classList.add('folded');
      } else {
        icon.className = 'fas fa-chevron-down';
        element.classList.remove('folded');
        codeToolsBox.classList.remove('folded');
      }
    });
  });
}
