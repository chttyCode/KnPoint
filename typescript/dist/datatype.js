"use strict";
/**
 * 数据类型
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
//1. string
var str = 'typescipt';
//2.number
var num = 18;
//3. boolean
var useTypescript = true;
//4.array
var arr2 = [4, 5, 6];
var arr3 = [7, 8, 9];
/**
 * 5.tuple=>元组（ Tuple ）表示一个已知数量和类型的数组
 * vs array
 * tuple                    array
 * 每一项可以是不同的类型       每一项都是同一种类型
 * 有预定义的长度              没有长度限制
 * 用于表示一个固定的结构	    用于表示一个列表
 */
var person = ['kongdesong', 18];
/**
 * 6.enume  =>预知一个变量的所有可能值，用自然语言表示每一个值  eg:性别
 *    6.1
 *                  数字枚举  字符串枚举
 *         反向映射     1        0
 *    6.2 常量枚举
 *        1. 编译阶段被删除
 *        2. 只能通过字面量来调用
 */
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
var student = Gender.BOY;
console.log(Gender.BOY); //1
console.log(Gender[1]); //BOY
var myColors = [0 /* Red */, 1 /* Yellow */, 2 /* Blue */];
console.log(myColors);
/**
 * 7. any  =>//@ts-ignore  非空断言 ！
 *  1. 就是可以赋值给任意类型
 *  2. 类型转换遇到困难时
 *  3. 数据结构太复杂难以定义
 *
 */
var root = document.getElementById('root'); //HTMLElement|null
root.style.color = 'red';
/**
 * 8. null 和 undefined
 *  8.1.null 和 undefined 是其它类型的子类型，可以赋值给其它类型  strictNullChecks(启用严格null检测)
 */
var x;
x = 1;
// x = undefined;    
// x = null; 
/**
 * 9 void 类型
 *  9.1 表示没有任何类型
 *  9.2 当一个函数没有返回值时，TS 会认为它的返回值是 void 类型
 */
function greet(name) {
    return;
}
//  function greet(name:string):void{ //ok
//     return undefined 
// }
// function greet(name:string):void{  //error   strictNullChecks
//     return null 
// }
/**
 * 10.never类型
 *  never是其它类型的子类型，代表不会出现的值
 */
function connect() {
    while (true) { }
}
function error() {
    throw Error('error');
}
/**
 * never 和 void 的区别
 *  void 可以被赋值为 null 和 undefined的类型。 never 则是一个不包含值的类型。
 *  拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
 */
/**
 * 11.类型推论
 *  11.1 自动推导出值的类型的能力
 *  11.2 定义时未赋值就会推论成any类型
 *  11.3 如果定义的时候就赋值就能利用到类型推论
 */
var username2; //any 可以赋值为任意类型
username2 = 10;
username2 = 'zhufeng';
username2 = null;
var name3 = 'string';
// name3=1     //不能将类型“1”分配给类型“string”
/**
 * 12.联合类型
 *  12.1 联合类型（Union Types）表示取值可以为多种类型中的一种
 *  12.2 未赋值时联合类型上只能访问两个类型共有的属性和方法
 */
var name4;
// console.log(name4.toString());// 在赋值前使用了变量“name4”。
name4 = 3;
console.log(name4.toFixed(2));
name4 = 'zhufeng';
console.log(name4.length);
/**
 * 13.类型断言
 *  13.1 类型断言可以将一个联合类型的变量，指定为一个更加具体的类型
 *  13.2 不能将联合类型断言为不存在的类型
 */
var str5;
str5 = 'assert';
console.log(str5.length);
var t1 = 1;
var t2 = 'One';
var t3 = true;
