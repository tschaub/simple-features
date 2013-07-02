var Geometry = require('./geometry').Geometry;



/**
 * Feature contructor
 *
 * @param {Object} properties Feature properties.
 * @constructor
 */
var Feature = exports.Feature = function Feature(properties) {
  if (properties) {
    this.properties = properties;
    var geomName, value;
    for (var key in properties) {
      value = properties[key];
      if (value instanceof Geometry) {
        geomName = key;
        break;
      }
    }
    this._geomName = geomName;
  }
};


/**
 * Default geometry name ('geometry').  This will be used if a geometry is
 * not provided to the constructor and `setGeometry` is later called.
 *
 * @type {string}
 */
Feature.prototype.defaultGeomName = 'geometry';


/**
 * Get the feature's default geometry.
 *
 * @return {Geometry} The feature's default geometry (or `undefined` if none).
 */
Feature.prototype.getGeometry = function() {
  return this._geomName && this.properties[this._geomName];
};


/**
 * Set the feature's default geometry.
 *
 * @param {Geometry} geometry The default geometry for the feature.
 */
Feature.prototype.setGeometry = function(geometry) {
  if (this._geomName) {
    this.properties[this._geomName] = geometry;
  } else {
    if (!this.properties) {
      this.properties = {};
    }
    this._geomName = this.defaultGeomName;
    this.properties[this._geomName] = geometry;
  }
};


/**
 * Get a property value.
 *
 * @param {string} name Property name.
 * @return {*} Property value.
 */
Feature.prototype.get = function(name) {
  return this.properties && this.properties[name];
};


/**
 * Set a property value.
 *
 * @param {string} name Property name.
 * @param {*} value Property value.
 */
Feature.prototype.set = function(name, value) {
  if (!this.properties) {
    this.properties = {};
  }
  if (this.properties.hasOwnProperty(name)) {
    this.properties[name] = value;
  } else {
    // setting a new properties, check if geometry
    if (!this._geomName && value instanceof Geometry) {
      this._geomName = name;
    }
    this.properties[name] = value;
  }
};
