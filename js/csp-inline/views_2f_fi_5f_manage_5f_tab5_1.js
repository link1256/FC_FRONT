fi_tab5_init();
	 
	 $(".fc_detail_data").hide();
	 tab6("ownerdata_manager");
	 
	 // tab7();
	 var isshowright = true;
	 $("#big_window").off("click.cspLayout").on("click.cspLayout", function() {
		
		if ($(".fc_partA,.fc_detail_data_map").hasClass ("big_window")) {
			$(".fc_partA,.fc_detail_data_map").removeClass("big_window");
			$(this).children().removeClass("fa-caret-square-up").addClass("fa-caret-square-down");
		}
		else {
			$(".fc_partA,.fc_detail_data_map").addClass("big_window");
			$(this).children().removeClass("fa-caret-square-down").addClass("fa-caret-square-up");
		}
		
		if (typeof fi_scheduleMapUpdate === "function") {
			fi_scheduleMapUpdate(fi_tab5);
		}
		else if (typeof fi_tab5 !== "undefined" && fi_tab5 && fi_tab5.map) {
			fi_tab5.map.updateSize();
		}
	});
		 
	 $("#list_window").off("click.cspLayout").on("click.cspLayout", function() {
		if ($(".new_ver_flex").hasClass("itemhide")) {
			$(".new_ver_flex").removeClass("itemhide");
			$(this).children().removeClass("fa-caret-square-up").addClass("fa-caret-square-down");
			$("#m_list").css("height", "calc(100vh - 420px)");
		}
		else {
			$(".new_ver_flex").addClass("itemhide");
			$(this).children().removeClass("fa-caret-square-down").addClass("fa-caret-square-up");
			$("#m_list").css("height", "calc(100vh - 243px)");
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
			fi_scheduleMapUpdate(fi_tab5);
		}
		else if (typeof fi_tab5 !== "undefined" && fi_tab5 && fi_tab5.map) {
			fi_tab5.map.updateSize();
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
			fi_scheduleMapUpdate(fi_tab5);
		}
		else if (typeof fi_tab5 !== "undefined" && fi_tab5 && fi_tab5.map) {
			fi_tab5.map.updateSize();
		}
	});
