JSON(JavaScript Object Notation) 是标识值和对象的通用格式

## 特点
- 可以应用于：Object、Array、Primitives(string、number、boolean、null)
- 一些特点的对象属性会跳过，其中有：存储undefined的属性、Symbol、函数方法
- 不得有循环引用（会报错）
- JSON 不支持注释。向 JSON 添加注释无效


## 语法
JSON.stringify(value[, replacer, space]) 
- replacer
```
let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup 引用了 room
};

alert( JSON.stringify(meetup, ['title', 'participants']) ); // 只有这两个属性被编码
```

- space: 空格几位
```
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* 两个空格的缩进：
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/
```

## 自定义 toJSON
```
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)), // 所有日期都有一个内置的 toJSON 方法
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/

----------------------------------------------------
let room = {
  number: 23,
  toJSON() {
    return this.number;
  }
};
JSON.stringfy(room) // '23'
```

## JSON.parse()
```
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
```



