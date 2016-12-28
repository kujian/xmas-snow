# [xmas-snow](https://github.com/kujian/xmas-snow)

Add a christmas snowflake to your site
给你的网站添加一个圣诞雪花

## usage

```html
<script type="text/javascript" src="snow.js"></script>
<script type="text/javascript">
var snow = new Snow();
</script>
```
To import snow.js using an awesome module loader:

```javascript
// Using CommonJS
var Snow = require('snow.js')
var mySnow = new Snow({...})

// ES6
import Snow from 'snow.js'
let mySnow = new Snow({...})

// Using requirejs
require(['path/to/Snow'], function(Snow){
 var mySnow = new Snow({...})
})
```

# option

``` javascript
var snow = new Snow({
    //Set the number of snowflakes (more than 30 - 40 not recommended)
    //设置雪花数（不推荐超过30 - 40）
    snowmax:50,
    //Set the colors for the snow. Add as many colors as you like
    //设置雪花的颜色，你想添加多少就添加多少
    snowcolor:["#FFDA65", "#00AADD", "#aaaacc", "#ddddff", "#ccccdd", "#f3f3f3", "#f0ffff", "#bbf7f9"],
     // Set the fonts, that create the snowflakes. Add as many fonts as you like
     //设置创建雪花的字体，你想添加多少就多少
    snowtype:["Times", "Arial", "Times", "Verdana"],
    // Set the letter that creates your snowflake (recommended: * )
    //设置创建的雪花的字符（推荐：*)
    snowletter:"*",
    // Set the speed of sinking (recommended values range from 0.3 to 2)
    //设置下沉的速度（推荐值在0.3-2）
    sinkspeed: 0.6,
    // Set the maximum-size of your snowflakes
    //设置雪花的最大尺寸
    snowmaxsize:30,
    // Set the minimal-size of your snowflakes
    //设置雪花的最小尺寸
    snowminsize:8,
    // Set the snowing-zone
    // Set 1 for all-over-snowing, set 2 for left-side-snowing
    // Set 3 for center-snowing, set 4 for right-side-snowing
    //设置雪花的区域
    //1 为所有地方 2 为左边区域
    //3 为中间区域 4 为右边区域
    snowingzone:1,
    //显示雪花
    showSnow:true
});

```
## 方法

#### removeSnow();

移除正在运行的雪花

```javascript
var snow = new Snow();
snow.removeSnow();
```

## demo

[http://caibaojian.com/demo/2016/10/snow.html](http://caibaojian.com/demo/2016/10/snow.html)

## LICENSE

MIT
