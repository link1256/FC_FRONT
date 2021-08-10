
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

function checkSentApply() {
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
	$(".data_frame").empty().load("./views/temp/detail_data_temp.html?rnd=" + Math.round(Math.random()*10000));
	
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
		setTimeout(function() { WaitingShow(false); }, 900);
		setTimeout(function() {
			//狀態
			var stat = "";
			if (data.sent == "False") {
				stat = "未送審";
				$("#te_data_basic_state").addClass("state_type1").text(stat);
			}
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
		
		$(".list_frame").empty().load("./views/temp/list_data_temp.html"); //模板
		
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
			FM_detail_Edit('list_detail',typeid,fmid);
		});
			
		},50);
				
}

function loadTeListData(){
	$(".list_frame").empty().load("./views/temp/te_list_data_temp.html"); //模板
}

function newApplyDetail() {
	//建立者
	$("#te_data_basic_new_createuser").text(Logindata.name);
	//建立時間		
	$("#te_data_basic_new_createtime").text(GetDateNow());
	//所屬單位	
	$("#te_data_basic_new_deptart").text(Logindata.deptName);
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
				"<div class='detail_rows_value'>"+ "<input id='AREA_HA' value='" + AREA_HA + "' />" +"</div>"+
				"</div>";
				
				detail += 
				"<div class='detail_rows'>"+
				"<div class='detail_rows_name'>修訂資訊</div>"+
				"<div class='detail_rows_value'>"+ "<textarea id='EDITION' rows='3'>" + "" + "</textarea>" +"</div>"+
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
				"<div class='detail_rows_value'>"+ "<input id='AREA_HA' value='" + AREA_HA + "' />" +"</div>"+
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
		}, 280)
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

var editmap;
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
									
									feature.setStyle(style);
									editmap.geomextra_source.addFeature(feature);
								}
								editmap.getView().fit(editmap.geomextra_source.getExtent());
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
						editmap.getView().fit(exetend);
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
			var obj = {};
			if (typeid == "國有林事業區") {
				obj.distName = $("#new_dist1").find("option:selected").text();
				obj.weildName = $("#new_wkng1").find("option:selected").text();
				obj.cmpt = $("#new_cmpt").val();
				obj.edtion = $("#new_edition1").val();
			}
			else if (typeid == "保安林") {
				obj.distName = $("#new_dist2").find("option:selected").text();
				obj.pfid = $("#new_pfid").val();
				obj.pfName = $("#new_pftype").find("option:selected").text();
				obj.edition = $("#new_edition2").val();
			}
			
			FM_detail_Create("fm_data_edit", typeid, obj);
		}, 280);
	}
}

function doRemove(fmid)//移除待異動圖資
{
	confirm("確定要移除本項異動?");
}

function SaveEdit_fm()//執行資料更新
{
	if(confirm("確定儲存目前編輯?")) {
		SaveChangeMap();
		$('#EditPageview').modal('hide');
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
	$("#fm_type").prop('selectedIndex', 0);
	$("#fm_edit_type").prop('selectedIndex', 0);
	$("#mouse_position").remove();
	$("#import_reference_features").val("");
	$("#import_replace_features").val("");
	$("#search_dist1").val("-1");
	dist1change();
	$("#search_dist2").val("-1");
	dist2change();
	$("#fm_search_list").html("");
	$("#fm_search_list2").html("");

	$("#new_dist1").val(-1);
	te_new_dist1_change();
	$("#new_dist2").val(-1);
	$("#new_cmpt").val("");
	$("#new_edition1").val("");
	$("#new_pfid").val("");
	$("#new_edition2").val("");
	
	$("#fm_type").val("1");
	$("#fm_edit_type").val("1");
	$("#search_warning1").val("-1");
	
	$("#fm_search_list").empty();
	$("#fm_search_list2").empty();
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
	
	WaitingShow(true);
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/InsertNewChangeEventInfo",
	  type: "Post",
	  data: formdata,
	  processData: false,
	  contentType: false,
	  success: function(data) {
		WaitingShow(false);
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
// 取得異動列表
function get_te_manage_containerTable() {
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
	
	WaitingShow(true);
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/GetContainerTable",
	  type: "Post",
	  async: false,
	  data: post,
	  success: function(data) {
		setTimeout(function() { WaitingShow(false); }, 900);
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

		$("#te_tab1_list tr").on("click",function(){
			$(this).parent().children().removeClass("active");
			$(this).addClass("active");
			$(".detail_data").show();
			
			let d = $(this).attr('id');
			loadDetialData(d);           //載入基本資料
			loadListData(d);             //載入圖資列表資料
			$("#detail_cancel").click(); //復原編輯狀態
			
			setTimeout(function(){	
				checkSentApply();        //載入異動案件時的判斷方法
			},50);
		});
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
	$.ajax({
	  url: ApiRequestURL + "ChangeEvent/DeleteChangeEventInfo",
	  type: "Post",
	  data: post,
	  success: function(data) {
		WaitingShow(false);
		if (data.data == "1")
			alert("刪除成功.");
		else
			alert("刪除失敗.");
	  }
	});
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
	insertmap.getView().fit(exetend);
	
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
	insertmap.getView().fit(exetend);
	
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
				editmap.getView().fit(exetend);
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
				editmap.getView().fit(target.getExtent());
			}
		}
		$("#import_reference_features").val("");
		$("#import_replace_features").val("");
	};
}
// 匯入參考圖資
var ReferenceIdx = 1;
var ReferenceLayers = [];
function ImportReferenceFeatures(that) {
	if (that.files.length == 0) return;
	
	var file = that.files[0];
	
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
	
	var items = "<tr id='ReferenceLayer_" + ReferenceIdx + "' onclick='ReferenceLayerZoom(" + ReferenceIdx + ")'>";
	items += "<td><input type='checkbox' onchange='ReferenceLayerVisible(" + ReferenceIdx + ", this);' checked></td>";
	items += "<td><button onclick='ReferenceLayerDelete(" + ReferenceIdx + ", this);'>刪除</button></td>";
	items += "<td>參考圖層" + (ReferenceIdx++) + "</td>";
	items += "</tr>";
	
	$("#ExportReferenceMap").append(items);
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
	
	if (that.checked)
		target.setVisible(true);
	else
		target.setVisible(false);s
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
}
// 點選縮放至該圖層
function ReferenceLayerZoom(idx) {
	var target = GetReferenceLayer(idx);
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
		// 讀取WKT
		wkt = format.writeFeature(features[0], {
			dataProjection: "EPSG:3857",
			featureProjection: "EPSG:3826"
		});
	}
	else if (features.length > 1) //多個Polygon需組成MultiPolygon
	{
		var polygons = [];
		for (var i = 0; i < features.length; i++) {
			polygons.push(features[i].getGeometry());
		}
		var mploygons = new ol.geom.MultiPolygon(polygons);
		wkt = format.writeGeometry(mploygons, {
			dataProjection: "EPSG:3857",
			featureProjection: "EPSG:3826"
		});
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
//重置事件
function ResetChangeFeatureEvent(type) {
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
function AddChangeFeature() {
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
	} else if (!editmap.isadd) {
		editmap.addmodify.setActive(true);
		editmap.addmodify.snapInteraction.setActive(true);
		editmap.isadd = true;
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
	} else if (!editmap.isedit) {
		editmap.editmodify.setActive(true);
		editmap.isedit = true;
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
		$("#DelChangeFeatureEventBtn").show();
	} else if (!editmap.isdel) {
		editmap.delselect.setActive(true);
		editmap.isdel = true;
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
function HollowChangeFeature() {
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
	} else if (!editmap.ishole) {
		editmap.holemodify.setActive(true);
		editmap.holemodify.snapInteraction.setActive(true);
		editmap.HollowsnapInteraction.setActive(true);
		editmap.ishole = true;
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
			var polygons = Output.getGeometry().getPolygons();
			for (var i = 0; i < polygons.length; i++) {
				var f = new ol.Feature({
				  geometry: polygons[i]
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
		// 讀取WKT
		wkt = format.writeFeature(features[0], {
			dataProjection: "EPSG:3857",
			featureProjection: "EPSG:3826"
		});
	}
	else if (features.length > 1) //多個Polygon需組成MultiPolygon
	{
		var mploygons = new ol.geom.MultiPolygon([]);
		for (var i = 0; i < features.length; i++) {
			var polygon = features[i].getGeometry();
			mploygons.appendPolygon(polygon);
		}
		
		wkt = format.writeGeometry(mploygons, {
			dataProjection: "EPSG:3857",
			featureProjection: "EPSG:3826"
		});
	}
	else return;
	
	var post = {};
	var type = editmap.typeid == "國有林事業區" ? "1" : "2";
	post.TypeId = type;
	post.Wkt = wkt;
	if (type == "1") {
		post.Wkng = $("#WKNG").text();
		post.Cmpt = $("#CMPT").val();
		post.Dist = $("#DIST").text();
		post.Area_ha = $("#AREA_HA").val();
		post.Edition = $("#EDITION").val();
		post.FmtId = nowloadDetialData;
		post.FmId = editmap.fmid;
	}
	else if (type == "2") {
		post.Pfid = $("#PF_ID").text();
		post.Pftype = $("#PFTYPE").val();
		post.Dist = $("#DIST").text();
		post.Area_ha = $("#AREA_HA").val();
		post.Edition = $("#EDITION").val();
		post.FmtId = nowloadDetialData;
		post.FmId = editmap.fmid;
	}
	
	var isedit = false; //判斷是新增還是編輯
	if (!isedit) {
		WaitingShow(true);
		$.ajax({
			url: ApiRequestURL + "ChangeEvent/InsertNewChangeMaps",
			type: "Post",
			data: post,
			success: function(data) {
				WaitingShow(false);
				if (data.data && data.data == "Success") {
					alert("新增成功.");
				}
				else {
					alert("新增失敗.");
				}
			}
		});
	}
	else {
		WaitingShow(true);
		$.ajax({
			url: ApiRequestURL + "ChangeEvent/EditNewChangeMaps",
			type: "Post",
			data: post,
			success: function(data) {
				WaitingShow(false);
				if (data.data && data.data == "Success") {
					alert("編輯成功.");
				}
				else {
					alert("編輯失敗.");
				}
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