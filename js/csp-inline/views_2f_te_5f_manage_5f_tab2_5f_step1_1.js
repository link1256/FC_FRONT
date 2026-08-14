newApplyDetail();
	function te_manage_next(notinsert) {
		if (!notinsert) {
			if ($("#te_data_basic_new_note").val() == "") {
				alert("請輸入案由.");
				return;
			}
			if ($("#te_data_basic_new_unit").val() == "") {
				alert("請輸入用地機關.");
				return;
			}
			if ($("#te_type").val() == "-1") {
				alert("請選擇異動類型.");
				return;
			}
			if ($("#te_type").val() == "1" && $("#te_type_sub").val() == "-1") {
				alert("請選擇異動細項.");
				return;
			}
			InsertNewChangeEvent(); //新增異動資料庫用
		}
		else
		{
			if ($("#te_data_basic_new_note").val() == "") {
				alert("請輸入案由.");
				return;
			}
			if ($("#te_data_basic_new_unit").val() == "") {
				alert("請輸入用地機關.");
				return;
			}
			if ($("#te_type").val() == "-1") {
				alert("請選擇異動類型.");
				return;
			}
			if ($("#te_type").val() == "1" && $("#te_type_sub").val() == "-1") {
				alert("請選擇異動細項.");
				return;
			}
			
			UpdateNewChangeEvent();
		}
		
		te_manage_tab2.tabtype = "add";
		create_step(2, 2);
		$(".tab2").parent().children().removeClass("active");
		$(".tab2").addClass("active");
	}
	function te_manage_next2() {
		var step = $("#CreateBtn").is(":visible");
		
		if (step) {
			// te_manage_next();
		}
		else {
			te_manage_next(true);
		}
	}
	var filelist = new Array();
	function FileListUpload() {
		var input = document.getElementById("te_data_basic_new_file");
		var output = document.getElementById("te_data_basic_file_list");

		var clone = $("#te_data_basic_new_file").clone();
		clone.attr("class", "hiddenupload");
		$("#te_data_basic_hidden_list").append(clone);
		
		var HTML = "<table style=\"width: 500px;\">";
		for (var i = 0; i < input.files.length; i++) {
			filelist.push(input.files.item(i));
		}
		
		for (var i = 0; i < filelist.length; i++) {
			HTML += "<tr><td>" + filelist[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
		}

		HTML += "</table>";
		output.innerHTML = HTML;
		
		$("#te_data_basic_new_file").replaceWith($("#te_data_basic_new_file").val('').clone(true));
	}
	function UploadDeleteThis(idx) {
		var output = document.getElementById("te_data_basic_file_list");
		filelist.splice(idx, 1);
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
	$('#fdate,#sdate').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy/mm/dd',
		beforeShow: function (e, t) {
			if ($(this).attr('maxDate')) {
				var dateItem = $('#' + $(this).attr('maxDate'));
				if (dateItem.val() !== "") {
					$(this).datepicker('option', 'maxDate', dateItem.val());
				}
			}
			if ($(this).attr('minDate')) {
				var dateItem = $('#' + $(this).attr('minDate'));
				if (dateItem.val() !== "") {
					$(this).datepicker('option', 'minDate', dateItem.val());
				}
			}
		}
	});
