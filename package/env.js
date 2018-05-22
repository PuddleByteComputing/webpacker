const { resolve } = require('path')
const { safeLoad } = require('js-yaml')
const { readdirSync, readFileSync } = require('fs')

const DEFAULT = 'production'
const ymlConfigPath = resolve('config', 'webpacker.yml')

const railsEnv = process.env.RAILS_ENV
const nodeEnv = process.env.NODE_ENV

const ymlConfig = safeLoad(readFileSync(ymlConfigPath), 'utf8')
const availableYmlEnvironments = Object.keys(ymlConfig)
                                       .filter((key) => key !== 'default')

const jsConfigDir = resolve('config', 'webpack')
const jsConfigs = readdirSync(jsConfigDir)
  .map((f) => f.replace(/\.[^\.]+$/, ''))
  .filter((f) => f !== 'environment')

module.exports = {
  railsEnv: railsEnv && availableYmlEnvironments.includes(railsEnv) ? railsEnv : DEFAULT,
  nodeEnv: nodeEnv && jsConfigs.includes(nodeEnv) ? nodeEnv : DEFAULT
}
