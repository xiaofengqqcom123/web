js运行时
JavaScript运行时维护了一组用于执行 JavaScript 代码的代理
每个代理中包含：
- 一组执行上下文的集合
- 执行上下文栈
- 主线程
- 一组可能创建用于执行 workder 的额外的线程集合
- 一个任务队列
- 一个微任务队列

消息队列
一个 JavaScript 运行时包含了一个待处理任务的消息队列。每一个任务都关联着一个用以处理这个任务的回调函数，事件循环会从消息队列中取出任务进行处理

消息队列有两种类型，microtask与macrotask，在消息队列中形成了两个队列
事件循环
1. Window 事件循环：同源的window代理的事件循环
2. Worker 事件循环：包括web worker、shared worker和service worker
3. Worklet 事件循环：worklet是web worker的轻量级版本
事件分类
HTML标准
- microtask
- macrotask
js标准
- ScriptJobs
- PromiseJobs
单个JobQueue FIFO，但ECMA没有规定多个Job Queue的执行顺序
事件循环机制
|

- 从taskQueue取出第一个task执行
- 执行栈清空
- 执行微任务检查点，循环执行微任务
- render：形成一个待渲染的文档对象列表
  - Rendering opportunities：显示器硬件限制（60Hz）、页面性能、是否可见（不可见降低到4Hz甚至更低）
  - Unnecessary rendering：更新后不会产生可见效果且动画回调为空、UA自行判断
如果带渲染列表存在内容，则进行渲染
微任务必须等待执行栈清空才会执行

为什么需要microtask？
microtask优点
- 执行时间比下一个macrotask早
- 微任务的执行不干扰其他任务
微任务会在执行任何其他事件处理、渲染或任何其他宏任务之前完成
- 微任务之间的应用程序环境基本相同
没有交互事件，没有新的渲染，没有新的网络数据
使用场景
- 在当前脚本执行后立即执行的操作
- 使一些异步操作尽快执行
microtask
Promise/mutationObserver/process.nextTick等
- 避免不必要的延迟
- 延迟后存在与其他task source的交互，有不确定性

新增接口：window.queueMicrotask，将回调添加到microtask队列中 浏览器兼容性
使用microtask原因
mutation-observers：需要及时执行回调，需要将多个操作统一执行
promise：
- 需要保证promise回调位于栈底，故标准中规定可以使用setTimeout或mutationObserver来实现
- 但是如果使用macrotask，会导致promise回调无法连续执行，带来性能问题与不必要的延迟，HTML规范将promise作为microtask实现
This can be implemented with either a “macro-task” mechanism such as setTimeout or setImmediate, or with a “micro-task” mechanism such as MutationObserver or process.nextTick
macrotask
setTimeout/setInterval/setImmediate/事件等
小测验
```
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');
结果
script start
script end
promise1
promise2
setTimeout
```

在不同浏览器中运行结果可能不同，以chrome为准
requestAnimationFrame
执行位置
在下次渲染前调用回调函数，一帧中可执行多个回调
一般屏幕每秒刷新60次，也存在更低或更高情况，该函数的调用次数与屏幕刷新次数相匹配
但为了提高性能与电池寿命，当运行在后台标签页或隐藏的iframe中时，会暂停rAF的调用。
如果想在下一帧继续更新动画，则回调函数自身必须再次调用rAF
rAF vs setTimeout
- setTimeout执行时间不固定，效果不可靠
- rAF保证每帧均渲染，动画更流畅
- setTimeout默认timeout为4.7ms，可能造成无效操作
- rAF执行与屏幕刷新频率一致，降低功耗，避免无效操作

|
主线程
JavaScript -> Style  -> Layout  -> Paint
|
setTimeout(fn, 0)
|
setTimeout(fn, 1000/60)
- 需要考虑设备的刷新频率
- 可能存在漂移现象
|
requestAnimationFrame
将回调改到渲染前执行
|

小测验
```
button.addEventListener('click', () => {
  box.style.display = 'none';
  box.style.display = 'block';
  box.style.display = 'none';
  box.style.display = 'block';
  box.style.display = 'none';
  box.style.display = 'block';
  box.style.display = 'none';
  box.style.display = 'block';
  box.style.display = 'none';
})
```
style的读写
JavaScript可以对style进行读写操作，但是部分样式为了实时获取或设置，会引发浏览器立即重新渲染
- offsetTop/offsetLeft/offsetWidth/offsetHeight
- scrollTop/scrollLeft/scrollWidth/scrollHeight
- clientTop/clientLeft/clientWidth/clientHeight
- getComputedStyle()/getBoundingClientRect()
repaint与reflow    强制reflow的情况
不支持在 Doc 外粘贴 block
node中的事件循环
|
事件循环机制的每一个阶段都有一个FIFO的队列来执行回调
当事件循环进入给定阶段，将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数已执行，然后事件循环移动到下一个阶段
阶段
- 定时器: setInterval，setTimeout
- pending：执行延迟到下一个循环迭代的 I/O 回调
- idle，prepar：node内部使用
- 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调
- check：setImmediate
- close：一些关闭的回调函数

微任务
- node中微任务不属于事件循环的一部分，node会在主线程或事件循环的每个阶段完成后，处理微任务队列
- process.nextTick优先级高于Promise.resolve().then()，如果二者位于同一个微任务队列，前者会被优先调用
参考链接
1. https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
2. https://javascript.info/event-loop
3. https://zh.javascript.info/async-iterators-generators
4. https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model
5. http://ecma-international.org/ecma-262/6.0/index.html#sec-jobs-and-job-queues
6. https://www.youtube.com/watch?v=cCOL7MC4Pl0
7. https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
8. https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide
9. https://promisesaplus.com/
10. https://blog.fundebug.com/2018/12/17/understand-event-loop-and-promise/
11. node EventLoop IBM
