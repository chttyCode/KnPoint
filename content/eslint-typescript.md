# typescript 项目中使用 eslint+prettier

> tslint vs eslint : eslint has a more performant architecture than TSLint the TypeScript core team will only be focusing on ESLint

- eslint+typescript

  - eslint: 核心 ESLint lint 库
  - @typescript-eslint/parser: 允许 ESLint 检测 TypeScript 代码的解析器
  - @typescript-eslint/eslint-plugin: 包含一组特定于 TypeScript 的 ESLint 规则的插件
  - 安装依赖

  ```js
  yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
  ```

  - add .eslintrc

  ```json
  module.exports = {
    parser: "@typescript-eslint/parser", // 指定ESLint解析器
    parserOptions: {
      ecmaVersion: 2020, // 允许解析2020 ECMAScript特性
      sourceType: "module", // 允许使用导入
      ecmaFeatures: {
        jsx: true // 允许对JSX进行解析
      }
    },
    settings: {
      react: {
        version: "detect" //  自动检测react版本
      }
    },
    extends: [
      "plugin:react/recommended", // 使用@eslint-plugin-react推荐的规则
      "plugin:@typescript-eslint/recommended" // 使用@typescript-eslint/eslint-plugin推荐的规则
    ],
    rules: {
      // 放置来指定ESLint规则。可用于覆盖从扩展配置中指定的规则
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
  };
  ```

  - with react
    - add eslint-plugin-react
    ```js
    yarn add eslint-plugin-react -D
    ```
    - update .eslintrc
    ```json
      module.exports = {
        parser: "@typescript-eslint/parser",
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: "module",
          ecmaFeatures: {
            jsx: true
          }
        },
        settings: {
          react: {
            version: "detect"
          }
        },
        extends: [
          "plugin:react/recommended",
          "plugin:@typescript-eslint/recommended" /
        ],
        rules: {
        },
      };
    ```

- add prettier
  - 安装依赖
    - prettier:核心 prettier 库
    - eslint-config-prettier:禁用可能与 prettier 冲突的 ESLint 规则
    - eslint-plugin-prettier:作为 ESLint 规则运行 prettier
    ```js
      yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
    ```
    - .prettierrc.js
    ```js
    module.exports = {
      semi: true,
      trailingComma: "all",
      singleQuote: true,
      printWidth: 120,
      tabWidth: 4,
    };
    ```
    - update .eslintrc.js
    ```json
    module.exports = {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      },
      settings: {
        react: {
          version: "detect"
        }
      },
      extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",  // prettier8.0.0之后使用 ‘prettier’ 使用ESLint -config-prettier来禁用@typescript-eslint/ ESLint -plugin中与prettier冲突的ESLint规则
        "plugin:prettier/recommended" // 启用eslint-plugin-prettier和eslint-config-prettier。这将把错误显示为ESLint错误。确保这始终是extends数组中的最后一个配置。
      ],
      rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      },
    };
    ```
    > plugin:prettier/recommended 需要在 extends 的最后
    > prettier 8.0.0 的优化https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
- autofix in vscode

```js
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
  }
```

- package.json scripts

```js
{
  "scripts": {
    "lint": "eslint '*/**/*.{js,ts,tsx}' --quiet --fix"
  }
}
```

- committed
  - husk v6.0 有破坏性更新
    - < v6.0 存在的问题
      - husky 的工作方式:为了能够让用户设置任何类型的 git hooks 都能正常工作，husky 不得不创建所有类型的 git hooks。这样在 git 工作的每个阶段都会调用 husky 所设置的脚本，在这个脚本中 husky 会检查用户是否配置该 hook，如果有就运行用户配置的命令，如果没有就继续往下执行。
      - 缺点
        - 即使用户没有设置任何 git hook，husky 也向 git 中添加了所有类型的 git hook。
        - husky 需要在 git hooks & husky 的配置中保持钩子同步
    - v6.0
      - 工作方式
        - 新版的 husky 使用了从 git 2.9 开始引入的一个新功能 core.hooksPath。
        - core.hooksPath 可以让你指定 git hooks 所在的目录而不是使用默认的 git hooks
        - 使用 husky install 将 git hooks 的目录指定为.husky/
        - 使用 husky add 命令向.husky/中添加 hook。
      - 优点
        - 只需要维护指定的.husky/一个地方，不存在保持同步钩子的问题
      - 使用方式
        - npm install -D husky
        - 在 packgae.json 中添加 prepare 脚本,prepare 脚本会在 npm install（不带参数）之后自动执行,husky install 创建&指定 git hooks
        ```js
        {
          "scripts": {
            "prepare": "husky install"
          }
        }
        ```
        - 添加 git hooks 命令
          - pre-commit
          ```js
            npx husky add .husky/pre-commit "npm run test"
          ```
          - commit-msg 在 v6.0.0husky 中使用$1替代$HUSKY_GIT_PARAMS。
          ```js
          npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
          ```
  - < husky v6.0.0 配置
    ```js
    {
      "husky": {
          "hooks": {
              "pre-commit": "lint-staged"
          }
      },
      "lint-staged": {
          "*.{js,ts,tsx}": [
              "eslint --fix"
          ]
      }
    }
    ```

> https://zhuanlan.zhihu.com/p/366786798

> "eslint.trace.server": "verbose", eslint 日志

> commit with the --no-verify flag. 可以跳过 lint 提交

> on a continuous integration (CI) server: eslint '_/\*\*/_.{js,ts,tsx}' --quiet （依然需要 lint）

```

```
