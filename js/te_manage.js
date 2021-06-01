
function te_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab" + i).load("./views/te_manage_tab"+i+".html"); 
	
	
}

//子功能頁籤
function step_tab()
{
	$(".te_manage_tab2 .nav-item3:not(.active)").on("click",function(){
		 		  
		  for(j = 1; j < 4; j++){
			  if($(this).hasClass("tab"+j)){
				  if(j==1){
					  if($(this).parent().find(".active").hasClass("tab2")){
						  return;
					  }
					  else{
						  create_step(2,j);	
					  }
					  				  
				  }
				  else if(j==2){
					  if($(this).parent().find(".active").hasClass("tab2")){
						  return;
					  }
					  else{
						  if($(this).parent().find(".active").hasClass("tab3")){
							create_step(2,j);  
						  }
						  else{
							   if(confirm("是否建立新異動?")){
							InsertNewChangeEvent();
			                create_step(2,j);
						
		                  }
				          else{
					           return;
				              }
						  }						 		
					  }                 			  
				  }
				  else if(j==3){
                      create_step(2,j);
					  
				  }				 
			  }
		  }		  
		  $(this).parent().children().removeClass("active");
		  $(this).addClass("active");
	  });		
}

function create_step(i,j)
{

	$("#te_step").empty();
	$("#te_step").load("./views/te_manage_tab"+i+"_step"+j+".html"); 
}

function checkSentApply(){
	if($("#te_data_basic_state").hasClass("state_type1")){
		$(".manage_bt_area").show();		
	}
	else {
		$(".manage_bt_area").hide();
	}
}

var nowloadDetialData = null;
function loadDetialData(id){
	/* 先塞測試用資料，需要改寫 */
	//讀取資料
	$(".data_frame").empty().load("./views/detail_data_temp.html?rnd=" + Math.round(Math.random()*10000));
	
	var post = {};
	post.Uid = id;
	nowloadDetialData = id;
	
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/GetTargetChangeEventInfo",
	  type: "Post",
	  data: post,
	  async: false,
	  success: function(data) {
		var data = data.data;
		
		setTimeout(function() {
			//狀態
			var stat = "";
			if (data.sent == "False")
				stat = "未送審";
			else if (data.checkTime != "" && data.checkUserName != "")
			{
				stat = "已完成";
				$(".normal_state").hide();
			}
			else
			{
				stat = "已送審";
				$(".normal_state").hide();
			}
			
			$("#te_data_basic_state").addClass("state_type1").text(stat);
			//識別碼
			$("#te_data_basic_uid").text(data.uid);
			//建立者
			$("#te_data_basic_createuser").text(data.createUserName);
			//建立時間
			$("#te_data_basic_createtime").text(data.createTime);
			//所屬單位	
			$("#te_data_basic_deptart").text(data.distName);
			//標題
			$("#te_data_basic_title").val(data.title);
			//說明
			$("#te_data_basic_note").val(data.note);
			//最後編輯者
			$("#te_data_basic_updateuser").text(data.updateUserName);
			//最後編輯時間
			$("#te_data_basic_updatetime").text(data.updateTime);
			//附件列表
			var files = data.files;
			$("#file_list").innerHTML = "";
			for (i = 0 ; i < files.length; i++){
			  var item =
			  "<div class='file_list_item'>"+
			  "<a href='" + DownLoadURL + files[i].savename + "'><i class='fas fa-file-alt'></i>"+ files[i].filename +"</a>"+
			  "<button type='button' class='btn btn-danger file_list_item_delete' onclick=\"PushDFile('" + files[i].fileId + "', this)\">刪除</button>"+
			  "</div>"
							
			  $("#file_list").append(item);	
			}
		}, 50);
	  }
	});
}

function loadListData(fmtid){
	/* 先塞測試用資料，需要改寫 */
	//讀取RELATION資料
		
		$(".list_frame").empty().load("./views/list_data_temp.html"); //模板
		
		let type1 = "國有林事業區";
		let type2 = "保安林";
		
		let edit_type1 = "新增";
		let edit_type2 = "編修";
		let edit_type3 = "刪除";

		setTimeout(function(){
			
		var rows;      
		var FM_ID;
		
		for(i=1;i < 4;i++){
			FM_ID = 'FM'+i;
		if(i==3){
			rows = "<tr  id='"+ FM_ID +"'><td width='15%'>"+ i +"</td>" +
	           "<td width='35%' class='typeid'>"+ type1 +"</td>" +
		       "<td width='30%'>"+ edit_type3 +"</td>"+
	           "<td width='30%'><button type='button' class='btn btn-danger search_submit custom_bt3 manage_bt_area' onclick='doRemove("+ FM_ID +")'>移除</button></td></tr>";
             $("#list_table").append(rows);	
		}
		else{
			rows = "<tr id='"+ FM_ID +"'><td width='15%'>"+ i +"</td>" +
	            "<td width='35%' class='typeid'>"+ type1 +"</td>" +
		       "<td width='30%'>"+ edit_type2 +"</td>"+
	           "<td width='30%'><button type='button' class='btn btn-warning search_submit custom_bt3 manage_bt_area' onclick='doEdit("+ FM_ID +")'>編輯</button></td></tr>";
           $("#list_table").append(rows);	
		}
		
		}
		
		for(i=4;i < 7;i++){
			FM_ID = 'FM'+i;
		if(i==6){
			rows = "<tr id='"+ FM_ID +"'><td width='15%'>"+ i +"</td>" +
	           "<td width='35%' class='typeid'>"+ type2 +"</td>" +
		       "<td width='30%'>"+ edit_type3 +"</td>"+
	           "<td width='30%'><button type='button' class='btn btn-danger search_submit custom_bt3 manage_bt_area' onclick='doRemove("+ FM_ID +")'>移除</button></td></tr>";
             $("#list_table").append(rows);	
		}
		
		else{
			rows = "<tr id='"+ FM_ID +"'><td width='15%'>"+ i +"</td>" +
	            "<td width='35%' class='typeid'>"+ type2 +"</td>" +
		       "<td width='30%'>"+ edit_type2 +"</td>"+
	           "<td width='30%'><button type='button' class='btn btn-warning search_submit custom_bt3 manage_bt_area' onclick='doEdit("+ FM_ID +")'>編輯</button></td></tr>";
           $("#list_table").append(rows);	
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
			FM_detail('list_detail',typeid,fmid);
		});
			
		},50);
				
}

function newApplyDetail(){
	//建立者
	$("#te_data_basic_new_createuser").text(Logindata.name);
	//建立時間		
	$("#te_data_basic_new_createtime").text(GetDateNow());
	//所屬單位	
	$("#te_data_basic_new_deptart").text(Logindata.deptName);
}

function FM_detail(target,typeid,fmid)//圖資屬性資料
{
	$("#"+target).empty();
	//資料分成國有林事業區及保安林
	if(typeid === "國有林事業區"){
		var DIST="新竹林區管理處";
		var WKNG="烏來";
		var CMPT="3";
		var AREA_HA='230.00';
		var UPDATETIME = "2021/05/21";
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
		"<div class='detail_rows_value'>"+ AREA_HA +"</div>"+
		"</div>";
		
		detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>最後更新時間</div>"+
		"<div class='detail_rows_value'>"+ UPDATETIME +"</div>"+
		"</div>";
				
		
		$("#"+target).append(detail);
		
	}
	else if(typeid === "保安林"){
		
		var DIST="新竹林區管理處";
		var PF_ID="1123";
		var PFTYPE="水源涵養保安林";
		var AREA_HA='230.00';
		var EDITION=""
		var UPDATETIME = "2021/05/21";
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
		"<div class='detail_rows_value'>"+ AREA_HA +"</div>"+
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
				
		
		$("#list_detail").append(detail);
	}
	
}

var insertmap;
function doCreate()//新增圖資
{
	$('#NewPageview').modal('show');
	SelectType(1,1);
	setTimeout(function(){
	   $("#mmapmodal").after("<div id='mouse_position'></div>");
       insertmap = map('mmapmodal',false,false);
	   
		},280);
    		
}

function doCreate_next(){
	setTimeout(function(){
	   $("#mouse_position").remove();
       doEdit();
	   
		},280)
}

function doEdit(fmid)//編輯圖資
{
	$('#EditPageview').modal('show');
	setTimeout(function(){
	   let fmid = $(this).attr('id');
	   let typeid = "國有林事業區";
	   FM_detail('fm_data_edit',typeid,fmid);	
		
       map('mmapmodalEdit',true,false);
	   
		},280)
	
}

function doRemove(fmid)//移除待異動圖資
{
	confirm("確定要移除本項異動?");
}

function SaveEdit_fm()//執行資料更新
{
	if(confirm("確定儲存目前編輯?")){
		$('#EditPageview').modal('hide');
	}
	
}

function AbandonEdit()//放棄儲存
{
    if(confirm("確定放棄目前編輯?")){
		$('#EditPageview').modal('hide');
	}	
}

function SelectType(type,edit_type)//選擇圖資及編輯類型
{
 
  function change(type1,edit_type1){
	  if(edit_type1 == 3){
		  $(".CreateNew").hide();
		   if(type1 == 1){
		  $(".fm_new_type1").show();
		  $(".fm_new_type2").hide();
		 
		  }
		  else{
			  $(".fm_new_type2").show();
			  $(".fm_new_type1").hide();
		  }		
          		  
	  }
	  else{
	  $(".CreateNew").show();
	  $(".CreateNew_input").hide();  
		  if(type1 == 1){
		  $(".fm_search_type1").show();
		  $(".fm_search_type2").hide();
		  $(".fm_type1").show();
		  $(".fm_type2").hide();
	  }
	  else{
		  $(".fm_search_type2").show();
		  $(".fm_search_type1").hide();
		  $(".fm_type2").show();
		  $(".fm_type1").hide();
	  }			  
	  }
  }
  change(type,edit_type);
  
  $("#fm_type,#fm_edit_type").on("change",function(){
    type1 = $("#fm_type").val();
    edit_type1 = $("#fm_edit_type").val();
	
	change(type1,edit_type1);
  });
  	
}

function resetModal(){
   $("#fm_type").prop('selectedIndex',0);
   $("#fm_edit_type").prop('selectedIndex',0);
   $("#mouse_position").remove();
}
//新增異動資料
function InsertNewChangeEvent()
{
	var formdata = new FormData();
	formdata.append("CreateUserId", Logindata.sid);
	formdata.append("Title", $("#te_data_basic_new_title").val());
	formdata.append("Note", $("#te_data_basic_new_note").val());
	formdata.append("Deptid", Logindata.deptid);
	
	var date = $("#te_data_basic_new_createtime").text();
	formdata.append("CreateTime", date);
	var date2 = date.split(" ");
	formdata.append("CreateTime2", date2[0]);
	
	$.each($(".hiddenupload"), function(i, obj) {
        $.each(obj.files,function(j, file){
            formdata.append('files', file);
        })
	});
	
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/InsertNewChangeEventInfo",
	  type: "Post",
	  data: formdata,
	  processData: false,
	  contentType: false,
	  success: function(data) {
		
	  }
	});
}
// 取得異動列表
function GetContainerTable() {
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/GetContainerTable",
	  type: "Post",
	  async: false,
	  success: function(data) {
		var data = data.data;
		var htmltext = "";
	    for (var i = 0; i < data.length; i++) {
			htmltext += "<tr id=\"" + data[i].uid + "\">";
			htmltext += "<td>" + data[i].uid + "</td>";
			htmltext += "<td>" + data[i].title + "</td>";
			htmltext += "</tr>";
		}
		var output = document.getElementById("te_tab1_list");
		output.innerHTML = htmltext;
		
		setTimeout(function(){
			if (data.length > 0) $("#" + data[0].uid).click();
		},50);
	  }
	});
}
// 編輯列表
function UpdateChangeEventInfo()
{
	var formdata = new FormData();
	formdata.append("UpdateUserId", Logindata.sid);
	formdata.append("Title", $("#te_data_basic_title").val());
	formdata.append("Note", $("#te_data_basic_note").val());
	formdata.append("UpdataUid", nowloadDetialData);
		
	$.each($(".hiddenupload"), function(i, obj) {
        $.each(obj.files,function(j, file){
            formdata.append('files', file);
        })
	});
	
	formdata.append("deletefiles", dfilelist);
	
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/UpdateChangeEventInfo",
	  type: "Post",
	  data: formdata,
	  processData: false,
	  contentType: false,
	  success: function(data) {
		if (data.data == "1")
			alert("編輯成功.")
		else
			alert("編輯失敗.")
		
		loadDetialData(nowloadDetialData);
	  }
	});
}
// 刪除列表
function DeleteChangeEventInfo() {
	var post = {}
	post.UpdataUid = nowloadDetialData;
	
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/DeleteChangeEventInfo",
	  type: "Post",
	  data: post,
	  success: function(data) {
		if (data.data == "1")
			alert("刪除成功.")
		else
			alert("刪除失敗.")
		
		// loadDetialData(nowloadDetialData);
	  }
	});
}
//審核列表
function SentChangeEventInfo() {
	var post = {}
	post.UpdataUid = nowloadDetialData;
	
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/SentChangeEventInfo",
	  type: "Post",
	  data: post,
	  success: function(data) {
		if (data.data == "1")
			alert("送審成功.")
		else
			alert("送審失敗.")
		
		loadDetialData(nowloadDetialData);
	  }
	});
}
//初始化林管去選項
var WkngList = [];
var PfidList = [];
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
var ForestDataDraw = null;
function ChangeForestDataClick(that) {
	
	if (ForestDataDraw) {
		insertmap.removeLayer(ForestDataDraw);
		ForestDataDraw = null;
	}
	
	$("#fm_search_list tr").removeClass("active");
	$(that).addClass("active");
	
	var wkt = "";
	for (var i = 0; i < ChangeForestData.length; i++) {
		if (ChangeForestData[i].sid == that.id) {
			wkt = ChangeForestData[i].wkt;
			break;
		}
	}
	
	var format = new ol.format.WKT();
	var feature = format.readFeature(wkt);
	feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

	var vector = new ol.layer.Vector({
	  source: new ol.source.Vector({
		features: [feature]
	  })
	});
	
	insertmap.addLayer(vector);
	
	var exetend = feature.getGeometry().getExtent()
	insertmap.getView().fit(exetend)
	
	ForestDataDraw = vector;
}
var ChangeProtectionData = [];
function GetChangeProtectionData(IsSerarch) {
	var post = {}

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
var ProtectionData = null;
function ChangeProtectionDataClick(that) {
	$("#fm_search_list2 tr").removeClass("active");
	$(that).addClass("active");
	
	if (ProtectionData) {
		insertmap.removeLayer(ProtectionData);
		ProtectionData = null;
	}
	
	$("#fm_search_list tr").removeClass("active");
	$(that).addClass("active");
	
	var wkt = "";
	for (var i = 0; i < ChangeProtectionData.length; i++) {
		if (ChangeProtectionData[i].sid == that.id) {
			wkt = ChangeProtectionData[i].wkt;
			break;
		}
	}
	
	var format = new ol.format.WKT();
	var feature = format.readFeature(wkt);
	feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

	var vector = new ol.layer.Vector({
	  source: new ol.source.Vector({
		features: [feature]
	  })
	});
	
	insertmap.addLayer(vector);
	
	var exetend = feature.getGeometry().getExtent()
	insertmap.getView().fit(exetend)
	
	ForestDataDraw = vector;
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