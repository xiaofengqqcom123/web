## 1. 设置 height 不生效？
```
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
<style>
    .father {
        border: 1px solid green;
    }
    .son1 {
        width: 50px;
        height: 100%;
        background-color: lightcoral;

    }

    .son2 {
        width: 100px;
        background-color: lightblue;
    }
</style>
</head>
<body>
   <div class="father">
       <div class="son1">son1</div>
       <div class="son2">鲁迅（1881-1936），原名周樟寿，后改名周树人，字豫才，浙江绍兴人。20世纪中国重要作家，新文化运动的领导人、左翼文化运动的支持者。毛泽东评价他是伟大的无产阶级的文学家、思想家、革命家，是中国文化革命的主将，也被人民称为“民族魂”。</div>
   </div>
</body>
</html>
```

**why ?**

https://www.w3.org/TR/css-sizing-3/#cyclic-percentage-contribution

简而言之：百分比必须要保证父元素有确定的尺寸。这个和尺寸计算顺序有关，不能说里面的尺寸依赖于外面的尺寸，而外面的尺寸又依赖里面的尺寸。计算就直接死循环算不出来了