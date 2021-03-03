## Map
Map 与 Object 最大的差别是，Map 允许任何类型的键（key）。

### map[key] 不是使用 Map 的正确方式

虽然 map[key] 也有效，例如我们可以设置 map[key] = 2，这样会将 map 视为 JavaScript 的 plain object，因此它暗含了所有相应的限制（没有对象键等）。

所以我们应该使用 map 方法：set 和 get 等。

### NaN
Map 使用 SameValueZero 算法来比较键是否相等。它和严格等于 === 差不多，但区别是 NaN 被看成是等于 NaN。所以 NaN 也可以被用作键

### Map 是有顺序的

即迭代的顺序与插入值的顺序相同。与普通的 Object 不同，Map 保留了此顺序。