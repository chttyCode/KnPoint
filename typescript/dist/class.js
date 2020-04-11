"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
/**
 * 1.定义类
 *  1. strictPropertyInitialization :类属性初始化检测
 */
// class Person{
//     name:string //属性“name”没有初始化表达式，且未在构造函数中明确赋值
//     getName():void{
//         console.log(this.name);
//     }
// }
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.getName = function () {
        console.log(this.name);
    };
    return Person;
}());
/**
 * 2.存取器
 */
var User = /** @class */ (function () {
    function User(myname) {
        this.myname = myname;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.myname;
        },
        set: function (value) {
            this.myname = value;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
/**
 * 3.参数属性
 */
var Person2 = /** @class */ (function () {
    function Person2(name) {
        this.name = name;
    }
    Person2.prototype.getName = function () {
        console.log(this.name);
    };
    return Person2;
}());
/**
 * 4.readonly
 *  4.1 只能在初始化赋值
 *  4.2 interface、type、 class 上的属性标识也可为 readonly
 *  4.3 readonly 实际上只是在编译阶段进行代码检查。而 const 则会在运行时检查
 */
var Person4 = /** @class */ (function () {
    function Person4(name) {
        this.name = name;
    }
    Person4.prototype.getName = function () {
        console.log(this.name);
    };
    return Person4;
}());
/**
 * 6.类里面的修饰符
 *  6.1 public 类里面 子类 实例里面都能访问
 *  6.2 protected 类里面 子类 可以访问，实例不能访问
 *  6.3 private 类里面可以访问 子类 实例都不能访问
 */
var Father = /** @class */ (function () {
    function Father(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
    Father.prototype.getName = function () {
        return this.name;
    };
    Father.prototype.setName = function (name) {
        this.name = name;
    };
    return Father;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name, age, money) {
        return _super.call(this, name, age, money) || this;
    }
    Child.prototype.desc = function () {
        // console.log(`${this.name} ${this.age} ${this.money}`);//属性“money”为私有属性，只能在类“Father”中访问
    };
    return Child;
}(Father));
/**
 * 7.静态属性 静态方法
 */
var Person5 = /** @class */ (function () {
    function Person5(name) {
        this.name = name;
    }
    Person5.getClassName = function () {
        return Person5.addr;
    };
    Person5.addr = 'nj';
    return Person5;
}());
console.log(Person5.addr);
console.log(Person5.getClassName());
/**
 * 8.装饰器
 *  8.1 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
 *  8.2 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
 *  8.3 装饰器的写法分为普通装饰器和装饰器工厂
 */
/**
 *  8.4 类装饰器:experimentalDecorators:Enables experimental support for ES7 decorators.
 *      类装饰器在类声明之前声明，用来监视、修改或替换类定义
 */
var a;
(function (a) {
    function enhancer(target) {
        target.prototype.name = 'kongds';
        target.prototype.eat = function () {
            console.log('eat');
        };
    }
    var Person6 = /** @class */ (function () {
        function Person6() {
        }
        Person6 = __decorate([
            enhancer
        ], Person6);
        return Person6;
    }());
    var p = new Person6();
    console.log(p.name);
    p.eat();
})(a || (a = {}));
/**
 *    8.5  属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数
 *         1.属性装饰器用来装饰属性
 *              第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 *              第二个参数是属性的名称
 *         2.属性装饰器用来装饰方法
 *              第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 *              第二个参数是方法的名称
 *              第三个参数是方法描述符
 */
var d;
(function (d) {
    function upperCase(target, propertyKey) {
        var value = target[propertyKey];
        var getter = function () {
            return value;
        };
        var setter = function (newVal) {
            value = newVal.toUpperCase();
        };
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
    function noEnumerable(target, property, descriptor) {
        console.log('target.getName', target.getName);
        console.log('target.getAge', target.getAge);
        descriptor.enumerable = true;
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'typescript';
        }
        Person.prototype.getName = function () {
            console.log(this.name);
        };
        Person.age = 10;
        Person.addr = 'nj';
        __decorate([
            upperCase
        ], Person.prototype, "name", void 0);
        __decorate([
            noEnumerable
        ], Person.prototype, "getName", null);
        __decorate([
            upperCase
        ], Person, "addr", void 0);
        return Person;
    }());
})(d || (d = {}));
/**
 * 8.6 参数装饰器
 *  会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元数据
 *      第1个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象
 *      第2个参数的名称
 *      第3个参数在函数列表中的索引
 */
var f;
(function (f) {
    function addAge(target, methodName, paramsIndex) {
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.age = 10;
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (username, password) {
            console.log(this.age, username, password);
        };
        __decorate([
            __param(1, addAge)
        ], Person.prototype, "login", null);
        return Person;
    }());
    var p = new Person();
    p.login('ts', '123456');
})(f || (f = {}));
/**
 * 8.7 装饰器执行顺序
 *       有多个参数装饰器时：从最后一个参数依次向前执行
 *       方法和方法参数中参数装饰器先执行。
 *       类装饰器总是最后执行
 *       方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行
 */
var e;
(function (e) {
    function Class1Decorator() {
        return function (target) {
            console.log("类1装饰器");
        };
    }
    function Class2Decorator() {
        return function (target) {
            console.log("类2装饰器");
        };
    }
    function MethodDecorator() {
        return function (target, methodName, descriptor) {
            console.log("方法装饰器");
        };
    }
    function Param1Decorator() {
        return function (target, methodName, paramIndex) {
            console.log("参数1装饰器");
        };
    }
    function Param2Decorator() {
        return function (target, methodName, paramIndex) {
            console.log("参数2装饰器");
        };
    }
    function PropertyDecorator(name) {
        return function (target, propertyName) {
            console.log(name + "属性装饰器");
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'ts';
            this.age = 10;
        }
        Person.prototype.greet = function (p1, p2) { };
        __decorate([
            PropertyDecorator('name')
        ], Person.prototype, "name", void 0);
        __decorate([
            PropertyDecorator('age')
        ], Person.prototype, "age", void 0);
        __decorate([
            MethodDecorator(),
            __param(0, Param1Decorator()), __param(1, Param2Decorator())
        ], Person.prototype, "greet", null);
        Person = __decorate([
            Class1Decorator(),
            Class2Decorator()
        ], Person);
        return Person;
    }());
})(e || (e = {}));
/**
name属性装饰器
age属性装饰器
参数2装饰器
参数1装饰器
方法装饰器
类2装饰器
类1装饰器
 */
/**
 * 9. 抽象类
 *     抽象描述一种抽象的概念，无法被实例化，只能被继承
 *     无法创建抽象类的实例
 *     抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
 */
var Person8 = /** @class */ (function () {
    function Person8() {
    }
    return Person8;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student.prototype.speak = function () {
        console.log('english');
    };
    return Student;
}(Person8));
/**
 * 抽象类 vs 接口
 *  1. 不同类之间公有的属性或方法，可以抽象成一个接口（Interfaces）
 *  2.抽象类是子类的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
 *  3.抽象类不能new，其中能够实现方法和初始化属性，而接口仅能够用于描述,既不提供方法的实现，也不为属性进行初始化
 *  4.一个类可以继承一个类或抽象类，但可以实现多个接口
 *  5.抽象类也可以实现接口
 */
/**
 * 10.抽象方法
 *      不含具体实现
 *      只能出现在抽象类中
 *      可以进行不同的实现
 */
var Person9 = /** @class */ (function () {
    function Person9() {
    }
    return Person9;
}());
var Student2 = /** @class */ (function (_super) {
    __extends(Student2, _super);
    function Student2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student2.prototype.speak = function () {
        console.log('english');
    };
    return Student2;
}(Person9));
var Student3 = /** @class */ (function (_super) {
    __extends(Student3, _super);
    function Student3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student3.prototype.speak = function () {
        console.log('Chinese');
    };
    return Student3;
}(Person9));
