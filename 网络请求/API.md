## fetch API 

```
let promise = fetch(url, {
  method: "GET", // POST，PUT，DELETE，等。
  headers: {
    // 内容类型 header 值通常是自动设置的
    // 取决于 request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string，FormData，Blob，BufferSource，或 URLSearchParams
  referrer: "about:client", // 或 "" 以不发送 Referer header，
  // 或者是当前源的 url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer，origin，same-origin...
  mode: "cors", // same-origin，no-cors
  credentials: "same-origin", // omit，include
  cache: "default", // no-store，reload，no-cache，force-cache，或 only-if-cached
  redirect: "follow", // manual，error
  integrity: "", // 一个 hash，像 "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController 来中止请求
  window: window // null
});

```

### 1。 referfer
| 值                | 同源           | 跨源       |  HTTPS→HTTP |
| ----------------- |:-------------:| ---------:|  -----------:| 
|"no-referrer"	    |-           	| -	    |  -
|"no-referrer-when-downgrade" 或 ""（默认） |	完整的 url	|完整的 url	| -
|"origin"	 |	仅域	 |	仅域	| 仅域
|"origin-when-cross-origin"	|完整的 url	 |	仅域 |		仅域
|"same-origin"	|完整的 url	 |	-	 |	-
|"strict-origin"	|仅域	 |	仅域 |		-
|"strict-origin-when-cross-origin"	|完整的 url	 |	仅域 |		-
|"unsafe-url"	|完整的 url |		完整的 url |	完整的 url

Referrer policy 不仅适应于 fetch，它还具有全局性。特别是，可以使用 Referrer-Policy HTTP header，或者为每个链接设置 <a rel="noreferrer" href="#" \>，来为整个页面设置默认策略（policy）
### 2. mode
mode 选项是一种安全措施，可以防止偶发的跨源请求：

- "cors" —— 默认值，允许跨源请求，如 Fetch：跨源请求 一章所述，
- "same-origin" —— 禁止跨源请求，
- "no-cors" —— 只允许简单的跨源请求。

### 3. credentials
credentials 选项指定 fetch 是否应该随请求发送 cookie 和 HTTP-Authorization header。

- "same-origin" —— 默认值，对于跨源请求不发送，
- "include" —— 总是发送，需要来自跨源服务器的 Accept-Control-Allow-Credentials，才能使 JavaScript 能够访问响应，详细内容在 Fetch：跨源请求 一章有详细介绍，
- "omit" —— 不发送，即使对于同源请求。

4. keep-alive
keepalive 选项表示该请求可能会使发起它的网页“失活（outlive）”。

例如，我们收集有关当前访问者是如何使用我们的页面（鼠标点击，他查看的页面片段）的统计信息，以分析和改善用户体验。

当访问者离开我们的网页时 —— 我们希望能够将数据保存到我们的服务器上。

我们可以使用 window.onunload 事件来实现：
```
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
    keepalive: true
  });
};
```

常，当一个文档被卸载时（unloaded），所有相关的网络请求都会被中止。但是，keepalive 选项告诉浏览器，即使在离开页面后，也要在后台执行请求。所以，此选项对于我们的请求成功至关重要。

它有一些限制：数据量 不能 大于  64kb；或者说，多个请求 数据量之和不可大于 64 kb