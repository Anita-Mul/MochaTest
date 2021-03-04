// 全局测试
suite('Global Tests', function(){
	// 如果assert里面的为真，那么显示 √ page has a valid title
	test('page has a valid title', function(){
		assert(document.title && document.title.match(/\S/) && 
			document.title.toUpperCase() !== 'TODO');
	});
});
