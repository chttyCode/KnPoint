"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 1.模块VS命名空间
 *  模块：
 *      模块是TS中外部模块的简称，侧重于代码和复用
 *      模块在期自身的作用域里执行，而不是在全局作用域里
 *      一个模块里的变量、函数、类等在外部是不可见的，除非你把它导出
 *      如果想要使用一个模块里导出的变量，则需要导入
 *  命名空间：
 *      在代码量较大的情况下，为了避免命名空间冲突，可以将相似的函数、类、接口放置到命名空间内
 *      命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象，命名空间内通过export向外导出
 *      命名空间是内部模块，主要用于组织代码，避免命名冲突
 */
var TOM;
(function (TOM) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        Dog.prototype.eat = function () { console.log('TOM dog'); };
        return Dog;
    }());
    TOM.Dog = Dog;
})(TOM = exports.TOM || (exports.TOM = {}));
var home;
(function (home) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        Dog.prototype.eat = function () { console.log('My dog'); };
        return Dog;
    }());
    home.Dog = Dog;
})(home = exports.home || (exports.home = {}));
var TOM_dog = new TOM.Dog();
TOM_dog.eat();
var home_dog = new home.Dog();
home_dog.eat();
$2('#root').click();
console.log($2('#root').width);
var colorsArr = [
    colors.red,
    colors.yellow,
    colors.blue,
];
/**
 * 3.类型声明文件
 *     我们可以把类型声明放在一个单独的类型声明文件中
 *     可以在类型声明文件中使用类型声明
 *     文件命名规范为*.d.ts
 *     观看类型声明文件有助于了解库的使用方式
 */
// 自己编写声明文件 types/jquery.d.ts
$.ajax('getUser', {});
//第三方声明文件
/**
 * 可以安装使用第三方的声明文件
 * @types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
 * JavaScript 中有很多内置对象，它们可以在 TypeScript 中被当做声明好了的类型
 * https://github.com/Microsoft/TypeScript/tree/master/src/lib
 * 这些内置对象的类型声明文件，就包含在TypeScript 核心库的类型声明文件中
 */
/**
 * 3.1 自己编写第三方库声明文件
 * 如果配置了paths,那么在引入包的的时候会自动去paths目录里找类型声明文件
 * 在 tsconfig.json 中，我们通过 compilerOptions 里的 paths 属性来配置路径映射
 * paths是模块名到基于baseUrl的路径映射的列表
 */
/**
 * 3.2 安装声明文件
 * npm 查找路径
 * node_modules/jquery/package.json=>"types":"types/xxx.d.ts"
 * node_modules/jquery/index.d.ts
 * node_modules/@types/jquery/index.d.ts
 */
