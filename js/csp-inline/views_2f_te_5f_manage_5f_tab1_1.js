setTimeout(function(){
		// $("#item1").click();
		loadListData(0); //刻版測試用
	},50);

	// get_te_manage_containerTable();
	te_manage_get_yearlist();

    var original_page = "";
		
$("#fm_search_list tr").on("click",function() {
	$(this).parent().children().removeClass("active");
	$(this).addClass("active");
});

$("#detail_edit").on("click",function() {
	var check = CheckUserAccess("異動事件管理", "異動總覽", "編輯圖資");
	if (!check) {
		alert("您沒有權限使用.")
		return;
	}

	$(this).parent().hide();
	$(".edit_state").show();
	original_page = $("#basic_data").clone();
	$('input,textarea,select').prop('readonly', false).prop('disabled', false);
	$("#te_data_basic_file").show();
	$(".file_list_item_delete").show();
	$(".row_button_zone").show();
	$(".del_edit").show();
	te_can_edit = true;
});

$("#detail_save").on("click",function() {
    $(".normal_state").show();
	$(".edit_state").hide();
	//送出資料並更新畫面資料(重新載入本筆異動)
	UpdateChangeEventInfo();
});

$("#detail_cancel").on("click",function() {
	$(".normal_state").show();
	$(".edit_state").hide();
	$(".row_button_zone").hide();
	$(".del_edit").hide();
	te_can_edit = false;
	//讀取原本資料
	$(".data_frame").empty().html(original_page);
	filelist = new Array();
	dfilelist = new Array();
});

$("#detail_delete").on("click",function(){
    if (confirm("是否刪除本筆異動所有資料?")) {
		$(".normal_state").show();
		$(".edit_state").hide();
		//刪除該筆異動所有資料
		DeleteChangeEventInfo();
		
		$(".detail_data").hide();
		
		setTimeout(function() {
			tab("te_manage");
			get_te_manage_containerTable();
		}, 900);
		upload_result_owner();
	}
});

$("#sent_apply").on("click",function(){
    te_sent_apply();
});

function te_sent_apply() {
	if (confirm("是否送審本筆異動資料?")) {
		var t = te_checkhasnotupload();
		if (t) {
			alert('請先將地籍清單內未上傳的部分上傳.');
			return;
		}
		
		$(".normal_state").show();
		$(".edit_state").hide();
		//更改該筆異動狀態
		SentChangeEventInfo();
	}
}

$("#detail_cancelchange").on("click", function() {
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	var newdate = year + "/" + month + "/" + day;

	$("#cancel_name").text(Logindata.name);
	$("#cancel_time").text(newdate);
	$('#CancelChange').modal('show');
});

var filelist = new Array();
var dfilelist = new Array();
function FileListUpload() {
	var input = document.getElementById("te_data_basic_file");
	var output = document.getElementById("upload_file_list");
	
	var clone = $("#te_data_basic_file").clone();
	clone.attr("class", "hiddenupload");
	$("#upload_file_hide_list").append(clone);
	
	var HTML = "<table style=\"width: 500px;\">";
	for (var i = 0; i < input.files.length; i++) {
		filelist.push(input.files.item(i));
	}
	
	for (var i = 0; i < filelist.length; i++) {
		HTML += "<tr><td>" + filelist[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
	}

	HTML += "</table>";
	output.innerHTML = HTML;
	
	$("#te_data_basic_file").replaceWith($("#te_data_basic_file").val('').clone(true));
}
function UploadDeleteThis(idx) {
	var output = document.getElementById("upload_file_list");
	filelist.splice(idx, 1);
	var HTML = "<table style=\"width: 500px;\">";
	var HTML = "<table style=\"width: 500px;\">";
	
	for (var i = 0; i < filelist.length; i++) {
		HTML += "<tr><td>" + filelist[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
	}
	output.innerHTML = HTML;
	
	var hiddenlist = document.getElementsByClassName("hiddenupload");
	for (var i = 0; i < hiddenlist.length; i++) {
		if (i == idx) hiddenlist[i].remove();
	}
}
function PushDFile(id, that) {
	dfilelist.push(id);
	that.parentNode.remove();
}
