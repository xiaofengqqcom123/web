调试地址：https://jwt.io/#debugger-io

参考：[JSON Web Token 入门教程 - 阮一峰](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

## 什么是 JWT（JSON Web Tokens ）?

JWT 的原理是，服务器认证以后，生成一个 JSON 对象（数字签名），发回给用户

## 什么时候使用？

单点登录：一旦用户登录后，每次请求都带着这个参数。单点登录是目前广泛使用 JWT 的一个特性，因为它的开销很小，并且能够很容易地跨不同的域使用
信息交换：JWT 可以安全的用于信息交换，后面没看懂~

包含 3 部分，格式： xxxxx.yyyyy.zzzzz
Header
Payload
Signature

#### 1. Header

包含两部分，一个是 token 的类型，即 JWT；一个是正在使用的签名算法，例如：HMAC SHA256 或 RSA.
例如：

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### 2. Payload

包含 claims. Claims are statements about an entity (typically, the user) and additional data。其中有 3 种形式：registered, public, and private claims
