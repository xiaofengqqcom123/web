## 1. batchUpdate

代码 https://codesandbox.io/s/48lp729k80
预览地址：https://48lp729k80.codesandbox.io/

### 解释
https://github.com/facebook/react/issues/10231 这里有 Dan Abramov 对此的回答，大致来说就是虽然目前是这样，但是未来 React 希望做到不管里你在哪里写 setState，一个 tick 内的多次 setState 都给你合并掉。

### React 是怎样设计的
demo: 
```
function Parent() {
  let [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>
      Parent clicked {count} times
      <Child />
    </div>
  );
}

function Child() {
  let [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Child clicked {count} times
    </button>
  );
}
```
上面这样的 demo，由于点击事件冒泡的缘故，我们假设如果 react 不 batch 立即更新的话，那么点了 child button 之后的逻辑会是如下这样
```
*** 进入 react click 的事件函数 ***
·
Child (onClick) 触发点击
  - setState 修改 state
  - re-render Child 重新渲染 //   不必要的
Parent (onClick) 触发点击（冒泡）
  - setState 修改 state
  - re-render Parent 重新渲染
  - re-render Child 重新渲染 （渲染是自顶向下的，父亲更新会导致儿子更新）
*** 退出 react click 的事件函数  ***
```

从上面可以看出，第一次子组件的重新渲染完全是浪费的。

所以 React 设计成 setState 不立即触发重新渲染，而是先执行完所有的 event handler，然后用一次重新渲染完成所有更新。

简单来解释，React 的更新是基于 Transaction（事务）的，Transacation 就是给目标执行的函数包裹一下，加上前置和后置的 hook （有点类似 koa 的 middleware），在开始执行之前先执行 initialize hook，结束之后再执行 close hook，这样搭配上 isBatchingUpdates 这样的布尔标志位就可以实现一整个函数调用栈内的多次 setState 全部入 pending 队列，结束后统一 apply 了。

但是 setTimeout 这样的方法执行是脱离了事务的，react 管控不到，所以就没法 batch 了。

### 为什么 Vue 没有？
是因为 vue 采用了 nexttick 的方式，利用 EventLoop，将一个同步事件循环过程中所有修改合并，它本质上属于延迟的批量更新


【参考文章】

https://zhuanlan.zhihu.com/p/78516581