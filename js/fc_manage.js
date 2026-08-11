//地籍管理-功能頁籤
$("search_type.fc_manage").children().on("click",function(){
	$(this).parent().children().removeClass("active");
	$(this).addClass("active");
});

//子功能頁籤
function fc_manage_step_tab()
{
	$(".fc_manage_tab3 .nav-item3").on("click",function(){
		  for(j = 1; j < 4; j++){
			  if($(this).hasClass("tab"+j)){
				  if(j == 1) {
					 if($(this).parent().find(".active").hasClass("tab2")) {
						  let c = confirm("確定回到上一步? 將會喪失已比對完成的結果");
                          if(c){
							  upload_step(3,j);
						  }							
						  else{
							  return;
						  }
					  } 
				  }
				  if(j == 2) {
					  if ($(this).parent().find(".active").hasClass("tab2")) {
						  return;
					  }
					  let t = $('#file_list input[name=file_selected]:checked').val();
					  if (!t) {
						  alert("請選取上傳檔案!");
						  return;
					  }
					  StartParsingShpFile(t);
					  upload_step(3,j);
				  }
				  if (j == 3) {
					  if ($(this).parent().find(".active").hasClass("tab1")) {
						  return;
					  }
					  
					  //to do要將執行結果的方法寫在這裡
					  if ($(this).parent().find(".active").hasClass("tab2")) {
						  return;
					  }
				  }
			  }
		  }		  
		  $(this).parent().children().removeClass("active");
		  $(this).addClass("active");
	  });		
}

function upload_step(i,j)
{
	$(".upload_step").empty();
	$(".upload_step.tab" + i).load("./views/fc_manage_tab" + i + "_step" + j + ".html"); 
}

function fc_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab" + i).load("./views/fc_manage_tab" + i + ".html"); 
	
	setTimeout(function(){
		if (i > 2) {
			upload_step(i,1);
		}
	}, 100);
	
}
 
//批次匯入 START
function GetFileList() {
	$.get(ApiRequestURL + "ImportFile/GetUploadShpFileList", function(data) {
		var rdata = data.data;
		for (var i = 0; i < rdata.length; i++) {
			var appendtr = "";
			appendtr += "<tr class=\"align-middle\">";
			appendtr += "<td>" + htmlEncode(rdata[i].no) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].name) + "</td>";
			appendtr += "<td>" + parseInt(rdata[i].megaByte) + "MB</td>";
			appendtr += "<td>" + (rdata[i].completeness == true ? "可執行" : "不可執行") + "</td>";
			appendtr += "<td>" + htmlEncode(formatDateTime_Date(rdata[i].lastWriteTime)) + "</td>";
			//選取後再執行
			appendtr += "<td><input type=\"radio\" class=\"form-check-input file_selected\" name=\"file_selected\" value=\"" + htmlEncode(rdata[i].name) + "\"></td>";
			// appendtr += "<td><button type=\"button\" class=\"btn btn-success\" onclick=\"StartParsingShpFile('" + rdata[i].name + "')\">執行</button></td>";
			appendtr += "</tr>";
			$("#file_list>tbody").append(appendtr);
		}
	});
}
var comparefinishData = null;
function StartParsingShpFile(filename) {
	// $( ".nav-item3.tab2" ).click();
	$("#upload_city_result").remove();
	$("#compare_city_result").remove();
	$.post(ApiRequestURL + "ImportFile/StartCityShpFile", { Filename: filename })
		.done(function(data) {
			if (data.isSuccess === true) {
				var rdata = data.data;
				comparefinishData = rdata;
				//解析結果
				var appendtr = "";
				appendtr += "<tr class=\"align-middle\">";
				appendtr += "<td>" + htmlEncode(rdata.city) + "</td>";
				appendtr += "<td>" + thousandComma(rdata.newVersionNum) + "</td>";
				appendtr += "<td>" + thousandComma(rdata.oldVersionNum) + "</td>";
				appendtr += "<td>" + rdata.spentTime + "秒" + "</td>";
				appendtr += "</tr>";
				
				$("#upload_city_result").append(appendtr);
				
				//差異比對結果
				var cmdata = rdata.compareLists;
				if (cmdata.length > 0) {
					var appendtr2 = "";
					for (var i = 0; i < cmdata.length; i++) {
						appendtr2 += "<tr class=\"align-middle\">";
						appendtr2 += "<td>" + htmlEncode(cmdata[i].no) + "</td>";
						appendtr2 += "<td>" + htmlEncode(cmdata[i].landCode) + "</td>";
						appendtr2 += "<td>" + htmlEncode(cmdata[i].townName) + "</td>";
						appendtr2 += "<td>" + htmlEncode(cmdata[i].landName) + "</td>";
						appendtr2 += "<td>" + areaha_abs(cmdata[i].regArea) + "</td>";
						appendtr2 += "<td>" + htmlEncode(cmdata[i].state) + "</td>";
						appendtr2 += "<td><button type=\"button\" class=\"btn btn-success\" OnClick=\"UpdateVersionCompare();\">更新</button></td>";
						appendtr2 += "</tr>";
					}
					$("#compare_city_result").append(appendtr2);
				}
				else {
					var appendtr2 = "";
					appendtr2 += "<tr class=\"align-middle\">";
					appendtr2 += "<td colspan=\"7\">比對後無差異資料</td>";
					appendtr2 += "</tr>";
					$("#compare_city_result").append(appendtr2);
				}
				
				$(".spinner_mask").hide();
			}
		});
}

function city_result(list) {
	let y = document.getElementById("ver_year1").value;
	let m = document.getElementById("ver_month1").value;
	
	if (y == 0 || m == 0) {
		alert("請選擇版次!");
		return;
	}
	$("#city_list").show();
	let t = document.getElementById("city_result");
	let c = ["臺北市","新北市","桃園市","臺中市","臺南市","高雄市","基隆市","新竹市","嘉義市","新竹縣","苗栗縣","彰化縣","雲林縣","嘉義縣","屏東縣","南投縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];
    $(t).empty();
	for (i = 0; i < 22; i++) {
		var tar = list.filter(x => x.cityName === c[i]);
		let p = "<tr class='align-middle'>" +
			"<td>" + (i + 1) + "</td>" +
			"<td>" + c[i] +"</td>" +
			"<td>" + (tar.length > 0 ? thousandComma(tar[0].amount) : 0) + "</td>" +
			"<td>" + (tar.length > 0 ? formatDateTime_Time_NonSecond(tar[0].executionTime) : "尚未執行") + "</td>" +
			"<td>" + (tar.length > 0 ? htmlEncode(tar[0].userName) : "") + "</td></tr>";
		$(t).append(p);
	}
}
function GetNewestVersionList() {
	$.get(ApiRequestURL + "ImportFile/GetNewestVersionList", function(data) {
		if (data.isSuccess == true) {
			var rdata = data.data;
			$("#ver_year1").append("<option value='" + rdata.year +  "'>" + rdata.year + "</option>");
			$("#ver_month1").append("<option value='" + rdata.month +  "'>" + rdata.month + "</option>");
			city_result(rdata.versionlist);
		}
	});
}
function UpdateVersionCompare() {
	if (comparefinishData) {
		$.post(ApiRequestURL + "ImportFile/UpdateVersionCompare", comparefinishData)
			.done(function(data) {
			});
	}
}
//批次匯入 END

// 版次管理 START
function new_city_result() {
	let y = document.getElementById("ver_year2").value;
	let m = document.getElementById("ver_month2").value;
	
	if (y == 0 || m == 0) {
		alert("請選擇版次!");
		return;
	}
}

function GetVersionList() {
	$.get(ApiRequestURL + "VersionManagement/GetVersionList", function(data) {
		$("#version_list>tbody>tr").remove();
		var rdata = data.data;
		for (var i = 0; i < rdata.length; i++) {
			var appendtr = "";
			
			appendtr += "<tr class=\"align-middle\">";
			appendtr += "<td>" + htmlEncode(rdata[i].no) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].year) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].month) + "</td>";
			appendtr += "<td>" + htmlEncode(formatDateTime_Date(rdata[i].createTime)) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].spaceCounty) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].spaceCompare) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].spaceChange) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].ownerCompare) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].ownerChange) + "</td>";
			appendtr += "<td>" + htmlEncode(formatDateTime_Time(rdata[i].updateTime)) + "</td>";
			appendtr += "<td>" + htmlEncode(rdata[i].updateName) + "</td>";
			appendtr += "<td><button type=\"button\" class=\"btn btn-danger\" onclick=\"ShowDeleteVersion(" + rdata[i].sid + ");\">刪除</button></td>";
			appendtr += "</tr>";
			
			$("#version_list>tbody").append(appendtr);
		}
	});
}
function AddNewVersion() {
	var syear = $("select#ver_year0").val();
	var smonth = $("select#ver_month0").val();
	if (syear == "請選擇" || smonth == "請選擇") {
		alert("請選擇年度跟月份.");
		return;
	}
	$.post(ApiRequestURL + "VersionManagement/AddNewVersion", { year: syear, month: smonth })
		.done(function(data) {
			if (data.message === "success")
				alert("新增成功.");
			
			$('#AddNewVersion').modal('hide');
			GetVersionList();
		});
}

var DeleteVersionSID;
function ShowDeleteVersion(sid) {
	DeleteVersionSID = sid;
	$('#DeleteVersion').modal('show');
}

function DeleteVersion() {
	var sid = DeleteVersionSID;
	$.post(ApiRequestURL + "VersionManagement/DeleteVersion", { sid: sid })
		.done(function(data) {
			if (data.message === "success")
				alert("刪除成功.");
			
			$('#DeleteVersion').modal('hide');
			GetVersionList();
		});
}
//版次管理 END

//資料總覽 START
function tab_click(){
	$(".fi_tab_content").hide();
	$(".fi_tab").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(".fi_tab_content").slideUp().removeClass("active");
			return;
		}
		$(".fi_tab").removeClass("active");
		$(this).addClass("active");
		
		$(".fi_tab_content").slideUp().removeClass("active");
		$(this).parent().find(".fi_tab_content").addClass("active").slideDown();
	});
	
	$(".tab_content_table tr").on("click",function(){
		$(".tab_content_table tr").removeClass("active");
		$(this).addClass("active");
	});
}

//資料總覽 END
var fc_tab1 = {};
fc_tab1.map = null;
fc_tab1.SelectSingleClick = null;
fc_tab1.AssClick = true;
function fc_tab1_init() {
	fc_tab1.map = map('mmap', true, false, true);
	// 圖徵Highlight初始化
	var sstyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: "rgba(209, 209, 209, 0.5)",
		}),
		stroke: new ol.style.Stroke({
			color: "#0099FF",
			width: 2,
		}),
		zIndex: 100
	});
	var SelectSingleClick = new ol.interaction.Select({
		style: sstyle,
		filter: function(e){
			if (fc_tab1.mainfeature && fc_tab1.mainfeature == e) {
				fc_tab1.mainfeature = null;
				return false;
			}
			else if (fc_tab1.AssClick == false && e.type == 'AssFeature') {
				return false;
			}
			fc_tab1.mainfeature = e;
			return true;
		}
	});
	SelectSingleClick.on("select", fc_tab1_feature_click);
	fc_tab1.map.addInteraction(SelectSingleClick);
	fc_tab1.SelectSingleClick = SelectSingleClick;
	
	fc_tab1_getCountyList();
	fc_tab1_getFcZoningList();
	tab_click();
	big_window_fc();

	// 優先初始化相關代碼
	fc_tab1_getApiCode();
	
	// 處理Legend
	var target = $("#maplegend");
	var legend1 = "<div style='width: 200px;'>";
	
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend1'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>選取區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"self_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fc_tab1_layer_change_opacity('self');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend2'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>列表區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"noself_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fc_tab1_layer_change_opacity('noself');\" /></div>";
	legend1 += "</div>";
	legend1 += "</div>";
	
	target.append(legend1);
}

function fc_tab1_layer_change_opacity(type) {
	if (type == 'self') {
		var val = $('#self_opacity').val() / 100;
		fc_tab1.map.geomvector_layer1.setOpacity(val);
	}
	else {
		var val = $('#noself_opacity').val() / 100;
		fc_tab1.map.geomvector_layer.setOpacity(val);
	}
}

function fc_tab1_AssSwitch(that) {
	var fs = fc_tab1.map.geomvector_source2.getFeatures();
	if (fc_tab1.AssClick) {
		fc_tab1.AssClick = false;
		$(".fc_tab1_associate tr").removeClass("active");
	}
	else {
		fc_tab1.AssClick = true;
	}
	for (var i = 0; i < fs.length; i++) {
		if (fs[i].type != "AssFeature") continue;
		var ischeck = false;
		var tt = $('#listlayer_check_' + fs[i].sid);
		if (tt.length > 0)
			ischeck = $('#listlayer_check_' + fs[i].sid)[0].checked;
		
		if (fc_tab1.AssClick && ischeck) {
			var featureSavedStyle = fs[i].get("savedStyle");
			fs[i].setStyle(featureSavedStyle);
		}
		else {
			fs[i].setStyle(new ol.style.Style(null));
		}
	}
}
function fc_tab1_getCountyList() {
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
function fc_tab1_getFcZoningList() {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetFcZoning",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#search_zoning").multiselect('destroy');
				$("#search_zoning").empty();
				
				for (var i = 0; i < d.length; i++) {
					$("#search_zoning").append('<option value="' + d[i].code + '">' + htmlEncode(d[i].name) + '</option>');
				}
				
				$("#search_zoning").multiselect({
					buttonClass: 'form-select',
					buttonTextAlignment: 'left',
					buttonWidth: '235px',
					nonSelectedText: '請選擇',
					nSelectedText: '已選擇',
					allSelectedText: '全選',
					includeSelectAllOption: true,
					templates: {
						button: '<button type="button" class="multiselect dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
					}
				});
			}
		}
	});
}
function fc_tab1_getTownList(that) {
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
				that.options[0].disabled = true;
				var d = data.data;
				$("#search_town").empty();
				$("#search_town").append('<option value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					$("#search_town").append('<option value="' + d[i].code + '">' + htmlEncode(d[i].name) + '</option>');
				}
				$('#search_sec').selectpicker('destroy');
				$("#search_sec").empty();
				$("#search_sec").append('<option value="-1">請選擇</option>');
				$('#search_sec').selectpicker({
					liveSearch: true
				});
				$('#search_sec').selectpicker('change');
			}
		}
	});
}
function fc_tab1_getLandList() {
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
				$("#search_sec").selectpicker('destroy');
				$("#search_sec").empty();
				$("#search_sec").append('<option value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					var landstr = "";
					landstr += d[i].sec == "" ? "" : d[i].sec + "段";
					landstr += d[i].sec_sub == "" ? "" : d[i].sec_sub + "小段";
					$("#search_sec").append('<option value="' + d[i].sec_code + '">' + landstr + '</option>');
				}
				$('#search_sec').selectpicker({
					liveSearch: true
				});
				$('#search_sec').selectpicker('change');
			}
		}
	});
}
function fc_tab1_queryLandList() {
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var sec = $("#search_sec").val();
	var pm = $("#search_number1").val();
	var pc = $("#search_number2").val();
	var lc = $("#search_land_code").val();
	var man = $("#search_manage").val();
	var zon = $("#search_zoning").val();
	var lnos = $('#search_multi_land_no').val();
	
	var x = $("#search_X").val();
	var y = $("#search_Y").val();
	
	var post = {};
	if (county != "-1") post.CountyCode = county;
	if (town != "-1") post.TownCode = town;
	if (sec != "-1") post.LandCode = sec;
	if (pm != "") post.PmNo = pm;
	if (pc != "") post.PcNo = pc;
	if (man != "") post.Manager = man;
	if (lnos != "") post.MultiLandNo = lnos;
	if (zon.length > 0) post.Zoning = zon;
	
	if (
		(county == "-1" || town == "-1" || sec == "-1") 
		&& lc == ""
		&& (x == "" && y == "")
	)
	{
		alert("請選擇查詢條件!");
		return;
	}
	
	if (fc_tab1.pointSearch) {
		fc_tab1.pointSearch = null;
	}
	
	// 選擇地籍編碼情況下 只查地籍編碼
	if (lc != "") {
		post = {};
		post.LandNo = lc;
	}
	
	// 選擇XY 只查地籍編碼
	if (x != "" && y != "") {
		post = {};
		
		var format = new ol.format.WKT();
		// 97轉成84
		var feature = format.readFeature('POINT (' + x + ' ' + y + ')');
		feature.getGeometry().transform('EPSG:3826', 'EPSG:4326');
		
		var geom = feature.getGeometry();
		
		post.SearchX = geom.flatCoordinates[0];
		post.SearchY = geom.flatCoordinates[1];
		
		var mapstyle = new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 1],
				crossOrigin: 'anonymous',
				src: 'image/marker.png',
			})
		});
		var mapfeature = format.readFeature('POINT (' + x + ' ' + y + ')');
		mapfeature.getGeometry().transform('EPSG:3826', 'EPSG:3857');
		mapfeature.setStyle(mapstyle);
		
		fc_tab1.pointSearch = mapfeature;
		
		if (!post.SearchX || !post.SearchY) {
			alert('座標轉換錯誤.')
			return;
		}
	}
	
	var check = CheckUserAccess("圖資查詢", "全國地籍", "查詢");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
		
	fc_tab1.nowspost = post;
	AddNewLog("圖資查詢", "全國地籍", "查詢");
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/QueryLandList",
		type: "Post",
		data: post,
		success: function(data) {

			WaitingShow(false);

			if (data.data) {
				var d = data.data;
				$("#fc_tab1_list").empty();
				$("#fc_tab1_list").scrollTop(0);
				
				fc_tab1.selfdata = d;
				$("#fc_tab1_count").text("共 (" + d.length + ") 筆");
				
				if (d.length == 0) {
					var text = '<tr>';
					text += '<td>' + '無符合查詢結果' + '</td>';
					text += '</tr>';
					
					$("#fc_tab1_list").append(text);
				}
				else {
					for (var i = 0; i < d.length; i++) {
						var text = '<tr id="' + d[i].sid + '" onclick="fc_tab1_searchlistClick(this);">';
						text += '<td>' + htmlEncode(d[i].townName) + '</td>';
						text += '<td>' + htmlEncode(d[i].landName) + '</td>';
						text += '<td>' + htmlEncode(d[i].pm_pc) + '</td>';
						text += '</tr>';
						$("#fc_tab1_list").append(text);
					}
					
					$("#" + d[0].sid).click();
				}
			}
		}
	});
}
var fc_tab1_nowSelect = null;
function fc_tab1_searchlistClick(that) {
	$("#fc_tab1_list tr").removeClass("active");
	$(that).addClass("active");
	
	$(".fi_tab_frame.fi_tab, .fi_tab_frame.fi_tab_content").removeClass("active");
	$("#fi_tab_list5").click();
	
	var id = that.id;
	fc_tab1_nowSelect = id;
	
	var post = {};
	post.Sid = id;
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/QueryTargetLand",
		type: "Post",
		data: post,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data;

				fc_tab1.map.geomvector_source.clear();
				fc_tab1.map.geomvector_source1.clear();
				fc_tab1.map.geomvector_source2.clear();
				$(".fc_detail_data").show();
				
				var lcstate = d.isForsetLand;
				$('#fcland_state').empty();
				if (lcstate) {
					$('#fcland_state').append('屬林地範圍');
				}
				else {
					$('#fcland_state').append('非屬林地範圍');
				}
				
				var basedata = d.baseData;
				var text = "";
				
				fc_tab1.basedata = basedata;
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">地籍編碼</div>';
				text += '<div class="detail_rows_value">' + basedata.landCode + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">縣市鄉鎮</div>';
				text += '<div class="detail_rows_value">' + basedata.county + basedata.town + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">事務所</div>';
				text += '<div class="detail_rows_value">' + basedata.unit + '(' + basedata.unitCode + ')' + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">地段</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(that.childNodes[1].innerText) + '</div>';
				text += '</div>';
				
				fc_tab1.basedata.landname = htmlEncode(that.childNodes[1].innerText);
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">地號</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(that.childNodes[2].innerText) + '</div>';
				text += '</div>';
				
				fc_tab1.basedata.landnodash = htmlEncode(that.childNodes[2].innerText);
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">登記面積</div>';
				text += '<div class="detail_rows_value">' + areaha_abs(basedata.area_ha) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">登記日期</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(basedata.regDate) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">登記類型</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(basedata.regName) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">使用分區</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(basedata.zoningName) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">使用分類</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(basedata.lcLassName) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">公告現值</div>';
				text += '<div class="detail_rows_value">' + toCurrency(basedata.alValue) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">公告地價</div>';
				text += '<div class="detail_rows_value">' + toCurrency(basedata.alPrice) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">地籍版本</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(basedata.ver) + '</div>';
				text += '</div>';
				
				$("#fc_main_data").empty();
				$("#fc_main_data").append(text);
				
				var ownerdata = d.ownerData;
				
				fc_tab1.ownerdata = ownerdata;
				
				$("#fc_owner_data").empty();
				
				for (var i = 0; i < ownerdata.length; i++) {
					if (i != 0) {
						var hr = '<hr />';
						$("#fc_owner_data").append(hr);
					}
					var tmp = "";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">權屬類型</div>';
					tmp += '<div class="detail_rows_value">' + htmlEncode(ownerdata[i].own) + '</div>';
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">所有權人</div>';
					tmp += '<div class="detail_rows_value">' + htmlEncode(ownerdata[i].ownerName) + '</div>';
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">管理單位</div>';
					tmp += '<div class="detail_rows_value">' + htmlEncode(ownerdata[i].manager) + '</div>';
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">持分(子/母)</div>';
					
					if (ownerdata[i].ratios == "" && ownerdata[i].ratiom == "")
						tmp += '<div class="detail_rows_value">-</div>';
					else
						tmp += '<div class="detail_rows_value">' + ownerdata[i].ratios + '/' + ownerdata[i].ratiom + '</div>';
					
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">資料來源</div>';
					tmp += '<div class="detail_rows_value">' + htmlEncode(ownerdata[i].sourceName) + '</div>';
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">版本</div>';
					tmp += '<div class="detail_rows_value">' + ownerdata[i].ver + '</div>';
					tmp += "</div>";
					
					$("#fc_owner_data").append(tmp);
				}
				
				if (ownerdata.length == 0) {
					$("#fc_owner_data").append("目前無相關權屬資訊");
				}
				
				var forestdata = d.forestData;
				$("#type1_amount").empty();
				$("#type1_amount").append("共" + forestdata.length + "筆");
				
				$("#type1_list").empty();
				
				var forestStyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(48, 212, 33, 0.3)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(25, 110, 17, 1)",
						width: 2,
					}),
				});
				
				for (var i = 0; i < forestdata.length; i++) {
					var tmp = "";
					
					if (forestdata[i].hasNew == "")
						tmp += '<tr id="list_item_' + forestdata[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + forestdata[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					
					tmp += '<td><input id="listlayer_check_' + forestdata[i].sid + '" type="checkbox" class="form-check-input" onchange="fc_tab1_layer_show_click(this,\'' + forestdata[i].sid + '\');" checked /></td>';
					tmp += '<td>' + htmlEncode(forestdata[i].distName) + '</td>';
					tmp += '<td>' + htmlEncode(forestdata[i].weildName) + '</td>';
					tmp += '<td>' + htmlEncode(forestdata[i].cmpt) + '林班</td>';
					tmp += '<td>' + htmlEncode(forestdata[i].ratio) + '</td>';
					tmp += "</tr>";
					
					$("#type1_list").append(tmp);
					
					var format = new ol.format.WKT();
					var feature = format.readFeature(forestdata[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = forestdata[i].sid;
					feature.type = "AssFeature";
					
					if (fc_tab1.AssClick)
					{
						feature.setStyle(forestStyle);
						feature.set("savedStyle", forestStyle);
					}
					else
					{
						feature.set("savedStyle", forestStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fc_tab1.map.geomvector_source2.addFeature(feature);
				}
				
				var protectiondata = d.protectionData;
				$("#type2_amount").empty();
				$("#type2_amount").append("共" + protectiondata.length + "筆");
				
				$("#type2_list").empty();
				
				var protectionStyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(255, 183, 0, 0.3)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(138, 99, 0, 1)",
						width: 2,
					}),
				});
				
				for (var i = 0; i < protectiondata.length; i++) {
					var tmp = "";
					
					if (protectiondata[i].hasNew == "")
						tmp += '<tr id="list_item_' + protectiondata[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + protectiondata[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					
					tmp += '<td><input id="listlayer_check_' + protectiondata[i].sid + '" type="checkbox" class="form-check-input" onchange="fc_tab1_layer_show_click(this,\'' + protectiondata[i].sid + '\');" checked /></td>';
					tmp += '<td>' + htmlEncode(protectiondata[i].distName) + '</td>';
					tmp += '<td>' + htmlEncode(protectiondata[i].pfName) + '</td>';
					tmp += '<td>' + htmlEncode(protectiondata[i].pfid) + '號</td>';
					tmp += '<td>' + htmlEncode(protectiondata[i].ratio) + '</td>';
					tmp += "</tr>";
					
					$("#type2_list").append(tmp);
					
					var format = new ol.format.WKT();
					var feature = format.readFeature(protectiondata[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = protectiondata[i].sid;
					feature.type = "AssFeature";
					
					if (fc_tab1.AssClick)
					{
						feature.setStyle(protectionStyle);
						feature.set("savedStyle", protectionStyle);
					}
					else
					{
						feature.set("savedStyle", protectionStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fc_tab1.map.geomvector_source2.addFeature(feature);
				}
				
				var recreationData = d.recreationData;
				$("#type3_amount").empty();
				$("#type3_amount").append("共" + recreationData.length + "筆");
				
				$("#type3_list").empty();
				
				var recreationStyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(255, 119, 15, 0.3)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(112, 49, 0, 1)",
						width: 2,
					}),
				});
				
				for (var i = 0; i < recreationData.length; i++) {
					var tmp = "";
					
					if (recreationData[i].hasNew == "")
						tmp += '<tr id="list_item_' + recreationData[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + recreationData[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					
					tmp += '<td><input id="listlayer_check_' + recreationData[i].sid + '" type="checkbox" class="form-check-input" onchange="fc_tab1_layer_show_click(this,\'' + recreationData[i].sid + '\');" checked /></td>';
					tmp += '<td>' + htmlEncode(recreationData[i].distName) + '</td>';
					tmp += '<td>' + htmlEncode(recreationData[i].reName) + '</td>';
					tmp += '<td>' + htmlEncode(recreationData[i].ratio) + '</td>';
					tmp += "</tr>";
					
					$("#type3_list").append(tmp);
					
					var format = new ol.format.WKT();
					var feature = format.readFeature(recreationData[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = recreationData[i].sid;
					feature.type = "AssFeature";
					
					if (fc_tab1.AssClick)
					{
						feature.set("savedStyle", recreationStyle);
						feature.setStyle(recreationStyle);
					}
					else
					{
						feature.set("savedStyle", recreationStyle);
						feature.setStyle(new ol.style.Style(null));
					}

					fc_tab1.map.geomvector_source2.addFeature(feature);
				}
				
				var researchData = d.researchData;
				$("#type4_amount").empty();
				$("#type4_amount").append("共" + researchData.length + "筆");
				
				$("#type4_list").empty();
				
				var researchStyle =	new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(255, 238, 0, 0.3)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(255, 238, 0, 1)",
						width: 2,
					}),
				});
				
				for (var i = 0; i < researchData.length; i++) {
					var tmp = "";
					
					if (researchData[i].hasNew == "")
						tmp += '<tr id="list_item_' + researchData[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + researchData[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					
					tmp += '<td><input id="listlayer_check_' + researchData[i].sid + '" type="checkbox" class="form-check-input" onchange="fc_tab1_layer_show_click(this,\'' + researchData[i].sid + '\');" checked /></td>';
					tmp += '<td>' + htmlEncode(researchData[i].name) + '</td>';
					tmp += '<td>' + htmlEncode(researchData[i].fName) + '</td>';
					tmp += '<td>' + htmlEncode(researchData[i].manager) + '</td>';
					tmp += '<td>' + htmlEncode(researchData[i].ratio) + '</td>';
					tmp += "</tr>";
					
					$("#type4_list").append(tmp);
					
					var format = new ol.format.WKT();
					var feature = format.readFeature(researchData[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = researchData[i].sid;
					feature.type = "AssFeature";
					
					if (fc_tab1.AssClick)
					{
						feature.set("savedStyle", researchStyle);
						feature.setStyle(researchStyle);
					}
					else
					{
						feature.set("savedStyle", researchStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fc_tab1.map.geomvector_source2.addFeature(feature);
				}
				
				var greenMeshBelt = d.greenMeshBelt;
				$("#type6_amount").empty();
				$("#type6_amount").append("共" + greenMeshBelt.length + "筆");

				$("#type6_list").empty();

				var greenMeshStyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(176, 228, 4, 0.3)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(176, 228, 4, 1)",
						width: 2,
					}),
				});

				for (var i = 0; i < greenMeshBelt.length; i++) {
					var tmp = "";
					
					if (greenMeshBelt[i].hasNew == "")
						tmp += '<tr id="list_item_' + greenMeshBelt[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + greenMeshBelt[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					
					tmp += '<td style="width:35px;"><input id="listlayer_check_' + greenMeshBelt[i].sid + '" type="checkbox" class="form-check-input" onchange="fc_tab1_layer_show_click(this,\'' + greenMeshBelt[i].sid + '\');" checked /></td>';
					// tmp += '<td>' + greenMeshBelt[i].name + '</td>';
					tmp += '<td>' + htmlEncode(greenMeshBelt[i].fName) + '</td>';
					tmp += '<td>' + htmlEncode(greenMeshBelt[i].manager) + '</td>';
					tmp += '<td>' + htmlEncode(greenMeshBelt[i].ratio) + '</td>';
					tmp += "</tr>";
					
					$("#type6_list").append(tmp);
					
					var format = new ol.format.WKT();
					var feature = format.readFeature(greenMeshBelt[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = greenMeshBelt[i].sid;
					feature.type = "AssFeature";
					
					if (fc_tab1.AssClick)
					{
						feature.set("savedStyle", greenMeshStyle);
						feature.setStyle(greenMeshStyle);
					}
					else
					{
						feature.set("savedStyle", greenMeshStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fc_tab1.map.geomvector_source2.addFeature(feature);
				}
				
				var greenNetworkFocus = d.greenNetworkFocus;
				$("#type7_amount").empty();
				$("#type7_amount").append("共" + greenNetworkFocus.length + "筆");

				$("#type7_list").empty();

				var greenNetworkStyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(1, 202, 219, 0.3)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(1, 202, 219, 1)",
						width: 2,
					}),
				});

				for (var i = 0; i < greenNetworkFocus.length; i++) {
					var tmp = "";
					
					if (greenNetworkFocus[i].hasNew == "")
						tmp += '<tr id="list_item_' + greenNetworkFocus[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + greenNetworkFocus[i].sid + '" onclick="fc_tab1_item_click(this, event);">';
					
					tmp += '<td style="width:35px;"><input id="listlayer_check_' + greenNetworkFocus[i].sid + '" type="checkbox" class="form-check-input" onchange="fc_tab1_layer_show_click(this,\'' + greenNetworkFocus[i].sid + '\');" checked /></td>';
					// tmp += '<td>' + greenNetworkFocus[i].name + '</td>';
					tmp += '<td>' + htmlEncode(greenNetworkFocus[i].fName) + '</td>';
					tmp += '<td>' + htmlEncode(greenNetworkFocus[i].manager) + '</td>';
					tmp += '<td>' + htmlEncode(greenNetworkFocus[i].ratio) + '</td>';
					tmp += "</tr>";
					
					$("#type7_list").append(tmp);
					
					var format = new ol.format.WKT();
					var feature = format.readFeature(greenNetworkFocus[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = greenNetworkFocus[i].sid;
					feature.type = "AssFeature";
					
					if (fc_tab1.AssClick)
					{
						feature.set("savedStyle", greenNetworkStyle);
						feature.setStyle(greenNetworkStyle);
					}
					else
					{
						feature.set("savedStyle", greenNetworkStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fc_tab1.map.geomvector_source2.addFeature(feature);
				}
				
				// 畫自己本身圖徵
				var basemap = fc_tab1.selfdata;
				var selftmap = null;
				
				for (var i = 0; i < basemap.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(basemap[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = basemap[i].sid;
					
					if (basemap[i].sid == id) {
						var selfstyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: "rgba(235, 0, 0, 0.5)",
							}),
							stroke: new ol.style.Stroke({
								color: "rgba(148, 0, 0, 1)",
								width: 2,
							}),
							text: new ol.style.Text({
								font: '12px Calibri,sans-serif',
								fill: new ol.style.Fill({ color: '#000' }),
								stroke: new ol.style.Stroke({
									color: '#fff', width: 2
								}),
								text: basemap[i].pm_pc
							})
						});
						
						feature.setStyle(selfstyle);
						selftmap = feature;
						fc_tab1.map.geomvector_source1.addFeature(feature);
					}
					else {
						var otherstyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: "rgba(159, 198, 159, 0.5)",
							}),
							stroke: new ol.style.Stroke({
								color: "#446B44",
								width: 2,
							}),
							text: new ol.style.Text({
								font: '12px Calibri,sans-serif',
								fill: new ol.style.Fill({ color: '#000' }),
								stroke: new ol.style.Stroke({
									color: '#fff', width: 2
								}),
								text: basemap[i].pm_pc
							})
						});
						feature.setStyle(otherstyle);
						fc_tab1.map.geomvector_source.addFeature(feature);
					}
				}
				
				if (selftmap) {
					fc_tab1.mainfeature = selftmap;
					fc_tab1.map.getView().fit(selftmap.getGeometry().getExtent(), { maxZoom: 18});
					if (fc_tab1.pointSearch) {
						fc_tab1.map.geomvector_source.addFeature(fc_tab1.pointSearch);
					}
				}
				fc_tab1_getFcNotification();
			}
		}
	});
}
function fc_tab1_layer_show_click(that, id) {
	var t = that.checked;
	
	if (fc_tab1.AssClick)
	{
		var fs = fc_tab1.map.geomvector_source2.getFeatures();
		for (var i = 0; i < fs.length; i++) {
			if (fs[i].type != "AssFeature") continue;
			if (fs[i].sid != id) continue;
			if (t)
			{
				var featureSavedStyle = fs[i].get("savedStyle");
				fs[i].setStyle(featureSavedStyle);
			}
			else
			{
				// fs[i].set("savedStyle", fs[i].getStyle());
				fs[i].setStyle(new ol.style.Style(null));
				$("#list_item_" + id).removeClass("active");
			}
		}
	}
}
// 地圖點擊HighLight事件
function fc_tab1_feature_click(e) {
	if (e.selected.length == 1) {
		if (e.selected[0].sid) {
			var $objTr = $("#" + e.selected[0].sid);
			if (!$objTr || $objTr.length == 0) return;
			var objTr = $objTr[0];
			$(".result_list").animate({ scrollTop: objTr.offsetTop }, "slow");
			setTimeout(function() {
				$("#" + e.selected[0].sid).click();
			}, 500);
		}
	}
}
// Table點擊HighLight事件
function fc_tab1_item_click(that, e) {
	if (e.target.type == 'checkbox' || !fc_tab1.AssClick) return;
	
	var starid = that.id.split("_");
	var sid = starid[starid.length - 1];
	
	var ischeck = false;
	var tt = $('#listlayer_check_' + sid);
	if (tt.length > 0)
		ischeck = $('#listlayer_check_' + sid)[0].checked;
	
	if (!ischeck) return;

	var features = fc_tab1.map.geomvector_source2.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].sid == sid) {
			feature = features[i];
			break;
		}
	}
	if (feature) {
		$(".fc_tab1_associate tr").removeClass("active");
		$(that).addClass("active");
		fc_tab1.mainfeature = feature;
		fc_tab1.SelectSingleClick.getFeatures().clear();
		fc_tab1.SelectSingleClick.getFeatures().push(feature);
	}
}
// 下載ShapeFile
function fc_tab1_downloadshp() {
	var features = fc_tab1.map.geomvector_source.getFeatures();
	var format = new ol.format.WKT();
	var wkts = [];
	for (var i = 0; i < features.length; i++) {
		if (fc_tab1_nowSelect == features[i].sid) {
			features[i].getGeometry().transform("EPSG:3857", "EPSG:3826");
			var wkt = format.writeFeature(features[i], {
				dataProjection: "EPSG:3826",
				featureProjection: "EPSG:3826"
			});
			wkts.push(wkt);
			features[i].getGeometry().transform("EPSG:3826", "EPSG:3857");
			break;
		}
	}
	var features2 = fc_tab1.map.geomvector_source1.getFeatures();
	for (var i = 0; i < features2.length; i++) {
		if (fc_tab1_nowSelect == features2[i].sid) {
			features2[i].getGeometry().transform("EPSG:3857", "EPSG:3826");
			var wkt = format.writeFeature(features2[i], {
				dataProjection: "EPSG:3826",
				featureProjection: "EPSG:3826"
			});
			wkts.push(wkt);
			features2[i].getGeometry().transform("EPSG:3826", "EPSG:3857");
			break;
		}
	}
	
	var check = CheckUserAccess("圖資查詢", "全國地籍", "資料下載");
	if (!check) {
		alert("您沒有權限使用.")
		return;
	}
	if (wkts.length > 0) {
		var post = {};
		post.ShpName = fc_tab1.basedata.county + fc_tab1.basedata.town + fc_tab1.basedata.landname + fc_tab1.basedata.landNo + "地號";
		
		post.Sid = fc_tab1_nowSelect;
		post.County = fc_tab1.basedata.county;
		post.Town = fc_tab1.basedata.town;
		post.LandCode = fc_tab1.basedata.landCode;
		post.Sec = fc_tab1.basedata.landname;
		post.LandNo = fc_tab1.basedata.landNo;
		post.RegArea = fc_tab1.basedata.area_ha;
		post.Unit = fc_tab1.basedata.unit;
		post.Landnodash = fc_tab1.basedata.landnodash;
		
		post.RegDate = fc_tab1.basedata.regDate;
		post.Version = fc_tab1.basedata.ver;
		post.OVersion = fc_tab1.basedata.oVer;
		post.ZoningName = fc_tab1.basedata.zoningName;
		post.LclassName = fc_tab1.basedata.lcLassName;
		
		if (fc_tab1.ownerdata.length)
		{
			post.Manager = fc_tab1.ownerdata[0].manager;
			post.Owner = fc_tab1.ownerdata[0].own;
		}
		
		// post.Wkts = wkts;
		post.FileName = "地籍範圍";
		
		WaitingShow(true);
		$.ajax({
			url: ApiRequestURL + "InfoOverView/DownloadQueryShp",
			type: "Post",
			data: post,
			success: function(data) {
				WaitingShow(false);
				if (data.data && typeof(data.data) == 'string') {
					AddNewDownloadLog("圖資查詢", "全國地籍", "shp");
					var guid = data.data;
					var a = document.createElement("a");
					a.href = DonwLoadExportURL + guid + ".zip";
					a.click();
				}
				else {
					alert('下載時發生錯誤.')
				}
			}
		});
	}
}
function fc_tab1_reset() {
	$("#search_county").val("-1");
	$("#search_town").val("-1");
	
	$("#search_town").empty();
	$("#search_town").append('<option value="-1">請選擇</option>');
	
	$("#search_sec").empty();
	$("#search_sec").append('<option selected value="-1">請選擇</option>');
	$('#search_sec').selectpicker('destroy');
	$('#search_sec').selectpicker({
		liveSearch: true
	});
	// $('#search_sec').selectpicker('toggle');
	
	$("#search_number1").val("");
	$("#search_number2").val("");
	
	$("#search_land_code").val("");
	
	$("#search_X").val("");
	$("#search_Y").val("");
	
	$(".fc_detail_data").hide();
	$("#fc_tab1_list").empty();
	$("#fc_tab1_count").empty();
}
function fc_tab1_api() {
	var post = {};
	post.Unit = fc_tab1.basedata.unitCode;
	post.Sec = fc_tab1.basedata.sec;
	post.No = fc_tab1.basedata.landNo;
	
	$("#owner_1").empty();
	$("#owner_1").append('資料讀取中...');
	$("#owner_2").empty();
	$("#owner_2").append('資料讀取中...');
	
	$("#ownerdata").modal('show');

	var mgmt = '';
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetPublicLandQuery",
		type: "Post",
		data: post,
		success: function(data) {
			var jdata = JSON.parse(data);
			if (jdata.STATUS == 1) {
				var d = jdata.RESPONSE;

				if (d.length > 0) {
					d = d[0];
					
					if (d.PUBLIC && d.PUBLIC.OWNER.length > 0) {
						var tar = d.PUBLIC.OWNER[0];
						
						if (tar.MGMT.length > 0) {
							mgmt = tar.MGMT[0].LNAME;
						}
					}
				}
				fc_tab1_api2(mgmt);
			}
			else
			{
				$("#owner_1").empty();
				$("#owner_1").append('<label style="font-weifgt:600; font-size: 18px;">資料介接發生錯誤，請稍後再試！</label>');
				$("#owner_2").empty();
				$("#owner_2").append('<label style="font-weifgt:600; font-size: 18px;">資料介接發生錯誤，請稍後再試！</label>');
			}
		}
	});
}
function fc_tab1_api2(mgmt) {
	var post = {};
	post.Unit = fc_tab1.basedata.unitCode;
	post.Sec = fc_tab1.basedata.sec;
	post.No = fc_tab1.basedata.landNo;
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetOwnerData",
		type: "Post",
		data: post,
		success: function(data) {
			var jdata = JSON.parse(data);
			if (jdata.STATUS == 1) {
				var d = jdata.RESPONSE;
				
				var findcount = 0;
				
				$("#owner_1").empty();
				
				for (var i = 0; i < d.length; i++) {
					if (d[i].LANDOWNERSHIP) {
						var od = d[i].LANDOWNERSHIP[0];
						
						var tmp1 = "<div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">所有權登記次序</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.OWRNO ? htmlEncode(od.OWRNO) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">權利人類別</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.OWNER.LTYPE ? fc_tab1_getQueryObligeeType(od.OWNER.LTYPE) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">權利人</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.OWNER.LNAME ? htmlEncode(od.OWNER.LNAME) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">管理機關</div>';
						tmp1 += '<div class="detail_rows_value">' + (mgmt ? htmlEncode(mgmt) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">登記日期</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.RDATE ? htmlEncode(od.RDATE) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">登記原因</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.REASON ? fc_tab1_getQueryReason(od.REASON, htmlEncode(fc_tab1.basedata.unit[0])) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">登記原因發生日期</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.REASONDATE ? htmlEncode(od.REASONDATE) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">權利範圍類別</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.RIGHT ? htmlEncode(fc_tab1_getQueryRights(od.RIGHT)) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">權利範圍分母</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.DENOMINATOR ? htmlEncode(od.DENOMINATOR) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">權利範圍分子</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.NUMERATOR ? htmlEncode(od.NUMERATOR) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += "</div><hr/>";
						
						$("#owner_1").append(tmp1);
						
						findcount++;
					}
				}
				
				if (findcount == 0) {
					$("#owner_1").append('<label style="font-weifgt:600; font-size: 18px;">查無相關權屬資訊！</label>');
				}
			}
			else {
				$("#owner_1").empty();
				$("#owner_1").append('<label style="font-weifgt:600; font-size: 18px;">資料介接發生錯誤，請稍後再試！</label>');
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetTransOwnerData",
		type: "Post",
		data: post,
		success: function(data) {
			var jdata = JSON.parse(data);
			if (jdata.STATUS == 1) {
				var d = jdata.RESPONSE;
				
				var findcount = 0;
				
				$("#owner_2").empty();
				
				for (var i = 0; i < d.length; i++) {
					if (d[i].INDEX) {
						var od = d[i].INDEX[0];
						
						var tmp1 = "<div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">異動別</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.CHANGETYPE ? htmlEncode(od.CHANGETYPE) : '')  + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">案件異動日期</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.CHANGEDATE ? htmlEncode(od.CHANGEDATE) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">登記日期</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.RDATE ? htmlEncode(od.RDATE) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">登記原因</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.REASON ? htmlEncode(fc_tab1_getQueryReason(od.REASON, fc_tab1.basedata.unit[0])) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">收件年期</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.RECEIVEYEAR ? htmlEncode(od.RECEIVEYEAR) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += "</div><hr/>";
						
						$("#owner_2").append(tmp1);
						
						findcount++;
					}
				}
				
				if (findcount == 0) {
					$("#owner_2").append('<label style="font-weifgt:600; font-size: 18px;">查無相關權屬資訊！</label>');
				}
			}
			else {
				$("#owner_2").empty();
				$("#owner_2").append('<label style="font-weifgt:600; font-size: 18px;">資料介接發生錯誤，請稍後再試！</label>');
			}
		}
	});
}
function fc_tab1_owner_close() {
	$("#ownerdata").modal('hide');
}

function fc_tab1_getApiCode() {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetQueryReason",
		type: "Post",
		success: function(data) {
			var jdata = JSON.parse(data);
			if (jdata.STATUS == 1) {
				var d = jdata.RESPONSE;

				fc_tab1.QueryReason = d;
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetQueryObligeeType",
		type: "Post",
		success: function(data) {
			var jdata = JSON.parse(data);
			if (jdata.STATUS == 1) {
				var d = jdata.RESPONSE;

				fc_tab1.QueryObligeeType = d;
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetQueryRights",
		type: "Post",
		success: function(data) {
			var jdata = JSON.parse(data);
			if (jdata.STATUS == 1) {
				var d = jdata.RESPONSE;

				fc_tab1.QueryRights = d;
			}
		}
	});
}

function fc_tab1_getQueryReason(code, city) {
	var result = '';
	var data = fc_tab1.QueryReason;

	if (!data) return result;

	var tar;
	for (var i = 0; i < data.length; i++) {
		if (data[i].CITY == city) {
			tar = data[i].DATA;
			break;
		}
	}

	if (!tar) return result;

	for (var i = 0; i < tar.length; i++) {
		if (tar[i].CODE == code) {
			result = tar[i].NAME;
			break;
		}
	}

	return result;
}

function fc_tab1_getQueryObligeeType(code) {
	var result = '';
	var data = fc_tab1.QueryObligeeType;

	if (!data) return result;

	for (var i = 0; i < data.length; i++) {
		if (data[i].CODE == code) {
			result = data[i].NAME;
			break;
		}
	}

	return result;
}

function fc_tab1_getQueryRights(code) {
	var result = '';
	var data = fc_tab1.QueryRights;

	if (!data) return result;

	for (var i = 0; i < data.length; i++) {
		if (data[i].CODE == code) {
			result = data[i].NAME;
			break;
		}
	}

	return result;
}

function toCurrency(num){
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

function fc_tab1_downloadASSshp() {
	if (!fc_tab1_nowSelect) return;
	
	var post = {};
	post.Sid = fc_tab1_nowSelect;
	post.ShpName = fc_tab1.basedata.county + fc_tab1.basedata.town + fc_tab1.basedata.landname;
	post.FileName = "地段範圍";
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "InfoOverView/ExportSecShp",
		data: post,
		type: "Post",
		success: function(data) {
			WaitingShow(false);
			if (data.data && typeof(data.data) == 'string') {
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
			}
		}
	});
}

function fc_tab1_getFcNotification() {
	$('#fi_notification_body').empty();
	
	var post = {};
	post.Fcid = fc_tab1_nowSelect;
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetFcNotificationList",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				var list = d.list;
				
				for (var i = 0; i < list.length; i++) {
					var tmp = "";
					tmp += "<tr>";
					tmp += '<td>' + htmlEncode(list[i].createTime) + '</td>';
					tmp += '<td>' + htmlEncode(list[i].userName) + '</td>';
					
					tmp += '<td style="max-width: 400px; overflow:hidden;"><span id="EDITION_SPAN' + list[i].sid + '" class="NOTEEDIT" style="width: 400px; overflow-wrap: break-word; display: block; padding: 0px !important;">' + htmlEncode(list[i].note) + '</span><textarea id="EDITION_' + list[i].sid + '" rows="2" class="ISEDIT form-control" style="width: 400px;display: none;">' + htmlEncode(list[i].note) + '</textarea></td>';
					
					if (list[i].canEdit == true)
					{
						tmp += '<td class="NOTEEDIT NOTEEDIT_' + list[i].sid + '"><button type="button" class="btn btn-success custom_bt4" onclick="fc_tab1_notification_toedit(' + list[i].sid + ');">編輯</button><button type="button" class="btn btn-danger custom_bt4" onclick="fc_tab1_notification_delete(' + list[i].sid + ');">刪除</button></td>';
						tmp += '<td class="ISEDIT ISEDIT_' + list[i].sid + '" style="display: none;"><button type="button" class="btn btn-warning custom_bt4" onclick="fc_tab1_notification_cancel();">取消</button><button type="button" class="btn btn-success custom_bt4" onclick="fc_tab1_notification_edit(' + list[i].sid + ');">儲存</button></td>';
					}
					else
					{
						tmp += '<td></td>';
					}
					tmp += "</tr>";
					
					$('#fi_notification_body').append(tmp);
				}
				$('#fi_note_bt').text('資料註記(' + list.length + ')');
			}
		}
	});
}

function fc_tab1_notification_add() {
	var newtr = $('.ADD_NEW').length;
	if (newtr > 0) return;
	
	var tmp = "";
	tmp += '<tr class="ADD_NEW">';
	tmp += '<td></td>';
	tmp += '<td></td>';
	
	tmp += '<td style="max-width: 400px;"><textarea id="ADD_NEW" rows="2" class="form-control" style="width: 400px;"></textarea></td>';
	tmp += '<td><button type="button" class="btn btn-warning custom_bt5" onclick="fc_tab1_notification_add_cancel();">取消</button><button type="button" class="btn btn-success custom_bt5" onclick="fc_tab1_notification_add_new();">儲存</button></td>';

	tmp += "</tr>";
	
	$('#fi_notification_body').append(tmp);
	
	$('.custom_bt4').attr('disabled', true);
}

function fc_tab1_notification_add_new() {
	var post = {};
	post.LandCode = fc_tab1.basedata.landCode;
	post.Fcid = fc_tab1_nowSelect;
	post.Note = $('#ADD_NEW').val();
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/AddNewFcNotificationItem",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data && typeof(data.data) == 'string') {
				if (data.data == 'OK') {
					alert('新增成功.');
					fc_tab1_getFcNotification();
					$('.custom_bt4').attr('disabled', true);
				}
				else {
					alert('新增失敗.');
				}
			}
		}
	});
}

function fc_tab1_notification_add_cancel() {
	$(".ADD_NEW").remove();
	$('.custom_bt4').attr('disabled', false);
}

function fc_tab1_notification_toedit(sid) {
	fc_tab1_notification_cancel();
	$('.NOTEEDIT_' + sid).hide();
	$('.ISEDIT_' + sid).show();
	$('#EDITION_SPAN' + sid).hide();
	$('#EDITION_' + sid).show();
	$('#not_add_btn').attr("disabled", true);
}

function fc_tab1_notification_edit(sid) {
	var post = {};
	post.Sid = sid;
	post.Note = $('#EDITION_' + sid).val();
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/EditFcNotificationItem",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data && typeof(data.data) == 'string') {
				if (data.data == 'OK') {
					alert('編輯成功.');
					fc_tab1_getFcNotification();
					$('#not_add_btn').attr("disabled", false);
				}
				else {
					alert('編輯失敗.');
				}
			}
		}
	});
}

function fc_tab1_notification_delete(sid) {
	var post = {};
	post.Sid = sid;
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/DeleteFcNotificationItem",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data && typeof(data.data) == 'string') {
				if (data.data == 'OK') {
					alert('刪除成功.');
					fc_tab1_getFcNotification();
				}
				else {
					alert('刪除失敗.');
				}
			}
		}
	});
}

function fc_tab1_notification_cancel() {
	$('.NOTEEDIT').show();
	$('.ISEDIT').hide();
	$('#not_add_btn').attr("disabled", false);
}

function fc_tab1_notification() {
	$('#fcnotificationdata').modal('show');
}

function fc_tab1_notification_close() {
	$('#fcnotificationdata').modal('hide');
}

// fc tab5

function fc_tab5_getFcNotification() {
	$('#fi_notification_body').empty();
	
	var post = {};
	post.Fcid = fi_tab5_nowSelect;
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetFcNotificationList",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				var list = d.list;
				
				for (var i = 0; i < list.length; i++) {
					var tmp = "";
					tmp += "<tr>";
					tmp += '<td>' + htmlEncode(list[i].createTime) + '</td>';
					tmp += '<td>' + htmlEncode(list[i].userName) + '</td>';
					
					tmp += '<td style="max-width: 400px; overflow: hidden;"><span id="EDITION_SPAN' + list[i].sid + '" class="NOTEEDIT" style="width: 400px; overflow-wrap: break-word; display: block; padding: 0px !important;">' + htmlEncode(list[i].note) + '</span><textarea id="EDITION_' + list[i].sid + '" rows="2" class="ISEDIT form-control" style="width: 400px;display: none;">' + htmlEncode(list[i].note) + '</textarea></td>';
					
					if (list[i].canEdit == true)
					{
						tmp += '<td class="NOTEEDIT NOTEEDIT_' + list[i].sid + '"><button type="button" class="btn btn-success custom_bt4" onclick="fc_tab5_notification_toedit(' + list[i].sid + ');">編輯</button><button type="button" class="btn btn-danger custom_bt4" onclick="fc_tab5_notification_delete(' + list[i].sid + ');">刪除</button></td>';
						tmp += '<td class="ISEDIT ISEDIT_' + list[i].sid + '" style="display: none;"><button type="button" class="btn btn-warning custom_bt4" onclick="fc_tab5_notification_cancel();">取消</button><button type="button" class="btn btn-success custom_bt4" onclick="fc_tab5_notification_edit(' + list[i].sid + ');">儲存</button></td>';
					}
					else
					{
						tmp += '<td></td>';
					}
					tmp += "</tr>";
					
					$('#fi_notification_body').append(tmp);
				}
				$('#fi_note_bt').text('資料註記(' + list.length + ')');
			}
		}
	});
}

function fc_tab5_notification_add() {
	var newtr = $('.ADD_NEW').length;
	if (newtr > 0) return;
	
	var tmp = "";
	tmp += '<tr class="ADD_NEW">';
	tmp += '<td></td>';
	tmp += '<td></td>';
	
	tmp += '<td><textarea id="ADD_NEW" class="form-control form-control" rows="2" style="width: 400px;"></textarea></td>';
	tmp += '<td><button type="button" class="btn btn-warning custom_bt5" onclick="fc_tab5_notification_add_cancel();">取消</button><button type="button" class="btn btn-success custom_bt5" onclick="fc_tab5_notification_add_new();">儲存</button></td>';

	tmp += "</tr>";
	
	$('#fi_notification_body').append(tmp);
	$('.custom_bt4').attr('disabled', true);
}

function fc_tab5_notification_add_new() {
	var post = {};
	post.LandCode = fi_tab5.basedata.landCode;
	post.Fcid = fi_tab5_nowSelect;
	post.Note = $('#ADD_NEW').val();
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/AddNewFcNotificationItem",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data && typeof(data.data) == 'string') {
				if (data.data == 'OK') {
					alert('新增成功.');
					fc_tab5_getFcNotification();
					$('.custom_bt4').attr('disabled', false);
				}
				else {
					alert('新增失敗.');
				}
			}
		}
	});
}

function fc_tab5_notification_add_cancel() {
	$(".ADD_NEW").remove();
	$('.custom_bt4').attr('disabled', false);
}

function fc_tab5_notification_toedit(sid) {
	fc_tab5_notification_cancel();
	$('.NOTEEDIT_' + sid).hide();
	$('.ISEDIT_' + sid).show();
	$('#EDITION_SPAN' + sid).hide();
	$('#EDITION_' + sid).show();
	$('#not_add_btn').attr("disabled", true);
}

function fc_tab5_notification_edit(sid) {
	var post = {};
	post.Sid = sid;
	post.Note = $('#EDITION_' + sid).val();
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/EditFcNotificationItem",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data && typeof(data.data) == 'string') {
				if (data.data == 'OK') {
					alert('編輯成功.');
					fc_tab5_getFcNotification();
					$('#not_add_btn').attr("disabled", false);
				}
				else {
					alert('編輯失敗.');
				}
			}
		}
	});
}

function fc_tab5_notification_delete(sid) {
	var post = {};
	post.Sid = sid;
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/DeleteFcNotificationItem",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data && typeof(data.data) == 'string') {
				if (data.data == 'OK') {
					alert('刪除成功.');
					fc_tab5_getFcNotification();
				}
				else {
					alert('刪除失敗.');
				}
			}
		}
	});
}

function fc_tab5_notification_cancel() {
	$('.NOTEEDIT').show();
	$('.ISEDIT').hide();
	$('#not_add_btn').attr("disabled", false);
}

function fc_tab5_notification() {
	$('#fcnotificationdata').modal('show');
}

function fc_tab5_notification_close() {
	$('#fcnotificationdata').modal('hide');
}