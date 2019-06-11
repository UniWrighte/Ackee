const crypto = require('crypto')
const randomString = (len = 64) => {
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len).toUpperCase()
}
exports.randomString = randomString
