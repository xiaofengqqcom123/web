JavaScript 可以将网络请求发送到服务器，并在需要时加载新信息。fetch() 方法是一种现代通用的方法，那么我们就从它开始吧

## 1. fetch vs XMLHttpRequest

https://jakearchibald.com/2015/thats-so-fetch/

##### a. chache Api

https://web.dev/cache-api-quick-guide/

##### b. streams

https://web.dev/cache-api-quick-guide/

## 2. 基本语法

```
let promise = fetch(url, options)
```

获取响应需要两个阶段，第一阶段，当服务器发送了响应头（response header），fetch 返回的 promise 就使用内建的 Response class 对象来对响应头进行解析。第二阶段，为了获取 response body，我们需要使用一个其他的方法调用。

##### a. 支持多种响应格式

- response.text() —— 读取 response，并以文本形式返回 response，
- response.json() —— 将 response 解析为 JSON，
- response.formData() —— 以 FormData 对象（在 下一章 有解释）的形式返回 response，
- response.blob() —— 以 Blob（具有类型的二进制数据）形式返回 response，
- response.arrayBuffer() —— 以 ArrayBuffer（低级别的二进制数据）形式返回 response，
  另外，response.body 是 ReadableStream 对象，它允许你逐块读取 body，我们稍后会用一个例子解释它。

##### b. forbidden Headers

……但是有一些我们无法设置的 header
https://fetch.spec.whatwg.org/#forbidden-header-name
