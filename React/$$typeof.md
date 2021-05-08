## 为什么 React Elements 会有 $$typeof 这个属性？

调用 createElement, 会生成元素
```
 createElement({
    type: 'button',
    props: {
      bgcolor: '#ffa7c4',
      children: 'hi',
    },
})
=> 
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'), //   Who dis
}
```

情景：
如果服务器允许用户储存任意的 JSON 数据。那么就可以手动构建 React Element 对象传入到元素中。例如:
```
// Server could have a hole that lets user store JSON
let expectedTextButGotJSON = {
  type: 'div',
  props: {
    dangerouslySetInnerHTML: {
      __html: '/* put your exploit here */'
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// Dangerous in React 0.13
<p>
  {message.text}
</p>
```
增加 $$typeof, 这样就可以规避这个问题，使用 Symbol 类型是因为 JSON 中无法传递 Symbol。React 会检查 element.$$typeof 然后拒绝处理非法的元素。
