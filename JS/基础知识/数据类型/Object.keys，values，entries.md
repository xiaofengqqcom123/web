- Object.keys(obj) —— 返回一个包含该对象所有的键的数组。
- Object.values(obj) —— 返回一个包含该对象所有的值的数组。
- Object.entries(obj) —— 返回一个包含该对象所有 [key, value] 键值对的数组。

Object.keys/values/entries 会忽略 symbol 属性
就像 for..in 循环一样，这些方法会忽略使用 Symbol(...) 作为键的属性。

通常这很方便。但是，如果我们也想要 Symbol 类型的键，那么这儿有一个单独的方法 Object.getOwnPropertySymbols，它会返回一个只包含 Symbol 类型的键的数组。另外，还有一种方法 Reflect.ownKeys(obj)，它会返回 所有 键。

## Object.fromEntries
将 数组 转化为 对象

```
// 我们有一个带有价格的对象，并想将它们加倍：
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // 转换为数组，之后使用 map 方法，然后通过 fromEntries 再转回到对象
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
```