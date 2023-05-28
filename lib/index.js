// 请求 commander 库，主要是用来处理用户输入的命令

// 请求 lib/update.js
const updateChk = require('./update.js');
const commander = require('commander');
const fsEx = require('fs-extra');
const fs = require('fs');
const download = require('download');
const handlebars = require('handlebars');
const path = require('path');
const { program } = commander;

// update 检测更新
program
  // 声明命令
  .command('upgrade')
  // 描述信息，在帮助信息时显示
  .description('Check the js-cli-boris version.')
  .action(() => {
    // 执行 lib/update.js 里面的操作
    updateChk();
  });

// 从 package.json 文件中请求 version 字段的值，-v和--version是参数
program.version(require('../package.json').version, '-v, --version');

program
  .command('create <dir>')
  .description('create a new project')
  .action(async (dir) => {
    // 检查目录是否存在
    if (fsEx.existsSync(dir)) {
      console.log(`Directory ${dir} already exists.`);
      return;
    }

 /*    console.log('=== 开始下载模板');
    TODO: 配置好可用的模板，但需要想清楚当模板是一大个文件夹时，如何处理？
    
    // 下载模板
    const templateS = await download('https://github.com/borisXBP/self-management/archive/refs/heads/main.zip');

    console.log('=== 下载完成！！！'); 

    // 解压模板
    fsEx.createReadStream(templateS).pipe(unzipper.Extract({ path: path.resolve(__dirname, './template') }));
*/
    // 渲染模板 
    // constsource source = templateS.toString();
    const source = fs.readFileSync(path.resolve(__dirname, '../test.hbs' ), 'utf-8');
    // const source = fs.readFileSync(path.resolve(__dirname, './template/self-management-main/package.json')).toString();
    const template = handlebars.compile(source);
    const result = template({ name: dir });

    // 创建新项目
    fs.writeFileSync(dir, result);
  });

// 解析命令行参数
program.parse(process.argv);
