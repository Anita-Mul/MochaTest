suite('"About" Page Tests', function(){
	test('page should contain link to contact page', function(){
		// 查看页面上是否有一个指向'/contact'
		// <a href="/contact">contact us</a>
		assert($('a[href="/contact"]').length);
	});
});
