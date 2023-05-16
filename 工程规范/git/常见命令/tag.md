## 打标签
像其他版本控制系统（VCS）一样，Git 可以给仓库历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（ v1.0 、 v2.0 等等）。 在本节中，你将会学习如何列出已有的标签、如何创建和删除新的标签、以及不同类型的标签分别是什么。

### 列出标签
```
// 列出所有tag
ru@rudeMacBook-Pro:~/Desktop/work/data (125-editor $=)$ git tag
alpha-20201211-1953
alpha-20201211-2000
alpha-20201216-1111
prod-20190628
prod-20200017-1
prod-2020021715
prod-2020021716
...

// 过滤
ru@rudeMacBook-Pro:~/Desktop/work/data (125-editor $=)$ git tag -l "alpha*"
alpha-20201211-1953
alpha-20201211-2000
```
### 创建 tag
Git 支持两种标签：轻量标签（lightweight）与附注标签（annotated）。

轻量标签很像一个不会改变的分支——它只是某个特定提交的引用。轻量标签本质上是将提交校验和存储到一个文件中——没有保存任何其他信息。 创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字：
```
git tag v1.4-lw
```

而附注标签是存储在 Git 数据库中的一个完整对象， 它们是可以被校验的，其中包含打标签者的名字、电子邮件地址、日期时间， 此外还有一个标签信息，并且可以使用 GNU Privacy Guard （GPG）签名并验证。 通常会建议创建附注标签，这样你可以拥有以上所有信息。但是如果你只是想用一个临时的标签， 或者因为某些原因不想要保存这些信息，那么也可以用轻量标签。
```
ru@rudeMacBook-Pro:~/Desktop/work/data(125-editor $=)$ git show prod-20200017-1
tag prod-20200017-1

数据血缘33977bed88d60544dc12b5c1eb51d65ab232532f (tag: prod-20200017-1) Merge branch '63-blood' into 'master'
```
