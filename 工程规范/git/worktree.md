## 背景
假如你正在维护一个庞大的项目，每次 npm ci 需要 5 min+。目前你正在跟进两个大需求，分支分别对应 feature1、feature2, 且分支中的 package.json、package.lock.json 不同。你需要同时跟进两个需求，此时你如何切换分支呢？

## 方案
### 1. git checkout feature2
- 执行 npm ci
- 修复 bug ...

修复完成后，切换至 feature1 分支，执行 npm ci，再继续开发

缺点：需要来回切换分支、npm ci，效率低

### 2. git clone
- 重新 git clone xxx
- npm ci

好处：不需要重复 npm ci
缺点：两个仓库，有点重

### 3. git worktree
> 文档推荐：[Git Worktrees in Use](https://medium.com/ngconf/git-worktrees-in-use-f4e516512feb)

使用方式：
1. git worktree list: 查看 worktree 列表
2. git worktree add path branch
- path: 个人理解，类似于新建了个仓库，仓库的地址
- branch：可以是新 branch，也可以是老的
3. 切换 worktree
更改目录即可
4. git worktree remove path： 删除 worktree






