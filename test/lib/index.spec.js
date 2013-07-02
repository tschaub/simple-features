var chai = require('chai');

var simple = require('../../lib/index');


/** @type {boolean} */
chai.Assertion.includeStack = true;
var assert = chai.assert;


describe('Point', function() {

  describe('constructor', function() {

    it('creates creates a point', function() {
      var point = new simple.Point([1, 2]);
      assert.instanceOf(point, simple.Geometry);
      assert.instanceOf(point, simple.Point);
      assert.strictEqual(point.constructor, simple.Point);
    });

  });

  describe('#coordinates', function() {

    it('provides access to coordinates', function() {
      var coords = [1, 2];
      var point = new simple.Point(coords);
      assert.strictEqual(point.coordinates, coords);
    });

  });

});


describe('LineString', function() {

  describe('constructor', function() {

    it('creates creates a line', function() {
      var line = new simple.LineString([[1, 2], [3, 4]]);
      assert.instanceOf(line, simple.Geometry);
      assert.instanceOf(line, simple.LineString);
      assert.strictEqual(line.constructor, simple.LineString);
    });

  });

  describe('#coordinates', function() {

    it('provides access to coordinates', function() {
      var coords = [[1, 2], [3, 4]];
      var line = new simple.LineString(coords);
      assert.strictEqual(line.coordinates, coords);
    });

  });

});


describe('Polygon', function() {

  describe('constructor', function() {

    it('creates creates a polygon', function() {
      var polygon = new simple.Polygon(
          [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]);
      assert.instanceOf(polygon, simple.Geometry);
      assert.instanceOf(polygon, simple.Polygon);
      assert.strictEqual(polygon.constructor, simple.Polygon);
    });

  });

  describe('#coordinates', function() {

    it('provides access to coordinates', function() {
      var coords = [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]];
      var polygon = new simple.Polygon(coords);
      assert.strictEqual(polygon.coordinates, coords);
    });

  });

});



describe('MultiPoint', function() {

  describe('constructor', function() {

    it('creates creates a multipoint', function() {
      var multipoint = new simple.MultiPoint([[1, 2], [3, 4]]);
      assert.instanceOf(multipoint, simple.Geometry);
      assert.instanceOf(multipoint, simple.MultiPoint);
      assert.strictEqual(multipoint.constructor, simple.MultiPoint);
    });

  });

  describe('#coordinates', function() {

    it('provides access to coordinates', function() {
      var coords = [[1, 2], [3, 4]];
      var multipoint = new simple.MultiPoint(coords);
      assert.strictEqual(multipoint.coordinates, coords);
    });

  });

});


describe('MultiLineString', function() {

  describe('constructor', function() {

    it('creates creates a multiline', function() {
      var multiline = new simple.MultiLineString(
          [[[1, 2], [3, 4]], [[4, 5], [6, 7]]]);
      assert.instanceOf(multiline, simple.Geometry);
      assert.instanceOf(multiline, simple.MultiLineString);
      assert.strictEqual(multiline.constructor, simple.MultiLineString);
    });

  });

  describe('#coordinates', function() {

    it('provides access to coordinates', function() {
      var coords = [[[1, 2], [3, 4]], [[4, 5], [6, 7]]];
      var multiline = new simple.MultiLineString(coords);
      assert.strictEqual(multiline.coordinates, coords);
    });

  });

});


describe('MultiPolygon', function() {

  describe('constructor', function() {

    it('creates creates a multipolygon', function() {
      var multipolygon = new simple.MultiPolygon(
          [[[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]]);
      assert.instanceOf(multipolygon, simple.Geometry);
      assert.instanceOf(multipolygon, simple.MultiPolygon);
      assert.strictEqual(multipolygon.constructor, simple.MultiPolygon);
    });

  });

  describe('#coordinates', function() {

    it('provides access to coordinates', function() {
      var coords = [[[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]];
      var multipolygon = new simple.MultiPolygon(coords);
      assert.strictEqual(multipolygon.coordinates, coords);
    });

  });

});


describe('Feature', function() {

  describe('constructor', function() {

    it('creates a new feature', function() {
      var feature = new simple.Feature();
      assert.instanceOf(feature, simple.Feature);
    });

    it('accepts properties', function() {
      var feature = new simple.Feature({foo: 'bar'});
      assert.strictEqual(feature.get('foo'), 'bar');
    });

    it('sets the default geometry', function() {
      var feature = new simple.Feature({
        name: 'BZN',
        loc: new simple.Point([-111.04, 45.68])
      });

      assert.strictEqual(feature.get('name'), 'BZN');

      var loc = feature.get('loc');
      assert.instanceOf(loc, simple.Point);

      assert.strictEqual(feature.getGeometry(), loc);
    });

  });

  describe('#getGeometry()', function() {

    it('gets geometry set in initial properties', function() {
      var geom = new simple.Point([-111.04, 45.68]);
      var feature = new simple.Feature({
        name: 'BZN',
        loc: geom
      });

      assert.strictEqual(feature.getGeometry(), geom);
    });

    it('gets geometry set after construction (via `setGeometry`)', function() {
      var geom = new simple.Point([-111.04, 45.68]);
      var feature = new simple.Feature({
        name: 'BZN'
      });

      feature.setGeometry(geom);
      assert.strictEqual(feature.getGeometry(), geom);
    });

    it('gets geometry set after construction (via `set`)', function() {
      var geom = new simple.Point([-111.04, 45.68]);
      var feature = new simple.Feature({
        name: 'BZN'
      });

      feature.set('loc', geom);
      assert.strictEqual(feature.getGeometry(), geom);
    });

  });

  describe('#setGeometry()', function() {

    it('sets the default geometry (after construction)', function() {
      var feature = new simple.Feature({
        name: 'BZN',
        loc: new simple.Point([-111.04, 45.68])
      });

      var geom = new simple.Point([-111.0, 45.7]);
      feature.setGeometry(geom);

      assert.strictEqual(feature.getGeometry(), geom);
      assert.strictEqual(feature.get('loc'), geom);
    });

  });

  describe('#get()', function() {

    it('gets a property value', function() {
      var feature = new simple.Feature({
        foo: 'bar'
      });

      assert.strictEqual(feature.get('foo'), 'bar');
      assert.isUndefined(feature.get('baz'));
    });

  });

  describe('#set()', function() {

    it('sets a property value', function() {
      var feature = new simple.Feature({
        foo: 'bar'
      });

      feature.set('foo', 'baz');
      assert.strictEqual(feature.get('foo'), 'baz');

      feature.set('bam', 'bar');
      assert.strictEqual(feature.get('bam'), 'bar');
    });

  });

});
