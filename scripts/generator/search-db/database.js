'use strict'

const GUTTER_RE = /<td class="gutter">.*?<\/td>/g

function stripHTML(html = '') {
  if (!html) return ''

  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function generateDB(article, config, isPost) {
  const data = {}

  if (article?.title) {
    data.title = article.title
  }

  if (article?.path) {
    data.url = encodeURI(config.root + article.path)
  }

  const rawContent = article?.password ? '' : article._content || article.content || ''

  if (config.content !== false) {
    if (config.format === 'raw') {
      data.content = rawContent
    } else {
      let content = rawContent.replace(GUTTER_RE, '')
      if (config.format === 'striptags') {
        content = stripHTML(content)
      }
      data.content = content
    }
  } else {
    data.content = ''
  }

  if (!isPost) {
    return data
  }

  if (article.categories && article.categories.length > 0) {
    data.categories = article.categories.map((c) => c.name)
  }

  if (article.tags && article.tags.length > 0) {
    data.tags = article.tags.map((t) => t.name)
  }

  return data
}

module.exports = function (locals, config) {
  const database = []
  const field = config.field

  if (field === 'all' || field === 'post') {
    locals.posts.forEach((post) => {
      database.push(generateDB(post, config, true))
    })
  }

  if (field === 'all' || field === 'page') {
    locals.pages.forEach((page) => {
      database.push(generateDB(page, config, false))
    })
  }

  return database
}
