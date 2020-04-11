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
class Person{
    name:string;
    constructor(name:string){
        this.name=name
    }
    getName():void{
        console.log(this.name);
    }
}

/**
 * 2.存取器
 */
class User {
    myname:string;
    constructor(myname: string) {
        this.myname = myname;
    }
    get name() {//prototype
        return this.myname;
    }
    set name(value) {
        this.myname = value;
    }
}
/**
 * 3.参数属性 
 */
class Person2{
    constructor(public name:string){}
    getName():void{
        console.log(this.name);
    }
}
/**
 * 4.readonly 
 *  4.1 只能在初始化赋值
 *  4.2 interface、type、 class 上的属性标识也可为 readonly
 *  4.3 readonly 实际上只是在编译阶段进行代码检查。而 const 则会在运行时检查
 */
class Person4{
    readonly name:string;  //定义实例的属性，默认省略public修饰符
    constructor(name:string){
        this.name=name
    }
    getName():void{
        console.log(this.name);
    }
}

/**
 * 6.类里面的修饰符
 *  6.1 public 类里面 子类 实例里面都能访问
 *  6.2 protected 类里面 子类 可以访问，实例不能访问
 *  6.3 private 类里面可以访问 子类 实例都不能访问
 */

class Father {
    public name: string;  
    protected age: number; 
    private money: number; 
    constructor(name:string,age:number,money:number) {//构造函数
        this.name=name;
        this.age=age;
        this.money=money;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Child extends Father{
    constructor(name:string,age:number,money:number) {
        super(name,age,money);
    }
    desc() {
        // console.log(`${this.name} ${this.age} ${this.money}`);//属性“money”为私有属性，只能在类“Father”中访问
    }
}
/**
 * 7.静态属性 静态方法
 */
class Person5 {
    static addr='nj';
    static getClassName() {
        return Person5.addr;
    }
    public name: string;
    constructor(name:string) {//构造函数
        this.name=name;
    }

}
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
namespace a {
    interface Person6 {
        name: string;
        eat: any
    }
    function enhancer(target: any) {
        target.prototype.name = 'kongds';
        target.prototype.eat = function () {
            console.log('eat');
        }
    }
    @enhancer
    class Person6 {
        constructor() { }
    }
    let p: Person6 = new Person6();
    console.log(p.name);
    p.eat();
}
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

namespace d {
    function upperCase(target: any, propertyKey: string) {
        let value = target[propertyKey];
        const getter = function () {
            return value;
        }
        const setter = function (newVal: string) {
            value = newVal.toUpperCase()
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
    function noEnumerable(target: any, property: string, descriptor: PropertyDescriptor) {
        console.log('target.getName', target.getName);
        console.log('target.getAge', target.getAge);
        descriptor.enumerable = true;
    }
    class Person {
        @upperCase
        name: string = 'typescript'
        public static age: number = 10
        @upperCase
        public static addr: string = 'nj'
        constructor() { }
        @noEnumerable
        getName() {
            console.log(this.name);
        }
    }
}
/**
 * 8.6 参数装饰器
 *  会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元数据
 *      第1个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象
 *      第2个参数的名称
 *      第3个参数在函数列表中的索引
 */
namespace f {
    interface Person {
        age: number;
    }
    function addAge(target: any, methodName: string, paramsIndex: number) {
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.age = 10;
    }
    class Person {
        login(username: string, @addAge password: string) {
            console.log(this.age, username, password);
        }
    }
    let p = new Person();
    p.login('ts', '123456')
}
/**
 * 8.7 装饰器执行顺序
 *       有多个参数装饰器时：从最后一个参数依次向前执行
 *       方法和方法参数中参数装饰器先执行。
 *       类装饰器总是最后执行
 *       方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行
 */

namespace e {
    function Class1Decorator() {
        return function (target: any) {
            console.log("类1装饰器");
        }
    }
    function Class2Decorator() {
        return function (target: any) {
            console.log("类2装饰器");
        }
    }
    function MethodDecorator() {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
            console.log("方法装饰器");
        }
    }
    function Param1Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
            console.log("参数1装饰器");
        }
    }
    function Param2Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
            console.log("参数2装饰器");
        }
    }
    function PropertyDecorator(name: string) {
        return function (target: any, propertyName: string) {
            console.log(name + "属性装饰器");
        }
    }

    @Class1Decorator()
    @Class2Decorator()
    class Person {
        @PropertyDecorator('name')
        name: string = 'ts';
        @PropertyDecorator('age')
        age: number = 10;
        @MethodDecorator()
        greet(@Param1Decorator() p1: string, @Param2Decorator() p2: string) { }
    }
}
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
 abstract class Person8 {
    name!:string;
    abstract speak():void;
}
class Student extends Person8{
    speak(){
        console.log('english');
    }
}
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

abstract class Person9{
    abstract speak():void;
}
class Student2 extends  Person9{
    speak(){
        console.log('english');
    }
}
class Student3 extends  Person9{
    speak(){
        console.log('Chinese');
    }
}

 export {}