## 1. 如何用useEffect模拟componentDidMount生命周期？
如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 [] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式, 但它们并不完全相等。

举例说明
```
export default function Test() {
  const [num, setNum] = useState(0)

  setTimeout(() => {
    setNum('变化后的值：2')
  })

  useEffect(() => {
    setTimeout(() => {
      console.log('num', num)
    }, 2000)
  }, [])

  return <div>{num}</div>
}
// 问: console 的值是啥？
// An: 0
```
https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/
https://juejin.cn/post/6844903975838285838


```
export default function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      console.count('hhaah')
      setCount(prev => prev + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return <h1>{count}</h1>
}

```