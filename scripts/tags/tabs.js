'use strict'

module.exports = (ctx) =>
  function (args, content = '') {
    const tabsId = `keep-tabs-${Date.now()}`
    let activeTabIdx = Number(args[0]) || 1

    const tabBlock = /<!--\s*tab (.*?)\s*-->\n([\w\W\s\S]*?)<!--\s*endtab\s*-->/g
    const matches = content.matchAll(tabBlock)

    let tabIdx = 1
    let tabsNav = ''
    let tabsContent = ''

    for (const match of matches) {
      let tabName = match[1]
      const href = `${tabsId}-${tabIdx}`
      const isActive = tabIdx === activeTabIdx ? ' active' : ''
      tabIdx += 1

      tabsNav += `<div class="tab${isActive}" data-href="${href}">${tabName}</div>`

      let tabContent = match[2]
      tabContent = ctx.render.renderSync({ text: tabContent, engine: 'markdown' }).trim()
      tabsContent += `<div class="tab-pane${isActive}" id="${href}">${tabContent}</div>`
    }

    tabsNav = `<div class="tabs-nav">${tabsNav}</div>`
    tabsContent = `<div class="tabs-content">${tabsContent}</div>`

    return `<div class="keep-tabs" id="${tabsId}">
            ${tabsNav + tabsContent}
          </div>`
  }
