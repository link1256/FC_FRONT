function map(target, m, f, l) {
	
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
	
	var bt_class = "base_map_" + target;

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
		
	var wmts1;
	var wmts2;
	var wmts3;
	var wmts4;
	var wmts5;
	var wmts6;
	
	wmts1 = new ol.layer.Tile({
		opacity: 1,
		visible: false,
		source: new ol.source.WMTS({
			attributions:
			'1/5000基本地形圖',
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
			layer:'B5000',
			style: 'default',
			wrapX: true,
		}),			  
	});
	
	wmts2 = new ol.layer.Tile({
		opacity: 1,
		visible: false,
		source: new ol.source.WMTS({
			attributions:
			'段籍圖',
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
			layer:'LANDSECT',
			style: 'default',
			wrapX: true,
		}),			  
	});
	
	wmts3 = new ol.layer.Tile({
		opacity: 1,
		visible: false,
		source: new ol.source.WMTS({
			attributions:
			'縣市界',
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
			layer:'CITY',
			style: 'default',
			wrapX: true,
		}),			  
	});
	
	wmts4 = new ol.layer.Tile({
		opacity: 1,
		visible: false,
		source: new ol.source.WMTS({
			attributions:
			'鄉鎮區界',
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
			layer:'TOWN',
			style: 'default',
			wrapX: true,
		}),
	});
	
	wmts5 = new ol.layer.Tile({
		opacity: 1,
		visible: false,
		source: new ol.source.WMTS({
			attributions:
			'CadastralMap_CadastralMap_Tiled_109Dec',
			url:
			CommitteeApi + CommitteeToken,
			layer: '0',
			matrixSet: 'GoogleMapsCompatible',
			format: 'image/png',
			projection: projection,
			tileGrid: new ol.tilegrid.WMTS({
				origin: ol.extent.getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			layer:'',
			style: 'default',
			wrapX: true,
		}),
	});

	wmts6 = new ol.layer.Tile({
		opacity: 1,
		visible: false,
		source: new ol.source.WMTS({
			attributions:
			'地籍圖',
			url:
			'https://landmaps.nlsc.gov.tw/S_Maps/wmts',
			layer: '0',
			matrixSet: 'EPSG:3857',
			format: 'image/png',
			projection: projection,
			tileGrid: new ol.tilegrid.WMTS({
				origin: ol.extent.getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			layer:'DMAPS',
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
	var geomvectorsource1 = new ol.source.Vector({
		features: []
	});
	var geomvector1 = new ol.layer.Vector({
	  source: geomvectorsource1,
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
	var geomvectorsource2 = new ol.source.Vector({
		features: []
	});
	var geomvector2 = new ol.layer.Vector({
	  source: geomvectorsource2,
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
	var geomvectorsource3 = new ol.source.Vector({
		features: []
	});
	var geomvector3 = new ol.layer.Vector({
	  source: geomvectorsource3,
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
	
	//top layer
	var geomtopsource = new ol.source.Vector({
		features: []
	});
	var geomtopvector = new ol.layer.Vector({
	  source: geomtopsource,
	  style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: "rgba(0, 0, 0, 0)",
		}),
		stroke: new ol.style.Stroke({
			color: "rgba(255, 0, 0, 1)",
			width: 1,
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
	
	// 站臺外WMTS介接按鈕
	var button_wmt = document.createElement('button');
	button_wmt.setAttribute("title", "套疊圖層");
    button_wmt.innerHTML = 'M';
	
	var element4 = document.createElement('div');
	element4.className = 'EMAP wmts_map ol-unselectable ol-control';
    element4.appendChild(button_wmt);
	
	var ToolControl4 = new ol.control.Control({ 
		element: element4
	});
	  
   mmap = new ol.Map({
        target: target,
		controls: ol.control.defaults().extend([
			mousePositionControl,
			BaseMapControl,
			new ol.control.ZoomToExtent({extent:[coner1[0],coner1[1],coner2[0],coner2[1]]}),
			FullScreen,
			ToolControl1,
			ToolControl2,
			ToolControl3,
			ToolControl4,
		]),
        layers: [
			base_emap,
			base_photo2,
			wmts1,
			wmts2,
			wmts3,
			wmts4,
			wmts5,
			wmts6,
			geomvector3,
			geomvector1,
			geomvector2,
			geomvector,
			geomextra,
			previewVector,
			group_import,
			group_vector,
			geomtopvector
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
	
	// WMTS按鈕展開
	$(".wmts_map").click(function() {
		// 有Window
		if (!mmap.wmts_window) {
			var wmt_window = document.createElement('div');
			wmt_window.id = 'wmts_window';
			wmt_window.className = 'wmts_window';

			var div6 = document.createElement('div');
			div6.className = 'wmts_item';
			
			var input6 = document.createElement('input');
			input6.type = 'checkbox';
			input6.id = 'wmap6';
			var label6 = document.createElement('label');
			label6.innerHTML = '地籍圖';
			label6.htmlFor = 'wmap6';
			
			div6.appendChild(input6);
			div6.appendChild(label6);
			
			wmt_window.appendChild(div6);
			
			var div2 = document.createElement('div');
			div2.className = 'wmts_item';
			
			var input2 = document.createElement('input');
			input2.type = 'checkbox';
			input2.id = 'wmap2';
			var label2 = document.createElement('label');
			label2.innerHTML = '段籍圖';
			label2.htmlFor = 'wmap2';
			
			div2.appendChild(input2);
			div2.appendChild(label2);
			
			wmt_window.appendChild(div2);
			
			var div3 = document.createElement('div');
			div3.className = 'wmts_item';
			
			var input3 = document.createElement('input');
			input3.type = 'checkbox';
			input3.id = 'wmap3';
			var label3 = document.createElement('label');
			label3.innerHTML = '縣市界';
			label3.htmlFor = 'wmap3';
			
			div3.appendChild(input3);
			div3.appendChild(label3);
			
			wmt_window.appendChild(div3);
			
			var div4 = document.createElement('div');
			div4.className = 'wmts_item';
			
			var input4 = document.createElement('input');
			input4.type = 'checkbox';
			input4.id = 'wmap4';
			var label4 = document.createElement('label');
			label4.innerHTML = '鄉鎮界';
			label4.htmlFor = 'wmap4';
			
			div4.appendChild(input4);
			div4.appendChild(label4);
			
			wmt_window.appendChild(div4);
			
			var div1 = document.createElement('div');
			div1.className = 'wmts_item';
			
			var input1 = document.createElement('input');
			input1.type = 'checkbox';
			input1.id = 'wmap1';
			var label1 = document.createElement('label');
			label1.innerHTML = '地形圖';
			label1.htmlFor = 'wmap1';
			
			div1.appendChild(input1);
			div1.appendChild(label1);
			
			wmt_window.appendChild(div1);
			
			wmt_window.style.pointerEvents = "auto";
			$(".ol-overlaycontainer-stopevent").append(wmt_window);
			
			mmap.wmts_window = wmt_window;
			mmap.wmts_window_show = true;
			
			$("#wmap1").click(function() {		
				if (this.checked) {
					wmts1.setVisible(true);
				}
				else {
					wmts1.setVisible(false);
				}
			});
			
			$("#wmap2").click(function() {		
				if (this.checked) {
					wmts2.setVisible(true);
				}
				else {
					wmts2.setVisible(false);
				}
			});
			
			$("#wmap3").click(function() {		
				if (this.checked) {
					wmts3.setVisible(true);
				}
				else {
					wmts3.setVisible(false);
				}
			});
			
			$("#wmap4").click(function() {		
				if (this.checked) {
					wmts4.setVisible(true);
				}
				else {
					wmts4.setVisible(false);
				}
			});
			
			$("#wmap5").click(function() {		
				if (this.checked) {
					wmts5.setVisible(true);
				}
				else {
					wmts5.setVisible(false);
				}
			});

			$("#wmap6").click(function() {		
				if (this.checked) {
					wmts6.setVisible(true);
				}
				else {
					wmts6.setVisible(false);
				}
			});
		}
		else {
			if (mmap.wmts_window_show) {
				mmap.wmts_window_show = false;
				$("#wmts_window").hide();
			}
			else {
				mmap.wmts_window_show = true;
				$("#wmts_window").show();
			}
		}
	});
	
	// WMTS
	mmap.wmts1 = wmts1;
	mmap.wmts2 = wmts2;
	mmap.wmts3 = wmts3;
	mmap.wmts4 = wmts4;
	mmap.wmts5 = wmts5;
		
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
	
	refreshMapSizeWhenReady(mmap, target);
	
	//透過回傳物件的方式處理圖層
	//測量用group
	mmap.group_vector = group_vector;
	mmap.group_vectorCollection = group_vectorCollection;
	
	//新增、編輯用layer
	mmap.geomvector_source = geomvectorsource;
	mmap.geomvector_layer = geomvector;
	
	mmap.geomvector_source1 = geomvectorsource1;
	mmap.geomvector_layer1 = geomvector1;
	
	mmap.geomvector_source2 = geomvectorsource2;
	mmap.geomvector_layer2 = geomvector2;
	
	mmap.geomvector_source3 = geomvectorsource3;
	mmap.geomvector_layer3 = geomvector3;
	
	
	//top用layer
	mmap.geomtopvector_source = geomtopsource;
	mmap.geomtopvector_layer = geomtopvector;

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
			undefinedHTML: '',
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
	
	if (l) {
		// legend 用
		var legend = document.createElement("div");
		legend.id = "maplegend";
		legend.className = "ol-unselectable ol-control";
		legend.style.position = "absolute";
		legend.style.left = "10px";
		legend.style.bottom = "25px";
		legend.style.borderRadius = "5px";
		legend.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
		legend.style.pointerEvents = "auto";

		mmap.legend = legend;

		$(".ol-overlaycontainer-stopevent").append(legend);
	}
	
	return mmap;
}

function refreshMapSizeWhenReady(mmap, target) {
	var targetElement = typeof target === "string" ? document.getElementById(target) : target;
	var attempts = 0;
	var delays = [0, 16, 50, 100, 250, 500, 1000];

	function refresh() {
		attempts += 1;
		if (targetElement) {
			var rect = targetElement.getBoundingClientRect();
			if (rect.width > 0 && rect.height > 0) {
				mmap.updateSize();
			}
		}
		else {
			mmap.updateSize();
		}
		if (attempts < delays.length) {
			window.setTimeout(refresh, delays[attempts]);
		}
	}

	if (window.requestAnimationFrame) {
		window.requestAnimationFrame(refresh);
	}
	else {
		refresh();
	}
}


	
