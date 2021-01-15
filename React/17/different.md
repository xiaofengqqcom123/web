## 1. 事件池
 React 16 及更早版本、React Native 中 [SyntheticEvent](https://zh-hans.reactjs.org/docs/legacy-event-pooling.html)
 ```
// 当所有事件处理函数被调用之后，其所有属性都会被置空
 function handleChange(e) {
  // This won't work because the event object gets reused.
  setTimeout(() => {
    console.log(e.target.value); // Too late!
  }, 100);
}

function handleChange(e) {
  // Prevents React from resetting its properties:
  e.persist();

  setTimeout(() => {
    console.log(e.target.value); // Works
  }, 100);
}
 ```
从 v17 开始，e.persist() 将不再生效