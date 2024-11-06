可以将 merge 分为两种

## Fast forward merge
3-way merge
Fast Forward Merge
如果从当前分支 master 和目标分支 feature 没有分叉，那么 git 会使用 fast forward 的方式来完成 merge 操作。

举例来说，当我们从 master checkout feature 分支进行开发，如果之后 master 都没有新的改动，那么当我们的 feature 分支和入 master 的时候，git 就会使用 fast forward 的方式进行 merge

```
     master
       |
M1 --- M2
       \
        \--- F1
             |
           feature
```

对于 git 来说，当一个 merge 操作使用 fast forward 的话，git 只需要将当前分支的 pointer 指向目标分支
```
           master          
M1 --- M2    |
       \     |
        \--- F1
             |
           feature
that's all ...
```

## 3-way Merge
我们可以简单理解成，没有使用 fast forward 的 merge 都用的是 3-way merge。

举例来说，当我们从 master checkout feature 分支进行开发，如果之后 master 又有了额外的改动 (M3)，这时 master 和 feature 是有分叉的，因此 git 只能使用 3-way merge 的方式进行 merge
```
            master
              |
M1 --- M2 --- M3 
       \             
        \--- F1 
              |
           feature
```
首先 3-way 的含义是 merge 操作需要 3 个 commit

- feature 分支 pointer，即 F1
- master 分支 pointer，即 M3
- feature 分支和 master 分支的最近的公共祖先节点 (common ancestor)，即 M2

> Note:
> 需要注意的是，如果在 feature 分支从 master checkout 出来之后，有同步过 master 的操作，那 common ancestor 节点是会发生变更的（即最新的公共祖先节点并不是 checkout 时候的 commit），这样可以防止已经解决的冲突需要再解决一遍的情况
> ref: https://blog.plasticscm.com/2016/02/three-way-merging-look-under-hood.html
整个流程：

1. 首先需要找到 the most recent common ancestor
2. 拿到 F1 & M2 的 diff，和 M3 & M2 的 diff
3. 一个个过 diff
如果两边的 diff 在某个位置都进行了改动，并且不一致，标记为冲突
如果一边的 diff 在某个位置进行了改动，而另外一边没有进行改动，那么保留改动的一方

最终的结果：

流程结束后，git 会创建一个 merge commit (M4)，并将 master 分支指向它。
```
                  master
                     |
M1 --- M2 --- M3 --- M4
       \             /
        \--- F1 --- /
              |
           feature
```

## 为什么 merge commit 没有任何 change？
一般来说，我们可以使用 git show {commit} 来查看某个 commit 的具体改动
```
- const a = 1
+ const a = 2
```
然而当我们查看 3-way merge 的 commit 的时候，我们是看不到任何 diff 的，这是为什么呢？

首先，关于 commit，我们可以理解为，每个 commit 会保留一个 pointer 指向它的 parent commit，并且一般我们的 commit 只有一个 parent。然而对于 merge commit 却不太一样，每个 merge commit 有两个 parent，分别指向合并前的两个 commit。

```
# 一个 merge commit
commit b20bb74e66ab0d426f2599f706c583b1698dd651 (HEAD -> master)
Merge: adab93f 0d71b3b 
# 这里 parent 分别指向两个 merge 前两个 branch
# 其中第一个是当前分支 (master)，第二个是 
Author: xxx
Date:   Mon Sep 20 12:10:38 2021 +0800

    Merge branch 'dev'
```

M4 为什么没有任何 file change，因为确实没有任何改动，改动都体现在 M3 和 F1 上了。因此对于 merge commit (M4)， 我们可以理解为是一个记录点，记录在这一刻，改动由两部分构成，M3 和 F1。

因此我们的 commit 历史其实不是线性的，而是由“分叉”的，所以很对人推荐使用 rebase 的方式去做 merge。但实际上，对于分叉，我们只需要记录另外一部分在哪里能找到就可以，线性与否其实无所谓。

```

                   master
                     |
M1 --- M2 --- M3 --- M4
       \             /
        \--- F1 --- /
              |
           feature
```

## 为什么 merge commit 有 change？
理解了上面的问题之后，我们再来看下，为什么有些时候 merge commit 又有 change？

比如：
```
commit 65d137aa3ebb9eb7eab81853abcfc6b88db61850 (HEAD -> master)
Merge: 19e2a06 e0fec61
Author: xxx
Date:   Mon Sep 20 15:12:17 2021 +0800

    master merge with dev

diff --cc a
index d800886,ee2b836..be2fb0a
--- a/a
+++ b/a
@@@ -1,1 -1,1 +1,1 @@@
- 123
 -456
++789
```
上面说过一个 merge commit 是用来记录分叉合并的，分叉合并对于同一个位置 (spot) 的改动可以分为下面几种情况：

1. A 改了，B 没改，保留 A 的改动
2. A B 都改了，不知道用哪个，需要人工介入（也就是 conflict），这时就有三种处理方式
- 保留 A 的改动
- 保留 B 的改动
- 都不保留，而是使用新的改动 C
无论是 A 的改动，还是 B 的改动，其实都是有对应的 commit 记录的。因此对于 merge commit，只需要记录究竟是保留了 A 的改动还是 B 的改动即可，因此大多数情况下我们 merge commit 都是没有变更的，只是个记录。

但是当出现了 C 的时候，由于 C 并不存在于之前的任何 commit，因此对于 C 的改动我们只能记录在 merge commit。因此在这种情况下，会导致 merge commit 有改动。

例如上面的例子，A 改成了 123，B 改成了 456，因此存在冲突，解决冲突的时候改成了 789，因此 merge commit 有了改动。

## 为什么 git pull 的时候产生了 merge commit？
这个问题很简单，因为 git pull = git fetch + git merge

如果这里的 git merge 使用的是 3-way merge 那么就会有个 merge commit 用于记录

ref: https://stackoverflow.com/questions/10157702/why-did-git-create-a-merge-commit-with-no-file-changes

## 如何 reset 一个 merge？
一般来说，我们需要 reset 一个 commit 需要找到这个 commit 的上一个 commit，然后使用 git reset {commit} 来将当前的 branch 指向这个 commit。

如果要 reset 一个 merge commit 会什么不同呢？

就像我们上面说的，普通的 commit 只有一个 parent，而 merge commit 有两个 parent，比如：

```
commit 65d137aa3ebb9eb7eab81853abcfc6b88db61850 (HEAD -> master)
Merge: 19e2a06 e0fec61 # 两个 parent 1，2
Author: xxx
```

因此如果要 reset，我们需要确认到底是 reset 到哪个 commit。比如下面如果要 reset M4，我们需要确认是将 branch 指向 M3 还是 F1。

如果指向 M3：git reset HEAD~1 or git reset HEAD^1~1

如果指向 F1：git reset HEAD^2~1
```
                   master
                     |
M1 --- M2 --- M3 --- M4
       \             /
        \--- F1 --- /
              |
           feature
```           
> Note: ^ 表示第几个 parent，~ 表示往前数第几个 commit

## 如何 revert 一个 merge？
如果一个 merge commit 已经被 push，这时候可能 reset 就不是特别合适了，于是我们只能去 revert 这个 merge。一般来说，我们只需要找到需要 revert 的 commit 然后执行 git revert {commit}，就会重新创建一个 revert commit 来抵消之前的 commit 的改动。

如果要 revert 一个 merge commit 会有什么不同呢？

还是那句老话，merge commit 有两个 parent，因此如果我们要执行 revert 操作，就需要**指定保留哪一个分支的改动**（即 revert 另外一个分支）
```
                   master
                     |
M1 --- M2 --- M3 --- M4
       \             /
        \--- F1 --- /
              |
           feature
```
继续用这个图，如果我们要 revert M4，最终结果会有两种可能

1. M1 --- M2 --- M3 --- xxx
2. M1 --- M2 --- F1 --- xxx

如果我们想要的是第一种结果，即保留 parent#1，只需要执行 git revert {M4} -m

如果我们想要的是第二种结果，即保留 parent#2，只需要执行 git revert {M4} -m 2

ref:

https://stackoverflow.com/questions/7099833/how-to-revert-a-merge-commit-thats-already-pushed-to-remote-branch
https://juejin.cn/post/68449035

