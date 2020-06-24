const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/kodi-remote-subtitles/' : '/',
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ],
    },
}
