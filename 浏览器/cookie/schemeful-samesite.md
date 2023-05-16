# Chrome schemeful-samesite解决方案

## 背景
为了防止CSRF攻击和用户追踪，Chrome 51开始，浏览器Cookie新增加了一个samesite属性，Chrome 80后将未设置samesite属性的cookie都将其值设为Lax，Chrome 88后，由原来的samesite策略变更为schemeful-samesite，其与samesite的不同之处就是增加了协议一致性的判断
影响

目前基本上所有项目都是符合samesite条件的（页面域名和后端服务域名都是以.baidu.com结尾，属于同一个站点），但因为前端提测环境是http的，例如http://fix-bug.one-service.ci.t.pt.baidu.com/，
而后端接口是https的，这就不满足schemeful-samesite的协议一致性的要求了，所以在请求后端接口的时候，浏览器认为这是一个跨站点访问，存在安全隐患，于是samesite属性不为None的cookie都不会发送给服务端，这就导致后端拿不到登录相关的cookie信息，登录验证失败（部分项目会出现页面一直刷新的效果，其原因是因为后端判断未登录后，前端会跳转到cas登录页，但是cas那边其实一直都是已登录的状态，所以又跳回了对应项目，此时后端还是认为未登录，前端又跳转至cas，以此往复，就呈现出了一直刷新页面的视觉效果）

## 解决方案
1. 访问https的提测环境，其实前端提测环境是支持https访问的，例如https://fix-bug.one-service.ci.t.pt.baidu.com/，只不过由于没有安装证书，会出现如下提示，点击高级-》继续前往即可正常访问（由于页面地址变成了https，所以所有接口请求都要保证是https的）。安装前端提测环境对应的一个假证书，即可跳过上面的安全提示，直接进入对应项目，详见证书安装方法（推荐）

2. 复用*.bi.baidu.com的证书，但是需要前端把提测环境的地址由fix-bug.one-service.ci.t.pt.baidu.com更改为例如fix-bug--one-service--ci--t--pt.bi.baidu.com类似的不包含符号"."的地址，且前端服务器需要维护*.bi.baidu.com的证书，具有一定的成本，所以暂时不考虑此方法
3. 浏览器访问chrome://flags/，将Schemeful Same-Site选项改为Disabled（不推荐）

其它
1. 开发人员有本地环境，所以启服务的时候要采用https
