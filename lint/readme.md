# eslint

## 功能

eslint（包括其他一些 lint 工具）的主要功能包含代码格式的校验，代码质量的校验

## 使用方式

1. 编译器
2. webpack
3. 命令行

* rc配置
    - parser 指定解析器
        - ESLint 默认使用Espree作为其解析器
*  rc 的配置可以来源于三处，按优先级排列

    - 项目rc
    - package.json
    - 根目录rc

* 编译器
    1. 安装插件
    2. 该扩展使用安装在打开的工作区文件夹中的 ESLint 库 & eslintrc
    3. Visual Studio Code Settings
        - eslint.validate(默认只校验js)
        - 错误修复 editor.codeActionsOnSave
        - 状态栏中显示eslint "eslint.alwaysShowStatus": true
        - 状态栏不显示警告信息 "eslint.quiet": true

<!-- https://github.com/microsoft/vscode-eslint#settings-migration -->

# 集成Prettier

## 功能

    只是代码格式的校验（并格式化代码），不会对代码质量进行校验

* Prettier 的配置可以来源于三处，按优先级排列
    1. Prettier configuration file
    2.  editorconfig
    3. Visual Studio Code Settings
* 集成方式
    1.  prettier 规则对 eslint 规则的进行覆盖

``` 

``` JS
// JavaScript
{
  "extends": [
    ...,
    "已经配置的规则",
    "plugin:prettier/recommended"
  ]
}
```

# 限制提交

    1. husky - 对所有提交对内容进行校验
    2. lint-staged - 对修改对内容

``` 
// package.json

"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  // src 目录下任意文件有改动，都使用 prettier --write 格式化之后再提交
  "src/**/*.*": [
    "prettier --write",
    "git add"
  ]
}
```
