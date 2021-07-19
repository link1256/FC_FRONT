//地籍管理-功能頁籤
$("search_type.fc_manage").children().on("click",function(){
	$(this).parent().children().removeClass("active");
	$(this).addClass("active");
});

//子功能頁籤
function step_tab()
{
	$(".fc_manage_tab3 .nav-item3").on("click",function(){
		 		  
		  for(j = 1; j < 4; j++){
			  if($(this).hasClass("tab"+j)){
				  if(j==1){
					 if($(this).parent().find(".active").hasClass("tab2")){
						  let c = confirm("確定回到上一步? 將會喪失已比對完成的結果");
                          if(c){
							  upload_step(3,j);
						  }							
						  else{
							  return;
						  }
					  } 
				  }
				  if(j==2){
					  if($(this).parent().find(".active").hasClass("tab2")){
						  return;
					  }
					  let t = $('#file_list input[name=file_selected]:checked').val();
					  if(!t){
						  alert("請選取上傳檔案!");
						  return;
					  }
					  StartParsingShpFile(t);
					  upload_step(3,j);
				  }
				  if(j==3){
					  if($(this).parent().find(".active").hasClass("tab1")){
						  return;
					  }
					  
					  //to do要將執行結果的方法寫在這裡
					  if($(this).parent().find(".active").hasClass("tab2")){
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
	$(".upload_step.tab"+i).load("./views/fc_manage_tab"+i+"_step"+j+".html"); 
}

function fc_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab"+i).load("./views/fc_manage_tab"+i+".html"); 
	
	 setTimeout(function(){
	if(i> 2){
		upload_step(i,1);
	}
	   },100);
	
}
 
//批次匯入 START
function GetFileList() {
	$.get(ApiRequestURL + "ImportFile/GetUploadShpFileList", function(data) {
		var rdata = data.data;
		for (var i = 0; i < rdata.length; i++) {
			var appendtr = "";
			appendtr += "<tr class=\"align-middle\">";
			appendtr += "<td>" + rdata[i].no + "</td>";
			appendtr += "<td>" + rdata[i].name + "</td>";
			appendtr += "<td>" + parseInt(rdata[i].megaByte) + "MB</td>";
			appendtr += "<td>" + (rdata[i].completeness == true ? "可執行" : "不可執行") + "</td>";
			appendtr += "<td>" + formatDateTime_Date(rdata[i].lastWriteTime) + "</td>";
			//選取後再執行
			appendtr += "<td><input type=\"radio\" class=\"form-check-input file_selected\" name=\"file_selected\" value=\"" + rdata[i].name + "\"></td>";
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
				appendtr += "<td>" + rdata.city + "</td>";
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
						appendtr2 += "<td>" + cmdata[i].no + "</td>";
						appendtr2 += "<td>" + cmdata[i].landCode + "</td>";
						appendtr2 += "<td>" + cmdata[i].townName + "</td>";
						appendtr2 += "<td>" + cmdata[i].landName + "</td>";
						appendtr2 += "<td>" + cmdata[i].regArea + "</td>";
						appendtr2 += "<td>" + cmdata[i].state + "</td>";
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
		"<td>" + (tar.length > 0 ? tar[0].userName : "") + "</td></tr>"
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
			appendtr += "<td>" + rdata[i].no + "</td>";
			appendtr += "<td>" + rdata[i].year + "</td>";
			appendtr += "<td>" + rdata[i].month + "</td>";
			appendtr += "<td>" + formatDateTime_Date(rdata[i].createTime) + "</td>";
			appendtr += "<td>" + rdata[i].spaceCounty + "</td>";
			appendtr += "<td>" + rdata[i].spaceCompare + "</td>";
			appendtr += "<td>" + rdata[i].spaceChange + "</td>";
			appendtr += "<td>" + rdata[i].ownerCompare + "</td>";
			appendtr += "<td>" + rdata[i].ownerChange + "</td>";
			appendtr += "<td>" + formatDateTime_Time(rdata[i].updateTime) + "</td>";
			appendtr += "<td>" + rdata[i].updateName + "</td>";
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

function UpdateVersion() {
	
}

//版次管理 END


//資料總覽 START
function Detail_fc(){
	
	
}

function Relation_fi(){
	
	
}

function tab_click(){
	$(".fi_tab_content").hide();
	$(".fi_tab").on("click",function(){
		if($(this).hasClass("active")){
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
function fc_tab1_init() {
	fc_tab1.map = map('mmap', true, false);
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select();
	SelectSingleClick.on("select", fc_tab1_feature_click);
	fc_tab1.map.addInteraction(SelectSingleClick);
	fc_tab1.SelectSingleClick = SelectSingleClick;
	
	fc_tab1_getCountyList();
	tab_click();
	
	// optionactive("fc_tab1_list");
	// $("#fi_tab_list1").click();
}
function fc_tab1_getCountyList() {
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
function fc_tab1_getTownList() {
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
				$("#search_sec").empty();
				$("#search_sec").append('<option selected value="-1">不指定</option>');
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
function fc_tab1_queryLandList() {
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var sec = $("#search_sec").val();
	var pm = $("#search_number1").val();
	var pc = $("#search_number2").val();
	
	var post = {};
	if (county != "-1") post.CountyCode = county;
	if (town != "-1") post.TownCode = town;
	if (sec != "-1") post.LandCode = sec;
	if (pm != "") post.PmNo = pm;
	if (pc != "") post.PcNo = pc;
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/QueryLandList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#fc_tab1_list").empty();
				if (d.length == 0) {
					
				}
				else {
					for (var i = 0; i < d.length; i++) {
						var text = '<tr id="' + d[i].sid + '" onclick="fc_tab1_searchlistClick(this);">';
						text += '<td>' + d[i].townName + '</td>';
						text += '<td>' + d[i].landName + '</td>';
						text += '<td>' + d[i].pm_pc + '</td>';
						text += '</tr>';
						$("#fc_tab1_list").append(text);
					}
				}
			}
		}
	});
}
function fc_tab1_searchlistClick(that) {
	$("#fc_tab1_list tr").removeClass("active");
	$(that).addClass("active");
	
	var id = that.id;
	
	var post = {};
	post.Sid = id;
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/QueryTargetLand",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;

				var basedata = d.baseData;
				var text = "";
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">地籍編碼</div>';
				text += '<div class="detail_rows_value">' + basedata.landCode + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">登記面積</div>';
				text += '<div class="detail_rows_value">' + basedata.area_ha + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">登記日期</div>';
				text += '<div class="detail_rows_value">' + basedata.regDate + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">使用分區</div>';
				text += '<div class="detail_rows_value">' + basedata.zoningName + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">使用類別</div>';
				text += '<div class="detail_rows_value">' + basedata.lcLassName + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">更新日期</div>';
				text += '<div class="detail_rows_value">' + basedata.updateTime + '</div>';
				text += '</div>';
				
				$("#fc_main_data").empty();
				$("#fc_main_data").append(text);
				
				var ownerdata = d.ownerData;
				$("#fc_owner_data").empty();
				for (var i = 0; i < ownerdata.length; i++) {
					var tmp = "";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">登記次序</div>';
					tmp += '<div class="detail_rows_value">' + ownerdata[i].regOrder + '</div>';
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">權利分子</div>';
					tmp += '<div class="detail_rows_value">' + ownerdata[i].ratioS + '</div>';
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">權利分母</div>';
					tmp += '<div class="detail_rows_value">' + ownerdata[i].ratioM + '</div>';
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">權別</div>';
					tmp += '<div class="detail_rows_value">' + ownerdata[i].typeName + '</div>';
					tmp += "</div>";
					
					tmp += '<div class="detail_rows">';
					tmp += '<div class="detail_rows_name">單位</div>';
					tmp += '<div class="detail_rows_value">' + ownerdata[i].manager + '</div>';
					tmp += "</div>";
					
					$("#fc_owner_data").append(tmp);
				}
				
				var forestdata = d.forestData;
				$("#type1_amount").empty();
				$("#type1_amount").append("共" + forestdata.length + "筆");
				
				$("#type1_list").empty();
				for (var i = 0; i < forestdata.length; i++) {
					var tmp = "";
					
					tmp += '<tr id="list_item_' + forestdata[i].sid + '" onclick="fc_tab1_item_click(this);">';
					tmp += '<td>' + forestdata[i].distName + '</td>';
					tmp += '<td>' + forestdata[i].weildName + '</td>';
					tmp += '<td>' + forestdata[i].cmpt + '林班</td>';
					tmp += "</tr>";
					
					$("#type1_list").append(tmp);
				}
				
				var protectiondata = d.protectionData;
				$("#type2_amount").empty();
				$("#type2_amount").append("共" + protectiondata.length + "筆");
				
				$("#type2_list").empty();
				for (var i = 0; i < protectiondata.length; i++) {
					var tmp = "";
					
					tmp += '<tr id="list_item_' + protectiondata[i].sid + '" onclick="fc_tab1_item_click(this);">';
					tmp += '<td>' + protectiondata[i].distName + '</td>';
					tmp += '<td>' + protectiondata[i].pfName + '</td>';
					tmp += '<td>' + protectiondata[i].pfid + '號</td>';
					tmp += "</tr>";
					
					$("#type2_list").append(tmp);
				}
				
				var recreationData = d.recreationData;
				$("#type3_amount").empty();
				$("#type3_amount").append("共" + recreationData.length + "筆");
				
				$("#type3_list").empty();
				for (var i = 0; i < recreationData.length; i++) {
					var tmp = "";
					
					tmp += '<tr id="list_item_' + recreationData[i].sid + '" onclick="fc_tab1_item_click(this);">';
					tmp += '<td>' + recreationData[i].distName + '</td>';
					tmp += '<td>' + recreationData[i].reName + '</td>';
					tmp += "</tr>";
					
					$("#type3_list").append(tmp);
				}
				
				var researchData = d.researchData;
				$("#type4_amount").empty();
				$("#type4_amount").append("共" + researchData.length + "筆");
				
				$("#type4_list").empty();
				for (var i = 0; i < researchData.length; i++) {
					var tmp = "";
					
					tmp += '<tr id="list_item_' + researchData[i].sid + '" onclick="fc_tab1_item_click(this);">';
					tmp += '<td>' + researchData[i].name + '</td>';
					tmp += '<td>' + researchData[i].manager + '</td>';
					tmp += "</tr>";
					
					$("#type4_list").append(tmp);
				}
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetAssociateLandMaps",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				fc_tab1.map.geomvector_source.clear();
				
				// 畫關聯圖徵
				var style =	new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(113, 183, 183, 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(0, 48, 97, 1)",
						width: 2,
					}),
				  });
				 
				var forest = d.forestMaps;
				for (var i = 0; i < forest.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(forest[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = forest[i].sid;
					
					feature.setStyle(style);
					fc_tab1.map.geomvector_source.addFeature(feature);
				}
				
				var protection = d.protectionMaps;
				for (var i = 0; i < protection.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(protection[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = protection[i].sid;
					
					feature.setStyle(style);
					fc_tab1.map.geomvector_source.addFeature(feature);
				}
				
				var recreation = d.recreationMaps;
				for (var i = 0; i < recreation.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(recreation[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = recreation[i].sid;
					
					feature.setStyle(style);
					fc_tab1.map.geomvector_source.addFeature(feature);
				}
				
				var research = d.researchMaps;
				for (var i = 0; i < research.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(research[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.sid = research[i].sid;
					
					feature.setStyle(style);
					fc_tab1.map.geomvector_source.addFeature(feature);
				}
				
				// 畫自己本身圖徵
				var basemap = d.baseMap;
				var selfstyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(235, 0, 0, 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(148, 0, 0, 1)",
						width: 2,
					}),
				});
				var format = new ol.format.WKT();
				var feature = format.readFeature(basemap.wkt);
				feature.getGeometry().transform("EPSG:4326", "EPSG:3857");

				feature.setStyle(selfstyle);
				fc_tab1.map.geomvector_source.addFeature(feature);
				
				fc_tab1.map.getView().fit(feature.getGeometry().getExtent());
			}
		}
	});
}
// 地圖點擊HighLight事件
function fc_tab1_feature_click(e) {
	$(".fc_tab1_associate tr").removeClass("active");
	if (e.selected.length == 1) {
		if (e.selected[0].sid) {
			$("#list_item_" + e.selected[0].sid).addClass("active");
			
			var slide = $("#list_item_" + e.selected[0].sid).parent().parent();
			if (!$(slide).hasClass('active')) {
				$(".fi_tab").removeClass("active");
				$(slide.parent().find(".fi_tab")).addClass("active");
				$(".fi_tab_content").slideUp().removeClass("active");
				slide.addClass("active").slideDown();
			}
		}
	}
}
// Table點擊HighLight事件
function fc_tab1_item_click(that) {
	$(".fc_tab1_associate tr").removeClass("active");
	$(that).addClass("active");
	
	var starid = that.id.split("_");
	var sid = starid[starid.length - 1];
	
	var features = fc_tab1.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].sid == sid) {
			feature = features[i];
			break;
		}
	}
	if (feature) {
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
		var wkt = format.writeFeature(features[i], {
			dataProjection: "EPSG:3857",
			featureProjection: "EPSG:3826"
		});
		wkts.push(wkt);
	}
	
	if (wkts.length > 0) {
		var post = {};
		post.Wkts = wkts;
		
		$.ajax({
			url: ApiRequestURL + "InfoOverView/DownloadQueryShp",
			type: "Post",
			data: post,
			success: function(data) {
				if (data.data) {
					var guid = data.data;
					var a = document.createElement("a");
					a.href = DonwLoadExportURL + guid + ".zip";
					a.click();
					document.remove(a);
				}
			}
		});
	}
}
function fc_tab1_reset() {
	$("#search_county").val("-1");
	$("#search_town").val("-1");
	$("#search_sec").val("-1");
	$("#search_number1").val("");
	$("#search_number2").val("");
}
function fc_tab1_api() {
	
}