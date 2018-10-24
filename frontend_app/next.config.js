require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  
  webpack: (config, { dev }) => {

    /* Enable only in Production */
    if (!dev) {

      /* Handle specifics files... */

    }

    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config

    return config
  }
}
