/* global hexo */

'use strict'

function countWords(content) {
  const text = (content || '').replace(/<(?:[^>"']|"[^"]*"|'[^']*')*>/g, '')
  const chinese = (text.match(/[\u4E00-\u9FA5]/g) || []).length
  const other = (
    text
      .replace(/[\u4E00-\u9FA5]/g, '')
      .match(
        /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
      ) || []
  ).length

  return { chinese, other }
}

function formatCount(count) {
  return count < 1000 ? count : Math.round(count / 100) / 10 + 'k'
}

hexo.extend.helper.register('keepWordCount', function (content) {
  const { chinese, other } = countWords(content)
  return formatCount(chinese + other)
})

hexo.extend.helper.register('keepMin2Read', function (content) {
  const { chinese, other } = countWords(content)
  return Math.max(1, Math.floor(chinese / 300 + other / 160))
})

hexo.extend.helper.register('keepTotalCount', function (site) {
  let count = 0
  site.posts.forEach((post) => {
    const { chinese, other } = countWords(post.content)
    count += chinese + other
  })
  return formatCount(count)
})
