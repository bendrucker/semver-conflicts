'use strict'

var test = require('tape')
var noConflict = require('./')

test(function (t) {
  t.equal(noConflict('>2'), '>=3.0.0')
  t.equal(noConflict('>2 4.0.0'), '>=3.0.0')
  t.equal(noConflict('<5 4.0.0'), '<5.0.0')
  t.equal(noConflict('>2 <4'), '>=3.0.0 <4.0.0')
  t.equal(noConflict('>2 >4 <8 <10'), '>=5.0.0 <8.0.0')

  t.equal(noConflict('<2 <4'), '<2.0.0')
  t.equal(noConflict('<2 <2'), '<2.0.0')
  t.equal(noConflict('>2 >4 <8'), '>=5.0.0 <8.0.0')

  t.end()
})
