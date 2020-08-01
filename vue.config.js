const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin")
const webpack = require("webpack");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");


module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    configureWebpack: {
        devtool: "source-map",
        plugins: [
            new VuetifyLoaderPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new DuplicatePackageCheckerPlugin(),
            new StatsPlugin("stats.json")
        ]
    },
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: false
        }
    }
}
