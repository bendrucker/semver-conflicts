'use strict'

var semver = require('semver')
var sortComparators = require('sort-semver-comparators')
var remove = require('arr-remove')

module.exports = function removeSemverConflicts (range) {
  return semver.Range(range)
    .set
    .map(sortComparators)
    .map(dedupeComparators)
    .map(stringifyComparators)
    .join(' || ')
}

function dedupeComparators (comparators) {
  return comparators.reduce(function (acc, current, index) {
    // iterate over an array that excludes the current comparator
    var isDuplicate = remove(comparators, index)
      .some(function (comparator) {
        // if there's no operator, see if the semver would satisfy the
        // comparator under test
        if (!current.operator) {
          return comparator.test(current.semver)
        }
        // both same direction (less than, greater than), maybe lte/gte
        if (current.operator.charAt(0) === comparator.operator.charAt(0)) {
          if (current.semver.version === comparator.semver.version) {
            if (current.operator === comparator.operator) {
              // for identical comparators, just pick the latter one
              return index > comparators.indexOf(comparator)
            }
            // lt beats lte, gt beats gte
            return /=/.test(current.operator)
          }
          // for gt/gte, we want the bigger version
          // for lt/lte, we want the smaller version
          var test = current.operator.charAt(0) === '>' ? 'lt' : 'gt'
          return semver[test](current.semver.toString(), comparator.semver.toString())
        }
      })
    if (!isDuplicate) acc.push(current)
    return acc
  }, [])
}

function stringifyComparators (comparators) {
  return comparators.map(function (comparator) {
    return comparator.toString()
  })
    .join(' ')
}
