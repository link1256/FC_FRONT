// coordinates; will return the length of the [a, b] segment
function length(a, b) {
	return Math.sqrt(
		(b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])
	);
}

// coordinates; will return true if c is on the [a, b] segment
function isOnSegment(c, a, b) {
	var lengthAc = length(a, c);
	var lengthAb = length(a, b);
	var dot = ((c[0] - a[0]) * (b[0] - a[0]) + (c[1] - a[1]) * (b[1] - a[1])) / lengthAb;
	return Math.abs(lengthAc - dot) < 1e-6 && lengthAc < lengthAb;
}

// modulo for negative values, eg: mod(-1, 4) returns 3
function mod(a, b) {
	return ((a % b) + b) % b;
}

// returns a coordinates array which contains the segments of the feature's
// outer ring between the start and end points
// Note: this assumes the base feature is a single polygon
function getPartialRingCoords(feature, startPoint, endPoint) {
	var polygon = feature.getGeometry();
	if (polygon.getType() === 'MultiPolygon') {
		polygon = polygon.getPolygon(0);
	}
	var ringCoords = polygon.getLinearRing().getCoordinates();

	var i, pointA, pointB, startSegmentIndex = -1;
	for (i = 0; i < ringCoords.length; i++) {
		pointA = ringCoords[i];
		pointB = ringCoords[mod(i + 1, ringCoords.length)];

		// check if this is the start segment dot product
		if (isOnSegment(startPoint, pointA, pointB)) {
			startSegmentIndex = i;
			break;
		}
	}

	var cwCoordinates = [];
	var cwLength = 0;
	var ccwCoordinates = [];
	var ccwLength = 0;

	// build clockwise coordinates
	for (i = 0; i < ringCoords.length; i++) {
		pointA =
		  i === 0
			? startPoint
			: ringCoords[mod(i + startSegmentIndex, ringCoords.length)];

		pointB = ringCoords[mod(i + startSegmentIndex + 1, ringCoords.length)];
		cwCoordinates.push(pointA);

		if (isOnSegment(endPoint, pointA, pointB)) {
			cwCoordinates.push(endPoint);
			cwLength += length(pointA, endPoint);
			break;
		} else {
			cwLength += length(pointA, pointB);
		}
	}

	// build counter-clockwise coordinates
	for (i = 0; i < ringCoords.length; i++) {
		pointA = ringCoords[mod(startSegmentIndex - i, ringCoords.length)];
		pointB =
			i === 0
				? startPoint
				: ringCoords[mod(startSegmentIndex - i + 1, ringCoords.length)];
		
		ccwCoordinates.push(pointB);

		if (isOnSegment(endPoint, pointA, pointB)) {
			ccwCoordinates.push(endPoint);
			ccwLength += length(endPoint, pointB);
			break;
		} else {
			ccwLength += length(pointA, pointB);
		}
	}
	// console.log(ccwLength);
	// console.log(cwLength);
	// keep the shortest path
	// return ccwLength < cwLength ? (ccwLength < 10 ? ccwCoordinates : []) : (cwLength < 10 ? cwCoordinates : []);
	return ccwLength < cwLength ? ccwCoordinates : cwCoordinates;
}
/**
 * Get / create a valid version of the geometry given. If the geometry is a polygon or multi polygon, self intersections /
 * inconsistencies are fixed. Otherwise the geometry is returned.
 *
 * @param geom
 * @return a geometry
 */
var jsts_validate = function(geom) {
  if (geom instanceof jsts.geom.Polygon) {
    if (geom.isValid()) {
      geom.normalize(); // validate does not pick up rings in the wrong order - this will fix that
      return geom; // If the polygon is valid just return it
    }
    var polygonizer = new jsts.operation.polygonize.Polygonizer();
    jsts_addPolygon(geom, polygonizer);
    return jsts_toPolygonGeometry(polygonizer.getPolygons(), geom.getFactory());
  } else if (geom instanceof jsts.geom.MultiPolygon) {
    if (geom.isValid()) {
      geom.normalize(); // validate does not pick up rings in the wrong order - this will fix that
      return geom; // If the multipolygon is valid just return it
    }
    var polygonizer = new jsts.operation.polygonize.Polygonizer();

    for (var n = geom.getNumGeometries(); n > 0; n--) {
      jsts_addPolygon(geom.getGeometryN(n - 1), polygonizer);
    }
    return jsts_toPolygonGeometry(polygonizer.getPolygons(), geom.getFactory());
  } else {
    return geom; // In my case, I only care about polygon / multipolygon geometries
  }
};

/**
 * Add all line strings from the polygon given to the polygonizer given
 *
 * @param polygon polygon from which to extract line strings
 * @param polygonizer polygonizer
 */
var jsts_addPolygon = function(polygon, polygonizer) {
  jsts_addLineString(polygon.getExteriorRing(), polygonizer);

  for (var n = polygon.getNumInteriorRing(); n > 0; n--) {
    jsts_addLineString(polygon.getInteriorRingN(n), polygonizer);
  }
};

/**
 * Add the linestring given to the polygonizer
 *
 * @param linestring line string
 * @param polygonizer polygonizer
 */
var jsts_addLineString = function(lineString, polygonizer) {
  if (!lineString) return;
  
  if (lineString instanceof jsts.geom.LinearRing) {
    // LinearRings are treated differently to line strings : we need a LineString NOT a LinearRing
    lineString = lineString.getFactory().createLineString(lineString.getCoordinateSequence());
  }

  // unioning the linestring with the point makes any self intersections explicit.
  var point = lineString.getFactory().createPoint(lineString.getCoordinateN(0));
  var toAdd = lineString.union(point); //geometry

  //Add result to polygonizer
  polygonizer.add(toAdd);
}

/**
 * Get a geometry from a collection of polygons.
 *
 * @param polygons collection
 * @param factory factory to generate MultiPolygon if required
 * @return null if there were no polygons, the polygon if there was only one, or a MultiPolygon containing all polygons otherwise
 */
var jsts_toPolygonGeometry = function(polygons, factory) {
  switch (polygons.size()) {
    case 0:
      return null; // No valid polygons!
    case 1:
      return polygons.iterator().next(); // single polygon - no need to wrap
    default:
      //polygons may still overlap! Need to sym difference them
      var iter = polygons.iterator();
      var ret = iter.next();
      while (iter.hasNext()) {
        ret = ret.symDifference(iter.next());
      }
      return ret;
  }
}