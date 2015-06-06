'use strict'

var semver = require('semver')
var sortComparators = require('sort-semver-comparators')

module.exports = function removeSemverConflicts (range) {
  return semver.Range(range)
    .set
    .map(sortComparators)
    .map(cleanSet)
    .map(function (comparators) {
      return comparators.map(function (comparator) {
        return comparator.toString()
      })
      .join(' ')
    })
    .join(' || ')
}

function cleanSet (comparators) {
  return comparators.reduce(function (acc, current, index) {
    var isDuplicate = comparators
      .slice()
      .splice(index, 1)
      .some(function (comparator, index) {
        if (!current.operator) {
          return comparator.test(current.semver)
        }
      })
    if (!isDuplicate) acc.push(current)
    return acc
  }, [])
}
