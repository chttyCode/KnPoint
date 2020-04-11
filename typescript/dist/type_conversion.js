"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var p = { name: 'tom', goSchool: function () { }, speak: function () { } };
/**
 * 2.typeof
 *  可以获取一个变量的类型
 */
var p1 = {
    name: 'tom',
    age: 10,
    gender: 'male'
};
function getName(p) {
    return p.name;
}
var FrontEndJob = {
    name: '前端工程师'
};
var interestLevel = 2;
function getValueByKey(p, key) {
    return p[key];
}
var val = getValueByKey({ name: 'tom', age: 10, gender: 'male' }, 'name');
console.log(val);
var p2 = {
    name: 'tom',
    age: 10,
    gender: 'male'
};
var p3 = {
    name: 'tom',
    age: 10,
    gender: 'male'
};
var p4 = { name: '1', age: 1 };
var e = '1';
