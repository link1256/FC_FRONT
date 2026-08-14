fi_tab6_init();
	 
	 $(".fc_detail_data").hide();
	 tab6("ownerdata_manager");
	 
	 var filelist = new Array();
	 // tab7();
	 var isshowright = true;
	 $("#big_window").off("click.cspLayout").on("click.cspLayout", function() {
		
		if ($(".detail_data_map, .fc_detail_data").hasClass ("big_window")) {
			$(".detail_data_map, .fc_detail_data").removeClass("big_window");
			$(this).children().removeClass("fa-caret-square-up").addClass("fa-caret-square-down");
			$(".fc_detail").removeClass("fix_table_window");
		}
		else {
			$(".detail_data_map, .fc_detail_data").addClass("big_window");
			$(this).children().removeClass("fa-caret-square-down").addClass("fa-caret-square-up");
			$(".fc_detail").addClass("fix_table_window");
		}
		
		if (typeof fi_scheduleMapUpdate === "function") {
			fi_scheduleMapUpdate(fi_tab6);
		}
		else if (typeof fi_tab6 !== "undefined" && fi_tab6 && fi_tab6.map) {
			fi_tab6.map.updateSize();
		}
	});
		 
	 $("#list_window").off("click.cspLayout").on("click.cspLayout", function() {
		if ($(".new_ver_flex").hasClass("itemhide")) {
			$(".new_ver_flex").removeClass("itemhide");
			$(this).children().removeClass("fa-caret-square-up").addClass("fa-caret-square-down");
			$(".content_row_search").css("height", "82vh");
			// $("#m_list").css("height", "calc(100vh - 420px)");
		}
		else {
			$(".new_ver_flex").addClass("itemhide");
			$(this).children().removeClass("fa-caret-square-down").addClass("fa-caret-square-up");
			$(".content_row_search").css("height", 80);
			// $("#m_list").css("height", "calc(100vh - 243px)");
		}
	});
	
	$("#map_window").off("click.cspLayout").on("click.cspLayout", function() {
		if ($(".map_flex").hasClass("itemhide")) {
			$(".map_flex").removeClass("itemhide");
			$(this).children().removeClass("fa-caret-square-right").addClass("fa-caret-square-left");
			$(".search_div").width(400);
			$(".map_cview").height("");
			$(".fc_detail_data").width("calc(100vw - 420px)");
			if (isshowright) {
				$(".fc_partA").width("calc(60% - 10px)");
				$(".fc_partB").width("40%");
			} else {
				$(".fc_partB").width("0%");
				$(".fc_partA").width("calc(100% - 30px)");
			}
			$(".window_hide").hide();
		}
		else {
			$(".map_flex").addClass("itemhide");
			$(this).children().removeClass("fa-caret-square-left").addClass("fa-caret-square-right");
			$(".search_div").width(80);
			$(".map_cview").height("calc(100vh - 160px)");
			$(".fc_detail_data").width("calc(100vw - 80px)");
			if (isshowright) {
				$(".fc_partA").width("calc(70% - 10px)");
				$(".fc_partB").width("30%");
			} else {
				$(".fc_partB").width("0%");
				$(".fc_partA").width("calc(100% - 30px)");
			}
			$(".window_hide").show();
		}
		if (typeof fi_scheduleMapUpdate === "function") {
			fi_scheduleMapUpdate(fi_tab6);
		}
		else if (typeof fi_tab6 !== "undefined" && fi_tab6 && fi_tab6.map) {
			fi_tab6.map.updateSize();
		}
	});
	
	$("#big_window3").off("click.cspLayout").on("click.cspLayout", function() {
		if ($(".map_flex2").hasClass("itemhide")) {
			$(".map_flex2").removeClass("itemhide");
			$(this).children().removeClass("fa-caret-square-right").addClass("fa-caret-square-left");
			$(".fc_partB").width("40%");
			$(".fc_partA").width("calc(60% - 10px)");
			isshowright = true;
		}
		else {
			$(".map_flex2").addClass("itemhide");
			$(this).children().removeClass("fa-caret-square-left").addClass("fa-caret-square-right");
			$(".fc_partB").width("0%");
			$(".fc_partA").width("calc(100% - 30px)");
			isshowright = false;
		}
		if (typeof fi_scheduleMapUpdate === "function") {
			fi_scheduleMapUpdate(fi_tab6);
		}
		else if (typeof fi_tab6 !== "undefined" && fi_tab6 && fi_tab6.map) {
			fi_tab6.map.updateSize();
		}
	});
	
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
				HTML += "<tr><td>" + filelist[i].name + "</td><td><button class=\"btn btn-danger btn-wid\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
			}

			HTML += "</table>";
			output.innerHTML = HTML;
		}
	}
	
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
			HTML += "<tr><td>" + filelist[i].name + "</td><td><button class=\"btn btn-danger btn-wid\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
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
			HTML += "<tr><td>" + filelist[i].name + "</td><td><button class=\"btn btn-danger btn-wid\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
		}
		output.innerHTML = HTML;
		
		var hiddenlist = document.getElementsByClassName("hiddenupload");
		for (var i = 0; i < hiddenlist.length; i++) {
			if (i == idx) hiddenlist[i].remove();
		}
	}
	
	function UploadDeleteThis(idx) {
		var output = document.getElementById("upload_shp_file_list");
		filelist.splice(idx, 1);
		var HTML = "<table>";
		
		for (var i = 0; i < filelist.length; i++) {
			HTML += "<tr><td>" + filelist[i].name + "</td><td><button class=\"btn btn-danger btn-wid\" onclick=UploadDeleteThis(" + i + ")>刪除</button></td></tr>";
		}
		output.innerHTML = HTML;
		
		var hiddenlist = document.getElementsByClassName("hiddenupload");
		for (var i = 0; i < hiddenlist.length; i++) {
			if (i == idx) hiddenlist[i].remove();
		}
	}
