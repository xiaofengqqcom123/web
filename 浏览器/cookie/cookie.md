cookie 常用于身份验证

## 1. document.cookie
- 浏览器访问cookie，document.cookie
- document.cookie = "user=xiaoming" // 仅更改user属性

## 2. cookie 选项


- path=/，默认为当前路径，使 cookie 仅在该路径下可见。
- domain=site.com，默认 cookie 仅在当前域下可见，如果显式设置了域，可以使 cookie 在子域下也可见。
- expires 或 max-age 设置 cookie 过期时间，如果没有设置，则当浏览器关闭时 cookie 就失效了。
- secure 使 cookie 仅在 HTTPS 下有效。
- samesite，如果请求来自外部网站，禁止浏览器发送 cookie，这有助于防止 XSRF 攻击。
- httpOnly: 禁止任何 JavaScript 访问 cookie。我们使用 document.cookie 看不到此类 cookie，也无法对此类 cookie 进行操作。可与在一定程度上预防 XSS 攻击

- expires，max-age： 过期时间。注意：expires 必须完全采用 GMT 时区的这种格式, 我们可以使用 date.toUTCString 来获取它
```
// 当前时间 +1 天
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

另外：

浏览器可能会禁用第三方 cookie，例如 Safari 浏览器默认禁止所有第三方 cookie。
在为欧盟公民设置跟踪 cookie 时，GDPR 要求必须得到用户明确许可。

### a. secure
cookie 是基于域的，他们不区分协议。 默认情况下，如果我们在 http://site.com 上设置了 cookie，那么该 cookie 也会出现在 https://site.com 上，反之亦然。
该属性表示只在 https 协议下生效

### b. samesite
它旨在防止CSRF攻击

- samesite=strict： 如果浏览器 url 与 API 域名不一致，那将永远不会带上cookie。当用户通过合法的链接访问 bank.com 时，例如从他们自己的笔记，他们会感到惊讶，bank.com 无法识别他们的身份。实际上，在这种情况下不会发送 samesite=strict cookie。

那如何解决呢？
可以通过两个 cookie 来解决，一个cookie 用于识别用户身份。对于一些敏感操作，则需要设置 samesite strict
- 

