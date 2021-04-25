FormData 一种数据格式，它是表示 HTML 表单数据的对象。

## FormData 方法
- formdata.append(name, value) —— 添加具有给定 name 和 value 的表单字段; 
- formData.append(name, blob, fileName) —— 添加一个字段，就像它是 <input type="file">，第三个参数 fileName 设置文件名（而不是表单字段名），因为它是用户文件系统中文件的名称
- formData.delete(name) —— 移除带有给定 name 的字段，
- formData.get(name) —— 获取带有给定 name 的字段值，
- formData.has(name) —— 如果存在带有给定 name 的字段，则返回 true，否则返回 false。
- formData.set(name, value) ——  语法与 append 相同。不同之处在于 .set 移除所有具有给定 name 的字段，然后附加一个新字段。

#### a. 支持 for of 循环
#### b. 支持发送带有文件的表单
表单始终以 Content-Type: multipart/form-data 来发送数据，这个编码允许发送文件。因此 <input type="file"> 字段也能被发送，类似于普通的表单提交。
#### c. 支持发送具有Blob的表单
我们知道，fetch支持直接以 Blob 发送一个动态生成的二进制数据，例如图片，是很简单的。 在实际开发中，通常更方便的发送图片的方式不是单独发送，而是将其作为表单的一部分，并带有附加字段（例如 “name” 和其他 metadata）一起发送。
```
let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

let formData = new FormData();
formData.append("firstName", "John");
formData.append("image", imageBlob, "image.png");
```