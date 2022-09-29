/* global KEEP */

KEEP.initTooltip = () => {
  KEEP.utils.insertTooltipContent = () => {
    document.querySelectorAll('.tooltip').forEach(element => {
      const { content } = element.dataset
      if (content) {
        element.insertAdjacentHTML(
          'afterbegin',
          `<span class="tooltip-content">${content}</span>`
        );
      }
    })
  }
  KEEP.utils.insertTooltipContent();
}
