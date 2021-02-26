var add = require('./add.js');
var expect = require('chai').expect;

// 通常，测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）
// 测试脚本里应该包括一个或多个describe块，每个descrice块应该包括一个或多个it块
// describe表示一组相关的测试
// it表示一个单独的测试

// npm install --global mocha
// mocha add.test.js
// mocha file1 file2 file3 【可以指定多个测试脚本】
// mocha 【Mocha默认只执行test子目录下面第一层的测试用例，不会执行更下层的用例，同时会生成那个html文档(mochawesome.html)】
//       如果想看到这个html文档 下载 npm install --save-dev mochawesome
//       生成文件../node_modules/.bin/mocha --reporter mochawesome
// mocha --recursive 【test子目录下面所有的测试用例不管在哪一层都会执行】
// mocha --watch 【只要脚本有变化，就会自动运行Mocha】
describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
/**
 * 断言库的用法：
 * 1. 所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。上面这句断言的意思是，调用add(1, 1)，结果应该等于2。
 * 2. 所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库。
 *    var expect = require('chai').expect;
 *    引入的断言库是chai，并且指定使用它的expext断言风格
 * 3. expect断言
 *    基本上，expect断言的写法都是一样的。头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等。两者之间使用to或to.be连接。
 *    // 相等或不相等
      expect(4 + 5).to.be.equal(9);
      expect(4 + 5).to.be.not.equal(10);
      expect(foo).to.be.deep.equal({ bar: 'baz' });

      // 布尔值为true
      expect('everthing').to.be.ok;
      expect(false).to.not.be.ok;

      // typeof
      expect('test').to.be.a('string');
      expect({ foo: 'bar' }).to.be.an('object');
      expect(foo).to.be.an.instanceof(Foo);

      // include
      expect([1,2,3]).to.include(2);
      expect('foobar').to.contain('foo');
      expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

      // empty
      expect([]).to.be.empty;
      expect('').to.be.empty;
      expect({}).to.be.empty;

      // match
      expect('foobar').to.match(/^foo/);
 */

/**
 * 通配符：
 * 1. mocha spec/{my,awesome}.js
 *    指定执行spec目录下面的my.js和awesome.js
 * 2. mocha test/unit/*.js
 *    指定执行test/unit目录下面的所有js文件
 * 
 */