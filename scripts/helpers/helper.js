/* global hexo */

'use strict'

hexo.extend.helper.register('createNewArchivePosts', function (posts) {
  const postList = [],
    postYearList = []
  posts.forEach((post) => postYearList.push(post.date.year()))
  Array.from(new Set(postYearList)).forEach((year) => {
    postList.push({
      year: year,
      postList: []
    })
  })
  postList.sort((a, b) => b.year - a.year)
  postList.forEach((item) => {
    posts.forEach((post) => item.year === post.date.year() && item.postList.push(post))
  })
  postList.forEach((item) => item.postList.sort((a, b) => b.date.unix() - a.date.unix()))
  return postList
})

hexo.extend.helper.register('getAuthorBadge', function (postCount, authorLabelConfig) {
  const { level_badge: isAuto, custom_badge: customBadge } = authorLabelConfig || {}
  let level = Math.floor(Math.log2(postCount))
  level = level < 2 ? 1 : level - 1

  if (isAuto === false && Array.isArray(customBadge) && customBadge.length > 0) {
    return level > customBadge.length ? customBadge[customBadge.length - 1] : customBadge[level - 1]
  } else if (isAuto === false && typeof customBadge === 'string' && customBadge !== '') {
    return customBadge
  } else {
    return `Lv${level}`
  }
})

hexo.extend.helper.register('isJsFile', function (path) {
  return /\.js$/i.test(path)
})

hexo.extend.helper.register('isCssFile', function (path) {
  return /\.css$/i.test(path)
})

const parseMenuItemValue = (menuItemVal) => {
  let path = ''
  let icon = ''
  let children = []

  if (typeof menuItemVal === 'string') {
    const menu_split_list = menuItemVal?.split('||')
    path = menu_split_list[0]?.trim()?.toLowerCase() || ''
    icon = menu_split_list[1]?.trim()?.toLowerCase() || ''
  }

  if (typeof menuItemVal === 'object') {
    children = menuItemVal?.children || []
    path = menuItemVal?.path || ''
    if (children.length) {
      path = ''
    }
    icon = menuItemVal?.icon || ''
  }

  return {
    path,
    icon,
    children
  }
}

hexo.extend.helper.register('parseMenuItem', function (menuItem) {
  let name = ''
  let menuItemValue = ''

  if (typeof menuItem === 'object') {
    name = Object.keys(menuItem)[0]
    menuItemValue = Object.values(menuItem)[0]
  }

  const temp = parseMenuItemValue(menuItemValue)

  return {
    name,
    ...temp
  }
})

hexo.extend.helper.register('getMenuItemObj', function (menuObj, menuKey) {
  const menuItemVal = menuObj[menuKey]
  menuKey = menuKey.toLowerCase()

  const temp = parseMenuItemValue(menuItemVal)

  return {
    name: menuKey,
    ...temp
  }
})
