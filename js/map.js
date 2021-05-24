//測量用的全域變數
var group_vector;
var group_vectorCollection;
function map(target,m){
	
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
	
	var bt_class = "base_map_"+target;

    //底圖切換按鈕
	var button_base = document.createElement('button');
    button_base.innerHTML = 'P';
    button_base.setAttribute("title","切換為正射影像");
	
    var element1 = document.createElement('div');
	element1.className = 'EMAP base_map '+ bt_class +' ol-unselectable ol-control';
    element1.appendChild(button_base);
	
	var BaseMapControl =  new ol.control.Control({
	element: element1}
    );
	
	if(m){
	//測量工具按鈕-線
	var button_tool_Line = document.createElement('button');
    button_tool_Line.innerHTML = 'L';
	button_tool_Line.setAttribute("title","線段量測工具");

    var element2 = document.createElement('div');
    element2.className = 'button_tool button_tool_Line ol-unselectable ol-control';
    element2.appendChild(button_tool_Line);
	
	var ToolControl1 =  new ol.control.Control({
	element: element2}
    );
	
	//測量工具按鈕-面
	var button_tool_Polygon = document.createElement('button');
    button_tool_Polygon.innerHTML = 'A';
	button_tool_Polygon.setAttribute("title","面積量測工具");

    var element3 = document.createElement('div');
    element3.className = 'button_tool button_tool_Polygon ol-unselectable ol-control';
    element3.appendChild(button_tool_Polygon);
	
	var ToolControl2 =  new ol.control.Control({
	element: element3}
    );
	
	//測量工具按鈕-清除
	var button_tool_Clear = document.createElement('button');
    button_tool_Clear.innerHTML = 'C';
	button_tool_Clear.setAttribute("title","清除測量");

    var element4 = document.createElement('div');
    element4.className = 'button_tool_Clear ol-unselectable ol-control';
    element4.appendChild(button_tool_Clear);
	
	var ToolControl3 =  new ol.control.Control({
	element: element4}
    );
	}
  
  $("#"+target).empty();
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
			}) 
			
   base_photo2 = new ol.layer.Tile({
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
				layer:'PHOTO2',
				style: 'default',
				wrapX: true,
			  }),			  
			})
			
   eagle_map = new ol.layer.Tile({
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
			}) 
	
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
   
   if(m){	  
   mmap = new ol.Map({
        target: target,
		controls: ol.control.defaults().extend([
		overviewMapControl,
		BaseMapControl,
		ToolControl1,
		ToolControl2,
		ToolControl3,
		new ol.control.FullScreen(),		
		new ol.control.ZoomToExtent({extent:[coner1[0],coner1[1],coner2[0],coner2[1]]})]),
        layers: [
		  group = new ol.layer.Group({ title:'measure'}),
          base_emap
		  				
        ],
        view: new ol.View({
           center: ol.proj.fromLonLat([121.55, 25.05]),
          zoom: 11,
		  maxZoom: 22
        })
      });
   }
	 else{
		mmap = new ol.Map({
        target: target,
		controls: ol.control.defaults().extend([
		overviewMapControl,
		BaseMapControl,
		new ol.control.FullScreen(),		
		]),
        layers: [
		  group = new ol.layer.Group({ title:'measure'}),
          base_emap
		  				
        ],
        view: new ol.View({
           center: ol.proj.fromLonLat([121.55, 25.05]),
          zoom: 11,
		  maxZoom: 22
        })
      });
	 }
	  
	  group_vector = new ol.layer.Group();
      group_vectorCollection = group_vector.getLayers();
	  
	  mmap.addLayer(group_vector);	
	  
	  $(".ol-zoom-extent").children().attr("title","全臺範圍");	
	  $(".ol-overviewmap").children("button").attr("title","鷹眼圖");	
	  $(".ol-full-screen").children().attr("title","全螢幕模式");	
	  
	  $("."+ bt_class).click(function(){
		if($(this).hasClass("EMAP")){
			addPHOTO2(mmap);
			$(this).removeClass("EMAP");
			$(this).addClass("PHOTO");
			$(this).children().text("M").attr("title","切換為電子地圖");			
		}
		else{
			addEMAP(mmap);
			$(this).removeClass("PHOTO");
			$(this).addClass("EMAP");
			$(this).children().text("P").attr("title","切換為正射影像");		
		}		
	});
		
	$(".button_tool").click(function(){		
		var t;
		if($(this).hasClass("button_tool_Line")){
			t = "LineString";
		}
		else{
			t = "Polygon"
		}

        mmap.removeInteraction(draw);		
		measure(mmap,t);	
		
	});
	
	$(".button_tool_Clear").click(function(){		
		var mm  = mmap.getOverlays().getArray().slice(0);
		mm.forEach(item => mmap.removeOverlay(item));
		
		group_vectorCollection.clear();	
		mmap.removeInteraction(draw);
								
	});
	
	mmap.updateSize();
	
    function addPHOTO2(mmap){		
					
		mmap.addLayer(base_photo2);		
		mmap.removeLayer(base_emap);	
	}	
	
	function addEMAP(mmap){		
				
		mmap.addLayer(base_emap);		
		mmap.removeLayer(base_photo2);		
	}	
}


	