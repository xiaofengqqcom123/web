### Array
数组是一种特殊的对象。使用方括号来访问属性 arr[0] 实际上是来自于对象的语法。它其实与 obj[key] 相同，其中 arr 是对象，而数字用作键（key）

队列：先进先出，FIFO（First-In-First-Out）

栈：先进后厨，LIFO（Last-In-First-Out）

JavaScript 中的数组既可以用作队列，也可以用作栈. 这在计算机科学中，允许这样的操作的数据结构被称为 双端队列（deque）。

#### 内部
数组是一种特殊的对象，使用方括号来访问属性 arr[0] 实际上是来自于对象的语法。它其实与 obj[key] 相同，其中 arr 是对象，而数字用作键（key）。

它们扩展了对象，提供了特殊的方法来处理有序的数据集合以及 length 属性。但从本质上讲，它仍然是一个对象。

从技术上讲，我们可以这样做：
```
let fruits = []; // 创建一个数组
fruits.age = 25; // 创建一个具有任意名称的属性
fruits.age // 25

// 因为数组是基于对象的，所以我们可以给它们添加任意属性。但是 Javascript 引擎会发现，我们在像使用常规对象一样使用数组，那么针对数组的优化就不再适用了，然后对应的优化就会被关闭，这些优化所带来的优势也就荡然无存了
```
数组误用的几种方式:

- 添加一个非数字的属性，比如 arr.test = 5。
- 制造空洞，比如：添加 arr[0]，然后添加 arr[1000] (它们中间什么都没有)。
- 以倒序填充数组，比如 arr[1000]，arr[999] 等等。

#### 性能
我们发现，push、pop 比 shift、unshift要快
```
let arr = []
for(let i = 0; i < 10000; i ++) {
    arr.push(i)
}

console.time(1)
arr.push('hello')
console.timeEnd(1)

console.time(2)
arr.unshift('word')
console.timeEnd(2)

VM913:3 1: 0.005126953125 ms
VM913:6 2: 16745.4609375 ms
```
shift 需要做三件事：
- 移除索引为 0 的元素
- 把所有的元素向左移动，把索引 1 改成 0，2 改成 1 以此类推，对其重新编号
- 更新length 属性

数组里的元素越多，移动它们就要花越多的时间，也就意味着越多的内存操作。


pop 需要做
- 移出 索引为 (length - 1) 的元素
- 更新length属性
pop 方法不需要移动任何东西，因为其它元素都保留了各自的索引。这就是为什么 pop 会特别快。

### 方法
#### 1. toString
```
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

#### 2. sort
对数组进行原位排序，更改元素的顺序。
```
let arr = [ 1, 2, 15 ];

// 该方法重新排列 arr 的内容
arr.sort();

alert( arr );  // 1, 15, 2
// 这些元素默认情况下被按字符串进行排序。

// 数字比较
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});

// 字符串排序
let countries = ['中文', '茹俊巧','大数据部', '中台部', '智能', 'zhi' ];

countries.sort( (a, b) => a.localeCompare(b) ) 
(6) ["大数据部", "茹俊巧", "智能", "中台部", "中文", "zhi"]
```
#### 3. reduce
```
// 语法：
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```
如果没有初始值，那么 reduce 会将数组的第一个元素作为初始值，并从第二个元素开始迭代。
```

let arr = [];

// Error: Reduce of empty array with no initial value
// 如果初始值存在，则 reduce 将为空 arr 返回它（即这个初始值）。
arr.reduce((sum, current) => sum + current);
```

#### 4. 大多数方法都支持 “thisArg”
```
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {

    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

// 找到 army.canJoin 返回 true 的 user
let soldiers = users.filter(army.canJoin, army);

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23

// 如果 let soldiers = users.filter(army.canJoin); 会报错，因为 this 为window
```

#### 5. arr.flat(depth)/arr.flatMap(fn) 
从多维数组创建一个新的扁平数组。

```
// flatMap
let arr1 = ["it's Sunny in", "", "California"];

arr1.map(x => x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap(x => x.split(" "));
// ["it's","Sunny","in", "", "California"]
```