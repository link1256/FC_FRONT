function te_ini_page(i)
{
	// 前兩個有下拉要跳過
	if (i == 1 || i == 2 || i == 3) {
		return;
	}
	$(".tab_body_content").empty();
	$(".tab_body_content.tab" + i).load("./views/te_manage_tab" + i + ".html");
}

function te_ini_drop_page(type)
{
	if (type == "case_all" || type == "case_statistics") {
		$("#dropdowntrig").removeClass("active");
		$("#dropdowntrig3").removeClass("active");
		$("#dropdowntrig2").addClass("active");
	}
	else if (type == "forest_update" || type == "land_check") {
		$("#dropdowntrig").removeClass("active");
		$("#dropdowntrig2").removeClass("active");
		$("#dropdowntrig3").addClass("active");
	}
	else {
		$("#dropdowntrig2").removeClass("active");
		$("#dropdowntrig3").removeClass("active");
		$("#dropdowntrig").addClass("active");
	}
	
	$(".tab_body_content").empty();
	
	if (type == "change_all") {
		$(".thrid_item").text("國有林事業區");
		$(".fourth_item").text("異動總覽");
		$(".between_icon2").text(">");
		$(".tab_body_content.tab_" + type).load("./views/te_manage_tab1.html");
	}
	else if (type == "change_set") {
		$(".thrid_item").text("國有林事業區");
		$(".fourth_item").text("異動事件登記");
		$(".between_icon2").text(">");
		$(".tab_body_content.tab_" + type).load("./views/te_manage_tab2.html");
	}
	else if (type == "change_check") {
		$(".thrid_item").text("國有林事業區");
		$(".fourth_item").text("異動事件確認");
		$(".between_icon2").text(">");
		$(".tab_body_content.tab_" + type).load("./views/te_manage_tab3.html");
	}
	else if (type == "change_statistics") {
		$(".thrid_item").text("國有林事業區");
		$(".fourth_item").text("異動統計");
		$(".between_icon2").text(">");
		$(".tab_body_content.tab_" + type).load("./views/te_manage_tab4.html");
	}
	else if (type == "case_all") {
		$(".thrid_item").text("保安林檢訂");
		$(".fourth_item").text("案件總覽");
		$(".between_icon2").text(">");
		$(".tab_body_content.tab_" + type).load("./views/ca_manage_tab1.html");
	}
	else if (type == "case_statistics") {
		$(".thrid_item").text("保安林檢訂");
		$(".fourth_item").text("案件統計");
		$(".between_icon2").text(">");
		$(".tab_body_content.tab_" + type).load("./views/ca_manage_tab2.html");
	}
	else if (type == "forest_update") {
		$(".thrid_item").text("地籍異動確認");
		$(".fourth_item").text("林班地籍異動");
		$(".between_icon2").text(">");
		$(".tab_body_content.tab_" + type).load("./views/lu_manage_tab1.html");
	}
	else if (type == "land_check") {
		$(".thrid_item").text("地籍異動確認");
		$(".fourth_item").text("地籍存摺比對");
		$(".between_icon2").text(">");
		$(".tab_body_content.tab_" + type).load("./views/lu_manage_tab2.html");
	}
	
	setTimeout(function() {
		$(".tab_body_content").removeClass("active");
		$(".tab_body_content.tab_" + type).addClass("active");
	}, 200);
	
	$('#dropdowntrig_ul').hide();
	$('#dropdowntrig_ul2').hide();
	$('#dropdowntrig_ul3').hide();
}

function te_ini_drop()
{
	var wntrigshow = false;
	$("#dropdowntrig").click(function() {
		if (!wntrigshow) {
			wntrigshow = true;
			wntrigshow2 = false;
			wntrigshow3 = false;
			
			$("#dropdowntrig_ul").show();
			
			var access = Logindata.access;
			
			$(".ttab1").hide();
			$(".ttab2").hide();
			$(".ttab3").hide();
			$(".ttab4").hide();
			
			for (var i = 0; i < access.length; i++) {
				if (access[i].indexOf("異動事件管理/異動總覽") != -1) {
					$(".ttab1").show();
				}
				else if (access[i].indexOf("異動事件管理/異動事件登記") != -1) {
					$(".ttab2").show();
				}
				else if (access[i].indexOf("異動事件管理/異動事件確認") != -1) {
					$(".ttab3").show();
				}
				else if (access[i].indexOf("異動事件管理/異動統計") != -1) {
					$(".ttab4").show();
				}
				else if (access[i].indexOf("異動事件管理/案件總覽") != -1) {
					$(".ttab5").show();
				}
				else if (access[i].indexOf("異動事件管理/案件統計") != -1) {
					$(".ttab6").show();
				}
				else if (access[i].indexOf("異動事件管理/林班地籍異動") != -1) {
					$(".ttab7").show();
				}
				else if (access[i].indexOf("異動事件管理/地籍存摺比對") != -1) {
					$(".ttab8").show();
				}
			}
			
			$("#dropdowntrig_ul2").hide();
			$("#dropdowntrig_ul3").hide();
		}
		else {
			wntrigshow = false;
			$("#dropdowntrig_ul").hide();
		}
	});
	var wntrigshow2 = false;
	$("#dropdowntrig2").click(function() {
		if (!wntrigshow2) {
			wntrigshow2 = true;
			wntrigshow = false;
			wntrigshow3 = false;
			
			$("#dropdowntrig_ul2").show();
			
			$(".ttab5").hide();
			$(".ttab6").hide();
			
			var access = Logindata.access;
			
			for (var i = 0; i < access.length; i++) {
				if (access[i].indexOf("異動事件管理/異動總覽") != -1) {
					$(".ttab1").show();
				}
				else if (access[i].indexOf("異動事件管理/異動事件登記") != -1) {
					$(".ttab2").show();
				}
				else if (access[i].indexOf("異動事件管理/異動事件確認") != -1) {
					$(".ttab3").show();
				}
				else if (access[i].indexOf("異動事件管理/異動統計") != -1) {
					$(".ttab4").show();
				}
				else if (access[i].indexOf("異動事件管理/案件總覽") != -1) {
					$(".ttab5").show();
				}
				else if (access[i].indexOf("異動事件管理/案件統計") != -1) {
					$(".ttab6").show();
				}
				else if (access[i].indexOf("異動事件管理/林班地籍異動") != -1) {
					$(".ttab7").show();
				}
				else if (access[i].indexOf("異動事件管理/地籍存摺比對") != -1) {
					$(".ttab8").show();
				}
			}
			$("#dropdowntrig_ul").hide();
			$("#dropdowntrig_ul3").hide();
		}
		else {
			wntrigshow2 = false;
			$("#dropdowntrig_ul2").hide();
		}
	});
	var wntrigshow3 = false;
	$("#dropdowntrig3").click(function() {
		if (!wntrigshow3) {
			wntrigshow3 = true;
			wntrigshow = false;
			wntrigshow2 = false;
			
			$("#dropdowntrig_ul3").show();
			
			$(".ttab7").hide();
			$(".ttab8").hide();
			
			var access = Logindata.access;
			
			for (var i = 0; i < access.length; i++) {
				if (access[i].indexOf("異動事件管理/異動總覽") != -1) {
					$(".ttab1").show();
				}
				else if (access[i].indexOf("異動事件管理/異動事件登記") != -1) {
					$(".ttab2").show();
				}
				else if (access[i].indexOf("異動事件管理/異動事件確認") != -1) {
					$(".ttab3").show();
				}
				else if (access[i].indexOf("異動事件管理/異動統計") != -1) {
					$(".ttab4").show();
				}
				else if (access[i].indexOf("異動事件管理/案件總覽") != -1) {
					$(".ttab5").show();
				}
				else if (access[i].indexOf("異動事件管理/案件統計") != -1) {
					$(".ttab6").show();
				}
				else if (access[i].indexOf("異動事件管理/林班地籍異動") != -1) {
					$(".ttab7").show();
				}
				else if (access[i].indexOf("異動事件管理/地籍存摺比對") != -1) {
					$(".ttab8").show();
				}
			}
			$("#dropdowntrig_ul").hide();
			$("#dropdowntrig_ul2").hide();
		}
		else {
			wntrigshow3 = false;
			$("#dropdowntrig_ul3").hide();
		}
	});
}

var te_list_map;
function te_list_data_init()
{
	te_list_map = map('mmaplist', false, false);
	
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select({
		filter: function(e){
			if (e.isass) return false;
			return true;
		}
	});
	SelectSingleClick.on("select", te_review_feature_click);
	te_list_map.addInteraction(SelectSingleClick);
	te_list_map.SelectSingleClick = SelectSingleClick;
	
	tab3("te_tab_review");
}

function create_step(i,j)
{
	$("#te_step").empty();
	$("#te_step").load("./views/te_manage_tab" + i + "_step" + j + ".html");
	setTimeout(function() {
		$('.del_edit').show();
		te_can_edit = true;
	}, 200);
}

//異動查詢(新增異動) START
var te_manage_tab2 = {};
function te_manage_tab2_init() {
	te_manage_tab2.map = map('mmap', true, false);
	
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select();
	SelectSingleClick.on("select", te_manage_tab2_feature_click);
	te_manage_tab2.map.addInteraction(SelectSingleClick);
	te_manage_tab2.SelectSingleClick = SelectSingleClick;
	
	te_manage_tab2.del1 = [];
	te_manage_tab2.del2 = [];

	te_manage_tab2.te_tab5_list_count = 0;
	te_manage_tab2.te_tab6_list_count = 0;
	te_manage_tab2.te_tab7_list_count = 0;
	
	te_tab2_getCountyList();
	te_tab2_addnew_getCountyList();
	
	te_tab2_getDistList();
	te_tab2_getWkng();
	
	te_manage_getChangeList1();
	te_manage_getChangeList2();
	
	te_manage_getChangeMaps();
	
	tab2("te_edit_manage");
}
function te_tab2_getDistList() {
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
}
function te_tab2_getWkng() {
	// 事業區列表
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetWkngList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				te_manage_tab2.WkngList = data.data;
			}
		}
	});
}
//事業林區查詢條件變動
function te_tab2_dist_change() {
	var list = te_manage_tab2.WkngList;
	$("#search_wkng").empty();
	$("#search_wkng").append('<option value="-1">不指定</option>');
	var target = $("#search_dist").val();
	for (var i = 0; i < list.length; i++) {
		if (target == list[i].distId)
			$("#search_wkng").append('<option value="' + list[i].wid + '">' + list[i].wkngName + '</option>');
	}
}
function te_tab2_wkng_change() {
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
					$("#search_cmpt").append('<option value="' + d[i] + '">' + d[i] + '</option>');
				}
			}
		}
	});
}
function te_tab2_go_search() {
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
				var d = data.data;
				$("#te_tab6_list").empty();
				for (var i = 0; i < d.length; i++) {
					var text = '<tr>';
					text += '<td><input id="' + d[i].sid + '" value="' + d[i].sid + '" type="checkbox" class="form-check-input" onchange="te_tab6_list_check(this);" /></td>'
					text += '<td>' + d[i].distName + '</td>';
					text += '<td>' + d[i].weildName + '</td>';
					text += '<td>' + d[i].cmpt + '林班</td>';
					text += '</tr>';
					
					$("#te_tab6_list").append(text);
				}
				
				editmap.tab6list = d;
			}
		}
	});
}
var te_tab2_nowadd = null;
function te_manage_add_show(target) {
	$("#addnewte_modal").empty();
	if (target == 1) {
		$("#addnewte_modal").append("新增事業區內地籍清單");
	}
	else if (target == 2) {
		$("#addnewte_modal").append("新增非事業區內地籍清單");
	}
	te_tab2_nowadd = target;
	$('#AddNewte').modal('show');
}
function te_manage_add_hide() {
	te_tab2_nowadd = null;
	$("#add_te_city").val("-1");
	$("#add_te_town").val("-1");
	$("#add_te_land").val("-1");
	$("#add_te_landnum1").val("");
	$("#add_te_landnum2").val("");
	$("#add_te_area").val("");
	$("#ismoved").prop('checked', false);
	$("#add_te_area").prop('disabled', false);
	
	$('#AddNewte').modal('hide');
}
function te_manage_check_show() {
	var area = $("#add_te_area").val();
	var city = $("#add_te_city").val();
	var town = $("#add_te_town").val();
	var land = $("#add_te_land").val();

	var tenum1 = $("#add_te_landnum1").val();
	var tenum2 = $("#add_te_landnum2").val();
	
	
	if (city == "-1") {
		alert("請選擇縣市。");
		return;
	}
	if (tenum1 == "" || tenum2 == "") {
		alert("請填寫地號。");
		return;
	}
	if (town == "-1") {
		alert("請選擇鄉鎮。");
		return;
	}
	if (area == "") {
		alert("請輸入面積。");
		return;
	}
	if (land == "-1") {
		alert("請選擇地段。");
		return;
	}
	
	$('#AddNewte').modal('hide');
	$('#CheckAddNewte').modal('show');
}
function te_add_sure_save() {
	var post = {};
	
	post.County = $("#add_te_city").find("option:selected").text();
	post.Town = $("#add_te_town").find("option:selected").text();
	post.LandName = $("#add_te_land").find("option:selected").text();
	post.LandNo = $("#add_te_landnum1").val() + '-' + $("#add_te_landnum2").val();
	post.AreaHa = $("#add_te_area").val();
	
	post.ContainerId = te_manage_tab2.uid; 
	post.Type = te_tab2_nowadd;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/ExportOneForest",
		type: "Post",
		data: post,
		beforeSend: function(){
           WaitingShow(true);
        },
		success: function(data) {
			setTimeout(function() { WaitingShow(false); }, 900);
			if (data.data) {
				var d = data.data;
				if (d == 1) {
					alert("新增成功.");
					te_add_sure_cancel();
					te_manage_getChangeList1();
					te_manage_getChangeList2();
					te_manage_getChangeMaps();
				}
				else if (d == 2) {
					alert("輸入的資料重複.");
					te_add_sure_cancel();
				}
				else {
					alert("新增失敗.");
				}
			}
		}
	});
}
function te_add_sure_cancel() {
	te_manage_add_hide();
	$('#CheckAddNewte').modal('hide');
}
var te_tab2_nowimport = null;
function te_manage_import_show(target) {
	$("#importnewte_modal").empty();
	if (target == 1) {
		$("#importnewte_modal").append("批次匯入事業區內地籍清單");
	}
	else if (target == 2) {
		$("#importnewte_modal").append("批次匯入非事業區內地籍清單");
	}
	te_tab2_nowimport = target;
	$('#ImportNewte').modal('show');
}
function te_manage_import_hide() {
	te_tab2_nowimport = null;
	
	$('#ImportNewte').modal('hide');
}
function te_manage_download_exm() {
	var filename = "";
	if (te_tab2_nowimport == 1)
		filename = "事業區內地籍清單範本.xlsx";
	else if (te_tab2_nowimport == 2)
		filename = "非事業區內地籍清單範本.xlsx";
	
	window.location.href = 'examplefile/' + filename;
}
var editmap = {};
var noweditmapid = null;
function te_manage_upload_show(id) {
	if (!te_can_edit) return;
	$(".image_button").removeClass("active");
	$("#DelChangeFeatureEventBtn").hide();
	$("#EditPageview").modal("show");
	
	noweditmapid = id;
	setTimeout(function() {
		editmap = map("mmapmodalEdit", true, false);
		editmap.tab5features = [];
		editmap.tab6features = [];
		var post = {};
		post.LandListId = noweditmapid;
		
		$.ajax({
			url: ApiRequestURL + "ChangeEvent/GetTargetLandMap",
			type: "Post",
			data: post,
			success: function(data) {
				if (data.data) {
					var d = data.data;

					if (d.wkt) {
						var format = new ol.format.WKT();
						var feature = format.readFeature(d.wkt);
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");

						editmap.geomvector_source.addFeature(feature);
						editmap.getView().fit(feature.getGeometry().getExtent(), { maxZoom: 18});
					}
				}
			}
		});
	}, 500);
}
function te_tab2_getCountyList() {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetCountyList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				for (var i = 0; i < d.length; i++) {
					$("#search_county").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
				}
			}
		}
	});
}
function te_tab2_getTownList() {
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
					$("#search_town").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
				}
				$("#search_sec").empty();
				$("#search_sec").append('<option selected value="-1">請選擇</option>');
			}
		}
	});
}
function te_tab2_getLandList() {
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
					$("#search_sec").append('<option value="' + d[i].sec_code + '">' + landstr + '</option>');
				}
			}
		}
	});
}
function te_tab2_queryLandList() {
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var sec = $("#search_sec").val();
	var pm = $("#search_number1").val();
	var pc = $("#search_number2").val();
	var lc = $("#search_land_code").val();
	
	var post = {};
	if (county != "-1") post.CountyCode = county;
	if (town != "-1") post.TownCode = town;
	if (sec != "-1") post.LandCode = sec;
	if (pm != "") post.PmNo = pm;
	if (pc != "") post.PcNo = pc;
	
	if ((county == "-1" || town == "-1" || sec == "-1") && lc == "") {
		alert("請選擇查詢條件!");
		return;
	}
	
	// 選擇地籍編碼情況下 只查地籍編碼
	if (lc != "") {
		post = {};
		post.LandNo = lc;
	}
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "InfoOverView/QueryLandList",
		type: "Post",
		data: post,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data;
				$("#te_tab5_list").empty();
				if (d.length == 0) {
					var text = '<tr>';
					text += '<td>' + '無符合查詢結果' + '</td>';
					text += '</tr>';
					$("#te_tab5_list").append(text);
				}
				else {
					for (var i = 0; i < d.length; i++) {
						var text = '<tr>';
						text += '<td><input id="' + d[i].sid + '" type="checkbox" value="' + d[i].sid + '" class="form-check-input" onchange="te_tab5_list_check(this);" /></td>';
						text += '<td style="width: 60px;">' + d[i].townName + '</td>';
						text += '<td>' + d[i].landName + '</td>';
						text += '<td>' + d[i].pm_pc + '</td>';
						text += '</tr>';
						
						$("#te_tab5_list").append(text);
					}
				}
			}
		}
	});
}
function te_tab2_addnew_getCountyList() {
	$.ajax({
	  url: ApiRequestURL + "InfoOverView/GetCountyList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			for (var i = 0; i < d.length; i++) {
				$("#add_te_city").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
			}
		}
	  }
	});
}
function te_tab2_addnew_getTownList() {
	var val = $("#add_te_city").val();
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
				$("#add_te_town").empty();
				$("#add_te_town").append('<option selected value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					$("#add_te_town").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
				}
				$("#add_te_land").empty();
				$("#add_te_land").append('<option selected value="-1">請選擇</option>');
			}
		}
	});
}
function te_tab2_addnew_getLandList() {
	var county = $("#add_te_city").val();
	var town = $("#add_te_town").val();
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
				$("#add_te_land").empty();
				$("#add_te_land").append('<option selected value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					var landstr = "";
					landstr += d[i].sec == "" ? "" : d[i].sec + "段";
					landstr += d[i].sec_sub == "" ? "" : d[i].sec_sub + "小段";
					$("#add_te_land").append('<option value="' + d[i].sec_code + '">' + landstr + '</option>');
				}
			}
		}
	});
}
function te_manage_import_del(type) {
	var delary = te_manage_tab2.del1.concat(te_manage_tab2.del2);
	
	var post = {};
	post.Sid = delary;
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/DeleteLandList",
		type: "Post",
		data: post,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data;
				if (d) {
					alert("刪除成功");
					
					te_manage_getChangeList1();
					te_manage_getChangeList2();
					te_manage_getChangeMaps();
					
					te_manage_tab2.del1 = [];
					te_manage_tab2.del2 = [];
					
					$(".del_btn1").prop('disabled', true);
					$(".del_btn2").prop('disabled', true);
				}
				else {
					alert("刪除失敗");
				}
			}
		}
	});
}
function te_manage_selectdel_all(that, type) {
	if (that.checked == true) {
		$(".del_select_" + type).prop('checked', true);
		$(".del_btn1").prop('disabled', false);
		
		if (type == 1) {
			$(".del_select_" + type).each(function() {
				te_manage_tab2.del1.push(this.value);
			});
		}
		else if (type == 2) {
			$(".del_select_" + type).each(function() {
				te_manage_tab2.del2.push(this.value);
			});
		}
	}
	else {
		$(".del_select_" + type).prop('checked', false);
		
		if (type == 1) {
			te_manage_tab2.del1 = [];
		}
		else if (type == 2) {
			te_manage_tab2.del2 = [];
		}
		if (te_manage_tab2.del1.length == 0 && te_manage_tab2.del2.length == 0) {
			$(".del_btn1").prop('disabled', true);
		}
	}
}
function te_manage_del_fromid(id, type, that) {
	if (that.checked == true) {
		if (type == 1) {
			te_manage_tab2.del1.push(id);
			$(".del_btn1").prop('disabled', false);
		}
		else if (type == 2) {
			te_manage_tab2.del2.push(id);
			$(".del_btn1").prop('disabled', false);
		}
	}
	else if (that.checked == false) {
		if (type == 1) {
			var idx = te_manage_tab2.del1.indexOf(id);
			te_manage_tab2.del1.splice(idx, 1);
			
			if (te_manage_tab2.del1.length == 0 && te_manage_tab2.del2.length == 0) {
				$(".del_btn1").prop('disabled', true);
			}
		}
		else if (type == 2) {
			var idx = te_manage_tab2.del2.indexOf(id);
			te_manage_tab2.del2.splice(idx, 1);
			
			if (te_manage_tab2.del1.length == 0 && te_manage_tab2.del2.length == 0) {
				$(".del_btn1").prop('disabled', true);
			}
		}
	}
}
function te_manage_upload() {
	var formdata = new FormData();
	formdata.append("ContainerId", te_manage_tab2.uid);
	formdata.append("Type", te_tab2_nowimport);
	
	$.each($("#te_data_basic_new_file"), function(i, obj) {
        $.each(obj.files,function(j, file) {
            formdata.append('files', file);
        });
	});
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/ExportIsForest",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d === true) {
					alert("匯入成功.");
					te_manage_import_hide();
					
					te_manage_getChangeList1();
					te_manage_getChangeList2();
					te_manage_getChangeMaps();
				}
				else if (d != false) {
					var tstr = '';
					for (var i = 0; i < d.length; i++) {
						tstr += '<div>第' + d[i] + '列</div>';
					}
					$("#errorlinezone").empty();
					$("#errorlinezone").append(tstr);
					$('#ExportErrorLine').modal('show');
					
					te_manage_import_hide();
				}
				else {
					alert("匯入失敗.");
				}
			}
		}
	});
}
function errorlineclose() {
	$('#ExportErrorLine').modal('hide');
	
	te_manage_getChangeList1();
	te_manage_getChangeList2();
	te_manage_getChangeMaps();
}
function te_manage_getChangeList1() {
	var post = {};
	post.ContainerId = te_manage_tab2.uid;
	post.Type = "1";
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeLandList",
		type: "Post",
		data: post,
		beforeSend: function() {
           WaitingShow(true);
        },
		success: function(data) {
			WaitingShow(false);
			
			if (data.data) {
				var d = data.data;
				
				$("#te_inarea_body").empty();
				
				for (var i = 0; i < d.length; i++) {
					var tmp = '<tr id="list_item_' + d[i].sno + '" onclick="te_tab_list_fixed(' + d[i].sno + ', this)">';
					
					tmp += '<td><input class="del_select_1 form-check-input del_edit" type="checkbox" name="items" value="' + d[i].sno + '" onchange="te_manage_del_fromid(' + d[i].sno + ', 1, this);" /></td>';
					
					tmp += '<td>' + (i + 1) + '</td>';
					tmp += '<td>' + d[i].county + '</td>';
					tmp += '<td>' + d[i].town + '</td>';
					tmp += '<td>' + d[i].landName + '</td>';
					tmp += '<td>' + d[i].landNo + '</td>';
					tmp += '<td>' + d[i].landCode + '</td>';
					tmp += '<td>' + d[i].areaHa + '</td>';
					tmp += '<td>' + d[i].dist + '</td>';
					tmp += '<td>' + d[i].wkng + '</td>';
					tmp += '<td>' + d[i].cmpt + '</td>';
					
					if (d[i].mapping == "0") {
						tmp += '<td style="color: #74642A;">非整筆移出</td>';
						tmp += '<td class="te_map_up" onclick="te_manage_upload_show(' + d[i].sno + ');" style="color: red;" >未上傳</td>';
					}
					else if (d[i].mapping == "1") {
						tmp += '<td>整筆移出</td>';
						tmp += '<td class="te_map_up">-</td>';
					}
					else if (d[i].mapping == "2") {
						tmp += '<td style="color: #74642A;">非整筆移出</td>';
						tmp += '<td class="te_map_up" onclick="te_manage_upload_show(' + d[i].sno + ');" style="color: green;">已上傳</td>';
					}
					
					tmp += "</tr>";
					
					$("#te_inarea_body").append(tmp);
					
					if (te_can_edit) {
						$(".del_edit").show();
					}
				}
			}
		}
	});
}
function te_checkhasnotupload() {
	var r = false;
	
	var item = $(".te_map_up");
	
	for (var i = 0; i < item.length; i++) {
		if (item[i].innerText == '未上傳') {
			r = true;
		}
	}
	
	return r;
}
function te_manage_getChangeList2() {
	var post = {};
	post.ContainerId = te_manage_tab2.uid;
	post.Type = "2";
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeLandList",
		type: "Post",
		data: post,
		beforeSend: function(){
           WaitingShow(true);
        },
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#te_notinarea_body").empty();
				for (var i = 0; i < d.length; i++) {
					var tmp = "<tr>";
					tmp += '<td><input class="del_select_2 form-check-input" type="checkbox" name="items" value="' + d[i].sno + '" onchange="te_manage_del_fromid(' + d[i].sno + ', 2, this);" /></td>';
					tmp += '<td>' + (i + 1) + '</td>';
					tmp += '<td>' + d[i].county + '</td>';
					tmp += '<td>' + d[i].town + '</td>';
					tmp += '<td>' + d[i].landName + '</td>';
					tmp += '<td>' + d[i].landNo + '</td>';
					tmp += '<td>' + d[i].landCode + '</td>';
					tmp += '<td>' + d[i].areaHa + '</td>';
					
					tmp += "</tr>";
					
					$("#te_notinarea_body").append(tmp);
					
					if (te_can_edit) {
						$(".del_edit").show();
					}
				}
			}
		}
	});
}
function te_manage_getChangeMaps() {
	var post = {};
	post.ContainerId = te_manage_tab2.uid;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeLandMaps",
		type: "Post",
		data: post,
		beforeSend: function(){
           WaitingShow(true);
        },
		success: function(data) {
			if (data.data) {
				var dd = data.data;
				
				var format = new ol.format.WKT();
				
				// assMap
				var forestStyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(48, 212, 33, 0.3)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(25, 110, 17, 1)",
						width: 2,
					}),
				});
				
				te_manage_tab2.map.geomvector_source1.clear();
				var a = dd.assMap;
				for (var i = 0; i < a.length; i++) {
					var feature = format.readFeature(a[i].wkt);
					
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = a[i].sid;
					feature.setStyle(forestStyle);
					
					te_manage_tab2.map.geomvector_source1.addFeature(feature);
				}
				
				//baseMap
				var style =	new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(235, 0, 0, 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(148, 0, 0, 1)",
						width: 2,
					}),
				});
				
				te_manage_tab2.map.geomvector_source.clear();
				
				var d = dd.baseMap;
				for (var i = 0; i < d.length; i++) {
					var feature = format.readFeature(d[i].wkt);
					
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = d[i].sid;
					
					if (d[i].mapping == "1")
						feature.setStyle(style);
					
					te_manage_tab2.map.geomvector_source.addFeature(feature);
				}
				
				if (d.length > 0)
					te_manage_tab2.map.getView().fit(te_manage_tab2.map.geomvector_source.getExtent(), { maxZoom: 18});
			}
		}
	});
}
function te_manage_savechangemap() {
	var features = editmap.geomvector_source.getFeatures();
	var format = new ol.format.WKT();
	var wkt = "";
	if (features.length == 1) // 單一Polygon
	{
		features[0].getGeometry().transform("EPSG:3857", "EPSG:3826");
		// 讀取WKT
		wkt = format.writeFeature(features[0]);
	}
	else if (features.length > 1) //多個Polygon需組成MultiPolygon
	{
		var mploygons = new ol.geom.MultiPolygon([]);
		for (var i = 0; i < features.length; i++) {
			var polygon = features[i].getGeometry().transform("EPSG:3857", "EPSG:3826");
			mploygons.appendPolygon(polygon);
		}
		
		wkt = format.writeGeometry(mploygons);
	}
	else return;
	
	var post = {};
	post.Wkt = wkt;
	post.LandListId = noweditmapid;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/UploadTargetLandList",
		type: "Post",
		data: post,
		async: false,
		beforeSend: function(){
           WaitingShow(true);
        },
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data;
				if (d == true) {
					alert("上傳更新異動圖徵成功.");
				}
				else {
					alert("上傳更新異動圖徵失敗.");
				}
			}
		}
	});
}
function select_all_te_tab5_list(that) {
	$('#te_tab5_list input[class="form-check-input"]').each(function() {
		if (that.checked == true)
			$(this).prop('checked', true);
		else
			$(this).prop('checked', false);
	});
}
function select_all_te_tab6_list(that) {
	$('#te_tab6_list input[class="form-check-input"]').each(function() {
		if (that.checked == true)
			$(this).prop('checked', true);
		else
			$(this).prop('checked', false);
	});
}
function te_tab5_list_check(that) {
	if (that.checked == false) {
		$('#te_tab5_all').prop('checked', false);
	}
	else {
		var total = $('#te_tab5_list input[class="form-check-input"]').length;
		var checked = $('#te_tab5_list input[class="form-check-input"]:checked').length;
		
		if (total == checked)
			$('#te_tab5_all').prop('checked', true);
	}
}
function te_tab6_list_check(that) {
	if (that.checked == false) {
		$('#te_tab6_all').prop('checked', false);
	}
	else {
		var total = $('#te_tab6_list input[class="form-check-input"]').length;
		var checked = $('#te_tab6_list input[class="form-check-input"]:checked').length;
		
		if (total == checked)
			$('#te_tab6_all').prop('checked', true);
	}
}
function te_tab5_list_add() {
	var sid = [];
	$('#te_tab5_list input[class="form-check-input"]:checked').each(function() {
		var ishas = false;
		for (var i = 0; i < editmap.tab5features.length; i++) {
			if (editmap.tab5features[i].sid == this.value) {
				ishas = true;
				break;
			}
		}
		if (ishas) {
			return;
		}
		
		sid.push(this.value);
		
		// 將對應資料加入右邊列表
		var p = $(this).parent().parent();
		var tds = p.find('td');
		
		var tmp = '<tr onclick="te_tab_add_fixed(' + this.value + ')">';
		for (var i = 1; i < tds.length; i++) {
			if (i == 1)
				tmp += '<td style="width: 60px;">' + $(tds[i]).text() + '</td>';
			else
				tmp += '<td>' + $(tds[i]).text() + '</td>';
		}
		tmp += '<td style="width: 44px;"><img src="image/button_image/eye_show.svg" style="cursor: pointer;" onclick="te_tab_add_visable(this, ' + this.value + ')" /></td>';
		tmp += '<td style="width: 55px;"><label style="color: red; cursor: pointer;" onclick="te_tab_add_remove(this, ' + this.value + ', 5)">刪除</label></td>';
		
		tmp += "</tr>";

		if (editmap.tab5features.length == 0 && sid.length == 1) {
			$("#te_tab_add_list1").empty();
		}
		
		$("#te_tab_add_list1").append(tmp);
	});
	
	if (sid.length == 0) return;
	
	var post = {};
	post.Sid = sid;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetBaseQueryMap",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;

				var format = new ol.format.WKT();
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
					var feature = format.readFeature(d[i].wkt);
					
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = d[i].sid;
					
					feature.setStyle(style);
					editmap.geomextra_source.addFeature(feature);
					editmap.tab5features.push(feature);
				}
			}
		}
	});
}
function te_tab6_list_add() {
	var sid = [];
	$('#te_tab6_list input[class="form-check-input"]:checked').each(function() {
		var ishas = false;
		for (var i = 0; i < editmap.tab6features.length; i++) {
			if (editmap.tab6features[i].sid == this.value) {
				ishas = true;
				break;
			}
		}
		if (ishas) {
			return;
		}
		
		sid.push(this.value);
		
		// 將對應資料加入右邊列表
		var p = $(this).parent().parent();
		var tds = p.find('td');
		
		var tmp = '<tr onclick="te_tab_add_fixed(' + this.value + ', 2)">';
		for (var i = 1; i < tds.length; i++) {
			tmp += '<td>' + $(tds[i]).text() + '</td>';
		}
		tmp += '<td style="width: 44px;"><img src="image/button_image/eye_show.svg" style="cursor: pointer;" onclick="te_tab_add_visable(this, ' + this.value + ', 2)" /></td>';
		tmp += '<td style="width: 55px;"><label style="color: red; cursor: pointer;" onclick="te_tab_add_remove(this, ' + this.value + ', 6)">刪除</label></td>';
		tmp += "</tr>";

		if (editmap.tab6features.length == 0 && sid.length == 1) {
			$("#te_tab_add_list2").empty();
		}
		
		$("#te_tab_add_list2").append(tmp);
	});
	
	if (sid.length == 0) return;
	
	var d = editmap.tab6list;
	
	var format = new ol.format.WKT();
	for (var i = 0; i < sid.length; i++) {
		var style =	new ol.style.Style({
			fill: new ol.style.Fill({
				color: "rgba(113, 183, 183, 0.5)",
			}),
			stroke: new ol.style.Stroke({
				color: "rgba(0, 48, 97, 1)",
				width: 2,
			}),
		});
		
		var tar = d.filter(x => x.sid == sid[i]);
		
		for (var j = 0; j < tar.length; j++) {
			var feature = format.readFeature(tar[j].wkt);
		
			feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
			feature.sid = tar[j].sid;
			feature.stobj = style;
			
			feature.setStyle(style);
			editmap.geomextra_source.addFeature(feature);
			
			editmap.tab6features.push(feature);
		}
	}
}
var te_tab_fixed = true;
function te_tab_add_fixed(sid, type) {
	if (te_tab_fixed == false) {
		te_tab_fixed = true;
		return;
	}
	
	if (!type) {
		var features = editmap.geomextra_source.getFeatures();
		var feature = null;
		for (var i = 0; i < features.length; i++) {
			if (features[i].sid == sid) {
				feature = features[i];
				break;
			}
		}
		
		const extent = feature.getGeometry().getExtent();
		editmap.getView().fit(extent, { maxZoom: 18});		
	}
	else {
		var features = editmap.tab6features;
		var feature = null;
		for (var i = 0; i < features.length; i++) {
			if (features[i].sid == sid) {
				feature = features[i];
				break;
			}
		}
		
		const extent = feature.getGeometry().getExtent();
		editmap.getView().fit(extent, { maxZoom: 18});	
	}
}
function te_tab_add_visable(that, sid, type) {
	var features = editmap.geomextra_source.getFeatures();
	
	te_tab_fixed = false;

	if (!type) {
		var feature = null;
		
		for (var i = 0; i < features.length; i++) {
			if (features[i].sid == sid) {
				feature = features[i];
				break;
			}
		}
		
		var isrc = that.src.split('/');
		var srcn = isrc[isrc.length - 1];
		
		var style =	new ol.style.Style({
			fill: new ol.style.Fill({
				color: "rgba(113, 183, 183, 0.5)",
			}),
			stroke: new ol.style.Stroke({
				color: "rgba(0, 48, 97, 1)",
				width: 2,
			}),
		});
		
		if (srcn == "eye_show.svg")
		{
			that.src = "image/button_image/eye_hide.svg";
			feature.setStyle(new ol.style.Style({}));
		}
		else
		{
			that.src = "image/button_image/eye_show.svg";
			feature.setStyle(style);
		}
	}
	else {
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
			if (features[i].sid == sid) {
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
}
function te_tab_add_remove(that, sid, target) {
	te_tab_fixed = false;
	if (target == 5) {
		var feature = null;
		var fidx = -1;
		var features = editmap.tab5features;
		for (var i = 0; i < features.length; i++) {
			if (features[i].sid == sid) {
				feature = features[i];
				fidx = i;
				break;
			}
		}
		
		editmap.tab5features.splice(fidx, 1);
		
		if (feature)
			editmap.geomextra_source.removeFeature(feature);	
	}
	else if (target == 6) {
		var feature = null;
		var fidx = -1;
		var features = editmap.tab6features;
		for (var i = 0; i < features.length; i++) {
			if (features[i].sid == sid) {
				feature = features[i];
				fidx = i;
				break;
			}
		}
		
		editmap.tab6features.splice(fidx, 1);
		
		if (feature)
			editmap.geomextra_source.removeFeature(feature);	
	}
		
	if (target == 5) {
		if (editmap.tab5features.length == 0) {
			$("#te_tab_add_list1").empty();
			$("#te_tab_add_list1").append('<tr><td>尚無資料</td></tr>');
		}
	}
	else if (target == 6) {
		if (editmap.tab6features.length == 0) {
			$("#te_tab_add_list2").empty();
			$("#te_tab_add_list2").append('<tr><td>尚無資料</td></tr>');
		}
	}
	
	$(that).parent().parent().remove();
}
function te_tab_list_fixed(sid, that) {
	var features = te_manage_tab2.map.geomvector_source.getFeatures();
	var feature = null;
	
	$("#te_inarea_body tr").removeClass("active");
	$(that).addClass("active");
	
	for (var i = 0; i < features.length; i++) {
		if (features[i].sid == sid) {
			feature = features[i];
			break;
		}
	}
	
	if (feature) {
		const extent = feature.getGeometry().getExtent();
		te_manage_tab2.map.getView().fit(extent, { maxZoom: 18});
		te_manage_tab2.SelectSingleClick.getFeatures().clear();
		te_manage_tab2.SelectSingleClick.getFeatures().push(feature);
	}
}
function te_tab_edit_change() {
	te_manage_tab2.tabtype = "edit";
	$(".list_frame").empty().load("./views/te_manage_tab" + 2 + "_step" + 2 + ".html");
	setTimeout(function() {
		$(".send_bt2").hide();
		$(".send_bt3").show();
		$(".row_button_zone").hide();
		$(".sent_button_zone").hide();
	}, 500);
}
function te_tab_back() {
	if (te_manage_tab2.tabtype == "add") {
		te_manage_tab2.tabtype = "addback";
		create_step(2, 1);
		$(".nav-item3.tab2").parent().children().removeClass("active");
		$(".nav-item3.tab1").addClass("active");
	}
	else if (te_manage_tab2.tabtype == "edit") {
		$(".detail_data").show();
		
		let d = te_manage_tab2.uid;
		loadDetialData(d);           //載入基本資料
		$("#detail_cancel").click(); //復原編輯狀態
	}
}
function te_tab2_type_change() {
	var v = $("#te_type").val();
	if (v == "1") {
		$("#te_type_sub").show();
	}
	else {
		$("#te_type_sub").hide();
		$("#te_type_sub").val("-1");
	}
}
function te_tab2_sent() {
	if (te_manage_tab2.tabtype != "add") return;
	var yes = confirm('是否完成異動事件登記內容並送出?');
	if (!yes) return;
	
	var post = {}
	post.UpdataUid = te_manage_tab2.uid;
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/SentChangeEventInfo",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 900);
			
			if (data.data == "1") {
				alert("送審成功.");
				$("li.nav-item2.tab1").click();
			}
			else
				alert("送審失敗.");
		}
	});
}
function Expand_te_map_modal() {
	$("#ExpandButton").hide();
	$("#CollapseButton").show();

	$(".add_area").hide();
	$(".map_area").css("width", "100%");

	editmap.updateSize();
}
function Collapse_te_map_modal() {
	$("#ExpandButton").show();
	$("#CollapseButton").hide();

	$(".add_area").show();
	$(".map_area").css("width", "63%");

	editmap.updateSize();
}
//異動查詢(新增異動) END

var nowloadDetialData = null;
function loadDetialData(id, isreview) {
	/* 先塞測試用資料，需要改寫 */
	//讀取資料
	if (!isreview)
		$(".data_frame").empty().load("./views/temp/detail_data_temp.html?rnd=" + Math.round(Math.random()*10000));
	else
		$(".data_frame").empty().load("./views/temp/detail_review_temp.html?rnd=" + Math.round(Math.random()*10000));
	
	$(".list_frame").empty();
		
	var post = {};
	post.Uid = id;
	nowloadDetialData = id;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetTargetChangeEventInfo",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var data = data.data;
			if (!isreview && data.sent != "1" && data.sent != "3")
				WaitingShow(false);
			
			setTimeout(function() {
				if (isreview) {
					var rightNow = new Date();
					var res = rightNow.toISOString().slice(0, 10).replace(/-/g, "/");
					
					$("#review_apply_number").text(Logindata.name);
					$("#review_apply_time").text(res);
				}
				$(".manage_bt_area").show();
				//狀態
				var stat = "";
				if (data.sent == "0") {
					stat = "未送出";
					$(".pass_state").hide();
					$("#te_data_basic_state").addClass("state_type1").text(stat);
					
					// 觸發地圖編輯
					setTimeout(function() {
						te_tab_edit_change();
					}, 500);
				}
				else if (data.sent == "1")
				{
					stat = "未確認";
					$(".normal_state").hide();
					$(".pass_state").hide();
					$(".manage_bt_area").hide();
					$("#te_data_basic_state").addClass("state_type1").text(stat);
					
					if (!isreview) {
						loadListData(id, true);
					}
				}
				else if (data.sent == "2")
				{
					stat = "退回修正";
					$(".pass_state").hide();
					$("#te_data_basic_state").text(stat);
					$("#te_data_basic_state").addClass("state_type1").text(stat);
					
					// 觸發地圖編輯
					setTimeout(function() {
						te_tab_edit_change();
					}, 500);
				}
				else if (data.sent == "3")
				{
					stat = "已通過";
					$(".normal_state").hide();
					$(".pass_state").show();
					$("#te_data_basic_state").text(stat);
					
					$("#te_data_basic_state").addClass("state_type1").text(stat);
					if (!isreview) {
						loadListData(id, true);
					}
				}
				else if (data.sent == "4")
				{
					stat = "取消異動";
					$(".normal_state").hide();
					$(".pass_state").hide();
					$(".manage_bt_area").hide();
					$("#cancel_reason").show();
					
					$("#te_data_basic_state").addClass("state_type1").text(stat);
					
					//取消異動人員
					$("#te_cancel_user").text(data.cancelUserName);
					//取消異動日期
					$("#te_cancel_time").text(formatDateTime_Date(data.cancelTime));
					//取消異動原因
					$("#te_cancel_reason").text(data.cancelNote);
					
					if (!isreview) {
						loadListData(id, true);
					}
				}
				
				//識別碼
				$("#te_data_basic_uid").text(data.uid);
				//建立者
				$("#te_data_basic_createuser").text(data.createUserName);
				//單位資訊
				$("#te_data_basic_createunit").text(data.deptName == "" ? "其他" : data.deptName);
				//建立時間
				$("#te_data_basic_createtime").text(data.createTime);
				//所屬單位	
				if (!isreview)
					$("#te_data_basic_deptart").val(data.distName);
				else
					$("#te_data_basic_deptart").text(data.distName);
				
				//案由
				if (!isreview)
					$("#te_data_basic_title").val(data.title);
				else
					$("#te_data_basic_title").text(data.title);
				
				//最後編輯者
				$("#te_data_basic_updateuser").text(data.updateUserName);
				//最後編輯時間
				$("#te_data_basic_updatetime").text(data.updateTime);
				//異動類型
				if (!isreview) {
					$("#te_data_basic_changetype").val(data.changeType);
					if (data.changeType == "1") {
						$("#te_data_basic_changetype_sub").val(data.changeTypeSub);
						$("#te_data_basic_changetype_sub").show();
					}
				}
				else {
					if (data.changeType == "1") {
						var changestr = "森林法第8條撥用";
						
						if (data.changeTypeSub == "1") {
							changestr += "-公共設施";
						}
						else if (data.changeTypeSub == "2") {
							changestr += "-國防";
						}
						else if (data.changeTypeSub == "3") {
							changestr += "-交通";
						}
						else if (data.changeTypeSub == "4") {
							changestr += "-水利";
						}
						else if (data.changeTypeSub == "5") {
							changestr += "-公用事業";
						}
						else if (data.changeTypeSub == "6") {
							changestr += "-國家公園";
						}
						else if (data.changeTypeSub == "7") {
							changestr += "-風景特定區";
						}
						
						$("#te_data_basic_changetype").text(changestr);
					}
					else if (data.changeType == "2")
						$("#te_data_basic_changetype").text("增劃編原住民保留地");
					else if (data.changeType == "3")
						$("#te_data_basic_changetype").text("專案計畫移出");
					else if (data.changeType == "4")
						$("#te_data_basic_changetype").text("事業區地籍釐整");
				}
				//附件列表
				var files = data.files;
				$("#file_list").innerHTML = "";
				for (i = 0 ; i < files.length; i++) {
					var item =
					"<div class='file_list_item'>"+
					"<a href='" + DownLoadURL + files[i].savename + "'><i class='fas fa-file-alt'></i>" + files[i].filename + "</a>" +
					"<button type='button' class='btn btn-danger file_list_item_delete' onclick=\"PushDFile('" + files[i].fileId + "', this)\">刪除</button>" +
					"</div>";
							
					$("#file_list").append(item);	
				}
			}, 50);
		}
	});
}
var nowChangeListData = [];
// 審核用
function loadListData(fmtid, onlyshow) {
	/* 先塞測試用資料，需要改寫 */
	//讀取RELATION資料
	
	$(".list_frame").empty().load("./views/temp/list_data_temp.html"); //模板
	
	if (fmtid != 0) {
		setTimeout(function() {
			te_review_load_list1(fmtid);
			te_review_load_list2(fmtid);
			
			te_review_getChangeMaps(fmtid);	
		}, 900);
	}	
}
function te_review_load_list1(id) {
	var post = {};
	post.ContainerId = id;
	post.Type = "1";
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeLandList",
		type: "Post",
		data: post,
		beforeSend: function(){
           WaitingShow(true);
        },
		success: function(data) {
			
			WaitingShow(false);
			
			if (data.data) {
				var d = data.data;
				
				$("#review_1").empty().text("事業區內地籍清單(" + d.length + "筆)");
				
				$("#te_inarea_body").empty();
				
				for (var i = 0; i < d.length; i++) {
					var tmp = '<tr id="list_item_' + d[i].sno + '" onclick="te_review_list_fixed(' + d[i].sno + ', this)">';					
					tmp += '<td>' + (i + 1) + '</td>';
					tmp += '<td>' + d[i].county + '</td>';
					tmp += '<td>' + d[i].town + '</td>';
					tmp += '<td>' + d[i].landName + '</td>';
					tmp += '<td>' + d[i].landNo + '</td>';
					tmp += '<td>' + d[i].landCode + '</td>';
					tmp += '<td>' + d[i].areaHa + '</td>';
					tmp += '<td>' + d[i].dist + '</td>';
					tmp += '<td>' + d[i].wkng + '</td>';
					tmp += '<td>' + d[i].cmpt + '</td>';
					
					if (d[i].mapping == "0") {
						tmp += '<td style="color: #74642A;">非整筆移出</td>';
					}
					else if (d[i].mapping == "1") {
						tmp += '<td>整筆移出</td>';
					}
					else if (d[i].mapping == "2") {
						tmp += '<td style="color: #74642A;">非整筆移出</td>';
					}
					
					tmp += "</tr>";
					
					$("#te_inarea_body").append(tmp);
				}
			}
		}
	});
}
function te_review_load_list2(id) {
	var post = {};
	post.ContainerId = id;
	post.Type = "2";
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeLandList",
		type: "Post",
		data: post,
		beforeSend: function(){
           WaitingShow(true);
        },
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#review_2").empty().text("非事業區內地籍清單(" + d.length + "筆)");
				
				$("#te_notinarea_body").empty();
				for (var i = 0; i < d.length; i++) {
					var tmp = "<tr>";
					tmp += '<td>' + (i + 1) + '</td>';
					tmp += '<td>' + d[i].county + '</td>';
					tmp += '<td>' + d[i].town + '</td>';
					tmp += '<td>' + d[i].landName + '</td>';
					tmp += '<td>' + d[i].landNo + '</td>';
					tmp += '<td>' + d[i].landCode + '</td>';
					tmp += '<td>' + d[i].areaHa + '</td>';
					
					tmp += "</tr>";
					
					$("#te_notinarea_body").append(tmp);
				}
			}
		}
	});
}
function te_review_getChangeMaps(id) {
	var post = {};
	post.ContainerId = id;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeLandMaps",
		type: "Post",
		data: post,
		beforeSend: function() {
           WaitingShow(true);
        },
		success: function(data) {
			if (data.data) {
				var dd = data.data;
				
				var format = new ol.format.WKT();
				
				// assMap
				var forestStyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(48, 212, 33, 0.3)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(25, 110, 17, 1)",
						width: 2,
					}),
				});
				
				te_list_map.geomvector_source1.clear();
				var a = dd.assMap;
				for (var i = 0; i < a.length; i++) {
					var feature = format.readFeature(a[i].wkt);
					
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = a[i].sid;
					feature.isass = true;
					feature.setStyle(forestStyle);
					
					te_list_map.geomvector_source1.addFeature(feature);
				}
				
				var style =	new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(235, 0, 0, 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(148, 0, 0, 1)",
						width: 2,
					}),
				});
				
				te_list_map.geomvector_source.clear();
				
				var d = dd.baseMap;
				for (var i = 0; i < d.length; i++) {
					var feature = format.readFeature(d[i].wkt);
					
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = d[i].sid;
					
					if (d[i].mapping == "1")
						feature.setStyle(style);
					
					te_list_map.geomvector_source.addFeature(feature);
				}
				
				if (d.length > 0)
					te_list_map.getView().fit(te_list_map.geomvector_source.getExtent(), { maxZoom: 18});
			}
		}
	});
}

function te_review_list_fixed(sid, that) {
	var features = te_list_map.geomvector_source.getFeatures();
	var feature = null;
	
	$("#te_inarea_table tr").removeClass("active");
	$(that).addClass("active");
	
	for (var i = 0; i < features.length; i++) {
		if (features[i].sid == sid) {
			feature = features[i];
			break;
		}
	}
	
	if (feature) {
		const extent = feature.getGeometry().getExtent();
		te_list_map.getView().fit(extent, { maxZoom: 18});
		
		te_list_map.SelectSingleClick.getFeatures().clear();
		te_list_map.SelectSingleClick.getFeatures().push(feature);
	}
}

function RefreshNewChangeMaps(fmtid) {
	let type1 = "國有林事業區";
	let type2 = "保安林";

	let edit_type1 = "新增";
	let edit_type2 = "編修";
	let edit_type3 = "刪除";
	
	var post = {};
	post.FmtId = fmtid;
	
	nowChangeListData = [];
	$("#list_table").empty();
	if (!te_list_map) return;
	
	te_list_map.geomvector_source.clear();
	
	var format = new ol.format.WKT();
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetNewChangeMaps",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				nowChangeListData = d;
				for (var i = 0; i < d.length; i++) {
					var row = "";
					row += "<tr id='"+ d[i].fmId +"'><td width='15%'>"+ d[i].fmId +"</td>";
					
					var type = d[i].typeId == "1" ? "國有林事業區" : "保安林" ;
					row += "<td width='35%' class='typeid'>" + type + "</td>";
					
					var edittype = d[i].editType == "1" ?  edit_type1 : d[i].editType == "2" ? edit_type2 : edit_type3;
					row += "<td width='30%'>" + edittype + "</td>";
					row += "<td width='30%'>";
					if (edittype != "刪除") row += "<button type='button' class='btn btn-warning search_submit custom_bt3 manage_bt_area' onclick='doEdit_ListMap("+ d[i].fmId + ",\"" + type + "\"," + "1" +"," + d[i].sid + ")'>編輯</button>";
					row += "<button type='button' class='btn btn-danger search_submit custom_bt3 manage_bt_area' onclick='doReduction(" + d[i].sid + ")'>移除</button>";
					row += "</td>";
					row += "</tr>";
					
					$("#list_table").append(row);
					
					if (d[i].editType != "3") {
						var feature = format.readFeature(d[i].wkt);
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
						te_list_map.geomvector_source.addFeature(feature);
					}
				}
				
				if (d.length > 0) {
					var features = te_list_map.geomvector_source.getFeatures();
					if (features.length > 0) {
						var extent = te_list_map.geomvector_source.getExtent();
						te_list_map.getView().fit(extent, { maxZoom: 18});
					}
				}
				
				$("#list_table tr").on("click",function(){
					$(this).parent().children().removeClass("active");
					$(this).addClass("active");
				});
				
				//圖資列表點擊事件
				$("#list_table tr").on("click",function(){
					let fmid = $(this).attr('id');
					let typeid = $(this).find(".typeid").text();
					FM_detail_Show('list_detail', typeid, fmid);
				});
			}
		}
	});
}

function loadTeListData(){
	$(".list_frame").empty().load("./views/temp/te_list_data_temp.html"); //模板
}

function newApplyDetail() {
	//建立者
	$("#te_data_basic_new_createuser").text(Logindata.name);
	// 單位
	$("#te_data_basic_new_createunit").text(Logindata.deptName == "" ? "其他" : Logindata.deptName);
	//建立時間		
	$("#te_data_basic_new_createtime").text(GetDateNow());
	
	//如果是被上一步回來的話
	if (te_manage_tab2.tabtype == "addback") {
		te_manage_tab2.tabtype = "add";
		te_tab2_regetContainer();
		
		$("#NextBtn").show();
		$("#CreateBtn").hide();
	}
}

//重新取得上一步的資料
function te_tab2_regetContainer() {
	var post = {};
	post.Uid = te_manage_tab2.uid;

	if (!te_manage_tab2.uid) return;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetTargetChangeEventInfo",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var data = data.data;
			
			setTimeout(function() {		
				//識別碼
				$("#te_data_basic_new_number").text(data.uid);
				//建立者
				$("#te_data_basic_createuser").text(data.createUserName);
				//單位資訊
				$("#te_data_basic_createunit").text(data.deptName == "" ? "其他" : data.deptName);
				//建立時間
				$("#te_data_basic_new_createtime").text(data.createTime);
				//所屬單位	
				$("#te_data_basic_new_unit").val(data.distName);
				//案由
				$("#te_data_basic_new_note").val(data.title);
				//異動類型
				$("#te_type").val(data.changeType);
				if (data.changeType == "1") {
					$("#te_type_sub").show();
					$("#te_type_sub").val(data.changeTypeSub);
				}
				//附件列表
				var files = data.files;
				$("#te_data_basic_file_list").empty();
				for (i = 0 ; i < files.length; i++) {
					var item =
					"<div class='file_list_item'>"+
					"<a href='" + DownLoadURL + files[i].savename + "'><i class='fas fa-file-alt'></i>" + files[i].filename + "</a>" +
					"<button type='button' class='btn btn-danger file_list_item_delete' onclick=\"PushDFile('" + files[i].fileId + "', this)\">刪除</button>" +
					"</div>";
							
					$("#te_data_basic_file_list").append(item);	
				}
			}, 50);
		}
	});
}

// Detail用Select
function FM_detail_PfTypeSelect(value) {
	if (!PfTypeList) return
	
	var selstr = '';
	selstr += '<select id="PFTYPE" class="form-select">';
	
	for (var i = 0; i < PfTypeList.length; i++) {
		if (value == PfTypeList[i].pfTypeName)
			selstr += '<option value="' + PfTypeList[i].pid + '" selected>' + PfTypeList[i].pfTypeName + '</option>';
		else
			selstr += '<option value="' + PfTypeList[i].pid + '">' + PfTypeList[i].pfTypeName + '</option>';
	}
	selstr += '</select>';
	
	return selstr;
}

function FM_detail_Create(target, typeid, inputinfo) //圖資屬性資料
{
	$("#" + target).empty();
	CreateDataDraw = {};
	CreateDataDraw.target_data = inputinfo;
	if (typeid === "國有林事業區") {
		var DIST = inputinfo.distName;
		var WKNG = inputinfo.weildName;
		var CMPT = inputinfo.cmpt;
		var EDITION = inputinfo.edtion;
		let detail;
		
		detail = 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>林管處</div>"+
		"<div id='DIST' class='detail_rows_value'>"+ DIST +"</div>"+
		"</div>";
		
		detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>事業區</div>"+
		"<div id='WKNG' class='detail_rows_value'>"+ WKNG +"</div>"+
		"</div>";
		
		detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>林班號</div>"+
		"<div class='detail_rows_value'>"+ "<input id='CMPT' value='" + CMPT + "' />" +"</div>"+
		"</div>";
		
		detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>面積(公頃)</div>"+
		"<div class='detail_rows_value'>"+ "<input id='AREA_HA' />" +"</div>"+
		"</div>";
		
		detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>修訂資訊</div>"+
		"<div class='detail_rows_value'>"+ "<textarea id='EDITION' rows='3'>" + EDITION + "</textarea>" +"</div>"+
		"</div>";
		
		detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>最後更新時間</div>"+
		"<div class='detail_rows_value'>"+ "" +"</div>"+
		"</div>";
		
		$("#" + target).append(detail);
	}
	else if (typeid === "保安林") {
		var DIST = inputinfo.distName;
		var PF_ID = inputinfo.pfid;
		var EDITION = inputinfo.edition;
		var PFTYPE = inputinfo.pfName;
		let detail;
		
		detail = 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>林管處</div>" +
		"<div id='DIST' class='detail_rows_value'>" + DIST + "</div>" +
		"</div>";
		
		detail += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>保安林編號</div>" +
		"<div id='PF_ID' class='detail_rows_value'>" + PF_ID + "</div>" +
		"</div>";
		
		detail += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>保安林類型</div>" +
		"<div class='detail_rows_value'>"+ FM_detail_PfTypeSelect(PFTYPE) + "</div>" +
		"</div>";
		
		detail += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>面積(公頃)</div>" +
		"<div class='detail_rows_value'>" + "<input id='AREA_HA' />" + "</div>" + 
		"</div>";
		
		detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>修訂資訊</div>"+
		"<div class='detail_rows_value'>"+ "<textarea id='EDITION' rows='3'>" + EDITION + "</textarea>" +"</div>"+
		"</div>";
		
		detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>最後更新時間</div>"+
		"<div class='detail_rows_value'>"+ "" +"</div>"+
		"</div>";
		
		$("#" + target).append(detail);
	}
}

function FM_detail_Edit(target, typeid, fmid) //圖資屬性資料
{
	var post = {};
	post.id = fmid;
	post.type = typeid;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeEditData",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				$("#" + target).empty();
				
				var d = data.data;
				d.typeid = typeid;
				CreateDataDraw.target_data = d;
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
					"<div id='DIST' class='detail_rows_value'>"+ DIST +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>事業區</div>"+
					"<div id='WKNG' class='detail_rows_value'>"+ WKNG +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>林班號</div>"+
					"<div class='detail_rows_value'>"+ "<input id='CMPT' value='" + CMPT + "' />" +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>面積(公頃)</div>"+
					"<div class='detail_rows_value'>"+ "<input id='AREA_HA' value='" + areaha_abs(AREA_HA) + "' />" +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>修訂資訊</div>"+
					"<div class='detail_rows_value'>"+ "<textarea id='EDITION' rows='3'>" + EDITION + "</textarea>" +"</div>"+
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
					"<div id='DIST' class='detail_rows_value'>"+ DIST +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>保安林編號</div>"+
					"<div id='PF_ID' class='detail_rows_value'>"+ PF_ID +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>保安林類型</div>"+
					"<div class='detail_rows_value'>"+ FM_detail_PfTypeSelect(PFTYPE) +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>面積(公頃)</div>"+
					"<div class='detail_rows_value'>"+ "<input id='AREA_HA' value='" + areaha_abs(AREA_HA) + "' />" +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>修訂資訊</div>"+
					"<div class='detail_rows_value'>"+ "<textarea id='EDITION' rows='3'>" + EDITION + "</textarea>" +"</div>"+
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

function FM_detail_Show(target, typeid, fmid) {
	var post = {};
	post.id = fmid;
	post.type = typeid;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeEditData",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				$("#" + target).empty();
				
				var d = data.data;
				d.typeid = typeid;
				
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
						"<div class='detail_rows'>" +
						"<div class='detail_rows_name'>林管處</div>" +
						"<div id='DIST' class='detail_rows_value'>" + DIST + "</div>" +
						"</div>";
					
					detail += 
						"<div class='detail_rows'>"+
						"<div class='detail_rows_name'>事業區</div>"+
						"<div id='WKNG' class='detail_rows_value'>"+ WKNG +"</div>"+
						"</div>";
					
					detail += 
						"<div class='detail_rows'>"+
						"<div class='detail_rows_name'>林班號</div>"+
						"<div class='detail_rows_value'>"+ CMPT +"</div>"+
						"</div>";
					
					detail += 
						"<div class='detail_rows'>"+
						"<div class='detail_rows_name'>面積(公頃)</div>"+
						"<div class='detail_rows_value'>"+ areaha_abs(AREA_HA) +"</div>"+
						"</div>";
					
					detail += 
						"<div class='detail_rows'>"+
						"<div class='detail_rows_name'>修訂資訊</div>"+
						"<div class='detail_rows_value'>"+ EDITION +"</div>"+
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
						"<div class='detail_rows'>" + 
						"<div class='detail_rows_name'>林管處</div>" + 
						"<div id='DIST' class='detail_rows_value'>" + DIST + "</div>" + 
						"</div>";
					
					detail += 
						"<div class='detail_rows'>"+
						"<div class='detail_rows_name'>保安林編號</div>"+
						"<div id='PF_ID' class='detail_rows_value'>"+ PF_ID +"</div>"+
						"</div>";
					
					detail += 
						"<div class='detail_rows'>"+
						"<div class='detail_rows_name'>保安林類型</div>"+
						"<div class='detail_rows_value'>"+ PFTYPE +"</div>"+
						"</div>";
					
					detail += 
						"<div class='detail_rows'>"+
						"<div class='detail_rows_name'>面積(公頃)</div>"+
						"<div class='detail_rows_value'>"+ areaha_abs(AREA_HA) +"</div>"+
						"</div>";
					
					detail += 
						"<div class='detail_rows'>"+
						"<div class='detail_rows_name'>修訂資訊</div>"+
						"<div class='detail_rows_value'>"+ EDITION +"</div>"+
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

var insertmap;
function doCreate()//新增圖資
{
	$("#NewPageview").modal("show");
	SelectType(1, 1);
	setTimeout(function() {
	   $("#mmapmodal").after("<div id='mouse_position'></div>");
       insertmap = map("mmapmodal", false, false);
	},280);
}

// 初始化Model視窗
function NewPageviewInit() {
	CreateDataDraw = null;
	resetModal();
}

function doCreate_next() {
	var edittype = $("#fm_edit_type").val();
	$("#NewPageview").modal("hide");
	if (edittype == "1") {
		setTimeout(function() {
		   $("#mouse_position").remove();
		   doEdit(CreateDataDraw.target_data, edittype);
		}, 280);
	}
	else if (edittype == "2") {
		doDelete(CreateDataDraw.target_data);
	}
	else if (edittype == "3") {
		setTimeout(function() {
		   var typeid = $("#fm_type").val() == "1" ? "國有林事業區" : "保安林";
		   var tdata = {};
		   tdata.typeid = typeid;
		   $("#mouse_position").remove();
		   doEdit(tdata, edittype);
		}, 280)
	}
}

function doDelete(data) {
	var typeid = $("#fm_type").val();
	var post = {};
	post.FmtId = nowloadDetialData;
	post.FmId = data.sid;
	post.TypeId = typeid;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/DeleteNewChangeMaps",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data && data.data == "Success") {
				alert("刪除成功.");
			}
			else {
				alert("刪除失敗.");
			}
			RefreshNewChangeMaps(nowloadDetialData);
		}
	});
	
	resetModal();
}

function doEdit(target, type)//編輯圖資
{
	$("#EditPageview").modal("show");
	
	if (type == "1") //編輯圖徵
	{
		setTimeout(function() {
			if (target) {
				let fmid = target.sid;
				let typeid = target.typeid;
				FM_detail_Edit("fm_data_edit", typeid, fmid);
				 
				// 初始化編輯的地圖
				editmap = map("mmapmodalEdit", true, false);
				editmap.savetype = type;
				editmap.typeid = typeid;
				editmap.fmid = fmid;
				editmap.isinlist = false;
				editmap.isedit = true;
				
				if (fmid && typeid) {
					var post = {};
					post.Fmid = fmid;
					post.Type = typeid == "國有林事業區" ? "1" : "2";
					
					$.ajax({
						url: ApiRequestURL + "ProjectManagement/GetAssociateOptionMaps",
						type: "Post",
						data: post,
						success: function(data) {
							if (data.data) {
								var d = data.data;
								editmap.geomextra_source.clear();
								
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
									feature.landcode = d[i].landCode;
									
									feature.setStyle(style);
									editmap.geomextra_source.addFeature(feature);
								}
								
								editmap.getView().fit(editmap.geomextra_source.getExtent(), { maxZoom: 18});
								appendOverlayer(".map_area", editmap);
							}
						}
					});
				}
				
				if (CreateDataDraw) {
					var geomTypeSelected = CreateDataDraw.getGeometry().getType();
					//將資料庫內要做編輯的加到編輯地圖
					if (geomTypeSelected == "Polygon") {
						editmap.geomvector_source.addFeature(CreateDataDraw);
						
						var exetend = CreateDataDraw.getGeometry().getExtent();
						editmap.getView().fit(exetend, { maxZoom: 18});
					}
					else if (geomTypeSelected == "MultiPolygon") {
						// MultiPolygon 情況拆分成Polygon處理
						var polygons = CreateDataDraw.getGeometry().getPolygons();
						
						for (var i = 0; i < polygons.length; i++) {
							var feature = new ol.Feature({
							  geometry: polygons[i]
							});
							editmap.geomvector_source.addFeature(feature);
						}
						// editmap.getView().fit(editmap.geomvector_source.getExtent());
					}
				}
			}
		},280);
	}
	else if (type == "3") // 新增圖徵
	{
		setTimeout(function() {
			let typeid = target.typeid;
			let fmid = target.sid;
			editmap = map("mmapmodalEdit", true, false);
			editmap.savetype = type;
			editmap.typeid = typeid;
			editmap.fmid = fmid;
			editmap.isinlist = false;
			editmap.isedit = false;
			
			var obj = {};
			if (typeid == "國有林事業區") {
				obj.distName = $("#new_dist1").find("option:selected").text();
				obj.dist = $("#new_dist1").val();
				obj.weildName = $("#new_wkng1").find("option:selected").text();
				obj.wkng = $("#new_wkng1").val();
				obj.cmpt = $("#new_cmpt").val();
				obj.edtion = $("#new_edition1").val();
			}
			else if (typeid == "保安林") {
				obj.distName = $("#new_dist2").find("option:selected").text();
				obj.dist = $("#new_dist2").val();
				obj.pfid = $("#new_pfid").val();
				obj.pfName = $("#new_pftype").find("option:selected").text();
				obj.pftype = $("#new_pftype").val();
				obj.edition = $("#new_edition2").val();
			}
			
			FM_detail_Create("fm_data_edit", typeid, obj);
		}, 280);
	}
}

function appendOverlayer(target, map) {
	$(target).append('<div id="popup" class="ol-popup"> <a href="#" id="popup-closer" class="ol-popup-closer"></a> <div id="popup-content"></div></div>');
	
	const container = document.getElementById('popup');
	const content = document.getElementById('popup-content');
	const closer = document.getElementById('popup-closer');
	
	const overlay = new ol.Overlay({
		element: container,
		autoPan: true,
		autoPanAnimation: {
			duration: 250,
		},
	});
	
	closer.onclick = function () {
		overlay.setPosition(undefined);
		closer.blur();
		return false;
	};
	
	map.addOverlay(overlay);
	
	// HOVER顯示事件
	map.on('pointermove', function (e) {
		overlay.setPosition(undefined);
		map.forEachFeatureAtPixel(
			e.pixel,
			function (f) {
				var coordinate = e.coordinate;
				content.innerHTML = 'LandCode: ' + f.landcode;
				overlay.setPosition(coordinate);
			},
			{
				layerFilter(layer) {
					return layer == map.geomextra_layer;
				},
			}
		);
	});
}

function doEdit_ListMap(fmid, typeid, type, sid) {
	$("#EditPageview").modal("show");
	setTimeout(function() {
		// 初始化編輯的地圖
		editmap = map("mmapmodalEdit", true, false);
		editmap.isinlist = true;
		editmap.savetype = type;
		editmap.typeid = typeid;
		editmap.fmid = fmid;
		editmap.sid = sid;
		
		if (!nowChangeListData) {
			alert("發生錯誤.");
			$("#EditPageview").modal("hide");
			return;
		}
		
		var targetdraw;
		for (var i = 0; i < nowChangeListData.length; i++) {
			var tartype = nowChangeListData[i].typeId == "1" ? "國有林事業區" : "保安林";
			if (fmid == nowChangeListData[i].fmId && typeid == tartype) {
				targetdraw = nowChangeListData[i];
				break;
			}
		}
		
		if (!targetdraw) {
			alert("發生錯誤.");
			$("#EditPageview").modal("hide");
			return;
		}
		
		var format = new ol.format.WKT();
		var feature = format.readFeature(targetdraw.wkt);
		feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
		
		if (feature) {
			CreateDataDraw = feature;
			CreateDataDraw.target_data = {};
			
			FM_detail_Edit("fm_data_edit", typeid, fmid);
			
			var geomTypeSelected = feature.getGeometry().getType();
			//將資料庫內要做編輯的加到編輯地圖
			if (geomTypeSelected == "Polygon") {
				editmap.geomvector_source.addFeature(feature);
				var exetend = feature.getGeometry().getExtent();
				editmap.getView().fit(exetend, { maxZoom: 18});
			}
			else if (geomTypeSelected == "MultiPolygon") {
				// MultiPolygon 情況拆分成Polygon處理
				var polygons = feature.getGeometry().getPolygons();
				
				for (var i = 0; i < polygons.length; i++) {
					var feature = new ol.Feature({
						geometry: polygons[i]
					});
					editmap.geomvector_source.addFeature(feature);
				}
				editmap.getView().fit(editmap.geomvector_source.getExtent(), { maxZoom: 18});
			}
		}
	}, 280);
}

function doRemove(fmid)//移除待異動圖資
{
	confirm("確定要移除本項異動?");
}

// 還原異動類型
function doReduction() {
	
}

function SaveEdit_fm()//執行資料更新
{
	if (confirm("確定儲存目前編輯?")) {

		te_manage_savechangemap();
		te_manage_getChangeMaps();
		
		resetModal();
		$('#EditPageview').modal('hide');
		te_manage_getChangeList1();
	}
}

function AbandonEdit()//放棄儲存
{
    if(confirm("確定放棄目前編輯?")) {
		$("#EditPageview").modal("hide");
		resetModal();
	}
}

function SelectType(type,edit_type)//選擇圖資及編輯類型
{
  function change(type1,edit_type1) {
	  if (edit_type1 == 3) {
		  $(".CreateNew").hide();
		  if (type1 == 1) {
			  $(".fm_new_type1").show();
			  $(".fm_new_type2").hide();
		  }
		  else {
			  $(".fm_new_type2").show();
			  $(".fm_new_type1").hide();
		  }
	  }
	  else {
		  $(".CreateNew").show();
		  $(".CreateNew_input").hide();  
			  if(type1 == 1) {
				  $(".fm_search_type1").show();
				  $(".fm_search_type2").hide();
				  $(".fm_type1").show();
				  $(".fm_type2").hide();
			  }
			  else {
				  $(".fm_search_type2").show();
				  $(".fm_search_type1").hide();
				  $(".fm_type2").show();
				  $(".fm_type1").hide();
			  }			  
	}
  }
  
  change(type,edit_type);
  
  $("#fm_type,#fm_edit_type").on("change",function() {
    type1 = $("#fm_type").val();
    edit_type1 = $("#fm_edit_type").val();
	
	change(type1,edit_type1);
  });
}

function resetModal() {
	$("#te_tab5_list").empty();
	$("#search_county").val("-1");
	$("#search_town").val("-1");
	$("#search_sec").val("-1");
	$("#search_number1").val("");
	$("#search_number2").val("");
	$("#search_land_code").val("");
	
	$("#te_tab6_list").empty();
	$("#search_dist").val("-1");
	$("#search_wkng").val("-1");
	$("#search_cmpt").val("-1");
	$("#search_stat").val("-1");
	
	$("#te_tab_add_list1").empty();
	$("#te_tab_add_list1").append('<tr><td>尚無資料</td></tr>');
	$("#te_tab_add_list2").empty();
	$("#te_tab_add_list2").append('<tr><td>尚無資料</td></tr>');
	$("#te_tab_add_list3").empty();
	$("#te_tab_add_list3").append('<tr><td>尚無資料</td></tr>');
}
//新增異動資料
function InsertNewChangeEvent()
{
	var formdata = new FormData();
	formdata.append("CreateUserId", Logindata.sid);
	formdata.append("Title", $("#te_data_basic_new_note").val());
	formdata.append("Deptid", $("#te_data_basic_new_unit").val());
	formdata.append("ChangeType", $("#te_type").val());
	formdata.append("ChangeTypeSub", $("#te_type_sub").val());
	formdata.append("Did", Logindata.deptid);
	
	if ($("#te_data_basic_new_note").val() == "") {
		alert("請輸入案由.");
		return;
	}
	if ($("#te_data_basic_new_unit").val() == "") {
		alert("請輸入用地機關.");
		return;
	}
	if ($("#te_type").val() == "-1") {
		alert("請選擇異動類型.");
		return;
	}
	if ($("#te_type").val() == "1" && $("#te_type_sub").val() == "-1") {
		alert("請選擇異動細項.");
		return;
	}
	
	var date = $("#te_data_basic_new_createtime").text();
	formdata.append("CreateTime", date);
	var date2 = date.split(" ");
	formdata.append("CreateTime2", date2[0]);
	
	$.each($(".hiddenupload"), function(i, obj) {
        $.each(obj.files,function(j, file){
            formdata.append('files', file);
        });
	});
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/InsertNewChangeEventInfo",
		type: "Post",
		data: formdata,
		async: false,
		processData: false,
		contentType: false,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				te_manage_tab2.uid = data.data;
			}
		}
	});
}
// 新增異動更新
function UpdateNewChangeEvent() {
	var formdata = new FormData();
	formdata.append("UpdataUid", te_manage_tab2.uid);
	formdata.append("UpdateUserId", Logindata.sid);
	formdata.append("Title", $("#te_data_basic_new_note").val());
	formdata.append("Dep", $("#te_data_basic_new_unit").val());
	formdata.append("ChangeType", $("#te_type").val());
	formdata.append("ChangeTypeSub", $("#te_type_sub").val());
	
	if ($("#te_data_basic_new_note").val() == "") {
		alert("請輸入案由.");
		return;
	}
	if ($("#te_data_basic_new_unit").val() == "") {
		alert("請輸入用地機關.");
		return;
	}
	if ($("#te_type").val() == "-1") {
		alert("請選擇異動類型.");
		return;
	}
	if ($("#te_type").val() == "1" && $("#te_type_sub").val() == "-1") {
		alert("請選擇異動細項.");
		return;
	}
	
	$.each($(".hiddenupload"), function(i, obj) {
        $.each(obj.files,function(j, file){
            formdata.append('files', file);
        });
	});
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/UpdateChangeEventInfo",
		type: "Post",
		data: formdata,
		async: false,
		processData: false,
		contentType: false,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				
			}
		}
	});
}
// 取得查詢年分
function te_manage_get_yearlist() {
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetFindYearList",
		type: "Post",
		success: function(data) {
			if (data) {
				var d = data.data;
				for (var i = 0; i < d.length; i++) {
					$("#ver_year0").append('<option value="' + d[i] + '">' + d[i] + '</option>');
				}
			}
		}
	});
}
function te_data_basic_changetype_change() {
	var v = $("#te_data_basic_changetype").val();
	if (v == "1") {
		$("#te_data_basic_changetype_sub").show();
	}
	else {
		$("#te_data_basic_changetype_sub").hide();
		$("#te_data_basic_changetype_sub").val("-1");
	}
}
// 取得異動列表
function get_te_manage_containerTable(re) {
	var year = $("#ver_year0").val();
	var uid = $("#search_id").val();
	var keyword = $("#search_title").val();
	var stat = $("#search_stat").val();
	
	var post = {};
	if (year != "-1")
		post.Year = year;
	if (uid != "")
		post.Uid = uid;
	if (keyword != "")
		post.KeyWord = keyword;
	if (stat != "-1")
		post.Status = stat;
	
	post.Did = Logindata.deptid;
	
	var check = CheckUserAccess("異動事件管理", "異動總覽", "查詢");
	if (!check) {
		alert("您沒有權限使用.")
		return;
	}
	if (!re)
		AddNewLog("異動事件管理", "異動總覽", "查詢");
	
	WaitingShow(true);
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/GetContainerTable",
	  type: "Post",
	  async: false,
	  data: post,
	  success: function(data) {
		WaitingShow(false);
		var data = data.data;
		var htmltext = "";
	    for (var i = 0; i < data.length; i++) {
			htmltext += "<tr id=\"" + data[i].sid + "\">";
			htmltext += "<td>" + data[i].uid + "</td>";
			htmltext += "<td>" + htmlEncode(data[i].title) + "</td>";
			htmltext += "</tr>";
		}
		var output = document.getElementById("te_tab1_list");
		output.innerHTML = htmltext;
		
		if (data.length == 0) {
			output.innerHTML = "無符合查詢結果";
		}
		else {
			$("#te_tab1_list").scrollTop(0);
			$("#te_tab1_list tr").on("click",function(){
				$(this).parent().children().removeClass("active");
				$(this).addClass("active");
				$(".detail_data").show();
				
				let d = $(this).attr('id');
				loadDetialData(d);           //載入基本資料
				te_manage_tab2.uid = d; //載入圖資列表資料
				$("#detail_cancel").click(); //復原編輯狀態
				te_can_edit = false;
			});
		}
	  }
	});
}
// 編輯列表
function UpdateChangeEventInfo()
{
	var formdata = new FormData();
	formdata.append("UpdateUserId", Logindata.sid);
	formdata.append("Title", $("#te_data_basic_title").val());
	formdata.append("Dep", $("#te_data_basic_deptart").val());
	formdata.append("ChangeType", $("#te_data_basic_changetype").val());
	formdata.append("ChangeTypeSub", $("#te_data_basic_changetype_sub").val());
	formdata.append("Fnumber", $("#fnumber").val());
	formdata.append("Fdate", $("#fdate").val());
	formdata.append("Snumber", $("#snumber").val());
	formdata.append("Sdate", $("#sdate").val());
	
	formdata.append("UpdataUid", nowloadDetialData);
		
	$.each($(".hiddenupload"), function(i, obj) {
        $.each(obj.files,function(j, file){
            formdata.append('files', file);
        })
	});
	
	formdata.append("deletefiles", dfilelist);
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/UpdateChangeEventInfo",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function(data) {
			WaitingShow(false);
			if (data.data == "1")
				alert("編輯成功.");
			else
				alert("編輯失敗.");
			
			loadDetialData(nowloadDetialData);
		}
	});
}
// 刪除列表
function DeleteChangeEventInfo() {
	var post = {}
	post.UpdataUid = nowloadDetialData;
	
	WaitingShow(true);
	
	setTimeout(function() {
		$.ajax({
			url: ApiRequestURL + "ChangeEvent/DeleteChangeEventInfo",
			type: "Post",
			data: post,
			async: false,
			success: function(data) {
				WaitingShow(false);
				if (data.data == "1")
					alert("刪除成功.");
				else
					alert("刪除失敗.");
			}
		});
	}, 900);
}
//審核列表
function SentChangeEventInfo() {
	var post = {}
	post.UpdataUid = nowloadDetialData;
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/SentChangeEventInfo",
		type: "Post",
		data: post,
		success: function(data) {
		WaitingShow(false);
			if (data.data == "1")
				alert("送審成功.");
			else
				alert("送審失敗.");
			
			loadDetialData(nowloadDetialData);
		}
	});
}
//初始化林管去選項
var WkngList = [];
var PfidList = [];
var PfTypeList = [];
function searchlistinit() {
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetDistList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				for (var i = 0; i < d.length; i++) {
					$("#search_dist1").append('<option value="' + d[i].distId + '">' + d[i].distName + '</option>');
					$("#search_dist2").append('<option value="' + d[i].distId + '">' + d[i].distName + '</option>');
					$("#new_dist1").append('<option value="' + d[i].distId + '">' + d[i].distName + '</option>');
					$("#new_dist2").append('<option value="' + d[i].distId + '">' + d[i].distName + '</option>');
				}
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetWkngList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				WkngList = data.data;
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetPfidList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				PfidList = data.data;
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetPfTypeList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				PfTypeList = d;
				for (var i = 0; i < d.length; i++) {
					$("#new_pftype").append('<option value="' + d[i].pid + '">' + d[i].pfTypeName + '</option>');
				}
			}
		}
	});
}
var ChangeForestData = [];
function GetChangeForestData(IsSerarch) {
	var post = {}

	if (IsSerarch) {
		var dist = $("#search_dist1").val();
		var wkng = $("#search_wkng1").val();
		var warning = $("#search_warning1").val();
		
		if (dist != "-1") post.Dist = dist;
		if (wkng != "-1") post.Wid = wkng;
		if (warning != "-1") post.Revision = warning;
	}
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeForestData",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				$("#fm_search_list").empty();
				var d = data.data;
				ChangeForestData = d;
				for (var i = 0; i < d.length; i++) {
					var text = '<tr id="' + d[i].sid + '" onclick="ChangeForestDataClick(this);">';
					text += '<td>' + d[i].distName + '</td>';
					text += '<td>' + d[i].weildName + '</td>';
					text += '<td>' + d[i].cmpt + '林班</td>';
					text += '</tr>';
					$("#fm_search_list").append(text);
				}
			}
		}
	});
}
var ChangeProtectionData = [];
function GetChangeProtectionData(IsSerarch) {
	var post = {};

	if (IsSerarch) {
		var dist = $("#search_dist2").val();
		var pfid = $("#search_pfid").val();
		var warning = $("#search_warning2").val();
		
		if (dist != "-1") post.Dist = dist;
		if (pfid != "-1") post.Pfid = pfid;
		if (warning != "-1") post.Revision = warning;
	}
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeProtectionData",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				$("#fm_search_list2").empty();
				
				var d = data.data;
				ChangeProtectionData = d;
				for (var i = 0; i < d.length; i++) {
					var text = '<tr id="' + d[i].sid + '" onclick="ChangeProtectionDataClick(this);">';
					text += '<td>' + d[i].distName + '</td>';
					text += '<td>' + d[i].pfName + '</td>';
					text += '<td>' + d[i].pfid + '林班</td>';
					text += '</tr>';
					$("#fm_search_list2").append(text);
				}
			}
		}
	});
}
var CreateDataDraw = null;
function ChangeForestDataClick(that) {
	
	if (CreateDataDraw) {
		insertmap.geomvector_source.clear();
		CreateDataDraw = null;
	}
	
	$("#fm_search_list tr").removeClass("active");
	$(that).addClass("active");
	
	var wkt = "";
	var target = null;
	for (var i = 0; i < ChangeForestData.length; i++) {
		if (ChangeForestData[i].sid == that.id) {
			wkt = ChangeForestData[i].wkt;
			target = ChangeForestData[i];
			break;
		}
	}
	
	target.typeid = "國有林事業區";
	var format = new ol.format.WKT();
	var feature = format.readFeature(wkt);
	feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
	feature.target_data = target;
	
	insertmap.geomvector_source.addFeature(feature);
	
	var exetend = feature.getGeometry().getExtent();
	insertmap.getView().fit(exetend, { maxZoom: 18});
	
	CreateDataDraw = feature;
}
function ChangeProtectionDataClick(that) {
	$("#fm_search_list2 tr").removeClass("active");
	$(that).addClass("active");
	
	if (CreateDataDraw) {
		insertmap.geomvector_source.clear();
		CreateDataDraw = null;
	}
	
	$("#fm_search_list tr").removeClass("active");
	$(that).addClass("active");
	
	var target = null;
	var wkt = "";
	for (var i = 0; i < ChangeProtectionData.length; i++) {
		if (ChangeProtectionData[i].sid == that.id) {
			wkt = ChangeProtectionData[i].wkt;
			target = ChangeProtectionData[i];
			break;
		}
	}
	
	target.typeid = "保安林";
	var format = new ol.format.WKT();
	var feature = format.readFeature(wkt);
	feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
	feature.target_data = target;
	
	insertmap.geomvector_source.addFeature(feature);
	
	var exetend = feature.getGeometry().getExtent();
	insertmap.getView().fit(exetend, { maxZoom: 18});
	
	CreateDataDraw = feature;
}
function dist1change() {
	$("#search_wkng1").empty();
	$("#search_wkng1").append('<option value="-1">不限</option>');
	var target = $("#search_dist1").val();
	for (var i = 0; i < WkngList.length; i++) {
		if (target == WkngList[i].distId)
			$("#search_wkng1").append('<option value="' + WkngList[i].wid + '">' + WkngList[i].wkngName + '</option>');
	}
}
function dist2change() {
	$("#search_pfid").empty();
	$("#search_pfid").append('<option value="-1">不限</option>');
	var target = $("#search_dist2").val();
	for (var i = 0; i < PfidList.length; i++) {
		if (target == PfidList[i].distId)
			$("#search_pfid").append('<option value="' + PfidList[i].pfid + '">' + PfidList[i].pfid + '</option>');
	}
}
// 讀取檔案(SHP/KML)
function readimportfile(file, target, edituse) {
	var ShpReg = /\.(shp)$/i;
	var KmlReg = /\.(kml)$/i;
	
	var FileTag = true;
	var fileType = file.name;
	
	if (ShpReg.test(fileType)) FileTag = false;
	if (KmlReg.test(fileType)) FileTag = false;
	
	if (FileTag) {
		alert("檔案格式有誤!只接受 shp,kml 格式");
		return false;
	}
	
	var filesExtent = file.name.split(".").pop();

	var reader = new FileReader();
	if (typeof FileReader === "undefined") {
		alert("此瀏覽器不支援此功能.");
		file.setAttribute("disabled", "disabled");
		return false;
	}
	
	if (filesExtent === "shp")
		reader.readAsArrayBuffer(file);
	else reader.readAsText(file);
	
	reader.onload = function(f) {
		var parserdata;
		var inputjson;
		var parser;
		var tempfeature;
		
		switch (filesExtent) {
			case "kml":
				parser = new DOMParser();
				parserdata = parser.parseFromString(this.result, "text/xml");
				inputjson = toGeoJSON.kml(parserdata);
				break;
			case "shp":
				var tempresult = [];
				inputjson = {
					type: "FeatureCollection",
					features: []
				};
				tempfeature = shp.parseShp(this.result);
				for (let i = 0; i < tempfeature.length; i++) {
					tempresult.push({
						type: "Feature",
						geometry: {
							type: tempfeature[i].type,
							coordinates: tempfeature[i].coordinates
						}
					});
				}
				inputjson.features = tempresult;
				break;
			default:
				alert("上傳類型" + filesExtent + "無支援");
				return false;
		};
		var json = inputjson;
		var format = new ol.format.GeoJSON();
		
		// 預設匯入都是用TWD97座標處理
		var feature = format.readFeatures(json, {
			dataProjection: "EPSG:3826",
			featureProjection: "EPSG:3857"
		});
		
		if (!edituse) //正常使用
			target.addFeatures(feature);
		else //需要分析MultiPolygon的時候
		{
			var tf = feature[0];
			var geomTypeSelected = tf.getGeometry().getType();
			//將資料庫內要做編輯的加到編輯地圖
			if (geomTypeSelected == "Polygon") {
				target.addFeature(tf);
				var exetend = tf.getGeometry().getExtent();
				editmap.getView().fit(exetend, { maxZoom: 18});
			}
			else if (geomTypeSelected == "MultiPolygon") {
				// MultiPolygon 情況拆分成Polygon處理
				var polygons = tf.getGeometry().getPolygons();
				
				for (var i = 0; i < polygons.length; i++) {
					var f = new ol.Feature({
					  geometry: polygons[i]
					});
					target.addFeature(f);
				}
				editmap.getView().fit(target.getExtent(), { maxZoom: 18});
			}
		}
		$("#import_reference_features").val("");
		$("#import_replace_features").val("");
	};
}
// 匯入參考圖資
var ReferenceIdx = 1;
var ReferenceLayers = [];
function ImportReferenceFeatures() {
	var files = $(".hiddenupload");
	
	if (files.length == 0) return;
	
	for (var i = 0; i < files.length; i++) {
		var file = files[i].files[0];
	
		var vsource = new ol.source.Vector({
			features: []
		});
		var vlayer = new ol.layer.Vector({
			source: vsource,
			style: new ol.style.Style({
				fill: new ol.style.Fill({
					color: "rgba(255, 255, 255, 0.5)",
				}),
				stroke: new ol.style.Stroke({
					color: getRandomColor(),
					width: 2,
				}),
			}),
		});
		
		editmap.group_importCollection.push(vlayer);
		readimportfile(file, vsource);
		
		ReferenceLayers.push(vlayer);
		vlayer.ReferenceIdx = ReferenceIdx;
		
		var tmp = '<tr id="ReferenceLayer_' + ReferenceIdx + '" onclick="ReferenceLayerZoom(' + ReferenceIdx + ')">';
		tmp += '<td>' + file.name + '</td>';
		tmp += '<td style="width: 44px;"><img src="image/button_image/eye_show.svg" style="cursor: pointer;" onclick="ReferenceLayerVisible(' + ReferenceIdx + ', this)" /></td>';
		tmp += '<td style="width: 55px;"><label style="color: red; cursor: pointer;" onclick="ReferenceLayerDelete(' + ReferenceIdx + ', this)">刪除</label></td>';
		tmp += "</tr>";

		if (te_manage_tab2.te_tab7_list_count == 0) {
			$("#te_tab_add_list3").empty();
		}

		te_manage_tab2.te_tab7_list_count++;
		
		$("#te_tab_add_list3").append(tmp);
	}

	$("#te_data_basic_hidden_list").empty();
	$("#te_data_basic_file_list").empty();
	$("#te_data_basic_new_file2").val('');

	filelist = new Array();
}
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
	color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// 取得目標layers
function GetReferenceLayer(idx) {
	if (!ReferenceLayers) return null;
	
	for (var i = 0; i < ReferenceLayers.length; i++) {
		if (ReferenceLayers[i].ReferenceIdx == idx)
			return ReferenceLayers[i];
	}
	return null;
}
// 顯不顯示參考圖層
function ReferenceLayerVisible(idx, that) {
	var target = GetReferenceLayer(idx);
	var isrc = that.src.split('/');
	var srcn = isrc[isrc.length - 1];
	
	te_tab_fixed = false;
	
	if (srcn == "eye_show.svg")
	{
		that.src = "image/button_image/eye_hide.svg";
		target.setVisible(false);
	}
	else
	{
		that.src = "image/button_image/eye_show.svg";
		target.setVisible(true);
	}
}
// 刪除參考圖層
function ReferenceLayerDelete(idx) {
	var n = -1;
	for (var i = 0; i < ReferenceLayers.length; i++) {
		if (ReferenceLayers[i].ReferenceIdx == idx) {
			n = i;
			break;
		}
	}
	editmap.group_import.getLayers().array_.splice(n, 1);
	ReferenceLayers.splice(n, 1);
	$("#ReferenceLayer_" + idx).remove();
	editmap.group_import.setVisible(false);
	editmap.group_import.setVisible(true);
	te_manage_tab2.te_tab7_list_count--;
	if (te_manage_tab2.te_tab7_list_count == 0) {
		$("#te_tab_add_list3").append('<tr><td>尚無資料</td></tr>');
	}
}
// 點選縮放至該圖層
function ReferenceLayerZoom(idx) {
	if (te_tab_fixed == false) {
		te_tab_fixed = true;
		return;
	}
	
	var target = GetReferenceLayer(idx);
	editmap.getView().fit(target.getSource().getExtent(), { maxZoom: 18});
}
// 匯入取代圖資
function ImportReplaceFeatures(that) {
	if (that.files.length == 0) return;
	
	var file = that.files[0];
	
	editmap.geomvector_source.clear();
	readimportfile(file, editmap.geomvector_source, true);
}
// 匯出目前圖資
function ExportNowFeature(type) {
	if (!editmap) return;
	
	//判斷目前的圖形個數是否要轉成MultiPolygon
	var features = editmap.geomvector_source.getFeatures();
	var format = new ol.format.WKT();
	var wkt = "";
	if (features.length == 1) // 單一Polygon
	{
		features[0].getGeometry().transform("EPSG:3857", "EPSG:3826");
		// 讀取WKT
		wkt = format.writeFeature(features[0]);
		features[0].getGeometry().transform("EPSG:3826", "EPSG:3857");
	}
	else if (features.length > 1) //多個Polygon需組成MultiPolygon
	{
		var mploygons = new ol.geom.MultiPolygon([]);
		for (var i = 0; i < features.length; i++) {
			var polygon = features[i].getGeometry().transform("EPSG:3857", "EPSG:3826");
			mploygons.appendPolygon(polygon);
		}
		
		wkt = format.writeGeometry(mploygons);
		
		for (var i = 0; i < features.length; i++) {
			var polygon = features[i].getGeometry().transform("EPSG:3826", "EPSG:3857");
			mploygons.appendPolygon(polygon);
		}
	}
	else return;
	
	if (type == "SHP") {
		var post = {};
		post.wkt = wkt;
		WaitingShow(true);
		$.ajax({
			url: ApiRequestURL + "ChangeEvent/ExportTargetShpFile",
			type: "Post",
			data: post,
			success: function(data) {
				WaitingShow(false);
				if (data.data && data.data != 'NoFeatures') {
					var guid = data.data;
					var a = document.createElement("a");
					a.href = DonwLoadExportURL + guid + ".zip";
					a.click();
					document.remove(a);
				}
				else {
					alert('沒有可以匯出的圖徵');
				}
			}
		});
	}
}
//重置事件
function ResetChangeFeatureEvent(type) {
	$(".image_button").removeClass("active");
	if (type != "add" && editmap.addmodify) {
		editmap.addmodify.setActive(false);
		editmap.isadd = false;
	}
	if (type != "edit" && editmap.editmodify) {
		editmap.editmodify.setActive(false);
		editmap.isedit = false;
	}
	if (type != "delete" && editmap.delselect) {
		editmap.delselect.getFeatures().clear();
		editmap.delselect.setActive(false);
		editmap.isdel = false;
		$("#DelChangeFeatureEventBtn").hide();
	}
	if (type != "hollow" && editmap.holemodify) {
		editmap.holemodify.setActive(false);
		editmap.ishole = false;
	}
}
//新增異動圖徵
function AddChangeFeature(that) {
	if (!editmap) return;
	ResetChangeFeatureEvent("add");
	if (!editmap.addmodify) {
		var polygonInteraction = new ol.interaction.Draw({
			type: "Polygon",
			source: editmap.geomvector_source,
		});
		polygonInteraction.setActive(true);
		polygonInteraction.on("drawend", onDrawend);
		editmap.setTracingEvent(polygonInteraction, "draw");
		editmap.addInteraction(polygonInteraction);
		editmap.addmodify = polygonInteraction;
		editmap.isadd = true;
		$(that).addClass("active");
	} else if (!editmap.isadd) {
		editmap.addmodify.setActive(true);
		editmap.addmodify.snapInteraction.setActive(true);
		editmap.isadd = true;
		$(that).addClass("active");
	} else {
		editmap.addmodify.setActive(false);
		editmap.addmodify.snapInteraction.setActive(false);
		editmap.isadd = false;
	}
	
	function onDrawend(e) {
		var reader = new jsts.io.WKTReader();
		var format = new ol.format.WKT();
		var wkt1 = format.writeFeature(e.feature, {
			dataProjection: "EPSG:3857",
			featureProjection: "EPSG:3857"
		});
		
		var features = editmap.geomvector_source.getFeatures();
		var wkt2 = "";
		if (features.length == 1) // 單一Polygon
		{
			// 讀取WKT
			wkt2 = format.writeFeature(features[0], {
				dataProjection: "EPSG:3857",
				featureProjection: "EPSG:3857"
			});
		}
		else if (features.length > 1) //多個Polygon需組成MultiPolygon
		{
			var mploygons = new ol.geom.MultiPolygon([]);
			for (var i = 0; i < features.length; i++) {
				var polygon = features[i].getGeometry();
				mploygons.appendPolygon(polygon);
			}
			
			wkt2 = format.writeGeometry(mploygons, {
				dataProjection: "EPSG:3857",
				featureProjection: "EPSG:3857"
			});
		}
		
		if (wkt1 == "" || wkt2 == "") return;
		
		var a = reader.read(wkt1);
		var b = reader.read(wkt2);
		
		a = jsts_validate(a);
		b = jsts_validate(b);
		
		var union = b.union(a);

		var parser = new jsts.io.OL3Parser();
		union = parser.write(union);	
		var unionOutput = new ol.Feature(union);
		
		setTimeout(function() {
			editmap.geomvector_source.clear();
			var polygons = unionOutput.getGeometry().getPolygons();
			for (var i = 0; i < polygons.length; i++) {
				var f = new ol.Feature({
				  geometry: polygons[i]
				});
				editmap.geomvector_source.addFeature(f);
			}
		}, 100);
	}
}
//編輯異動圖徵
function EditChangeFeature(that) {
	if (!editmap) return;
	ResetChangeFeatureEvent("edit");
	if (!editmap.editmodify) {
		var modify = new ol.interaction.Modify({ source: editmap.geomvector_source });
		editmap.addInteraction(modify);
		editmap.editmodify = modify;
		editmap.isedit = true;
		$(that).addClass("active");
	} else if (!editmap.isedit) {
		editmap.editmodify.setActive(true);
		editmap.isedit = true;
		$(that).addClass("active");
	} else {
		editmap.editmodify.setActive(false);
		editmap.isedit = false;
	}
}
//刪除異動圖徵
function DeleteChangeFeature(that) {
	if (!editmap) return;
	ResetChangeFeatureEvent("delete");
	if (!editmap.delselect) {
		var modify = new ol.interaction.Select({
			condition: ol.events.condition.click,
		});
		editmap.addInteraction(modify);
		editmap.delselect = modify;
		editmap.isdel = true;
		$(that).addClass("active");
		$("#DelChangeFeatureEventBtn").show();
	} else if (!editmap.isdel) {
		editmap.delselect.setActive(true);
		editmap.isdel = true;
		$(that).addClass("active");
		$("#DelChangeFeatureEventBtn").show();
	} else {
		editmap.delselect.getFeatures().clear();
		editmap.isdel = false;
		$("#DelChangeFeatureEventBtn").hide();
	}
}
function DeleteSelectFeature() {
	if (!editmap || !editmap.delselect) return;
	
	var target = editmap.delselect.getFeatures();
	if (target.array_.length == 1) {
		editmap.geomvector_source.removeFeature(target.array_[0]);
	}
}
//挖空異動圖徵
function HollowChangeFeature(that) {
	if (!editmap) return;
	ResetChangeFeatureEvent("hollow");
	if (!editmap.holemodify) {
		var polygonInteraction = new ol.interaction.Draw({
			type: "Polygon",
			source: editmap.geomvector_source,
		});
		var snapInteraction = new ol.interaction.Snap({ source: editmap.geomvector_source });
		polygonInteraction.setActive(true);
		polygonInteraction.on("drawend", onDrawend);
		editmap.setTracingEvent(polygonInteraction, "draw");
		editmap.addInteraction(polygonInteraction);
		editmap.addInteraction(snapInteraction);
		editmap.HollowsnapInteraction = snapInteraction;
		editmap.holemodify = polygonInteraction;
		editmap.ishole = true;
		$(that).addClass("active");
	} else if (!editmap.ishole) {
		editmap.holemodify.setActive(true);
		editmap.holemodify.snapInteraction.setActive(true);
		editmap.HollowsnapInteraction.setActive(true);
		editmap.ishole = true;
		$(that).addClass("active");
	} else {
		editmap.holemodify.setActive(false);
		editmap.holemodify.snapInteraction.setActive(false);
		editmap.HollowsnapInteraction.setActive(false);
		editmap.ishole = false;
	}
	
	function onDrawend(e) {
		var reader = new jsts.io.WKTReader();
		var format = new ol.format.WKT();
		var wkt1 = format.writeFeature(e.feature, {
			dataProjection: "EPSG:3857",
			featureProjection: "EPSG:3857"
		});
		
		var features = editmap.geomvector_source.getFeatures();
		var wkt2 = "";
		if (features.length == 1) // 單一Polygon
		{
			// 讀取WKT
			wkt2 = format.writeFeature(features[0], {
				dataProjection: "EPSG:3857",
				featureProjection: "EPSG:3857"
			});
		}
		else if (features.length > 1) //多個Polygon需組成MultiPolygon
		{
			var mploygons = new ol.geom.MultiPolygon([]);
			for (var i = 0; i < features.length; i++) {
				var polygon = features[i].getGeometry();
				mploygons.appendPolygon(polygon);
			}
			
			wkt2 = format.writeGeometry(mploygons, {
				dataProjection: "EPSG:3857",
				featureProjection: "EPSG:3857"
			});
		}
		
		if (wkt1 == "" || wkt2 == "") return;
		
		var a = reader.read(wkt1);
		var b = reader.read(wkt2);
		
		a = jsts_validate(a);
		b = jsts_validate(b);
		
		var difference = b.difference(a);

		var parser = new jsts.io.OL3Parser();
		difference = parser.write(difference);	
		var Output = new ol.Feature(difference);
		
		setTimeout(function() {
			editmap.geomvector_source.clear();
			var geom = Output.getGeometry();
			if (geom.getPolygons) {
				var polygons = geom.getPolygons();
				for (var i = 0; i < polygons.length; i++) {
					var f = new ol.Feature({
					  geometry: polygons[i]
					});
					editmap.geomvector_source.addFeature(f);
				}
			}
			else {
				var f = new ol.Feature({
				  geometry: geom
				});
				editmap.geomvector_source.addFeature(f);
			}
		}, 100);
	}
}
// 儲存結果
function SaveChangeMap() {
	//判斷目前的圖形個數是否要轉成MultiPolygon
	var features = editmap.geomvector_source.getFeatures();
	var format = new ol.format.WKT();
	var wkt = "";
	if (features.length == 1) // 單一Polygon
	{
		features[0].getGeometry().transform("EPSG:3857", "EPSG:3826");
		// 讀取WKT
		wkt = format.writeFeature(features[0]);
	}
	else if (features.length > 1) //多個Polygon需組成MultiPolygon
	{
		var mploygons = new ol.geom.MultiPolygon([]);
		for (var i = 0; i < features.length; i++) {
			var polygon = features[i].getGeometry().transform("EPSG:3857", "EPSG:3826");
			mploygons.appendPolygon(polygon);
		}
		
		wkt = format.writeGeometry(mploygons);
	}
	else return;
	
	var targetdata = CreateDataDraw.target_data;
	var post = {};
	var type = editmap.typeid == "國有林事業區" ? "1" : "2";
	post.TypeId = type;
	post.Wkt = wkt;
	if (type == "1") {
		post.Wkng = targetdata.wkng;
		post.Cmpt = $("#CMPT").val();
		post.Dist = targetdata.dist;
		post.Area_ha = $("#AREA_HA").val();
		post.Edition = $("#EDITION").val();
		post.FmtId = nowloadDetialData;
		post.FmId = editmap.fmid;
	}
	else if (type == "2") {
		post.Pfid = $("#PF_ID").text();
		post.Pftype = $("#PFTYPE").val();
		post.Dist = targetdata.dist;
		post.Area_ha = $("#AREA_HA").val();
		post.Edition = $("#EDITION").val();
		post.FmtId = nowloadDetialData;
		post.FmId = editmap.fmid;
	}
	
	var isinlist = editmap.isinlist; //判斷已在異動列表 或是 新增異動
	if (!isinlist) {
		var isedit = editmap.isedit; //判斷是編輯還是新增
		if (!isedit) {
			$.ajax({
				url: ApiRequestURL + "ChangeEvent/InsertNewChangeMaps",
				type: "Post",
				data: post,
				success: function(data) {
					if (data.data && data.data == "Success") {
						alert("新增成功.");
					}
					else {
						alert("新增失敗.");
					}
					RefreshNewChangeMaps(nowloadDetialData);
				}
			});
		}
		else {
			$.ajax({
				url: ApiRequestURL + "ChangeEvent/EditNewChangeMaps",
				type: "Post",
				data: post,
				success: function(data) {
					if (data.data && data.data == "Success") {
						alert("編輯成功.");
					}
					else {
						alert("編輯失敗.");
					}
					RefreshNewChangeMaps(nowloadDetialData);
				}
			});			
		}
	}
	else {
		// 已在列表中 更新用
		post.Sid = editmap.sid;
		$.ajax({
			url: ApiRequestURL + "ChangeEvent/UpdateNewChangeMaps",
			type: "Post",
			data: post,
			success: function(data) {
				if (data.data && data.data == "Success") {
					alert("更新成功.");
				}
				else {
					alert("更新失敗.");
				}
				RefreshNewChangeMaps(nowloadDetialData);
			}
		});
	}
	
	resetModal();
}
// 新增異動圖徵類型
var te_edittype = $("#fm_edit_type").val();
function te_edittype_change() {
	var edittype = $("#fm_edit_type").val();
	te_edittype = edittype;
}
function te_new_dist1_change() {
	$("#new_wkng1").empty();
	$("#new_wkng1").append('<option value="-1">請選擇</option>');
	var target = $("#new_dist1").val();
	for (var i = 0; i < WkngList.length; i++) {
		if (target == WkngList[i].distId)
			$("#new_wkng1").append('<option value="' + WkngList[i].wid + '">' + WkngList[i].wkngName + '</option>');
	}
}
function doReduction(fmid) {
	var check = confirm('確定要移除該異動資料嗎?');
	
	if (check) {
		var post = {};
		post.SId = fmid;
		$.ajax({
			url: ApiRequestURL + "ChangeEvent/ResetNewChangeMaps",
			type: "Post",
			data: post,
			success: function(data) {
				if (data.data && data.data == "Success") {
					alert("移除成功.");
				}
				else {
					alert("移除失敗.");
				}
				RefreshNewChangeMaps(nowloadDetialData);
			}
		});		
	}
}
//審核取得異動列表
function get_te_tab3_manage() {
	var year = $("#ver_year0").val();
	var uid = $("#search_id").val();
	var keyword = $("#search_title").val();
	var stat = $("#search_stat").val();
	
	var post = {};
	if (year != "-1")
		post.Year = year;
	if (uid != "")
		post.Uid = uid;
	if (keyword != "")
		post.KeyWord = keyword;
	if (stat != "-1")
		post.Status = stat;
	
	post.Did = Logindata.deptid;
	
	$(".detail_data").hide();
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetContainerTable",
		type: "Post",
		async: false,
		data: post,
		success: function(data) {
			WaitingShow(false);
			var data = data.data;
			var htmltext = "";
			for (var i = 0; i < data.length; i++) {
				htmltext += "<tr id=\"" + data[i].sid + "\">";
				htmltext += "<td>" + formatDateTime_Date(data[i].updateTime) + "</td>";
				htmltext += "<td>" + (data[i].deptName == "" ? "其他" : htmlEncode(data[i].deptName)) + "</td>";
				htmltext += "<td>" + htmlEncode(data[i].title) + "</td>";
				htmltext += "</tr>";
			}
			
			$("#te_tab2_list").empty();
			$("#te_tab2_list").append(htmltext);
			
			if (data.length == 0) {
				$("#te_tab2_list").append("無符合查詢結果");
			}
			else {
				$("#te_tab2_list tr").on("click",function() {
					$(this).parent().children().removeClass("active");
					$(this).addClass("active");
					$(".detail_data").show();
					
					let d = $(this).attr('id');
					loadDetialData(d, true);     //載入基本資料
					loadListData(d, true);       //載入圖資列表資料
					
					setTimeout(function() {
						$(".manage_bt_area").show();
					}, 300);
				});

			}
		}
	});
}
// 通過異動
function te_tab3_submit_apply() {
	let c = confirm("是否通過本異動事件?");
	if (!c) {
		return;
	}
	
	var post = {};
	post.Sid = nowloadDetialData;
	post.Userid = Logindata.sid;
	
	post.Fnumber = $("#fnumber").val();
	post.Fdate = $("#fdate").val();
	post.Snumber = $("#snumber").val();
	post.Sdate = $("#sdate").val();
	
	post.Note = $("#note").val();
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/SubmitApply",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data && data.data == "Success") {
				alert("通過異動.");
				get_te_tab3_manage();
				$(".detail_data").hide();
			}
			else {
				alert("通過異動失敗.");
			}
		}
	});
}
// 返還修正
function te_tab3_reject_apply() {
	let c = confirm("是否返還修正?");
	if (!c) {
		return;
	}
	
	var post = {};
	post.Sid = nowloadDetialData;
	post.Userid = Logindata.sid;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/RejectApply",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data && data.data == "Success") {
				alert("退回修正.");
				get_te_tab3_manage();
				$(".detail_data").hide();
			}
			else {
				alert("退回修正失敗.");
			}
		}
	});
}
// 異動查詢 START
function te_search_list_gosearch_1() {
	$("#query_1").show();
	$("#query_1").empty();
	$("#query_2").hide();
	$("#query_1").load("./views/temp/te_list_search.html");

	var year = $("#search_year").val();
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var sec = $("#search_sec").val();
	var landno1 = $("#search_number1").val();
	var landno2 = $("#search_number2").val();
	var landcode = $("#search_land_code").val();
	var dep = $("#search_dep").val();
	var changetype = $("#search_changetype").val();
	var changetypesub = $("#search_changetypesub").val();

	var post = {};
	
	if (year != -1)
		post.Year = year;
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
	if (dep != "")
		post.Dep = dep
	if (changetype != -1)
		post.ChangeType = changetype;
	if (changetypesub != -1)
		post.ChangeTypeSub = changetypesub;

	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeSearchList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				te_manage_tab4.nowsearchtype = 1;
				
				$('#sys_user_page').pagination({
					dataSource: d,
					pageSize: 10,
					pageNumber: 1,
					callback: function(dd, pagination) {
						$("#te_search_result").empty();
						
						for (var i = 0; i < dd.length; i++) {
							var tmp = '<tr onclick="te_searchlist_show(' + dd[i].containerId + ');">';
							tmp += '<td>' + (i + 1) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].year) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].dep) + '</td>';
							tmp += '<td>' + htmlEncode(te_get_changetypeStr(dd[i].changeType, dd[i].changeTypeSub)) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].farmNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].forestNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].county) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].town) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landCode) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].areaHa) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].distName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].wkngName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].cmpt) + '</td>';
							tmp += '</tr>';

							$("#te_search_result").append(tmp);
						}
					}
				});
			}
		}
	});
}
function te_search_list_gosearch_2() {
	$("#query_1").show();
	$("#query_1").empty();
	$("#query_2").hide();
	$("#query_1").load("./views/temp/te_list_search.html");
	
	var year = $("#search_year2").val();
	var dist = $("#search_dist option:selected").text();
	var wkng = $("#search_wkng option:selected").text();
	var cmpt = $("#search_cmpt").val();
	var state = $("#search_state").val();
	var dep = $("#search_dep2").val();
	var changetype = $("#search_changetype2").val();
	var changetypesub = $("#search_changetypesub2").val();

	var post = {};
	
	if (year != -1)
		post.Year = year;
	if (dist != "請選擇")
		post.Dist = dist;
	if (wkng != "請選擇")
		post.Wkng = wkng;
	if (cmpt != -1)
		post.Cmpt = Cmpt;
	if (state != "")
		post.State = state;
	if (dep != "")
		post.Dep = dep
	if (changetype != -1)
		post.ChangeType = changetype;
	if (changetypesub != -1)
		post.ChangeTypeSub = changetypesub;

	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeSearchList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				te_manage_tab4.nowsearchtype = 2;

				$('#sys_user_page').pagination({
					dataSource: d,
					pageSize: 10,
					pageNumber: 1,
					callback: function(dd, pagination) {
						$("#te_search_result").empty();
						
						for (var i = 0; i < dd.length; i++) {
							var tmp = '<tr onclick="te_searchlist_show(' + dd[i].containerId + ');">';
							tmp += '<td>' + (i + 1) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].year) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].dep) + '</td>';
							tmp += '<td>' + htmlEncode(te_get_changetypeStr(dd[i].changeType, dd[i].changeTypeSub)) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].farmNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].forestNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].county) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].town) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landCode) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].areaHa) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].distName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].wkngName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].cmpt) + '</td>';
							tmp += '</tr>';

							$("#te_search_result").append(tmp);
						}
					}
				});
			}
		}
	});
}
function te_search_list_gosearch_3() {
	$("#query_1").show();
	$("#query_1").empty();
	$("#query_2").hide();
	$("#query_1").load("./views/temp/te_list_search.html");
	
	var state = $("#search_state3").val();
	var uid = $("#search_uid3").text();
	var unit = $("#search_unit3").val();
	var startdate = $("#search_start3").text();
	var enddate = $("#search_end3").text();
	var land = $("#search_land3").text();
	var changetype = $("#search_changetype3").val();
	var changetypesub = $("#search_changetypesub3").val();
	
	var post = {};
	
	if (state != -1)
		post.State = state;
	if (uid != "")
		post.Uid = uid;
	if (unit != -1)
		post.Unit = unit;
	if (startdate != "")
		post.Startdate = startdate;
	if (enddate != "")
		post.Enddate = enddate;
	if (land != "")
		post.Land = land;
	if (changetype != -1)
		post.ChangeType = changetype;
	if (changetypesub != -1)
		post.ChangeTypeSub = changetypesub;

	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeSearchList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				te_manage_tab4.nowsearchtype = 3;

				$('#sys_user_page').pagination({
					dataSource: d,
					pageSize: 10,
					pageNumber: 1,
					callback: function(dd, pagination) {
						$("#te_search_result").empty();
						
						for (var i = 0; i < dd.length; i++) {
							var tmp = '<tr onclick="te_searchlist_show(' + dd[i].containerId + ');">';
							tmp += '<td>' + (i + 1) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].year) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].dep) + '</td>';
							tmp += '<td>' + htmlEncode(te_get_changetypeStr(dd[i].changeType, dd[i].changeTypeSub)) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].farmNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].forestNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].county) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].town) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landNo) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].landCode) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].areaHa) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].distName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].wkngName) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].cmpt) + '</td>';
							tmp += '</tr>';

							$("#te_search_result").append(tmp);
						}
					}
				});
			}
		}
	});
}
function te_get_changetypeStr(t, t_sub) {
	var str = '';
	
	if (t == 1)
		str += '森林法第8條撥用';
	else if (t == 2)
		str += '增劃編原住民保留地';
	else if (t == 3)
		str += '專案計畫移出';
	else if (t == 4)
		str += '事業區地籍釐整';

	if (t_sub == 1)
		str += '-公共設施';
	else if (t_sub == 2)
		str += '-國防';
	else if (t_sub == 3)
		str += '-交通';
	else if (t_sub == 4)
		str += '-水利';
	else if (t_sub == 5)
		str += '-公用事業';
	else if (t_sub == 6)
		str += '-國家公園';
	else if (t_sub == 7)
		str += '-風景特定區';

	return str;
}
function te_searchlist_show(d) {
	$("#query_1").hide();
	$("#query_2").show();
	
	loadDetialData(d);     //載入基本資料
}
function te_searchlist_hide() {
	$("#query_1").show();
	$("#query_2").hide();
}
var te_manage_tab4 = {};
function te_manage_tab4_init() {
	te_manage_tab4 = {};
	
	te_manage_tab4_get_yearlist();
	te_manage_tab4_get_CountyList();
	
	te_manage_tab4_get_DistList();
	te_manage_tab4_get_Wkng();
	
	$('#search_start3,#search_end3').datepicker({
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
function te_manage_tab4_get_yearlist() {
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetFindYearList",
		type: "Post",
		success: function(data) {
			if (data) {
				var d = data.data;
				for (var i = 0; i < d.length; i++) {
					$("#search_year").append('<option value="' + d[i] + '">' + d[i] + '</option>');
					$("#search_year2").append('<option value="' + d[i] + '">' + d[i] + '</option>');
				}
			}
		}
	});
}
function te_manage_tab4_get_CountyList() {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetCountyList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				for (var i = 0; i < d.length; i++) {
					$("#search_county").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
				}
			}
		}
	});
}
function te_manage_tab4_get_TownList() {
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
					$("#search_town").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
				}
				$("#search_sec").empty();
				$("#search_sec").append('<option selected value="-1">請選擇</option>');
			}
		}
	});
}
function te_manage_tab4_get_LandList() {
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
					$("#search_sec").append('<option value="' + d[i].sec_code + '">' + landstr + '</option>');
				}
			}
		}
	});
}
function te_manage_tab4_get_DistList() {
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
}
function te_manage_tab4_get_Wkng() {
	// 事業區列表
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetWkngList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				te_manage_tab4.WkngList = data.data;
			}
		}
	});
}
//事業林區查詢條件變動
function te_manage_tab4_dist_change() {
	var list = te_manage_tab4.WkngList;
	$("#search_wkng").empty();
	$("#search_wkng").append('<option value="-1">請選擇</option>');
	var target = $("#search_dist").val();
	for (var i = 0; i < list.length; i++) {
		if (target == list[i].distId)
			$("#search_wkng").append('<option value="' + list[i].wid + '">' + list[i].wkngName + '</option>');
	}
}
function te_manage_tab4_wkng_change() {
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
					$("#search_cmpt").append('<option value="' + d[i] + '">' + d[i] + '</option>');
				}
			}
		}
	});
}
function te_searchlist_export() {
	var type = te_manage_tab4.nowsearchtype;

	var data = new FormData();
	if (type == 1) {
		var year = $("#search_year").val();
		var county = $("#search_county").val();
		var town = $("#search_town").val();
		var sec = $("#search_sec").val();
		var landno1 = $("#search_number1").val();
		var landno2 = $("#search_number2").val();
		var landcode = $("#search_land_code").val();
		var dep = $("#search_dep").val();
		var changetype = $("#search_changetype").val();
		var changetypesub = $("#search_changetypesub").val();
		
		if (year != -1)
			data.append('Year', year);
		if (county != -1)
			data.append('County', county);
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
		if (dep != "")
			data.append('Dep', dep);
		if (changetype != -1)
			data.append('ChangeType', changetype);
		if (changetypesub != -1)
			data.append('ChangeTypeSub', changetypesub);
	}
	else if (type == 2) {
		var year = $("#search_year2").val();
		var dist = $("#search_dist option:selected").text();
		var wkng = $("#search_wkng option:selected").text();
		var cmpt = $("#search_cmpt").val();
		var state = $("#search_state").val();
		var dep = $("#search_dep2").val();
		var changetype = $("#search_changetype2").val();
		var changetypesub = $("#search_changetypesub2").val();
		
		if (year != -1)
			data.append('Year', year);
		if (dist != "請選擇")
			data.append('Dist', dist);
		if (wkng != "請選擇")
			data.append('Wkng', wkng);
		if (cmpt != -1)
			data.append('Cmpt', Cmpt);
		if (state != "")
			data.append('State', state);
		if (dep != "")
			data.append('Dep', dep);
		if (changetype != -1)
			data.append('ChangeType', changetype);
		if (changetypesub != -1)
			data.append('ChangeTypeSub', changetypesub);
	}
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "ChangeEvent/GetChangeSearchListExcel", true);
	// request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.responseType = 'blob';

	request.onload = function(e) {
		if (this.status === 200) {
			var blob = this.response;
			if(window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, "圖徵異動列表.xlsx");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = "圖徵異動列表.xlsx";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
       }
   };
   
   request.send(data);
}
// 異動查詢 END
// 取消異動 START
function te_manage_cancelchange_hide() {
	$('#CancelChange').modal('hide');
	$("#cancel_note").val("");
}
function te_manage_cancelchange_sent() {
	
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	var newdate = year + "/" + month + "/" + day;
	
	var post = {};
	post.SId = nowloadDetialData;
	post.CancelUserid = Logindata.sid;
	post.CancelDate = newdate;
	post.CancelNote = $("#cancel_note").val();
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/CancelChangeEvnet",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d == "1") {
					alert("取消異動成功.");
					te_manage_cancelchange_hide();
					loadDetialData(nowloadDetialData);
				}
				else {
					alert("取消異動失敗.");
				}
			}
		}
	});
}
// 取消異動 END
function te_manage_reset() {
	$(".nav-item2.tab1").click();
	
	$("#ver_year0").val("-1");
	$("#search_id").val("");
	$("#search_title").val("");
	$("#search_stat").val("-1");
	
	$("#te_tab1_list").empty();
}
function te_search_list_reset_1() {
	$("#search_year").val("-1");
	$("#search_county").val("-1");
	$("#search_town").val("-1");
	$("#search_sec").val("-1");
	
	$("#search_number1").val("");
	$("#search_number2").val("");
	$("#search_land_code").val("");
	$("#search_dep").val("");
	
	$("#search_changetype").val("-1");
	$("#search_changetypesub").val("-1");
	
	$("#query_1").hide();
	$("#query_2").hide();
}
function te_search_list_reset_2() {
	$("#search_year2").val("-1");
	$("#search_dist").val("-1");
	$("#search_wkng").val("-1");
	$("#search_cmpt").val("-1");
	$("#search_state").val("-1");
	
	$("#search_dep2").val("");
	
	$("#search_changetype2").val("-1");
	$("#search_changetypesub2").val("-1");
	
	$("#query_1").hide();
	$("#query_2").hide();
}
function te_search_list_reset_3() {
	$("#search_state3").val("-1");
	$("#search_uid3").val("");
	$("#search_unit3").val("-1");
	$("#search_start3").val("");
	$("#search_end3").val("");
	$("#search_land3").val("");
	$("#search_changetype3").val("-1");
	$("#search_changetypesub3").val("-1");
		
	$("#query_1").hide();
	$("#query_2").hide();
}
function te_manage_ismoved_change() {
	var checked = $("#ismoved").is(":checked");
	
	if (checked) {
		$("#add_te_area").prop('disabled', true);
		$("#add_te_area").val("");
	}
	else {
		$("#add_te_area").prop('disabled', false);
	}
	
	if (checked) {
		var post = {};
	
		post.County = $("#add_te_city").find("option:selected").text();
		post.Town = $("#add_te_town").find("option:selected").text();
		post.LandName = $("#add_te_land").find("option:selected").text();
		post.LandNo = $("#add_te_landnum1").val() + '-' + $("#add_te_landnum2").val();
		
		if (post.County == "請選擇")
			return;
		if (post.Town == "請選擇")
			return;
		if (post.LandName == "請選擇")
			return;
		
		WaitingShow(true);
		$.ajax({
			url: ApiRequestURL + "ChangeEvent/GetAreaHa",
			type: "Post",
			data: post,
			success: function(data) {
				if (data.data) {
					var d = data.data;
					setTimeout(function() {
						WaitingShow(false);
						if (d == "-1") {
							alert("沒有在資料庫中找到該筆地籍相關資料。");
							$("#ismoved").prop('checked', false);
							$("#add_te_area").prop('disabled', false);
						}
						else {
							$("#add_te_area").val(d);
						}
					}, 500);
				}
			}
		});
	}
}
function te_manage_tab2_feature_click(e) {
	$("#te_inarea_body tr").removeClass("active");
	if (e.selected.length == 1) {
		var $objTr = $("#list_item_" + e.selected[0].sid);
		$objTr.addClass("active");
		var objTr = $objTr[0];
		$("#zone_inarea").animate({scrollTop:objTr.offsetTop - 34}, "slow");
	}
}
function te_review_feature_click(e) {
	$("#te_inarea_table tr").removeClass("active");
	if (e.selected.length == 1) {
		var $objTr = $("#list_item_" + e.selected[0].sid);
		$objTr.addClass("active");
		var objTr = $objTr[0];
		$("#te_inarea_table").animate({scrollTop:objTr.offsetTop - 34}, "slow");
	}
}
function te_export_assSHP() {
	var post = {};
	post.ContainerId = te_manage_tab2.uid;
	post.FileName = te_manage_tab2.uid;
	post.ShpName = te_manage_tab2.uid;
	post.Type = "1";
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/ExportAssShp",
		type: "Post",
		data: post,
		beforeSend: function() {
           WaitingShow(true);
        },
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data && data.data != 'NoFeatures') {
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
				document.remove(a);
			}
			else {
				alert('沒有可匯出的圖徵.');
			}
		}
	});
}
function te_export_assEXCEL() {
	var data = new FormData();
	data.append('ContainerId', te_manage_tab2.uid);
	data.append('FileName', te_manage_tab2.uid);
	
	WaitingShow(true);
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "ChangeEvent/ExportAssExcel", true);
	request.responseType = 'blob';

	request.onload = function(e) {
		WaitingShow(false);
		if (this.status === 200) {
			var blob = this.response;
			if(window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, te_manage_tab2.uid + "_解編地籍清冊.xlsx");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = te_manage_tab2.uid + "_解編地籍清冊.xlsx";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
       }
   };
   
   request.send(data);
}