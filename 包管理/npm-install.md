https://zhuanlan.zhihu.com/p/128625669
https://cloud.tencent.com/developer/article/1555982

### 1. package.lock.json
<img src="./assets/package-lock.png">

- integrity：包 hash 值，基于 Subresource Integrity 来验证已安装的软件包是否被改动过、是否已失效

- requires：对应子依赖的依赖，与子依赖的 package.json 中 dependencies的依赖项相同。

- dependencies：结构和外层的 dependencies 结构相同，存储安装在子依赖 node_modules 中的依赖包。

这里注意，并不是所有的子依赖都有 dependencies 属性，只有子依赖的依赖和当前已安装在根目录的  node_modules 中的依赖冲突之后，才会有这个属性。

### 2. 缓存
在执行 npm install 或 npm update命令下载依赖后，除了将依赖包安装在node_modules 目录下外，还会在本地的缓存目录缓存一份。

通过 npm config get cache 命令可以查询到：在 Linux 或 Mac 默认是用户主目录下的 .npm/_cacache 目录。

我们知道NPM就是用了cacache来作为缓存，所以这个目录里面应该就是缓存的内容。
<img src="./assets/cache.png">

1. package.local.json：pacote:range-manifest:{url}:{integrity}作为key =>  SHA256 => hash
2. 在_cacache/index-v5 中找到对应文件
3. 查到 meta 信息，其中 _shasum 为 tar 包名

> 以 c5/aa/e95d015d781c87be2624a9ab47e8ec4c837d810d460caff18786393fe403 为例，根据一些常识，能猜到这就是某个算法算出来的hash，并且前4位用来分目录，为了在文件系统中能快速查找，所以对应的hash肯定是 c5aae95d015d781c87be2624a9ab47e8ec4c837d810d460caff18786393fe403 这串东西。我们发现在 index-v5 及 content-v2 中，均是这样存储的~

npm 提供了几个命令来管理缓存数据：

- npm cache add：官方解释说这个命令主要是 npm 内部使用，但是也可以用来手动给一个指定的 package 添加缓存。
- npm cache clean：删除缓存目录下的所有数据，为了保证缓存数据的完整性，需要加上 --force 参数。
- npm cache verify：验证缓存数据的有效性和完整性，清理垃圾数据。
基于缓存数据，npm 提供了离线安装模式，分别有以下几种：

- --prefer-offline：优先使用缓存数据，如果没有匹配的缓存数据，则从远程仓库下载。
- --prefer-online：优先使用网络数据，如果网络数据请求失败，再去请求缓存数据，这种模式可以及时获取最新的模块。
- --offline：不请求网络，直接使用缓存数据，一旦缓存数据不存在，则安装失败。
