/* global hexo */

'use strict'

const noteTag = require('./note')(hexo)
hexo.extend.tag.register('note', noteTag, true)

const buttonTag = require('./button')(hexo)
hexo.extend.tag.register('button', buttonTag, true)
hexo.extend.tag.register('btn', buttonTag, true)

const tabsTag = require('./tabs')(hexo)
hexo.extend.tag.register('tabs', tabsTag, true)
