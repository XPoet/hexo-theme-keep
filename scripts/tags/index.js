/* global hexo */

'use strict'

const noteTag = require('./note')(hexo)
hexo.extend.tag.register('note', noteTag, true)
hexo.extend.tag.register('keep-note', noteTag, true)

const buttonTag = require('./button')(hexo)
hexo.extend.tag.register('button', buttonTag, true)
hexo.extend.tag.register('btn', buttonTag, true)
hexo.extend.tag.register('keep-button', buttonTag, true)
hexo.extend.tag.register('keep-btn', buttonTag, true)
