/* global hexo */

'use strict'

const noteTag = require('./note')(hexo)
hexo.extend.tag.register('note', noteTag, true)
hexo.extend.tag.register('keep-note', noteTag, true)
