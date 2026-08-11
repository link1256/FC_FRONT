function create_ca_step(i)
{
	$("#ca_step").empty();
	$("#ca_step").load("./views/ca_manage_insert_step" + i + ".html"); 
}
// ca_tab1
var ca_tab1 = {};
function ca_tab1_init()
{
	// 林區管理處列表
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetDistList",
	  type: "Post",
	  success: function(data) {
			if (data.data) {
				var d = data.data;
				var ld = Logindata;
				
				$("#search_dist").empty();
				if (ld.deptid == "00") {
					$("#search_dist").append('<option value="-1" selected>不指定</option>');
					for (var i = 0; i < d.length; i++) {
						$("#search_dist").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
					}
				}
				else {
					for (var i = 0; i < d.length; i++) {
						if (d[i].distId == ld.deptid)
							$("#search_dist").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
					}
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
					$("#search_pfid").append('<option value="' + d[i].pid + '">' + htmlEncode(d[i].pfTypeName) + '</option>');
				}
			}
		}
	});
	ca_tab1_get_protectnumber();
}
function ca_tab1_get_protectnumber() {
	var dist = $("#search_dist").val();
	var pftype = $("#search_pfid").val();
	
	var post = {};
	if (dist == "-1" && pftype == "-1")
	{}
	else if (dist == "-1")
	{
		post.Pftype = [pftype];
	}
	else if (pftype == "-1")
	{
		post.Dist = [dist];
	}
	else
	{
		post.Dist = [dist];
		post.Pftype = [pftype];
	}
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetProtectionNumbers",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#search_pfsid").empty();
				$("#search_pfsid").append('<option value="-1">不指定</option>');
				for (var i = 0; i < d.length; i++) {
					var text = '<option value="' + d[i].pfid + '">' + d[i].pfid + '</option>';
					
					$("#search_pfsid").append(text);
				}
			}
		}
	});
}

function ca_tab1_go_search() {
	var dist = $("#search_dist").val();
	var pftype = $("#search_pfid").val();
	var pfid = $("#search_pfsid").val();
	
	var check = CheckUserAccess("異動事件管理", "案件總覽", "查詢");
	if (!check) {
		alert("您沒有權限使用.")
		return;
	}
	
	AddNewLog("異動事件管理", "案件總覽", "查詢");
	
	var post = {};
	if (dist != "-1") post.Dist = [dist];
	if (pftype != "-1") post.Pftype = [pftype];
	if (pfid != "-1") post.Pfid = pfid;
	
	ca_tab1.nsearchpost = post; // 紀錄post的情況用於刷新
	
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetFMProtectionTestList",
	  type: "Post",
	  data: post,
	  success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#addnew").hide();
				$("#p_list_nofound2").show();
				$("#p_list_table2").hide();
				$("#p_list_count_show2").hide();
				
				if (d.length == 0) {
					$("#p_list_nofound").show();
					$("#p_list_table1").hide();
					$("#p_list_count_show").hide();
				}
				else {
					$("#p_list_nofound").hide();
					$("#p_list_table1").show();
					$("#p_list_count_show").show();
					$("#p_list_count").empty();
					$("#p_list_count").append(d.length);
					$("#p_list_tbody").empty();
					
					for (var i = 0; i < d.length; i++) {
						var t = "<tr id='fmid_" + d[i].fmid + "' onclick='ca_tab1_list_click(\"" + d[i].fmid + "\",\"" + d[i].fristyear + "\", this)'>";
						
						t += "<td>" + htmlEncode(d[i].manager) + "</td>";
						t += "<td>";
						
						var pfs = d[i].pftype_name.split(';');
						for (var j = 0; j < pfs.length; j++) {
							if (j != 0) t += "<br />";
							t += pfs[j];
						}
						
						t += "</td>";
						t += "<td>" + d[i].pfid + "</td>";
						t += "<td style='text-align: right;'>" + htmlEncode(d[i].count) + "</td>";
						t += "<td style='text-align: right;'>" + htmlEncode(d[i].year) + "</td>";
						t += "</tr>";
						
						$("#p_list_tbody").append(t);
					}
				}
			}
		}
	});
}
function ca_tab1_research() {
	if (!ca_tab1 && !ca_tab1.nsearchpost) {
		return;
	}
	
	var post = ca_tab1.nsearchpost;
	
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetFMProtectionTestList",
	  type: "Post",
	  data: post,
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			
			$("#addnew").hide();
			$("#p_list_nofound2").show();
			$("#p_list_table2").hide();
			$("#p_list_count_show2").hide();
			
			if (d.length == 0) {
				$("#p_list_nofound").show();
				$("#p_list_table1").hide();
				$("#p_list_count_show").hide();
			}
			else {
				$("#p_list_nofound").hide();
				$("#p_list_table1").show();
				$("#p_list_count_show").show();
				$("#p_list_count").empty();
				$("#p_list_count").append(d.length);
				$("#p_list_tbody").empty();
				
				for (var i = 0; i < d.length; i++) {
					var t = "<tr id='fmid_" + d[i].fmid + "' onclick='ca_tab1_list_click(\"" + d[i].fmid + "\",\"" + d[i].fristyear + "\", this)'>";
					
					t += "<td>" + d[i].manager + "</td>";
					t += "<td>";
					
					var pfs = d[i].pftype_name.split(';');
					for (var j = 0; j < pfs.length; j++) {
						if (j != 0) t += "<br />";
						t += htmlEncode(pfs[j]);
					}
					
					t += "</td>";
					t += "<td>" + htmlEncode(d[i].pfid) + "</td>";
					t += "<td style='text-align: right;'>" + htmlEncode(d[i].count) + "</td>";
					t += "<td style='text-align: right;'>" + htmlEncode(d[i].year) + "</td>";
					t += "</tr>";
					
					$("#p_list_tbody").append(t);
				}
				
				if (ca_tab1.nowfmid) {
					$("#fmid_" + ca_tab1.nowfmid).click();
				}
			}
		}
	  }
	});
}

//重置選項
function ca_tab1_reset() {
	$("#search_dist").val("-1");
	$("#search_pfid").val("-1");
	$("#search_stat").val("-1");
	$("#search_pfsid").val("-1");
	
	$("#addnew").hide();
	$("#p_list_count_show").hide();
	$("#p_list_table1").hide();
	$("#p_list_count_show2").hide();
	$("#p_list_table2").hide();
	
	$("#p_list_nofound").show();
	$("#p_list_nofound2").show();
		
	ca_tab1_get_protectnumber();
}

function ca_tab1_list_click(fmid, minyear, that) {
	
	$("#p_list_tbody tr").removeClass("active");
	$(that).addClass("active");
	
	ca_tab1_setYearOption(minyear);
	
	var post = {};
	post.Fmid = fmid;
	
	ca_tab1.nowfmid = fmid;
	
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetFMProtectionTestHistroyList",
	  type: "Post",
	  data: post,
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			
			ca_tab1.nowhislist = d;
			ca_tab1.canInsert = true;
			$("#addnew").show();
			if (d.length == 0) {
				$("#p_list_nofound2").show();
				$("#p_list_table2").hide();
				$("#p_list_count_show2").hide();
			}
			else {
				$("#p_list_nofound2").hide();
				$("#p_list_table2").show();
				$("#p_list_count_show2").show();
				$("#p_list_count2").empty();
				$("#p_list_count2").append(d.length);
				
				$("#p_list_tbody2").empty();
				for (var i = 0; i < d.length; i++) {
					var t = "<tr>";
					
					t += '<td>' + (d[i].type == '1' ? '檢訂' : '專案') + '</td>';
					t += '<td>' + htmlEncode(d[i].year) + '</td>';
					t += '<td>' + (d[i].process == '' ? '執行中' : '完成') + '</td>';
					t += '<td>' + htmlEncode(d[i].undertaker) + '</td>';
					t += '<td>' + htmlEncode(formatDateTime_Date(d[i].updatetime)) + '</td>';
					t += '<td>' + htmlEncode(d[i].updateuser) + '</td>';
					
					t += '<td><label style="color:#74642A; cursor: pointer;" onclick="ca_tab1_openView(\'' + d[i].sid + '\')">檢視</label></td>';
					t += '<td><label style="color:#74642A; cursor: pointer;" onclick="ca_tab1_goInsert(\'' + d[i].sid + '\',\'' + fmid + '\',\'' +d[i].year + '\')">檢視</label></td>';
					t += "</tr>";
					
					$("#p_list_tbody2").append(t);
					
					if (d[i].process == '') ca_tab1.canInsert = false;
				}
			}
		}
	  }
	});
}

function ca_tab1_setYearOption(minyear) {
	var y = new Date().getFullYear();
	var ty = y - 1911;

	var sy = ty - 15;
	var ey = ty + 1;
	
	if (minyear) {
		var my = parseInt(minyear);
		if (my >= sy) sy = my;
	}

	$("#ca_year_edit").empty();
	$("#ca_year_edit").append('<option value="-1">請選擇</option>');
	for (var i = sy; i <= ey; i++) {
		$("#ca_year_edit").append('<option value="' + i + '">' + i + '</option>');
	}
}

function ca_tab1_AddNew() {
	var check = CheckUserAccess("異動事件管理", "案件總覽", "新增案件");
	if (!check) {
		alert("您沒有權限使用.")
		return;
	}
	if (!ca_tab1.canInsert) {
		alert('尚有執行中的資料.故無法新增.');
		return;
	}
	
	AddNewLog("異動事件管理", "案件總覽", "新增案件");
	
	ca_tab1.modaltype = "Add";
	$("#ca_manage_tab1_dialog").modal("show");
	
	$(".info_edit").show();
	$(".info_show").hide();
	$(".insert_nonshow").hide();
	
	$("#ca_manger_edit").empty();
	$("#ca_manger_edit").append(Logindata.name);
}

function ca_tab1_EditNew() {
	ca_tab1.modaltype = "Edit";
	
	$(".info_edit").show();
	$(".info_show").hide();
}

function ca_tab1_openView(sid) {
	$("#ca_manage_tab1_dialog").modal("show");
	$(".info_edit").hide();
	$(".info_show").show();
	
	ca_tab1.edittarget = sid;
	var data = ca_tab1.nowhislist;
	
	for (var i = 0; i < data.length; i++) {
		if (data[i].sid == sid) {
			$("#ca_type_show").append(data[i].type == '1' ? '檢訂' : '專案');
			$("#ca_type_edit").val(data[i].type);
			
			$("#ca_year_show").append(data[i].year);
			$("#ca_year_edit").val(data[i].year);
			
			$("#ca_stat_show").append(data[i].process == '' ? '執行中' : '完成');
			$("#ca_stat_edit").val(data[i].process == '' ? '1' : '2');
			
			$("#ca_manger_show").append(htmlEncode(data[i].undertaker));
			$("#ca_manger_edit").append(htmlEncode(data[i].undertaker));
			
			$("#ca_note_show").append(htmlEncode(data[i].note));
			$("#ca_note_edit").val(htmlEncode(data[i].note));
			
			if (data[i].process != '') $(".edit_nonshow").hide();
			
			break;
		}
	}
}

function ca_tab1_dialog_Save() {
	var modaltype = ca_tab1.modaltype;
	var target = ca_tab1.nowfmid;
	
	if (!modaltype || !target) return;
	
	if (modaltype == "Add") {
		var post = {};
		post.type = $("#ca_type_edit").val();
		post.fmid = target;
		post.year = $("#ca_year_edit").val();
		post.process = $("#ca_stat_edit").val();
		post.note = $("#ca_note_edit").val();
		
		if (post.year == "-1") {
			alert('請選擇年度!');
			return;
		}
		
		$.ajax({
			url: ApiRequestURL + "ProjectManagement/EditFMProtectionTestHistroy",
			type: "Post",
			data: post,
			success: function(data) {
				if (data.data) {
					var d = data.data;
					if (d != '-1' && d != '0' && d != '-2') {
						alert('新增成功.');
						ca_tab1_research();
						
						setTimeout(function() {
							// 處理預設載入
							ca_insert_auto_loadlast(d, target);
							$("#fmid_" + target).click();
						}, 200);
						
						ca_tab1_dialog_Close();
					}
					else {
						alert('新增失敗.');
					}
				}
			}
		});
	}
	else if (modaltype == "Edit") {
		if (!ca_tab1.edittarget) return;
		
		var post = {};
		post.sid = ca_tab1.edittarget;
		post.type = $("#ca_type_edit").val();
		post.fmid = target;
		post.year = $("#ca_year_edit").val();
		post.process = $("#ca_stat_edit").val();
		post.note = $("#ca_note_edit").val();
		
		if (post.year == "-1") {
			alert('請選擇年度!');
			return;
		}
		
		if (post.process == '2') {
			var cfm = confirm('您已將狀態設成完成，一但完成將無法編輯，是否繼續?');
			if (!cfm) return;
			$.ajax({
				url: ApiRequestURL + "ProjectManagement/CheckHasFMTGeoData",
				type: "Post",
				data: post,
				success: function(data) {
					if (data.data) {
						var d = data.data;
						if (d != "0") {
							$.ajax({
								url: ApiRequestURL + "ProjectManagement/EditFMProtectionTestHistroy",
								type: "Post",
								data: post,
								success: function(data) {
									if (data.data) {
										var d = data.data;
										if (d == '1') {
											alert('編輯成功.');
											ca_tab1_research();
											
											setTimeout(function() {
												$("#fmid_" + target).click();
											}, 200);
											
											ca_tab1_dialog_Close();
										}
										else if (d == '-2') {
											alert('沒有上傳範圍，無法完成!');
										}
										else {
											alert('編輯失敗');
										}
									}
								}
							});
						}
						else {
							alert('沒有上傳範圍，無法完成!');
						}
					}
					else {
						alert('沒有上傳範圍，無法完成!');
					}
				}
			});
			
		}
		else if (post.process == '3') {
			var cfm = confirm('您已將狀態設成刪除，一但刪除將無法看到該筆資料，是否繼續?');
			if (!cfm) return;
			$.ajax({
				url: ApiRequestURL + "ProjectManagement/EditFMProtectionTestHistroy",
				type: "Post",
				data: post,
				success: function(data) {
					if (data.data) {
						var d = data.data;
						if (d == '1') {
							alert('編輯成功.');
							ca_tab1_research();
							
							setTimeout(function() {
								$("#fmid_" + target).click();
							}, 200);
							
							ca_tab1_dialog_Close();
						}
						else {
							alert('編輯失敗');
						}
					}
				}
			});
		}
	}
}

function ca_tab1_dialog_Close() {
	$("#ca_manage_tab1_dialog").modal("hide");
	setTimeout(function() {
		ca_tab1_dialog_Reset();
	}, 200);
}

function ca_tab1_dialog_Reset() {
	$(".insert_nonshow").show();
	$(".edit_nonshow").show();
	
	$("#ca_type_show").empty();
	$("#ca_type_edit").val('1');
	
	$("#ca_year_show").empty();
	$("#ca_year_edit").val('-1');
	
	$("#ca_stat_show").empty();
	$("#ca_stat_edit").val('1');
	
	$("#ca_manger_show").empty();
	$("#ca_manger_edit").empty();
	
	$("#ca_note_show").empty();
	$("#ca_note_edit").val('');
}

function ca_tab1_goInsert(sid, fmid, year) {
	
	var data = ca_tab1.nowhislist;
	
	ca_tab1.innershowlast = true;
	for (var i = 0; i < data.length; i++) {
		if (data[i].sid == sid) {
			if (data[i].process != '') ca_tab1.innershowlast = false;
			break;
		}
	}
	
	ca_tab1.editinner = {};
	ca_tab1.editinner.sid = sid;
	ca_tab1.editinner.fmid = fmid;
	ca_tab1.editinner.year = year;
	
	$("#insert_body").load("./views/ca_manage_insert.html", function() {
	  $("#InsertCase").modal("show");
	});
}

var ca_insert;
function ca_insert_step1_init()
{
	if (!ca_tab1.editinner)
	{
		alert('沒有取得編輯或顯示的ID.');
	}
	
	ca_insert = {};
	ca_insert.map = map('mmap', true, false, true);
	
	// 圖徵Highlight初始化
	var SelectSingleClick = new ol.interaction.Select({
		filter: function(e){
			if (!e.list_from || !e.list_type) return false;
			return true;
		}
	});
	SelectSingleClick.on("select", ca_insert_step1_map_click);
	ca_insert.map.addInteraction(SelectSingleClick);
	ca_insert.map.SelectSingleClick = SelectSingleClick;
	
	// 處理Legend
	var target = $("#maplegend");
	var legend1 = "<div style='width: 200px;'>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend5'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>本次範圍</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend1_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"ca_tab1_layer_change_opacity('legend1');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend6'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>前次範圍</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend2_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"ca_tab1_layer_change_opacity('legend2');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend3'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>地籍區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend3_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"ca_tab1_layer_change_opacity('legend3');\" /></div>";
	legend1 += "</div>";
	legend1 += "</div>";
	
	target.append(legend1);
	
	// 是否顯示即抓取前次
	if (!ca_tab1.innershowlast)
	{
		setTimeout(function() {
			$(".showlast").hide();
			$(".canedit").hide();
			$(".shownow").show();
		}, 100);
		
		ca_insert_step1_getnow(true);
	}
	else //抓取最後一次檢訂內容
	{
		ca_insert_step1_getlast();
	}
	//ca_insert_step1_mapDataDraw();
	ca_insert_step1_getCountyList();
	ca_insert_step1_nowprocessHide();
	ca_insert_step1_lastprocessShow();
}

function ca_tab1_layer_change_opacity(type) {
	if (type == 'legend1') {
		var val = $('#legend1_opacity').val() / 100;
		ca_insert.map.geomvector_layer2.setOpacity(val);
	}
	else if (type == 'legend2') {
		var val = $('#legend2_opacity').val() / 100;
		ca_insert.map.geomvector_layer1.setOpacity(val);
	}
	else {
		var val = $('#legend3_opacity').val() / 100;
		ca_insert.map.geomvector_layer.setOpacity(val);
		ca_insert.map.geomextra_layer.setOpacity(val);
	}
}

var ca_manage_insert_step2 = null;
function ca_insert_step2_init()
{
	ca_manage_insert_step2 = {};
	// 是否顯示即抓取前次
	if (!ca_tab1.innershowlast)
	{
		$(".showlast").hide();
		$(".canedit").hide();
		$(".shownow").show();
	}
	else
	{
		// 取得上次檔案
		ca_manage_insert_step2_GetLastFiles();
	}
	// 取得列表狀態
	ca_manage_insert_step2_GetFileListState();
	// 取得本次檔案
	ca_manage_insert_step2_GetNowFiles();
}

function ca_insert_step1_map_click(e)
{
	$("#ca_insert_step1_tab1tbody tr").removeClass("active");
	$("#ca_insert_step1_tab2tbody tr").removeClass("active");
	if (e.selected.length == 1) {		
		var $objTr = $("#" + e.selected[0].list_from + "_" + e.selected[0].list_type + "_" + e.selected[0].sid);
		$objTr.addClass("active");
		var objTr = $objTr[0];
		
		if (e.selected[0].list_from == "last")
			$("#ca_insert_step1_tab1hasfile").animate({scrollTop:objTr.offsetTop - 34}, "slow");
		else
			$("#ca_insert_step1_tab2hasfile").animate({scrollTop:objTr.offsetTop - 34}, "slow");
	}
}

function ca_insert_step1_list_click(list_from, list_type, sid, that, e)
{
	if (e.target.nodeName == "SELECT" || e.target.nodeName == "INPUT") {
		return;
	}
	
	ca_tab1.editnowclicksid = that.id;
	
	var features = [];
	
	if (list_from == "last")
	{
		features = ca_insert.map.geomextra_source.getFeatures();
		$("#ca_insert_step1_tab1tbody tr").removeClass("active");
		$(that).addClass("active");
	}
	else if (list_from == "now")
	{
		features = ca_insert.map.geomvector_source.getFeatures();
		$("#ca_insert_step1_tab2tbody tr").removeClass("active");
		$(that).addClass("active");
	}
	else
	{
		return;
	}
	
	var feature = null;
	
	for (var i = 0; i < features.length; i++) {
		if (features[i].sid == sid && features[i].list_type == list_type) {
			feature = features[i];
			break;
		}
	}
	
	if (feature) {
		const extent = feature.getGeometry().getExtent();
		ca_insert.map.getView().fit(extent, { maxZoom: 18});
		
		ca_insert.map.SelectSingleClick.getFeatures().clear();
		ca_insert.map.SelectSingleClick.getFeatures().push(feature);
	}
}

function ca_insert_step1_getnow(clicktab, isedit) // 取得本次目標檢訂
{
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.fmid = ca_tab1.editinner.fmid;

	$('#now_count').empty();
	setTimeout(function() {
		WaitingShow(true);
	}, 100);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMProtectionTargetTest",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 100);
			if (data.data) {
				var d = data.data;
				
				$("#now_year").empty();
				$("#now_year").append(ca_tab1.editinner.year);
				
				ca_insert.map.geomvector_source.clear();
				if (d.hlist.length > 0 || d.olist.length > 0)
				{
					clicktab = true;
					$(".ca_insert_step1_tab2nofile").hide();
					$("#ca_insert_step1_tab2hasfile").show();
					$(".ca_insert_step1_tab2hasfile").show();
					if (ca_tab1.innershowlast)
						$(".canedit").show();
					
					$("#ca_insert_step1_tab2tbody").empty();
					
					var outcount = 0;
					var check = CheckUserAccess("異動事件管理", "案件總覽", "編輯案件");					
					var hlist = d.hlist;
					for (var i = 0; i < hlist.length; i++)
					{
						var t = "";
						
						if (ca_tab1.innershowlast && check && hlist[i].attr == "排除") {
							t += "<tr id='now_hlist_" + hlist[i].sid + "' class='isout' onclick='ca_insert_step1_list_click(\"now\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
						}
						else {
							t += "<tr id='now_hlist_" + hlist[i].sid + "' onclick='ca_insert_step1_list_click(\"now\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
						}
						
						t += '<td>' + hlist[i].status + '</td>';
						
						if (ca_tab1.innershowlast && check)
						{
							t += '<td><select onchange="ca_insert_step1_update_process(\'' + hlist[i].sid + '\', this, false)">';
							
							if (hlist[i].attr == "整筆")
								t += '<option value="整筆" selected>整筆</option>';
							else
								t += '<option value="整筆">整筆</option>';
							
							if (hlist[i].attr == "之內")
								t += '<option value="之內" selected>之內</option>';
							else
								t += '<option value="之內">之內</option>';
							
							if (hlist[i].attr == "排除")
								t += '<option value="排除" selected>排除</option>';
							else
								t += '<option value="排除">排除</option>';
							
							t += '</select></td>';
						}
						else
						{
							t += '<td>' + hlist[i].attr + '</td>';
							if (hlist[i].attr == "排除") {
								outcount++;
								continue;
							}
						}

						t += '<td style="padding-left: 10px !important;">' + hlist[i].ratio + '</td>';
						
						t += '<td>' + htmlEncode(hlist[i].cityname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].townname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].landname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].pm_no) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].pc_no) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].zoingname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].lclassname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].areaha) + '</td>';
						t += '<td>' + htmlEncode(formatDateTime_Date(hlist[i].updatetime)) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].ownertype) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].ownermanage) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].landcode) + '</td>';
						t += "<td><button class='btn btn-success' onclick='ca_api(\"" + hlist[i].unit + "\",\"" + hlist[i].landno + "\",\"" + hlist[i].sec + "\")'>查看</button></td>";
							
						t += "</tr>";
						
						$("#ca_insert_step1_tab2tbody").append(t);
						
						var format = new ol.format.WKT();
						var feature = format.readFeature(hlist[i].wkt);
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
						feature.sid = hlist[i].sid;
						feature.list_from = "now";
						feature.list_type = "hlist";
						
						var style =	new ol.style.Style({
							fill: new ol.style.Fill({
								color: "rgba(113, 183, 183, 0.5)",
							}),
							stroke: new ol.style.Stroke({
								color: "rgba(0, 48, 97, 1)",
								width: 2,
							}),
							text: new ol.style.Text({
								font: '12px Calibri,sans-serif',
								fill: new ol.style.Fill({ color: '#000' }),
								stroke: new ol.style.Stroke({
									color: '#fff', width: 2
								}),
								text: (hlist[i].pm_no + '-' + hlist[i].pc_no)
							})
						});
						feature.setStyle(style);
						ca_insert.map.geomvector_source.addFeature(feature);
					}
					
					var olist = d.olist;
					for (var i = 0; i < olist.length; i++)
					{
						var t = "<tr id='now_olist_" + olist[i].sid + "' class='otherdata' onclick='ca_insert_step1_list_click(\"now\", \"olist\", \"" + olist[i].sid + "\", this, event)'>";
						
						t += '<td>' + olist[i].status + '</td>';
						
						if (ca_tab1.innershowlast && check)
						{
							t += '<td><select onchange="ca_insert_step1_update_process(\'' + olist[i].sid + '\', this, true)">';
							
							if (olist[i].attr == "整筆")
								t += '<option value="整筆" selected>整筆</option>';
							else
								t += '<option value="整筆">整筆</option>';
							
							if (olist[i].attr == "之內")
								t += '<option value="之內" selected>之內</option>';
							else
								t += '<option value="之內">之內</option>';
							
							if (olist[i].attr == "排除")
								t += '<option value="排除" selected>排除</option>';
							else
								t += '<option value="排除">排除</option>';
							
							t += '</select></td>';
						}
						else
						{
							t += '<td>' + olist[i].attr + '</td>';
							if (olist[i].attr == "排除") {
								outcount++;
								continue;
							}
						}
						
						t += '<td style="padding-left: 10px !important;">' + olist[i].ratio + '</td>';
						
						t += '<td>' + olist[i].cityname + '</td>';
						t += '<td>' + olist[i].townname + '</td>';
						t += '<td>' + olist[i].landname + '</td>';
						t += '<td>' + olist[i].pm_no + '</td>';
						t += '<td>' + olist[i].pc_no + '</td>';
						t += '<td>' + olist[i].zoingname + '</td>';
						t += '<td>' + olist[i].lclassname + '</td>';
						t += '<td>' + olist[i].areaha + '</td>';
						t += '<td>' + formatDateTime_Date(olist[i].updatetime) + '</td>';
						t += '<td>' + olist[i].ownertype + '</td>';
						t += '<td>' + olist[i].ownermanage + '</td>';
						t += '<td>' + olist[i].landcode + '</td>';
						t += "<td><button class='btn btn-success' onclick='ca_api(\"" + olist[i].unit + "\",\"" + olist[i].landno + "\",\"" + olist[i].sec + "\")'>查看</button></td>";
							
						t += "</tr>";
						
						$("#ca_insert_step1_tab2tbody").append(t);
						
						if (olist[i].wkt != "") {
							var format = new ol.format.WKT();
							var feature = format.readFeature(olist[i].wkt);
							feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
							feature.sid = olist[i].sid;
							feature.list_from = "now";
							feature.list_type = "olist";
							
							var style =	new ol.style.Style({
								fill: new ol.style.Fill({
									color: "rgba(113, 183, 183, 0.5)",
								}),
								stroke: new ol.style.Stroke({
									color: "rgba(0, 48, 97, 1)",
									width: 2,
								}),
								text: new ol.style.Text({
									font: '12px Calibri,sans-serif',
									fill: new ol.style.Fill({ color: '#000' }),
									stroke: new ol.style.Stroke({
										color: '#fff', width: 2
									}),
									text: (olist[i].pm_no + '-' + olist[i].pc_no)
								})
							});
							feature.setStyle(style);
							ca_insert.map.geomvector_source.addFeature(feature);
						}
					}
					$('#now_count').append('(共' + (d.hlist.length + d.olist.length - outcount) + '筆)');
				}
				else
				{
					$(".ca_insert_step1_tab2nofile").show();
					$("#ca_insert_step1_tab2hasfile").hide();
					$(".ca_insert_step1_tab2hasfile").hide();
					// 載入前次
					// ca_insert_auto_loadlast();
					// return;
				}
				
				if (check)
				{
					AddNewLog("異動事件管理", "案件總覽", "編輯案件");
				}
				ca_insert.nowdata = d;
				if (clicktab) $("#nowcheck").click();
				ca_insert_step1_mapDataDraw(isedit);
			}
		}
	});
}

function ca_insert_auto_loadlast(sid, fmid) // 沒有本次檢訂的話預設載入
{
	if (!sid || !fmid) {
		alert('無法預載.');
		return;
	}
	var post = {};
	post.sid = sid;
	post.fmid = fmid;
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/AutoLoadingFMProtectionTargetTest",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data) {
				var d = data.data;
				if (d == "1") {
					alert('預載成功.');
				} else {
					alert('預載失敗.');
				}
			}
		}
	});
}

function ca_insert_step1_getlast() // 取得上次檢訂
{
	var post = {};
	post.fmid = ca_tab1.editinner.fmid;
	$('#last_count').empty();
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMProtectionLastTest",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				ca_insert.lastdata2 = d;
				
				$("#last_year").empty();
				$("#last_year").append(d.year);
				
				if (d.hlist.length > 0 || d.olist.length > 0)
				{
					$("#ca_insert_step1_tab1nofile").hide();
					$("#ca_insert_step1_tab1hasfile").show();
					
					$("#ca_insert_step1_tab1tbody").empty();
					ca_insert.map.geomextra_source.clear();
					
					var outcount = 0;
					var hlist = d.hlist;
					for (var i = 0; i < hlist.length; i++)
					{
						if (hlist[i].attr == "排除") {
							outcount++;
							continue;
						}
						
						var t = "<tr id='last_hlist_" + hlist[i].sid + "' onclick='ca_insert_step1_list_click(\"last\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
						
						t += '<td>' + htmlEncode(hlist[i].status) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].attr) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].ratio) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].cityname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].townname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].landname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].pm_no) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].pc_no) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].zoingname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].lclassname) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].areaha) + '</td>';
						t += '<td>' + htmlEncode(formatDateTime_Date(hlist[i].updatetime)) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].ownertype) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].ownermanage) + '</td>';
						t += '<td>' + htmlEncode(hlist[i].landcode) + '</td>';
						t += "<td><button class='btn btn-success' onclick='ca_api(\"" + hlist[i].unit + "\",\"" + hlist[i].landno + "\",\"" + hlist[i].sec + "\")'>查看</button></td>";
							
						t += "</tr>";
						
						$("#ca_insert_step1_tab1tbody").append(t);
						
						var format = new ol.format.WKT();
						var feature = format.readFeature(hlist[i].wkt);
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
						feature.sid = hlist[i].sid;
						feature.list_from = "last";
						feature.list_type = "hlist";
						
						var style =	new ol.style.Style({
							fill: new ol.style.Fill({
								color: "rgba(113, 183, 183, 0.5)",
							}),
							stroke: new ol.style.Stroke({
								color: "rgba(0, 48, 97, 1)",
								width: 2,
							}),
							text: new ol.style.Text({
								font: '12px Calibri,sans-serif',
								fill: new ol.style.Fill({ color: '#000' }),
								stroke: new ol.style.Stroke({
									color: '#fff', width: 2
								}),
								text: (hlist[i].pm_no + '-' + hlist[i].pc_no)
							})
						});
						feature.setStyle(style);
						ca_insert.map.geomextra_source.addFeature(feature);
					}
					
					var olist = d.olist;
					for (var i = 0; i < olist.length; i++)
					{
						if (olist[i].attr == "排除") {
							outcount++;
							continue;
						}
						
						var t = "<tr id='last_olist_" + olist[i].sid + "' class='otherdata' onclick='ca_insert_step1_list_click(\"last\", \"olist\", \"" + olist[i].sid + "\", this, event)'>";
						
						t += '<td>' + olist[i].status + '</td>';
						t += '<td>' + olist[i].attr + '</td>';
						t += '<td>' + olist[i].ratio + '</td>';
						t += '<td>' + olist[i].cityname + '</td>';
						t += '<td>' + olist[i].townname + '</td>';
						t += '<td>' + olist[i].landname + '</td>';
						t += '<td>' + olist[i].pm_no + '</td>';
						t += '<td>' + olist[i].pc_no + '</td>';
						t += '<td>' + olist[i].zoingname + '</td>';
						t += '<td>' + olist[i].lclassname + '</td>';
						t += '<td>' + olist[i].areaha + '</td>';
						t += '<td>' + formatDateTime_Date(olist[i].updatetime) + '</td>';
						t += '<td>' + olist[i].ownertype + '</td>';
						t += '<td>' + olist[i].ownermanage + '</td>';
						t += '<td>' + olist[i].landcode + '</td>';
						t += "<td><button class='btn btn-success' onclick='ca_api(\"" + olist[i].unit + "\",\"" + olist[i].landno + "\",\"" + olist[i].sec + "\")'>查看</button></td>";
							
						t += "</tr>";
						
						$("#ca_insert_step1_tab1tbody").append(t);
						
						if (olist[i].wkt != "") {
							var format = new ol.format.WKT();
							var feature = format.readFeature(olist[i].wkt);
							feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
							feature.sid = olist[i].sid;
							feature.list_from = "last";
							feature.type = "olist";
							
							var style =	new ol.style.Style({
								fill: new ol.style.Fill({
									color: "rgba(113, 183, 183, 0.5)",
								}),
								stroke: new ol.style.Stroke({
									color: "rgba(0, 48, 97, 1)",
									width: 2,
								}),
								text: new ol.style.Text({
									font: '12px Calibri,sans-serif',
									fill: new ol.style.Fill({ color: '#000' }),
									stroke: new ol.style.Stroke({
										color: '#fff', width: 2
									}),
									text: (olist[i].pm_no + '-' + olist[i].pc_no)
								})
							});
							feature.setStyle(style);
							ca_insert.map.geomextra_source.addFeature(feature);
						}
					}
					$('#last_count').append('(共' + (d.hlist.length + d.olist.length - outcount) + '筆)');
				}
				
				ca_insert.lastdata = d.hlist;
			}
			ca_insert_step1_getnow();
		}
	});
}

function ca_insert_step1_mapDataDraw(isedit)
{
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.fmid = ca_tab1.editinner.fmid;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMProtectionTargetTestMap",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				// 畫上次的圖徵
				if (ca_tab1.innershowlast) {
					ca_insert.map.geomvector_source1.clear();
					var laststyle = new ol.style.Style({
						fill: new ol.style.Fill({
							color: "rgba(249, 186, 123, 0.7)",
						}),
						stroke: new ol.style.Stroke({
							color: "rgba(192, 110, 27, 1)",
							width: 2,
						}),
					});
					var lastdata = d.lwkt;
					for (var i = 0; i < lastdata.length; i++) {
						var format = new ol.format.WKT();
						var feature = format.readFeature(lastdata[i]);
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
						feature.setStyle(laststyle);
						ca_insert.map.geomvector_source1.addFeature(feature);
					}	
				}
				// 畫本次的圖徵
				ca_insert.map.geomvector_source2.clear();
				var style =	new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(246, 126, 224, 0.7)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(218, 43, 188, 1)",
						width: 2,
					}),
				});
				var nowdata = d.nwkt;
				var nowdatanocount = 0;
				for (var i = 0; i < nowdata.length; i++) {
					if (nowdata[i] == "") {
						nowdatanocount++;
						continue;
					}
					var format = new ol.format.WKT();
					var feature = format.readFeature(nowdata[i]);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.setStyle(style);
					ca_insert.map.geomvector_source2.addFeature(feature);
				}
				
				if (nowdata.length > 0 && nowdatanocount < nowdata.length)
					ca_insert.map.getView().fit(ca_insert.map.geomvector_source2.getExtent(), { maxZoom: 18});
				else
					ca_insert.map.getView().fit(ca_insert.map.geomvector_source1.getExtent(), { maxZoom: 18});
				
				
				if (isedit && ca_tab1.editnowclicksid) {
					$("#" + ca_tab1.editnowclicksid).click();
				}
			}
		}
	});
}

function ca_insert_step1_update_process(sid, that, isother)
{
	if (!sid) return;
	
	var value = $(that).val();
	
	var post = {};
	post.sid = sid;
	post.process = value;
	
	if (isother)
		post.isother = '1';
	else
		post.isother = '0';
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/UpdateFMProtectionTargetProcess",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				ca_insert_step1_getnow(false, true);
				if (d != "1") alert("更新失敗.");
			}
		}
	});
}

function ca_insert_step1_update_ratio(sid, that, isother)
{
	if (!sid) return;
	
	var value = $(that).val();
	
	if (value > 1 || value < 0) {
		alert('範圍必需介於0到1之間.');
		return;
	}
	
	var post = {};
	post.sid = sid;
	post.ratio = value;
	
	if (isother)
		post.isother = '1';
	else
		post.isother = '0';
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/UpdateFMProtectionTargetRatio",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				ca_insert_step1_getnow();
				if (d != "1") alert("更新失敗.");
			}
		}
	});
}

function ca_insert_step1_tab2_uploadfile()
{
	var check = CheckUserAccess("異動事件管理", "案件總覽", "編輯案件");
	if (!check) {
		alert("您沒有權限使用.")
		return;
	}
	
	$("#UploadFile").modal("show");
	$("#upload_year").empty();
	$("#upload_year").append(ca_tab1.editinner.year);
}

function Close_ca_UploadfileModal() {
	$("#UploadFile").modal("hide");
	filelist = new Array();
	$("#upload_shp_file_list").empty();
}

function ca_insert_step1_tab2_AddNewProject()
{
	var check = CheckUserAccess("異動事件管理", "案件總覽", "編輯案件");
	if (!check) {
		alert("您沒有權限使用.")
		return;
	}
	AddNewLog("異動事件管理", "案件總覽", "編輯案件");
	
	$("#AddNewProject").modal("show");
}

function Close_ca_AddNewProjectModal() {
	$("#AddNewProject").modal("hide");
	
	$("#add_pro_city").val("-1");
	$("#add_pro_town").val("-1");
	$("#add_pro_land").val("-1");
	$("#add_pro_pmno").val("");
	$("#add_pro_pcno").val("");
	$("#add_pro_areaha").val("");
	$("#add_pro_attr").val("整筆");
	$("#ismoved").prop('checked', false);
	$("#add_pro_areaha").prop('disabled', false);
}

function ca_insert_step1() {
	create_ca_step(1);
	$(".tab2").parent().children().removeClass("active");
	$(".tab1").addClass("active");
}

function ca_insert_step2() {
	create_ca_step(2);
	$(".tab1").parent().children().removeClass("active");
	$(".tab2").addClass("active");
}

function ca_DownLoadLastModal() {
	$("#DownLoadLast").modal("show");
}

function Close_ca_DownLoadLastModal() {
	$("#DownLoadLast").modal("hide");
}

function Upload_ca_UploadfileModal() {
	if (!filelist || filelist.length == 0) return;
	
	var formdata = new FormData();
	formdata.append('sid', ca_tab1.editinner.sid);
	formdata.append('fmid', ca_tab1.editinner.fmid);
	
	$.each(filelist, function(j, file) {
		formdata.append('files', file);
	});
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/UploadFMProtectionTargetTest",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d == "1")
				{
					alert("上傳比對成功.");
					
					ca_insert_step1_getnow();
					//ca_insert_step1_mapDataDraw();
					Close_ca_UploadfileModal();
				}
				else
				{
					alert("上傳比對失敗.");
				}
				
				setTimeout(function() {
					WaitingShow(false);
				}, 200);
			}
		}
	});
}

function ca_insert_step1_getCountyList() {
	$.ajax({
	  url: ApiRequestURL + "InfoOverView/GetCountyList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			for (var i = 0; i < d.length; i++) {
				$("#add_pro_city").append('<option value="' + d[i].code + '">' + htmlEncode(d[i].name) + '</option>');
			}
		}
	  }
	});
}

function ca_insert_step1_getTownList() {
	var val = $("#add_pro_city").val();
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
				$("#add_pro_town").empty();
				$("#add_pro_town").append('<option selected value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					$("#add_pro_town").append('<option value="' + d[i].code + '">' + htmlEncode(d[i].name) + '</option>');
				}
				$("#add_pro_land").empty();
				$("#add_pro_land").append('<option selected value="-1">請選擇</option>');
			}
		}
	});
}
function ca_insert_step1_getLandList() {
	var county = $("#add_pro_city").val();
	var town = $("#add_pro_town").val();
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
				$("#add_pro_land").empty();
				$("#add_pro_land").append('<option selected value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					var landstr = "";
					landstr += d[i].sec == "" ? "" : d[i].sec + "段";
					landstr += d[i].sec_sub == "" ? "" : d[i].sec_sub + "小段";
					$("#add_pro_land").append('<option value="' + d[i].sec_code + '">' + landstr + '</option>');
				}
			}
		}
	});
}
function ca_insert_step1_ismoved_change() {
	var checked = $("#ismoved").is(":checked");
	
	if (checked) {
		$("#add_pro_areaha").prop('disabled', true);
		$("#add_pro_areaha").val("");
	}
	else {
		$("#add_pro_areaha").prop('disabled', false);
	}
	
	if (checked) {
		var post = {};
	
		post.County = $("#add_pro_city").find("option:selected").text();
		post.Town = $("#add_pro_town").find("option:selected").text();
		post.LandName = $("#add_pro_land").find("option:selected").text();
		post.LandNo = $("#add_pro_pmno").val() + '-' + $("#add_pro_pcno").val();
		
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
							$("#add_pro_areaha").prop('disabled', false);
						}
						else {
							$("#add_pro_areaha").val(d);
						}
					}, 500);
				}
			}
		});
	}
}
function ca_AddNewSave()
{
	var area = $("#add_pro_areaha").val();
	var city = $("#add_pro_city").val();
	var town = $("#add_pro_town").val();
	var land = $("#add_pro_land").val();

	var tenum1 = $("#add_pro_pmno").val();
	var tenum2 = $("#add_pro_pcno").val();
	
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
	
	var post = {};
	post.county = $("#add_pro_city").find("option:selected").text();
	post.town = $("#add_pro_town").find("option:selected").text();
	post.landname = $("#add_pro_land").find("option:selected").text();
	post.landno = $("#add_pro_pmno").val() + '-' + $("#add_pro_pcno").val();
	post.areaha = $("#add_pro_areaha").val();
	post.attr = $("#add_pro_attr").val();
	post.sid = ca_tab1.editinner.sid;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/InsertFMProtectionTargetProcess",
		type: "Post",
		data: post,
		beforeSend: function(){
           WaitingShow(true);
        },
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d == "1")
				{
					alert("新增保安林地籍成功.");
					ca_insert_step1_getnow();
					Close_ca_AddNewProjectModal();
				}
				else
				{
					alert("新增保安林地籍失敗.");
				}
			}
			setTimeout(function() { WaitingShow(false); }, 200);
		}
	});
}
function ca_insert_step1_tab2_clear()
{
	var check = CheckUserAccess("異動事件管理", "案件總覽", "編輯案件");
	if (!check) {
		alert("您沒有權限使用.")
		return;
	}
	AddNewLog("異動事件管理", "案件總覽", "編輯案件");
	
	var cfm = confirm('注意!當您選擇清除後將會將地籍列表以及地籍圖徵全數清空，您是否要繼續?');
	if (!cfm) return;
	
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.fmid = ca_tab1.editinner.fmid;

	$.ajax({
		url: ApiRequestURL + "ProjectManagement/ClearFMProtectionTargetTest",
		type: "Post",
		data: post,
		beforeSend: function(){
           WaitingShow(true);
        },
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d == "1")
				{
					alert("地籍清除成功.");
					$(".singleadd").hide();
					$(".ca_insert_step1_tab2nofile").show();
					$("#ca_insert_step1_tab2hasfile").hide();
					$(".ca_insert_step1_tab2hasfile").hide();
					ca_insert_step1_getnow();
					//ca_insert_step1_mapDataDraw();
				}
			}
			setTimeout(function() { WaitingShow(false); }, 200);
		}
	});
}
function ca_manage_insert_step1_upload_xls() {
	$('#upload_xls').click();
}
function ca_manage_insert_step1_upload_xls_toDB() {
	var formdata = new FormData();
	
	formdata.append('sid', ca_tab1.editinner.sid);
	formdata.append('fmid', ca_tab1.editinner.fmid);
	
	var filelist = $('#upload_xls').prop('files');
	$.each(filelist, function(j, file) {
		formdata.append('files', file);
	});
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/UploadFMProtectionXlsTargetTest",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data;
				
				if (d == 'ERROR')
				{
					alert("清冊比對錯誤.");
					WaitingShow(false);
				}
				else
				{
					$("#differencenote").modal("show");
					$("#ca_diff_body").empty();
					$("#ca_diff_body").scrollTop(0);
					var d2 = data.data.ulist;
					if (d2.length == 0) {
						var text = '<tr>';
						text += '<td>' + '無符合查詢結果' + '</td>';
						text += '</tr>';
						
						$("#ca_diff_body").append(text);
					}
					else {
						for (var i = 0; i < d2.length; i++) {
							var text = '<tr>';
							text += '<td>' + htmlEncode(d2[i].status) + '</td>';
							text += '<td>' + htmlEncode(d2[i].countyName) + '</td>';
							text += '<td>' + htmlEncode(d2[i].townName) + '</td>';
							text += '<td>' + htmlEncode(d2[i].landName) + '</td>';
							text += '<td>' + htmlEncode(d2[i].pm_pc) + '</td>';
							text += '</tr>';
							$("#ca_diff_body").append(text);
						}
					}
					$("#diff_currect").empty();
					$("#diff_error").empty();
					
					$("#diff_currect").append(data.data.correctCount + "筆");
					$("#diff_error").append(data.data.errorCount + "筆");
					
					WaitingShow(false);
				}
			}
		}
	});
}
function ca_insert_step1_ExportTargetCSV()
{
	var data = new FormData();
	data.append('sid', ca_tab1.editinner.sid);
	data.append('fmid', ca_tab1.editinner.fmid);
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "ProjectManagement/ExportFMProtectionTargetProcessCSV", true);
	request.responseType = 'blob';
	
	request.onload = function(e) {
		if (this.status === 200) {
			var blob = this.response;
			if(window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, "本次檢訂範圍.csv");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = "本次檢訂範圍.csv";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
       }
   };
   
   request.send(data);
}
var ulstatus = false;
function ca_insert_step1_DropList()
{
	if (!ulstatus)
	{
		$('#dropdownExport_ul').show();
		ulstatus = true;
	}
	else
	{
		$('#dropdownExport_ul').hide();
		ulstatus = false;
	}
}
function ca_insert_step1_ExportTargetSHP(isbuffer)
{
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.fmid = ca_tab1.editinner.fmid;
	
	if (isbuffer) post.isbuffer = "true";
	
	ulstatus = false;
	$('#dropdownExport_ul').hide();
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/ExportFMProtectionTargetProcessSHP",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data && data.data != 'NotFound') {
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
				document.remove(a);
			}
			else {
				alert('未取得前次檢訂範圍地籍相關資料');
			}
		}
	});
}
function ca_insert_step1_DownloadLastSHP()
{
	var post = {};
	post.fmid = ca_tab1.editinner.fmid;
	post.year = ca_insert.lastdata2.year;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/ExportFMProtectionLastSHP",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data && data.data != 'NotFound') {
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
				document.remove(a);
			}
			else {
				alert('未取得前次檢訂範圍地籍相關資料');
			}
		}
	});
}
function ca_insert_step1_DownloadLastSHP2()
{
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.year = ca_tab1.editinner.year;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/ExportFMProtectionTargetSHP",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
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
function ca_insert_step1_ExportLastCSV()
{
	var data = new FormData();
	data.append('sid', ca_tab1.editinner.sid);
	data.append('fmid', ca_tab1.editinner.fmid);

	WaitingShow(true);
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "ProjectManagement/ExportFMProtectionLastProcessCSV", true);
	request.responseType = 'blob';

	request.onload = function(e) {
		setTimeout(function() {
			WaitingShow(false);
		}, 200);
		if (this.status === 200) {
			var blob = this.response;
			if(window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, "前次檢訂範圍.csv");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = "前次檢訂範圍.csv";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
       }
   };
   
   request.send(data);
}
function ca_insert_step1_ExportLastSHP()
{
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.fmid = ca_tab1.editinner.fmid;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/ExportFMProtectionLastProcessSHP",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data && data.data != 'NotFound') {
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
				document.remove(a);
			} else {
				alert('未取得前次檢訂範圍地籍相關資料');
			}
		}
	});
}
function ca_insert_step1_nowcheckshow(that)
{
	if (that.checked == true)
	{
		ca_insert.map.geomvector_layer2.setVisible(true);
	}
	else
	{
		ca_insert.map.geomvector_layer2.setVisible(false);
	}
}
function ca_insert_step1_lastcheckshow(that)
{
	if (that.checked == true)
	{
		ca_insert.map.geomvector_layer1.setVisible(true);
	}
	else
	{
		ca_insert.map.geomvector_layer1.setVisible(false);
	}
}
function ca_insert_step1_nowprocessShow()
{
	// 顯示本次地籍清冊
	ca_insert.map.geomvector_layer.setVisible(true);
}
function ca_insert_step1_nowprocessHide()
{
	// 關閉本次地籍清冊
	ca_insert.map.geomvector_layer.setVisible(false);
}
function ca_insert_step1_lastprocessShow()
{
	// 顯示上次地籍清冊
	ca_insert.map.geomextra_layer.setVisible(true);
}
function ca_insert_step1_lastprocessHide()
{
	// 關閉上次地籍清冊
	ca_insert.map.geomextra_layer.setVisible(false);
}
function ca_manage_insert_step2_UploadFile(uploadid, ftype) {
	var input = document.getElementById(uploadid);
	var files = input.files;
	
	var formdata = new FormData();
	formdata.append('sid', ca_tab1.editinner.sid);
	formdata.append('filetype', ftype);
	$.each(files, function(j, file){
		formdata.append('files', file);
	});
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/UploadFMProtectionTargetFiles",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d == "1")
				{
					ca_manage_insert_step2_GetNowFiles();
				}
				else
				{
					alert("上傳失敗.");
				}
			}
		}
	});
	
	$("#" + uploadid).replaceWith($("#" + uploadid).val('').clone(true));
}
function ca_manage_insert_step2_DeleteFile(sid) {
	var cfm = confirm('是否確定刪除檔案?');
	if (!cfm) return;
	
	var post = {};
	post.fileid = sid;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/DeleteFMProtectionTargetFile",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d == "1")
				{
					ca_manage_insert_step2_GetNowFiles();
				}
				else
				{
					alert("刪除失敗.");
				}
			}
		}
	});
}
function ca_manage_insert_step2_GetNowFiles() {
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.fmid = ca_tab1.editinner.fmid;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMProtectionTargetFiles",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				$("#upload_report_file_list").empty();
				$("#upload_list_file_list").empty();
				$("#upload_result_file_list").empty();
				$("#upload_unlockresult_file_list").empty();
				$("#upload_coss_file_list").empty();
				$("#upload_other_file_list").empty();
				
				var d = data.data;
				for (var i = 0; i < d.length; i++)
				{
					var tmp = "";
					
					if (!ca_tab1.innershowlast) {
						tmp = "<div class='row'><div class='col'><span style='color: rgba(116,100,42,1);cursor: pointer;' onclick='ca_manage_insert_downloadfile(" + d[i].sid + ");'>" + htmlEncode(d[i].filename) + "</span></div><div class='col'></div></div>";
					}
					else {
						tmp = "<div class='row'><div class='col'><span style='color: rgba(116,100,42,1);cursor: pointer;' onclick='ca_manage_insert_downloadfile(" + d[i].sid + ");'>" + htmlEncode(d[i].filename) + "</span></div><div class='col'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=ca_manage_insert_step2_DeleteFile(" + d[i].sid + ")>刪除</button></div></div>";
					}
					
					if (d[i].type == "1")
					{
						$("#upload_report_file_list").append(tmp);
					}
					else if (d[i].type == "2")
					{
						$("#upload_list_file_list").append(tmp);
					}
					else if (d[i].type == "3")
					{
						$("#upload_result_file_list").append(tmp);
					}
					else if (d[i].type == "4")
					{
						$("#upload_unlockresult_file_list").append(tmp);
					}
					else if (d[i].type == "5")
					{
						$("#upload_coss_file_list").append(tmp);
					}
					else if (d[i].type == "6")
					{
						$("#upload_other_file_list").append(tmp);
					}
				}
				
				ca_insert.nowfiles = d;
			}
		}
	});
}
function ca_manage_insert_step2_GetLastFiles() {
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.fmid = ca_tab1.editinner.fmid;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMProtectionLastFiles",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				$("#upload_report_file_list2").empty();
				$("#upload_list_file_list2").empty();
				$("#upload_result_file_list2").empty();
				$("#upload_unlockresult_file_list2").empty();
				$("#upload_coss_file_list2").empty();
				$("#upload_other_file_list2").empty();
				
				var d = data.data;
				for (var i = 0; i < d.length; i++)
				{
					var tmp = "<div class='row'><div class='col'><span style='color: rgba(116,100,42,1);cursor: pointer;' onclick='ca_manage_insert_downloadlastfile(" + d[i].sid + ");'>" + d[i].filename + "</span></div></div>";
					
					if (d[i].type == "1")
					{
						$("#upload_report_file_list2").append(tmp);
					}
					else if (d[i].type == "2")
					{
						$("#upload_list_file_list2").append(tmp);
					}
					else if (d[i].type == "3")
					{
						$("#upload_result_file_list2").append(tmp);
					}
					else if (d[i].type == "4")
					{
						$("#upload_unlockresult_file_list2").append(tmp);
					}
					else if (d[i].type == "5")
					{
						$("#upload_coss_file_list2").append(tmp);
					}
					else if (d[i].type == "6")
					{
						$("#upload_other_file_list2").append(tmp);
					}
				}
				ca_insert.lastfiles = d;
			}
		}
	});
}
function ca_manage_insert_downloadfile(sid) {
	var data = ca_insert.nowfiles;
	
	var file = null;
	for (var i = 0; i < data.length; i++) {
		if (sid == data[i].sid) {
			file = data[i];
			break;
		}
	}
	
	if (file)
	{
		var link = document.createElement('a');
		document.body.appendChild(link);
        link.download = file.filename;
        //link.href = DownLoadProtectionURL + ca_tab1.editinner.sid + '/' + file.savename;
		link.href = DonwLoadTopURL + file.path + file.savename;
        link.click();
        document.body.removeChild(link);
	}
	else
	{
		alert('下載發生錯誤.');
	}
}
function ca_manage_insert_downloadlastfile(sid) {
	var data = ca_insert.lastfiles;
	
	var file = null;
	for (var i = 0; i < data.length; i++) {
		if (sid == data[i].sid) {
			file = data[i];
			break;
		}
	}
	
	if (file)
	{
		var link = document.createElement('a');
		document.body.appendChild(link);
        link.download = file.filename;
        link.href = DownLoadProtectionURL + ca_tab1.editinner.sid + '/' + file.savename;
        link.click();
        document.body.removeChild(link);
	}
	else
	{
		alert('下載發生錯誤.');
	}
}
function ca_manage_insert_downloadAlllastfiles() {
	var post = {};
	post.sid = ca_tab1.editinner.sid;
	post.fmid = ca_tab1.editinner.fmid;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/DownloadFMProtectionAllLastFiles",
		type: "Post",
		data: post,
		success: function(data) {
			if (data && data.data != '-1') {
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DownLoadProtectionURL + guid + ".zip";
				a.click();
				document.remove(a);
			}
			else {
				alert('下載失敗.');
			}
		}
	});
}
function ca_insert_turnback() {
	$(".tab_body_content.tab_case_all").load("./views/ca_manage_tab1.html");
}
function ca_manage_insert_step2_GetFileListState() {
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMProtectionFileListState",
		type: "Post",
		success: function(data) {
			if (data && data.data) {
				var d = data.data;
				
				ca_manage_insert_step2.donwloadstate = d;
				
				for (var i = 0; i < d.length; i++) {
					if (d[i].status == "False") {
						$("#titem_" + d[i].order).hide();
					}
					else {
						$('#t_' + d[i].order + '_note').empty();
						$('#t_' + d[i].order + '_note').append(htmlEncode(d[i].note));
						
						if (d[i].template != "") {
							$('#t_' + d[i].order + '_template').show();
						}
					}
				}
			}
		}
	});
}
function ca_manage_insert_step2_DownloadTemplate(type) {
	var d = ca_manage_insert_step2.donwloadstate;
	for (var i = 0; i < d.length; i++) {
		if (d[i].name == type) {
			var a = document.createElement("a");
			a.href = DonwLoadTopURL + d[i].template;
			a.click();
			document.remove(a);
		}
	}
}
function ca_api(Unit, LandNo, Sec) {
	var post = {};
	
	post.Unit = Unit;
	post.Sec = Sec;
	post.No = LandNo;
	
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
				fi_fc_api2(Unit, LandNo, Sec, mgmt);
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
function ca_owner_close() {
	$("#ownerdata").modal('hide');
}

function ca_insert_step1_cselect_change() {
	var value = $('#ca_insert_step1_cselect').val();
	var d = ca_insert.lastdata2;
	
	$("#ca_insert_step1_tab1tbody").empty();
	if (d.hlist.length > 0 || d.olist.length > 0)
	{
		var hlist = d.hlist;
		for (var i = 0; i < hlist.length; i++)
		{
			if (hlist[i].attr == "排除") {
				continue;
			}
			if (value != "-1" && hlist[i].attr != value) {
				continue;
			}
			
			var t = "<tr id='last_hlist_" + hlist[i].sid + "' onclick='ca_insert_step1_list_click(\"last\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
			
			t += '<td>' + htmlEncode(hlist[i].status) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].attr) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ratio) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].cityname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].townname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].landname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].pm_no) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].pc_no) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].zoingname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].lclassname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].areaha) + '</td>';
			t += '<td>' + htmlEncode(formatDateTime_Date(hlist[i].updatetime)) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ownertype) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ownermanage) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].landcode) + '</td>';
			t += "<td><button class='btn btn-success' onclick='ca_api(\"" + hlist[i].unit + "\",\"" + hlist[i].landno + "\",\"" + hlist[i].sec + "\")'>查看</button></td>";
				
			t += "</tr>";
			
			$("#ca_insert_step1_tab1tbody").append(t);
		}
		
		var olist = d.olist;
		for (var i = 0; i < olist.length; i++)
		{
			if (value != "-1" && olist[i].attr != value) {
				continue;
			}
			if (olist[i].attr == "排除") {
				continue;
			}
			
			var t = "<tr id='last_olist_" + olist[i].sid + "' class='otherdata' onclick='ca_insert_step1_list_click(\"last\", \"olist\", \"" + olist[i].sid + "\", this, event)'>";
			
			t += '<td>' + htmlEncode(olist[i].status) + '</td>';
			t += '<td>' + htmlEncode(olist[i].attr) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ratio) + '</td>';
			t += '<td>' + htmlEncode(olist[i].cityname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].townname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].landname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].pm_no) + '</td>';
			t += '<td>' + htmlEncode(olist[i].pc_no) + '</td>';
			t += '<td>' + htmlEncode(olist[i].zoingname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].lclassname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].areaha) + '</td>';
			t += '<td>' + htmlEncode(formatDateTime_Date(olist[i].updatetime)) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ownertype) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ownermanage) + '</td>';
			t += '<td>' + htmlEncode(olist[i].landcode) + '</td>';
			t += "<td><button class='btn btn-success' onclick='ca_api(\"" + olist[i].unit + "\",\"" + olist[i].landno + "\",\"" + olist[i].sec + "\")'>查看</button></td>";
				
			t += "</tr>";
			
			$("#ca_insert_step1_tab1tbody").append(t);
		}
	}
}

function ca_insert_step1_cinput_change() {
	var value = $('#ca_insert_step1_cinput').val();
	var d = ca_insert.lastdata2;
	
	$("#ca_insert_step1_tab1tbody").empty();
	
	if (d.hlist.length > 0 || d.olist.length > 0)
	{
		var hlist = d.hlist;
		for (var i = 0; i < hlist.length; i++)
		{
			if (hlist[i].attr == "排除") {
				continue;
			}
			if (value != "" && !hlist[i].cityname.includes(value) && !hlist[i].townname.includes(value)
				&& !hlist[i].landname.includes(value) && !hlist[i].pm_no.includes(value) && !hlist[i].pc_no.includes(value) && !hlist[i].zoingname.includes(value) && !hlist[i].lclassname.includes(value) && !hlist[i].ownermanage.includes(value) && !hlist[i].landcode.includes(value) && !hlist[i].sec.includes(value)
				) {
				continue;
			}
			
			var t = "<tr id='last_hlist_" + hlist[i].sid + "' onclick='ca_insert_step1_list_click(\"last\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
			
			t += '<td>' + htmlEncode(hlist[i].status) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].attr) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ratio) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].cityname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].townname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].landname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].pm_no) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].pc_no) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].zoingname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].lclassname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].areaha) + '</td>';
			t += '<td>' + htmlEncode(formatDateTime_Date(hlist[i].updatetime)) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ownertype) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ownermanage) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].landcode) + '</td>';
			t += "<td><button class='btn btn-success' onclick='ca_api(\"" + hlist[i].unit + "\",\"" + hlist[i].landno + "\",\"" + hlist[i].sec + "\")'>查看</button></td>";
				
			t += "</tr>";
			
			$("#ca_insert_step1_tab1tbody").append(t);
		}
		
		var olist = d.olist;
		for (var i = 0; i < olist.length; i++)
		{
			if (value != "" && !olist[i].cityname.includes(value) && !olist[i].townname.includes(value)
				&& !olist[i].landname.includes(value) && !olist[i].pm_no.includes(value) && !olist[i].pc_no.includes(value) && !olist[i].zoingname.includes(value) && !olist[i].lclassname.includes(value) && !olist[i].ownermanage.includes(value) && !olist[i].landcode.includes(value) && !olist[i].sec.includes(value)
				) {
				continue;
			}
			if (olist[i].attr == "排除") {
				continue;
			}
			
			var t = "<tr id='last_olist_" + olist[i].sid + "' class='otherdata' onclick='ca_insert_step1_list_click(\"last\", \"olist\", \"" + olist[i].sid + "\", this, event)'>";
			
			t += '<td>' + htmlEncode(olist[i].status) + '</td>';
			t += '<td>' + htmlEncode(olist[i].attr) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ratio) + '</td>';
			t += '<td>' + htmlEncode(olist[i].cityname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].townname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].landname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].pm_no) + '</td>';
			t += '<td>' + htmlEncode(olist[i].pc_no) + '</td>';
			t += '<td>' + htmlEncode(olist[i].zoingname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].lclassname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].areaha) + '</td>';
			t += '<td>' + htmlEncode(formatDateTime_Date(olist[i].updatetime)) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ownertype) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ownermanage) + '</td>';
			t += '<td>' + htmlEncode(olist[i].landcode) + '</td>';
			t += "<td><button class='btn btn-success' onclick='ca_api(\"" + olist[i].unit + "\",\"" + olist[i].landno + "\",\"" + olist[i].sec + "\")'>查看</button></td>";
				
			t += "</tr>";
			
			$("#ca_insert_step1_tab1tbody").append(t);
		}
	}
}

function ca_insert_step2_cselect_change() {
	var value = $('#ca_insert_step2_cselect').val();
	var d = ca_insert.nowdata;
	
	$("#ca_insert_step1_tab2tbody").empty();
	var check = CheckUserAccess("異動事件管理", "案件總覽", "編輯案件");
	if (d.hlist.length > 0 || d.olist.length > 0)
	{
		$("#ca_insert_step1_tab2tbody").empty();
		
		var hlist = d.hlist;
		for (var i = 0; i < hlist.length; i++)
		{
			if (value != "-1" && hlist[i].attr != value) {
				continue;
			}
			var t = "";
			
			if (ca_tab1.innershowlast && check && hlist[i].attr == "排除") {
				t += "<tr id='now_hlist_" + hlist[i].sid + "' class='isout' onclick='ca_insert_step1_list_click(\"now\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
			}
			else {
				t += "<tr id='now_hlist_" + hlist[i].sid + "' onclick='ca_insert_step1_list_click(\"now\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
			}
			
			t += '<td>' + hlist[i].status + '</td>';
			
			if (ca_tab1.innershowlast && check)
			{
				t += '<td><select onchange="ca_insert_step1_update_process(\'' + hlist[i].sid + '\', this, false)">';
				
				if (hlist[i].attr == "整筆")
					t += '<option value="整筆" selected>整筆</option>';
				else
					t += '<option value="整筆">整筆</option>';
				
				if (hlist[i].attr == "之內")
					t += '<option value="之內" selected>之內</option>';
				else
					t += '<option value="之內">之內</option>';
				
				if (hlist[i].attr == "排除")
					t += '<option value="排除" selected>排除</option>';
				else
					t += '<option value="排除">排除</option>';
				
				t += '</select></td>';
			}
			else
			{
				t += '<td>' + hlist[i].attr + '</td>';
				if (hlist[i].attr == "排除") {
					continue;
				}
			}
			
			t += '<td style="padding-left: 10px !important;">' + hlist[i].ratio + '</td>';
			
			t += '<td>' + htmlEncode(hlist[i].cityname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].townname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].landname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].pm_no) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].pc_no) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].zoingname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].lclassname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].areaha) + '</td>';
			t += '<td>' + htmlEncode(formatDateTime_Date(hlist[i].updatetime)) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ownertype) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ownermanage) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].landcode) + '</td>';
			t += "<td><button class='btn btn-success' onclick='ca_api(\"" + hlist[i].unit + "\",\"" + hlist[i].landno + "\",\"" + hlist[i].sec + "\")'>查看</button></td>";
				
			t += "</tr>";
			
			$("#ca_insert_step1_tab2tbody").append(t);
		}
		
		var olist = d.olist;
		for (var i = 0; i < olist.length; i++)
		{
			if (value != "-1" && olist[i].attr != value) {
				continue;
			}
			var t = "<tr id='now_olist_" + olist[i].sid + "' class='otherdata' onclick='ca_insert_step1_list_click(\"now\", \"olist\", \"" + olist[i].sid + "\", this, event)'>";
			
			t += '<td>' + olist[i].status + '</td>';
			
			if (ca_tab1.innershowlast && check)
			{
				t += '<td><select onchange="ca_insert_step1_update_process(\'' + olist[i].sid + '\', this, true)">';
				
				if (olist[i].attr == "整筆")
					t += '<option value="整筆" selected>整筆</option>';
				else
					t += '<option value="整筆">整筆</option>';
				
				if (olist[i].attr == "之內")
					t += '<option value="之內" selected>之內</option>';
				else
					t += '<option value="之內">之內</option>';
				
				if (olist[i].attr == "排除")
					t += '<option value="排除" selected>排除</option>';
				else
					t += '<option value="排除">排除</option>';
				
				t += '</select></td>';
			}
			else
			{
				t += '<td>' + olist[i].attr + '</td>';
				if (olist[i].attr == "排除") {
					continue;
				}
			}
			
			t += '<td style="padding-left: 10px !important;">' + olist[i].ratio + '</td>';
			
			t += '<td>' + htmlEncode(olist[i].cityname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].townname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].landname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].pm_no) + '</td>';
			t += '<td>' + htmlEncode(olist[i].pc_no) + '</td>';
			t += '<td>' + htmlEncode(olist[i].zoingname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].lclassname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].areaha) + '</td>';
			t += '<td>' + htmlEncode(formatDateTime_Date(olist[i].updatetime)) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ownertype) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ownermanage) + '</td>';
			t += '<td>' + htmlEncode(olist[i].landcode) + '</td>';
			t += "<td><button class='btn btn-success' onclick='ca_api(\"" + olist[i].unit + "\",\"" + olist[i].landno + "\",\"" + olist[i].sec + "\")'>查看</button></td>";
				
			t += "</tr>";
			
			$("#ca_insert_step1_tab2tbody").append(t);
		}
	}
}

function ca_insert_step2_cinput_change() {
	var value = $('#ca_insert_step2_cinput').val();
	var d = ca_insert.nowdata;
	
	$("#ca_insert_step1_tab2tbody").empty();
	var check = CheckUserAccess("異動事件管理", "案件總覽", "編輯案件");
	if (d.hlist.length > 0 || d.olist.length > 0)
	{
		$("#ca_insert_step1_tab2tbody").empty();
		
		var hlist = d.hlist;
		for (var i = 0; i < hlist.length; i++)
		{
			if (value != "" && !hlist[i].cityname.includes(value) && !hlist[i].townname.includes(value)
				&& !hlist[i].landname.includes(value) && !hlist[i].pm_no.includes(value) && !hlist[i].pc_no.includes(value) && !hlist[i].zoingname.includes(value) && !hlist[i].lclassname.includes(value) && !hlist[i].ownermanage.includes(value) && !hlist[i].landcode.includes(value) && !hlist[i].sec.includes(value)
				) {
				continue;
			}
			var t = "";
			
			if (ca_tab1.innershowlast && check && hlist[i].attr == "排除") {
				t += "<tr id='now_hlist_" + hlist[i].sid + "' class='isout' onclick='ca_insert_step1_list_click(\"now\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
			}
			else {
				t += "<tr id='now_hlist_" + hlist[i].sid + "' onclick='ca_insert_step1_list_click(\"now\", \"hlist\", \"" + hlist[i].sid + "\", this, event)'>";
			}
			
			t += '<td>' + hlist[i].status + '</td>';
			
			if (ca_tab1.innershowlast && check)
			{
				t += '<td><select onchange="ca_insert_step1_update_process(\'' + hlist[i].sid + '\', this, false)">';
				
				if (hlist[i].attr == "整筆")
					t += '<option value="整筆" selected>整筆</option>';
				else
					t += '<option value="整筆">整筆</option>';
				
				if (hlist[i].attr == "之內")
					t += '<option value="之內" selected>之內</option>';
				else
					t += '<option value="之內">之內</option>';
				
				if (hlist[i].attr == "排除")
					t += '<option value="排除" selected>排除</option>';
				else
					t += '<option value="排除">排除</option>';
				
				t += '</select></td>';
			}
			else
			{
				t += '<td>' + hlist[i].attr + '</td>';
				if (hlist[i].attr == "排除") {
					continue;
				}
			}
			
			t += '<td style="padding-left: 10px !important;">' + hlist[i].ratio + '</td>';
			
			t += '<td>' + htmlEncode(hlist[i].cityname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].townname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].landname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].pm_no) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].pc_no) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].zoingname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].lclassname) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].areaha) + '</td>';
			t += '<td>' + htmlEncode(formatDateTime_Date(hlist[i].updatetime)) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ownertype) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].ownermanage) + '</td>';
			t += '<td>' + htmlEncode(hlist[i].landcode) + '</td>';
			t += "<td><button class='btn btn-success' onclick='ca_api(\"" + hlist[i].unit + "\",\"" + hlist[i].landno + "\",\"" + hlist[i].sec + "\")'>查看</button></td>";
				
			t += "</tr>";
			
			$("#ca_insert_step1_tab2tbody").append(t);
		}
		
		var olist = d.olist;
		for (var i = 0; i < olist.length; i++)
		{
			if (value != "" && !olist[i].cityname.includes(value) && !olist[i].townname.includes(value)
				&& !olist[i].landname.includes(value) && !olist[i].pm_no.includes(value) && !olist[i].pc_no.includes(value) && !olist[i].zoingname.includes(value) && !olist[i].lclassname.includes(value) && !olist[i].ownermanage.includes(value) && !olist[i].landcode.includes(value) && !olist[i].sec.includes(value)
				) {
				continue;
			}
			var t = "<tr id='now_olist_" + olist[i].sid + "' class='otherdata' onclick='ca_insert_step1_list_click(\"now\", \"olist\", \"" + olist[i].sid + "\", this, event)'>";
			
			t += '<td>' + olist[i].status + '</td>';
			
			if (ca_tab1.innershowlast && check)
			{
				t += '<td><select onchange="ca_insert_step1_update_process(\'' + olist[i].sid + '\', this, true)">';
				
				if (olist[i].attr == "整筆")
					t += '<option value="整筆" selected>整筆</option>';
				else
					t += '<option value="整筆">整筆</option>';
				
				if (olist[i].attr == "之內")
					t += '<option value="之內" selected>之內</option>';
				else
					t += '<option value="之內">之內</option>';
				
				if (olist[i].attr == "排除")
					t += '<option value="排除" selected>排除</option>';
				else
					t += '<option value="排除">排除</option>';
				
				t += '</select></td>';
			}
			else
			{
				t += '<td>' + olist[i].attr + '</td>';
				if (olist[i].attr == "排除") {
					continue;
				}
			}
			
			t += '<td style="padding-left: 10px !important;">' + olist[i].ratio + '</td>';
			
			t += '<td>' + htmlEncode(olist[i].cityname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].townname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].landname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].pm_no) + '</td>';
			t += '<td>' + htmlEncode(olist[i].pc_no) + '</td>';
			t += '<td>' + htmlEncode(olist[i].zoingname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].lclassname) + '</td>';
			t += '<td>' + htmlEncode(olist[i].areaha) + '</td>';
			t += '<td>' + htmlEncode(formatDateTime_Date(olist[i].updatetime)) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ownertype) + '</td>';
			t += '<td>' + htmlEncode(olist[i].ownermanage) + '</td>';
			t += '<td>' + htmlEncode(olist[i].landcode) + '</td>';
			t += "<td><button class='btn btn-success' onclick='ca_api(\"" + olist[i].unit + "\",\"" + olist[i].landno + "\",\"" + olist[i].sec + "\")'>查看</button></td>";
				
			t += "</tr>";
			
			$("#ca_insert_step1_tab2tbody").append(t);
		}
	}
}
function ca_step1_diff_close() {
	$("#differencenote").modal("hide");
}