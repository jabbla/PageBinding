const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: path.resolve(__dirname, './index.tsx'),
    output: {
        filename: 'content.js',
        path: path.resolve(__dirname, '../../dist/')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader!awesome-typescript-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.scss$/,
                loaders: ['css-to-string-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['css-to-string-loader', 'css-loader']
            }
        ]
    }
};