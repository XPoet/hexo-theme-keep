'use strict'

module.exports = () =>
  function (args, content) {
    const colorKeywords = ['info', 'primary', 'success', 'warning', 'danger']
    const sizeKeywords = ['small', 'default', 'large']

    let colorClass = 'info'
    if (args[0] && colorKeywords.includes(args[0])) {
      colorClass = args[0]
    }

    let sizeClass = 'default'
    if (args[1] && sizeKeywords.includes(args[1])) {
      sizeClass = args[1]
    }

    let attribute = ''
    if (args[2]) {
      attribute = `onclick="window.open('${args[2]}')"`
    }

    return `<button ${attribute} class="keep-button color-${colorClass} size-${sizeClass}">${content}</button>`
  }
