文档：https://zh-hans.react.dev/blog/2021/12/17/react-conf-2021-recap

视频：https://www.youtube.com/watch?v=ytudH8je5ko

## 新功能
### 1. Automatic batching
in before React 18
```
funciton handleClick () {
    setLoading(true)
    setList([])
    setFormStatus(false)
}

// render 1 times
```

But Before React 18 updates outside events were not batchs, such as:
```
fetcg('xxx').then(() => {
        setLoading(true)
    setList([])
    setFormStatus(false)
})
// will render 3 times
```

Currently in React 18 , this will render 1 times
### 2. Suspense on server
### 3. New APIs for app and the libraliy developer

## 如何升级
