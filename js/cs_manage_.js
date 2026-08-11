function cs_ini_page(i)
{
	$(".tab_body").empty();
	$(".tab_body").load("./views/cs_manage_tab" + i + ".html"); 
}
// 一般查詢 START
var cs_manage = {};
cs_manage.map = null;
cs_manage.data = null;
function cs_manage_init() {
	cs_manage.map = map('mmap', true, false);
	cs_manage_getCity();
	cs_manage_getDist();
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
	$("#search_option").multiselect({
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
function cs_manage_search_1() {
	var post = {};
	
	var year = $("#search_year").val();
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var owner = $("#search_dep").val();
	var dist = $("#search_dist").val();
	var workshop = $("#search_workshop").val();
	var ownerclass = $("#search_class").val();
	var type = $("#search_option").val();

	if (year != "-1")
	{
		post.Year = [year];
	}
	if (county != "-1")
	{
		post.County = [county];
	}
	if (town != "-1")
	{
		post.Town = [town];
	}
	if (owner != "-1")
	{
		post.Owner = [owner];
	}
	if (dist != "-1")
	{
		post.Dist = [dist];
	}
	if (workshop != "-1")
	{
		post.WorkShop = [workshop];
	}
	if (ownerclass.length != 0)
	{
		post.OwnerClass = ownerclass;
	}
	if (type.length != 0)
	{
		post.Type = type;
	}

	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetSearchList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				cs_manage.data = d;
				
				var charttype = $('input[name="chart"]:checked').val();

				var fchart = "0"; // 第一個圓餅圖:私有林地
				var fdata = d.filter(x => x.ownerClass == '私有');
				
				var one = fdata.filter(x => x.type == '1');
				var two = fdata.filter(x => x.type == '2');
				var three = fdata.filter(x => x.type == '3');
				var four = fdata.filter(x => x.type == '4');

				var sum1 = cs_data_sum(one);
				var sum2 = cs_data_sum(two);
				var sum3 = cs_data_sum(three);
				var sum4 = cs_data_sum(four);

				var data2 = [
					{ label: "國有林事業區", value: sum1 },
					{ label: "保安林", value: sum2 },
					{ label: "森林遊樂區", value: sum3 },
					{ label: "實驗林", value: sum4 }
				];

				$("#fcchart").hide();
				$("#barchart").hide();
				
				if (charttype == "0")
				{
					$("#fcchart").show();
					cs_data_chart(data2, "fc_chart_detail1", "私有");
				}
				else if (charttype == "1")
				{
					$("#barchart").show();
					cs_data_bar(data2, "fc_chart_detail3", "私有");
				}
				
				var schart = "1"; // 第二個圓餅圖:國有林地
				var sdata = d.filter(x => x.ownerClass == '國有');
				
				var one1 = sdata.filter(x => x.type == '1');
				var two2 = sdata.filter(x => x.type == '2');
				var three3 = sdata.filter(x => x.type == '3');
				var four4 = sdata.filter(x => x.type == '4');

				var sum5 = cs_data_sum(one1);
				var sum6 = cs_data_sum(two2);
				var sum7 = cs_data_sum(three3);
				var sum8 = cs_data_sum(four4);

				var data3 = [
					{ label: "國有林事業區", value: sum5 },
					{ label: "保安林", value: sum6 },
					{ label: "森林遊樂區", value: sum7 },
					{ label: "實驗林", value: sum8 }
				];

				if (charttype == "0")
					cs_data_chart(data3, "fc_chart_detail2", "國有");
				else if (charttype == "1")
					cs_data_bar(data3, "fc_chart_detail4", "國有");
				
				var tchart = "2"; // 第三個圓餅圖:公有林地
				var tdata = d.filter(x => x.ownerClass == '公有');
				
				var one11 = tdata.filter(x => x.type == '1');
				var two22 = tdata.filter(x => x.type == '2');
				var three33 = tdata.filter(x => x.type == '3');
				var four44 = tdata.filter(x => x.type == '4');
				
				var sum9 = cs_data_sum(one11);
				var sum10 = cs_data_sum(two22);
				var sum11 = cs_data_sum(three33);
				var sum12 = cs_data_sum(four44);

				var data4 = [
					{ label: "國有林事業區", value: sum9 },
					{ label: "保安林", value: sum10 },
					{ label: "森林遊樂區", value: sum11 },
					{ label: "實驗林", value: sum12 }
				];

				if (charttype == "0")
					cs_data_chart(data4, "fc_chart_detail5", "公有");
				else if (charttype == "1")
					cs_data_bar(data4, "fc_chart_detail6", "公有");
				
				cs_data_setDataTable(data2, data3, data4, ownerclass);
				
				cs_chart_type = 1;
				
				setTimeout(function() {
					$("#fc_chart_detail1").show();
					$("#fc_chart_detail3").show();
					$("#fc_chart_detail2").hide();
					$("#fc_chart_detail4").hide();
				}, 500);
			}
			WaitingShow(false);
		}
	});
}
function cs_data_setDataTable(data2, data3, data4, ownerclass) {
	var sum1 = data2[0].value + data2[1].value + data2[2].value + data2[3].value;
	var sum2 = data3[0].value + data3[1].value + data3[2].value + data3[3].value;
	var sum3 = data4[0].value + data4[1].value + data4[2].value + data4[3].value;
	
	sum1 /= 10000;
	sum2 /= 10000;
	sum3 /= 10000;
	
	$("#cs_main_data").empty();
	
	var year = $("#search_year").val();
	var county = $("#search_county").find('option:selected').text();
	
	let detail = "";
	
	detail += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>縣市</div>" +
		"<div class='detail_rows_value'>" + (county == "-1" || county == "請選擇" ? "全臺縣市" : county) + "</div>" +
		"</div>";
		
	detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>年度</div>"+
		"<div class='detail_rows_value'>" + (year == "-1" ? "全年度" : year) + "</div>" +
		"</div>";
		
	if (ownerclass.indexOf("國有") != -1 || ownerclass.length == 0) {
		detail += 
			"<div class='detail_rows'>"+
			"<div class='detail_rows_name'>國有林地面積</div>"+
			"<div class='detail_rows_value'>"+ (sum2).toFixed(2) +"</div>"+
			"</div>";
	}
		
	if (ownerclass.indexOf("私有") != -1 || ownerclass.length == 0) {
		detail += 
			"<div class='detail_rows'>"+
			"<div class='detail_rows_name'>私有林地面積</div>"+
			"<div class='detail_rows_value'>"+ (sum1).toFixed(2) +"</div>"+
			"</div>";
	}
	
	if (ownerclass.indexOf("公有") != -1 || ownerclass.length == 0) {
		detail += 
			"<div class='detail_rows'>"+
			"<div class='detail_rows_name'>公有林地面積</div>"+
			"<div class='detail_rows_value'>"+ (sum3).toFixed(2) +"</div>"+
			"</div>";
	}
		
	detail += 
		"<div class='detail_rows'>"+
		"<div class='detail_rows_name'>總面積</div>"+
		"<div class='detail_rows_value'>"+ (sum1 + sum2 + sum3).toFixed(2) +"</div>"+
		"</div>";
	
	$("#cs_main_data").append(detail);
}
function cs_data_getLandCodeShp(targry, ownerClass) {

	var post = {};
	
	var year = $("#search_year").val();
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var owner = $("#search_dep").val();
	var dist = $("#search_dist").val();
	var workshop = $("#search_workshop").val();
	var ownerclass = ownerClass;
	
	var color = "";
	var type = "";
	if (targry == "國有林事業區")
	{
		type = "1";
		color = "rgba(151, 170, 196, 0.5)";
	}
	else if (targry == "保安林")
	{
		type = "2";
		color = "rgba(137, 136, 165, 0.5)";
	}
	else if (targry == "森林遊樂區")
	{
		type = "3";
		color = "rgba(123, 104, 135, 0.5)";
	}
	else if (targry == "實驗林")
	{
		type = "4";
		color = "rgba(107, 71, 107, 0.5)";
	}

	if (year != "-1")
	{
		post.Year = [year];
	}
	if (county != "-1")
	{
		post.County = [county];
	}
	if (town != "-1")
	{
		post.Town = [town];
	}
	if (owner != "-1")
	{
		post.Owner = [owner];
	}
	if (dist != "-1")
	{
		post.Dist = [dist];
	}
	if (workshop != "-1")
	{
		post.WorkShop = [workshop];
	}
	if (ownerclass.length != 0)
	{
		post.OwnerClass = ownerclass;
	}
	if (type.length != 0)
	{
		post.Type = type;
	}
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetSearchMergePolygon",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				cs_manage.map.geomvector_source.clear();
				var style =	new ol.style.Style({
					fill: new ol.style.Fill({
						color: color,
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(0, 48, 97, 1)",
						width: 2,
					}),
				});
				
				var format = new ol.format.WKT();
				var feature = format.readFeature(data.data);
				feature.getGeometry().transform("EPSG:3826", "EPSG:3857");
				feature.setStyle(style);
				cs_manage.map.geomvector_source.addFeature(feature);
				
				cs_manage.map.getView().fit(cs_manage.map.geomvector_source.getExtent(), { maxZoom: 18}, { maxZoom: 18});
			}
			WaitingShow(false);
		}
	});
}
function cs_data_chart(data, tar, ownerClass) {
	$("#" + tar).empty();
	$("#" + tar).removeClass("nodata");
	
	if (data.length == 0) {
		$("#" + tar).hide();
		$("#" + tar).addClass("nodata");
		
		return;
	}
	
	var checkreturn = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].value == 0) checkreturn++;
	}
	
	if (checkreturn == 4) {
		$("#" + tar).hide();
		$("#" + tar).addClass("nodata");
		
		return;
	}
	
	var pie = new d3pie(tar, {
		header: {
			title: {
				text: "",
				fontSize: 10
			}
		},
		labels: {
			inner: {
				format: "none"
			},
			mainLabel: {
				color: "#333333",
				font: "arial",
				fontSize: 15
			},
		},
		data: {
			sortOrder: "value-asc",
			content: data
		},
		tooltips: {
			enabled: true,
			type: "placeholder",
			string: "{label}: {value}",
			styles: {
				fontSize: 15
			},
			placeholderParser: function(index, data) {
				data.value = (data.value / 10000).toFixed(2);
			}
		},
		misc: {
			colors: {
				segments: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]
			}
		},
		callbacks: {
			onClickSegment: function(d) {
				cs_data_getLandCodeShp(d.data.label, ownerClass);
			}
		}
	});
}
function cs_data_bar(data, tar, ownerClass) {
	$("#" + tar).empty();
	$("#" + tar).removeClass("nodata");
	
	if (data.length == 0) { 
		$("#" + tar).hide();
		$("#" + tar).addClass("nodata");
		return;
	}
	
	var checkreturn = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].value == 0) checkreturn++;
	}
	
	if (checkreturn == 4) { 
		$("#" + tar).hide();
		$("#" + tar).addClass("nodata");
		return;
	}
	
	var margin = {top: 30, right: 30, bottom: 70, left: 60},
		width = 500 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;
	
	var svg = d3.select("#" + tar)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	var ymax = d3.max(data, function(d){return d.value});
	
	var x = d3.scaleBand()
		.range([0, width])
		.domain(data.map(function(d) { return d.label; }))
		.padding(0.2);
	
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
		.selectAll("text")
		.attr("transform", "translate(-10,0)rotate(-45)")
		.style("text-anchor", "end");
	
	// Add Y axis
	var y = d3.scaleLinear()
		.domain([0, ymax])
		.range([height, 0]);
	
	svg.append("g")
		.call(d3.axisLeft(y));
	
	// Bars
	svg.selectAll("mybar")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", function(d) { return x(d.label); })
		.attr("y", function(d) { return y(d.value); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - y(d.value); })
		.attr("fill", function(d) {
			if (d.label == "國有林事業區") {
				return "#98abc5";
			}
			else if (d.label == "保安林") {
				return "#8a89a6";
			}
			else if (d.label == "森林遊樂區") {
				return "#7b6888";
			}
			else if (d.label == "實驗林") {
				return "#6b486b";
			}
			
			return "#69b3a2";
		})
		.on("mouseover", function() { tooltip.style("display", null); })
		.on("mouseout", function() { tooltip.style("display", "none"); })
		.on("click", function(d) { 
			cs_data_getLandCodeShp(d.label, ownerClass);
		})
		.on("mousemove", function(d) {
			var xPosition = d3.mouse(this)[0];
			var yPosition = d3.mouse(this)[1] - 25;
			tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
			tooltip.select("text").text(d.label + ":" + (d.value / 10000).toFixed(2));
		});
	
	// Prep the tooltip bits, initial display is hidden
	var tooltip = svg.append("g")
		.attr("class", "tooltip")
		.style("display", "none");

	tooltip.append("text")
		.attr("x", 30)
		.attr("dy", "1.2em")
		.style("text-anchor", "middle")
		.attr("font-size", "12px")
		.attr("font-weight", "bold");
}
function cs_data_sum(ary) {
	var sum = 0;
	for (var i = 0; i < ary.length; i++) {
		if (parseFloat(ary[i].areaHa))
			sum += parseFloat(ary[i].areaHa);
	}
	
	return sum;
}
function cs_manage_clearsearch_1() {
	$(".nav-item2.tab1").click();
}
var cs_chart_type = 1;
function cs_chart_change() {
	if (cs_chart_type == 1) {
		$("#fc_chart_detail1").hide();
		$("#fc_chart_detail3").hide();
		
		$("#chartshowing").empty();
		$("#chartshowing").append("國有林地");
		
		if (!$("#fc_chart_detail2").hasClass("nodata"))
			$("#fc_chart_detail2").show();
		if (!$("#fc_chart_detail4").hasClass("nodata"))
			$("#fc_chart_detail4").show();
		
		$("#fc_chart_detail5").hide();
		$("#fc_chart_detail6").hide();
		
		cs_chart_type = 2;
	}
	else if (cs_chart_type == 2) {
		$("#fc_chart_detail1").hide();
		$("#fc_chart_detail3").hide();
		$("#fc_chart_detail2").hide();
		$("#fc_chart_detail4").hide();
		
		$("#chartshowing").empty();
		$("#chartshowing").append("公有林地");
		
		if (!$("#fc_chart_detail5").hasClass("nodata"))
			$("#fc_chart_detail5").show();
		if (!$("#fc_chart_detail6").hasClass("nodata"))
			$("#fc_chart_detail6").show();
		
		cs_chart_type = 3;
	}
	else if (cs_chart_type == 3) {
		if (!$("#fc_chart_detail1").hasClass("nodata"))
			$("#fc_chart_detail1").show();
		if (!$("#fc_chart_detail3").hasClass("nodata"))
			$("#fc_chart_detail3").show();
		
		$("#chartshowing").empty();
		$("#chartshowing").append("私有林地");
		
		$("#fc_chart_detail2").hide();
		$("#fc_chart_detail4").hide();
		$("#fc_chart_detail5").hide();
		$("#fc_chart_detail6").hide();
		
		cs_chart_type = 1;
	}
}
// 一般查詢 END

// 常用查詢 START
var cs_manage2 = {};
cs_manage2.map = null;
cs_manage2.theme = null;
cs_manage2.data = null;
function cs_manage_init2() {
	cs_manage2.map = map('mmap', true, false);
	cs_manage_getCity(cs_manage2);
	cs_manage_getDist(cs_manage2);
	cs_manage_getThemeList();
}
function cs_manage_getThemeList() {
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetCustomThemeList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				cs_manage2.theme = d;
				
				for (var i = 0; i < d.length; i++) {
					$("#search_temp").append('<option value="' + d[i].sid + '">' + d[i].name + '</option>');
				}
			}
		}
	});
}
function cs_manage_custom_change() {
	var tarvalue = $("#search_temp").val();
	var tardata = cs_manage2.theme.filter(x => x.sid == tarvalue);
	
	if (tardata.length == 0 || tardata.length > 1) return;
	
	for (var i = 0; i <= 7; i++) {
		$("#search_item" + i).addClass('cs_custom_search_item');
		$("#search_item" + i).removeClass('activeflex');
	}
	
	var showoptionstr = tardata[0].searchItem;
	var showoption = showoptionstr.split(',');
	
	for (var i = 0; i < showoption.length; i++) {
		$("#search_item" + showoption[i]).removeClass('cs_custom_search_item');
		$("#search_item" + showoption[i]).addClass('activeflex');
	}
	
	cs_clear_customselect();
	
	var statitem = tardata[0].statItem;
	var cat = tardata[0].itemCategory;
	if (cat == "1") //多選時
	{
		if (statitem == "0") {
			$("#search_year").attr({ "multiple": "multiple" });
			$("#search_year option[value='-1']").remove();
			
			$("#search_year").multiselect({
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
		else if (statitem == "1") {
			$("#search_county").attr({ "multiple": "multiple" });
			$("#search_county option[value='-1']").remove();
			
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
		else if (statitem == "2") {
			$("#search_town").attr({ "multiple": "multiple" });
			$("#search_town option[value='-1']").remove();
			
			$("#search_town").multiselect({
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
		else if (statitem == "3") {
			$("#search_class").attr({ "multiple": "multiple" });
			$("#search_class option[value='-1']").remove();
			
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
		}
		else if (statitem == "4") {
			$("#search_dep").attr({ "multiple": "multiple" });
			$("#search_dep option[value='-1']").remove();
			
			$("#search_dep").multiselect({
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
		else if (statitem == "5") {
			$("#search_dist").attr({ "multiple": "multiple" });
			$("#search_dist option[value='-1']").remove();
			
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
		else if (statitem == "6") {
			$("#search_workshop").attr({ "multiple": "multiple" });
			$("#search_workshop option[value='-1']").remove();
			
			$("#search_workshop").multiselect({
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
		else if (statitem == "7") {
			$("#search_option").attr({ "multiple": "multiple" });
			$("#search_option option[value='-1']").remove();
			
			$("#search_option").multiselect({
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
}
// 清理選項
function cs_clear_customselect() {
	
	cs_clear_multiselect();
	
	$("#search_year").empty();
	$("#search_year").append('<option value="-1">請選擇</option>');
	$("#search_year").append('<option value="109">109年度</option>');
	$("#search_year").val('-1');
	
	$("#search_county").empty();
	$("#search_county").append('<option value="-1">請選擇</option>');
	if (cs_manage2.cityData)
	{
		var d = cs_manage2.cityData;
		for (var i = 0; i < d.length; i++) {
			$("#search_county").append('<option name="' + d[i].name + '" value="' + d[i].code + '">' + d[i].name + '</option>');
		}
	}
	$("#search_county").val('-1');
	
	$("#search_dist").empty();
	$("#search_dist").append('<option value="-1">請選擇</option>');
	if (cs_manage2.distData)
	{
		var d = cs_manage2.distData;
		for (var i = 0; i < d.length; i++) {
			$("#search_dist").append('<option name="' + d[i].distName + '" value="' + d[i].distId + '">' + d[i].distName + '</option>');
		}
	}
	$("#search_dist").val('-1');
	
	$("#search_dep").empty();
	$("#search_dep").append('<option value="-1">請選擇</option>');
	$("#search_dep").append('<option name="中興大學實驗林" value="中興大學">中興大學實驗林</option>');
	$("#search_dep").append('<option name="宜蘭大學實驗林" value="宜蘭大學">宜蘭大學實驗林</option>');
	$("#search_dep").append('<option name="屏東科技大學實驗林" value="屏東科技大學">屏東科技大學實驗林</option>');
	$("#search_dep").append('<option name="嘉義大學實驗林" value="嘉義大學">嘉義大學實驗林</option>');
	$("#search_dep").append('<option name="臺灣大學實驗林" value="臺灣大學">臺灣大學實驗林</option>');
	$("#search_dep").append('<option name="林務局" value="林務局">林務局</option>');
	$("#search_dep").append('<option name="林業試驗所" value="林業試驗所">林業試驗所</option>');
	$("#search_dep").append('<option name="原住民族事務委員會" value="原住民族事務委員會">原住民族事務委員會</option>');
	$("#search_dep").append('<option name="國有財產署" value="國有財產署">國有財產署</option>');
	$("#search_dep").append('<option name="其他" value="其他">其他</option>');
	$("#search_dep").val('-1');
	
	$("#search_class").empty();
	$("#search_class").append('<option value="-1">請選擇</option>');
	$("#search_class").append('<option value="私有">私有林地</option>');
	$("#search_class").append('<option value="國有">國有林地</option>');
	$("#search_class").append('<option value="公有">公有林地</option>');
	$("#search_class").val('-1');
	
	$("#search_option").empty();
	$("#search_option").append('<option value="-1">請選擇</option>');
	$("#search_option").append('<option name="國有林事業區" value="1">國有林事業區</option>');
	$("#search_option").append('<option name="保安林" value="2">保安林</option>');
	$("#search_option").append('<option name="森林遊樂區" value="3">森林遊樂區</option>');
	$("#search_option").append('<option name="實驗林" value="4">實驗林</option>');
	$("#search_option").val('-1');
	
	$("#search_town").empty();
	$("#search_town").append('<option selected value="-1">請選擇</option>');
	$("#search_town").val('-1');
	
	$("#search_workshop").empty();
	$("#search_workshop").append('<option selected value="-1">請選擇</option>');
	$("#search_workshop").val('-1');
}
// 清理多重選項
function cs_clear_multiselect() {
	$("#search_year").multiselect('destroy');
	$("#search_county").multiselect('destroy');
	$("#search_town").multiselect('destroy');
	$("#search_class").multiselect('destroy');
	$("#search_dep").multiselect('destroy');
	$("#search_dist").multiselect('destroy');
	$("#search_workshop").multiselect('destroy');
	$("#search_option").multiselect('destroy');
	
	$("#search_year").removeAttr('multiple');
	$("#search_county").removeAttr('multiple');
	$("#search_town").removeAttr('multiple');
	$("#search_class").removeAttr('multiple');
	$("#search_dep").removeAttr('multiple');
	$("#search_dist").removeAttr('multiple');
	$("#search_workshop").removeAttr('multiple');
	$("#search_option").removeAttr('multiple');
}
function cs_manage_search_2() {
	var theme = $("#search_temp").val();
	if (theme == "-1" || !theme) {
		alert("請先選擇主題.");
		return;
	}
	
	var post = {};
	
	var year = $("#search_year").val();
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var owner = $("#search_dep").val();
	var dist = $("#search_dist").val();
	var workshop = $("#search_workshop").val();
	var ownerclass = $("#search_class").val();
	var type = $("#search_option").val();

	if (typeof(year) == "string" && year != "-1")
	{
		post.Year = [year];
	}
	else if (Array.isArray(year) && year.length > 0)
	{
		post.Year = year;
	}
	
	if (typeof(county) == "string" && county != "-1")
	{
		post.County = [county];
	}
	else if (Array.isArray(county) && county.length > 0)
	{
		post.County = county;
	}
	
	if (typeof(town) == "string" && town != "-1")
	{
		post.Town = [town];
	}
	else if (Array.isArray(town) && town.length > 0)
	{
		post.Town = town;
	}
	
	if (typeof(owner) == "string" && owner != "-1")
	{
		post.Owner = [owner];
	}
	else if (Array.isArray(owner) && owner.length > 0)
	{
		post.Owner = owner;
	}
	
	if (typeof(dist) == "string" && dist != "-1")
	{
		post.Dist = [dist];
	}
	else if (Array.isArray(dist) && dist.length > 0)
	{
		post.Dist = dist;
	}
	
	if (typeof(workshop) == "string" && workshop != "-1")
	{
		post.WorkShop = [workshop];
	}
	else if (Array.isArray(workshop) && workshop.length > 0)
	{
		post.WorkShop = workshop;
	}
	
	if (typeof(ownerclass) == "string" && ownerclass != "-1")
	{
		post.OwnerClass = [ownerclass];
	}
	else if (Array.isArray(ownerclass) && ownerclass.length > 0)
	{
		post.OwnerClass = ownerclass;
	}
	
	if (typeof(type) == "string" && type != "-1")
	{
		post.Type = [type];
	}
	else if (Array.isArray(type) && type.length > 0)
	{
		post.Type = type;
	}

	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetSearchList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var dat = data.data;
				cs_manage2.data = dat;
				
				var tarvalue = $("#search_temp").val();
				var tardata = cs_manage2.theme.filter(x => x.sid == tarvalue);
				
				var chart = tardata[0].chartType;
				var statitem = tardata[0].statItem;
				var dataunit = tardata[0].dataUnit;
				
				var cdata = [];
				if (statitem == "0") //年度
				{
					$(dat).each(function(idx, d) {
						var filter = cdata.filter(x => x.year == d.year);
						
						if (filter.length == 1) {
							filter[0].value += parseFloat(d.areaHa);
							filter[0].length += 1;
						}
						else {
							var opt = {};
							opt.label = d.year;
							opt.value =	parseFloat(d.areaHa);
							opt.length = 1;
							opt.statitem = statitem;
							opt.color = randomColor();
							opt.countyCode = d.countyCode;
							opt.townCode = d.townCode;
							opt.owner = d.owner;
							opt.distCode = d.distCode;
							opt.workCode = d.workCode;
							opt.ownerClass = d.ownerClass;
							opt.type = d.type;
							opt.year = d.year;
							
							cdata.push(opt);
						}
					});
				}
				else if (statitem == "1") //縣市
				{
					$(dat).each(function(idx, d) {
						var filter = cdata.filter(x => x.countyCode == d.countyCode);
						
						if (filter.length == 1) {
							filter[0].value += parseFloat(d.areaHa);
							filter[0].length += 1;
						}
						else {
							var opt = {};
							
							opt.label = d.county;
							opt.value =	parseFloat(d.areaHa);
							opt.length = 1;
							opt.statitem = statitem;
							opt.color = randomColor();
							opt.countyCode = d.countyCode;
							opt.townCode = d.townCode;
							opt.owner = d.owner;
							opt.distCode = d.distCode;
							opt.workCode = d.workCode;
							opt.ownerClass = d.ownerClass;
							opt.type = d.type;
							opt.year = d.year;
							
							cdata.push(opt);
						}
					});
				}
				else if (statitem == "2") //鄉鎮
				{
					$(dat).each(function(idx, d) {
						var filter = cdata.filter(x => x.townCode == d.townCode);
						
						if (filter.length == 1) {
							filter[0].value += parseFloat(d.areaHa);
							filter[0].length += 1;
						}
						else {
							var opt = {};
							
							opt.label = d.town;
							opt.value =	parseFloat(d.areaHa);
							opt.length = 1;
							opt.statitem = statitem;
							opt.color = randomColor();
							opt.countyCode = d.countyCode;
							opt.townCode = d.townCode;
							opt.owner = d.owner;
							opt.distCode = d.distCode;
							opt.workCode = d.workCode;
							opt.ownerClass = d.ownerClass;
							opt.type = d.type;
							opt.year = d.year;
							
							cdata.push(opt);
						}
					});
				}
				else if (statitem == "3") //所有權
				{
					$(dat).each(function(idx, d) {
						var filter = cdata.filter(x => x.ownerClass == d.ownerClass);
						
						if (filter.length == 1) {
							filter[0].value += parseFloat(d.areaHa);
							filter[0].length += 1;
						}
						else {
							var opt = {};
							
							opt.label = d.ownerClass + "林地";
							opt.value =	parseFloat(d.areaHa);
							opt.length = 1;
							opt.statitem = statitem;
							opt.color = randomColor();
							opt.countyCode = d.countyCode;
							opt.townCode = d.townCode;
							opt.owner = d.owner;
							opt.distCode = d.distCode;
							opt.workCode = d.workCode;
							opt.ownerClass = d.ownerClass;
							opt.type = d.type;
							opt.year = d.year;
							
							cdata.push(opt);
						}
					});
				}
				else if (statitem == "4") //管理機關
				{
					$(dat).each(function(idx, d) {
						var filter = cdata.filter(x => x.owner == d.owner);
						
						if (filter.length == 1) {
							filter[0].value += parseFloat(d.areaHa);
							filter[0].length += 1;
						}
						else {
							var opt = {};
							
							opt.label = d.owner;
							opt.value =	parseFloat(d.areaHa);
							opt.length = 1;
							opt.statitem = statitem;
							opt.color = randomColor();
							opt.countyCode = d.countyCode;
							opt.townCode = d.townCode;
							opt.owner = d.owner;
							opt.distCode = d.distCode;
							opt.workCode = d.workCode;
							opt.ownerClass = d.ownerClass;
							opt.type = d.type;
							opt.year = d.year;
							
							cdata.push(opt);
						}
					});
				}
				else if (statitem == "5") //林區管理處
				{
					$(dat).each(function(idx, d) {
						if (d.dist == '無') return;
						
						var filter = cdata.filter(x => x.distCode == d.distCode);
						
						if (filter.length == 1) {
							filter[0].value += parseFloat(d.areaHa);
							filter[0].length += 1;
						}
						else {
							var opt = {};
							
							opt.label = d.dist;
							opt.value =	parseFloat(d.areaHa);
							opt.length = 1;
							opt.statitem = statitem;
							opt.color = randomColor();
							opt.countyCode = d.countyCode;
							opt.townCode = d.townCode;
							opt.owner = d.owner;
							opt.distCode = d.distCode;
							opt.workCode = d.workCode;
							opt.ownerClass = d.ownerClass;
							opt.type = d.type;
							opt.year = d.year;
							
							cdata.push(opt);
						}
					});
				}
				else if (statitem == "6") //工作站
				{
					$(dat).each(function(idx, d) {
						var filter = cdata.filter(x => x.workShop == d.workShop);
						
						if (filter.length == 1) {
							filter[0].value += parseFloat(d.areaHa);
							filter[0].length += 1;
						}
						else {
							var opt = {};
							
							opt.label = d.workShop;
							opt.value =	parseFloat(d.areaHa);
							opt.length = 1;
							opt.statitem = statitem;
							opt.color = randomColor();
							opt.countyCode = d.countyCode;
							opt.townCode = d.townCode;
							opt.owner = d.owner;
							opt.distCode = d.distCode;
							opt.workCode = d.workCode;
							opt.ownerClass = d.ownerClass;
							opt.type = d.type;
							opt.year = d.year;
							
							cdata.push(opt);
						}
					});
				}
				else if (statitem == "7") //林業管理項目
				{
					$(dat).each(function(idx, d) {
						var filter = cdata.filter(x => x.type == d.type);
						
						if (filter.length == 1) {
							filter[0].value += parseFloat(d.areaHa);
							filter[0].length += 1;
						}
						else {
							var opt = {};
							
							opt.label = d.type == "1" ? "國有林事業區" : d.type == "2" ? "保安林" : d.type == "3" ? "森林遊樂區" : "實驗林";
							opt.value =	parseFloat(d.areaHa);
							opt.length = 1;
							opt.statitem = statitem;
							opt.color = randomColor();
							opt.countyCode = d.countyCode;
							opt.townCode = d.townCode;
							opt.owner = d.owner;
							opt.distCode = d.distCode;
							opt.workCode = d.workCode;
							opt.ownerClass = d.ownerClass;
							opt.type = d.type;
							opt.year = d.year;
							
							cdata.push(opt);
						}
					});
				}
				
				$("#fc_chart_detail1").show();
				$("#fc_chart_detail2").show();
				$("#fc_chart_detail3").show();
				$("#fc_chart_detail4").show();
				
				$("#fc_chart_detail1").empty();
				$("#fc_chart_detail2").empty();
				$("#fc_chart_detail3").empty();
				$("#fc_chart_detail4").empty();
				
				var units = dataunit.split(',');
				if (chart == "0") // 圓餅圖
				{
					$("#fcchart").show();
					for (var i = 0; i < units.length; i++) {
						if (units[i] == "0")
							cs_data_chart2(cdata, "fc_chart_detail1", units[i], "1");
						else if (units[i] == "1")
							cs_data_chart2(cdata, "fc_chart_detail2", units[i], "2");
					}
				}
				else if (chart == "1") // 長條圖
				{
					$("#barchart").show();
					
					var x_name = tardata[0].x_name;
					var y_name = tardata[0].y_name;
					
					for (var i = 0; i < units.length; i++) {
						if (units[i] == "0")
							cs_data_bar2(cdata, "fc_chart_detail3", units[i]);
						else if (units[i] == "1")
							cs_data_bar2(cdata, "fc_chart_detail4", units[i]);
					}
				}
				
				cs_data_setDataTable2(cdata);
				
				setTimeout(function() {
					if (units.length == 2) {
						$("#cs_main_data").show();
						$("#cs_main_data2").hide();
						
						$("#fc_chart_detail1").show();
						$("#fc_chart_detail3").show();
						$("#fc_chart_detail2").hide();
						$("#fc_chart_detail4").hide();
						$("#fcchart").show();
						$("#barchart").hide();
						
						$("#changechart2").show();
					}
					else if (units[0] == "0") {
						$("#cs_main_data").show();
						$("#cs_main_data2").hide();
						
						$("#fc_chart_detail1").show();
						$("#fc_chart_detail3").show();
						$("#fc_chart_detail2").hide();
						$("#fc_chart_detail4").hide();
						$("#fcchart").show();
						$("#barchart").hide();
						
						$("#changechart2").hide();
					}
					else if (units[0] == "1") {
						$("#cs_main_data").hide();
						$("#cs_main_data2").show();
						
						$("#fc_chart_detail1").hide();
						$("#fc_chart_detail3").hide();
						$("#fc_chart_detail2").show();
						$("#fc_chart_detail4").show();
						$("#fcchart").hide();
						$("#barchart").show();
						
						$("#changechart2").hide();
					}
				}, 500);
			}
			WaitingShow(false);
		}
	});
}
function cs_data_chart2(data, tar, type) {
	$("#" + tar).empty();
	$("#" + tar).removeClass("nodata");
	
	if (data.length == 0) {
		$("#" + tar).hide();
		$("#" + tar).addClass("nodata");
		return;
	}

	if (type == "0") {
		data.sort(function(a, b) {
			return b.value - a.value;
		});
	}
	else if (type == "1") {
		data.sort(function(a, b) {
			return b.length - a.length;
		});
	}
	
	var domain = [];
	var range = [];
	
	for (var i = 0; i < data.length; i++) {
		range.push(data[i].color);
		domain.push(data[i].label);
	}
	
	var color = d3.scaleOrdinal()
		.domain(domain)
		.range(range);
	
	var pie = new d3pie(tar, {
		header: {
			title: {
				text: "",
				fontSize: 10
			}
		},
		labels: {
			inner: {
				format: "none"
			},
			mainLabel: {
				color: "#333333",
				font: "arial",
				fontSize: 15
			},
		},
		data: {
			sortOrder: "value-asc",
			content: data
		},
		tooltips: {
			enabled: true,
			type: "placeholder",
			string: "{label}: {value}",
			styles: {
				fontSize: 15
			},
			placeholderParser: function(index, data) {
				data.value = (data.value / 10000).toFixed(2);
			}
		},
		misc: {
			colors: {
				segments: range
			}
		},
		callbacks: {
			onClickSegment: function(d) {
				cs_data_getLandCodeShp2(d.data, type, color(d.data.label));
			}
		}
	});
	
	return pie;
}
function cs_data_bar2(dataset, tar, type) {
	$("#" + tar).empty();
	$("#" + tar).removeClass("nodata");
	
	if (dataset.length == 0) { 
		$("#" + tar).hide();
		$("#" + tar).addClass("nodata");
		return;
	}

	var margin = {top: 20, right: 20, bottom: 90, left: 50},
		margin2 = {top: 230, right: 20, bottom: 30, left: 50},
		width = 600 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom,
		height2 = 300 - margin2.top - margin2.bottom;
	
	if (type == "0") {
		dataset.sort(function(a, b) {
			return b.value - a.value;
		});
	}
	else if (type == "1") {
		dataset.sort(function(a, b) {
			return b.length - a.length;
		});
	}
	
	var svg = d3.select("#" + tar).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);
	
	var focus = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	var context = svg.append("g")
				.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
	
	var maxHeight = d3.max(dataset, function(d){
		if (type == "0")
			return d.value;
		else if (type == "1")
			return d.length;
	});
	
	var yScale = d3.scaleLinear().range([0, height]).domain([maxHeight, 0]);
	var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1);
	xScale.domain(dataset.map(function(d) { return d.label; })).padding(0.2);
	
	var yScale2 = d3.scaleLinear().range([0, height2]).domain([maxHeight, 0]);
	var xScale2 = d3.scaleBand().rangeRound([0, width]).padding(0.1);
	xScale2.domain(dataset.map(function(d) { return d.label; })).padding(0.2);
	
	var yAxis = d3.axisLeft(yScale).tickSize(-width);
	var yAxisGroup = focus.append("g").call(yAxis);
	var xAxis = d3.axisBottom(xScale).tickSize(-height);
	var xAxisGroup = focus.append("g").call(xAxis).attr("transform", "translate(0," + height + ")");
	
	var xAxis2 = d3.axisBottom(xScale2).tickFormat("");;
	var xAxisGroup2 = context.append("g").call(xAxis2).attr("transform", "translate(0," + height2 + ")");
	
	var bars1 = focus.selectAll("rect").data(dataset).enter().append("rect");
	
	bars1.attr("x", function(d, i) {
		return xScale(d.label);
	})
	.attr("y", function(d){
		if (type == "0")
			return yScale(d.value);
		else if (type == "1")
			return yScale(d.length);
	})
	.attr('width', 24)
	.attr('transform', `translate(${xScale.bandwidth() / 2 - 12}, 0)`)
	.attr("height", function(d) {
		if (type == "0")
			return height - yScale(d.value);
		else if (type == "1")
			return height - yScale(d.length);
	});
	
	bars1.attr("fill", function(d) {
		return d.color;
	});
	
	bars1.on("mouseover", function() { tooltip.style("display", null); })
	.on("mouseout", function() { tooltip.style("display", "none"); })
	.on("click", function(d) { 
		cs_data_getLandCodeShp2(d, type, d.color);
	})
	.on("mousemove", function(d) {
		var xPosition = d3.mouse(this)[0] + 120;
		var yPosition = d3.mouse(this)[1] - 5;
		tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
		
		if (type == "0")
			tooltip.select("text").text(d.label + ":" + (d.value / 10000).toFixed(2));
		else if (type == "1")
			tooltip.select("text").text(d.label + ":" + d.length);
	});
		
	var bars2 = context.selectAll("rect").data(dataset).enter().append("rect");
	bars2.attr("x",function(d, i) {
		return xScale2(d.label);
	})
	.attr("y",function(d) {
		if (type == "0")
			return yScale2(d.value);
		else if (type == "1")
			return yScale2(d.length);
	})
	.attr("width", 24)
	.attr('transform', `translate(${xScale2.bandwidth() / 2 - 12}, 0)`)
	.attr("height", function(d) {
		if (type == "0")
			return height2 - yScale2(d.value);
		else if (type == "1")
			return height2 - yScale2(d.length);
	});
	
	bars2.attr("fill",function(d) {
		return d.color;
	});
	
	var brush = d3.brushX()
				.extent([[0, 0], [width, height2]])
				.on("brush", brushed);
	//			.on("end", brushend);
	
	context.append("g")
		.attr("class", "brush")
		.call(brush)
		.call(brush.move, xScale2.range());
		
	var tooltip = svg.append("g")
		.attr("class", "tooltip")
		.style("display", "none");

	tooltip.append("text")
		.attr("x", 30)
		.attr("dy", "1.2em")
		.style("text-anchor", "middle")
		.attr("font-size", "14px")
		.attr("font-weight", "bold");
	
	function brushed() {
		if (!d3.event.sourceEvent) return;
  		if (!d3.event.selection) return;
		if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return;
		
		var newInput = [];
		var brushArea = d3.event.selection;
		if(brushArea === null) brushArea = xScale.range();
		
		xScale2.domain().forEach(function(d) {
			var pos = xScale2(d) + xScale2.bandwidth() / 2;
			if (pos >= brushArea[0] && pos <= brushArea[1]) {
				newInput.push(d);
			}
		});

		xScale.domain(newInput);

		bars1.attr("x",function(d, i){
			return xScale(d.label);
		})
		.attr("y",function(d){
			if (type == "0")
				return yScale(d.value);
			else if (type == "1")
				return yScale(d.length);
		})
		.attr("width", 24)
		.attr('transform', `translate(${xScale.bandwidth() / 2 - 12}, 0)`)
		.attr("height", function(d, i){
			if (xScale.domain().indexOf(d.label) === -1) {
				return 0;
			}
			else {
				if (type == "0")
					return height - yScale(d.value);
				else if (type == "1")
					return height - yScale(d.length);
			}
		});
		
		xAxisGroup.call(xAxis);
	}
	/*function brushend() {
		if (!d3.event.sourceEvent) return;
  		if (!d3.event.selection) return;
		if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return;
		
		var newInput = [];
		var brushArea = d3.event.selection;
		if(brushArea === null) brushArea = xScale.range();
		
		xScale2.domain().forEach(function(d){
			var pos = xScale2(d) + xScale2.bandwidth() / 2;
			if (pos >= brushArea[0] && pos <= brushArea[1]){
			  newInput.push(d);
			}
		});

		var increment = 0;
		var left = xScale2(d3.min(newInput));
		var right = xScale2(d3.max(newInput)) + xScale2.bandwidth();

		if (left < right)
			d3.select(this).transition().call(d3.event.target.move, [left, right]);
	} */
}
function randomColor() {
	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	return "#" + randomColor;
}
function hexToRgb(hex) {
	if (hex.length < 7) {
		for (var i = hex.length; i < 7; i++) {
			hex += "0";
		}
	}
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}
function cs_data_getLandCodeShp2(data, type, color) {
	var post = {};
	
	// 找到該筆資料的內容
	var target = "";
	
	var year = $("#search_year").val();
	var county = $("#search_county").val();
	var town = $("#search_town").val();
	var owner = $("#search_dep").val();
	var dist = $("#search_dist").val();
	var workshop = $("#search_workshop").val();
	var ownerclass = $("#search_class").val();
	var type = $("#search_option").val();
	
	if (data.statitem == "0") {
		year = data.label;
	}
	else if (data.statitem == "1") {
		county = data.countyCode;
	}
	else if (data.statitem == "2") {
		town = data.townCode;
	}
	else if (data.statitem == "3") {
		ownerclass = data.ownerClass;
	}

	if (typeof(year) == "string" && year != "-1")
	{
		post.Year = [year];
	}
	else if (Array.isArray(year) && year.length > 0)
	{
		post.Year = year;
	}
	
	if (typeof(county) == "string" && county != "-1")
	{
		post.County = [county];
	}
	else if (Array.isArray(county) && county.length > 0)
	{
		post.County = county;
	}
	
	if (typeof(town) == "string" && town != "-1")
	{
		post.Town = [town];
	}
	else if (Array.isArray(town) && town.length > 0)
	{
		post.Town = town;
	}
	
	if (typeof(owner) == "string" && owner != "-1")
	{
		post.Owner = [owner];
	}
	else if (Array.isArray(owner) && owner.length > 0)
	{
		post.Owner = owner;
	}
	
	if (typeof(dist) == "string" && dist != "-1")
	{
		post.Dist = [dist];
	}
	else if (Array.isArray(dist) && dist.length > 0)
	{
		post.Dist = dist;
	}
	
	if (typeof(workshop) == "string" && workshop != "-1")
	{
		post.WorkShop = [workshop];
	}
	else if (Array.isArray(workshop) && workshop.length > 0)
	{
		post.WorkShop = workshop;
	}
	
	if (typeof(ownerclass) == "string" && ownerclass != "-1")
	{
		post.OwnerClass = [ownerclass];
	}
	else if (Array.isArray(ownerclass) && ownerclass.length > 0)
	{
		post.OwnerClass = ownerclass;
	}
	
	if (typeof(type) == "string" && type != "-1")
	{
		post.Type = [type];
	}
	else if (Array.isArray(type) && type.length > 0)
	{
		post.Type = type;
	}
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetSearchMergePolygon2",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				cs_manage2.map.geomvector_source.clear();
				var rgb = hexToRgb(color);
				var style =	new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(0, 48, 97, 1)",
						width: 2,
					}),
				});
				
				var format = new ol.format.WKT();
				var feature = format.readFeature(d);
				
				feature.getGeometry().transform("EPSG:3826", "EPSG:3857");
				feature.setStyle(style);
				
				cs_manage2.map.geomvector_source.addFeature(feature);
				cs_manage2.map.getView().fit(cs_manage2.map.geomvector_source.getExtent(), { maxZoom: 18});
			}
			WaitingShow(false);
		}
	});
}
function cs_get_code(tar) {
	var s = $("option[name='" + tar + "']").val();
	
	return s;
}
var cs_chart_type2 = 1;
function cs_chart_change2() {
	if (cs_chart_type2 == 1) {
		$("#fc_chart_detail1").hide();
		$("#fc_chart_detail3").hide();
		
		if (!$("#fc_chart_detail2").hasClass("nodata"))
			$("#fc_chart_detail2").show();
		if (!$("#fc_chart_detail4").hasClass("nodata"))
			$("#fc_chart_detail4").show();
		
		$("#cs_main_data").hide();
		$("#cs_main_data2").show();
		
		cs_chart_type2 = 2;
	}
	else {
		if (!$("#fc_chart_detail1").hasClass("nodata"))
			$("#fc_chart_detail1").show();
		if (!$("#fc_chart_detail3").hasClass("nodata"))
			$("#fc_chart_detail3").show();
		
		$("#fc_chart_detail2").hide();
		$("#fc_chart_detail4").hide();
		$("#cs_main_data").show();
		$("#cs_main_data2").hide();
		
		cs_chart_type2 = 1;
	}
}
// 常用查詢 END

// 查詢共用 START
function cs_manage_getYear() {
	
}
function cs_manage_getCity(item) {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetCountyList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				if (item) 
					item.cityData = d;
				
				for (var i = 0; i < d.length; i++) {
					$("#search_county").append('<option name="' + d[i].name + '" value="' + d[i].code + '">' + d[i].name + '</option>');
				}
			}
		}
	});
}
function cs_manage_getTown() {
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
					$("#search_town").append('<option name="' + d[i].name + '" value="' + d[i].code + '">' + d[i].name + '</option>');
				}
			}
		}
	});
}
function cs_manage_getTown2() {
	var val = $("#search_county").val();
	if (val == "-1" || Array.isArray(val)) return;
	var post = {};
	post.CountyCode = val;
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetTownList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				var tarvalue = $("#search_temp").val();
				var tardata = cs_manage2.theme.filter(x => x.sid == tarvalue);
				
				var statitem = tardata[0].statItem;
				var cat = tardata[0].itemCategory;
				
				if (statitem == "2" && cat == "1") {
					$("#search_town").multiselect('destroy');
				}
				
				$("#search_town").empty();
				
				if (statitem == "2" && cat == "1") {
					
				}
				else {
					$("#search_town").append('<option selected value="-1">請選擇</option>');
				}
				
				for (var i = 0; i < d.length; i++) {
					$("#search_town").append('<option name="' + d[i].name + '" value="' + d[i].code + '">' + d[i].name + '</option>');
				}
				
				if (statitem == "2" && cat == "1") {
					$("#search_town").multiselect({
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
		}
	});
}
function cs_data_setDataTable2(data) {	
	$("#cs_main_data").empty();
	$("#cs_main_data2").empty();
	
	var year = $("#search_year").val();
	var county = $("#search_county").find('option:selected').text();
	
	let detail1 = "";
	
	detail1 += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>縣市</div>" +
		"<div class='detail_rows_value'>" + (county == "請選擇" ? "全臺縣市" : county) + "</div>" +
		"</div>";
	
	detail1 += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>年度</div>" +
		"<div class='detail_rows_value'>" + (year == "-1" ? "全年度" : year) + "</div>" +
		"</div>";
	
	detail1 += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>單位</div>" +
		"<div class='detail_rows_value'>" + "面積(公頃)" + "</div>" + 
		"</div>";

	for (var i = 0; i < data.length; i++) {
		detail1 += 
			"<div class='detail_rows'>" +
			"<div class='detail_rows_name'>" + data[i].label + "</div>" +
			"<div class='detail_rows_value'>" + (data[i].value / 10000).toFixed(2) + "</div>" +
			"</div>";
	}
	
	if (data.length == 0) {
		detail1 += 
			"<div class='detail_rows'>" +
			"<div class='detail_rows_name'>" + "" + "</div>" +
			"<div class='detail_rows_value'>" + "查無相關資料" + "</div>" +
			"</div>";
	}
	
	$("#cs_main_data").append(detail1);
	
	let detail2 = "";
	
	detail2 += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>縣市</div>"+
		"<div class='detail_rows_value'>" + (county == "請選擇" ? "全臺縣市" : county) + "</div>" +
		"</div>";
	
	detail2 += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>年度</div>" +
		"<div class='detail_rows_value'>" + (year == "-1" ? "全年度" : year) + "</div>" +
		"</div>";
		
	detail2 += 
		"<div class='detail_rows'>" +
		"<div class='detail_rows_name'>單位</div>"+
		"<div class='detail_rows_value'>" + "筆數(筆)" + "</div>" + 
		"</div>";
	
	for (var i = 0; i < data.length; i++) {
		detail2 += 
			"<div class='detail_rows'>" +
			"<div class='detail_rows_name'>" + data[i].label + "</div>" +
			"<div class='detail_rows_value'>" + data[i].length + "</div>" +
			"</div>";
	}
	
	if (data.length == 0) {
		detail2 += 
			"<div class='detail_rows'>" +
			"<div class='detail_rows_name'>" + "" + "</div>" +
			"<div class='detail_rows_value'>"+ "查無相關資料" + "</div>" +
			"</div>";
	}
	
	$("#cs_main_data2").append(detail2);
}
function cs_manage_getDist(item) {
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (item)
					item.distData = d;
				
				for (var i = 0; i < d.length; i++) {
					$("#search_dist").append('<option name="' + d[i].distName + '" value="' + d[i].distId + '">' + d[i].distName + '</option>');
				}
			}
		}
	});
}
function cs_manage_getWorkShop() {
	var distid = $("#search_dist").val();

	if (distid == "-1") return;
	var post = {};
	post.DistId = distid;

	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetWorkShopList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#search_workshop").empty();
				$("#search_workshop").append('<option selected value="-1">請選擇</option>');
				for (var i = 0; i < d.length; i++) {
					$("#search_workshop").append('<option name="' + d[i].name + '" value="' + d[i].workId + '">' + d[i].name + '</option>');
				}
			}
		}
	});
}
function cs_manage_getWorkShop2() {
	var distid = $("#search_dist").val();

	if (distid == "-1" || Array.isArray(distid)) return;
	var post = {};
	post.DistId = distid;

	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetWorkShopList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				var tarvalue = $("#search_temp").val();
				var tardata = cs_manage2.theme.filter(x => x.sid == tarvalue);
				
				var statitem = tardata[0].statItem;
				var cat = tardata[0].itemCategory;
				
				if (statitem == "6" && cat == "1") {
					$("#search_workshop").multiselect('destroy');
				}
				
				$("#search_workshop").empty();
				
				if (statitem == "6" && cat == "1") {
					
				}
				else {
					$("#search_workshop").append('<option selected value="-1">請選擇</option>');
				}
				
				for (var i = 0; i < d.length; i++) {
					$("#search_workshop").append('<option name="' + d[i].name + '" value="' + d[i].workId + '">' + d[i].name + '</option>');
				}
				
				if (statitem == "6" && cat == "1") {
					$("#search_workshop").multiselect({
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
		}
	});
}
// 查詢共用 END