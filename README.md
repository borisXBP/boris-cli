## 脚手架笔记
* 安装必要的依赖
* 新建 bin 文件夹，新建 index.js 文件，并在 package.json 中配置 bin
* bin文件夹主要保存执行的指令，脚手架代码主要保存在 lib 文件夹中，lib/index.js 为入口文件；bin/index.js 引入了 lib/index.js文件
* 使用 npm link 做全局软连接，开始测试脚手架

## TODO:
* 考虑模板是一大个文件夹时如何处理（较难）
* 创建项目时根据用户在终端的输入，选择不同的模板（简单）

## 可供参考的项目
https://github.com/bencodezen/vue-enterprise-boilerplate
