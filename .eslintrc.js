const path = require('path')

module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有   "root": true，它就会停止在父级目录中寻找。
  root: true,
  env: {
    // 预定义的全局变量，这里是浏览器环境
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: path.join(__dirname, './webpack/webpack.config.base.js')
  //     }
  //   }
  // },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ['off', 'windows'],
    'no-shadow': 0,
    'react/self-closing-comp': 0,
    'import/no-unresolved': 0, // 需要写明webpack中 alias中 @语法，不然报错
    'import/extensions': 0, // 需要添加文件扩展名
    'import/prefer-default-export': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'semi': 0, // 语句后添加分号
    'comma-dangle': 0, // 对象的最后一个属性也需要添加逗号
    'object-curly-newline': 0, // 此规则需要给对象换行
    'arrow-parens': 0, // 此规则在箭头函数只有一个参数时也需要添加参数的括号
    'arrow-body-style': 0, // 此规则在箭头函数体只有return一条语句时强制去除return
    'react/jsx-closing-tag-location': 0, // 此规则检查所有带有子元素（非自闭合）的 JSX 多行元素并验证结束标记的位置。期望是结束标签与开始标签在其自己的行上对齐。
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-extraneous-dependencies': 0,
    'no-extra-boolean-cast': 0,
    'import/no-extraneous-dependencies': 0,
    'implicit-arrow-linebreak': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-else-return': 0,
    'no-param-reassign': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'default-param-last': 0,
    'react/forbid-prop-types': 0,
    'no-unused-vars': 0,
    'react/jsx-one-expression-per-line': 0,
    'operator-linebreak': 0,
    'no-nested-ternary': 0,
    'react/jsx-curly-newline': 0,
    'no-restricted-syntax': 0
  },
};
