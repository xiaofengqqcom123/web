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


