var draw;
var helpTooltipElement;
var measureTooltipElement;
var helpMsg = null;


function measure(mmap,t){
 
		  
//量測功能
		
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
   source: source,
   style: new ol.style.Style({
   fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33',
      }),
    }),
  }),
});
vector.setZIndex(100);


var sketch;
var helpTooltip;
var measureTooltip;
var continuePolygonMsg = '點擊下一個點或雙擊結束面積';
var	continueLineMsg = '點擊下一個點或雙擊結束線段';

//測量工具
 
 pointerMoveHandler = function (evt) {
	    
  if (evt.dragging) {
    return;
  }
  helpMsg = '點擊圖面開始測量';
  if (sketch) {
    var geom = sketch.getGeometry();
    if (geom instanceof ol.geom.Polygon) {
      helpMsg = continuePolygonMsg;
    } else if (geom instanceof ol.geom.LineString) {
      helpMsg = continueLineMsg;
    }
  }
    
  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);
  
  helpTooltipElement.classList.remove('hidden');
};

	mmap.on('pointermove', pointerMoveHandler);
	mmap.getViewport().addEventListener('mouseout', function () {
			helpTooltipElement.classList.add('hidden');		
		  });
	
	
	  var formatLength = function (line) {
	  var length = ol.sphere.getLength(line);
	  var output;
	  if (length > 100) {
		output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
	  } else {
		output = Math.round(length * 100) / 100 + ' ' + 'm';
	  }
	  return output;
	}

	var formatArea = function (polygon) {
	  var area = ol.sphere.getArea(polygon);
	  var output;
	  if (area > 10000) {
		output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
	  } else {
		output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
	  }
	  return output;
	}

  function addInteraction() {
  var type = t;
  draw = new ol.interaction.Draw({
    source: source,
    type: type,
    style: new ol.style.Style({		
     fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),	  
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
      }),	  
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
      }),
    }),
  });
   mmap.addInteraction(draw);
  
   createMeasureTooltip();
   createHelpTooltip();
  
  var listener;
 
  draw.on('drawstart', function (evt) {
    // set sketch
    sketch = evt.feature;

    /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
    var tooltipCoord = evt.coordinate;

    listener = sketch.getGeometry().on('change', function (evt) {
      var geom = evt.target;
      var output;
      if (geom instanceof ol.geom.Polygon) {
        output = formatArea(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof ol.geom.LineString) {
        output = formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      measureTooltipElement.innerHTML = output;
      measureTooltip.setPosition(tooltipCoord);
    });
  });

  draw.on('drawend', function () {
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
    measureTooltip.setOffset([0, -7]);
    // unset sketch
    sketch = null;
    // unset tooltip so that a new one can be created
    measureTooltipElement = null;
    createMeasureTooltip();
    ol.Observable.unByKey(listener);
  });
}

function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left',
  });
  mmap.addOverlay(helpTooltip);
}

function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center',
  });
  mmap.addOverlay(measureTooltip);
}

//group_vectorCollection.getArray().push(vector);
group_vectorCollection.push(vector);
addInteraction();	
}



   function prjtwd97(map){
	//定義坐標系統的參數
		 proj4.defs([
		  [
			'EPSG:4326',
			'+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
		  [
			'EPSG:3826',
			'+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs'
		  ],
		  [
			'EPSG:3825',
			'+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=119 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs'
		  ]
		]);
		
		var EPSG3826 = new proj4.Proj('EPSG:3826');//TWD97 121分帶
		var EPSG3825 = new proj4.Proj('EPSG:3825');//TWD97 119分帶
		var EPSG4326 = new proj4.Proj('EPSG:4326');//WGS84
		var mouseposition;
		
			
		$("#"+map).on('pointermove', function(evt){
        mouseposition = $(".custom-mouse-position").text();
		$(".twd97").remove();
        $(".custom-mouse-position").show();		
		$(".custom-mouse-position").after("<div class='twd97'></div>");	
		
		var mouseposition_text = mouseposition.split(",");
	    var mX = parseFloat(mouseposition_text[0]);
	    var mY = parseFloat(mouseposition_text[1]);
		
		var newprj3826 = proj4(EPSG4326, EPSG3826, [mX,mY]);
		var X97 = newprj3826[0].toString().substring(0,9);
		var Y97 = newprj3826[1].toString().substring(0,10);
	    // var newprj3825 = proj4(EPSG4326, EPSG3825, [mX, mY]);
		
		$(".twd97").text(X97+", "+Y97);
		});
		
		$("#"+map).on('pointerout',function(){
			$(".twd97").remove();
			$(".custom-mouse-position").hide();
		});
    }
