/* global hexo */

'use strict'

hexo.on('ready', () => {
  if (!/^(g|s)/.test(hexo.env.cmd)) return
  const { version } = require('../../package.json')
  hexo.log.info(`
------------------------------------------
     __  ___  _______  _______ .______
    |  |/  / |   ____||   ____||   _  \\
    |  '  /  |  |__   |  |__   |  |_)  |
    |    <   |   __|  |   __|  |   ___/
    |  .  \\  |  |____ |  |____ |  |
    |__|\\__\\ |_______||_______|| _|

------------------------------------------
Keep version ${version}
Documentation: https://keep-docs.xpoet.cn
------------------------------------------
`)
})
