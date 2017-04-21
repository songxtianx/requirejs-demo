# 前言

RequireJS已经流行一阵子了，这里写一个小DEMO，有助于更加熟悉JS依赖，原生JS和JS库的模块化。

它提供了以下功能：
- 声明不同js文件之间的依赖
- 可以按需、并行、延时载入js库
- 可以让我们的代码以模块化的方式组织

RequireJS是一款遵循AMD规范协议的JavaScript模块加载器，
不但能在浏览器端充分利用，同样能在其他的JavaScript运行时环境，
比如Rhino和NodeJS。使用像RequireJS这样的模块加载器能提高代码的质量和开发速度。

AMD 规范在这里：https://github.com/amdjs/amdjs-api/wiki/AMD

__注：在本地测试性能的时候发现刷新十次左右就有一次jQuery加载不出来...






# 技术栈
RequireJS 2.2.0 + jQuery 1.11.3 + Bootstrap 3.3.7






# 关于jQuery的$符号

## 无主的与有主的模块

我遇到了一个折腾我不少时间的问题：为什么我只能使用 jquery 来依赖jquery, 而不能用其它的名字？

比如下面这段代码：
<pre><code>
requirejs.config({
  baseUrl: '/public/js',
  paths: {
    myjquery: 'lib/jquery/jquery'
  }
});
requirejs(['myjquery'], function(jq) {
  alert(jq);
});
</code></pre>
它会提示我：

<pre><code>jq is undefined</code></pre>
但我仅仅改个名字：
<pre><code>
requirejs.config({
  baseUrl: '/public/js',
  paths: {
    jquery: 'lib/jquery/jquery'
  }
});

requirejs(['jquery'], function(jq) {
  alert(jq);
});
</code></pre>
就一切正常了，能打印出 jq 相应的对象了。

为什么？我始终没搞清楚问题在哪儿。
参考地址：http://www.tuicool.com/articles/jam2Anv

##有主的模块

经常研究，发现原来在jquery中已经定义了：

<pre><code>define('jquery', [], function() { ... });</code></pre>
它这里的 define 跟我们前面看到的 app.js 不同，在于它多了第一个参数 'jquery' ，表示给当前这个模块起了名字 jquery ，它已经是有主的了，只能属于 jquery .

所以当我们使用另一个名字：

<pre><code>myjquery: 'lib/jquery/jquery'</code></pre>
去引用这个库的时候，它会发现，在 jquery.js 里声明的模块名 jquery 与我自己使用的模块名 myjquery 不能，便不会把它赋给 myjquery ，所以 myjquery 的值是 undefined 。

所以我们在使用一个第三方的时候，一定要注意它是否声明了一个确定的模块名。

无主的模块

如果我们不指明模块名，就像这样：

<pre><code>define([...], function() {
  ...
});
</code></pre>
那么它就是无主的模块。我们可以在 requirejs.config 里，使用任意一个模块名来引用它。这样的话，就让我们的命名非常自由，大部分的模块就是无主的。

为什么有的有主，有的无主

可以看到，无主的模块使用起来非常自由，为什么某些库（jquery, underscore）要把自己声明为有主的呢？

按某些说法，这么做是出于性能的考虑。因为像 jquery , underscore 这样的基础库，经常被其它的库依赖。如果声明为无主的，那么其它的库很可能起不同的模块名，这样当我们使用它们时，就可能会多次载入jquery/underscore。

而把它们声明为有主的，那么所有的模块只能使用同一个名字引用它们，这样系统就只会载入它们一次。







