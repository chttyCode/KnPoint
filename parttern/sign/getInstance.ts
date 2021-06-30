export { }
// 这种使用方式有缺点，就是说必须要告诉 使用者通过getInstance方法得到单例
class Window {
    private static instance: Window;
    private constructor() {

    }
    public static getInstance() {
        if (!Window.instance) {
            Window.instance = new Window();
        }
        return Window.instance;
    }
}
//把Window做成单例
let w1 = Window.getInstance();
let w2 = Window.getInstance();
console.log(w1 === w2);