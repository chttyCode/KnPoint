# typescript

1. typescript 是什么
   1. Typescript是由微软开发的一款开源的编程语言
   2. Typescript是Javascript的超集，遵循最新的ES5/ES6规范。TypeScript扩展了Javascript语法
   3. TypeScript更像后端Java、C#这样的面向对象语言可以让JS开发大型企业应用
   4. 越来越多的项目是基于TS的，比如VSCode、Angular6、Vue3、React16
   5. TS提供的类型系统可以帮助我们在写代码的时候提供更丰富的语法提示
   6. 在创建前的编译阶段经过类型系统的检查，就可以避免很多线上的错误
2. TypeScript安装和编译
   1. cnpm i typescript -g
   2. tsc hello.ts
   3. package.json=>script
      1. npm init -y
      2. tsc --init
      3. tsconfig.js field
         1. "target": "es5" => Specify ECMAScript target version
         2. "module": "commonjs" => Specify module code generation
         3. "strict": true => Enable all strict type-checking options
         4. "esModuleInterop": true  =>"esModuleInterop": true, /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
            1. 模块之间相互兼容
               1. import React from 'react'  commonJS  /*    This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.*/
               2. import * as React from 'react'
            2. why
               1. es6 模块的滞后性
               2. js 是没有模块  后来有了common.js规范，node提前实现并使用
      4. path 配合webpack中resolve-alias字段使用
           1. 'utils': path.join(PATHS.src, 'utils')=>"utils": ["./src/utils"](baseUrl)
3. 数据类型
   1. datatype.ts
   2. function.ts
