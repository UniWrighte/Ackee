const childProcess = require('child_process')
const fs = require('fs')
const { randomString } = require('../helpers')
const CID = childProcess.execSync('docker run -d post_ackee').toString().trim()

const ENV_LOCATION = '../../.env'

const { NetworkSettings } = JSON.parse(childProcess.execSync(`docker inspect ${CID}`).toString().trim())[0]
const { IPAddress } = NetworkSettings
function getEnv () {
  try {
    return fs.readFileSync(ENV_LOCATION).toString().split('\n')
  } catch (error) {
    return []
  }
}
const env = getEnv()
if (env.findIndex(line => line.indexOf('SALT=') === 0) === -1) {
  env.push(`SALT=${randomString()}`)
}
const docker = fs.readFileSync('./Dockerfile').toString().split('\n')
const dockerEnv = docker.filter(line => {
  return line.indexOf('ENV') === 0
}).map(line => line.split('ENV POSTGRES_')[1]).map(line => {
  const [key, value] = line.split('=')
  return `DOCK_${key}=${value}`
})

const newEnv = env.filter(line => {
  return line.indexOf('DOCK_') !== 0 && line.indexOf('NODE_ENV') !== 0
}).concat(dockerEnv)
newEnv.push(`DOCK_HOST=${IPAddress}`)
newEnv.unshift('NODE_ENV=docker')
const data = newEnv.reduce((acc, val) => (`${acc}\n${val}`))
fs.writeFileSync(ENV_LOCATION, data)
