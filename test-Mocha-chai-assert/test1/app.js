const express = require('express');
const fortune = require('./lib/fortune.js');

const app = express();


// 配置模板引擎
var handlebars = require('express-handlebars').create({
  defaultLayout:'main',
  helpers: {
      section: function(name, options){
          if(!this._sections) this._sections = {};
          this._sections[name] = options.fn(this);
          return null;
      }
  }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// —————————————————————————————

// 设置端口号
app.set('port', process.env.PORT || 3000);

// 开放静态目录，就是开放静态资源，不变的东西
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// 设置是否是测试
// set 'showTests' context property if the querystring contains test=1
// 如果test=1出现在任何页面的查询字符串中（并且不是运行在生产服务器上），属性res.locals.showTests就会被设为true。res.locals对象是要传给视图的上下文的一部分
// node express 在开发环境和生产环境运行的代码时不一样的
// 开发环境development，生产环境production
// app.get('env'); 默认输出development
// 访问http://localhost:3000会加载首页，而http://localhost:3000?test=1将会加载包含测试的首页
// 在中间件里声明: res.local.username = 'cnode'，然后就可以直接在模板里使用<%= username %>
// res.locals.param1 = 1;
// res.render('./database/sqlQuery');
// 相当于
// res.render('./database/sqlQuery',{
//	　　　　　　　　　param1:1,
//	　　　　　　　　　param2:2
//								 });
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && 
		req.query.test === '1';
	next();
});

// ———————————————————————————— 设置router开始 ————————————————————————————
app.get('/', function(req, res){
  res.render('home');
});

app.get('/about', function(req, res){
  res.render('about', {
    fortune: fortune.getFortune(),
    // 在主页上，有一个pageTestScript
    pageTestScript: '/qa/tests-about.js',
  });
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/oregon-coast', function(req, res){
	res.render('tours/oregon-coast');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

// ———————————————————————————— 设置router结束 ————————————————————————————

// 设置404
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});


// 设置500
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('EXpress started on http://localhost' + 
    app.get('port') + '; press Ctrl-C to terminate');
});