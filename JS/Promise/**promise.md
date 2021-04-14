## 异步 && 回调
JavaScript 主机（host）环境提供了许多函数，这些函数允许我们计划 异步 行为（action）。换句话说，我们现在开始执行的行为，但它们会在稍后完成。

例如：setTimeOut、加载js脚本

以加载脚本为例
```
function loadScript(src) {
  // 创建一个 <script> 标签，并将其附加到页面
  // 这将使得具有给定 src 的脚本开始加载，并在加载完成后运行
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

loadScript('src/myTest.js') // 这个脚本有 "function newFunction() {…}", 脚本加载是“异步”调用的，因为它从现在开始加载，但是在这个加载函数执行完成后才运行。
... * // 不会等到脚本加载完成才执行

newFunction(); // 没有这个函数！

如果我们想加载完脚本后立即执行，该函数，怎么办呢？

浏览器是没有提供跟踪加载完成的方法。不过，可以通过回调来实现
```

**回调**
1. callback中，如何跟踪 error呢
```
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // 处理 error
  } else {
    // 脚本加载成功
  }
});
```

再次强调，我们在 loadScript 中所使用的方案其实很普遍。它被称为“Error 优先回调（error-first callback）”风格。

约定是：

- callback 的第一个参数是为 error 而保留的。一旦出现 error，callback(err) 就会被调用。
- 第二个参数（和下一个参数，如果需要的话）用于成功的结果。此时 callback(null, result1, result2…) 就会被调用。
因此，单一的 callback 函数可以同时具有报告 error 和传递返回结果的作用。


如果多层回调，会形成回调地狱(厄运金字塔)

## Promise
Promise 就是为了解决“回调地狱”而生的。
.then（handler）:  确切地说，处理程序（handler）返回的不完全是一个 promise，而是返回的被称为 “thenable” 对象 — 一个具有方法 .then 的任意对象。它会被当做一个 promise 来对待。

### 1. thenable
首先需要了解下 then 函数式怎么实现的?

.then(handler) 中所使用的处理程序（handler）可以创建并返回一个 promise。

确切地说，处理程序（handler）返回的不完全是一个 promise，而是返回的被称为 “thenable” 对象 — 一个具有方法 .then 的任意对象。它会被当做一个 promise 来对待。
```
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // 1 秒后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000ms 后显示 2
```

### 2. promise链
在实际使用用，then里面，为了使链可扩展，通常需要返回Promise，参考：https://zh.javascript.info/promise-chaining

```
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

})
```
1 → 2 ，但是现在在每次 alert 调用之间会有 1 秒钟的延迟。

### 3. 错误处理
Promise 的执行者（executor）和 promise 的处理程序（handler）周围有一个“隐式的 try..catch”。如果发生异常，它（译注：指异常）就会被捕获，并被视为 rejection 进行处理。

例如，下面这段代码：
```
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!
```
……与下面这段代码工作上完全相同：

```
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!
```

这里 .catch 块正常完成。所以下一个成功的 .then 处理程序（handler）就会被调用。
```
// 执行流：catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

那什么时候，会不一样呢？
```
// demo1: 会走到catch吗
new Promise((reslove, reject) => {
    setTimeout(()=> {
        reject('error 啦呀')
    }, 1000)
}).catch(error => {
    console.log('error===', error) // 会走到catch
})

// demo2: 
new Promise((reslove, reject) => {
    setTimeout(()=> {
        throw new error('error 了呀')
    }, 1000)
}).catch(error => {
    console.log('error===', error) // 不会走到catch
})

在同步代码中，throw error 与 reject 是相同的，在异步中是不同的，可参考：https://zh.javascript.info/try-catch
```

### 4. 常用方法
##### (1) Promise.all(iterable) : 并行多个Promise.
通常，Promise.all(...) 接受可迭代对象（iterable）的 promise（大多数情况下是数组）。但是，如果这些对象中的任意一个都不是 promise，那么它将被“按原样”传递给结果数组。
```
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```
并且如果有一个Promise reject了，那么完全忽略列表中其他的 promise。

##### (2) Promise.allSettled(iterable) 
等待所有的 promise 都被 settle，无论结果如何 ，用法如下：
```
let urls = ['https://api.github.com/users/iliakan'];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { 
     ...
  });

 // reslut: {status: 'fulfilled', value: ...response...}
```

##### (3) Promise.race(iterable)
与 Promise.all 类似，但只等待第一个 settled 的 promise 并获取其结果（或 error）

###### (4) Promise.resolve、Promise.reject
Promise.resolve(value)  —— 使用给定 value 创建一个 resolved 的 promise。
Promise.reject(error) —— 使用给定 error 创建一个 rejected 的 promise

### 总结
1. 在任何情况下我们都应该有 unhandledrejection 事件处理程序（用于浏览器，以及其他环境的模拟），以跟踪未处理的 error 并告知用户（可能还有我们的服务器）有关信息，以使我们的应用程序永远不会“死掉”。
```
window.addEventListener('unhandledrejection', function(event) {
  // 这个事件对象有两个特殊的属性：
  alert(event.promise); // [object Promise] - 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! - 未处理的 error 对象
});

new Promise(function() {
  throw new Error("Whoops!");
}); // 没有用来处理 error 的 catch
```

### 小测
1. 打印出什么
```
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
// 不，它不会被触发：
```


