## 特殊的内建对象：AbortController
它不仅可以中止 fetch，还可以中止其他异步任务。

let controller = new AbortController();

控制器是一个极其简单的对象。

它具有单个方法 abort()，
和单个属性 signal，我们可以在这个属性上设置事件监听器。
当 abort() 被调用时：

controller.signal 就会触发 abort 事件。
controller.signal.aborted 属性变为 true。

```
let controller = new AbortController();
let signal = controller.signal;

// 可取消的操作这一部分
// 获取 "signal" 对象，
// 并将监听器设置为在 controller.abort() 被调用时触发
signal.addEventListener('abort', () => alert("abort!"));

// 另一部分，取消（在之后的任何时候）：
controller.abort(); // 中止！

// 事件触发，signal.aborted 变为 true
alert(signal.aborted); // true
```

## 与 fetch 一起使用

为了能够取消 fetch，请将 AbortController 的 signal 属性作为 fetch 的一个可选参数（option）进行传递：

详见：https://zh.javascript.info/fetch-abort