'use strict'
/* global describe, it */

var chai = require('chai');
var assert = chai.assert;
var randomZ = require('../src/random-z')

var N = 10000
var sum = 0
var sum2 = 0
for (var i=0; i<N; i++) {
	var rnd = randomZ()
	sum += rnd
	sum2 += rnd * rnd
}


describe('random-z', function() {

	describe('randomZ()', function() {
	  it('should have an average of ~0', function() {
			assert.closeTo(sum/N, 0, 0.03, 'average of sum of should near 0')
	  });
		it('should have a variance of ~1', function() {
			assert.closeTo(sum2/N, 1, 0.03, 'average of sum2 should be near 1')
	  });
	})

});
