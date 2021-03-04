## 测试的类型
**单元测试**的粒度非常细，是对单个组件进行测试以确保其功能正确，而**集成测试**是对多个组件甚至整个系统之间的交互进行测试。
***
## 页面测试
 - 测试框架：Mocha
 - 断言库：Chai
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304225722479.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304225910669.png)
 - public/vendor 存放有关测试的资源
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304230129333.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304230153813.png)
 - 访问http://localhost:3000会加载首页，而http://localhost:3000?test=1将会加载包含测试的首页。
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304230343790.png)
 - 全局测试
	```javascript
	// 全局测试
	suite('Global Tests', function(){
		// 如果assert里面的为真，那么显示 √ page has a valid title
		test('page has a valid title', function(){
			assert(document.title && document.title.match(/\S/) && 
				document.title.toUpperCase() !== 'TODO');
		});
	});
	```
	引入
	```javascript
	<script src="/qa/tests-global.js"></script>
	```
 - 局部测试
	```javascript
	app.get('/about', function(req, res){
	  res.render('about', {
	    fortune: fortune.getFortune(),
	    // 在主页上，有一个pageTestScript
	    pageTestScript: '/qa/tests-about.js',
	  });
	});
	```
	```javascript
	{{#if pageTestScript}}
		<script src="{{pageTestScript}}"></script>
	{{/if}}
	```
 - 跨页测试（就是使用zombie自动进行请求路径，点开链接啥子的）
	在hood和oregon中有两个链接，点击之后，指向request中，request中存在可以显示直接之前的链接
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304232348355.png)
之后去看一下这里的代码
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021030423280172.png)
***
## 逻辑测试
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304233319492.png)

```javascript
var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

/**
 * 利用Mocha做逻辑测试
 * 测试的时候应该这样写 mocha -u tdd -R spec qa/tests-unit.js
 */
suite('Fortune cookie tests', function(){
    test('getFortune() should return a fortune', function(){
        expect(typeof fortune.getFortune() === 'string');
    });
});
```
***
## 去毛（类似于ESLint）
 - 获取
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304233808986.png)
 - 运行：
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304234129285.png)
***
## 链接检查
`http://wummel.github.io/linkchecker/`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304234348236.png)
***
## 用Grunt实现自动化
 - Grunt的工具可以很容易地实现这些任务的自动化。我们将把逻辑测试、跨页测试、去毛和链接检查放到一个Grunt命令中
 - 装上Grunt命令行以及Grunt本身
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304234641897.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021030423472645.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210304234834336.png)
最后运行 grunt