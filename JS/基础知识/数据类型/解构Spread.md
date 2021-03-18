## 数组解构
```
let [firstName, surname] = "Ilya Kantor".split(' ');

let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"]; // title: Consul

// 可迭代对象
let [a, b, c] = "abc" 
let [one, two, three] = new Set([1, 2, 3]);

// 交换变量
let guest = "Jane";
let admin = "Pete";

// 交换值：让 guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

// ...
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"] // rest: "Consul", "of the Roman Republic"


```

## 对象解构
```
let {width: w, height: h, title}  = {
  title: "Menu",
  width: 100,
  height: 200
} // w: "Menu"

let {width: w = 100, height: h = 200, title} = {title: 'test'} // w: 100, h: 200, title: undefined

// let 陷阱
let title, width, height;

// 这一行发生了错误
{title, width, height} = {title: "Menu", width: 200, height: 100};

因为 javaScript 把 {...} 当做一个代码块
({title, width, height}) = {title: "Menu", width: 200, height: 100};
```

获取一个 array/object 的副本
```
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // 将对象 spread 到参数列表中
                          // 然后将结果返回到一个新对象

// 两个对象中的内容相同吗？
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// 两个对象相等吗？
alert(obj === objCopy); // false (not same reference)

// 修改我们初始的对象不会修改副本：
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

## 函数中的结构
```
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

