function cs_ini_page(i)
{
	$(".tab_body").empty();
	$(".tab_body").load("./views/cs_manage_tab" + i + ".html"); 
}

var cs_tab1 = {};
function cs_manage_init()
{
	$("#search_county").multiselect({
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
	$("#search_dist").multiselect({
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
	$("#search_class").multiselect({
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
	$("#search_from_class").multiselect({
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
	cs_manage_getCounty();
	cs_manage_getDist();
}

function cs_manage_getCounty()
{
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetCountyList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#search_county").multiselect('destroy');
				$("#search_county").empty();
				
				for (var i = 0; i < d.length; i++) {
					$("#search_county").append('<option value="' + d[i].code + '">' + htmlEncode(d[i].name) + '</option>');
				}
				
				$("#search_county").multiselect({
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

function cs_manage_getDist()
{
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#search_dist").multiselect('destroy');
				
				for (var i = 0; i < d.length; i++) {
					$("#search_dist").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
				}
				
				$("#search_dist").append('<option value="ZZ">其他</option>');
				
				$("#search_dist").multiselect({
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

function cs_manage_search_1()
{
	var county = $("#search_county").val();
	var dist = $("#search_dist").val();
	var dep = $("#search_dep").val();
	var tclass = $("#search_class").val();
	var fclass = $("#search_from_class").val();
	var lclass = $("#search_land_class").val();
	
	if (county.length == 0)
	{
		alert('縣市請選擇.');
		return;
	}
	if (dist.length == 0)
	{
		alert('分署請選擇.');
		return;
	}
	if (tclass.length == 0)
	{
		alert('所有權請選擇.');
		return;
	}
	if (fclass.length == 0)
	{
		alert('所在類別請選擇.');
		return;
	}
	

	// 清空右邊選擇
	$('.cs_pivot_bt_zone').hide();
	$('#cs_pivot_table').empty();
	
	$('#detail_main').val('county');
	$('#detail_sub').val('manager');
	$('#detail_unit').val('1');
	
	var post = {};
	
	post.County = county;
	post.Dist = dist;
	post.Manager = dep;
	post.Owner = tclass;
	post.LandFromClass = fclass;
	post.LandClass = lclass;
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetNormalSearch",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data) {
				var d = data.data;
				cs_tab1.data = d;
				$('.cs_result').show();
			}
		}
	});
}

function cs_manage_clearsearch_1()
{
	$('.cs_result').hide();
	$('.cs_pivot_bt_zone').hide();
	
	$('#cs_pivot_table').empty();
	
	$("#search_county").multiselect("clearSelection");
	$("#search_dist").multiselect("clearSelection");
	
	$("#search_dep").empty();
	
	$("#search_class").multiselect("clearSelection");
	$("#search_from_class").multiselect("clearSelection");
	
	$("#detail_unit").val("1");
}

function cs_set_pivot()
{
	$('.cs_pivot_bt_zone').show();
	var main = $('#detail_main').val();
	var sub = $('#detail_sub').val();
	var unit = $('#detail_unit').val();
	
	$('.cs_pivot_label').empty();
	if (unit == 1) {
		$('.cs_pivot_label').append('(單位:平方公尺)');
	}
	else if (unit == 2) {
		$('.cs_pivot_label').append('(單位:筆數)');
	}
	
	var utils = $.pivotUtilities;
	var sum = utils.aggregators["Sum"];
	var intsum = utils.aggregators["Integer Sum"];
	
	var pivotSet = {};
	pivotSet.cols = [main];
	pivotSet.rows = [sub];
	
	if (unit == "1")
		pivotSet.aggregator = sum(["regArea"]);
	else if (unit == "2")
		pivotSet.aggregator = intsum(["weight"]);
	
	var sorters = {};
	sorters.county = $.pivotUtilities.sortAs(
		['臺北市', '臺中市', '基隆市', '臺南市', '高雄市', '新北市', '宜蘭縣', '桃園市', '嘉義市', '新竹縣', '苗栗縣', '南投縣', '彰化縣', '新竹市', '雲林縣', '嘉義縣', '屏東縣', '花蓮縣', '臺東縣', '金門縣', '澎湖縣', '連江縣']
	);
	sorters.dist = $.pivotUtilities.sortAs(
		['宜蘭分署', '新竹分署', '臺中分署', '南投分署', '嘉義分署', '屏東分署', '臺東分署', '花蓮分署', '林業保育署', '林鐵處', '其他']
	);
	sorters.owner = $.pivotUtilities.sortAs(
		['國有', '公有', '私有']
	);
	sorters.type = $.pivotUtilities.sortAs(
		['國有林事業區', '保安林', '環境敏感區', '其他']
	);
	pivotSet.sorters = sorters;

	var data = cs_tab1.data;
	
	$("#cs_pivot_table").pivot(data, pivotSet);
	$(".pvtAxisLabel").empty();
	$(".pvtTotalLabel").empty().append("總計");
	$(".pvtVal").each(function(i, obj) {
		if (obj.textContent == "") {
			obj.textContent = "-";
		}
	});
}

function cs_pivot_export()
{
	var tar = document.getElementById('cs_pivot_table');
	var thead = tar.getElementsByTagName('thead')[0];
	var tbody = tar.getElementsByTagName('tbody')[0];
	
	var trs = thead.getElementsByTagName('tr');
	var result = [];
	for (var i = 0; i < trs.length; i++) {
		var ths = trs[i].getElementsByTagName('th');
		var ppt = {};
		ppt.ths = [];
		for (var j = 0; j < ths.length; j++) {
			var ts = ths[j];
			var opt = {};
			opt.rowspan = ts.getAttribute('rowspan');
			opt.colspan = ts.getAttribute('colspan');
			opt.className = ts.className;
			opt.value = ts.innerHTML;
			ppt.ths.push(opt);
		}
		result.push(ppt);
	}
	
	var trs2 = tbody.getElementsByTagName('tr');
	var result2 = [];
	
	for (var i = 0; i < trs2.length; i++) {
		var ths = trs2[i].getElementsByTagName('th');
		var ppt = {};
		ppt.ths = [];
		for (var j = 0; j < ths.length; j++) {
			var ts = ths[j];
			var opt = {};
			opt.rowspan = ts.getAttribute('rowspan');
			opt.colspan = ts.getAttribute('colspan');
			opt.isth = true;
			opt.className = ts.className;
			opt.value = ts.innerHTML;
			ppt.ths.push(opt);
		}
		var tds = trs2[i].getElementsByTagName('td');
		for (var j = 0; j < tds.length; j++) {
			var ts = tds[j];
			var opt = {};
			opt.rowspan = 1;
			opt.colspan = 1;
			opt.isth = false;
			opt.className = ts.className;
			opt.value = ts.innerHTML;
			ppt.ths.push(opt);
		}
		result2.push(ppt);
	}
	
	const otb = {};
	otb.thead = result;
	otb.tbody = result2;

	var type = 'excel';
	var formdata = new FormData();
	
	var target = JSON.stringify(otb);
	
	formdata.append('Html', target);
	formdata.append('ExportType', type);
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "CustomThemeManagement/GetCustomTableExcel", true);
	// request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.responseType = 'blob';
	
	WaitingShow(true);
	request.onload = function(e) {
		setTimeout(function() {
			WaitingShow(false);
		},200);
		if (this.status === 200) {
			var blob = this.response;
			if (window.navigator.msSaveOrOpenBlob) {
				if (type == "excel")
					window.navigator.msSaveBlob(blob, "查詢結果.xlsx");
				else if (type == "ods")
					window.navigator.msSaveBlob(blob, "查詢結果.ods");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				if (type == "excel")
					downloadLink.download = "查詢結果.xlsx";
				else if (type == "ods")
					downloadLink.download = "查詢結果.ods";
				
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
       }
   };
   
   request.send(formdata);
}

function cs_manage_init2()
{
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetCustomComboList",
		type: "Post",
		async: false,
		success: function(data) {
			if (data.data)
			{
				var d = data.data;
				
				$('#search_custom_name').empty();
				$("#search_custom_name").append('<option value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					$("#search_custom_name").append('<option value="' + d[i].id + '">' + htmlEncode(d[i].name) + '</option>');
				}
			}
		}
	});
}

function cs_manage_search_2()
{
	var id = $('#search_custom_name').val();
	
	if (id == '-1') {
		alert('請選擇主題名稱.');
		return;
	}
	
	var post = {};
	post.Id = id;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetCustomComboData",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data)
			{
				var d = data.data;
				cs_set_pivot2(d);
			}
		}
	});
}

function cs_set_pivot2(data)
{
	var main = data.mainType;
	var sub = data.subType;
	var unit = data.unit;
	
	var utils = $.pivotUtilities;
	var sum = utils.aggregators["Sum"];
	var intsum = utils.aggregators["Integer Sum"];
	
	var pivotSet = {};
	pivotSet.cols = [main];
	pivotSet.rows = [sub];
	
	$('.cs_pivot_bt_zone').show();
	$('.cs_pivot_label').empty();
	if (unit == "1")
	{
		$('.cs_pivot_label').append('單位:平方公尺');
		pivotSet.aggregator = sum(["regArea"]);
	}
	else if (unit == "2")
	{
		$('.cs_pivot_label').append('單位:筆數');
		pivotSet.aggregator = intsum(["weight"]);
	}
	
	var sorters = {};
	sorters.county = $.pivotUtilities.sortAs(
		['臺北市', '臺中市', '基隆市', '臺南市', '高雄市', '新北市', '宜蘭縣', '桃園市', '嘉義市', '新竹縣', '苗栗縣', '南投縣', '彰化縣', '新竹市', '雲林縣', '嘉義縣', '屏東縣', '花蓮縣', '臺東縣', '金門縣', '澎湖縣', '連江縣']
	);
	sorters.dist = $.pivotUtilities.sortAs(
		['宜蘭分署', '新竹分署', '臺中分署', '南投分署', '嘉義分署', '屏東分署', '臺東分署', '花蓮分署', '林業保育署', '林鐵處', '其他']
	);
	sorters.owner = $.pivotUtilities.sortAs(
		['國有', '公有', '私有']
	);
	sorters.type = $.pivotUtilities.sortAs(
		['國有林事業區', '保安林', '環境敏感區', '其他']
	);
	pivotSet.sorters = sorters;
	
	$(".cs_result").show();
	$("#cs_pivot_table").pivot(data.data, pivotSet);
	$(".pvtAxisLabel").empty();
	$(".pvtTotalLabel").empty().append("總計");
	$(".pvtVal").each(function(i, obj) {
		if (obj.textContent == "") {
			obj.textContent = "-";
		}
	});
}