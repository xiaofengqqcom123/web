1. ArrayBuffer

ArrayBuffer 是核心对象，是所有的基础，是原始的二进制数据。

但是，如果我们要写入值或遍历它，基本上几乎所有操作 —— 我们必须使用视图（view），例如：
```
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer

let view = new Uint32Array(buffer); // 将 buffer 视为一个 32 位整数的序列

alert(Uint32Array.BYTES_PER_ELEMENT); // 每个整数 4 个字节

alert(view.length); // 4，它存储了 4 个整数
alert(view.byteLength); // 16，字节中的大小

// 让我们写入一个值
view[0] = 123456;

// 遍历值
for(let num of view) {
  alert(num); // 123456，然后 0，0，0（一共 4 个值）
}
```
2. TypedArray
- Uint8Array，Uint16Array，Uint32Array —— 用于 8 位、16 位和 32 位无符号整数。
- Uint8ClampedArray —— 用于 8 位整数，在赋值时便“固定”其值。
- Int8Array，Int16Array，Int32Array —— 用于有符号整数（可以为负数）。
- Float32Array，Float64Array —— 用于 32 位和 64 位的有符号浮点数。
或 DataView —— 使用方法来指定格式的视图，例如，getUint8(offset)
