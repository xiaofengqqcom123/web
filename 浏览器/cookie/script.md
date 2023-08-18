## script crossorigin 属性
```
<script src="xxxx" crossorigin="anonymous"></script>
```
有时候会看到这样的代码，设置了crossorigin="anonymous"这个属性，个人认知里面是跟跨域有关系的。但是仔细一想，本来 script标签就是可以跨域请求资源的，那crossorigin="anonymous" 这个设置是为了什么？

### script 标签请求资源

script标签去请求资源的时候，request是没有origin头的。
script标签请求跨域资源的时候，内部运行如果报错的话，window.onerror 捕获的时候，内部的error.message只能看到Script error.看不到完整的错误内容。这个应该是浏览器的安全策略。

```
window.addEventListener('error', function(msg, url, lineno, colno, error) {
    console.log('error catch:', msg.message);
    return false
})
```

### script标签 crossorigin 属性

1. 设置 crossorigin属性后，script标签去请求资源的时候，request会带上origin头，然后会要求服务器进行 cors校验，跨域的时候如果response header 没有 ‘Access-Control-Allow-Origin’ 是不会拿到资源的。cors验证通过后，拿到的script运行内部报错的话，，window.onerror 捕获的时候，内部的error.message可以看到完整的错误信息。
2. crossorigin的属性值分为 anonymous和use-credentials。如果设置了crossorigin属性，但是属性值不正确的话，默认是anonymous。
3. anonymous代表同域会带上cookie，跨域则不带上cookie，相当于 fecth请求的credentials: 'same-origin'。
4. use-credentials跨域也会带上cookie，相当于fetch请求的 credentials: 'include'，这种情况下跨域的response header 需要设置'Access-Control-Allow-Credentials' = true，否则cors失败。

### 总结

设置了crossorigin就相当于开启了cors校验。
开启cors校验之后，跨域的script资源在运行出错的时候，window.onerror可以捕获到完整的错误信息。
crossorigin=use-credentials可以跨域带上cookie。

> 参考文档
> - [script crossorigin 属性](https://juejin.cn/post/6969825311361859598)
> - https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/crossorigin
