# 模块化

- 什么是模块化
  - 模块划就是按照一定的规则把代码封装成若干的相互依赖的文件并进行组合
  - 每个模块内的数据都是私有的，只向外选择性的暴露一些方法和数据与外界进行数据通信
- 模块化的意义
  - 有利于代码分享、解耦以及复用
  - 避免命名冲突
- 模块化的发展史

  - 全局变量+自执行函数

    - 缺点：无法实现自动依赖、依赖全局变量

    ```js
    let moduleA = (function () {
      let state;
      function getState() {
        return state;
      }
      return { getState };
    })();
    ```

  - AMD

    - 代表 requirejs
    - 前置依赖

    ```js
    let moduleFactory = {};
    function define(name, factory) {
      moduleFactory[name] = factory;
    }
    function require(dependencies, callback) {
      callback(
        ...dependencies.map((dependency) => moduleFactory[dependency]())
      );
    }

    define("addModule", function () {
      function add(a, b) {
        return a + b;
      }
      return {
        add,
      };
    });
    define("minusModule", function () {
      function minus(a, b) {
        return a - b;
      }
      return {
        minus,
      };
    });
    require(["addModule", "minusModule"], function (addModule, minusModule) {
      console.log(addModule.add(1, 2), minusModule.minus(3, 4));
    });
    ```

  - CMD

    - 代表 seajs
    - 一个模块就是一个文件

    ```js
    let factories = {};

    let modules = {};
    function require(name) {
      if (modules[name]) {
        return modules[name];
      }
      let factory = factories[name];
      let exports = {};
      factory(require, exports);
      modules[name] = exports;
      return exports;
    }
    function define(name, factory) {
      factories[name] = factory;
    }
    function use(name) {
      require(name);
    }
    define("addModule", function (require, exports) {
      exports.add = function (a, b) {
        return a + b;
      };
    });
    define("minusModule", function (require, exports) {
      exports.minus = function (a, b) {
        return a - b;
      };
    });
    define("index", function (require, exports) {
      var addModule = require("addModule");
      let result1 = addModule.add(1, 2);
      console.log(result1);
      var minusModule = require("minusModule");
      let result2 = minusModule.minus(1, 2);
      console.log(result2);
    });
    use("index");
    ```

  - COMMONJS

    - 服务端
    - 同步加载

    ```js
    var a = require("./a");
    var b = a.a + 2;
    module.exports = {
      b,
    };
    ```

  - UMD

    - 通用模块定义规范
    - 可以同时运行在使用 CommonJs、CMD 甚至是 AMD 的项目

    ```js
    ((root, factory) => {
      if (typeof define === "function" && define.amd) {
        //AMD
        define(["jquery"], factory);
      } else if (typeof exports === "object") {
        //CommonJS
        var $ = require("jquery");
        module.exports = factory($);
      } else {
        root.testModule = factory(root.jQuery);
      }
    })(this, ($) => {
      //todo
    });
    ```

- esModule
  ```js
  let x = 10;
  let y = 20;
  setTimeout(() => {
    x = 100;
    y = 200;
  }, 100);
  export { x };
  export default y;
  ```
