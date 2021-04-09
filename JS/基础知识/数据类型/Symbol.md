### Symbol 
“Symbol” 值表示唯一的标识符。

**用处**
1. ”隐藏属性“，*比如说：我们在使用三方库 User 时，想给它添加一个标识符.  因为 user 对象属于其他的代码，那些代码也会使用这个对象，所以我们不应该在它上面直接添加任何字段，这样很不安全。*
```
let user = { // 属于另一个代码
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] )
```
2. 作为对象的key
```
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // 而不是 "id"：123
};

for(let key in user) {
  console.log(key) // 无 id
}
console.log(Object.keys(user))
```
Symbol 属性会在 for ... in 中跳过

Object.keys() 中会跳过

相反，Object.assign 会同时复制字符串和 symbol 属性：