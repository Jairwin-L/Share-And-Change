#### 对每个页面里面的常用标签进行的样式处理
```css
*,
*:before,
*:after {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

body {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    max-width: 51.875rem;
    margin: 0 auto;
}

ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}

img {
    border: 0px;
    border: none;
    display: block;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.clear {
    clear: both;
    display: block;
    font-size: 0;
    height: 0;
    line-height: 0;
    overflow: hidden;
}

input,
button {
    border: none;
    outline: none;
}
```

#### 段落指定超出多少行隐藏，以“...”的方式进行处理
```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

#### CSS Transform让百分比宽高布局元素水平垂直居中
```css
width: width;
height: height;
position: absolute;
top: 50%;
left: 50%;
transform: translate(width/2, height/2);
```
