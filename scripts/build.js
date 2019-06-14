const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

/**构建popup */
try {
    childProcess.execFileSync(path.resolve(__dirname, './build.sh'), [], {shell: true});
}catch(err) {
    console.error('build.sh 脚本运行失败');
}