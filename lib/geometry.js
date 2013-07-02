


/**
 * Geometry constructor.  Instances of the Geometry base class are not created
 * directly.  Instead, use one of the specific geometry constructors.
 *
 * @param {Array} coordinates Coordinates array.
 * @constructor
 */
var Geometry = exports.Geometry = function Geometry(coordinates) {
  this.coordinates = coordinates;
};



/**
 * Point constructor.
 *
 * @param {Array.<number>} coordinates Coordinates array (e.g. [-111, 45]).
 * @constructor
 */
var Point = exports.Point = function Point(coordinates) {
  Geometry.call(this, coordinates);
};
Point.prototype = Object.create(Geometry.prototype, {
  constructor: {value: Point}
});



/**
 * LineString constructor.
 *
 * @param {Array.<Array.<number>>} coordinates Coordinates array (e.g.
 *     [[-111, 45], [111, -45]]).
 * @constructor
 */
var LineString = exports.LineString = function LineString(coordinates) {
  Geometry.call(this, coordinates);
};
LineString.prototype = Object.create(Geometry.prototype, {
  constructor: {value: LineString}
});



/**
 * LinearRing constructor.
 *
 * @param {Array.<Array.<number>>} coordinates Coordinates array (e.g.
 *     [[-111, 45], [111, -45], [-111, -45], [-111, 45]]).
 * @constructor
 */
var LinearRing = exports.LinearRing = function LinearRing(coordinates) {
  Geometry.call(this, coordinates);
};
LinearRing.prototype = Object.create(Geometry.prototype, {
  constructor: {value: LinearRing}
});



/**
 * Polygon constructor.
 *
 * @param {Array.<Array.<Array.<number>>>} coordinates Coordinates array (e.g.
 *     [[[-111, 45], [111, -45], [-111, -45], [-111, 45]]]).
 * @constructor
 */
var Polygon = exports.Polygon = function Polygon(coordinates) {
  Geometry.call(this, coordinates);
};
Polygon.prototype = Object.create(Geometry.prototype, {
  constructor: {value: Polygon}
});



/**
 * MultiPoint constructor.
 *
 * @param {Array.<Array.<number>>} coordinates Coordinates array (e.g.
 *     [[-111, 45], [111, -45]]).
 * @constructor
 */
var MultiPoint = exports.MultiPoint = function MultiPoint(coordinates) {
  Geometry.call(this, coordinates);
};
MultiPoint.prototype = Object.create(Geometry.prototype, {
  constructor: {value: MultiPoint}
});



/**
 * MultiLineString constructor.
 *
 * @param {Array.<Array.<Array.<number>>>} coordinates Coordinates array (e.g.
 *     [[[-111, 45], [111, 45]], [[-111, -45], [111, -45]]]).
 * @constructor
 */
var MultiLineString = exports.MultiLineString = function MultiLineString(
    coordinates) {
  Geometry.call(this, coordinates);
};
MultiLineString.prototype = Object.create(Geometry.prototype, {
  constructor: {value: MultiLineString}
});



/**
 * MultiPolygon constructor.
 *
 * @param {Array.<Array.<Array.<Array.<number>>>>} coordinates Coordinates array
 *     (e.g. [[[[-111, 45], [111, -45], [-111, -45], [-111, 45]]]]).
 * @constructor
 */
var MultiPolygon = exports.MultiPolygon = function MultiPolygon(coordinates) {
  Geometry.call(this, coordinates);
};
MultiPolygon.prototype = Object.create(Geometry.prototype, {
  constructor: {value: MultiPolygon}
});



/**
 * MixedCollection constructor.  This is a strange beast.  If you have a
 * homogenous collection (e.g. all Point) use on of the other multi-part
 * geometry constructors (e.g. MultiPoint).  This heterogenous collection
 * is a container for things like intersections between arbitrary geometries
 * (which may result in a mixed collection).  This should not be used to
 * represent a collection of geoemtries that would better be expressed as a
 * collection of features each with their own geometry.
 *
 * @param {Array.<Geometry>} parts Geometry parts.
 * @constructor
 */
var MixedCollection = exports.MixedCollection = function MixedCollection(
    parts) {
  this.parts = parts;
};
MixedCollection.prototype = Object.create(Geometry.prototype, {
  constructor: {value: MixedCollection}
});



/**
 * Empty geometry constructor.  This is another strange beast.  When you need
 * to express an empty geometry of a known type, you can use one of the other
 * constructors (e.g. Point) with a zero length coordinates array.  When you
 * need to represent an empty geometry of an unknown type (e.g. the intersection
 * of two disjoint geometries), you can use this constructor.
 *
 * @param {Array.<Geometry>} parts Geometry parts.
 * @constructor
 */
var Empty = exports.Empty = function Empty(
    parts) {
  this.parts = parts;
};
Empty.prototype = Object.create(Geometry.prototype, {
  constructor: {value: Empty}
});
