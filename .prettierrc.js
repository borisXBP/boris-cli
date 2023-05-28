module.exports = {
  /** 指定一个制表符等于的空格数 */
  tabWidth: 2,
  /** 在所有代码语句的末尾添加分号 */
  semi: true,
  /** 使用单引号 */
  singleQuote: true,
  /** 如果HTML元素（包括JSX等）具有多个属性，将其结束标签右尖括号 > 放在最后一个属性的末尾，而不是另起一行 */
  bracketSameLine: true,
  /** 每行最大长度 */
  printWidth: 120,
  /** 如果HTML元素（包括JSX等）具有多个属性，将其每个属性格式化为单独占一行 */
  singleAttributePerLine: true,
  /** 配置排序规则；排序方式说明：
  1. 按照框架级、自己的文件、第三方库分类 (当前使用)
  2. 按照功能来分类，比如按照组件、工具函数、样式
 */
  importOrder: ['^vue', 'pinia|uuid|lodash-es|vant|axios|cancelable-promise', '^@', '^./', '^..'],
  /** 让每种 import 之间都有一个空行 */
  importOrderSeparation: true,
};
