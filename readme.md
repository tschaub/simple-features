# Simple Features

[![Greenkeeper badge](https://badges.greenkeeper.io/tschaub/simple-features.svg)](https://greenkeeper.io/)

A simple feature model for working with geospatial data in JavaScript.

Note that this doesn't strictly follow the [OGC Simple Features](https://en.wikipedia.org/wiki/Simple_Features) spec(s).  Instead, see [GeoJSON](http://geojson.org/) for inspiration.


## Installation

Typically, you'll add `simple-features` as a dependency of another package.

    npm install simple-features --save

(Exclude the `--save` option if you are installing locally just to try it out.)


## Simple Example

Create a new feature with one string property and one geometry.

```js
var assert = require('assert');
var simple = require('simple-features');

var feature = new simple.Feature({
  name: 'Bozeman',
  loc: new simple.Point([-111.04, 45.68])
});
```

Features can have arbitrary properties.  To access a property value, use the `get` method.

```js
var value = feature.get('name');

assert.strictEqual(value, 'Bozeman');
```

Features typically have a single geometry, but they can have more.  In cases where a feature has more than one geometry, the first one is considered the "default" geometry.  The default geometry can be accessed by using the `get` method with the property name or with the `getGeometry` method.

```js
var loc = feature.get('loc');
var geom = feature.getGeometry();

assert.strictEqual(loc, geom);
```

Geometries have multi-dimensional coordinate arrays of the same form as [GeoJSON](http://geojson.org/).

```js
var coords = feature.getGeometry().coordinates;

assert.deepEqual(coordinates, [-111.04, 45.68]);
```

Until there are more docs here, see the [tests](./test/lib/index.spec.js) for more detail.

## Development

[![Current Status](https://secure.travis-ci.org/tschaub/simple-features.png?branch=master)](https://travis-ci.org/tschaub/simple-features)

Run tests with the `test` script:

    npm test

You can also set up a watcher to run tests continuously during development.

    npm run watch
