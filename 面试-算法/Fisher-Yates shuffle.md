## 1. 由一个问题开始
编写函数 shuffle(array) 来随机排列数组的元素。

多次运行 shuffle 可能导致元素顺序的不同。例如：

```
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
```
解决方式：
```
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 所有可能排列的出现次数
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};


for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// 显示所有可能排列的出现次数
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

## 洗牌算法
思路： 逆向遍历数组，并将每个元素与其前面的随机的一个元素互换位置；

在性能方面，Fisher — Yates 算法要好得多，没有“排序”开销。



let john = { name: "John" };

let array = [ john ];

john = null;


array[0]

