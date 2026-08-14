// 暫存
var tempselect1 = {};
var tempselect2 = {};
var tempselect3 = {};

function fi_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab" + i).load("./views/fi_manage_tab" + i + ".html"); 
}

function optionactive(list) {
	$("#" + list + " tr").on("click",function() {
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
	});
}

function list_click(source, type) {
//圖資列表點擊事件
	$("#" + source + " tr").on("click",function() {
		let fmid = $(this).attr('id');
		
		//載入地籍列表
		$("#fc_detail_list").empty();
		$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
		setTimeout(function(){
			fi_fc_list("fi_fc_list1");
			optionactive("fi_fc_list1");
		},50);
	});
}

function fi_fc_list(target) {
	var rows;
	var order,land_code,country,town,sect,pm,pc,zoning,lc_class,reg_area,builddate,owner,name,sp,mp,pid;
	
	$("#" + target).empty();
	
	for(i = 0; i < 8; i++) {
		order = i + 1;
		land_code = "GB041406320001";
		country = "台北市";
		town = "內湖區";
		sect = "洲子段";
		pm = "1233";
		pc = "000" + i;
		zoning = "商業區";
		lc_class = "甲種建築用地";
		reg_area = "223.02";
		builddate = "2017-07-18";
		owner = "國有";
		name = "農委會林務局";
		sp = "1";
		mp = "1";
		
		rows = "<tr><td width='4%'>" + order + "</td>";
		rows += "<td width='10%'>" + land_code + "</td>";
		rows += "<td width='4.5%'>" + country + "</td>";
		rows += "<td width='4.5%'>" + town + "</td>";
		rows += "<td width='8%'>" + sect + "</td>";
		rows += "<td width='4%'>" + pm + "</td>";
		rows += "<td width='4%'>" + pc + "</td>";
		rows += "<td width='7%'>" + zoning + "</td>";
		rows += "<td width='9%'>" + lc_class + "</td>";
		rows += "<td width='6%'>" + area_ha(reg_area) + "</td>";
		rows += "<td width='8%'>" + builddate + "</td>";
		
		rows += "<td width='6%'>" + owner + "</td>";
		rows += "<td width='12%'>" + name + "</td>";
		rows += "<td width='4%'>" + sp + "</td>";
		rows += "<td width='4%'>" + mp + "</td>";
		rows += "<td width='5%'><button>查看</button></td></tr>";
		
		$("#"+target).append(rows);
	}
}

//事業林區頁面初始化
var fi_tab1 = {};
fi_tab1.WkngList = [];
fi_tab1.NowOption = null;
fi_tab1.SelectSingleClick = null;
function fi_tab1_init() {
	fi_tab1.map = map("mmap", true, false, true);
	optionactive("te_tab1_list");
	list_click("te_tab1_list", "國有林事業區");
	big_window();
	
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
			if (fi_tab1.mainfeature && fi_tab1.mainfeature == e) return false;
			if (e.ftype == "other") return false;
			return true;
		}
	});
	SelectSingleClick.on("select", function(e) {
		fi_fc_feature_click(e, fi_tab1, "tab1");
	});
	fi_tab1.map.addInteraction(SelectSingleClick);
	fi_tab1.SelectSingleClick = SelectSingleClick;
	
	// 優先初始化相關代碼
	fi_tab1_getApiCode();
	
	// 處理Legend
	var target = $("#maplegend");
	var legend1 = "<div style='width: 200px;'>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend1'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>選取區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend1_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab1_layer_change_opacity('legend1');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend2'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>列表區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend2_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab1_layer_change_opacity('legend2');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend3'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>地籍區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend3_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab1_layer_change_opacity('legend3');\" /></div>";
	legend1 += "</div>";
	legend1 += "</div>";
	
	target.append(legend1);
	
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
	$("#search_wkng").multiselect({
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
	
	WaitingShow(true);
	// 林區管理處列表
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetDistList",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			var d = data.data;
			$("#search_dist").multiselect('destroy');
			for (var i = 0; i < d.length; i++) {
				if (tempselect1.dist && tempselect1.dist.includes(d[i].distId))
					$("#search_dist").append('<option value="' + d[i].distId + '" selected>' + htmlEncode(d[i].distName) + '</option>');
				else
					$("#search_dist").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
			}
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
		// 事業區列表
		$.ajax({
		  url: ApiRequestURL + "ProjectManagement/GetWkngList",
		  type: "Post",
		  success: function(data) {
		    if (!tempselect1.hastemp) WaitingShow(false);
			if (data.data) {
				fi_tab1.WkngList = data.data;
				$("#search_wkng").multiselect('destroy');
				$("#search_wkng").multiselect({
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
				if (tempselect1.wkng)
					tab1_search_dist_change(true);
			}
		  }
		});
	  }
	});
	// OTHERLAND
	$.ajax({
	  url: ApiRequestURL + "ProjectManagement/GetOtherAssociateOptionMaps",
	  type: "Post",
	  success: function(data) {
		if (data.data) {
			fi_tab1.OtherList = data.data;
		}
	  }
	});
}

function fi_tab1_layer_change_opacity(type) {
	if (type == 'legend1') {
		var val = $('#legend1_opacity').val() / 100;
		fi_tab1.map.geomvector_layer2.setOpacity(val);
	}
	else if (type == 'legend2') {
		var val = $('#legend2_opacity').val() / 100;
		fi_tab1.map.geomvector_layer1.setOpacity(val);
	}
	else {
		var val = $('#legend3_opacity').val() / 100;
		fi_tab1.map.geomvector_layer.setOpacity(val);
	}
}

//保安林頁面初始化
function fi_scheduleMapUpdate(targettab) {
	if (!targettab || !targettab.map) return;
	var delays = [0, 16, 50, 100, 250, 500, 1000];
	for (var i = 0; i < delays.length; i++) {
		window.setTimeout(function () {
			if (targettab && targettab.map) {
				targettab.map.updateSize();
			}
		}, delays[i]);
	}
}

var fi_tab2 = {};
fi_tab2.NowOption = null;
fi_tab2.SelectSingleClick = null;
function fi_tab2_init() {
	fi_tab2.map = map("mmap", true, false, true);
	optionactive("te_tab2_list");
	list_click("te_tab2_list", "保安林");
	big_window();
	
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
		filter: function(e) {
			if (fi_tab2.mainfeature && fi_tab2.mainfeature == e) return false;
			return true;
		}
	});
	SelectSingleClick.on("select", function(e) {
		fi_fc_feature_click(e, fi_tab2, "tab2");
	});
	fi_tab2.map.addInteraction(SelectSingleClick);
	fi_tab2.SelectSingleClick = SelectSingleClick;
	
	// 處理Legend
	var target = $("#maplegend");
	var legend1 = "<div style='width: 200px;'>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend1'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>選取區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend1_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab2_layer_change_opacity('legend1');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend2'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>列表區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend2_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab2_layer_change_opacity('legend2');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend3'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>地籍區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend3_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab2_layer_change_opacity('legend3');\" /></div>";
	legend1 += "</div>";
	legend1 += "</div>";
	
	target.append(legend1);
	
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
	$("#search_pfid").multiselect({
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
	// 林區管理處列表
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				fi_tab2.distData = d;
				$("#search_dist").multiselect('destroy');
				for (var i = 0; i < d.length; i++) {
					if (tempselect2.dist && tempselect2.dist.includes(d[i].distId))
						$("#search_dist").append('<option value="' + d[i].distId + '" selected>' + htmlEncode(d[i].distName) + '</option>');
					else
						$("#search_dist").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
				}
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
	// 保安林類型列表
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetPfTypeList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				fi_tab2.pfidData = d;
				$("#search_pfid").multiselect('destroy');
				for (var i = 0; i < d.length; i++) {
					if (tempselect2.pftype && tempselect2.pftype.includes(d[i].pid))
						$("#search_pfid").append('<option value="' + d[i].pid + '" selected>' + htmlEncode(d[i].pfTypeName) + '</option>');
					else
						$("#search_pfid").append('<option value="' + d[i].pid + '">' + htmlEncode(d[i].pfTypeName) + '</option>');
				}
				setTimeout(function() {
					fi_tab2_get_protectnumber(false, true);
				}, 100);
				$("#search_pfid").multiselect({
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

function fi_tab2_layer_change_opacity(type) {
	if (type == 'legend1') {
		var val = $('#legend1_opacity').val() / 100;
		fi_tab2.map.geomvector_layer2.setOpacity(val);
	}
	else if (type == 'legend2') {
		var val = $('#legend2_opacity').val() / 100;
		fi_tab2.map.geomvector_layer1.setOpacity(val);
	}
	else {
		var val = $('#legend3_opacity').val() / 100;
		fi_tab2.map.geomvector_layer.setOpacity(val);
	}
}

//其他圖資頁面初始化
var fi_tab3 = {};
fi_tab3.NowOption = null;
fi_tab3.SelectSingleClick = null;
function fi_tab3_init() {
	fi_tab3.map = map("mmap", true, false, true);
	optionactive("te_tab3_list");
	big_window();
	
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
			if (fi_tab3.mainfeature && fi_tab3.mainfeature == e) return false;
			return true;
		}
	});
	SelectSingleClick.on("select", function(e) {
		fi_fc_feature_click(e, fi_tab3, "tab3");
	});
	fi_tab3.map.addInteraction(SelectSingleClick);
	fi_tab3.SelectSingleClick = SelectSingleClick;
	
	// 處理Legend
	var target = $("#maplegend");
	var legend1 = "<div style='width: 200px;'>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend1'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>選取區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend1_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab3_layer_change_opacity('legend1');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend2'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>列表區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend2_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab3_layer_change_opacity('legend2');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend3'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>地籍區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"legend3_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab3_layer_change_opacity('legend3');\" /></div>";
	legend1 += "</div>";
	legend1 += "</div>";
	
	target.append(legend1);
	
	$("#search_option").multiselect({
		buttonClass: 'form-select',
		buttonTextAlignment: 'left',
		buttonWidth: '250px',
		nonSelectedText: '請選擇',
		nSelectedText: '已選擇',
		allSelectedText: '全選',
		includeSelectAllOption: true,
		templates: {
			button: '<button type="button" class="multiselect dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
		}
	});
	// 圖資類型LIST
	$.ajax({
		url: ApiRequestURL + "ImportFile/GetFMOtherType",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#search_option").multiselect('destroy');
				for (var i = 0; i < d.length; i++) {
					if (tempselect3.so && tempselect3.so.includes(d[i].sid))
						$("#search_option").append('<option value="' + d[i].sid + '" selected>' + htmlEncode(d[i].name) + '</option>');
					else
						$("#search_option").append('<option value="' + d[i].sid + '">' + htmlEncode(d[i].name) + '</option>');
				}
				
				$("#search_option").multiselect({
					buttonClass: 'form-select',
					buttonTextAlignment: 'left',
					buttonWidth: '250px',
					nonSelectedText: '請選擇',
					nSelectedText: '已選擇',
					allSelectedText: '全選',
					includeSelectAllOption: true,
					templates: {
						button: '<button type="button" class="multiselect dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
					}
				});
				
				if (tempselect3.so)
					tab3_searchoptionChange(true);
			}
		}
	});
	// 管理單位LIST
	$("#search_dist").multiselect({
		buttonClass: 'form-select',
		buttonTextAlignment: 'left',
		buttonWidth: '250px',
		nonSelectedText: '請選擇',
		nSelectedText: '已選擇',
		allSelectedText: '全選',
		includeSelectAllOption: true,
		templates: {
			button: '<button type="button" class="multiselect dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
		}
	});
}

function fi_tab3_layer_change_opacity(type) {
	if (type == 'legend1') {
		var val = $('#legend1_opacity').val() / 100;
		fi_tab3.map.geomvector_layer2.setOpacity(val);
	}
	else if (type == 'legend2') {
		var val = $('#legend2_opacity').val() / 100;
		fi_tab3.map.geomvector_layer1.setOpacity(val);
	}
	else {
		var val = $('#legend3_opacity').val() / 100;
		fi_tab3.map.geomvector_layer.setOpacity(val);
	}
}

function tab3_searchoptionChange(istemp) {
	var so = $("#search_option").val();
	
	if (so.length == 0) {
		$("#search_dist").multiselect('destroy');
		$("#search_dist").empty();
		$("#search_dist").multiselect({
			buttonClass: 'form-select',
			buttonTextAlignment: 'left',
			buttonWidth: '250px',
			nonSelectedText: '請選擇',
			nSelectedText: '已選擇',
			allSelectedText: '全選',
			includeSelectAllOption: true,
			templates: {
				button: '<button type="button" class="multiselect dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
			}
		});
		return;
	}
	
	var post = {};
	
	if (so.length > 0 && so[0] == '-1') {
		post.option = "-1";
	}
	else {
		var st = '';
		for (var i = 0; i < so.length; i++) {
			if (i != 0) st += ',';
			st += so[i];
		}
		post.option = st;
	}
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMOtherManagerList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$("#search_dist").multiselect('destroy');
				$("#search_dist").empty();
				for (var i = 0; i < d.length; i++) {
					if (istemp && tempselect3.sd && tempselect3.sd.includes(d[i].value))
						$("#search_dist").append('<option value="' + (d[i].value == '' ? '無' : htmlEncode(d[i].value)) + '" selected>' + (d[i].name == '' ? '無' : htmlEncode(d[i].name)) + '</option>');
					else if (istemp && tempselect3.sd && !tempselect3.sd.includes(d[i].value))
						$("#search_dist").append('<option value="' + (d[i].value == '' ? '無' : htmlEncode(d[i].value)) + '">' + (d[i].name == '' ? '無' : htmlEncode(d[i].name)) + '</option>');
					else
						$("#search_dist").append('<option value="' + (d[i].value == '' ? '無' : htmlEncode(d[i].value)) + '" selected>' + (d[i].name == '' ? '無' : htmlEncode(d[i].name)) + '</option>');
				}
				
				if (istemp)
					tab3_go_search();
				
				$("#search_dist").multiselect({
					buttonClass: 'form-select',
					buttonTextAlignment: 'left',
					buttonWidth: '250px',
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

function fi_edit(type) {
	//判斷權限
	
	$("#fi_edit_bt").off("click.fiEdit").on("click.fiEdit",function(){
		$(".fi_pro").hide();
		$(".fi_edit").show();
		$("#fi_cancel_bt, #fi_save_bt").remove();
		
		if (type == "保安林") {
			$(".fi_value_show").hide();
			$(".fi_edit_show").show();
			
			$("#edit_pfid").multiselect({
				buttonClass: 'form-select',
				buttonTextAlignment: 'left',
				nonSelectedText: '請選擇',
				nSelectedText: '已選擇',
				allSelectedText: '全選',
				includeSelectAllOption: true,
				templates: {
					button: '<button type="button" class="multiselect dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
				}
			});
		}
		
		var bt = 
			"<button type='button' id='fi_cancel_bt' class='btn btn-danger fi_button'>取消</button>" +
			"<button type='button' id='fi_save_bt' class='btn btn-success fi_button'>儲存</button>";
		
		$(".fi_edit").append(bt);
		//切換編輯狀態
		$(".detail_rows_value input,textarea").removeAttr("readonly");
		
		$("#fi_save_bt").off("click.fiEditSave").on("click.fiEditSave",function() {
			//更新資料庫的方法
			if (type) {
				var post = {};
				
				if (type == "國有林事業區") {
					post.type = type;
					post.id = fi_tab_click_id;
					
					post.area_ha = $("#AREA_HA").val();
					post.edition = $("#EDITION").val();

					if (post.area_ha == '') {
						alert('面積(公頃)欄位內容不可為空白！');
						return;
					}
				}
				else if (type == "保安林") {
					post.type = type;
					post.id = fi_tab_click_id;
					
					post.pid = $("#edit_pfid").val();
					post.area_ha = $("#AREA_HA").val();
					post.edition = $("#EDITION").val();
					post.forest = $("#edit_forest").val();
					
					if (post.area_ha == '') {
						alert('面積(公頃)欄位內容不可為空白！');
						return;
					}
					if (post.pid.length == 0) {
						alert('保安林類型欄位內容不可為空！');
						return;
					}
				}
				else if (type == "其他圖資") {
					post.type = type;
					post.id = fi_tab_click_id;
					
					post.manage = $("#MANAGER").val();
					post.name = $("#NAME").val();
					post.subname = $("#SUB_NAME").val();
					post.note = $("#NOTE").val();
					post.area_ha = $("#AREA_HA").val();
					post.edition = $("#EDITION").val();
					post.announce = $("#ANNOUNCE").val();
					post.date = $("#DATE").val();

					if (post.manage == '') {
						alert('管理單位欄位內容不可為空白！');
						return;
					}
					if (post.name == '') {
						alert('名稱欄位內容不可為空白！');
						return;
					}
					if (post.area_ha == '') {
						alert('面積(公頃)欄位內容不可為空白！');
						return;
					}
				}
				
				$(".fi_pro").show();
				$(".fi_edit").empty().hide();
				
				$.ajax({
					url: ApiRequestURL + "ProjectManagement/UpdateFMDetailData",
					type: "Post",
					data: post,
					success: function(data) {
						if (data.data) {
							var d = data.data;
							if (d == "true") {
								alert('更新成功.');
								// 更新頁面的方法
								$("#" + fi_tab_click_id).click();
							}
							else {
								alert('更新失敗.');
							}
						}
					}
				});
			}
			
			$(".detail_rows_value input,textarea").attr("readonly", "readonly");
	    });
		
	    $("#fi_cancel_bt").off("click.fiEditCancel").on("click.fiEditCancel", function() {
			$(".fi_pro").show();
			$(".fi_edit").empty().hide();
			//更新頁面的方法
			$("#" + fi_tab_click_id).click();
			
			//切換編輯狀態
			$(".detail_rows_value input,textarea").attr("readonly", "readonly");
	    });
	});
}

//事業林區查詢條件變動
function tab1_search_dist_change(istemp) {
	var list = fi_tab1.WkngList;
	$("#search_wkng").empty();
	$("#search_wkng").multiselect('destroy');
	var target = $("#search_dist").val();
	var haswid = [];
	for (var i = 0; i < list.length; i++) {
		if (haswid.includes(list[i].wid)) continue;
		if (istemp && target.includes(list[i].distId) && tempselect1.wkng.includes(list[i].wid))
			$("#search_wkng").append('<option value="' + list[i].wid + '" selected>' + htmlEncode(list[i].wkngName) + '</option>');
		else if (istemp && target.includes(list[i].distId) && !tempselect1.wkng.includes(list[i].wid))
			$("#search_wkng").append('<option value="' + list[i].wid + '">' + htmlEncode(list[i].wkngName) + '</option>');
		else if(target.includes(list[i].distId))
			$("#search_wkng").append('<option value="' + list[i].wid + '" selected>' + htmlEncode(list[i].wkngName) + '</option>');
		else
			continue;
		
		haswid.push(list[i].wid);
	}
	$("#search_wkng").multiselect({
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
	tab1_search_wkng_change(istemp);
}

function tab1_search_wkng_change(istemp) {
	var dist = $("#search_dist").val();
	var wkng = $("#search_wkng").val();
	
	var post = {};
	if (dist.length == 0 || wkng.length == 0) {
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
				if (istemp && tempselect1.cmpt == "-1")
					$("#search_cmpt").append('<option value="-1" selected>不限</option>');
				else
					$("#search_cmpt").append('<option value="-1">不限</option>');
				
				for (var i = 0; i < d.length; i++) {
					if (istemp && tempselect1.cmpt == d[i])
						$("#search_cmpt").append('<option value="' + d[i] + '" selected>' + d[i] + '</option>');
					else
						$("#search_cmpt").append('<option value="' + d[i] + '">' + d[i] + '</option>');
				}
				
				if (istemp) tab1_go_search();
			}
		}
	});
}

function tab1_go_search() {
	var dist = $("#search_dist").val();
	var wkng = $("#search_wkng").val();
	var cmpt = $("#search_cmpt").val();
	var stat = $("#search_stat").val();
	
	var post = {};
	if (dist.length > 0) post.Dist = dist;
	if (wkng.length > 0) post.Wid = wkng;
	if (cmpt != "-1") post.Cmpt = cmpt;
	if (stat != "-1") post.Revision = stat;
	
	var check = CheckUserAccess("圖資查詢", "國有林事業區", "查詢");
	if (!check) {
		alert('您沒有權限使用.');
		return;
	}
	
	tempselect1.dist = dist;
	tempselect1.wkng = wkng;
	tempselect1.cmpt = cmpt;
	tempselect1.hastemp = true;
	
	AddNewLog("圖資查詢", "國有林事業區", "查詢");
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetForestData",
		type: "Post",                
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data) {
				var d = data.data;
				fi_tab1.NowOption = d;
				
				$("#te_tab1_list").empty();
				$("#te_tab1_list").scrollTop(0);
				
				$("#te_tab1_count").text("共 (" + d.length + ") 筆");
				if (d.length == 0) {
					var text = '<tr>';
					text += '<td>' + '無符合查詢結果' + '</td>';
					text += '</tr>';
					$("#te_tab1_list").append(text);
				}
				else {
					for (var i = 0; i < d.length; i++) {
						var text = '<tr id="' + d[i].sid + '" onclick="tab1_search_list_click(this);">';
						text += '<td>' + htmlEncode(d[i].distName) + '</td>';
						text += '<td>' + htmlEncode(d[i].weildName) + '</td>';
						text += '<td>' + htmlEncode(d[i].cmpt) + '林班</td>';
						text += '</tr>';
						
						$("#te_tab1_list").append(text);
					}
					if (d.length > 0 && tempselect1.lselect) {
						var $objTr = $("#" + tempselect1.lselect);
						if ($objTr.length > 0) {
							var objTr = $objTr[0];
							$(".result_list").animate({scrollTop:objTr.offsetTop}, "slow");
							$("#" + tempselect1.lselect).click();
						}
						else {
							$("#" + d[0].sid).click();
							tempselect1.lselect = d[0].sid;
						}
					}
					else if (d.length > 0) {
						$("#" + d[0].sid).click();
						tempselect1.lselect = d[0].sid;
					}
				}
			}
		}
	});
}
//重置選項
function tab1_reset() {
	$("#search_dist").multiselect("clearSelection");
	$("#search_wkng").multiselect("clearSelection");
	
	$("#search_cmpt").val("-1");
	$("#search_stat").val("-1");
	
	$("#search_cmpt").empty();
	$("#search_cmpt").append('<option value="-1">不指定</option>');
	
	$("#te_tab1_list").empty();
	$("#te_tab1_count").empty();
	$(".fc_detail_data").hide();
	
	tempselect1 = {};
}

function fi_tab2_get_protectnumber(ismanage, istemp) {
	if (ismanage) {
		var d = fi_tab2.pfidData;
		$("#search_pfid").multiselect('destroy');
		$("#search_pfid").empty();
		for (var i = 0; i < d.length; i++) {
			if (tempselect2.pftype && tempselect2.pftype.includes(d[i].pid))
				$("#search_pfid").append('<option value="' + d[i].pid + '" selected>' + htmlEncode(d[i].pfTypeName) + '</option>');
			else
				$("#search_pfid").append('<option value="' + d[i].pid + '">' + htmlEncode(d[i].pfTypeName) + '</option>');
		}
		$("#search_pfid").multiselect({
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
	
	var dist = $("#search_dist").val();
	var pftype = $("#search_pfid").val();
	
	if (dist.length == 0 || pftype.length == 0) return;
		
	var post = {};
	post.Dist = dist;
	post.Pftype = pftype;
	
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
					if (tempselect2.pfid && tempselect2.pfid == d[i].pfid)
					{
						var text = '<option value="' + d[i].pfid + '" selected>' + d[i].pfid + '</option>';
						$("#search_pfsid").append(text);
					}
					else
					{
						var text = '<option value="' + d[i].pfid + '">' + d[i].pfid + '</option>';
						$("#search_pfsid").append(text);
					}
				}
				if (istemp)
					tab2_go_search();
			}
		}
	});
}

function tab2_go_search() {
	var dist = $("#search_dist").val();
	var pftype = $("#search_pfid").val();
	var pfid = $("#search_pfsid").val();
	var forest = $("#search_forest").val();
	
	var post = {};
	if (dist.length > 0) post.Dist = dist;
	if (pftype.length > 0) post.Pftype = pftype;
	if (pfid != "-1") post.Pfid = pfid;
	if (forest != "") post.Forest = forest;
	
	var check = CheckUserAccess("圖資查詢", "保安林", "查詢");
	if (!check) {
		alert('您沒有權限使用.');
		return;
	}
	
	AddNewLog("圖資查詢", "保安林", "查詢");
	
	tempselect2.dist = dist;
	tempselect2.pftype = pftype;
	tempselect2.pfid = pfid;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetProtectionData",
		type: "Post",
		data: post,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data;
				fi_tab2.NowOption = d;
				$("#te_tab2_list").empty();
				$("#te_tab2_list").scrollTop(0);
				
				$("#te_tab2_count").text("共 (" + d.length + ") 筆");
				if (d.length == 0) {
					var text = '<tr>';
					text += '<td>' + '無符合查詢結果' + '</td>';
					text += '</tr>';
					$("#te_tab2_list").append(text);
				}
				else {
					for (var i = 0; i < d.length; i++) {
						var text = '<tr id="' + d[i].sid + '" onclick="tab2_search_list_click(this);">';
						text += '<td>' + htmlEncode(d[i].distName) + '</td>';
						
						var ntext = d[i].pfName.split(',');
						text += '<td>';
						for (var j = 0; j < ntext.length; j++) {
							if (j != 0) text += '<br />';
							text += ntext[j];
						}
						text += '</td>';
						
						text += '<td>' + htmlEncode(d[i].pfid) + '號</td>';
						text += '</tr>';
						
						$("#te_tab2_list").append(text);
					}
					
					if (d.length > 0 && tempselect2.lselect) {
						var $objTr = $("#" + tempselect2.lselect);
						if ($objTr.length > 0) {
							var objTr = $objTr[0];
							$(".result_list").animate({scrollTop:objTr.offsetTop}, "slow");
							$("#" + tempselect2.lselect).click();
						}
						else {
							$("#" + d[0].sid).click();
							tempselect2.lselect = d[0].sid;
						}
					}
					else if (d.length > 0) {
						$("#" + d[0].sid).click();
						tempselect2.lselect = d[0].sid;
					}
				}
			}
		}
	});
}
//重置選項
function tab2_reset() {
	$("#search_dist").multiselect("clearSelection");
	$("#search_pfid").multiselect("clearSelection");
	
	$("#search_stat").val("-1");
	$("#search_pfsid").val("-1");
	
	$("#search_forest").val("");
	
	fi_tab2_get_protectnumber();
	
	$("#te_tab2_list").empty();
	$("#te_tab2_count").empty();
	$(".fc_detail_data").hide();
	
	tempselect2 = {};
}

function tab3_go_search() {
	var so = $("#search_option").val();
	var sd = $("#search_dist").val();
	
	if (so.length == 0 || sd.length == 0) {
		return;
	}
	
	var post = {};
	
	if (so.length > 0 && so[0] == '-1') {
		post.option = "-1";
	}
	else {
		var st = '';
		for (var i = 0; i < so.length; i++) {
			if (i != 0) st += ',';
			st += so[i];
		}
		post.option = st;
	}
	
	if (sd.length > 0 && sd[0] == '-1') {
		post.manager = "-1";
	}
	else {
		var st = '';
		for (var i = 0; i < sd.length; i++) {
			if (i != 0) st += ',';
			st += sd[i];
		}
		post.manager = st;
	}
	
	WaitingShow(true);
	
	tempselect3.so = so;
	tempselect3.sd = sd;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMOtherDataList",
		type: "Post",
		data: post,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data;
				
				fi_tab3.NowOption = d;
				$("#te_tab3_list").empty();
				$("#te_tab3_list").scrollTop(0);
				
				$("#te_tab3_count").text("共 (" + d.length + ") 筆");
				if (d.length == 0) {
					var text = '<tr>';
					text += '<td>' + '無符合查詢結果' + '</td>';
					text += '</tr>';
					$("#te_tab3_list").append(text);
				}
				else {
					for (var i = 0; i < d.length; i++) {
						var text = '<tr id="' + d[i].sid + '" onclick="tab3_search_list_click(this,\'' + htmlEncode(d[i].typename) + '\');">';
						text += '<td style="width: 122px;">' + htmlEncode(d[i].typename) + '</td>';
						text += '<td>' + htmlEncode(d[i].manager) + '</td>';
						text += '<td>' + htmlEncode(d[i].name) + '</td>';
						text += '</tr>';
						
						$("#te_tab3_list").append(text);
					}
					
					if (d.length > 0 && tempselect3.lselect) {
						var $objTr = $("#" + tempselect3.lselect);
						if ($objTr.length > 0) {
							var objTr = $objTr[0];
							$(".result_list").animate({scrollTop:objTr.offsetTop}, "slow");
							$("#" + tempselect3.lselect).click();
						}
						else {
							$("#" + d[0].sid).click();
							tempselect3.lselect = d[0].sid;
						}
					}
					else if (d.length > 0) {
						$("#" + d[0].sid).click();
						tempselect3.lselect = d[0].sid;
					}
				}
			}
		}
	});
}

//重置選項
function tab3_reset() {
	$("#search_option").multiselect("clearSelection");
	$("#search_dist").multiselect("clearSelection");
	
	$("#te_tab3_list").empty();
	$("#te_tab3_count").empty();
	$(".fc_detail_data").hide();
	
	tempselect3 = {};
}

//結果列表
var fi_tab_click_id = null;
var fi_tab_click_data = null;
function tab1_search_list_click(that) {
	$("#te_tab1_list tr").removeClass("active"); 
	$(that).addClass("active");
	$(".fc_detail_data").show();
	fi_scheduleMapUpdate(fi_tab1);

	var post = {};
	post.Type = "1";
	post.Fmid = that.id;

	fi_tab_click_id = that.id;
	tempselect1.lselect = that.id;

	WaitingShow(true);
	$("#fc_detail_list").empty();
	$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
	Get_FM_Detail("list_detail", "國有林事業區", that.id);

	GetAssociateOptionMapsForForest(fi_tab1, "fi_fc_list1", "fi_fc_list1_item_click", post);
}

function tab2_search_list_click(that) {
	$("#te_tab2_list tr").removeClass("active");
	$(that).addClass("active");
	$(".fc_detail_data").show();
	fi_scheduleMapUpdate(fi_tab2);
	
	var post = {};
	post.Type = "2";
	post.Fmid = that.id;
	
	fi_tab_click_id = that.id;
	tempselect2.lselect = that.id;
	
	WaitingShow(true);
	$("#fc_detail_list").empty();
	$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
	Get_FM_Detail("list_detail", "保安林", that.id);
	
	GetAssociateOptionMaps(fi_tab2, "fi_fc_list1", "fi_fc_list2_item_click", post);
}

function tab3_search_list_click(that, typename) {
	$("#te_tab3_list tr").removeClass("active");
	$(that).addClass("active");
	$(".fc_detail_data").show();
	fi_scheduleMapUpdate(fi_tab3);
	
	var post = {};
	post.Type = "5";
	post.Fmid = that.id;
	
	fi_tab_click_id = that.id;
	tempselect3.lselect = that.id;
	tempselect3.lselecttype = typename;
	
	WaitingShow(true);
	$("#fc_detail_list").empty();
	$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
	Get_FM_Detail("list_detail", "其他圖資", that.id);
	
	GetAssociateOptionMaps(fi_tab3, "fi_fc_list1", "fi_fc_list3_item_click", post);
}

// 取得關聯表格及圖徵
function GetAssociateOptionMaps(targettab, targetlist, targetclick, post) {
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetAssociateOption",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data) {
				var d = data.data;
				
				$("#" + targetlist).empty();
				
				var ylist = fi_tab1.OtherList;
				$("#fc_detail_count").empty();
				$("#fc_detail_count").append("（" + thousandComma(d.length) + " 筆）");
				for (var i = 0; i < d.length; i++) {
					var rows = "";
					
					var isother = false;
					if (ylist && targetclick == 'fi_fc_list1_item_click') {
						for (var j = 0; j < ylist.length; j++) {
							if (d[i].landCode == ylist[j].landCode) {
								isother = true;
								break;
							}
						}
					}
					
					if (isother)
						rows = "<tr class='list_item_isother' id='list_item_" + d[i].fcid + "' onclick='" + targetclick + "(this);'>";
					else if (d[i].hasNew == "")
						rows = "<tr id='list_item_" + d[i].fcid + "' onclick='" + targetclick + "(this);'>";
					else
						rows = "<tr class='list_item_hasNew' id='list_item_" + d[i].fcid + "' onclick='" + targetclick + "(this);'>";
					
					rows += "<td width='4.5%'>" + htmlEncode(d[i].cityName) + "</td>";
					
					if (d[i].townName == "不明") {
						rows += "<td width='4.5%'>" + htmlEncode(d[i].townName) + "</td>";
						rows += "<td width='12%' style='word-break: break-all;'>" + "未登錄段" + "</td>";
					}
					else {
						rows += "<td width='4.5%'>" + htmlEncode(d[i].townName) + "</td>";
						rows += "<td width='12%' style='word-break: break-all;'>" + htmlEncode(d[i].landName) + "</td>";
					}
					
					rows += "<td width='6%'>" + (d[i].pmNo + '-' + d[i].pcNo) + "</td>";
					rows += "<td width='6.5%'>" + d[i].regArea + "</td>";
					rows += "<td width='6.5%'>" + d[i].regDate + "</td>";
					rows += "<td width='6.5%'>" + htmlEncode(d[i].zoningName) + "</td>";
					rows += "<td width='9%'>" + htmlEncode(d[i].lclassName) + "</td>";
					rows += "<td width='4%'>" + htmlEncode(d[i].own) + "</td>";
					rows += "<td width='11%' style='word-break: break-all;'>" + htmlEncode(d[i].manager) + "</td>";
					rows += "<td width='4%'>" + d[i].ratio + "</td>";
					rows += "<td width='11%'>" + d[i].landCode + "</td>";
					rows += "<td width='5%'><button class='btn btn-success' onclick='fi_fc_api(\"" + d[i].unit + "\",\"" + d[i].landNo + "\",\"" + d[i].sec + "\")'>查看</button></td>";
					
					$("#" + targetlist).append(rows);
				}
				optionactive(targetlist);
			}
		}
	});
	targettab.map.geomvector_source.clear();
	targettab.map.geomvector_source1.clear();
	targettab.map.geomvector_source2.clear();
	// 畫自己本身圖徵與查詢結果的圖徵
	var selfstyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: "rgba(235, 0, 0, 0.5)",
		}),
		stroke: new ol.style.Stroke({
			color: "rgba(148, 0, 0, 1)",
			width: 2,
		}),
	});
	var selfmap = null;
	for (var i = 0; i < targettab.NowOption.length; i++) {
		var format = new ol.format.WKT();
		var feature = format.readFeature(targettab.NowOption[i].wkt);
		feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
		feature.ftype = "search";
		feature.sid = targettab.NowOption[i].sid;
		
		if (post.Fmid == feature.sid) {
			feature.setStyle(selfstyle);
			selfmap = feature;
			targettab.map.geomvector_source2.addFeature(feature);
		}
		else {
			targettab.map.geomvector_source1.addFeature(feature);
		}
	}
	if (selfmap) {
		targettab.mainfeature = selfmap;
		targettab.map.getView().fit(selfmap.getGeometry().getExtent(), { maxZoom: 18});
		fi_scheduleMapUpdate(targettab);
	}
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetAssociateOptionMaps",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				var ylist = fi_tab1.OtherList;
				
				if (ylist && targetclick == 'fi_fc_list1_item_click') {
					for (var i = 0; i < ylist.length; i++) {
						ylist[i].mark = 0;
					}
				}
				
				// 畫相關的圖徵
				for (var i = 0; i < d.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(d[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.fcid = d[i].fcid;
					feature.ftype = "asslist";
					
					var isother = false;
					if (ylist && targetclick == 'fi_fc_list1_item_click') {
						for (var j = 0; j < ylist.length; j++) {
							if (d[i].landCode == ylist[j].landCode) {
								ylist[j].mark = 1;
								isother = true;
								break;
							}
						}
					}
					
					if (!isother) {
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
								text: d[i].landNo
							})
						});
						
						feature.setStyle(style);
					}
					else {
						var ystyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: "rgba(235, 255, 0, 0.5)",
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
								text: d[i].landNo
							})
						});
						
						feature.setStyle(ystyle);
					}
					
					targettab.map.geomvector_source.addFeature(feature);
				}
				
				if (ylist && targetclick == 'fi_fc_list1_item_click') {
					for (var i = 0; i < ylist.length; i++) {
						if (ylist[i].mark == 1) continue;
						
						var ystyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: "rgba(235, 255, 0, 0.5)",
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
								text: ylist[i].landNo
							})
						});
						
						var format = new ol.format.WKT();
						var feature = format.readFeature(ylist[i].wkt);
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
						feature.ftype = "other";
						
						feature.setStyle(ystyle);
						
						targettab.map.geomvector_source.addFeature(feature);
					}
				}

				if (targetclick == 'fi_fc_list2_item_click' && tempselect2.aselect) {
					var $objTr = $("#list_item_" + tempselect2.aselect);
					var objTr = $objTr[0];
					$(".main_scroll_mini2").animate({scrollTop:objTr.offsetTop}, "slow");
					$("#list_item_" + tempselect2.aselect).click();
				}
				else if (targetclick == 'fi_fc_list3_item_click' && tempselect3.aselect) {
					var $objTr = $("#list_item_" + tempselect3.aselect);
					var objTr = $objTr[0];
					$(".main_scroll_mini2").animate({scrollTop:objTr.offsetTop}, "slow");
					$("#list_item_" + tempselect3.aselect).click();
				}
			}
		}
	});
}
function GetAssociateOptionMapsForForest(targettab, targetlist, targetclick, post)
{
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetAssociateOptionForForest",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data) {
				var d = data.data;
				
				$("#" + targetlist).empty();
				
				var ylist = fi_tab1.OtherList;
				$("#fc_detail_count").empty();
				$("#fc_detail_count").append("（" + thousandComma(d.length) + " 筆）");
				for (var i = 0; i < d.length; i++) {
					var rows = "";
					
					var isother = false;
					if (ylist && targetclick == 'fi_fc_list1_item_click') {
						for (var j = 0; j < ylist.length; j++) {
							if (d[i].landCode == ylist[j].landCode) {
								isother = true;
								break;
							}
						}
					}
					
					if (isother)
						rows = "<tr class='list_item_isother' id='list_item_" + d[i].fcid + "' onclick='" + targetclick + "(this);'>";
					else if (d[i].hasNew == "")
						rows = "<tr id='list_item_" + d[i].fcid + "' onclick='" + targetclick + "(this);'>";
					else
						rows = "<tr class='list_item_hasNew' id='list_item_" + d[i].fcid + "' onclick='" + targetclick + "(this);'>";
					
					rows += "<td width='4.5%'>" + htmlEncode(d[i].cityName) + "</td>";
					
					if (d[i].townName == "不明") {
						rows += "<td width='4.5%'>" + htmlEncode(d[i].townName) + "</td>";
						rows += "<td width='12%' style='word-break: break-all;'>" + "未登錄段" + "</td>";
					}
					else {
						rows += "<td width='4.5%'>" + htmlEncode(d[i].townName) + "</td>";
						rows += "<td width='12%' style='word-break: break-all;'>" + htmlEncode(d[i].landName) + "</td>";
					}
					
					rows += "<td width='6%'>" + (d[i].pmNo + '-' + d[i].pcNo) + "</td>";
					rows += "<td width='6.5%'>" + d[i].regArea + "</td>";
					rows += "<td width='6.5%'>" + d[i].regDate + "</td>";
					rows += "<td width='6.5%'>" + htmlEncode(d[i].zoningName) + "</td>";
					rows += "<td width='9%'>" + htmlEncode(d[i].lclassName) + "</td>";
					rows += "<td width='4%'>" + htmlEncode(d[i].own) + "</td>";
					rows += "<td width='11%' style='word-break: break-all;'>" + htmlEncode(d[i].manager) + "</td>";
					rows += "<td width='4%'>" + d[i].ratio + "</td>";
					rows += "<td width='11%'>" + d[i].landCode + "</td>";
					rows += "<td width='5%'><button class='btn btn-success' onclick='fi_fc_api(\"" + d[i].unit + "\",\"" + d[i].landNo + "\",\"" + d[i].sec + "\")'>查看</button></td>";
					
					$("#" + targetlist).append(rows);
				}
				optionactive(targetlist);
				
				var ylist = fi_tab1.OtherList;
				if (ylist && targetclick == 'fi_fc_list1_item_click') {
					for (var i = 0; i < ylist.length; i++) {
						ylist[i].mark = 0;
					}
				}
				
				targettab.map.geomvector_source.clear();
				targettab.map.geomvector_source1.clear();
				targettab.map.geomvector_source2.clear();
				
				// 畫自己本身圖徵與查詢結果的圖徵
				var selfstyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(235, 0, 0, 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(148, 0, 0, 1)",
						width: 2,
					}),
				});
				var selfmap = null;
				for (var i = 0; i < targettab.NowOption.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(targettab.NowOption[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.ftype = "search";
					feature.sid = targettab.NowOption[i].sid;
					
					if (post.Fmid == feature.sid) {
						feature.setStyle(selfstyle);
						selfmap = feature;
						targettab.map.geomvector_source2.addFeature(feature);
					}
					else {
						targettab.map.geomvector_source1.addFeature(feature);
					}
				}
				// 畫相關的圖徵
				for (var i = 0; i < d.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(d[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.fcid = d[i].fcid;
					feature.ftype = "asslist";
					
					var isother = false;
					if (ylist && targetclick == 'fi_fc_list1_item_click') {
						for (var j = 0; j < ylist.length; j++) {
							if (d[i].landCode == ylist[j].landCode) {
								ylist[j].mark = 1;
								isother = true;
								break;
							}
						}
					}
					
					if (!isother) {
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
								text: (d[i].pmNo + '-' + d[i].pcNo)
							})
						});
						feature.setStyle(style);
					}
					else {
						var ystyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: "rgba(235, 255, 0, 0.5)",
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
								text: (d[i].pmNo + '-' + d[i].pcNo)
							})
						});
						feature.setStyle(ystyle);
					}
					
					targettab.map.geomvector_source.addFeature(feature);
				}
				
				if (ylist && targetclick == 'fi_fc_list1_item_click') {
					for (var i = 0; i < ylist.length; i++) {
						if (ylist[i].mark == 1) continue;
						
						var ystyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: "rgba(235, 255, 0, 0.5)",
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
								text: ylist[i].landNo
							})
						});
						var format = new ol.format.WKT();
						var feature = format.readFeature(ylist[i].wkt);
						feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
						feature.ftype = "other";
						
						feature.setStyle(ystyle);
						
						targettab.map.geomvector_source.addFeature(feature);
					}
				}
				
				if (selfmap) {
					targettab.mainfeature = selfmap;
					targettab.map.getView().fit(selfmap.getGeometry().getExtent(), { maxZoom: 18});
					fi_scheduleMapUpdate(targettab);
				}
				if (tempselect1.aselect) {
					var $objTr = $("#list_item_" + tempselect1.aselect);
					var objTr = $objTr[0];
					$(".main_scroll_mini2").animate({scrollTop:objTr.offsetTop}, "slow");
					$("#list_item_" + tempselect1.aselect).click();
				}
			}
		}
	});
}

function fi_fc_api(Unit, LandNo, Sec) {
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
							mgmt = tar.MGMT[0];
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

function fi_fc_api2(Unit, LandNo, Sec, mgmt) {
	var post = {};
	
	post.Unit = Unit;
	post.Sec = Sec;
	post.No = LandNo;
		
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
						tmp1 += '<div class="detail_rows_value">' + (od.OWNER.LTYPE ? htmlEncode(fi_tab1_getQueryObligeeType(od.OWNER.LTYPE)) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">權利人</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.OWNER.LNAME ? htmlEncode(od.OWNER.LNAME) : '其他') + '</div>';
						tmp1 += "</div>";

						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">管理機關</div>';
						tmp1 += '<div class="detail_rows_value">' + (mgmt.LNAME ? htmlEncode(mgmt.LNAME) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">管理機關統編</div>';
						tmp1 += '<div class="detail_rows_value">' + (mgmt.LID ? htmlEncode(mgmt.LID) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">登記日期</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.RDATE ? htmlEncode(od.RDATE) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">登記原因</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.REASON ? htmlEncode(fi_tab1_getQueryReason(od.REASON, Unit[0])) : '其他') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">登記原因發生日期</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.REASONDATE ? htmlEncode(od.REASONDATE) : '') + '</div>';
						tmp1 += "</div>";
						
						tmp1 += '<div class="detail_rows">';
						tmp1 += '<div class="detail_rows_name2">權利範圍類別</div>';
						tmp1 += '<div class="detail_rows_value">' + (od.RIGHT ? htmlEncode(fi_tab1_getQueryRights(od.RIGHT)) : '其他') + '</div>';
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
						tmp1 += '<div class="detail_rows_value">' + (od.REASON ? htmlEncode(fi_tab1_getQueryReason(od.REASON, Unit[0])) : '其他') + '</div>';
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

function fi_fc_owner_close() {
	$("#ownerdata").modal('hide');
}

// 點擊table事件
function fi_fc_list1_item_click(that) {
	var starid = that.id.split("_");
	var fcid = starid[starid.length - 1];
	
	var features = fi_tab1.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].fcid == fcid) {
			feature = features[i];
			break;
		}
	}
	
	tempselect1.aselect = fcid;
	
	if (feature) {
		fi_tab1.SelectSingleClick.getFeatures().clear();
		fi_tab1.SelectSingleClick.getFeatures().push(feature);
		fi_tab1.map.getView().fit(feature.getGeometry().getExtent(), { maxZoom: 18});
		fi_scheduleMapUpdate(fi_tab1);
	}
}
function fi_fc_list2_item_click(that) {
	var starid = that.id.split("_");
	var fcid = starid[starid.length - 1];
	
	var features = fi_tab2.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].fcid == fcid) {
			feature = features[i];
			break;
		}
	}
	
	tempselect2.aselect = fcid;
	
	if (feature) {
		fi_tab2.SelectSingleClick.getFeatures().clear();
		fi_tab2.SelectSingleClick.getFeatures().push(feature);
		fi_tab2.map.getView().fit(feature.getGeometry().getExtent(), { maxZoom: 18});
		fi_scheduleMapUpdate(fi_tab2);
	}
}
function fi_fc_list3_item_click(that) {
	var starid = that.id.split("_");
	var fcid = starid[starid.length - 1];
	
	var features = fi_tab3.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].fcid == fcid) {
			feature = features[i];
			break;
		}
	}
	
	tempselect3.aselect = fcid;
	
	if (feature) {
		fi_tab3.SelectSingleClick.getFeatures().clear();
		fi_tab3.SelectSingleClick.getFeatures().push(feature);
		fi_tab3.map.getView().fit(feature.getGeometry().getExtent(), { maxZoom: 18});
		fi_scheduleMapUpdate(fi_tab3);
	}
}
// 點擊feature事件
function fi_fc_feature_click(e, targettab, type) {
	$("#fi_fc_list1 tr").removeClass("active");
	if (e.selected.length == 1 && e.selected[0].ftype == "asslist" && e.selected[0].fcid) {
		var $objTr = $("#list_item_" + e.selected[0].fcid);
		$objTr.addClass("active");
		var objTr = $objTr[0];
		$(".main_scroll_mini2").animate({scrollTop:objTr.offsetTop}, "slow");
		
		if (type == "tab1")
			tempselect1.aselect = e.selected[0].fcid;
		else if (type == "tab2")
			tempselect2.aselect = e.selected[0].fcid;
		else if (type == "tab3")
			tempselect3.aselect = e.selected[0].fcid;
	}
	else if (e.selected.length == 1 && e.selected[0].ftype == "search" && e.selected[0].sid) {
		var $objTr = $("#" + e.selected[0].sid);
		var objTr = $objTr[0];
		$(".result_list").animate({ scrollTop: objTr.offsetTop }, "slow");
		setTimeout(function() {
			$("#" + e.selected[0].sid).click();
		}, 500);
	}
}
// 取得Detail
function Get_FM_Detail(target, typeid, fmid) {
	var post = {};
	post.id = fmid;
	post.type = typeid;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetFMDetailData",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				$("#" + target).empty();
				
				var d = data.data;
				fi_tab_click_data = d;
				fi_tab_click_data.typeid = typeid;
				
				//資料分成國有林事業區及保安林
				if (typeid === "國有林事業區") {
					var DIST = d.distName;
					var WKNG = d.weildName;
					var CMPT = d.cmpt;
					var AREA_HA = d.area_ha;
					var EDITION = d.edition;
					var UPDATETIME = d.updateTime;
					var YEAR = d.year;
					let detail;
					
					detail = 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>管理單位</div>"+
					"<div class='detail_rows_value'>"+ htmlEncode(DIST) +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>事業區</div>"+
					"<div class='detail_rows_value'>"+ htmlEncode(WKNG) +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>林班號</div>"+
					"<div class='detail_rows_value'>"+ htmlEncode(CMPT) +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>面積(公頃)</div>"+
					"<div class='detail_rows_value'><input id='AREA_HA' value='"+ areaha_abs(AREA_HA) +"' readonly style='width:100%;' /></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>修訂資訊</div>"+
					"<div class='detail_rows_value'><textarea id='EDITION' rows='3' readonly>"+ htmlEncode(EDITION) +"</textarea></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>最後更新</div>"+
					"<div class='detail_rows_value'>"+ htmlEncode(UPDATETIME) +"</div>"+
					"</div>";
					
					$("#" + target).append(detail);
								
					$("#fi_year").empty();
					$("#fi_year").append(YEAR);
				}
				else if (typeid === "保安林") {
					var DIST = d.distName;
					var PF_ID = d.pfid;
					var PFTYPE = d.pfName;
					var AREA_HA = d.area_ha;
					var EDITION = d.edition;
					var UPDATETIME = d.updateTime;
					var FOREST = d.forest;
					var YEAR = d.year;
					let detail;
					
					detail = 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>管理單位</div>"+
					"<div class='detail_rows_value'>" + htmlEncode(DIST) + "</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>保安林編號</div>"+
					"<div class='detail_rows_value'>"+ htmlEncode(PF_ID) +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>檢訂年度</div>"+
					"<div class='detail_rows_value'>"+ htmlEncode(YEAR) +"</div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>保安林類型</div>"+
					"<div class='detail_rows_value'><span class='fi_value_show'>" + htmlEncode(PFTYPE) + "</span><select id='edit_pfid' class='form-select fi_edit_show' multiple></select></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>保安林名稱</div>"+
					"<div class='detail_rows_value'><input id='edit_forest' class='form-control' style='width: 100%;' value='" + htmlEncode(FOREST) + "' readonly /></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>面積(公頃)</div>"+
					"<div class='detail_rows_value'><input id='AREA_HA' class='form-control' style='width: 100%;' value='"+ areaha_abs(AREA_HA) +"' readonly /></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>修訂資訊</div>"+
					"<div class='detail_rows_value'><textarea id='EDITION' rows='3' readonly>"+ htmlEncode(EDITION) +"</textarea></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>最後更新</div>"+
					"<div class='detail_rows_value'>"+ htmlEncode(UPDATETIME) +"</div>"+
					"</div>";
					
					$("#" + target).append(detail);
					var d2 = fi_tab2.pfidData;
					for (var i = 0; i < d2.length; i++) {
						$("#edit_pfid").append('<option value="' + d2[i].pid + '">' + d2[i].pfTypeName + '</option>');
					}
					
					var d3 = d.pid.split(',');
					for (var i = 0; i < d3.length; i++) {
						if (d3[i] != '') {
							$("#edit_pfid").find("option[value=" + d3[i] + "]").prop("selected", "selected");
						}
					}
					
					$("#fi_year").empty();
					$("#fi_year").append(YEAR + '年');
				}
				else if (typeid === "其他圖資") {
					var manager = d.manager;
					var name = d.name;
					var sub_name = d.sub_name;
					var area_ha = d.area_ha;
					var note = d.note;
					var edtion = d.edtion;
					var announce = formatDateTime_Date(d.announce);
					var date = formatDateTime_Date(d.date);
					var YEAR = d.year;
					var MONTH = d.month;
					let detail;
					
					detail = 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>管理單位</div>"+
					"<div class='detail_rows_value'><input id='MANAGER' value='"+ htmlEncode(manager) +"' readonly /></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>名稱</div>"+
					"<div class='detail_rows_value'><input id='NAME' value='"+ htmlEncode(name) +"' readonly /></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>次要名稱</div>"+
					"<div class='detail_rows_value'><input id='SUB_NAME' value='"+ htmlEncode(sub_name) +"' readonly /></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>公頃面積</div>"+
					"<div class='detail_rows_value'><input id='AREA_HA' value='"+ areaha_abs(area_ha) +"' readonly /></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>備註事項</div>"+
					"<div class='detail_rows_value'><textarea id='NOTE' rows='3' readonly>" + htmlEncode(note) + "</textarea></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>修訂資訊</div>"+
					"<div class='detail_rows_value'><textarea id='EDITION' rows='3' readonly>"+ htmlEncode(edtion) +"</textarea></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>公布日期</div>"+
					"<div class='detail_rows_value'><input id='ANNOUNCE' value='"+ htmlEncode(announce) +"' readonly /></div>"+
					"</div>";
					
					detail += 
					"<div class='detail_rows'>"+
					"<div class='detail_rows_name'>日期</div>"+
					"<div class='detail_rows_value'><input id='DATE' value='"+ date +"' readonly /></div>"
					"</div>";
					
					$("#" + target).append(detail);
					
					$("#fi_year").empty();
					$("#fi_year").append(YEAR + "年" + MONTH + "月");
				}
			}
		}
	});
}

function fi_tabl_download() //匯出事業區
{	
	var check = CheckUserAccess("圖資查詢", "國有林事業區", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	var feature = fi_tab1.mainfeature;
	feature.getGeometry().transform("EPSG:3857", "EPSG:3826");
	var format = new ol.format.WKT();
	var wkts = [];
	var wkt = format.writeFeature(feature, {
		dataProjection: "EPSG:3826",
		featureProjection: "EPSG:3826"
	});
	
	wkts.push(wkt);
	feature.getGeometry().transform("EPSG:3826", "EPSG:3857");
	
	if (wkts.length > 0) {
		var dd = fi_tab1.NowOption;
		var st;
		for (var i = 0; i < dd.length; i++) {
			if (fi_tab_click_id == dd[i].sid) {
				st = dd[i].weildName + dd[i].cmpt + "林班";
			}
		}
		
		var post = {};
		post.Sid = fi_tab_click_id;
		post.ShpName = st;
		post.Wkts = wkts;
		post.FileName = "林班範圍";
		post.ForestDetail = fi_tab_click_data;
		
		$.ajax({
			url: ApiRequestURL + "InfoOverView/DownloadQueryShp",
			type: "Post",
			data: post,
			success: function(data) {
				if (data.data) {
					AddNewDownloadLog("圖資查詢", "國有林事業區", "zip");
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

function fi_tab1_downloadfnwg() //匯出事業區街廓
{
	var check = CheckUserAccess("圖資查詢", "國有林事業區", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	var dd = fi_tab1.NowOption;
	var st;
	var wkng;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			st = dd[i].weildName + "事業區";
			wkng = dd[i].wkng;
			break;
		}
	}
	var post = {};
	post.Sid = "1";
	post.ShpName = st;
	post.FileName = "事業區範圍";
	post.Wkng = wkng;
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetMergeAssociateLandMaps",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data && data.data != "") {
				AddNewDownloadLog("圖資查詢", "國有林事業區", "zip");
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
			}
		}
	});
}

function fi_tab1_downloaddist() { //匯出分署
	var check = CheckUserAccess("圖資查詢", "國有林事業區", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	var dd = fi_tab1.NowOption;
	var st;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			st = dd[i].distName;
			break;
		}
	}
	
	var post = {};
	post.Dist = fi_tab_click_data.dist;
	post.ShpName = st;
	post.FileName = "分署事業區範圍";
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistLandMaps",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data && data.data != "") {
				AddNewDownloadLog("圖資查詢", "國有林事業區", "zip");
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
			}
		}
	});
}

function fi_tab2_download() //匯出保安林
{	
	var check = CheckUserAccess("圖資查詢", "保安林", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	var feature = fi_tab2.mainfeature;
	feature.getGeometry().transform("EPSG:3857", "EPSG:3826");
	var format = new ol.format.WKT();
	var wkts = [];
	var wkt = format.writeFeature(feature, {
		dataProjection: "EPSG:3826",
		featureProjection: "EPSG:3826"
	});
	wkts.push(wkt);
	feature.getGeometry().transform("EPSG:3826", "EPSG:3857");
	
	if (wkts.length > 0) {
		var post = {};
		var dd = fi_tab2.NowOption;
		var st;
		for (var i = 0; i < dd.length; i++) {
			if (fi_tab_click_id == dd[i].sid) {
				st = dd[i].pfid + "號保安林";
			}
		}
		
		post.Sid = fi_tab_click_id;
		post.ShpName = st;
		post.Wkts = wkts;
		post.FileName = "保安林範圍";
		post.ProtectionDetail = fi_tab_click_data;
		
		WaitingShow(true);
		$.ajax({
			url: ApiRequestURL + "InfoOverView/DownloadQueryShp",
			type: "Post",
			data: post,
			success: function(data) {
				setTimeout(function() {
					WaitingShow(false);
				}, 200);
				if (data.data) {
					AddNewDownloadLog("圖資查詢", "保安林", "zip");
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

function fi_tab2_downloaddist() { //匯出分署
	var check = CheckUserAccess("圖資查詢", "保安林", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	var dd = fi_tab2.NowOption;
	var st;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			st = dd[i].distName;
			break;
		}
	}
	
	var post = {};
	post.Dist = fi_tab_click_data.dist;
	post.ShpName = st;
	post.FileName = "分署保安林範圍";
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistProtectMaps",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data && data.data != "") {
				AddNewDownloadLog("圖資查詢", "保安林", "zip");
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
			}
		}
	});
}

function fi_tab3_download() //匯出其他圖資
{	
	var check = CheckUserAccess("圖資查詢", "其他圖資", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	var feature = fi_tab3.mainfeature;
	feature.getGeometry().transform("EPSG:3857", "EPSG:3826");
	var format = new ol.format.WKT();
	var wkts = [];
	var wkt = format.writeFeature(feature, {
		dataProjection: "EPSG:3826",
		featureProjection: "EPSG:3826"
	});
	wkts.push(wkt);
	feature.getGeometry().transform("EPSG:3826", "EPSG:3857");
	
	if (wkts.length > 0) {
		var post = {};
		
		var dd = fi_tab3.NowOption;
		for (var i = 0; i < dd.length; i++) {
			if (fi_tab_click_id == dd[i].sid) {
				post.ShpName = dd[i].name;
				post.FileName = dd[i].typename;
			}
		}
		
		post.Sid = fi_tab_click_id;
		post.Wkts = wkts;
		post.OtherDetail = fi_tab_click_data;
		
		WaitingShow(true);
		$.ajax({
			url: ApiRequestURL + "InfoOverView/DownloadQueryShp",
			type: "Post",
			data: post,
			success: function(data) {
				setTimeout(function() {
					WaitingShow(false);
				}, 200);
				if (data.data) {
					AddNewDownloadLog("圖資查詢", "其他圖資", "zip");
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

function fi_tab3_downloadall() { //匯出全部其他圖資
	var check = CheckUserAccess("圖資查詢", "其他圖資", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	var post = {};
	post.Type = tempselect3.lselecttype;
	post.ShpName = tempselect3.lselecttype;
	post.FileName = tempselect3.lselecttype;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistOtherMapsAll",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data && data.data != "") {
				AddNewDownloadLog("圖資查詢", "其他圖資", "zip");
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
			}
		}
	});
}

function fi_tabl_downloadAssMaps(type) //匯出關聯地集
{	
	var check = CheckUserAccess("圖資查詢", "國有林事業區", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	var dd = fi_tab1.NowOption;
	var st;
	var ddt;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			if (type == "fmid")
				st = dd[i].weildName + dd[i].cmpt + "林班";
			else if (type == "wkng")
				st = dd[i].wkng + "事業區";
			else if (type == "dist")
				st = dd[i].distName + "事業區";
			
			ddt = dd[i];
		}
	}
	
	var post = {};
	post.Find = type;
	post.ShpName = st + "範圍地籍";
	post.FileName = "林班地籍";
	post.Type = "1";
	
	if (type == 'fmid')
		post.Fmid = fi_tab_click_id;
	else if (type == 'wkng')
		post.Fmid = ddt.wkng;
	else if (type == 'dist')
		post.Fmid = ddt.distName;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/DownloadAssociateOptionMapsForForest",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data) {
				AddNewDownloadLog("圖資查詢", "國有林事業區", "zip");
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
				// document.remove(a);
				$("#fitab1dropdowntrig2").click();
			}
		}
	});
}

function fi_tabl_downloadAssCsv(type) //匯出關聯地集CSV
{
	var dd = fi_tab1.NowOption;
	var st;
	var ddt;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			if (type == "fmid")
				st = dd[i].weildName + dd[i].cmpt + "林班";
			else if (type == "wkng")
				st = dd[i].wkng + "事業區";
			else if (type == "dist")
				st = dd[i].distName + "事業區";
			
			ddt = dd[i];
		}
	}
	
	WaitingShow(true);
	
	var data = new FormData();
	data.append('Find', type);
	data.append('Type', "1");
	
	if (type == 'fmid')
		data.append('fmid', fi_tab_click_id);
	else if (type == 'wkng')
		data.append('fmid', ddt.wkng);
	else if (type == 'dist')
		data.append('fmid', ddt.distName);
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "ProjectManagement/DownloadAssociateOptionCSVForForest", true);
	request.responseType = 'blob';
	
	request.onload = function(e) {
		setTimeout(function() {
			WaitingShow(false);
		}, 200);
		if (this.status === 200) {
			var blob = this.response;
			if(window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, st + "範圍地籍.csv");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = st + "範圍地籍.csv";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
		   $("#fitab1dropdowntrig").click();
       }
   };
   
   request.send(data);
}

function fi_tab2_downloadAssMaps(type) //匯出關聯地集
{	
	var check = CheckUserAccess("圖資查詢", "保安林", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	var dd = fi_tab2.NowOption;
	var st;
	var ddt;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			if (type == 'fmid')
				st = dd[i].pfid + "號保安林";
			else if (type == 'dist')
				st = dd[i].distName + "保安林";
			
			ddt = dd[i];
		}
	}
	
	var post = {};
	post.Find = type;
	post.ShpName = st + "範圍地籍";
	post.FileName = "保安林地籍";
	post.Type = "2";
	
	if (type == 'fmid')
		post.Fmid = fi_tab_click_id;
	else if (type == 'dist')
		post.Fmid = ddt.distName;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "InfoOverView/DownloadAssociateOptionMaps",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data) {
				AddNewDownloadLog("圖資查詢", "保安林", "zip");
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
				// document.remove(a);
				$("#fitab1dropdowntrig2").click();
			}
		}
	});
}

function fi_tab2_downloadAssCsv(type)
{
	var dd = fi_tab2.NowOption;
	var st;
	var ddt;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			if (type == "fmid")
				st = dd[i].pfid + "號保安林";
			else if (type == "dist")
				st = dd[i].distName + "保安林";
			
			ddt = dd[i];
		}
	}
	
	WaitingShow(true);
	
	var data = new FormData();
	data.append('Find', type);
	data.append('Type', "2");
	
	if (type == 'fmid')
		data.append('fmid', fi_tab_click_id);
	else if (type == 'dist')
		data.append('fmid', ddt.distName);
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "ProjectManagement/DownloadAssociateOptionCSV", true);
	request.responseType = 'blob';
	
	request.onload = function(e) {
		setTimeout(function() {
			WaitingShow(false);
		}, 200);
		if (this.status === 200) {
			var blob = this.response;
			if(window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, st + "範圍地籍.csv");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = st + "範圍地籍.csv";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
		   $("#fitab1dropdowntrig").click();
       }
   };
   
   request.send(data);
}

function fi_tab3_downloadAssMaps(type) //匯出關聯地集
{	
	var check = CheckUserAccess("圖資查詢", "其他圖資", "資料下載");
	if (!check) {
		alert('您沒有權限使用.')
		return;
	}
	
	var post = {};
	
	var dd = fi_tab3.NowOption;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			if (type == 'fmid') {
				post.ShpName = dd[i].name + "範圍地籍";
				post.FileName = dd[i].name + "地籍";
			}
			else if (type == 'allrange') {
				post.ShpName = dd[i].typename + "範圍地籍";
				post.FileName = dd[i].typename + "地籍";
			}
		}
	}
	
	post.Find = type;
	post.Type = "5";
	
	if (type == 'fmid')
		post.Fmid = fi_tab_click_id;
	else if (type == 'allrange')
		post.Fmid = fi_tab_click_id;
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "InfoOverView/DownloadAssociateOptionMaps",
		type: "Post",
		data: post,
		success: function(data) {
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
			if (data.data) {
				AddNewDownloadLog("圖資查詢", "其他圖資", "zip");
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
				// document.remove(a);
				$("#fitab1dropdowntrig2").click();
			}
		}
	});
}

function fi_tab3_downloadAssCsv(type)
{
	var st = '';
	var dd = fi_tab3.NowOption;
	for (var i = 0; i < dd.length; i++) {
		if (fi_tab_click_id == dd[i].sid) {
			if (type == 'fmid')
				st = dd[i].name + "地籍";
			else if (type == 'allrange')
				st = dd[i].typename + "地籍";
		}
	}
	
	WaitingShow(true);
	
	var data = new FormData();
	data.append('Find', type);
	data.append('Type', "5");
	
	if (type == 'fmid')
		data.append('fmid', fi_tab_click_id);
	else if (type == 'allrange')
		data.append('fmid', fi_tab_click_id);
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "ProjectManagement/DownloadAssociateOptionCSV", true);
	request.responseType = 'blob';
	
	request.onload = function(e) {
		setTimeout(function() {
			WaitingShow(false);
		}, 200);
		if (this.status === 200) {
			var blob = this.response;
			if(window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, st + ".csv");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = st + ".csv";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
		   $("#fitab1dropdowntrig").click();
       }
   };
   
   request.send(data);
}

function fi_fc_change_check(landCode) {
	var post = {};
	post.LandCode = landCode;
	
	$.ajax({
		url: ApiRequestURL + "ChangeEvent/GetChangeData",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				//識別碼
				$("#te_data_basic_uid").text(d.uid);
				//建立者
				$("#te_data_basic_createuser").text(d.createUser);
				//建立時間
				$("#te_data_basic_createtime").text(d.createTime);
				//所屬單位	
				$("#te_data_basic_deptart").text(d.dep);
				
				//案由
				$("#te_data_basic_title").text(d.title);
				
				if (d.changeType == "1") {
					var changestr = "森林法第8條撥用";
					
					if (d.changeTypeSub == "1") {
						changestr += "-公共設施";
					}
					else if (d.changeTypeSub == "2") {
						changestr += "-國防";
					}
					else if (d.changeTypeSub == "3") {
						changestr += "-交通";
					}
					else if (d.changeTypeSub == "4") {
						changestr += "-水利";
					}
					else if (d.changeTypeSub == "5") {
						changestr += "-公用事業";
					}
					else if (d.changeTypeSub == "6") {
						changestr += "-國家公園";
					}
					else if (d.changeTypeSub == "7") {
						changestr += "-風景特定區";
					}
					
					$("#te_data_basic_changetype").text(changestr);
				}
				else if (d.changeType == "2")
					$("#te_data_basic_changetype").text("增劃編原住民保留地");
				else if (d.changeType == "3")
					$("#te_data_basic_changetype").text("專案計畫移出");
				else if (d.changeType == "4")
					$("#te_data_basic_changetype").text("事業區地籍釐整");
				
				//附件列表
				var files = d.files;
				$("#file_list").empty();
				for (i = 0 ; i < files.length; i++) {
					var item =
					"<div class='file_list_item'>"+
					"<a href='" + DownLoadURL + files[i].savename + "'><i class='fas fa-file-alt'></i>" + files[i].filename + "</a>" +
					"<button type='button' class='btn btn-danger file_list_item_delete' onclick=\"PushDFile('" + files[i].fileId + "', this)\">刪除</button>" +
					"</div>";
					
					$("#file_list").append(item);	
				}
				
				$("#changedata").modal("show");
			}
		}
	});
}
function fi_tab2_changedata_close() {
	$("#changedata").modal("hide");
}
function fi_tab1_getApiCode() {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetQueryReason",
		type: "Post",
		success: function(data) {
			var jdata = JSON.parse(data);
			if (jdata.STATUS == 1) {
				var d = jdata.RESPONSE;

				fi_tab1.QueryReason = d;
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

				fi_tab1.QueryObligeeType = d;
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

				fi_tab1.QueryRights = d;
			}
		}
	});
}

function fi_tab1_getQueryReason(code, city) {
	var result = '';
	var data = fi_tab1.QueryReason;

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

function fi_tab1_getQueryObligeeType(code) {
	var result = '';
	var data = fi_tab1.QueryObligeeType;

	if (!data) return result;

	for (var i = 0; i < data.length; i++) {
		if (data[i].CODE == code) {
			result = data[i].NAME;
			break;
		}
	}

	return result;
}

function fi_tab1_getQueryRights(code) {
	var result = '';
	var data = fi_tab1.QueryRights;

	if (!data) return result;

	for (var i = 0; i < data.length; i++) {
		if (data[i].CODE == code) {
			result = data[i].NAME;
			break;
		}
	}

	return result;
}
var fi_tab5 = {};
fi_tab5.map = null;
fi_tab5.SelectSingleClick = null;
fi_tab5.AssClick = true;
function fi_tab5_init() {
	fi_tab5.map = map('mmap', true, false, true);
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
			if (fi_tab5.mainfeature && fi_tab5.mainfeature == e) {
				fi_tab5.mainfeature = null;
				return false;
			}
			else if (fi_tab5.AssClick == false && e.type == 'AssFeature') {
				return false;
			}
			fi_tab5.mainfeature = e;
			return true;
		}
	});
	SelectSingleClick.on("select", fi_tab5_feature_click);
	fi_tab5.map.addInteraction(SelectSingleClick);
	fi_tab5.SelectSingleClick = SelectSingleClick;
	
	fi_tab5_ass_click();
	
	// 處理Legend
	var target = $("#maplegend");
	var legend1 = "<div style='width: 200px;'>";
	
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend1'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>選取區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"self_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab5_layer_change_opacity('self');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend2'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>列表區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"noself_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab5_layer_change_opacity();\" /></div>";
	legend1 += "</div>";
	legend1 += "</div>";
	
	target.append(legend1);
}

function fi_tab5_layer_change_opacity(type) {
	if (type == 'self') {
		var val = $('#self_opacity').val() / 100;
		fi_tab5.map.geomvector_layer1.setOpacity(val);
	}
	else {
		var val = $('#noself_opacity').val() / 100;
		fi_tab5.map.geomvector_layer.setOpacity(val);
	}
}

function tab5_go_search() {
	var formdata = new FormData();
	
	var filelist = $('#upload_xls').prop('files');
	$.each(filelist, function(j, file) {
		formdata.append('files', file);
	});
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/QueryLandListFromFile",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data.dlist;
				$("#fi_tab5_list").empty();
				$("#fi_tab5_list").scrollTop(0);
				
				fi_tab5.selfdata = d;
				$("#fi_tab5_count").text("共 (" + d.length + ") 筆");
				
				if (d.length == 0) {
					var text = '<tr>';
					text += '<td>' + '無符合查詢結果' + '</td>';
					text += '</tr>';
					
					$("#fi_tab5_list").append(text);
				}
				else {
					for (var i = 0; i < d.length; i++) {
						var text = '<tr id="' + d[i].sid + '" onclick="fi_tab5_list_searchlistClick(this);">';
						text += '<td>' + htmlEncode(d[i].townName) + '</td>';
						text += '<td>' + htmlEncode(d[i].landName) + '</td>';
						text += '<td>' + htmlEncode(d[i].pm_pc) + '</td>';
						text += '</tr>';
						$("#fi_tab5_list").append(text);
					}
					
					$("#" + d[0].sid).click();
				}
				$("#fi_diff_body").empty();
				$("#fi_diff_body").scrollTop(0);
				var d2 = data.data.ulist;
				if (d2.length == 0) {
					var text = '<tr>';
					text += '<td>' + '無符合查詢結果' + '</td>';
					text += '</tr>';
					
					$("#fi_diff_body").append(text);
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
						$("#fi_diff_body").append(text);
					}
				}
				$("#diff_currect").empty();
				$("#diff_error").empty();
				
				$("#diff_currect").append(data.data.correctCount + "筆");
				$("#diff_error").append(data.data.errorCount + "筆");
			}
		}
	});
}
var fi_tab5_nowSelect = null;
function fi_tab5_list_searchlistClick(that) {
	$("#fi_tab5_list tr").removeClass("active");
	$(that).addClass("active");
	
	$(".fi_tab_frame.fi_tab, .fi_tab_frame.fi_tab_content").removeClass("active");
	
	// $("#fi_tab5_list").click();
	
	var id = that.id;
	fi_tab5_nowSelect = id;
	
	var post = {};
	post.Sid = id;
	
	WaitingShow(true);
	
	fi_tab5.map.geomvector_source.clear();
	fi_tab5.map.geomvector_source1.clear();
	fi_tab5.map.geomvector_source2.clear();
	// 畫自己本身圖徵
	var basemap = fi_tab5.selfdata;
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
			fi_tab5.map.geomvector_source1.addFeature(feature);
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
			fi_tab5.map.geomvector_source.addFeature(feature);
		}
	}
	
	if (selftmap) {
		fi_tab5.mainfeature = selftmap;
		fi_tab5.map.getView().fit(selftmap.getGeometry().getExtent(), { maxZoom: 18});
		fi_scheduleMapUpdate(fi_tab5);
	}
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/QueryTargetLand",
		type: "Post",
		data: post,
		success: function(data) {
			WaitingShow(false);
			if (data.data) {
				var d = data.data;
				
				$(".fc_detail_data").show();
				fi_scheduleMapUpdate(fi_tab5);
				
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
				
				fi_tab5.basedata = basedata;
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">地籍編碼</div>';
				text += '<div class="detail_rows_value">' + basedata.landCode + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">縣市鄉鎮</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(basedata.county + basedata.town) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">事務所</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(basedata.unit + '(' + basedata.unitCode + ')') + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">地段</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(that.childNodes[1].innerText) + '</div>';
				text += '</div>';
				
				fi_tab5.basedata.landname = htmlEncode(that.childNodes[1].innerText);
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">地號</div>';
				text += '<div class="detail_rows_value">' + htmlEncode(that.childNodes[2].innerText) + '</div>';
				text += '</div>';
				
				fi_tab5.basedata.landnodash = htmlEncode(that.childNodes[2].innerText);
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">登記面積</div>';
				text += '<div class="detail_rows_value">' + areaha_abs(basedata.area_ha) + '</div>';
				text += '</div>';
				
				text += '<div class="detail_rows">';
				text += '<div class="detail_rows_name">登記日期</div>';
				text += '<div class="detail_rows_value">' + basedata.regDate + '</div>';
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
				text += '<div class="detail_rows_value">' + basedata.ver + '</div>';
				text += '</div>';
				
				$("#fc_main_data").empty();
				$("#fc_main_data").append(text);
				
				var ownerdata = d.ownerData;
				
				fi_tab5.ownerdata = ownerdata;
				
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
						tmp += '<tr id="list_item_' + forestdata[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + forestdata[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					
					tmp += '<td><input id="listlayer_check_' + forestdata[i].sid + '" type="checkbox" class="form-check-input" onchange="fi_tab5_layer_show_click(this,\'' + forestdata[i].sid + '\');" checked /></td>';
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
					
					if (fi_tab5.AssClick)
					{
						feature.setStyle(forestStyle);
						feature.set("savedStyle", forestStyle);
					}
					else
					{
						feature.set("savedStyle", forestStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fi_tab5.map.geomvector_source2.addFeature(feature);
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
						tmp += '<tr id="list_item_' + protectiondata[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + protectiondata[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					
					tmp += '<td><input id="listlayer_check_' + protectiondata[i].sid + '" type="checkbox" class="form-check-input" onchange="fi_tab5_layer_show_click(this,\'' + protectiondata[i].sid + '\');" checked /></td>';
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
					
					if (fi_tab5.AssClick)
					{
						feature.setStyle(protectionStyle);
						feature.set("savedStyle", protectionStyle);
					}
					else
					{
						feature.set("savedStyle", protectionStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fi_tab5.map.geomvector_source2.addFeature(feature);
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
						tmp += '<tr id="list_item_' + recreationData[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + recreationData[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					
					tmp += '<td><input id="listlayer_check_' + recreationData[i].sid + '" type="checkbox" class="form-check-input" onchange="fi_tab5_layer_show_click(this,\'' + recreationData[i].sid + '\');" checked /></td>';
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
					
					if (fi_tab5.AssClick)
					{
						feature.set("savedStyle", recreationStyle);
						feature.setStyle(recreationStyle);
					}
					else
					{
						feature.set("savedStyle", recreationStyle);
						feature.setStyle(new ol.style.Style(null));
					}

					fi_tab5.map.geomvector_source2.addFeature(feature);
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
						tmp += '<tr id="list_item_' + researchData[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + researchData[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					
					tmp += '<td><input id="listlayer_check_' + researchData[i].sid + '" type="checkbox" class="form-check-input" onchange="fi_tab5_layer_show_click(this,\'' + researchData[i].sid + '\');" checked /></td>';
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
					
					if (fi_tab5.AssClick)
					{
						feature.set("savedStyle", researchStyle);
						feature.setStyle(researchStyle);
					}
					else
					{
						feature.set("savedStyle", researchStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fi_tab5.map.geomvector_source2.addFeature(feature);
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
						tmp += '<tr id="list_item_' + greenMeshBelt[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + greenMeshBelt[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					
					tmp += '<td style="width:35px;"><input id="listlayer_check_' + greenMeshBelt[i].sid + '" type="checkbox" class="form-check-input" onchange="fi_tab5_layer_show_click(this,\'' + greenMeshBelt[i].sid + '\');" checked /></td>';
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
					
					if (fi_tab5.AssClick)
					{
						feature.set("savedStyle", greenMeshStyle);
						feature.setStyle(greenMeshStyle);
					}
					else
					{
						feature.set("savedStyle", greenMeshStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fi_tab5.map.geomvector_source2.addFeature(feature);
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
						tmp += '<tr id="list_item_' + greenNetworkFocus[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					else
						tmp += '<tr class="list_item_hasNew" id="list_item_' + greenNetworkFocus[i].sid + '" onclick="fi_tab5_item_click(this, event);">';
					
					tmp += '<td style="width:35px;"><input id="listlayer_check_' + greenNetworkFocus[i].sid + '" type="checkbox" class="form-check-input" onchange="fi_tab5_layer_show_click(this,\'' + greenNetworkFocus[i].sid + '\');" checked /></td>';
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
					
					if (fi_tab5.AssClick)
					{
						feature.set("savedStyle", greenNetworkStyle);
						feature.setStyle(greenNetworkStyle);
					}
					else
					{
						feature.set("savedStyle", greenNetworkStyle);
						feature.setStyle(new ol.style.Style(null));
					}
					
					fi_tab5.map.geomvector_source2.addFeature(feature);
				}
			}
			fc_tab5_getFcNotification();
		}
	});
}

function fi_tab5_AssSwitch(that) {
	var fs = fi_tab5.map.geomvector_source2.getFeatures();
	if (fi_tab5.AssClick) {
		fi_tab5.AssClick = false;
		$(".fc_tab1_associate tr").removeClass("active");
	}
	else {
		fi_tab5.AssClick = true;
	}
	for (var i = 0; i < fs.length; i++) {
		if (fs[i].type != "AssFeature") continue;
		var ischeck = false;
		var tt = $('#listlayer_check_' + fs[i].sid);
		if (tt.length > 0)
			ischeck = $('#listlayer_check_' + fs[i].sid)[0].checked;
		
		if (fi_tab5.AssClick && ischeck) {
			var featureSavedStyle = fs[i].get("savedStyle");
			fs[i].setStyle(featureSavedStyle);
		}
		else {
			// fs[i].set("savedStyle", fs[i].getStyle());
			fs[i].setStyle(new ol.style.Style(null));
		}
	}
}

function fi_tab5_owner_close() {
	$("#ownerdata").modal('hide');
}

function fi_tab5_feature_click(e) {
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

function fi_tab5_item_click(that, e) {
	if (e.target.type == 'checkbox' || !fi_tab5.AssClick) return;
	
	var starid = that.id.split("_");
	var sid = starid[starid.length - 1];
	
	var ischeck = false;
	var tt = $('#listlayer_check_' + sid);
	if (tt.length > 0)
		ischeck = $('#listlayer_check_' + sid)[0].checked;
	
	if (!ischeck) return;

	var features = fi_tab5.map.geomvector_source2.getFeatures();
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
		fi_tab5.mainfeature = feature;
		fi_tab5.SelectSingleClick.getFeatures().clear();
		fi_tab5.SelectSingleClick.getFeatures().push(feature);
	}
}

function fi_tab5_layer_show_click(that, id) {
	var t = that.checked;
	
	if (fi_tab5.AssClick)
	{
		var fs = fi_tab5.map.geomvector_source2.getFeatures();
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

function tab5_reset() {
	$("#upload_xls").val(''); 
	$(".fc_detail_data").hide();
	$("#fi_tab5_list").empty();
	$("#fi_tab5_count").empty();
}

function fi_tab5_downloadshp() {
	var features = fi_tab5.map.geomvector_source.getFeatures();
	var format = new ol.format.WKT();
	var wkts = [];
	for (var i = 0; i < features.length; i++) {
		if (fi_tab5_nowSelect == features[i].sid) {
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
	var features2 = fi_tab5.map.geomvector_source1.getFeatures();
	for (var i = 0; i < features2.length; i++) {
		if (fi_tab5_nowSelect == features2[i].sid) {
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
		post.ShpName = fi_tab5.basedata.county + fi_tab5.basedata.town + fi_tab5.basedata.landname + fi_tab5.basedata.landNo + "地號";
		
		post.Sid = fi_tab5_nowSelect;
		post.County = fi_tab5.basedata.county;
		post.Town = fi_tab5.basedata.town;
		post.LandCode = fi_tab5.basedata.landCode;
		post.Sec = fi_tab5.basedata.landname;
		post.LandNo = fi_tab5.basedata.landNo;
		post.RegArea = fi_tab5.basedata.area_ha;
		post.Unit = fi_tab5.basedata.unit;
		post.Landnodash = fi_tab5.basedata.landnodash;
		
		post.RegDate = fi_tab5.basedata.regDate;
		post.Version = fi_tab5.basedata.ver;
		post.OVersion = fi_tab5.basedata.oVer;
		post.ZoningName = fi_tab5.basedata.zoningName;
		post.LclassName = fi_tab5.basedata.lcLassName;
		
		if (fi_tab5.ownerdata.length)
		{
			post.Manager = fi_tab5.ownerdata[0].manager;
			post.Owner = fi_tab5.ownerdata[0].own;
		}
		
		post.Wkts = wkts;
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

function fi_tab5_downloadASSshp() {
	var tar = $("#fi_tab5_list > tr");
	
	var sid = [];
	for (var i = 0; i < tar.length; i++) {
		sid.push(tar[i].id);
	}
	
	var post = {};
	post.sid = sid;
	post.ShpName = "查詢範圍";
	post.FileName = "查詢範圍";
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "InfoOverView/ExportSearchShp",
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

function fi_tab5_api() {
	var post = {};
	post.Unit = fi_tab5.basedata.unitCode;
	post.Sec = fi_tab5.basedata.sec;
	post.No = fi_tab5.basedata.landNo;
	
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
							mgmt = htmlEncode(tar.MGMT[0].LNAME);
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

function tab5_sample() {
	$("#sample_download")[0].click();
}

function fi_tab5_ass_click(){
	$(".fi_tab_content").hide();
	$(".fi_tab").off("click.fiAssociateTab").on("click.fiAssociateTab",function(){
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
	
	$(".tab_content_table tr").off("click.fiAssociateRow").on("click.fiAssociateRow",function(){
		$(".tab_content_table tr").removeClass("active");
		$(this).addClass("active");
	});
}

function tab5_difference() {
	$("#differencenote").modal("show");
}

function fi_tab5_diff_close() {
	$("#differencenote").modal("hide");
}

var fi_tab6 = {};
fi_tab6.map = null;
fi_tab6.SelectSingleClick = null;
fi_tab6.AssClick = true;
fi_tab6.NowSid = -1;
function fi_tab6_init() {
	fi_tab6.map = map('mmap', true, false, true);
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
			if (fi_tab6.mainfeature && fi_tab6.mainfeature == e) {
				fi_tab6.mainfeature = null;
				return false;
			}
			else if (fi_tab6.AssClick == false && e.type == 'AssFeature') {
				return false;
			}
			fi_tab6.mainfeature = e;
			return true;
		}
	});
	SelectSingleClick.on("select", fi_tab6_feature_click);
	fi_tab6.map.addInteraction(SelectSingleClick);
	fi_tab6.SelectSingleClick = SelectSingleClick;
	
	fi_tab6_ass_click();
	
	// 處理Legend
	var target = $("#maplegend");
	var legend1 = "<div style='width: 200px;'>";
	
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend1'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>選取區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"self_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab6_layer_change_opacity('self');\" /></div>";
	legend1 += "</div>";
	legend1 += "<div class='row' style='margin: 5px 0px;'>";
	legend1 += "<div class='col AllCenter' style='padding: 0px;'><div class='mlegend2'></div></div>";
	legend1 += "<div class='col' style='padding: 0px;'>列表區域</div>";
	legend1 += "<div class='col' style='padding: 0px;'><input id=\"noself_opacity\" type=\"range\" class=\"barrange\" min=\"0\" max=\"100\" value=\"100\" onchange=\"fi_tab6_layer_change_opacity();\" /></div>";
	legend1 += "</div>";
	legend1 += "</div>";
	
	target.append(legend1);
}

function tab6_go_search() {
	if (!filelist || filelist.length == 0) return;
	
	var formdata = new FormData();
	formdata.append('checkratio', $('#upload_percent').val());
	
	$.each(filelist, function(j, file) {
		formdata.append('files', file);
	});
	
	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "InfoOverView/UploadFMLandArea",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d != "-1")
				{
					alert("上傳比對成功.");
					$(".fc_detail_data").show();
					fi_scheduleMapUpdate(fi_tab6);
					$("#fc_detail_list").empty();
					$("#fc_detail_list").load("./views/temp/fc_data_temp.html");
					$(".btn-wid").hide();
					$(".upload_zone").hide();
					$("#upload_percent").attr('disabled', true);
					setTimeout(function() {
						fi_tab6.NowSid = d;
						fi_tab6_getnow(d);
					}, 200);
					// Close_ca_UploadfileModal();
				}
				else
				{
					alert("上傳比對失敗.");
					setTimeout(function() {
						WaitingShow(false);
					}, 200);
				}
			}
		}
	});
}

function fi_tab6_getnow(sid) {
	var post = {};
	post.sid = sid;

	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetFMLandArea",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var datt = data.data;
				
				var d = datt.list;
				$("#fc_detail_count").text("共 (" + d.length + ") 筆");
				for (var i = 0; i < d.length; i++)
				{
					rows = "<tr class='list_item' id='list_item_" + d[i].sid + "' onclick='" + "fi_fc_list6_item_click" + "(this);'>";
					
					rows += "<td width='4.5%'>" + htmlEncode(d[i].cityname) + "</td>";
					
					if (d[i].townname == "不明") {
						rows += "<td width='4.5%'>" + htmlEncode(d[i].townname) + "</td>";
						rows += "<td width='12%' style='word-break: break-all;'>" + "未登錄段" + "</td>";
					}
					else {
						rows += "<td width='4.5%'>" + htmlEncode(d[i].townname) + "</td>";
						rows += "<td width='12%' style='word-break: break-all;'>" + htmlEncode(d[i].landname) + "</td>";
					}
					
					rows += "<td width='6%'>" + (d[i].pm_no + '-' + d[i].pc_no) + "</td>";
					rows += "<td width='6.5%'>" + d[i].areaha + "</td>";
					rows += "<td width='6.5%'>" + d[i].regdate + "</td>";
					rows += "<td width='6.5%'>" + htmlEncode(d[i].zoingname) + "</td>";
					rows += "<td width='9%'>" + htmlEncode(d[i].lclassname) + "</td>";
					rows += "<td width='4%'>" + htmlEncode(d[i].ownertype) + "</td>";
					rows += "<td width='11%' style='word-break: break-all;'>" + htmlEncode(d[i].ownermanage) + "</td>";
					rows += "<td width='4%'>" + d[i].ratio + "</td>";
					rows += "<td width='11%'>" + d[i].landcode + "</td>";
					rows += "<td width='5%'><button class='btn btn-success' onclick='fi_fc_api(\"" + d[i].unit + "\",\"" + d[i].landcode + "\",\"" + d[i].sec + "\")'>查看</button></td>";
					
					$("#fi_fc_list1").append(rows);
				}
				optionactive("fi_fc_list1");
				
				fi_tab6.map.geomvector_source.clear();
				fi_tab6.map.geomvector_source1.clear();
				
				// 畫自己本身圖徵與查詢結果的圖徵
				var selfstyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(235, 0, 0, 0.5)",
					}),
					stroke: new ol.style.Stroke({
						color: "rgba(148, 0, 0, 1)",
						width: 2,
					}),
				});
				var dulist = datt.uploadList;
				for (var i = 0; i < dulist.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(d[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.fcid = d[i].sid;
					feature.ftype = "ullist";
					
					feature.setStyle(selfstyle);
					
					fi_tab6.map.geomvector_source1.addFeature(feature);
				}
				
				// 畫相關的圖徵
				for (var i = 0; i < d.length; i++) {
					var format = new ol.format.WKT();
					var feature = format.readFeature(d[i].wkt);
					feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
					feature.fcid = d[i].sid;
					feature.ftype = "asslist";
					
					var ystyle = new ol.style.Style({
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
							text: (d[i].pm_no + '-' + d[i].pc_no)
						})
					});
					feature.setStyle(ystyle);
					
					fi_tab6.map.geomvector_source.addFeature(feature);
				}
				fi_tab6.map.getView().fit(fi_tab6.map.geomvector_source.getExtent(), { maxZoom: 18});
				fi_scheduleMapUpdate(fi_tab6);
			}
			setTimeout(function() {
				WaitingShow(false);
			}, 200);
		}
	});
}

function tab6_reset() {
	filelist = new Array();
	$("#upload_shp_file_list").empty();
	$("#upload_percent").val("1");
	fi_tab6.map.geomvector_source.clear();
	fi_tab6.map.geomvector_source1.clear();
	$(".fc_detail_data").hide();
	$("#fc_detail_list").empty();
	$(".upload_zone").show();
	$("#upload_percent").attr('disabled', false);
}

function fi_tab6_ass_click() {
	$(".fi_tab_content").hide();
	$(".fi_tab").off("click.fiAssociateTab").on("click.fiAssociateTab",function(){
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
	
	$(".tab_content_table tr").off("click.fiAssociateRow").on("click.fiAssociateRow",function(){
		$(".tab_content_table tr").removeClass("active");
		$(this).addClass("active");
	});
}

function fi_tab6_feature_click(e) {
	if (e.selected.length == 1) {
		if (e.selected[0].fcid) {
			var $objTr = $("#list_item_" + e.selected[0].fcid);
			if (!$objTr || $objTr.length == 0) return;
			var objTr = $objTr[0];
			$(".main_scroll_mini2").animate({scrollTop:objTr.offsetTop}, "slow");
			setTimeout(function() {
				$("#list_item_" + e.selected[0].fcid).click();
			}, 500);
		}
	}
	else {
		$("#fi_fc_list1 tr").removeClass("active");
	}
}

function fi_fc_list6_item_click(that) {
	var starid = that.id.split("_");
	var fcid = starid[starid.length - 1];
	
	var features = fi_tab6.map.geomvector_source.getFeatures();
	var feature = null;
	for (var i = 0; i < features.length; i++) {
		if (features[i].fcid == fcid) {
			feature = features[i];
			break;
		}
	}
	
	// tempselect3.aselect = fcid;
	if (feature) {
		fi_tab6.SelectSingleClick.getFeatures().clear();
		fi_tab6.SelectSingleClick.getFeatures().push(feature);
		fi_tab6.map.getView().fit(feature.getGeometry().getExtent(), { maxZoom: 18});
		fi_scheduleMapUpdate(fi_tab6);
	}
}

function fi_tab6_layer_change_opacity(type) {
	if (type == 'self') {
		var val = $('#self_opacity').val() / 100;
		fi_tab6.map.geomvector_layer1.setOpacity(val);
	} else {
		var val = $('#noself_opacity').val() / 100;
		fi_tab6.map.geomvector_layer.setOpacity(val);
	}
}

function fi_tab6_downloadCSV() {
	if (fi_tab6.NowSid < 0) return;
	var formdata = new FormData();
	formdata.append('sid', fi_tab6.NowSid);
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "InfoOverView/DownloadFMLandCSV", true);
	request.responseType = 'blob';
	
	request.onload = function(e) {
		setTimeout(function() {
			WaitingShow(false);
		}, 200);
		if (this.status === 200) {
			var blob = this.response;
			if (window.navigator.msSaveOrOpenBlob) {
				// window.navigator.msSaveBlob(blob, st + "範圍地籍.csv");
				window.navigator.msSaveBlob(blob, "關聯範圍地籍.csv");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				// downloadLink.download = st + "範圍地籍.csv";
				downloadLink.download = "關聯範圍地籍.csv";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
		   // $("#fitab1dropdowntrig").click();
       }
   };
   
   request.send(formdata);
}

function fi_tab6_downloadSHP() {
	var post = {};
	post.sid = fi_tab6.NowSid;
	
	$.ajax({
		url: ApiRequestURL + "InfoOverView/DownloadFMLandSHP",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				AddNewDownloadLog("圖資查詢", "全國地籍", "zip");
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.click();
				a.remove();
			}
		}
	});
}

function fi_tab6_percent_change() {
	var value = Number($('#upload_percent').val());

	if (value > 100) {
		$('#upload_percent').val(100);
	}

	if (value < 1) {
		$('#upload_percent').val(1);
	}
}
