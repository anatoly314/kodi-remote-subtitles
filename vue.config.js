const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ],
    },
}
