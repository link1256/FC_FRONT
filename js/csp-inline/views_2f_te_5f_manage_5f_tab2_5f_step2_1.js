te_manage_tab2_init();
	var filelist = new Array();
	function FileListUpload() {
		var input = document.getElementById("te_data_basic_new_file2");
		var output = document.getElementById("te_data_basic_file_list");

		var clone = $("#te_data_basic_new_file2").clone();
		clone.attr("class", "hiddenupload");
		$("#te_data_basic_hidden_list").append(clone);
		
		var HTML = "<div style=\"width: 260px;\">";
		for (var i = 0; i < input.files.length; i++) {
			filelist.push(input.files.item(i));
		}
		
		for (var i = 0; i < filelist.length; i++) {
			HTML += "<div style='word-break: break-all;'>" + filelist[i].name + "</div>";
		}

		HTML += "</div>";
		output.innerHTML = HTML;
		
		$("#te_data_basic_new_file2").replaceWith($("#te_data_basic_new_file2").val('').clone(true));
	}
	function uploadreset() {
		filelist = [];
		var output = document.getElementById("te_data_basic_file_list");
		output.innerHTML = "";
	}
	function reset_tab5_list() {
		$('#search_county').val('-1');
		$('#search_town').val('-1');
		$('#search_sec').val('-1');
		$('#search_number1').val('');
		$('#search_number2').val('');
		$('#search_land_code').val('');
		
		$('#te_tab5_all').prop('checked', false);
		$('#te_tab5_list').empty();
	}
	function reset_tab6_list() {
		$('#search_dist').val('-1');
		$('#search_wkng').val('-1');
		$('#search_cmpt').val('-1');
		
		$('#te_tab6_all').prop('checked', false);
		$('#te_tab6_list').empty();
	}
