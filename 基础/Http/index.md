## 属性
### use-agent
User-Agent 首部包含了一个特征字符串，用来让网络协议的对端来识别发起请求的用户代理软件的应用类型、操作系统、软件开发商以及版本号

浏览器示例
```
<!-- 谷歌浏览器 -->
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36

<!-- Opera -->
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41

<!-- Safari -->
Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1

<!-- Internet Explorer -->
Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)

<!-- 爬虫和机器人 -->
Googlebot/2.1 (+http://www.google.com/bot.html)

```
1. Mozilla/5.0 是一个通用标记符号，用来表示与 Mozilla 兼容，这几乎是现代浏览器的标配。

【参考】

1. [User-Agent](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent)
2. [为什么所有主要浏览器的 User-Agent 都是 Mozilla/x.0 开头？](https://www.zhihu.com/question/19553117)