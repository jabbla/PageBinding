const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './index.ts'),
    output: {
        filename: 'background.js',
        path: path.resolve(__dirname, '../../dist/')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "awesome-typescript-loader" }
        ]
    }
};