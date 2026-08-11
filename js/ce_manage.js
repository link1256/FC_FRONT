function ce_ini_page(i)
{
	$(".tab_body").empty();
	$(".tab_body").load("./views/ce_manage_tab" + i + ".html"); 
}
var ce_tab1 = {};
function ce_tab1_init()
{
	ce_tab1 = {};
	
	ce_tab1.map = map('mmap', true, false);
	
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select({layers: [ce_tab1.map.geomextra_layer]});
	SelectSingleClick.on("select", ce_tab1_map_click);
	ce_tab1.map.addInteraction(SelectSingleClick);
	ce_tab1.SelectSingleClick = SelectSingleClick;
	
	ce_tab1.ce_tab1_list_count = 0;
	
	ce_tab1_getDistList();
	ce_tab1_getWkng();
	
	ce_tab1.map.on('moveend', ce_tab1_map_move_end);
}
function ce_tab1_getDistList() {
	// 林區管理處列表
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				for (var i = 0; i < d.length; i++) {
					$("#search_dist").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
					$("#search_dist2").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
				}
			}
		}
	});
}
function ce_tab1_getWkng() {
	// 事業區列表
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetWkngList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				ce_tab1.WkngList = data.data;
			}
		}
	});
}
//事業林區查詢條件變動
function ce_tab1_dist_change() {
	var list = ce_tab1.WkngList;
	$("#search_wkng").empty();
	$("#search_wkng").append('<option value="-1">不指定</option>');
	var target = $("#search_dist").val();
	for (var i = 0; i < list.length; i++) {
		if (target == list[i].distId)
			$("#search_wkng").append('<option value="' + list[i].wid + '">' + htmlEncode(list[i].wkngName) + '</option>');
	}
}
function ce_tab1_wkng_change() {
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
				$("#search_cmpt").append('<option value="-1">不指定</option>');
				for (var i = 0; i < d.length; i++) {
					$("#search_cmpt").append('<option value="' + d[i] + '">' + htmlEncode(d[i]) + '</option>');
				}
			}
		}
	});
}
function ce_tab1_go_search() {
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
			WaitingShow(false);
			if (data.data) {
				$('.form-check-input').prop('checked', false);
				var d = data.data;
				$("#ce_tab1_list").empty();
				$("#ce_tab1_list").scrollTop(0);
				for (var i = 0; i < d.length; i++) {
					var text = '<tr>';
					text += '<td><input id="' + d[i].sid + '" value="' + d[i].sid + '" type="checkbox" class="form-check-input" /></td>'
					text += '<td>' + htmlEncode(d[i].distName) + '</td>';
					text += '<td>' + htmlEncode(d[i].weildName) + '</td>';
					text += '<td>' + htmlEncode(d[i].cmpt) + '林班</td>';
					text += '</tr>';
					
					ce_tab1.tab6data = d;
					$("#ce_tab1_list").append(text);
				}
			}
		}
	});
}
function ce_tab1_list_add() {
	var sid = [];
	var color = [];
	$('#ce_tab1_list input[class="form-check-input"]:checked').each(function() {
		sid.push(this.value);
		
		var c = random_rgba(0.5);
		color.push(c);
		
		// 將對應資料加入右邊列表
		var p = $(this).parent().parent();
		var tds = p.find('td');
		
		var tmp = '<tr id="add_' + this.value + '" class="add_list" onclick="ce_tab1_add_fixed(' + this.value + ')">';
		tmp += '<td>' + '<div class="ce_marker" style="background-color:' + c + ';"></div>' + '</td>';
		for (var i = 1; i < tds.length; i++) {
			tmp += '<td>' + htmlEncode($(tds[i]).text()) + '</td>';
		}
		tmp += '<td><img src="image/button_image/eye_show.svg" style="cursor: pointer;" onclick="ce_tab1_add_visable(this, ' + this.value + ')" /></td>';
		tmp += '<td><label style="color: red; cursor: pointer;" onclick="ce_tab1_add_remove(this, ' + this.value + ')">刪除</label></td>';
		
		tmp += "</tr>";

		if (ce_tab1.ce_tab1_list_count == 0) {
			$("#ce_tab1_add_list1").empty();
		}

		ce_tab1.ce_tab1_list_count++;
		
		$("#ce_tab1_add_list1").append(tmp);
	});
	
	if (sid.length == 0) return;
	
	var post = {};
	post.Sid = sid;
	post.Type = "1";
	
	$.ajax({
		url: ApiRequestURL + "Centimeter/GetAssociateOptionMaps",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				var format = new ol.format.WKT();
				
				for (var i = 0; i < sid.length; i++) {
					var style =	new ol.style.Style({
						fill: new ol.style.Fill({
							color: color[i],
						}),
						stroke: new ol.style.Stroke({
							color: "rgba(0, 48, 97, 1)",
							width: 2,
						}),
					});
					
					var tar = d.filter(x => x.fmid == sid[i]);
					
					for (var j = 0; j < tar.length; j++) {
						var feature = format.readFeature(tar[j].wkt);
					
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
						feature.sid = tar[j].sid;
						feature.fmid = tar[j].fmid;
						feature.stobj = style;
						
						feature.setStyle(style);
						ce_tab1.map.geomextra_source.addFeature(feature);
					}
				}
			}
		}
	});
}
var ce_tab1_fixed = true;
function ce_tab1_add_fixed(fmid) {
	if (ce_tab1_fixed == false) {
		ce_tab1_fixed = true;
		return;
	}
	
	var features = ce_tab1.map.geomextra_source.getFeatures()
		.filter(function(d) { if(d.fmid == fmid) return d; })
		.map(function (f) { return f.getGeometry().getExtent(); });
	
	var extent = ol.extent.boundingExtent(features);
	
	ce_tab1.map.getView().fit(extent, { maxZoom: 18});
}
function ce_tab1_add_visable(that, fmid) {
	var features = ce_tab1.map.geomextra_source.getFeatures();
	
	ce_tab1_fixed = false;
	
	var isrc = that.src.split('/');
	var srcn = isrc[isrc.length - 1];
	
	if (srcn == "eye_show.svg")
	{
		that.src = "image/button_image/eye_hide.svg";	
	}
	else
	{
		that.src = "image/button_image/eye_show.svg";
	}
	
	for (var i = 0; i < features.length; i++) {
		if (features[i].fmid == fmid) {
			if (srcn == "eye_show.svg")
			{
				features[i].setStyle(new ol.style.Style({}));
			}
			else
			{
				features[i].setStyle(features[i].stobj);
			}
		}
	}
}
function ce_tab1_add_remove(that, fmid) {
	var features = ce_tab1.map.geomextra_source.getFeatures();
	
	ce_tab1_fixed = false;

	for (var i = 0; i < features.length; i++) {
		if (features[i].fmid == fmid) {
			ce_tab1.map.geomextra_source.removeFeature(features[i]);
		}
	}
	
	ce_tab1.ce_tab1_list_count--;
	if (ce_tab1.ce_tab1_list_count == 0) {
		$("#ce_tab1_add_list1").append('<tr><td>尚無資料</td></tr>');
	}
	
	$(that).parent().parent().remove();
}
function ce_tab1_dist_change2() {
	var list = ce_tab1.WkngList;
	$("#search_wkng2").empty();
	$("#search_wkng2").append('<option value="-1">不指定</option>');
	var target = $("#search_dist2").val();
	for (var i = 0; i < list.length; i++) {
		if (target == list[i].distId)
			$("#search_wkng2").append('<option value="' + list[i].wid + '">' + htmlEncode(list[i].wkngName) + '</option>');
	}
}
function ce_tab1_wkng_change2() {
	var dist = $("#search_dist2").val();
	var wkng = $("#search_wkng2").val();
	
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
				$("#search_cmpt2").empty();
				$("#search_cmpt2").append('<option value="-1">不指定</option>');
				for (var i = 0; i < d.length; i++) {
					$("#search_cmpt2").append('<option value="' + d[i] + '">' + htmlEncode(d[i]) + '</option>');
				}
			}
		}
	});
}
var ce_tab1_list_edit = {};
function ce_tab1_map_click(e) {
	if (e.selected.length == 0) return;
	
	$("#ce_tab1_list_edit").show();
	
	ce_tab1_list_edit = {};
	
	ce_tab1_list_cancel_click();
	
	var sid = e.selected[0].sid;
	if (!sid) return;
	
	var post = {};
	post.Sid = sid;
	
	$.ajax({
		url: ApiRequestURL + "Centimeter/GetTargetLandInfo",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#ce_tab1_add_list2").empty();
				
				ce_tab1_list_edit.sid = d.sid;
				ce_tab1_list_edit.data = d;
				
				var tmp = "<tr>";
				
				tmp += '<tr><td>縣市</td><td>' + htmlEncode(d.cityName) + '</td></tr>';
				tmp += '<tr><td>鄉鎮</td><td>' + htmlEncode(d.townName) + '</td></tr>';
				tmp += '<tr><td>地段</td><td>' + htmlEncode(d.landName) + '</td></tr>';
				tmp += '<tr><td>地號</td><td>' + htmlEncode(d.pmNo + '-' + d.pcNo) + '</td></tr>';
				tmp += '<tr><td>地籍編碼</td><td>' + htmlEncode(d.landCode) + '</td></tr>';
				tmp += '<tr class="edit_select_item"><td>管理單位</td><td>' + htmlEncode(d.distName) + '</td></tr>';
				tmp += '<tr class="edit_select_item"><td>事業區</td><td>' + htmlEncode(d.weildName) + '</td></tr>';
				tmp += '<tr class="edit_select_item"><td>林班</td><td>' + htmlEncode(d.cmpt) + '</td></tr>';
				
				tmp += "</tr>";
				
				$("#ce_tab1_add_list2").append(tmp);
			}
		}
	});
}
function ce_tab1_list_edit_click() {
	if (!ce_tab1_list_edit) return;
	
	
	$("#ce_tab1_list_edit").hide();
	
	$("#ce_tab1_list_save").show();
	$("#ce_tab1_list_cancel").show();
	
	$(".edit_select_item").hide();
	$("#edit_select_list2").show();
	
	$("#search_dist2").val(ce_tab1_list_edit.data.distCode);
	ce_tab1_dist_change2();
	$("#search_wkng2").val(ce_tab1_list_edit.data.wkngCode);
	ce_tab1_wkng_change2();
	setTimeout(function() {
		$("#search_cmpt2").val(ce_tab1_list_edit.data.cmpt);
	}, 500);
}
function ce_tab1_list_cancel_click() {
	$("#ce_tab1_list_edit").show();
	
	$("#ce_tab1_list_save").hide();
	$("#ce_tab1_list_cancel").hide();
	
	$(".edit_select_item").show();
	$("#edit_select_list2").hide();
}
function ce_tab1_list_save_click() {
	if (!ce_tab1_list_edit) return;
	
	var sid = ce_tab1_list_edit.sid;
	var userid = Logindata.sid;
	
	var dist = $("#search_dist2").val();
	var wkng = $("#search_wkng2").val();
	var cmpt = $("#search_cmpt2").val();
	
	if (dist == ce_tab1_list_edit.data.distCode && wkng == ce_tab1_list_edit.data.wkngCode && cmpt == ce_tab1_list_edit.data.cmpt) {
		alert("未進行資料變更.");
		return;
	}
	
	var post = {};
	post.Sid = sid;
	post.Distid = dist;
	post.Wkngid = wkng;
	post.Cmpt = cmpt;
	post.Userid = userid;
	
	$.ajax({
		url: ApiRequestURL + "Centimeter/UpdateLandInfo",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d == "1") {
					alert('編輯成功.');
					ce_edit_refresh_map();
					$("#ce_tab1_add_list2").empty();
					$("#ce_tab1_add_list2").append('<tr><td>尚無資料</td></tr>');
					ce_tab1_list_cancel_click();
					$("#ce_tab1_list_edit").hide();
				}
				else {
					alert('編輯失敗.');
				}
			}
		}
	});
}
function ce_edit_refresh_map() {
	var targets = $(".add_list");
	
	var sid = [];
	
	for (var i = 0; i < targets.length; i++) {
		var id = targets[i].id.split('_')[1];
		sid.push(id);
	}
	
	if (sid.length == 0) return;
	
	var post = {};
	post.Sid = sid;
	post.Type = "1";
	
	$.ajax({
		url: ApiRequestURL + "Centimeter/GetAssociateOptionMaps",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				ce_tab1.map.geomextra_source.clear();
				
				var format = new ol.format.WKT();
				
				for (var i = 0; i < sid.length; i++) {
					var style =	new ol.style.Style({
						fill: new ol.style.Fill({
							color: random_rgba(0.5),
						}),
						stroke: new ol.style.Stroke({
							color: "rgba(0, 48, 97, 1)",
							width: 2,
						}),
					});
					
					var tar = d.filter(x => x.fmid == sid[i]);
					
					for (var j = 0; j < tar.length; j++) {
						var feature = format.readFeature(tar[j].wkt);
					
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
						feature.sid = tar[j].sid;
						feature.fmid = tar[j].fmid;
						feature.stobj = style;
						
						feature.setStyle(style);
						ce_tab1.map.geomextra_source.addFeature(feature);
					}
				}
			}
		}
	});
}
var ce_search_tab2 = {};
function ce_search_tab2_init() {
	ce_search_tab2 = {};
	
	ce_search_tab2_get_CountyList();
	
	ce_search_tab2_get_DistList();
	ce_search_tab2_get_Wkng();
	
	$('#search_date_start1,#search_date_end1,#search_date_start2,#search_date_end2').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy/mm/dd',
		beforeShow: function (e, t) {
			if ($(this).attr('maxDate')) {
				var dateItem = $('#' + $(this).attr('maxDate'));
				if (dateItem.val() !== "") {
					$(this).datepicker('option', 'maxDate', dateItem.val());
				}
			}
			if ($(this).attr('minDate')) {
				var dateItem = $('#' + $(this).attr('minDate'));
				if (dateItem.val() !== "") {
					$(this).datepicker('option', 'minDate', dateItem.val());
				}
			}
		}
	});
}
function ce_search_tab2_get_CountyList() {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetCountyList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				for (var i = 0; i < d.length; i++) {
					$("#search_county").append('<option value="' + d[i].code + '">' + htmlEncode(d[i].name) + '</option>');
				}
			}
		}
	});
}
function ce_search_tab2_get_TownList() {
	var val = $("#search_county").val();
	if (val == "-1") return;
	var post = {};
	post.CountyCode = val;
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetTownList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#search_town").empty();
				$("#search_town").append('<option selected value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					$("#search_town").append('<option value="' + d[i].code + '">' + htmlEncode(d[i].name) + '</option>');
				}
				$("#search_sec").empty();
				$("#search_sec").append('<option selected value="-1">請選擇</option>');
			}
		}
	});
}
function ce_search_tab2_get_LandList() {
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	if (county == "-1" || town == "-1") return;
	var post = {};
	post.CountyCode = county;
	post.TownCode = town;
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetLandList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#search_sec").empty();
				$("#search_sec").append('<option selected value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					var landstr = "";
					landstr += d[i].sec == "" ? "" : d[i].sec + "段";
					landstr += d[i].sec_sub == "" ? "" : d[i].sec_sub + "小段";
					$("#search_sec").append('<option value="' + d[i].sec_code + '">' + htmlEncode(landstr) + '</option>');
				}
			}
		}
	});
}
function ce_search_tab2_get_DistList() {
	// 林區管理處列表
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				for (var i = 0; i < d.length; i++) {
					$("#search_dist").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
				}
			}
		}
	});
}
function ce_search_tab2_get_Wkng() {
	// 事業區列表
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetWkngList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				ce_search_tab2.WkngList = data.data;
			}
		}
	});
}
//事業林區查詢條件變動
function ce_search_tab2_dist_change() {
	var list = ce_search_tab2.WkngList;
	$("#search_wkng").empty();
	$("#search_wkng").append('<option value="-1">請選擇</option>');
	var target = $("#search_dist").val();
	for (var i = 0; i < list.length; i++) {
		if (target == list[i].distId)
			$("#search_wkng").append('<option value="' + list[i].wid + '">' + htmlEncode(list[i].wkngName) + '</option>');
	}
}
function ce_search_tab2_wkng_change() {
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
				$("#search_cmpt").append('<option value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					$("#search_cmpt").append('<option value="' + d[i] + '">' + htmlEncode(d[i]) + '</option>');
				}
			}
		}
	});
}
function ce_search_list_gosearch_1() {
	$("#query_1").show();
	
	ce_search_tab2.nowsearchtype = 1;

	var start = $("#search_date_start1").val();
	var end = $("#search_date_end1").val();
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var sec = $("#search_sec").val();
	var landno1 = $("#search_number1").val();
	var landno2 = $("#search_number2").val();
	var landcode = $("#search_land_code").val();

	var post = {};
	
	if (start != "")
		post.Start = start;
	if (end != "")
		post.End = end;
	if (county != -1)
		post.County = county;
	if (town != -1)
		post.Town = town;
	if (sec != -1)
		post.Sec = sec;
	if (landno1 != "")
		post.LandNo1 = landno1;
	if (landno2 != "")
		post.LandNo2= landno2;
	if (landcode != "")
		post.LandCode = landcode;

	$.ajax({
		url: ApiRequestURL + "Centimeter/GetCentimeterRecordList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$('#sys_user_page').pagination({
					dataSource: d,
					pageSize: 10,
					pageNumber: 1,
					callback: function(dd, pagination) {
						$("#ce_search_result").empty();
						
						for (var i = 0; i < dd.length; i++) {
							var tmp = '<tr>';
							tmp += '<td>' + formatDateTime_Date(dd[i].updateTime) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].updateUserName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].countyName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].townName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landCode) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].preDistName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].preWkngName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].preCmpt) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].distName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].wkngName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].cmpt) + '</td>';
							tmp += '</tr>';

							$("#ce_search_result").append(tmp);
						}
					}
				});
			}
		}
	});
}
function ce_search_list_gosearch_2() {
	$("#query_1").show();
	
	ce_search_tab2.nowsearchtype = 2;
	
	var start = $("#search_date_start2").val();
	var end = $("#search_date_end2").val();
	var dist = $("#search_dist").val();
	var wkng = $("#search_wkng").val();
	var cmpt = $("#search_cmpt").val();

	var post = {};
	
	if (start != "")
		post.Start = start;
	if (end != "")
		post.End = end;
	if (dist != -1)
		post.Dist = dist;
	if (wkng != -1)
		post.Wkng = wkng;
	if (cmpt != -1)
		post.Cmpt = cmpt;

	$.ajax({
		url: ApiRequestURL + "Centimeter/GetCentimeterRecordList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$('#sys_user_page').pagination({
					dataSource: d,
					pageSize: 10,
					pageNumber: 1,
					callback: function(dd, pagination) {
						$("#ce_search_result").empty();
						
						for (var i = 0; i < dd.length; i++) {
							var tmp = '<tr>';
							tmp += '<td>' + formatDateTime_Date(dd[i].updateTime) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].updateUserName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].countyName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].townName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landCode) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].preDistName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].preWkngName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].preCmpt) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].distName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].wkngName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].cmpt) + '</td>';
							tmp += '</tr>';

							$("#ce_search_result").append(tmp);
						}
					}
				});
			}
		}
	});
}
function ce_searchlist_export() {
	var type = ce_search_tab2.nowsearchtype;

	var data = new FormData();
	if (type == 1) {
		var start = $("#search_date_start1").val();
		var end = $("#search_date_end1").val();
		var county = $("#search_county").val();
		var town = $("#search_town").val();
		var sec = $("#search_sec").val();
		var landno1 = $("#search_number1").val();
		var landno2 = $("#search_number2").val();
		var landcode = $("#search_land_code").val();
		
		if (start != -1)
			data.append('Start', start);
		if (end != -1)
			data.append('End', end);
		if (town != -1)
			data.append('Town', town);
		if (sec != -1)
			data.append('Sec', sec);
		if (landno1 != "")
			data.append('LandNo1', landno1);
		if (landno2 != "")
			data.append('LandNo2', landno2);
		if (landcode != "")
			data.append('LandCode', landcode);
	}
	else if (type == 2) {
		var start = $("#search_date_start2").val();
		var end = $("#search_date_end2").val();
		var dist = $("#search_dist").val();
		var wkng = $("#search_wkng").val();
		var cmpt = $("#search_cmpt").val();
		
		if (start != "")
			data.append('Start', start);
		if (end != "")
			data.append('End', end);
		if (dist != -1)
			data.append('Dist', dist);
		if (wkng != -1)
			data.append('Wkng', wkng);
		if (cmpt != -1)
			data.append('Cmpt', Cmpt);
	}
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "Centimeter/GetChangeSearchListExcel", true);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.responseType = 'blob';

	request.onload = function(e) {
		if (this.status === 200) {
			var blob = this.response;
			if (window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, "釐整紀錄列表.xlsx");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = "釐整紀錄列表.xlsx";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
		   }
       }
   };
   request.send(data);
}
function ce_get_top_geomMaps(xmax, xmin, ymax, ymin) {
	var post = {};
	post.Xmin = xmin;
	post.Xmax = xmax;
	post.Ymin = ymin;
	post.Ymax = ymax;
	
	$.ajax({
		url: ApiRequestURL + "Centimeter/GetTopFMOptionMaps",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				var format = new ol.format.WKT();
				
				ce_tab1.map.geomtopvector_source.clear();
				
				for (var i = 0; i < d.length; i++) {
					var feature = format.readFeature(d[i].wkt);					
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");

					ce_tab1.map.geomtopvector_source.addFeature(feature);
				}
			}
		}
	});
}
function wrapLon(value) {
	var worlds = Math.floor((value + 180) / 360);
	return value - worlds * 360;
}
function ce_tab1_map_move_end(evt) {
	var zoom = ce_tab1.map.getView().getZoom();
	
	if (zoom >= 12) {
		var map = evt.map;
		var extent = map.getView().calculateExtent(map.getSize());
		
		var bottomLeft = ol.proj.toLonLat(ol.extent.getBottomLeft(extent));
		var topRight = ol.proj.toLonLat(ol.extent.getTopRight(extent));
		
		var left = wrapLon(bottomLeft[0]) - 0.03;
		var bottom = bottomLeft[1] - 0.03;
		var right = wrapLon(topRight[0]) + 0.03;
		var top = topRight[1] + 0.03;
		
		ce_get_top_geomMaps(right, left, top, bottom);
	}
	else {
		ce_tab1.map.geomtopvector_source.clear();
	}
}
function ce_tab1_check_select_all(that) {
	if (that.checked == true) {
		$('.form-check-input').prop('checked', true);
	}
	else {
		$('.form-check-input').prop('checked', false);
	}
}
function ce_search_list_reset_1() {
	$("#search_date_start1").val("");
	$("#search_date_end1").val("");
	
	$("#search_county").val("-1");
	$("#search_town").val("-1");
	$("#search_sec").val("-1");
	
	$("#search_number1").val("");
	$("#search_number2").val("");
	
	$("#search_land_code").val("");
}
function ce_search_list_reset_2() {
	$("#search_date_start2").val("");
	$("#search_date_end2").val("");
	
	$("#search_dist").val("-1");
	$("#search_wkng").val("-1");
	$("#search_cmpt").val("-1");
}
function ce_tab1_reset() {
	$("#search_dist").val("-1");
	$("#search_wkng").val("-1");
	$("#search_cmpt").val("-1");
}