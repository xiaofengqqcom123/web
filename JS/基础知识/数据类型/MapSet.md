## Map
Map 与 Object 最大的差别是，Map 允许任何类型的键（key）。

### map[key] 不是使用 Map 的正确方式

虽然 map[key] 也有效，例如我们可以设置 map[key] = 2，这样会将 map 视为 JavaScript 的 plain object，因此它暗含了所有相应的限制（没有对象键等）。

所以我们应该使用 map 方法：set 和 get 等。

### NaN
Map 使用 SameValueZero 算法来比较键是否相等。它和严格等于 === 差不多，但区别是 NaN 被看成是等于 NaN。所以 NaN 也可以被用作键

### Map 是有顺序的

即迭代的顺序与插入值的顺序相同。与普通的 Object 不同，Map 保留了此顺序。

### 转对象？
1. entries
```
let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') );
```
2.fromEntries: 从 Map 创建对象
```
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // 创建一个普通对象（plain object）(*)

// 完成了！
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2


或者说：
let obj = Object.fromEntries(map); // 省掉 .entries()，也是可行的
```

## WeakMap
正常的垃圾回收机制
```
let john = { name: "John" };

let array = [ john ];

john = null; // 覆盖引用

// 前面由 john 所引用的那个对象被存储在了 array 中
// 所以它不会被垃圾回收机制回收
```

如果我们在 weakMap 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和map）中自动清除。
```
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 被从内存中删除了！
```

key值必须为对象

## Set
 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。

 key值必须为对象