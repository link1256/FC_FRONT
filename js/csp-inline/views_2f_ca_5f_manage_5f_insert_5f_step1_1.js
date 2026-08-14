setTimeout(function() {
		tab8("ca_sub_insert");
		ca_insert_step1_init();
	}, 200);
	function UploadFileClose() {
		$("#UploadFile").modal("hide");
	}
	var filelist = new Array();
	function FileListUpload() {
		var input = document.getElementById("upload_shp");
		var output = document.getElementById("upload_shp_file_list");
		
		var files = input.files;
		var HTML = "<table>";
		for (var i = 0; i < files.length; i++) {
			if (files[i].name.split(".")[1] == "shp" || files[i].name.split(".")[1] == "prj" || files[i].name.split(".")[1] == "dbf")
			{
				var ishas = false;
				for (var j = 0; j < filelist.length; j++) {
					if (files[i].name == filelist[j].name)
						ishas = true;
				}
				
				if (!ishas)
					filelist.push(files.item(i));
			}
		}
		
		for (var i = 0; i < filelist.length; i++) {
			HTML += "<tr><td>" + filelist[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
		}

		HTML += "</table>";
		output.innerHTML = HTML;
		
		$("#upload_shp").replaceWith($("#upload_shp").val('').clone(true));
	}
	function UploadDeleteThis(idx) {
		var output = document.getElementById("upload_shp_file_list");
		filelist.splice(idx, 1);
		var HTML = "<table>";
		
		for (var i = 0; i < filelist.length; i++) {
			HTML += "<tr><td>" + filelist[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
		}
		output.innerHTML = HTML;
		
		var hiddenlist = document.getElementsByClassName("hiddenupload");
		for (var i = 0; i < hiddenlist.length; i++) {
			if (i == idx) hiddenlist[i].remove();
		}
	}
	
	// 透過 selector 來選擇元素作為上傳區塊，這裡使用id='drop'的div元素
	var dropbox;
	dropbox = document.getElementById("upload_shp_drag");
	// element增加eventListener
	dropbox.addEventListener("dragenter", dragenter, false);
	dropbox.addEventListener("dragover", dragover, false);
	dropbox.addEventListener("drop", drop, false);

	function dragenter(e) {
		e.stopPropagation();
		e.preventDefault();
	}
	function dragover(e) {
		e.stopPropagation();
		e.preventDefault();
	}
	function drop(e) {
		e.stopPropagation();
		e.preventDefault();
		var dt = e.dataTransfer;
		var files = dt.files;
		handleFiles(files);
	}

	// 針對資料處理的方法
	function handleFiles(files) {
		if (files.length > 0) {
			var output = document.getElementById("upload_shp_file_list");
			var HTML = "<table>";
			for (var i = 0; i < files.length; i++) {
				if (files[i].name.split(".")[1] == "shp" || files[i].name.split(".")[1] == "prj" || files[i].name.split(".")[1] == "dbf")
				{
					var ishas = false;
					for (var j = 0; j < filelist.length; j++) {
						if (files[i].name == filelist[j].name)
							ishas = true;
					}
					
					if (!ishas)
						filelist.push(files.item(i));
				}
			}
			
			for (var i = 0; i < filelist.length; i++) {
				HTML += "<tr><td>" + filelist[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
			}

			HTML += "</table>";
			output.innerHTML = HTML;
		}
	}
