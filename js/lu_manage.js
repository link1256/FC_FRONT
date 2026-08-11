// lu_tab1
var lu_tab1 = {};
function lu_tab1_init()
{
	
}

// lu_tab2
var lu_tab2 = {};
function lu_tab2_init()
{
	lu_tab2_getCountyList();
	lu_tab2_getFcZoningList();
	lu_tab2.page = 1;
	lu_tab2.pageLength = 10000;
}

function lu_tab2_setType(type)
{
	lu_tab2.searchType = type;
}

function lu_tab2_queryLandList(tpost, dragld)
{
	var check = CheckUserAccess("異動事件管理", "地籍存摺比對", "查詢");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	AddNewLog("異動事件管理", "地籍存摺比對", "查詢");
	
	$('#lu_search_result_zone').show();
	
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var sec = $("#search_sec").val();
	var num1 = $("#search_number1").val();
	var num2 = $("#search_number2").val();
	var zone = $("#search_zoning").val();
	var manage = $("#search_manage").val();
	var landcode = $("#search_land_code").val();
	var state = $("#search_state").val();
	var comstate = $("#search_comstate").val();
	
	var post = {};
	
	if (tpost)
		post = tpost;
	else {
		if (county != "-1")
		{
			post.County = [county];
		}
		if (town != "-1")
		{
			post.Town = town;
		}
		if (sec != "-1")
		{
			post.Sec = sec;
		}
		if (num1 != "" && num2 != "")
		{
			post.Number1 = num1;
			post.Number2 = num2;
		}
		if (zone.length > 0)
		{
			post.Zoning = zone;
		}
		if (manage != "")
		{
			post.Manage = manage;
		}
		if (landcode != "")
		{
			post.LandNo = landcode;
		}
		if (state != "-1")
		{
			post.State = state;
		}
		if (comstate != "-1")
		{
			post.ComState = comstate;
		}
		
		post.UserId = Logindata.sid;
	}
	
	lu_tab2.NowPost = post;
	
	var check2 = CheckUserAccess("異動事件管理", "地籍存摺比對", "編輯");
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetLandChangeCheckListCount",
		type: "Post",
		data: post,
		success: function(data) {
			if (data && (data.data || data.data == 0)) {
				var co = data.data;
				
				$("#lu_landcount").empty().append(thousandComma(co));
				
				if (tpost && tpost.page)
					lu_tab2.page = tpost.page;
				else
					lu_tab2.page = 1;
				
				lu_tab2.pageSize = 10000;
				lu_tab2.totalNumber = Math.ceil(co / 10000);
				
				lu_tab2.pagination = $('#lu_tab2_page').pagination({
					dataSource: Array(co),
					totalNumber: lu_tab2.totalNumber,
					pageSize: lu_tab2.pageSize,
					pageNumber: lu_tab2.page,
					callback: function(dd, pagination) {
						$("#lu_search_result").empty();
						
						post.page = pagination.pageNumber;
						post.pageLength = lu_tab2.pageSize;
						
						lu_tab2.pageTmpPost = post;
						
						WaitingShow(true);
						$.ajax({
							url: ApiRequestURL + "ProjectManagement/GetLandChangeCheckList",
							type: "Post",
							data: post,
							success: function(data) {
								setTimeout(function() {
									WaitingShow(false);
								}, 500);
								
								var d = data.data;
								lu_tab2.NowSearch = d;
								
								$("#lu_search_result").empty();
								
								for (var i = 0; i < d.length; i++)
								{
									if (i == 0 && d[i].over.length == 5) {
										var mstr = '';
										mstr += d[i].over[0] + d[i].over[1] + d[i].over[2] + '年';
										if (d[i].over[3] != '0')
											mstr += d[i].over[3];
										
										mstr += d[i].over[4] + '月';
										
										$("#lu_landversion").empty().append(mstr);
									}
									
									var tmp = '<tr id="item_' + d[i].landCode + '">';
									
									tmp += '<td>' + htmlEncode(d[i].county) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].town) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].sec) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].number) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].landCode) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].state) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].note) + '</td>';
									
									if (check2)
										tmp += '<td>' + '<button type="button" class="btn btn-success" onclick="lu_manage_edit(\''+ d[i].landCode + '\');">編輯</button>' + '</td>';
									else
										tmp += '<td></td>';
									
									tmp += '</tr>';
									
									$("#lu_search_result").append(tmp);
								}
								if (dragld) {
									var $objTr = $("#item_" + dragld);
									var objTr = $objTr[0];
									$(".main_scroll_mini").animate({ scrollTop: objTr.offsetTop - 34 }, "slow");
								}
							}
						});
					}
				});
			}
		}
	});
}

function lu_tab2_queryLandList2(tpost, dragld)
{
	var check = CheckUserAccess("異動事件管理", "地籍存摺比對", "查詢");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	AddNewLog("異動事件管理", "地籍存摺比對", "查詢");
	
	$('#lu_search_result_zone').show();
	
	var county = $("#search_county2").val();
	var zone = $("#search_zoning2").val();
	var manage = $("#search_manage2").val();
	var landcode = $("#search_land_code2").val();
	var state = $("#search_state2").val();
	var comstate = $("#search_comstate2").val();
	
	var post = {};
	
	if (tpost)
		post = tpost;
	else {
		if (county.length > 0)
		{
			post.County = county;
		}
		if (zone.length > 0)
		{
			post.Zoning = zone;
		}
		if (manage != "")
		{
			post.Manage = manage;
		}
		if (landcode != "")
		{
			post.LandNo = landcode;
		}
		if (state != "-1")
		{
			post.State = state;
		}
		if (comstate != "-1")
		{
			post.ComState = comstate;
		}
		
		post.UserId = Logindata.sid;
	}
	
	lu_tab2.NowPost = post;
	
	var check2 = CheckUserAccess("異動事件管理", "地籍存摺比對", "編輯");
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetLandChangeCheckListCount",
		type: "Post",
		data: post,
		success: function(data) {
			if (data && (data.data || data.data == 0)) {
				var co = data.data;
				
				$("#lu_landcount").empty().append(thousandComma(co));
				
				if (tpost && tpost.page)
					lu_tab2.page = tpost.page;
				else
					lu_tab2.page = 1;
				
				lu_tab2.pageSize = 10000;
				lu_tab2.totalNumber = Math.ceil(co / 10000);
				
				lu_tab2.pagination = $('#lu_tab2_page').pagination({
					dataSource: Array(co),
					totalNumber: lu_tab2.totalNumber,
					pageSize: lu_tab2.pageSize,
					pageNumber: lu_tab2.page,
					callback: function(dd, pagination) {
						$("#lu_search_result").empty();
						
						post.page = pagination.pageNumber;
						post.pageLength = lu_tab2.pageSize;
						
						lu_tab2.pageTmpPost = post;
						
						WaitingShow(true);
						
						$.ajax({
							url: ApiRequestURL + "ProjectManagement/GetLandChangeCheckList",
							type: "Post",
							data: post,
							success: function(data) {
								setTimeout(function() {
									WaitingShow(false);
								}, 500);
								
								var d = data.data;
								lu_tab2.NowSearch = d;
								
								$("#lu_search_result").empty();
								
								for (var i = 0; i < d.length; i++)
								{
									if (i == 0 && d[i].over.length == 5) {
										var mstr = '';
										mstr += d[i].over[0] + d[i].over[1] + d[i].over[2] + '年';
										if (d[i].over[3] != '0')
											mstr += d[i].over[3];
										
										mstr += d[i].over[4] + '月';
										
										$("#lu_landversion").empty().append(mstr);
									}
									
									var tmp = '<tr id="item_' + d[i].landCode + '">';
									
									tmp += '<td>' + htmlEncode(d[i].county) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].town) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].sec) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].number) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].landCode) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].state) + '</td>';
									tmp += '<td>' + htmlEncode(d[i].note) + '</td>';
									
									if (check2)
										tmp += '<td>' + '<button type="button" class="btn btn-success" onclick="lu_manage_edit(\''+ d[i].landCode + '\');">編輯</button>' + '</td>';
									else
										tmp += '<td></td>';
									
									tmp += '</tr>';
									
									$("#lu_search_result").append(tmp);
								}
								if (dragld) {
									var $objTr = $("#item_" + dragld);
									var objTr = $objTr[0];
									$(".main_scroll_mini").animate({ scrollTop: objTr.offsetTop - 34 }, "slow");
								}
							}
						});
					}
				});
			}
		}
	});
}

function lu_tab2_reset()
{
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
	
	$("#search_number1").val("");
	$("#search_number2").val("");
	
	$("#search_manage").val("");
	$("#search_land_code").val("");
	
	$("#search_state").val("-1");
	$("#search_comstate").val("-1");
	
	$("#lu_search_result").empty();
	$('#lu_search_result_zone').hide();
	
	$("#search_zoning").multiselect("clearSelection");
}

function lu_tab2_reset2()
{
	$("#search_county2").multiselect("clearSelection");
	
	$("#search_manage2").val("");
	$("#search_land_code2").val("");
	
	$("#search_state2").val("-1");
	$("#search_comstate2").val("-1");
	
	$("#lu_search_result").empty();
	$('#lu_search_result_zone').hide();
	
	$("#search_zoning2").multiselect("clearSelection");
}

function lu_tab2_getCountyList()
{
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetCountyList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#search_county2").multiselect('destroy');
				$("#search_county2").empty();
				for (var i = 0; i < d.length; i++) {
					$("#search_county").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
					$("#search_county2").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
				}
				$("#search_county2").multiselect({
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

function lu_tab2_getTownList(that)
{
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
					$("#search_town").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
				}
				
				$("#search_sec").selectpicker('destroy');
				$("#search_sec").empty();
				$("#search_sec").append('<option value="-1">請選擇</option>');
				$("#search_sec").selectpicker({
					liveSearch: true
				});
				$("#search_sec").selectpicker("change");
			}
		}
	});
}

function lu_tab2_getLandList()
{
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

function lu_tab2_getFcZoningList()
{
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetFcZoning",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#search_zoning").multiselect('destroy');
				$("#search_zoning").empty();
				$("#search_zoning2").multiselect('destroy');
				$("#search_zoning2").empty();
				for (var i = 0; i < d.length; i++) {
					$("#search_zoning").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
					$("#search_zoning2").append('<option value="' + d[i].code + '">' + d[i].name + '</option>');
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
				$("#search_zoning2").multiselect({
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

function lu_manage_edit(landcode)
{
	var data = lu_tab2.NowSearch;
	var target;
	
	for (var i = 0; i < data.length; i++) {
		if (data[i].landCode == landcode) {
			target = data[i];
			break;
		}
	}
	
	if (!target) return;
	
	lu_tab2.NowDialog = landcode;
	
	$("#lu_manage_tab2_title").empty().append(target.landCode);
	$("#lu_county_show").empty().append(target.county);
	$("#lu_town_show").empty().append(target.town);
	$("#lu_landname_show").empty().append(target.sec);
	$("#lu_landno_show").empty().append(target.number);
	$("#lu_notetext_show").val(target.note);
	
	if (target.state == '' || target.state == '-1')
	{
		$("#lu_landstate_show").val('-1');
		$("#lu_landstate_show")[0].options[0].disabled = false;
	}
	else if (target.state == '未確認')
	{
		$("#lu_landstate_show").val('0');
		$("#lu_landstate_show")[0].options[0].disabled = true;
	}
	else if (target.state == '已確認')
	{
		$("#lu_landstate_show").val('1');
		$("#lu_landstate_show")[0].options[0].disabled = true;
	}
	else if (target.state == '持續追蹤')
	{
		$("#lu_landstate_show").val('2');
		$("#lu_landstate_show")[0].options[0].disabled = true;
	}
	else if (target.state == '不查核')
	{
		$("#lu_landstate_show").val('3');
		$("#lu_landstate_show")[0].options[0].disabled = true;
	}
	
	$("#lu_manage_tab2_dialog").modal("show");
}

function lu_tab2_dialog_Close()
{
	$("#lu_manage_tab2_dialog").modal("hide");
}

function lu_tab2_dialog_Close()
{
	$("#lu_manage_tab2_dialog").modal("hide");
}

function lu_tab2_dialog_Save()
{
	var td = lu_tab2.NowSearch;
	var ld = lu_tab2.NowDialog;
	
	var target;
	for (var i = 0; i < td.length; i++) {
		if (td[i].landCode == ld) {
			target = td[i];
			break;
		}
	}
	if (!target) return;
	
	var state = $("#lu_landstate_show").val();
	var note = $("#lu_notetext_show").val();
	
	var post = {};
	post.State = state;
	post.Note = note;
	post.UserId = Logindata.sid;
	post.LandNo = target.landCode;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/EditLandChangeCheck",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				if (d == "OK") {
					alert('更新成功.');
					lu_tab2_queryLandList(lu_tab2.pageTmpPost, ld);
					$("#lu_manage_tab2_dialog").modal("hide");
				}
				else {
					alert('更新失敗.');
				}
			}
		}
	});
}
function lu_tab2_downloadCsv()
{
	var post = lu_tab2.NowPost;
	if (!post) return;
	
	WaitingShow(true);
	
	var data = new FormData();
	
	if (post.County)
	{
		data.append('County', post.County);
	}
	if (post.Town)
	{
		data.append('Town', post.Town);
	}
	if (post.Sec)
	{
		data.append('Sec', post.Sec);
	}
	if (post.Number1 && post.Number2)
	{
		data.append('Number1', post.Number1);
		data.append('Number2', post.Number2);
	}
	if (post.Zoning)
	{
		data.append('Zoning', post.Zoning);
	}
	if (post.Manage)
	{
		data.append('Manage', post.Manage);
	}
	if (post.LandNo)
	{
		data.append('LandNo', post.LandNo);
	}
	if (post.State)
	{
		data.append('State', post.State);
	}
	if (post.ComState)
	{
		data.append('ComState', post.ComState);
	}
	if (post.UserId)
	{
		data.append('UserId', post.UserId);
	}
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "ProjectManagement/DownloadLandCSVChangeCheckList", true);
	request.responseType = 'blob';
	
	request.onload = function(e) {
		setTimeout(function() {
			WaitingShow(false);
		}, 500);
		if (this.status === 200) {
			var blob = this.response;
			var dnow = new Date();
			var month = dnow.getUTCMonth() + 1;
			var day = dnow.getUTCDate();
			var year = dnow.getUTCFullYear();
			var pMonth = month.toString().padStart(2,"0");
			var pDay = day.toString().padStart(2,"0");
			var ndate = year + pMonth + pDay;
			
			if (window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, "地籍存摺列表_" + ndate + ".csv");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = "地籍存摺列表_" + ndate + ".csv";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
       }
   };
   
   request.send(data);
}