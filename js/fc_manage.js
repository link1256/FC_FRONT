//地籍管理-功能頁籤
$("search_type.fc_manage").children().on("click",function(){
	$(this).parent().children().removeClass("active");
	$(this).addClass("active");
});

function  upload_step(i)
{

	$(".upload_step").empty();
	$(".upload_step.tab"+i).load("./views/fc_manage_tab"+i+"_step1.html"); 
		  	
}

function  fc_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab"+i).load("./views/fc_manage_tab"+i+".html"); 
	
	 setTimeout(function(){
	if(i> 2){
		upload_step(i);
	}
	   },100);
	
}

  
function GetFileList()
{
	$.get(ApiRequestURL + "ImportFile/GetUploadShpFileList", function(data) {
		var rdata = data.data;
		for (var i = 0; i < rdata.length; i++) {
			var appendtr = "";
			appendtr += "<tr class=\"align-middle\">";
			appendtr += "<td>" + rdata[i].no + "</td>";
			appendtr += "<td>" + rdata[i].name + "</td>";
			appendtr += "<td>" + parseInt(rdata[i].megaByte) + "MB</td>";
			appendtr += "<td>" + (rdata[i].completeness == true ? "可執行" : "不可執行") + "</td>";
			appendtr += "<td>" + (rdata[i].lastWriteTime) + "</td>";
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

function new_city_result(){
	let y = document.getElementById("ver_year2").value;
	let m = document.getElementById("ver_month2").value;
	
	if(y == 0 || m == 0){
		alert("請選擇版次!");
		return;
	}
	
}

