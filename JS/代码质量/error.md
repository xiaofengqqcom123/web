apm 通常使用 unhandledrejection 和 window.onerror 捕获error信息


## 错误栈
> in script

拿不到错误栈：
跨域访问js，无cors header，浏览器处于安全策略，拿不到错误栈

## Error 对象
error 对象具有两个主要属性：
- name: error 名称
- message: error 的详细文字描述
- stack: 当前的调用栈：用于调试目的的一个字符串，其中包含有关导致 error 的嵌套调用序列的信息。

## try...catch 同步工作
如果在“计划的（scheduled）”代码中发生异常，例如在 setTimeout 中，则 try..catch 不会捕获到异常：
```
try {
  setTimeout(function() {
    noSuchVariable; // 脚本将在这里停止运行
  }, 1000);
} catch (e) {
  alert( "won't work" );
}
```