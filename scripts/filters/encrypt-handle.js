/* global hexo */

'use strict'

const crypto = require('crypto')

function encrypt(text, key, iv) {
  const algorithm = 'aes-256-cbc'
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

hexo.extend.filter.register(
  'after_post_render',
  function (data) {
    let { password } = data
    password = String(password).trim()
    if (password) {
      const secretKey = crypto.randomBytes(32).toString('hex') // 256-bit
      const iv = crypto.randomBytes(16).toString('hex') // 128-bit
      data.secretKey = secretKey
      data.iv = iv
      data.encryptedPassword = encrypt(password, secretKey, iv)
      data.encryptedContent = encrypt(data.content, secretKey, iv)
    }
  },
  1
)
