const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './index.tsx'),
    devtool: "source-map",
    output: {
        filename: 'content.js',
        path: path.resolve(__dirname, '../../dist/')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};