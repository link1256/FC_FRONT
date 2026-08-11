var uploadhasversion = false;

function setdatayear() {
	var y = new Date().getFullYear();
	var ty = y - 1911;

	var sy = 100;
	var ey = ty + 2;

	for (var i = sy; i <= ey; i++) {
		$("#data_year").append('<option value="' + i + '">' + i + '</option>');
		$("#show_year").append('<option value="' + i + '">' + i + '</option>');
	}
}

function getoptmap() {
	$.ajax({
		url: ApiRequestURL + "ImportFile/GetFMOtherType",
		type: "Post",
		success: function (data) {
			if (data.data) {
				var d = data.data;

				for (var i = 0; i < d.length; i++) {
					$("#data_option").append('<option value="' + d[i].sid + '">' + d[i].name + '</option>');
				}
			}
		}
	});
}

function checkotherdata() {
	// 檢查欄位
	var optmap = $("#data_option").val();
	var year = $("#data_year").val();
	var month = $("#data_month").val();

	if (optmap == "-1") {
		alert("請選擇圖資項目!");
		return;
	}
	if (year == "-1" || month == "-1") {
		alert("請選擇版本年份或月份");
		return;
	}
	if (!filelist || filelist.length == 0) {
		alert("請確認上傳圖資檔案");
		return;
	}

	var formdata = new FormData();

	formdata.append("optmap", optmap);
	formdata.append("year", year);
	formdata.append("month", month);

	$.each(filelist, function(j, file){
		formdata.append('files', file);
	});
	
	$.ajax({
		url: ApiRequestURL + "ImportFile/CheckOtherDataFile",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data) {
			if (data.data) {
				var d = data.data;

				uploadhasversion = d.hasversion;

				$("#map_count").val(d.dataCount);

				$("#name_select").empty();
				$("#sub_select").empty();
				$("#date_select").empty();
				$("#ann_select").empty();
				$("#ha_select").empty();
				$("#manager_select").empty();
				$("#note_select").empty();
				$("#edition_select").empty();

				$("#name_select").append('<option value="-1">請選擇欄位</option>');
				$("#sub_select").append('<option value="-1">請選擇欄位</option>');
				$("#date_select").append('<option value="-1">請選擇欄位</option>');
				$("#ann_select").append('<option value="-1">請選擇欄位</option>');
				$("#ha_select").append('<option value="-1">請選擇欄位</option>');
				$("#manager_select").append('<option value="-1">請選擇欄位</option>');
				$("#note_select").append('<option value="-1">請選擇欄位</option>');
				$("#edition_select").append('<option value="-1">請選擇欄位</option>');

				$.each(d.cols, function (i, col) {
					$("#name_select").append('<option value="' + col + '">' + col + '</option>');
					$("#sub_select").append('<option value="' + col + '">' + col + '</option>');
					$("#date_select").append('<option value="' + col + '">' + col + '</option>');
					$("#ann_select").append('<option value="' + col + '">' + col + '</option>');
					$("#ha_select").append('<option value="' + col + '">' + col + '</option>');
					$("#manager_select").append('<option value="' + col + '">' + col + '</option>');
					$("#note_select").append('<option value="' + col + '">' + col + '</option>');
					$("#edition_select").append('<option value="' + col + '">' + col + '</option>');
				})

				$(".step1").css("display", "none");
				$(".step2").css("display", "block");
				$(".step2").css("width", "100%");
				// $(".shp-content").css("justify-content","space-around");
				// $(".shp-content").css("align-item","end");
				$("#data_option").prop('disabled', true);
				$("#data_year").prop('disabled', true);
				$("#data_month").prop('disabled', true);
				$("#import_zip").prop('disabled', true);
				$("#import_shp").prop('disabled', true);
				$("#import_dbf").prop('disabled', true);
				$("#import_prj").prop('disabled', true);
				$("#import_cpg").prop('disabled', true);
			}
		}
	});
}

function uploadotherdata() {
	if (uploadhasversion == true) {
		var yes = confirm('版本已存在,是否進行覆蓋?');
		if (yes) {} else {
			return;
		}
	}

	var optmap = $("#data_option").val();
	var year = $("#data_year").val();
	var month = $("#data_month").val();

	var name = $("#name_select").val();
	var sub = $("#sub_select").val();
	var date = $("#date_select").val();
	var ann = $("#ann_select").val();
	var ha = $("#ha_select").val();
	var manager = $("#manager_select").val();
	var note = $("#note_select").val();
	var edition = $("#edition_select").val();

	if (name == "-1") {
		alert("名稱(NAME)為必選項目!");
		return;
	}

	var formdata = new FormData();

	formdata.append("optmap", optmap);
	formdata.append("year", year);
	formdata.append("month", month);
	formdata.append("name", name);

	if (sub != "-1")
		formdata.append("sub", sub);
	if (date != "-1")
		formdata.append("date", date);
	if (ann != "-1")
		formdata.append("ann", ann);
	if (ha != "-1")
		formdata.append("ha", ha);
	if (manager != "-1")
		formdata.append("manager", manager);
	if (note != "-1")
		formdata.append("note", note);
	if (edition != "-1")
		formdata.append("edition", edition);

	if (uploadhasversion)
		formdata.append("isOverWrite", "y");
	else
		formdata.append("isOverWrite", "n");

	$.each(filelist, function(j, file){
		formdata.append('files', file);
	});

	WaitingShow(true);
	$.ajax({
		url: ApiRequestURL + "ImportFile/UploadOtherDataFile",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data) {
			if (data.data) {
				WaitingShow(false);
				var d = data.data;

				if (d == 1) {
					alert("上傳成功!");
					resetupload();
					$("#sys_manage_tab5_dialog").modal("hide");
					GetMapList();
				} else {
					alert("上傳失敗!請確認欄位型態是否選擇異常或聯絡管理員!");
					$("#sys_manage_tab5_dialog").modal("hide");
				}
			}
		}
	});
}

function resetupload() {
	$(".step2").css("display", "none");
	// $(".step2").hide();

	// $("#data_option").val('-1');
	$("#data_year").val('-1');
	$("#data_month").val('-1');

	filelist = new Array();
	$("#import_shp_file_list").empty();

	$("#data_option").prop('disabled', false);
	$("#data_year").prop('disabled', false);
	$("#data_month").prop('disabled', false);
	$("#import_zip").prop('disabled', false);
	$("#import_shp").prop('disabled', false);
	$("#import_dbf").prop('disabled', false);
	$("#import_prj").prop('disabled', false);
	$("#import_cpg").prop('disabled', false);
	
	$("#tab5_title").empty();

	uploadhasversion = false;
}

function GetMapList() {
	$.ajax({
		url: ApiRequestURL + "MapManagement/GetMapList",
		type: "get",
		async: false,
		success: function (data) {
			var d = data.data;
			$("#sys_map_list").empty();

			for (var i = 0; i < d.length; i++) {
				var tstr = '<tr>';
				tstr += '<td>' + d[i].typeName + '</td>';
				tstr += `<td>${d[i].sensitive?'是':'否'}</td>`;
				tstr += '<td>' + d[i].name + '</td>';
				tstr += '<td>' + d[i].count + '</td>';
				tstr += '<td>' + '<label style="color:#74642A; cursor: pointer;" onclick="add_map_version(\'' +
					d[i].type + '\',\'' + d[i].year + '\',\'' + d[i].month + '\',\'' + d[i].typeName + '\')">新增版次</label>' + '</td>';
				tstr += '</tr>';

				$("#sys_map_list").append(tstr);
			}
			// $('#sys_map_page').pagination({
			// 	dataSource: d,
			// 	pageSize: 10,
			// 	pageNumber: 1,
			// 	callback: function (dd, pagination) {
			// 		$("#sys_map_list").empty();

			// 		for (var i = 0; i < dd.length; i++) {
			// 			var tstr = '<tr>';
			// 			tstr += '<td>' + dd[i].typeName + '</td>';
			// 			tstr += `<td>${dd[i].sensitive?'是':'否'}</td>`;
			// 			tstr += `<td>${dd[i].year}${dd[i].month.toString().padStart(3,'0')}</td>`;
			// 			tstr += '<td>' + '<label style="color:#74642A; cursor: pointer;" onclick="add_map_version(\'' +
			// 				dd[i].sid + '\')">新增版次</label>' + '</td>';
			// 			tstr += '</tr>';

			// 			$("#sys_map_list").append(tstr);
			// 		}
			// 	}
			// });
		}
	});
}

function add_map_version(type, year, month, name) {
	$("#data_option").val(type);
	console.log($("#data_option").val());
	$(".step1").css("display", "block");
	$(".step2").css("display", "none");
	resetupload();
	$("#tab5_title").append(name);
	$("#show_year").val(year);
	$("#show_month").val(month);
	$("#sys_manage_tab5_dialog").modal("show");
}