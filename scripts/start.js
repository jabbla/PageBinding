const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

/**执行构建脚本 */
try {
    childProcess.execFileSync(path.resolve(__dirname, './start.sh'), [], {shell: true});
}catch(err) {
    console.error('build.sh 脚本运行失败');
}