var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

/**
 * 利用Mocha做逻辑测试
 */
suite('Fortune cookie tests', function(){
    test('getFortune() should return a fortune', function(){
        expect(typeof fortune.getFortune() === 'string');
    });
});
