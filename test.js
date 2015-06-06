'use strict'

var test = require('tape')
var noConflict = require('./')

test(function (t) {
  t.equal(noConflict('>2'), '>=3.0.0')
  t.equal(noConflict('>2 4.0.0'), '>=3.0.0')
  t.equal(noConflict('<5 4.0.0'), '<5.0.0')
  // t.equal(noConflict('>2 <4'), '>2 <4')

  // t.equal(noConflict('<2 <4'), '<2')
  // t.equal(noConflict('>2 >4 <8'), '>4 <8')

  // t.equal(noConflict('>2 || >4'), '>4')
  // t.equal(noConflict('>2 <8 || 4'), '>2 <8')
  // t.equal(noConflict('<8 || <4'), '<8')

  t.end()
})
