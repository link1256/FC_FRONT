//地籍管理-功能頁籤
$("search_type.fc_manage").children().on("click",function(){
	$(this).parent().children().removeClass("active");
	$(this).addClass("active");
});
  
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