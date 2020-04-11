"use strict";
/**
 * 范型
 *  泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 1.泛型函数
 */
//  function createArray(length: number, value: any): Array<any> {
//     let result: any = [];
//     for (let i = 0; i < length; i++) {
//       result[i] = value;
//     }
//     return result;
//   }
//   let result = createArray(3,'x');
//   console.log(result);
function createArray2(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
var result = createArray2(3, 'x');
console.log(result);
/**
 * 2.类数组
 */
function sum() {
    var args = arguments;
    for (var i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
}
var root = document.getElementById('root');
var children = root.children;
children.length;
var nodeList = root.childNodes;
nodeList.length;
/**
 * 3.泛型类
 */
var MyArray = /** @class */ (function () {
    function MyArray() {
        this.list = [];
    }
    MyArray.prototype.add = function (value) {
        this.list.push(value);
    };
    return MyArray;
}());
var arr = new MyArray();
arr.add(1);
arr.add(2);
arr.add(0);
var add = function (a, b) {
    return a;
};
add(1, 2);
// let add2:Calculate2<string>= function<T>(a:T,b:T):T{
//     return a;
// }
var add2 = function (a, b) {
    return a;
};
add2('1', '2');
/**
 * 9.多个类型参数
 */
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
var swapped = swap(['a', 1]);
/**
 * 10.默认泛型类型
 */
function createArray3(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
//   let result2 = createArray3<string>(3,'x');
var result2 = createArray3(3, 'x');
console.log(result2);
//可以让泛型继承一个接口
function logger2(val) {
    console.log(val.length);
}
logger2('ts');
var c1 = { list: ['1'] };
var c2 = [1];
