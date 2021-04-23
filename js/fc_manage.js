//地籍管理-功能頁籤
$("search_type.fc_manage").children().on("click",function(){
	$(this).parent().children().removeClass("active");
	$(this).addClass("active");
});

//子功能頁籤
function step_tab()
{
	$(".fc_manage_tab3 .nav-item3").on("click",function(){
		 		  
		  for(j = 1; j < 4; j++){
			  if($(this).hasClass("tab"+j)){
				  if(j==1){
					 if($(this).parent().find(".active").hasClass("tab2")){
						  let c = confirm("確定回到上一步? 將會喪失已比對完成的結果");
                          if(c){
							  upload_step(3,j);
						  }							
						  else{
							  return;
						  }	 					  
					  } 
				  }
				  if(j==2){
					  if($(this).parent().find(".active").hasClass("tab2")){
						  return;
					  }
					  let t = $('#file_list input[name=file_selected]:checked').val();
					  if(!t){
						  alert("請選取上傳檔案!");
						  return;
					  }
					  StartParsingShpFile(t);
					  upload_step(3,j);
				  }
				  if(j==3){
					  if($(this).parent().find(".active").hasClass("tab1")){
						  return;
					  }
					  
					  //to do要將執行結果的方法寫在這裡
					  if($(this).parent().find(".active").hasClass("tab2")){
						  return;
					  }
				  }				 
			  }
		  }		  
		  $(this).parent().children().removeClass("active");
		  $(this).addClass("active");
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
 
//批次匯入 START
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
			//選取後再執行
			appendtr += "<td><input type=\"radio\" class=\"form-check-input file_selected\" name=\"file_selected\" value=\"" + rdata[i].name + "\"></td>";
			// appendtr += "<td><button type=\"button\" class=\"btn btn-success\" onclick=\"StartParsingShpFile('" + rdata[i].name + "')\">執行</button></td>";
			appendtr += "</tr>";
			$("#file_list>tbody").append(appendtr);
		}
	});
}

function StartParsingShpFile(filename) {
	// $( ".nav-item3.tab2" ).click();
	$("#upload_city_result").remove();
	$("#compare_city_result").remove();
	$.post(ApiRequestURL + "ImportFile/StartCityShpFile", { Filename: filename })
		.done(function(data) {
			if (data.isSuccess === true) {
				var rdata = data.data;
				
				//解析結果
				var appendtr = "";
				appendtr += "<tr class=\"align-middle\">";
				appendtr += "<td>" + rdata.city + "</td>";
				appendtr += "<td>" + rdata.newVersionNum + "</td>";
				appendtr += "<td>" + rdata.oldVersionNum + "</td>";
				appendtr += "<td>" + rdata.spentTime + "秒" + "</td>";
				appendtr += "</tr>";
				
				$("#upload_city_result").append(appendtr);
				
				//差異比對結果
				var cmdata = rdata.compareLists;
				if (cmdata.length > 0) {
					var appendtr2 = "";
					for (var i = 0; i < cmdata.length; i++) {
						appendtr2 += "<tr class=\"align-middle\">";
						appendtr2 += "<td>" + cmdata[i].no + "</td>";
						appendtr2 += "<td>" + cmdata[i].landCode + "</td>";
						appendtr2 += "<td>" + cmdata[i].townName + "</td>";
						appendtr2 += "<td>" + cmdata[i].landName + "</td>";
						appendtr2 += "<td>" + cmdata[i].regArea + "</td>";
						appendtr2 += "<td>" + cmdata[i].state + "</td>";
						appendtr2 += "<td><button type=\"button\" class=\"btn btn-success\">更新</button></td>";
						appendtr2 += "</tr>";
					}
					$("#compare_city_result").append(appendtr2);
				}
				else {
					var appendtr2 = "";
					appendtr2 += "<tr class=\"align-middle\">";
					appendtr2 += "<td colspan=\"7\">比對後無差異資料</td>";
					appendtr2 += "</tr>";
					$("#compare_city_result").append(appendtr2);
				}
				
				$(".spinner_mask").hide();
			}
		});
}

function city_result(list) {
	let y = document.getElementById("ver_year1").value;
	let m = document.getElementById("ver_month1").value;
	
	if(y == 0 || m == 0){
		alert("請選擇版次!");
		return;
	}
	$("#city_list").show();
	let t = document.getElementById("city_result");
	let c = ["臺北市","新北市","桃園市","臺中市","臺南市","高雄市","基隆市","新竹市","嘉義市","新竹縣","苗栗縣","彰化縣","雲林縣","嘉義縣","屏東縣","南投縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];
    $(t).empty();
	for (i = 0; i < 22; i++) {
		var tar = list.filter(x => x.cityName === c[i]);
		let p = "<tr class='align-middle'>" +
		"<td>"+ (i + 1) + "</td>" +
		"<td>"+ c[i] +"</td>" +
		"<td>" + (tar.length > 0 ? tar[0].amount : 0) + "</td>" +
		"<td>" + (tar.length > 0 ? "已執行" : "尚未執行") + "</td>" +
		"<td>" + (tar.length > 0 ? tar[0].userName : "") + "</td></tr>"
		$(t).append(p);
	}
}
function GetNewestVersionList() {
	$.get(ApiRequestURL + "ImportFile/GetNewestVersionList", function(data) {
		if (data.isSuccess == true) {
			var rdata = data.data;
			$("#ver_year1").append("<option value='" + rdata.year +  "'>" + rdata.year + "</option>");
			$("#ver_month1").append("<option value='" + rdata.month +  "'>" + rdata.month + "</option>");
			city_result(rdata.versionlist);
		}
	});
}
//批次匯入 END

// 版次管理 START
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
//版次管理 END