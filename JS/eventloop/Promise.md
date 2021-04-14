### Promise 与 Microtask queue
Promise 的处理程序（handlers）.then、.catch 和 .finally 都是异步的。

```
let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

alert("code finished"); // 这个 alert 先显示
```

Promise 的 handlers，属于微任务队列（Microtask queue）
- 队列（queue）是先进先出的：首先进入队列的任务会首先运行。
- 只有在 JavaScript 引擎中没有其它任务在运行时，才开始执行任务队列中的任务。


### 未处理的rejection
如果一个 promise 的 error 未被在微任务队列的末尾进行处理，则会出现“未处理的 rejection”。

看一个问题
```
let promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch(err => alert('caught')), 1000);

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```
现在，如果我们运行上面这段代码，我们会先看到 Promise Failed!，然后才是 caught。

如果我们并不了解微任务队列，我们可能会想：“为什么 unhandledrejection 处理程序（handler）会运行？我们已经捕获（catch）并处理了 error！”

但是现在我们知道了，当微任务队列中的任务都完成时，才会生成 unhandledrejection：引擎会检查 promise，如果 promise 中的任意一个出现 “rejected” 状态，unhandledrejection 事件就会被触发。

在上面这个例子中，被添加到 setTimeout 中的 .catch 也会被触发。只是会在 unhandledrejection 事件出现之后才会被触发，所以它并没有改变什么（没有发挥作用）。