// 请求 commander 库，主要是用来处理用户输入的命令

// 请求 lib/update.js
const updateChk = require('./update.js');
const unzipper = require('unzipper');
const commander = require('commander');
const fsEx = require('fs-extra');
const fs = require('fs');
const download = require('download');
const handlebars = require('handlebars');
const path = require('path');
const inquirer = require('inquirer');
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

// 创建项目
program
  .command('create <dir>')
  .description('create a new project')
  .action(async (dir) => {
    // 检查目录是否存在
    if (fsEx.existsSync(dir)) {
      console.log(`Directory ${dir} already exists.`);
      return;
    }

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: '请输入项目名称：',
        },
        {
          type: 'checkbox',
          name: 'config',
          message: '请选择项目所需的工程化配置',
          choices: [
            'typescript',
            'eslint',
            'prettier',
            'commitlint',
            'husky',
            'lint-staged',
            'stylelint',
            'editorconfig',
          ],
        },
        /*         {
          type: 'list',
          name: 'framework',
          message: '请选择项目使用的前端框架：',
          choices: ['React', 'Vue', 'Angular'],
        },
        {
          type: 'list',
          name: 'stylePreprocessLanguage',
          message: '请选择项目使用的预处理语言',
          choices: ['Scss', 'Less', 'Css'],
        },
        {
          type: 'confirm',
          name: 'installDependencies',
          message: '是否即时安装项目依赖？',
        }, */
      ])
      .then(async (answers) => {
        // 创建项目目录
        const projectDir = path.join(process.cwd(), answers.name);
        fs.mkdirSync(projectDir);

        console.log('=== 开始下载！！！');
        // 下载模板
        const templateS = await download('https://github.com/borisXBP/self-management/archive/refs/heads/main.zip');

        // 定义保存的文件路径
        const filePath = path.join(projectDir, 'main.zip');

        // 将数据写入到文件
        fs.writeFileSync(filePath, templateS);

        console.log('=== 下载完成！！！', filePath);

        // 解压模板
        fs.createReadStream(filePath)
          .pipe(unzipper.Extract({ path: path.join(process.cwd(), answers.name) }))
          .on('close', () => {
            console.log('解压结束');
          });

        return;
        switch (answers.framework) {
          case 'React':
            inquirer
              .prompt([
                // React 相关的问题
                {
                  type: 'input',
                  name: 'name',
                  message: '请输入项目名称',
                },
              ])
              .then((reactAnswers) => {
                // 处理 React 相关的答案
                console.log('选中的答案', reactAnswers);
              });
            break;
          case 'Vue':
            // 提供 Vue 相关的选项
            inquirer
              .prompt([
                // Vue 相关的问题
              ])
              .then((vueAnswers) => {
                // 处理 Vue 相关的答案
              });
            break;
          case 'Angular':
            // 提供 Angular 相关的选项
            inquirer
              .prompt([
                // Angular 相关的问题
              ])
              .then((vueAnswers) => {
                // 处理 Angular 相关的答案
              });
            break;
        }
      });

    // 渲染模板
    /*     const source = fs.readFileSync(path.resolve(__dirname, '../test.hbs'), 'utf-8');
    const template = handlebars.compile(source);
    const result = template({ name: dir });
    // 创建新项目
    fs.writeFileSync(dir, result); */

    console.log('渲染模板即可!');
  });

// 解析命令行参数
program.parse(process.argv);

/*    console.log('=== 开始下载模板');
    TODO: 配置好可用的模板，但需要想清楚当模板是一大个文件夹时，如何处理？
    
  

        // 渲染模板
    // constsource source = templateS.toString();
    // const source = fs.readFileSync(path.resolve(__dirname, './template/self-management-main/package.json')).toString();
*/
