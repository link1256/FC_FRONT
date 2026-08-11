function dw_ini_page(i)
{
	$(".tab_body").empty();
	$(".tab_body").load("./views/dw_manage_tab" + i + ".html"); 
}

function dw_init() {
	tab("dw_manage");
}

function dw_manage_tab1_init() {
	dw_manage_tab1_get_version();
}

function dw_manage_tab1_get_version() {
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/DownloadManageLandVersion",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
								
				for (var i = 0; i < d.length; i++) {
					$("#show_version").append('<option value="' + htmlEncode(d[i].value) + '">' + htmlEncode(d[i].text) + '</option>');
				}
				
				if (d.length > 0)
				{
					$("#show_version").val(htmlEncode(d[0].value));
					dw_manage_tab1_get_list();
				}
			}
		}
	});
}

function dw_manage_tab1_get_list() {
	var val = $("#show_version").val();
	
	if (val == "-1") return;
	
	var post = {};
	post.sid = val;
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/DownloadManageLandVersionList",
		type: "Post",
		data: post,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#dw_manage_tab1_list").empty();
				for (var i = 0; i < d.length; i++) {
					
					var appendtr = "";
					appendtr += "<tr class=\"align-middle\">";
					appendtr += "<td>" + htmlEncode(d[i].code) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].county) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].versionText) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].text) + "</td>";
					appendtr += "<td><button type=\"button\" class=\"btn btn-success\" OnClick=\"dw_manage_tab1_click_download('" + d[i].version + "','" + d[i].code + "','" + d[i].county + "','" + d[i].versionText + "');\">下載</button></td>";
					appendtr += "</tr>";
					
					$("#dw_manage_tab1_list").append(appendtr);
				}
			}
		}
	});
}

function dw_manage_tab1_click_download(version, countycode, countyname, versiontext) {
	if (!version || !countycode) return;
	
	var post = {};
	post.sid = version;
	post.county = countycode;
	post.FileName = countyname + "地籍_" + versiontext;
	post.ShpName = countyname + "地籍_" + versiontext;
	
	WaitingShow(true);
	
	AddNewDownloadLog("下載專區", "常用圖資", "shp", countyname);
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/DownloadManageTarget",
		data: post,
		type: "Post",
		success: function(data) {
			WaitingShow(false);
			if (data.data && typeof(data.data) == 'string') {
				var guid = data.data;
				var a = document.createElement("a");
				a.href = DonwLoadExportURL + guid + ".zip";
				a.target = '_blank';
				a.click();
			}
		}
	});
}

function dw_manage_tab2_init() {
	dw_manage_tab2_get_list();
}

function dw_manage_tab2_get_list() {
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/AnnouncementFileList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#dw_manage_tab2_list").empty();
				for (var i = 0; i < d.length; i++) {
					var appendtr = "";
					appendtr += "<tr class=\"align-middle\">";
					appendtr += "<td>" + htmlEncode(d[i].className) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].name) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].note) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].date) + "</td>";
					appendtr += "<td><button type=\"button\" class=\"btn btn-success\" OnClick=\"dw_manage_tab2_click_download('" + d[i].sid + "','" + htmlEncode(d[i].name) + "','" + d[i].fileType + "');\">下載</button></td>";
					appendtr += "</tr>";
					
					$("#dw_manage_tab2_list").append(appendtr);
				}
			}
		}
	});
}

function dw_manage_tab2_click_download(sid, filename, filetype) {
	if (!sid) return;
	
	var post = {};
	post.sid = sid;
	
	AddNewDownloadLog("下載專區", "公告檔案", filetype, filename);
	
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/DownloadAnnouncementFile",
		data: post,
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				if (d != "")
				{
					var a = document.createElement("a");
					a.href = DownLoadURL + d;
					a.target = '_blank';
					a.click();
				}
				else
				{
					alert('下載發生錯誤');
				}
			}
		}
	});
}