function api_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab"+i).load("./views/api_manage_tab" + i + ".html"); 
}
// API 服務/審核 START
function api_manage_inti() {
	getApiListinit();
	
	$("#apply_api_start,#apply_api_end").prop("disabled", false);
	$('#apply_api_start,#apply_api_end').datepicker({
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
function getApiListinit() {
	$.ajax({
		url: ApiRequestURL + "ApiManagement/GetApiList",
		type: "Post",
		async: false,
		success: function(data) {
			var d = data.data;
			if (d) {
				getApiList(d);
				getApiIllustrate(d);
			}
		}
	});
}
function getApiList(d) {
	var data = d;
	
	for (var i = 0; i < data.length; i++) {
		var tmp = "";
		tmp += "<tr>";
		tmp += "<td>" + (i + 1) + "</td>";
		tmp += "<td>" + data[i].name + "</td>";
		tmp += "<td>" + formatDateTime_Date(data[i].time) + "</td>";
		tmp += "<td>" + data[i].illustrate + "</td>";
		tmp += "<td>" + data[i].count + "</td>";
		tmp += '<td><label style="color:#74642A; cursor: pointer;" onclick="viewapiapply(\'' + data[i].sid + '\',\'' + data[i].name + '\');">我要申請</label></td>';
		tmp += "</tr>";
		
		$("#api_tab_list").append(tmp);
	}
}
function getApiIllustrate(d) {
	var data = d;
	
	for (var i = 0; i < data.length; i++) {
		var tmp = '<div>' + (i + 1) + data[i].name + '</div>';
		tmp += '<textarea>' + (ApiRequestURL + "ApiManagement/" + data[i].api) + '</textarea>';
		tmp += '<table class="table_c api_tab_list">';
		tmp += '<thead><tr><td>參數名稱</td><td>必填/選填</td><td>預設值</td><td>說明</td></tr></thead>';
		tmp += '<tbody class="ztbody">';
		for (var j = 0; j < data[i].param.length; j++) {
			tmp += '<tr>';
			tmp += '<td>' + data[i].param[j].name + '</td>';
			tmp += '<td>' + data[i].param[j].isRequired + '</td>';
			tmp += '<td>' + data[i].param[j].dvalue + '</td>';
			tmp += '<td>' + data[i].param[j].illustrate + '</td>';
			tmp += '</tr>'
		}
		tmp += '</tbody>';
		tmp += '</table>';
		
		$("#api_tab_illustrate").append(tmp);
	}
}
function viewapiapply(apiid, apiname) {
	$("#api_apply_view").show();
	$("#api_list_view").hide();
	
	$("#api_apply_targetid").val(apiid);
	$("#api_apply_targetname").empty();
	$("#api_apply_targetname").append(apiname);
	
	$("#apply_api_name").val("");
	$("#apply_api_unit").val("");
	$("#apply_api_mail").val("");
	$("#apply_api_phone").val("");
	$("#apply_api_start").val("");
	$("#apply_api_end").val("");
	$("#apply_api_use").val("");
	$("#api_apply_ip1").val("");
	$("#api_apply_ip2").val("");
	$("#api_apply_ip3").val("");
	$("#api_apply_ip4").val("");
	$("#api_apply_ip5").val("");
	
	getApplyBase();
}
function getApplyBase() {
	$.ajax({
		url: ApiRequestURL + "ApiManagement/GetApiApplyBase",
		type: "Post",
		async: false,
		success: function(data) {
			var d = data.data;

			$("#apply_api_time").empty();
			$("#apply_api_time").append(d.applyTime);
			$("#apply_api_guid").empty();
			$("#apply_api_guid").append(d.applyGid);
		}
	});
}
function ApplyApiClear() {
	$("#apply_api_name").val("");
	$("#apply_api_unit").val("");
	$("#apply_api_mail").val("");
	$("#apply_api_phone").val("");
	$("#apply_api_start").val("");
	$("#apply_api_end").val("");
	$("#apply_api_use").val("");
	$("#api_apply_ip1").val("");
	$("#api_apply_ip2").val("");
	$("#api_apply_ip3").val("");
	$("#api_apply_ip4").val("");
	$("#api_apply_ip5").val("");
	
	$("#api_apply_view").hide();
	$("#api_list_view").show();
}
function SentApplyApi() {
	var post = {};
	
	post.ApplyNo = $("#apply_api_guid").html();
	post.ApplyName = $("#apply_api_name").val();
	post.ApplyDep = $("#apply_api_unit").val();
	post.ApplyMail = $("#apply_api_mail").val();
	post.ApplyPhone = $("#apply_api_phone").val();
	post.Purpose = $("#apply_api_use").val();
	post.ApplyStartDate = $("#apply_api_start").val();
	post.ApplyEndDate = $("#apply_api_end").val();
	post.ServiceName = $("#api_apply_targetname").html();
	
	post.Ip1 = $("#api_apply_ip1").val();
	post.Ip2 = $("#api_apply_ip2").val();
	post.Ip3 = $("#api_apply_ip3").val();
	post.Ip4 = $("#api_apply_ip4").val();
	post.Ip5 = $("#api_apply_ip5").val();
	post.ApplyTime = $("#apply_api_time").html();
	
	if (post.ApplyName == '') {
		alert('請輸入申請人姓名.');
		return;
	}
	if (post.ApplyDep == '') {
		alert('請輸入申請人服務單位名稱.');
		return;
	}
	if (post.ApplyMail == '') {
		alert('請輸入申請人電子信箱.');
		return;
	}
	if (post.ApplyPhone == '') {
		alert('請輸入申請人聯絡電話.');
		return;
	}
	if (post.ApplyStartDate == '' || post.ApplyEndDate == '') {
		alert('請輸入使用期間.');
		return;
	}
	if (post.Ip1 == '') {
		alert('請至少輸入第一組IP或DOMAIN.');
		return;
	}
	
	$.ajax({
		url: ApiRequestURL + "ApiManagement/ApiApply",
		data: post,
		type: "Post",
		async: false,
		success: function(data) {
			var d = data.data;

			if (d == "OK") {
				alert("送出申請成功.");
				$("#api_list_view").show();
				$("#api_apply_view").hide();
			}
			else if (d == "IPISREPEAT") {
				alert("檢查到輸入的IP或Domain在目前有效時間內已經被申請過，請確認是否有重複申請.");
			}
			else {
				alert("送出申請失敗.");
			}
		}
	});
}
function sys_api_init() {
	getApiApplyList();
	
	$("#review_apply_start,#review_apply_end").prop("disabled", false);
	$('#review_apply_start,#review_apply_end').datepicker({
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
function getApiApplyList() {
	var post = {};
	
	var uname = $("#sys_user_name").val();
	var name = $("#sys_user_unit").val();
	var astatus = $("#sys_ustatus").val();
	var sstatus = $("#sys_sstatus").val();
	
	if (name != "") {
		post.ApplyName = name;
	}
	if (uname != "") {
		post.ApplyUserName = uname;
	}
	if (astatus != "-1") {
		post.ApplyStatus = astatus;
	}
	if (sstatus != "-1") {
		post.ServiceStatus = sstatus;
	}
	
	$.ajax({
	  url: ApiRequestURL + "ApiManagement/ApiApplyList",
	  data: post,
	  type: "Post",
	  async: false,
	  success: function(data) {
		var d = data.data;

		$('#sys_user_page').pagination({
			dataSource: d,
			pageSize: 10,
			pageNumber: 1,
			callback: function(dd, pagination) {
				$("#sys_apiapply_list").empty();
				
				for (var i = 0; i < dd.length; i++) {
					var tmp = "<tr>";
					tmp += "<td>" + (i + 1) + "</td>";
					tmp += "<td>" + htmlEncode(dd[i].name) + "</td>";
					tmp += "<td>" + htmlEncode(dd[i].applyDep) + "</td>";
					tmp += "<td>" + htmlEncode(dd[i].applyTime) + "</td>";
					tmp += "<td>" + showapplyStatus(dd[i].applyStatus) + "</td>";
					tmp += "<td>" + showserviceStatus(dd[i].serviceStatus, dd[i].sid) + "</td>";
					
					if (dd[i].applyStatus == "2")
						tmp += "<td><label style='color: #74642A; cursor: pointer;' onclick=\"ApplyShow('" + dd[i].sid + "');\">審核</label></td>";
					else
						tmp += "<td>-</td>";
					
					tmp += "</tr>";
					
					$("#sys_apiapply_list").append(tmp);
				}
			}
		});
	  }
	});
}
function clearApiApplySearch() {
	$("#sys_user_name").val("");
	$("#sys_user_unit").val("");
	$("#sys_ustatus").val("-1");
	$("#sys_sstatus").val("-1");
	
	getApiApplyList();
}
function showapplyStatus(type) {
	if (type == "0") {
		return "<label style='color: #EB5B5B;'>不通過</label>";
	} else if (type == "1") {
		return "<label style='color: #198754;'>已通過</label>";
	} else if (type == "2") {
		return "<label style='color: #0088A4;'>待審核</label>";
	}
	return "";
}
function showserviceStatus(type, sid) {
	if (type == "1") {
		return '<div class="custom-switch form-switch"><input class="form-check-input" type="checkbox" onchange="api_service_state_update(this, \'' + sid + '\');" checked /></div>';
	} else if (type == "0") {
		return '<div class="custom-switch form-switch"><input class="form-check-input" type="checkbox" onchange="api_service_state_update(this, \'' + sid + '\');" /></div>';
	}
	return "-";
}
function api_service_state_update(that, sid) {
	var state = that.checked == true ? "1" : "0";
	var post = {};
	post.Sid = sid;
	post.ServiceStatus = state;
	
	$.ajax({
	  url: ApiRequestURL + "ApiManagement/UpdataApiServiceState",
	  data: post,
	  type: "Post",
	  async: false,
	  success: function(data) {
		var d = data.data;
		if (d == "OK")
			alert('更新成功.');
		else
			alert('更新失敗.');
	  }
	});
}
function ApplyShow(target) {
	var post = {};
	post.Sid = target;
	$.ajax({
	  url: ApiRequestURL + "ApiManagement/ApiApplyItem",
	  data: post,
	  type: "Post",
	  async: false,
	  success: function(data) {
		var d = data.data;
		clearApplyShow();
		
		$("#review_sid").val(d.sid);
		
		$("#review_apply_number").append(htmlEncode(d.applyNo));
		$("#review_apply_time").append(htmlEncode(d.applyTime));
		$("#review_apply_name").append(htmlEncode(d.applyName));
		$("#review_apply_unit").append(htmlEncode(d.applyDep));
		$("#review_apply_mail").append(htmlEncode(d.applyMail));
		$("#review_apply_phone").append(htmlEncode(d.applyPhone));
		
		var start = d.applyStartDate.split(' ')[0];
		var end = d.applyEndDate.split(' ')[0];
		$("#review_apply_usedate").append(start + "-" + end);
		
		$("#review_apply_puropse").append(htmlEncode(d.purpose));
		$("#review_apply_servicename").append(htmlEncode(d.serviceName));
		$("#review_apply_ip1").append(htmlEncode(d.ip1));
		$("#review_apply_ip2").append(htmlEncode(d.ip2));
		$("#review_apply_ip3").append(htmlEncode(d.ip3));
		$("#review_apply_ip4").append(htmlEncode(d.ip4));
		$("#review_apply_ip5").append(htmlEncode(d.ip5));
		
		$('#API_Apply').modal('show');
	  }
	});
}
function clearApplyShow() {
	$("#review_apply_number").empty();
	$("#review_apply_time").empty();
	$("#review_apply_name").empty();
	$("#review_apply_unit").empty();
	$("#review_apply_mail").empty();
	$("#review_apply_phone").empty();
	$("#review_apply_usedate").empty();
	$("#review_apply_puropse").empty();
	$("#review_apply_servicename").empty();
	$("#review_apply_ip1").empty();
	$("#review_apply_ip2").empty();
	$("#review_apply_ip3").empty();
	$("#review_apply_ip4").empty();
	$("#review_apply_ip5").empty();
	
	$("#review_apply_start").val("");
	$("#review_apply_end").val("");
	
	$("#review_apply_pass").click();
}
function ReviewApplyApi() {
	var post = {};
	
	var sid = $("#review_sid").val();
	var start = $("#review_apply_start").val();
	var end = $("#review_apply_end").val();
	var astatus = $('input[name="pass"]:checked').val();
	
	post.Sid = sid;
	
	if (astatus == true && (start == "" || end == "")) {
		alert("請輸入起始跟結束日期.");
		return;
	}
	
	post.UserStartDate = start;
	post.UserEndDate = end;
	post.ApplyStatus = astatus;
	
	$.ajax({
	  url: ApiRequestURL + "ApiManagement/ReviewApplyApi",
	  data: post,
	  type: "Post",
	  async: false,
	  success: function(data) {
		var d = data.data;
		
		if (d == "OK") {
			alert("審核成功.");
			$('#API_Apply').modal('hide');
			getApiApplyList();
			
		} else {
			alert("審核失敗.");
		}
	  }
	});
}
// API 服務/審核 END