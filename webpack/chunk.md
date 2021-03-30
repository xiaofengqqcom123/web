## 为什么要用hash?
如果我们不更新文件名，用户访问到就是之前的文件，简言之，就是浏览器做了缓存。用户不能访问到正确的文件资源，从而导致不能看到新功能。于是，有了hash

webpack提供了几种hash规则，分别应用于不同的场景
[hash]
[Chunkhash]
[Contenthash]

- hash: 每次编译，所有的文件都会生成新的hash
- chunkHash： 根据入口文件，生成自己的hash。只更改入口文件的hash值，例如说：使用dIl时
- contentHash: 通过 ExtractTextPlugin 创造的。 当内容修改的时候，产生的hash。当你更改了css文件时，使用chunkHash是不会生成新的hash的，这时候，就应该使用contentHash了