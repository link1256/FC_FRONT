fi_tab1_init();
	 fi_edit("國有林事業區");
	 $(".fc_detail_data").hide();
	 
	 tab6("ownerdata_manager");
	 
	 $("#list_window").off("click.cspLayout").on("click.cspLayout", function() {
		if ($(".new_ver_flex").hasClass("itemhide")) {
			$(".new_ver_flex").removeClass("itemhide");
			$(this).children().removeClass("fa-caret-square-up").addClass("fa-caret-square-down");
			$("#m_list").css("height", "calc(100vh - 450px)");
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
			$(".fc_partA").width("calc(60% - 10px)");
			$(".fc_partB").width("40%");
			$(".window_hide").hide();
		}
		else {
			$(".map_flex").addClass("itemhide");
			$(this).children().removeClass("fa-caret-square-left").addClass("fa-caret-square-right");
			$(".search_div").width(80);
			$(".map_cview").height("calc(100vh - 160px)");
			$(".fc_detail_data").width("calc(100vw - 80px)");
			$(".fc_partA").width("calc(70% - 10px)");
			$(".fc_partB").width("30%");
			$(".window_hide").show();
		}
		if (typeof fi_scheduleMapUpdate === "function") {
			fi_scheduleMapUpdate(fi_tab1);
		}
		else if (typeof fi_tab1 !== "undefined" && fi_tab1 && fi_tab1.map) {
			fi_tab1.map.updateSize();
		}
	});
