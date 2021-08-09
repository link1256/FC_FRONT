function fi_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab"+i).load("./views/fi_manage_tab"+i+".html"); 
}

function optionactive(list) {
	$("#" + list + " tr").on("click",function() {
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
	});
}

function list_click(source, type) {
//圖資列表點擊事件
	$("#" + source + " tr").on("click",function() {
		let fmid = $(this).attr('id');
		
		//載入地籍列表
		$("#fc_detail_list").empty();
		$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
		setTimeout(function(){
			fi_fc_list("fi_fc_list1");
			optionactive("fi_fc_list1");
		},50);
	});
}

function fi_fc_list(target) {
	var rows;
	var order,land_code,country,town,sect,pm,pc,zoning,lc_class,reg_area,builddate,owner,name,sp,mp,pid;
	
	$("#" + target).empty();
	
	for(i = 0; i < 8; i++) {
		order = i+1;
		land_code = "GB041406320001";
		country = "台北市";
		town = "內湖區";
		sect = "洲子段";
		pm = "1233";
		pc = "000"+i;
		zoning = "商業區";
		lc_class = "甲種建築用地";
		reg_area = "223.02";
		builddate = "2017-07-18";
		owner = "國有";
		name = "農委會林務局";
		sp = "1";
		mp = "1";		
		
		rows = "<tr><td width='4%'>" + order + "</td>";
		rows += "<td width='10%'>" + land_code + "</td>";
		rows += "<td width='4.5%'>" + country + "</td>";
		rows += "<td width='4.5%'>" + town + "</td>";
		rows += "<td width='8%'>" + sect + "</td>";
		rows += "<td width='4%'>" + pm + "</td>";
		rows += "<td width='4%'>" + pc + "</td>";
		rows += "<td width='7%'>" + zoning + "</td>";
		rows += "<td width='9%'>" + lc_class + "</td>";
		rows += "<td width='6%'>" + reg_area + "</td>";
		rows += "<td width='8%'>" + builddate + "</td>";
		
		rows += "<td width='6%'>" + owner + "</td>";
		rows += "<td width='12%'>" + name + "</td>";
		rows += "<td width='4%'>" + sp + "</td>";
		rows += "<td width='4%'>" + mp + "</td>";
		rows += "<td width='5%'><button>查看</button></td></tr>";
		
		$("#"+target).append(rows);
	}
}

//事業林區頁面初始化
var fi_tab1 = {};
fi_tab1.WkngList = [];
fi_tab1.NowOption = null;
fi_tab1.SelectSingleClick = null;
function fi_tab1_init() {
	fi_tab1.map = map("mmap", true, false);
	optionactive("te_tab1_list");
	list_click("te_tab1_list", "國有林事業區");
	big_window();
	
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select();
	SelectSingleClick.on("select", fi_fc_feature_click);
	fi_tab1.map.addInteraction(SelectSingleClick);
	fi_tab1.SelectSingleClick = SelectSingleClick;
	
	// 林區管理處列表
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetDistList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			for (var i = 0; i < d.length; i++) {
				$("#search_dist").append('<option value="' + d[i].distId + '">' + d[i].distName + '</option>');
			}
		}
	  }
	});
	// 事業區列表
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetWkngList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			fi_tab1.WkngList = data.data;
		}
	  }
	});
}

//保安林頁面初始化
var fi_tab2 = {};
fi_tab2.NowOption = null;
fi_tab2.SelectSingleClick = null;
function fi_tab2_init() {
	fi_tab2.map = map("mmap", true, false);
	optionactive("te_tab2_list");
	list_click("te_tab2_list", "保安林");
	big_window();
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select();
	SelectSingleClick.on("select", fi_fc_feature_click);
	fi_tab2.map.addInteraction(SelectSingleClick);
	fi_tab2.SelectSingleClick = SelectSingleClick;
	
	// 林區管理處列表
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetDistList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			for (var i = 0; i < d.length; i++) {
				$("#search_dist").append('<option value="' + d[i].distId + '">' + d[i].distName + '</option>');
			}
		}
	  }
	});
	// 保安林類型列表
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetPfTypeList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			for (var i = 0; i < d.length; i++) {
				$("#search_pfid").append('<option value="' + d[i].pid + '">' + d[i].pfTypeName + '</option>');
			}
		}
	  }
	});
}

//森林遊樂區頁面初始化
var fi_tab3 = {};
fi_tab3.NowOption = null;
fi_tab3.SelectSingleClick = null;
function fi_tab3_init() {
	fi_tab3.map = map("mmap", true, false);
	optionactive("te_tab3_list");
	list_click("te_tab3_list", "森林遊樂區");
	big_window();
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select();
	SelectSingleClick.on("select", fi_fc_feature_click);
	fi_tab3.map.addInteraction(SelectSingleClick);
	fi_tab3.SelectSingleClick = SelectSingleClick;
	
	// 林區管理處列表
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetDistList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			for (var i = 0; i < d.length; i++) {
				$("#search_dist").append('<option value="' + d[i].distId + '">' + d[i].distName + '</option>');
			}
			$("#search_dist").append('<option value="00">其他</option>');
			tab3_go_search();
		}
	  }
	});
}

//實驗林頁面初始化() 
var fi_tab4 = {};
fi_tab4.NowOption = null;
fi_tab4.SelectSingleClick = null;
function fi_tab4_init() {
	fi_tab4.map = map("mmap", true, false);
	optionactive("te_tab4_list");
	list_click("te_tab4_list", "實驗林");
	big_window();
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select();
	SelectSingleClick.on("select", fi_fc_feature_click);
	fi_tab4.map.addInteraction(SelectSingleClick);
	fi_tab4.SelectSingleClick = SelectSingleClick;
	
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select();
	SelectSingleClick.on("select", fi_fc_feature_click);
	fi_tab4.map.addInteraction(SelectSingleClick);
	fi_tab4.SelectSingleClick = SelectSingleClick;
	
	// 管理單位列表
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetManagerList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			for (var i = 0; i < d.length; i++) {
				$("#search_dist").append('<option value="' + d[i].name + '">' + d[i].name + '</option>');
			}
			tab4_go_search();
		}
	  }
	});
}

function fi_edit() {
	//判斷權限
	
	$("#fi_edit_bt").on("click",function(){
		$(".fi_pro").hide();
		$(".fi_edit").show();
		
		var bt = 
		"<button type='button' id='fi_cancel_bt' class='btn btn-danger fi_button'>取消</button>" +
		"<button type='button' id='fi_save_bt' class='btn btn-success fi_button'>儲存</button>";
		$(".fi_edit").append(bt);
		//切換編輯狀態
		$(".detail_rows_value input,textarea").removeAttr("readonly");
		
		
		$("#fi_save_bt").on("click",function(){
		$(".fi_pro").show();
		$(".fi_edit").empty().hide();
		//更新資料庫的方法
		
		//更新頁面的方法
		
	    });
	
	    $("#fi_cancel_bt").on("click",function(){
		$(".fi_pro").show();
		$(".fi_edit").empty().hide();
		//更新頁面的方法
		
		//切換編輯狀態
		$(".detail_rows_value input,textarea").attr("readonly","readonly");
	    });
	});
}

//事業林區查詢條件變動
function tab1_search_dist_change() {
	var list = fi_tab1.WkngList;
	$("#search_wkng").empty();
	$("#search_wkng").append('<option value="-1">不限</option>');
	var target = $("#search_dist").val();
	for (var i = 0; i < list.length; i++) {
		if (target == list[i].distId)
			$("#search_wkng").append('<option value="' + list[i].wid + '">' + list[i].wkngName + '</option>');
	}
}

function tab1_search_wkng_change() {
	var dist = $("#search_dist").val();
	var wkng = $("#search_wkng").val();
	
	var post = {};
	if (dist == "-1" || wkng == "-1") {
		return;
	}
	
	post.Dist = dist;
	post.Wid = wkng;
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetDistCmptList",
	  type: "Post",
	  data: post,
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			$("#search_cmpt").empty();
			$("#search_cmpt").append('<option value="-1">不限</option>');
			for (var i = 0; i < d.length; i++) {
				$("#search_cmpt").append('<option value="' + d[i] + '">' + d[i] + '</option>');
			}
		}
	  }
	});
}

function tab1_go_search() {
	var dist = $("#search_dist").val();
	var wkng = $("#search_wkng").val();
	var cmpt = $("#search_cmpt").val();
	
	var post = {};
	if (dist != "-1") post.Dist = dist;
	if (wkng != "-1") post.Wid = wkng;
	if (cmpt != "-1") post.Cmpt = cmpt;
	
	WaitingShow(true);
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetForestData",
	  type: "Post",
	  data: post,
	  success: function(data) {
		setTimeout(function() { WaitingShow(false); }, 900);
		if (data.data) {
			var d = data.data;
			fi_tab1.NowOption = d;
			$("#te_tab1_list").empty();
			for (var i = 0; i < d.length; i++) {
				var text = '<tr id="' + d[i].sid + '" onclick="tab1_search_list_click(this);">';
				text += '<td>' + d[i].distName + '</td>';
				text += '<td>' + d[i].weildName + '</td>';
				text += '<td>' + d[i].cmpt + '林班</td>';
				text += '</tr>';
				
				$("#te_tab1_list").append(text);
			}
		}
	  }
	});
}
//重置選項
function tab1_reset() {
	$("#search_dist").val("-1");
	$("#search_wkng").val("-1");
	$("#search_cmpt").val("-1");
	$("#search_stat").val("-1");
	
	$("#search_wkng").empty();
	$("#search_wkng").append('<option value="-1">不限</option>');
	$("#search_cmpt").empty();
	$("#search_cmpt").append('<option value="-1">不限</option>');
	
	$("#te_tab1_list").empty();
	$(".fc_detail_data").hide();
}

function tab2_go_search() {
	var dist = $("#search_dist").val();
	var pftype = $("#search_pfid").val();
	
	var post = {};
	if (dist != "-1") post.Dist = dist;
	if (pftype != "-1") post.Pftype = pftype;
	
	WaitingShow(true);
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetProtectionData",
	  type: "Post",
	  data: post,
	  success: function(data) {
		WaitingShow(false);
		if (data.data) {
			var d = data.data;
			fi_tab2.NowOption = d;
			$("#te_tab2_list").empty();
			for (var i = 0; i < d.length; i++) {
				var text = '<tr id="' + d[i].sid + '" onclick="tab2_search_list_click(this);">';
				text += '<td>' + d[i].distName + '</td>';
				text += '<td>' + d[i].pfName + '</td>';
				text += '<td>' + d[i].pfid + '號</td>';
				text += '</tr>';
				
				$("#te_tab2_list").append(text);
			}
		}
	  }
	});
}
//重置選項
function tab2_reset() {
	$("#search_dist").val("-1");
	$("#search_pfid").val("-1");
	$("#search_stat").val("-1");
	
	$("#search_pfid").empty();
	$("#search_pfid").append('<option value="-1">不限</option>');
	
	$("#te_tab2_list").empty();
	$(".fc_detail_data").hide();
}

function tab3_go_search() {
	var dist = $("#search_dist").val();
	var post = {};
	if (dist != "-1") post.Dist = dist;
	
	WaitingShow(true);
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetRecreationData",
	  type: "Post",
	  data: post,
	  success: function(data) {
		WaitingShow(false);
		if (data.data) {
			var d = data.data;
			fi_tab3.NowOption = d;
			$("#te_tab3_list").empty();
			for (var i = 0; i < d.length; i++) {
				var text = '<tr id="' + d[i].sid + '" onclick="tab3_search_list_click(this);">';
				text += '<td>' + d[i].distName + '</td>';
				text += '<td>' + d[i].reName + '</td>';
				text += '</tr>';
				
				$("#te_tab3_list").append(text);
			}
		}
	  }
	});
}
function tab4_go_search() {
	var dist = $("#search_dist").val();
	var post = {};
	if (dist != "-1") post.Dist = dist;
	
	WaitingShow(true);
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetResearchData",
	  type: "Post",
	  data: post,
	  success: function(data) {
		WaitingShow(false);
		if (data.data) {
			var d = data.data;
			fi_tab4.NowOption = d;
			$("#te_tab4_list").empty();
			for (var i = 0; i < d.length; i++) {
				var text = '<tr id="' + d[i].sid + '" onclick="tab4_search_list_click(this);">';
				text += '<td>' + d[i].manager + '</td>';
				text += '<td>' + d[i].name + '</td>';
				text += '</tr>';
				
				$("#te_tab4_list").append(text);
			}
		}
	  }
	});
}
//結果列表
function tab1_search_list_click(that) {
	$("#te_tab1_list tr").removeClass("active");
	$(that).addClass("active");
	$(".fc_detail_data").show();
	
	var post = {};
	post.Type = "1";
	post.Fmid = that.id;
	
	WaitingShow(true);
	$("#fc_detail_list").empty();
	$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
	Get_FM_Detail("list_detail", "國有林事業區", that.id);
	
	GetAssociateOptionMaps(fi_tab1, "fi_fc_list1", "fi_fc_list1_item_click", post);
}

function tab2_search_list_click(that) {
	$("#te_tab2_list tr").removeClass("active");
	$(that).addClass("active");
	$(".fc_detail_data").show();
	
	var post = {};
	post.Type = "2";
	post.Fmid = that.id;
	
	WaitingShow(true);
	$("#fc_detail_list").empty();
	$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
	Get_FM_Detail("list_detail", "保安林", that.id);
	
	GetAssociateOptionMaps(fi_tab2, "fi_fc_list1", "fi_fc_list2_item_click", post);
}

function tab3_search_list_click(that) {
	$("#te_tab3_list tr").removeClass("active");
	$(that).addClass("active");
	$(".fc_detail_data").show();
	
	var post = {};
	post.Type = "3";
	post.Fmid = that.id;
	
	WaitingShow(true);
	$("#fc_detail_list").empty();
	$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
	Get_FM_Detail("list_detail", "森林遊樂區", that.id);
	
	GetAssociateOptionMaps(fi_tab3, "fi_fc_list1", "fi_fc_list3_item_click", post);
}

function tab4_search_list_click(that) {
	$("#te_tab4_list tr").removeClass("active");
	$(that).addClass("active");
	$(".fc_detail_data").show();
	
	var post = {};
	post.Type = "4";
	post.Fmid = that.id;
	
	WaitingShow(true);
	$("#fc_detail_list").empty();
	$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
	Get_FM_Detail("list_detail", "實驗林", that.id);
	
	GetAssociateOptionMaps(fi_tab4, "fi_fc_list1", "fi_fc_list4_item_click", post);
}

// 取得關聯表格及圖徵
function GetAssociateOptionMaps(targettab, targetlist, targetclick, post) {
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetAssociateOption",
	  type: "Post",
	  data: post,
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			
			$("#" + targetlist).empty();
			for (var i = 0; i < d.length; i++) {
				var rows = "";
				rows = "<tr id='list_item_" + d[i].fcid + "' onclick='" + targetclick + "(this);'><td width='4%'>" + (i + 1) + "</td>";
				rows += "<td width='10%'>" + d[i].landCode + "</td>";
				rows += "<td width='4.5%'>" + d[i].cityName + "</td>";
				rows += "<td width='4.5%'>" + d[i].townName + "</td>";
				rows += "<td width='8%'>" + d[i].landName + "</td>";
				rows += "<td width='4%'>" + d[i].pmNo + "</td>";
				rows += "<td width='4%'>" + d[i].pcNo + "</td>";
				rows += "<td width='7%'>" + d[i].zoningName + "</td>";
				rows += "<td width='9%'>" + d[i].lclassName + "</td>";
				rows += "<td width='6%'>" + d[i].regArea + "</td>";
				rows += "<td width='8%'>" + formatDateTime_Date(d[i].updateTime) + "</td>";
				
				rows += "<td width='6%'>" + d[i].holdAccess + "</td>";
				rows += "<td width='12%'>" + d[i].holdCenter + "</td>";
				rows += "<td width='4%'>" + d[i].numerator + "</td>";
				rows += "<td width='4%'>" + d[i].denominator + "</td>";
				rows += "<td width='5%'><button>查看</button></td></tr>";
				
				$("#" + targetlist).append(rows);
			}
			optionactive(targetlist);
		}
	  }
	});
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetAssociateOptionMaps",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() { WaitingShow(false); }, 900);
			if (data.data) {
				var d = data.data;
				targettab.map.geomvector_source.clear();
				
				// 畫自己本身圖徵
				var selfstyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(235, 0, 0, 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(148, 0, 0, 1)",
						width: 2,
					}),
				  });
				for (var i = 0; i < targettab.NowOption.length; i ++) {
					if (post.Fmid == targettab.NowOption[i].sid) {
						var format = new ol.format.WKT();
						var feature = format.readFeature(targettab.NowOption[i].wkt);
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");

						feature.setStyle(selfstyle);
						targettab.map.geomvector_source.addFeature(feature);
						break;
					}
				}
				// 畫相關的圖徵
				var style =	new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(113, 183, 183, 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(0, 48, 97, 1)",
						width: 2,
					}),
				  });
				for (var i = 0; i < d.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(d[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.fcid = d[i].fcid;
					
					feature.setStyle(style);
					targettab.map.geomvector_source.addFeature(feature);
				}
				targettab.map.getView().fit(targettab.map.geomvector_source.getExtent());
			}
		}
	});
}

// 點擊table事件
function fi_fc_list1_item_click(that) {
	var starid = that.id.split("_");
	var fcid = starid[starid.length - 1];
	
	var features = fi_tab1.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].fcid == fcid) {
			feature = features[i];
			break;
		}
	}
	if (feature) {
		fi_tab1.SelectSingleClick.getFeatures().clear();
		fi_tab1.SelectSingleClick.getFeatures().push(feature);
	}
}
function fi_fc_list2_item_click(that) {
	var starid = that.id.split("_");
	var fcid = starid[starid.length - 1];
	
	var features = fi_tab2.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].fcid == fcid) {
			feature = features[i];
			break;
		}
	}
	if (feature) {
		fi_tab2.SelectSingleClick.getFeatures().clear();
		fi_tab2.SelectSingleClick.getFeatures().push(feature);
	}
}
function fi_fc_list3_item_click(that) {
	var starid = that.id.split("_");
	var fcid = starid[starid.length - 1];
	
	var features = fi_tab3.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].fcid == fcid) {
			feature = features[i];
			break;
		}
	}
	if (feature) {
		fi_tab3.SelectSingleClick.getFeatures().clear();
		fi_tab3.SelectSingleClick.getFeatures().push(feature);
	}
}
function fi_fc_list4_item_click(that) {
	var starid = that.id.split("_");
	var fcid = starid[starid.length - 1];
	
	var features = fi_tab4.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].fcid == fcid) {
			feature = features[i];
			break;
		}
	}
	if (feature) {
		fi_tab4.SelectSingleClick.getFeatures().clear();
		fi_tab4.SelectSingleClick.getFeatures().push(feature);
	}
}
// 點擊feature事件
function fi_fc_feature_click(e) {
	$("#fi_fc_list1 tr").removeClass("active");
	if (e.selected.length == 1) {
		var $objTr = $("#list_item_" + e.selected[0].fcid);
		$objTr.addClass("active");
		var objTr = $objTr[0];
		$(".main_scroll_mini_4").animate({scrollTop:objTr.offsetTop}, "slow");
	}
}
// 取得Detail
function Get_FM_Detail(target, typeid, fmid) {
	var post = {};
	post.id = fmid;
	post.type = typeid;
	
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetFMDetailData",
	  type: "Post",
	  data: post,
	  success: function(data) {
		if (data.data) {
			$("#" + target).empty();
			
			var d = data.data;
			//資料分成國有林事業區及保安林
			if (typeid === "國有林事業區") {
				var DIST = d.distName;
				var WKNG = d.weildName;
				var CMPT = d.cmpt;
				var AREA_HA = d.area_ha;
				var EDITION = d.edition;
				var UPDATETIME = d.updateTime;
				let detail;
				
				detail = 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>林管處</div>"+
				"<div class='detail_rows_value'>"+ DIST +"</div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>事業區</div>"+
				"<div class='detail_rows_value'>"+ WKNG +"</div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>林班號</div>"+
				"<div class='detail_rows_value'>"+ CMPT +"</div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>面積(公頃)</div>"+
				"<div class='detail_rows_value'><input id='AREA_HA' value='"+ AREA_HA +"' readonly /></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>修訂資訊</div>"+
				"<div class='detail_rows_value'><textarea id='EDITION' rows='3' readonly>"+ EDITION +"</textarea></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>最後更新時間</div>"+
				"<div class='detail_rows_value'>"+ UPDATETIME +"</div>"+
				"</div>";
				
				$("#" + target).append(detail);
			}
			else if (typeid === "保安林") {
				var DIST = d.distName;
				var PF_ID = d.pfid;
				var PFTYPE = d.pfName;
				var AREA_HA = d.area_ha;
				var EDITION = d.edition;
				var UPDATETIME = d.updateTime;
				let detail;

				detail = 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>林管處</div>"+
				"<div class='detail_rows_value'>"+ DIST +"</div>"+
				"</div>";

				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>保安林編號</div>"+
				"<div class='detail_rows_value'>"+ PF_ID +"</div>"+
				"</div>";

				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>保安林類型</div>"+
				"<div class='detail_rows_value'>"+ PFTYPE +"</div>"+
				"</div>";

				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>面積(公頃)</div>"+
				"<div class='detail_rows_value'><input id='AREA_HA' value='"+ AREA_HA +"' readonly /></div>"+
				"</div>";

				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>修訂資訊</div>"+
				"<div class='detail_rows_value'><textarea id='EDITION' rows='3' readonly>"+ EDITION +"</textarea></div>"+
				"</div>";

				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>最後更新時間</div>"+
				"<div class='detail_rows_value'>"+ UPDATETIME +"</div>"+
				"</div>";

				$("#" + target).append(detail);
			}
			else if (typeid === "森林遊樂區") {
				var DIST = d.distName;
				var NAME = d.reName;
				var NAME_EN = d.reName_EN;
				var MANAGER = d.manager;
				var AREA_HA = d.area_ha;
				var PUBLISH = d.publish;
				var EDITION = d.edition;
				var UPDATETIME = d.updateTime;
				let detail;
				
				detail = 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>林管處</div>"+
				"<div class='detail_rows_value'>"+ DIST +"</div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>管理單位</div>"+
				"<div class='detail_rows_value'><input id='MANAGER' value='"+ MANAGER +"' readonly /></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>名稱</div>"+
				"<div class='detail_rows_value'><input id='NAME' value='"+ NAME +"' readonly /></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>英文名稱</div>"+
				"<div class='detail_rows_value'><input id='NAME' value='"+ NAME_EN +"' readonly /></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>面積(公頃)</div>"+
				"<div class='detail_rows_value'><input id='AREA_HA' value='"+ AREA_HA +"' readonly /></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>公告依據</div>"+
				"<div class='detail_rows_value'><textarea id='PUBLISH' rows='3' readonly>"+ PUBLISH +"</textarea></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>修訂資訊</div>"+
				"<div class='detail_rows_value'><textarea id='EDITION' rows='3' readonly>"+ EDITION +"</textarea></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>最後更新時間</div>"+
				"<div class='detail_rows_value'>"+ UPDATETIME +"</div>"+
				"</div>";
						
				
				$("#" + target).append(detail);
			}
			else if (typeid === "實驗林") {
				
				var MANAGER = d.manager;
				var NAME = d.name;
				var AREA_HA = d.area_ha;
				var NOTE = d.note;
				var EDITION = d.edition;
				var UPDATETIME = d.updateTime;
				let detail;
				
				detail = 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>管理單位</div>"+
				"<div class='detail_rows_value'>"+ MANAGER +"</div>"+
				"</div>";
						
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>名稱</div>"+
				"<div class='detail_rows_value'><input id='NAME' value='"+ NAME +"' readonly /></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>備註</div>"+
				"<div class='detail_rows_value'><textarea id='EDITION' rows='1' readonly>"+ NOTE +"</textarea></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>面積(公頃)</div>"+
				"<div class='detail_rows_value'><input id='AREA_HA' value='"+ AREA_HA +"' readonly /></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>修訂資訊</div>"+
				"<div class='detail_rows_value'><textarea id='EDITION' rows='3' readonly>"+ EDITION +"</textarea></div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>最後更新時間</div>"+
				"<div class='detail_rows_value'>"+ UPDATETIME +"</div>"+
				"</div>";
						
				
				$("#" + target).append(detail);
			}
		}
	  }
	});
}