"use strict";
/**
 * 接口
 *  TypeScript的核心原则之一是对值所具有的结构进行类型检查
 *  它有时被称做“鸭式辨型法”或“结构性子类型化”。
 *  接口一方面可以在面向对象编程中表示为行为的抽象，另外可以用来描述对象的形状
 *  接口就是把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
 *  一个类可以继承另一个类并实现多个接口
 *  接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
 *  一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只能有一个父类
 */
Object.defineProperty(exports, "__esModule", { value: true });
var student = {
    speak: function () { },
    name: name,
};
var man = /** @class */ (function () {
    function man() {
    }
    man.prototype.eat = function () { };
    return man;
}());
var p1 = {
    id: 1,
    name: 'ts',
    age: 10
};
var GoodStudent = /** @class */ (function () {
    function GoodStudent() {
    }
    GoodStudent.prototype.speak = function () {
        console.log('english');
    };
    GoodStudent.prototype.speakChinese = function () {
        console.log('chinese');
    };
    return GoodStudent;
}());
var cost = function (price) {
    return price * .8;
};
var arr = ['t1', 't2'];
console.log(arr);
var obj = { name: 'tom', addr: 'nj' };
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.speak = function (words) {
        console.log(words);
    };
    return Student;
}());
/**
 * 8. 构造函数的类型
 *  使用interface里特殊的new()关键字来描述类的构造函数类型
 */
var Student2 = /** @class */ (function () {
    function Student2(name, age) {
        this.age = age;
        this.name = name;
    }
    return Student2;
}());
function createStudent(clazz, name, age) {
    return new clazz(name, age);
}
var a = createStudent(Student2, 'zhufeng', 18);
console.log(a.name);
