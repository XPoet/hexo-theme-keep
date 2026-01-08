'use strict'

hexo.extend.tag.register(
  'timeline',
  function (args, content) {
    return `<div class="keep-timeline border-box">${content}</div>`
  },
  { ends: true }
)

hexo.extend.tag.register(
  'timenode',
  function (args, content) {
    const date = args[0] || ''

    const renderedContent = hexo.render.renderSync({
      text: content,
      engine: 'markdown'
    })

    return `
      <div class="keep-timeline-item border-box">
        <div class="keep-timeline-date">${date}</div>
        <div class="keep-timeline-content border-box">
          <div class="keep-timeline-card border-box">
            ${renderedContent}
          </div>
        </div>
      </div>
    `
  },
  { ends: true }
)
