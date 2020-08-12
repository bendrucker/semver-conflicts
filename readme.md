# semver-conflicts [![Build Status](https://travis-ci.org/bendrucker/semver-conflicts.svg?branch=master)](https://travis-ci.org/bendrucker/semver-conflicts)

> Remove conflicts/overlaps/duplicates from a semver range

## Install

```
$ npm install --save semver-conflicts
```


## Usage

```js
var removeConflicts = require('semver-conflicts')

semverConflicts('>2 >4 <8 <10') 
//=> >=5.0.0 <8.0.0
```

## API

#### `semverConflicts(range)` -> `string`

##### range

*Required*  
Type: `string`

The semver range to process.

## License

MIT © [Ben Drucker](http://bendrucker.me)
