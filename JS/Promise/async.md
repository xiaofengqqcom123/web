Async/await 是以更舒适的方式使用 promise 的一种特殊语法，同时它也非常易于理解和使用

- Async 函数会返回一个 Promise 函数
- 允许在该函数内使用 await。

### 语法

**return 1**
```
async function f() {
  return 1;  // 等价于 return Promise.resolve(1)
}

f().then(alert); // 1
```

### await
await： let value = await promise;

await 后面可以是 thenable对象
```
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000ms 后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // 等待 1 秒，之后 result 变为 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

### 错误处理
错误处理本质上上与 Promise 是一致的，对于一些未被处理的error：全局事件处理程序 unhandledrejection 来捕获这类 error。

