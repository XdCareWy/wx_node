module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true,
    },
    extends: ['plugin:prettier/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 6, //ECMA版本
      sourceType: 'module', //源码类型
      ecmaFeatures: {
        experimentalObjectRestSpread: true, //允许使用对象展开符|use experimental expression,
        jsx: true,
      },
    },
    plugins: ['react', 'flowtype', 'prettier'],
    settings: {
      flowtype: {
        onlyFilesWithFlowAnnotation: false,
      },
    },
    rules: {
      //es5
      'strict': 0,
      'array-bracket-spacing': [2, 'never'], //强制数组方括号中使用一致的空格
      'block-spacing': [2, 'always'], //强制在单行代码块中使用一致的空格
      'brace-style': [
        //强制在代码块中使用一致的大括号风格
        2,
        '1tbs',
        { allowSingleLine: true }, //允许块的开括号和闭括号在 同一行
      ],
      'comma-spacing': [
        2,
        {
          before: false, //禁止逗号前存在空格
          after: true, //逗号后需要一个空格
        },
      ],
      'comma-style': [2, 'last'], //逗号的位置永远在句子的末尾
      'computed-property-spacing': [2, 'never'], //强制在计算的属性的方括号中使用一致的空格
      //'comma-dangle': 2,  //禁止在对象和数组的最后加逗号
      'default-case': 2, //在switch中需要default用例
      'flowtype/boolean-style': ['error', 'boolean'],
      'flowtype/define-flow-type': 'warn',
      'flowtype/delimiter-dangle': ['error', 'never'],
      'flowtype/generic-spacing': ['error', 'never'],
      'flowtype/no-primitive-constructor-types': 'error',
      'flowtype/no-weak-types': 'warn',
      'flowtype/object-type-delimiter': ['error', 'comma'],
      'flowtype/require-parameter-type': 'off',
      'flowtype/require-return-type': 'off',
      'flowtype/require-valid-file-annotation': 'off',
      'flowtype/semi': ['error', 'always'],
      'flowtype/space-after-type-colon': ['error', 'always'],
      'flowtype/space-before-generic-bracket': ['error', 'never'],
      'flowtype/space-before-type-colon': ['error', 'never'],
      'flowtype/union-intersection-spacing': ['error', 'always'],
      'flowtype/use-flow-type': 'error',
      'flowtype/valid-syntax': 'error',
      eqeqeq: 2, //总是使用全等
      'key-spacing': 2, //冒号后面需要一个空格
      'no-constant-condition': 2, //禁止在条件中使用常量表达式
      'no-mixed-spaces-and-tabs': 2, //不允许空格和tab混合
      'no-eval': 2, //禁止使用eval方法
      'no-extra-semi': 2, //禁止不必要的分号
      'no-invalid-regexp': 2, //禁止不正确的正则表达式
      'no-dupe-args': 2, //在方法中禁止参数重名
      'no-dupe-keys': 2, //在对象中禁止属性重名
      'no-duplicate-case': 2, //在switch中禁止用例重名
      'no-irregular-whitespace': 2, //禁止在字符串和注释之外不规则的空白
      'no-unused-vars': 2, //禁止出现未使用过的变量
      'no-case-declarations': 1, //不允许在 case 子句中使用词法声明
      'no-undef': 2,
      quotes: [2, 'single'],
      radix: 2, //parseInt需要指明进制
      'space-infix-ops': 2, //操作符前后需要空格
      semi: [2, 'always'], //句末总是需要分号
      'space-unary-ops': [
        2,
        {
          //强制在一元操作符前后使用一致的空格
          words: true, //关键字后面需要空格
          nonwords: false,
        },
      ],
      'space-in-parens': [2, 'never'], //圆括号两侧不需要空格
      'space-before-blocks': 2, //强制在块之前使用一致的空格
      'no-console': 0,
      'no-debugger': 2,
      //es6
      'no-var': 2, //禁止使用var声明变量
      'arrow-spacing': 2, //在箭头表达式前后需要空格
      'constructor-super': 2, //在子类构造方法中需要调用supper方法
      'no-const-assign': 2, //禁止改变常量的值
      'no-dupe-class-members': 2, //类中不能存在重名属性
      'no-this-before-super': 2, //在调super方法前禁止使用this
      'prefer-const': 2, //优先使用const
      'prefer-template': 2, //要求使用模板字面量而非字符串连接
  
      //react
      'react/no-deprecated': 2, //禁止使用废弃的方法
      'react/no-unknown-property': 2, //禁止使用不存在的html属性
      'react/prefer-es6-class': [2, 'always'], //优先使用es6的class表达式
      'react/react-in-jsx-scope': 2, //JSX文件必须先引用react
      'react/sort-comp': 2, //规定组件方法出现的次序
      'react/jsx-wrap-multilines': 2, //多行jsx dom结构需要（）包住
      'react/jsx-curly-spacing': [2, 'never'], //jsx属性花括号前后的格式一致
      'react/jsx-equals-spacing': [2, 'never'], //jsx属性=周围不需要空格
      // 'react/jsx-indent-props': [2, 2], //jsx属性换行需要缩进
      // 'react/jsx-indent': [2, 2], //使用2个空格缩进
      'react/jsx-uses-react': 2, //禁止单独引用react而不使用
      'react/jsx-no-duplicate-props': 2, //禁止存在重名props属性
      'react/jsx-no-undef': 2, //禁止使用未定义的变量
      'react/jsx-pascal-case': 2, //强制组件使用驼峰命名
      'react/jsx-uses-vars': 2, //防止JSX中使用的变量被错误地标记为未使用
      'prettier/prettier': 'error', //开启 prettier 格式化
    },
  };
  
