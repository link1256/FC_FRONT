var filelist1 = new Array();
	function FileListUpload1() {
		var input = document.getElementById("te_data_basic_file");
		var output = document.getElementById("file_list");

		var clone = $("#te_data_basic_file").clone();
		clone.attr("class", "hiddenupload");
		$("#upload_file_hide_list").append(clone);
		
		var HTML = "<table style=\"width: 500px;\">";
		for (var i = 0; i < input.files.length; i++) {
			filelist1.push(input.files.item(i));
		}
		
		for (var i = 0; i < filelist1.length; i++) {
			HTML += "<tr><td>" + filelist1[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=UploadDeleteThis1(" + i + ")>刪除</button></td></tr>";
		}

		HTML += "</table>";
		output.innerHTML = HTML;
		
		$("#te_data_basic_file").replaceWith($("#te_data_basic_file").val('').clone(true));
	}
	function UploadDeleteThis1(idx) {
		var output = document.getElementById("file_list");
		filelist1.splice(idx, 1);
		var HTML = "<table style=\"width: 500px;\">";
		
		for (var i = 0; i < filelist1.length; i++) {
			HTML += "<tr><td>" + filelist1[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=UploadDeleteThis1(" + i + ")>刪除</button></td></tr>";
		}
		output.innerHTML = HTML;
		
		var hiddenlist = document.getElementsByClassName("hiddenupload");
		for (var i = 0; i < hiddenlist.length; i++) {
			if (i == idx) hiddenlist[i].remove();
		}
	}
