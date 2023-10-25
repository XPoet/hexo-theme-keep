'use strict'

module.exports = (ctx) =>
  function (args, content) {
    const keywords = ['info', 'primary', 'success', 'warning', 'danger']
    let typeClassName = 'info'

    if (args[0] && keywords.includes(args[0])) {
      typeClassName = args[0]
    }

    let noteTitleContent = ''
    if (args[1]) {
      noteTitleContent = `<div class="keep-note-title">${args[1]}</div>`
    }

    content = ctx.render.renderSync({ text: content, engine: 'markdown' })

    return `<div class="keep-note ${typeClassName}">${noteTitleContent}${content}</div>`
  }
