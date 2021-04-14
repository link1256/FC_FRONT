//地籍管理-功能頁籤
$("search_type.fc_manage").children().on("click",function(){
	$(this).parent().children().removeClass("active");
	$(this).addClass("active");
});

//子功能頁籤
function step_tab()
{
	$(".fc_manage_tab3 .nav-item3").on("click",function(){
		  $(this).parent().children().removeClass("active");
		  $(this).addClass("active");
		  
		  for(j = 1; j < 4; j++){
			  if($(this).hasClass("tab"+j)){
				  upload_step(3,j);
			  }
		  }		  
	  });		
}



function upload_step(i,j)
{

	$(".upload_step").empty();
	$(".upload_step.tab"+i).load("./views/fc_manage_tab"+i+"_step"+j+".html"); 
		  	
}

function fc_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab"+i).load("./views/fc_manage_tab"+i+".html"); 
	
	 setTimeout(function(){
	if(i> 2){
		upload_step(i,1);
	}
	   },100);
	
}
  
function GetFileList() {
	$.get(ApiRequestURL + "ImportFile/GetUploadShpFileList", function(data) {
		var rdata = data.data;
		for (var i = 0; i < rdata.length; i++) {
			var appendtr = "";
			appendtr += "<tr class=\"align-middle\">";
			appendtr += "<td>" + rdata[i].no + "</td>";
			appendtr += "<td>" + rdata[i].name + "</td>";
			appendtr += "<td>" + parseInt(rdata[i].megaByte) + "MB</td>";
			appendtr += "<td>" + (rdata[i].completeness == true ? "可執行" : "不可執行") + "</td>";
			appendtr += "<td>" + formatDateTime_Date(rdata[i].lastWriteTime) + "</td>";
			appendtr += "<td><button type=\"button\" class=\"btn btn-success\" onclick=\"new_city_result()\">執行</button></td>";
			appendtr += "</tr>";
			$("#file_list>tbody").append(appendtr);
		}
	});
}

function city_result(){
	let y = document.getElementById("ver_year1").value;
	let m = document.getElementById("ver_month1").value;
	
	if(y == 0 || m == 0){
		alert("請選擇版次!");
		return;
	}
	$("#city_list").show();
	let t = document.getElementById("city_result");
	let c = ["台北市","新北市","桃園市","台中市","台南市","高雄市","基隆市","新竹市","嘉義市","新竹縣","苗栗縣","彰化縣","雲林縣","嘉義縣","屏東縣","南投縣","宜蘭縣","花蓮縣","台東縣","澎湖縣","金門縣","連江縣"];
    $(t).empty();
	for( i=0 ; i < 22; i++ ){
		let p = "<tr class='align-middle'>" +
		"<td>"+ (i + 1) + "</td>" +
		"<td>"+ c[i] +"</td>" +
		"<td>0</td>" +
		"<td>尚未執行</td>" +
		"<td></td></tr>"
		$(t).append(p);
	}
}

function new_city_result() {
	let y = document.getElementById("ver_year2").value;
	let m = document.getElementById("ver_month2").value;
	
	if (y == 0 || m == 0) {
		alert("請選擇版次!");
		return;
	}
}

function GetVersionList() {
	$.get(ApiRequestURL + "VersionManagement/GetVersionList", function(data) {
		$("#version_list>tbody>tr").remove();
		var rdata = data.data;
		for (var i = 0; i < rdata.length; i++) {
			var appendtr = "";
			appendtr += "<tr class=\"align-middle\">";
			appendtr += "<td>" + rdata[i].no + "</td>";
			appendtr += "<td>" + rdata[i].year + "</td>";
			appendtr += "<td>" + rdata[i].month + "</td>";
			appendtr += "<td>" + formatDateTime_Date(rdata[i].createTime) + "</td>";
			appendtr += "<td>" + rdata[i].spaceCounty + "</td>";
			appendtr += "<td>" + rdata[i].spaceCompare + "</td>";
			appendtr += "<td>" + rdata[i].spaceChange + "</td>";
			appendtr += "<td>" + rdata[i].ownerCompare + "</td>";
			appendtr += "<td>" + rdata[i].ownerChange + "</td>";
			appendtr += "<td>" + formatDateTime_Time(rdata[i].updateTime) + "</td>";
			appendtr += "<td>" + rdata[i].updateName + "</td>";
			appendtr += "<td><button type=\"button\" class=\"btn btn-danger\" onclick=\"ShowDeleteVersion(" + rdata[i].sid + ");\">刪除</button></td>";
			appendtr += "</tr>";
			
			$("#version_list>tbody").append(appendtr);
		}
	});
}
function AddNewVersion() {
	var syear = $("select#ver_year0").val();
	var smonth = $("select#ver_month0").val();
	if (syear == "請選擇" || smonth == "請選擇") {
		alert("請選擇年度跟月份.");
		return;
	}
	$.post(ApiRequestURL + "VersionManagement/AddNewVersion", { year: syear, month: smonth })
		.done(function(data) {
			if (data.message === "success")
				alert("新增成功.");
			
			$('#AddNewVersion').modal('hide');
			GetVersionList();
		});
}
var DeleteVersionSID;
function ShowDeleteVersion(sid) {
	DeleteVersionSID = sid;
	$('#DeleteVersion').modal('show');
}

function DeleteVersion() {
	var sid = DeleteVersionSID;
	$.post(ApiRequestURL + "VersionManagement/DeleteVersion", { sid: sid })
		.done(function(data) {
			if (data.message === "success")
				alert("刪除成功.");
			$('#DeleteVersion').modal('hide');
			GetVersionList();
		});
}
