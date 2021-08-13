function map(target, m, f) {
	
	var projection = ol.proj.get('EPSG:3857');
	var projectionExtent = projection.getExtent();
	var size = ol.extent.getWidth(projectionExtent) / 256;
	var resolutions = new Array(21);
	var matrixIds = new Array(21);
	var mmap;
	var base_emap;
	var base_photo2;
	var eagle_map;
	var overviewMapControl;
	var mousePositionControl;
	var vector;
	
	var FullScreen = new ol.control.FullScreen();
	
	var bt_class = "base_map_"+target;

    //底圖切換按鈕
	var button_base = document.createElement('button');
    button_base.innerHTML = 'P';
    button_base.setAttribute("title","切換為正射影像");
	
    var element1 = document.createElement('div');
	element1.className = 'EMAP base_map '+ bt_class +' ol-unselectable ol-control';
    element1.appendChild(button_base);
	
	var BaseMapControl =  new ol.control.Control(
	{
		element: element1
	});
	
	if(m) {
		//測量工具按鈕-線
		var button_tool_Line = document.createElement('button');
		button_tool_Line.innerHTML = 'L';
		button_tool_Line.setAttribute("title", "線段量測工具");

		var element2 = document.createElement('div');
		element2.className = 'button_tool button_tool_Line ol-unselectable ol-control';
		element2.appendChild(button_tool_Line);
		
		var ToolControl1 =  new ol.control.Control(
		{
			element: element2
		});
		
		//測量工具按鈕-面
		var button_tool_Polygon = document.createElement("button");
		button_tool_Polygon.innerHTML = "A";
		button_tool_Polygon.setAttribute("title","面積量測工具");

		var element3 = document.createElement('div');
		element3.className = 'button_tool button_tool_Polygon ol-unselectable ol-control';
		element3.appendChild(button_tool_Polygon);
		
		var ToolControl2 =  new ol.control.Control({
			element: element3
		});
		
		//測量工具按鈕-清除
		var button_tool_Clear = document.createElement("button");
		button_tool_Clear.innerHTML = "C";
		button_tool_Clear.setAttribute("title","清除測量");

		var element4 = document.createElement("div");
		element4.className = "button_tool_Clear ol-unselectable ol-control";
		element4.appendChild(button_tool_Clear);
		
		var ToolControl3 =  new ol.control.Control({element: element4});
	}
  
  $("#" + target).empty();
  //底圖圖層
   base_emap = new ol.layer.Tile({
			  opacity: 1,
			  source: new ol.source.WMTS({
				attributions:
				  '國土測繪中心WMTS',
				url:
				  'https://wmts.nlsc.gov.tw/wmts?',
				layer: '0',
				matrixSet: 'EPSG:3857',
				format: 'image/png',
				projection: projection,
				tileGrid: new ol.tilegrid.WMTS({
				  origin: ol.extent.getTopLeft(projectionExtent),
				  resolutions: resolutions,
				  matrixIds: matrixIds,
				}),
				layer:'EMAP5',
				style: 'default',
				wrapX: true,
			  }),			  
			});
			
   base_photo2 = new ol.layer.Tile({
		  opacity: 1,
		  visible: false, // 透過visible控制顯示
		  source: new ol.source.WMTS({
			attributions:
			  '國土測繪中心WMTS',
			url:
			  'https://wmts.nlsc.gov.tw/wmts?',
			layer: '0',
			matrixSet: 'EPSG:3857',
			format: 'image/png',
			projection: projection,
			tileGrid: new ol.tilegrid.WMTS({
			  origin: ol.extent.getTopLeft(projectionExtent),
			  resolutions: resolutions,
			  matrixIds: matrixIds,
			}),
			layer: 'PHOTO2',
			style: 'default',
			wrapX: true,
		  }),
		});
   
   eagle_map = new ol.layer.Tile({ // 預設顯示的底圖
		  opacity: 1,
		  source: new ol.source.WMTS({
			url:
			  'https://wmts.nlsc.gov.tw/wmts?',
			layer: '0',
			matrixSet: 'EPSG:3857',
			format: 'image/png',
			projection: projection,
			tileGrid: new ol.tilegrid.WMTS({
			  origin: ol.extent.getTopLeft(projectionExtent),
			  resolutions: resolutions,
			  matrixIds: matrixIds,
			}),
			layer:'EMAP5',
			style: 'default',
			wrapX: true,
		  }),			  
		});
		
	//測量用Group
	var group_vector = new ol.layer.Group();
	var group_vectorCollection = group_vector.getLayers();
	
	//新增 編輯layer
	var geomvectorsource = new ol.source.Vector({
		features: []
	});
	var geomvector = new ol.layer.Vector({
	  source: geomvectorsource,
	  style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: "rgba(209, 209, 209, 0.5)",
		}),
		stroke: new ol.style.Stroke({
			color: "#405A40",
			width: 2,
		}),
	  }),
	});
	
	//額外用layer
	var geomextrasource = new ol.source.Vector({
		features: []
	});
	var geomextra = new ol.layer.Vector({
	  source: geomextrasource,
	  style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: "rgba(209, 209, 209, 0.5)",
		}),
		stroke: new ol.style.Stroke({
			color: "#405A40",
			width: 2,
		}),
	  }),
	});
	
	//Tracing用
	var previewLine = new ol.Feature({
		geometry: new ol.geom.LineString([]),
	});
	var previewVector = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [previewLine],
			}),
				style: new ol.style.Style({
					stroke: new ol.style.Stroke({
					color: 'rgba(255, 0, 0, 1)',
					width: 2,
			}),
		}),
	});
	
	//匯入用Group
	var group_import = new ol.layer.Group();
	var group_importCollection = group_import.getLayers();
	
	for (var z = 0; z < 21; ++z) {
	  // generate resolutions and matrixIds arrays for this WMTS
	  resolutions[z] = size / Math.pow(2, z);
	  matrixIds[z] = z;
	}
	overviewMapControl = new ol.control.OverviewMap({
		layers: [
			eagle_map
		],
	});
		
   //台灣範圍坐標轉換
   var coner1 = ol.proj.transform([118, 21], 'EPSG:4326', 'EPSG:3857');
   var coner2 = ol.proj.transform([123, 26], 'EPSG:4326', 'EPSG:3857');
   
   mousePosition();
   
   if(!m) {
		ToolControl1 = new ol.control.Control({element:document.createElement('div')});
		ToolControl2 = new ol.control.Control({element:document.createElement('div')});
		ToolControl3 = new ol.control.Control({element:document.createElement('div')});
	}
	if(!f) {
		FullScreen = new ol.control.Control({element:document.createElement('div')});
	}
	  
   mmap = new ol.Map({
        target: target,
		controls: ol.control.defaults().extend([
			mousePositionControl,
			overviewMapControl,
			BaseMapControl,
			new ol.control.ZoomToExtent({extent:[coner1[0],coner1[1],coner2[0],coner2[1]]}),
			FullScreen,
			ToolControl1,
			ToolControl2,
			ToolControl3,
		]),
        layers: [
          base_emap,
		  base_photo2,
		  geomextra,
		  geomvector,
		  previewVector,
		  group_import,
		  group_vector
		  //透過順序的方式寫進地圖
        ],
        view: new ol.View({
           center: ol.proj.fromLonLat([121.55, 25.05]),
          zoom: 11,
		  maxZoom: 22
        })
      });
	  	  
	  $(".ol-zoom-extent").children().attr("title","全臺範圍");	
	  $(".ol-overviewmap").children("button").attr("title","鷹眼圖");	
	  $(".ol-full-screen").children().attr("title","全螢幕模式");	
	  
	  $("."+ bt_class).click(function() {
		if($(this).hasClass("EMAP")) {
			mmap.addPHOTO2();
			$(this).removeClass("EMAP");
			$(this).addClass("PHOTO");
			$(this).children().text("M").attr("title","切換為電子地圖");			
		}
		else {
			mmap.addEMAP();
			$(this).removeClass("PHOTO");
			$(this).addClass("EMAP");
			$(this).children().text("P").attr("title","切換為正射影像");		
		}		
	});
		
	$(".button_tool").click(function() {		
		var t;
		if ($(this).hasClass("button_tool_Line")) {
			t = "LineString";
		}
		else {
			t = "Polygon"
		}

        mmap.removeInteraction(draw);		
		measure(mmap,t);	
	});
	
	$(".button_tool_Clear").click(function() {
		var mm  = mmap.getOverlays().getArray().slice(0);
		mm.forEach(item => mmap.removeOverlay(item));
		
		mmap.group_vectorCollection.clear();	
		mmap.removeInteraction(draw);					
	});
	
	mmap.updateSize();
	
	//透過回傳物件的方式處理圖層
	//測量用group
	mmap.group_vector = group_vector;
	mmap.group_vectorCollection = group_vectorCollection;
	
	//新增、編輯用layer
	mmap.geomvector_source = geomvectorsource;
	mmap.geomvector_layer = geomvector;

	// 額外用
	mmap.geomextra_source = geomextrasource;
	mmap.geomextra_layer = geomextra;

	//匯入讀取用
	mmap.group_import = group_import;
	mmap.group_importCollection = group_importCollection;

	//底圖
	mmap.eagle_map = eagle_map;
	mmap.base_emap = base_emap;
	mmap.base_photo2 = base_photo2;
	
	function mousePosition() //滑鼠座標位置
	{
		mousePositionControl = new ol.control.MousePosition({
			coordinateFormat: ol.coordinate.createStringXY(6),
			projection: 'EPSG:4326',

			className: 'custom-mouse-position',
			target: document.getElementById('mouse_position'),
			undefinedHTML: '&nbsp;',
		});
		
		prjtwd97(target);
    }
	
	// 外部需要用用到的事件放這裡
    mmap.addPHOTO2 = function() {
		base_photo2.setVisible(true);
		base_emap.setVisible(false);
	};
	
	mmap.addEMAP = function() {
		base_photo2.setVisible(false);
		base_emap.setVisible(true);
	};
	
	// 外部需要用用到的事件放這裡
	// 設定tracing用的事件
	mmap.setTracingEvent = function(targetevent, type) {
		var drawInteraction, tracingFeature, startPoint, endPoint;
		var drawing = false;
		
		var getFeatureOptions = {
			hitTolerance: 1,
			layerFilter: function (layer) {
				return layer == geomextra;
			},
		};
		
		mmap.on("click", function (event) {
			if (!drawing) {
				return;
			}
			var hit = false;
			mmap.forEachFeatureAtPixel(event.pixel, function(feature) {
				if (tracingFeature && feature !== tracingFeature) {
					return;
				}
				hit = true;
				var coord = mmap.getCoordinateFromPixel(event.pixel);
				if (feature == tracingFeature) {
					endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
					var pix = mmap.getPixelFromCoordinate(endPoint);
					// 兩者需小於15PIXEL 才要Tracing
					if (length(pix, event.pixel) <= 15) {
						var appendCoords = getPartialRingCoords(
							tracingFeature,
							startPoint,
							endPoint
						);
						targetevent.removeLastPoint();
						targetevent.appendCoordinates(appendCoords);
						tracingFeature = null;
					}
				}
				tracingFeature = feature;
				startPoint = tracingFeature.getGeometry().getClosestPoint(coord);
			}, getFeatureOptions);
			if (!hit) {
				previewLine.getGeometry().setCoordinates([]);
				tracingFeature = null;
			}
		});
		
		mmap.on("pointermove", function(event) {
			if (tracingFeature && drawing) {
				let coord = null;
				mmap.forEachFeatureAtPixel(
					event.pixel,
					function(feature) {
						if (tracingFeature === feature) {
							coord = mmap.getCoordinateFromPixel(event.pixel);
						}
					},
					getFeatureOptions
				);

				let previewCoords = [];
				if (coord) {
					endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
					var pix = mmap.getPixelFromCoordinate(endPoint);
					// 兩者需小於15PIXEL 才要Tracing
					if (length(pix, event.pixel) <= 15) {
						previewCoords = getPartialRingCoords(
							tracingFeature,
							startPoint,
							endPoint
						);
					}
				}
				previewLine.getGeometry().setCoordinates(previewCoords);
			}
		});
		
		function addInteraction(targetevent, type) {
			var value = "Polygon";
			if (value != "None" && type == "draw") {
				targetevent.on("drawstart", function() {
					drawing = true;
				});
				targetevent.on("drawend", function() {
					drawing = false;
					previewLine.getGeometry().setCoordinates([]);
					tracingFeature = null;
				});
				var snapInteraction = new ol.interaction.Snap({
					source: geomextrasource,
				});
				mmap.addInteraction(snapInteraction);
				targetevent.snapInteraction = snapInteraction;
			}
			else if (value != "None" && type == "edit") {
				var snapInteraction = new ol.interaction.Snap({
					source: geomextrasource,
				});
				targetevent.snapInteraction = snapInteraction;
			}
		}
		
		addInteraction(targetevent, type);
	};
	
	return mmap;
}


	