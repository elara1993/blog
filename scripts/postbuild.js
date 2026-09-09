const fs = require('fs');
const path = require('path');

// 确保 dist 目录存在
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 创建 .nojekyll 文件
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('Post-build scripts completed');
