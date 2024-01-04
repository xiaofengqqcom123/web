## Commitlint 是什么
一句话说，当我们运行 git commmit -m 'xxx' 时，用来检查 xxx 是否满足固定格式的工具。

为什么使用 commitlint?
我们都知道，在使用 git commit 时，git 会提示我们填入此次提交的信息。可不要小看了这些 commit，团队中规范了 commit 可以更清晰的查看每一次代码提交记录，还可以根据自定义的规则，自动生成 changeLog 文件。

## Commitlint 推荐的格式
commitlint 推荐我们使用 config-conventional 配置去写 commit。

例如，当我们修复了某个 bug：
```
git commit -m 'fix(scope): fix ie6 margin bug'
```
- fix 表示 commit 的类型。
- scope 表示 作用的范围（可选）。
- 冒号后 表示 commit 对应的信息。
- 除了 fix 外，还有其他的标识：

## 总结
使用 commitlint 可以规范我们每一次的 commit，我们可以用来自动生成 changeLog 等文件，方便代码管理。

参考：
> https://mengsixing.github.io/blog/devops-commitlint.html#commitlint-%E6%8E%A8%E8%8D%90%E7%9A%84%E6%A0%BC%E5%BC%8F

## 配置
> - [官方文档](https://commitlint.js.org/#/guides-local-setup)
> - [[前端工程化配置] husky + lint-staged 格式化git提交代码](https://juejin.cn/post/7085534305249656862)

### 1. 安装依赖包
```
# Install and configure if needed
npm install --save-dev @commitlint/{cli,config-conventional}
# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```
### 2. 安装 husky
```
# Install Husky v6
npm install husky --save-dev
# or
yarn add husky --dev

# Activate hooks
npx husky install
# or
yarn husky install
```

### 配置 commitlint.config
### 方式一：
新建 commitlint.config.js, .commitlintrc.js, .commitlintrc, .commitlintrc.json, .commitlintrc.yml file 

```
module.exports = { extends: ['@commitlint/config-conventional'] };
```

执行：
```
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

package.json 配置
```
  "scripts": {
    ...,
    "commitlint": "commitlint --config commitlint.config.js -e -V"
  },
```

#### 方式二：
package.json 配置
```
  "scripts": {
    ...,
    "commitlint": "commitlint --edit"
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
 "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --cache --fix"
    ]
  },
```

控制台执行：
```
npm pkg set scripts.commitlint="commitlint --edit"
npx husky add .husky/commit-msg 'npm run commitlint ${1}'
```

### 总结
**我们从头理一下工具的工作模式：**

1. 格式化
当我们进行一次git提交时 => 触发husky配置的pre-commit钩子 => 执行npm run lint-staged命令 => 触发lint-staged对暂存区的文件进行格式化（使用package.json中配置的lint-staged任务） => 使用eslint 进行格式化

2. commit message 校验
当我们进行一次git提交时 => 触发husky配置的commit-msg钩子 => 执行npm run commitlint命令

