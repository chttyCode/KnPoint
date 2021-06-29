# MonoRepo

- 是什么
  - 是管理项目代码的一个方式，指在一个项目仓库(repo)中管理多个模块/包(package)
- 为什么
  - 存在开发中的瓶颈
    - 如何能够在修改项目 B 代码后及时将改动后在项目 A 中同步？ 在项目 A 发布上线后，如何以一种优雅的方式解决项目 A，B 版本升级后的版本同步问题？
    - 基本开发过的项目都是采用 MultiRepo 的方式
      - 共享代码的方式
        - npm 的私包
        - submodule
      - 优点
        - 模块管理的自由度高
        - 仓库体积小
      - 缺点
        - 版本更新繁琐，需要对所有使用模块手动进行更新
        - 无追踪包依赖项
- MonoRepo 的方式
  - 缺点
    - 仓库体积大
    - 项目权限设置困难，无法跨部门等
  - 优点
    - 版本管理
    - 依赖追踪管理
    - 避免重复安装包
- MonoRepo 使用

  - package.json 中新增 workspaces 指定子目录， 设置 private 属性为 true，避免发包
    - workspace 允许我们使用 monorepo 的形式来管理项目
    - 在安装 node_modules 的时候它不会安装到每个子项目的 node_modules 里面，而是直接安装到根目录下面，这样每个子项目都可以读取到根目录的 node_modules
      - 给某个项目添加依赖 yarn workspace 项目名 add commander
    - 整个项目只有根目录下面会有一份 yarn.lock 文件。子项目也会被 link 到 node_modules 里面，这样就允许我们就可以直接用 import 导入对应的项目
    - yarn.lock 文件是自动生成的,也完全 Yarn 来处理.yarn.lock 锁定你安装的每个依赖项的版本，这可以确保你不会意外获得不良依赖
    - 根目录添加workspaces,设置private
    - 通过yarn install 链接项目依赖

  ```js
  {
    "name": "root",
    "private": true, // 私有的,用来管理整个项目,不会被发布到npm
    "workspaces": [  // yarn（1.0 以上）或 npm（7.0 以上）
        "packages/\*"
    ]

    }
  ```

  - 项目中维护 packages 目录

> https://segmentfault.com/a/1190000039157365

```

```
