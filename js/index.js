function main(){
	$(".function_bt div").hover(function() {		 
		$(this).addClass("line_bottom1");
	},function() {
		$(this).removeClass("line_bottom1");
	});	
	
	$(".function_bt div").click(function() {		 
		$(".line_bottom2").removeClass("line_bottom2");
		$(this).addClass("line_bottom2");
	});	
		
	//預設為綜合查詢
	// $(".function_bt_a").click();
		
	//功能頁面切換
	$(".function_bt_a").on("click", function() {
		$(".second_item").text("統計分析");
		$(".between_icon2").text("");
		$(".thrid_item").text("");
		$(".fourth_item").text("");
		$("#main_page").empty().load("./views/cs_manage.html");
		if ($(".rwd_hum").hasClass('open')) {
			$(".rwd_hum").click();
		}
		setTimeout(function(){

		},100);
	});
	$(".function_bt_b").on("click", function() {
		$(".second_item").text("地籍管理");
		$(".between_icon2").text("");
		$(".thrid_item").text("");
		$(".fourth_item").text("");
		$("#main_page").empty().load("./views/fc_manage.html");
		if ($(".rwd_hum").hasClass('open')) {
			$(".rwd_hum").click();
		}
		setTimeout(function(){

		},100);
	});
	$(".function_bt_c").on("click", function() {
		$(".second_item").text("圖資查詢");
		$(".between_icon2").text("");
		$(".thrid_item").text("");
		$(".fourth_item").text("");
		$("#main_page").empty().load("./views/fi_manage.html");
		if ($(".rwd_hum").hasClass('open')) {
			$(".rwd_hum").click();
		}
		setTimeout(function(){

		},100);
	}); 
	$(".function_bt_d").on("click", function() {
		$(".second_item").text("異動事件管理");
		$(".between_icon2").text("");
		$(".thrid_item").text("");
		$(".fourth_item").text("");
		$("#main_page").empty().load("./views/te_manage.html");
		if ($(".rwd_hum").hasClass('open')) {
			$(".rwd_hum").click();
		}
		setTimeout(function(){

		},100);
	});
	$(".function_bt_e").on("click", function() {
		$(".second_item").text("API服務");
		$(".between_icon2").text("");
		$(".thrid_item").text("");
		$(".fourth_item").text("");
		$("#main_page").empty().load("./views/api_manage.html");
		if ($(".rwd_hum").hasClass('open')) {
			$(".rwd_hum").click();
		}
		setTimeout(function(){

		},100);
	});
	$(".function_bt_f").on("click", function() {
		$(".second_item").text("系統管理");
		$(".between_icon2").text("");
		$(".thrid_item").text("");
		$(".fourth_item").text("");
		$("#main_page").empty().load("./views/sys_manage.html");
		if ($(".rwd_hum").hasClass('open')) {
			$(".rwd_hum").click();
		}
		setTimeout(function(){

		},100);
	});
	$(".function_bt_g").on("click", function() {
		$(".second_item").text("林班釐整");
		$(".between_icon2").text("");
		$(".thrid_item").text("");
		$(".fourth_item").text("");
		$("#main_page").empty().load("./views/ce_manage.html");
		if ($(".rwd_hum").hasClass('open')) {
			$(".rwd_hum").click();
		}
		setTimeout(function(){

		},100);
	});
	$(".function_bt_h").on("click", function() {
		$(".second_item").text("下載專區");
		$(".between_icon2").text("");
		$(".thrid_item").text("");
		$(".fourth_item").text("");
		$("#main_page").empty().load("./views/dw_manage.html");
		if ($(".rwd_hum").hasClass('open')) {
			$(".rwd_hum").click();
		}
		setTimeout(function(){

		},100);
	});
	
	// RWD按鈕
	$(".rwd_hum").on("click", function(e) {
		var _menu = $('.banner nav');
		if ($(e.target).hasClass('open') == false) {
			$(_menu).addClass('rwdopen');
			$(e.target).addClass('open');
		}
		else {
			$(_menu).removeClass('rwdopen');
			$(e.target).removeClass('open');
		}
	});
	
	// LOADING事件設置
	$(document).on('show.bs.modal', '.modal', function(e) {
		var visi = $('.modal:visible');
		
		const zIndex = 1040 + 10 * visi.length;
		$(this).css('z-index', zIndex);
		setTimeout(function() {
			$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack')
		}, 300);
	});
	  
	// openlayers 註冊3826座標系統用
	proj4.defs("EPSG:3826", "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
	proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
	ol.proj.proj4.register(proj4);
	
	getnewestversionstring();
	
	// 關閉分頁 視窗 就登出	
	/*window.addEventListener('beforeunload', function(event) {
		event.preventDefault(); //chrome無效, ff有效, ie11有效
		//event.returnValue = ''; //chrome有效, ff無效, ie11有效
		return ''; //chrome無效, ff無效, ie11有效
	}); */
	/*$(window).on("unload", function(e) {
		LogOut();
	});*/
	
	GetVersion();
}

function GetVersion() {
	var post = {};
	$.post(ApiRequestURL + "UserAccount/GetVersion", post)
		.done(function(data) {
			if (data && data.data)
			{
				$('#sversion').empty();
				$('#sversion').append('系統版本：' + data.data);
			}
		});
}

function tab(p) {
	//功能頁籤
	  $(".search_type." + p + " .nav-item2").on("click",function() {
		$(this).parent().children().children().removeClass("active");
		$(this).children().addClass("active"); 
		
		for(i = 1; i < 8; i++) {
			if($(this).hasClass("tab" + i)) {
				
				if (p != "sys_manage" && p != "te_manage") {
					$(".tab_body_content").removeClass("active");
					$(".tab_body_content.tab" + i).addClass("active");
				}
				
				if (p === "cs_manage")
				{
					cs_ini_page(i);
				}
				else if (p === "fc_manage")
				{
					fc_ini_page(i);
				}
				else if (p === "te_manage")
				{
					te_ini_page(i);
				}
				else if (p === "fi_manage")
				{
					fi_ini_page(i);
				}
				else if (p === "api_manage")
				{
					api_ini_page(i);
				}
				else if (p === "sys_manage")
				{
					sys_ini_page(i);
				}
				else if (p === "ce_manage")
				{
					ce_ini_page(i);
				}
				else if (p === "dw_manage")
				{
					dw_ini_page(i);
				}
			}
		}
	});	
	TabAccessShow(p);
}

function TabAccessShow(p) {
	var access = Logindata.access;
	
	var isclick = false;
	if (p === "cs_manage")
	{
		for (var i = 0; i < access.length; i++) {
			if (access[i].indexOf("統計分析/一般查詢") != -1) {
				$(".tab1").show();
				if (!isclick) {
					$(".tab1").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("統計分析/組合查詢") != -1) {
				$(".tab2").show();
				if (!isclick) {
					$(".tab2").click();
					isclick = true;
				}
			}
		}
	}
	else if (p === "te_manage")
	{
		$(".tab1").show();
		$(".tab2").show();
		$(".tab3").show();
	}		
	else if (p === "fi_manage")
	{
		for (var i = 0; i < access.length; i++) {
			if (access[i].indexOf("圖資查詢/全國地籍(批次)") != -1) {
				$(".tab5").show();
				if (!isclick) {
					$(".tab5").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("圖資查詢/全國地籍(範圍)") != -1) {
				$(".tab6").show();
				if (!isclick) {
					$(".tab6").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("圖資查詢/全國地籍") != -1) {
				$(".tab1").show();
				if (!isclick) {
					$(".tab1").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("圖資查詢/國有林事業區") != -1) {
				$(".tab2").show();
				if (!isclick) {
					$(".tab2").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("圖資查詢/保安林") != -1) {
				$(".tab3").show();
				if (!isclick) {
					$(".tab3").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("圖資查詢/其他圖資") != -1) {
				$(".tab4").show();
				if (!isclick) {
					$(".tab4").click();
					isclick = true;
				}
			}
		}
	}
	else if (p === "sys_manage")
	{
		for (var i = 0; i < access.length; i++) {
			if (access[i].indexOf("系統管理/帳號權限管理") != -1) {
				$(".tab1").show();
				if (!isclick) {
					$(".tab1").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("系統管理/系統紀錄管理") != -1) {
				$(".tab2").show();
				if (!isclick) {
					$(".tab2").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("系統管理/自訂常用查詢") != -1) {
				$(".tab3").show();
				if (!isclick) {
					$(".tab3").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("系統管理/API審核管理") != -1) {
				$(".tab4").show();
				if (!isclick) {
					$(".tab4").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("系統管理/管理圖資") != -1) {
				$(".tab5").show();
				if (!isclick) {
					$(".tab5").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("系統管理/檔案管理") != -1) {
				$(".tab6").show();
				if (!isclick) {
					$(".tab6").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("系統管理/公告管理") != -1) {
				$(".tab7").show();
				if (!isclick) {
					$(".tab7").click();
					isclick = true;
				}
			}
		}
	}
	else if (p === "ce_manage")
	{
		for (var i = 0; i < access.length; i++) {
			if (access[i].indexOf("林班釐整/釐整作業") != -1) {
				$(".tab1").show();
				if (!isclick) {
					$(".tab1").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("林班釐整/釐整紀錄") != -1) {
				$(".tab2").show();
				if (!isclick) {
					$(".tab2").click();
					isclick = true;
				}
			}
		}
	}
	else if (p === "dw_manage")
	{
		for (var i = 0; i < access.length; i++) {
			if (access[i].indexOf("下載專區/常用圖資") != -1) {
				$(".tab1").show();
				if (!isclick) {
					$(".tab1").click();
					isclick = true;
				}
			}
			else if (access[i].indexOf("下載專區/公告檔案") != -1) {
				$(".tab2").show();
				if (!isclick) {
					$(".tab2").click();
					isclick = true;
				}
			}
		}
	}
}

function tab2(p) {
	//功能頁籤
	$(".search_type." + p + " .nav-item4").on("click",function() {
		$(this).parent().children().children().removeClass("active");
		$(this).children().addClass("active"); 
		  
		for(i = 1; i < 4; i++) {
			if($(this).hasClass("tab" + i)) {
				if (i == 1) {
					$("#te_edit_manage_1").show();
					$("#te_edit_manage_2").hide();
					$("#te_edit_manage_3").hide();
				}
				else if (i == 2) {
					$("#te_edit_manage_1").hide();
					$("#te_edit_manage_2").show();
					$("#te_edit_manage_3").hide();
				}
				else if (i == 3) {
					$("#te_edit_manage_1").hide();
					$("#te_edit_manage_2").hide();
					$("#te_edit_manage_3").show();
				}
			}
		}
	});
}

function tab3(p) {
	//功能頁籤
	$(".search_type." + p + " .nav-item5").on("click",function() {
		$(this).parent().children().children().removeClass("active");
		$(this).children().addClass("active"); 
		  
		for(i = 1; i < 3; i++) {
			if($(this).hasClass("tab" + i)) {
				if (i == 1) {
					$("#te_inarea_table").show();
					$("#te_notinarea_table").hide();
					// $(".list_height_map").show();
				}
				else if (i == 2) {
					$("#te_inarea_table").hide();
					$("#te_notinarea_table").show();
					// $(".list_height_map").hide();
				}
			}
		}
	});
}

function tab4(p) {
	//功能頁籤
	$(".search_type." + p + " .nav-item6").on("click",function() {
		$(this).parent().children().children().removeClass("active");
		$(this).children().addClass("active"); 
		
		for(i = 1; i < 4; i++) {
			if($(this).hasClass("tab" + i)) {
				if (i == 1) {
					$("#te_search_tab4_1").show();
					$("#te_search_tab4_2").hide();
					$("#te_search_tab4_3").hide();
				}
				else if (i == 2) {
					$("#te_search_tab4_1").hide();
					$("#te_search_tab4_2").show();
					$("#te_search_tab4_3").hide();
				}
				else if (i == 3) {
					$("#te_search_tab4_1").hide();
					$("#te_search_tab4_2").hide();
					$("#te_search_tab4_3").show();
				}
			}
		}
	});
}
function tab5(p) {
	//功能頁籤
	$(".search_type." + p + " .nav-item7").on("click",function() {
		$(this).parent().children().children().removeClass("active");
		$(this).children().addClass("active"); 
		
		for(i = 1; i < 3; i++) {
			if($(this).hasClass("tab" + i)) {
				if (i == 1) {
					$("#ce_search_tab2_1").show();
					$("#ce_search_tab2_2").hide();
				}
				else if (i == 2) {
					$("#ce_search_tab2_1").hide();
					$("#ce_search_tab2_2").show();
				}
			}
		}
	});
}

function tab6(p) {
	//功能頁籤
	$(".search_type." + p + " .nav-item8").on("click",function() {
		$(this).parent().children().children().removeClass("active");
		$(this).children().addClass("active"); 
		
		for(i = 1; i < 3; i++) {
			if($(this).hasClass("tab" + i)) {
				if (i == 1) {
					$("#owner_1").show();
					$("#owner_2").hide();
				}
				else if (i == 2) {
					$("#owner_1").hide();
					$("#owner_2").show();
				}
			}
		}
	});
}

function tab7(p) {

}

function tab8(p) {
	//功能頁籤
	$(".search_type." + p + " .nav-item9").on("click",function(e) {
		if (e.target.type == "checkbox") return;
		
		$(this).parent().children().children().removeClass("active");
		$(this).children().addClass("active"); 
		
		for(i = 1; i < 3; i++) {
			if($(this).hasClass("tab" + i)) {
				if (i == 1) {
					$("#ca_sub_insert_tab1").show();
					$("#ca_sub_insert_tab2").hide();
					ca_insert_step1_nowprocessHide();
					ca_insert_step1_lastprocessShow();
				}
				else if (i == 2) {
					$("#ca_sub_insert_tab1").hide();
					$("#ca_sub_insert_tab2").show();
					ca_insert_step1_nowprocessShow();
					ca_insert_step1_lastprocessHide();
				}
			}
		}
	});
}

function tab9(p) {
	//功能頁籤
	$(".search_type." + p + " .nav-item9").on("click",function(e) {
		if (e.target.type == "checkbox") return;
		
		$(this).parent().children().children().removeClass("active");
		$(this).children().addClass("active"); 
		
		for(i = 1; i < 3; i++) {
			if($(this).hasClass("tab" + i)) {
				if (i == 1) {
					$("#lu_stype1").show();
					$("#lu_stype2").hide();
					lu_tab2_setType(i);
				}
				else if (i == 2) {
					$("#lu_stype1").hide();
					$("#lu_stype2").show();
					lu_tab2_setType(i);
				}
			}
		}
	});
}

function resize() {
	setTimeout(function(){ 
		map();
	}, 100);
}

function upload_result_owner() {
	$(".upload_result_owner").on("click",function(){
		$(".upload_result_owner_table").show();
	});
	
	$(".reset_result_owner").on("click",function(){
		$(".upload_result_owner_table").hide();
	});
}

// 千分位
function thousandComma(number) {
	var num = number.toString();
	var pattern = /(-?\d+)(\d{3})/;

	while (pattern.test(num)) {
		num = num.replace(pattern, "$1,$2");
	}
	return num;
}

var Logindata = null;
function LoginCheck() {
	$.ajax({
		url: ApiRequestURL + "UserAccount/GetLoginUser",
		type: "POST",
		headers: { "Authorization": 'Bearer '+ localStorage.bearer },
		error : function(err) {
			// alert("請先登入系統!");
			window.location.href = "auth_page";
		},
		success: function(data) {
			if (data && data.data) {
				if (data.data.state == "0") {
					alert("您的帳號已被停用，請聯絡管理員!");
					window.location.href = "auth_page";
				}
				else {
					$(".mainbody").show();
					$("#account_name").html(data.data.name);
					Logindata = data.data;
					IndexAccessShow();
					LogOutCount();
					sys_ann_show_get(true);
				}
			}
			else {
				// alert("請先登入系統!");
				window.location.href = "auth_page";
			}
		}
	});
}

function LogOut() {
	$.ajax({
		url: ApiRequestURL + "UserAccount/SignOut",
		type: "POST",
		headers: { "Authorization": 'Bearer '+ localStorage.bearer },
		success: function(data) {
		}
	});
	window.location.href = "auth_page";
}

function IndexAccessShow() {
	var access = Logindata.access;

	for (var i = 0; i < access.length; i++) {
		if (access[i].indexOf("圖資查詢/") != -1) {
			$(".function_bt_c").show();
			if (i == 0) $(".function_bt_c").click();
		}
		else if (access[i].indexOf("統計分析/") != -1) {
			$(".function_bt_a").show();
			if (i == 0) $(".function_bt_a").click();
		}
		else if (access[i].indexOf("林班釐整/") != -1) {
			$(".function_bt_g").show();
			if (i == 0) $(".function_bt_g").click();
		}
		else if (access[i].indexOf("異動事件管理/") != -1) {
			$(".function_bt_d").show();
			if (i == 0) $(".function_bt_d").click();
		}
		else if (access[i].indexOf("API服務/") != -1) {
			$(".function_bt_e").show();
			if (i == 0) $(".function_bt_e").click();
		}
		else if (access[i].indexOf("系統管理/") != -1) {
			$(".function_bt_f").show();
			if (i == 0) $(".function_bt_f").click();
		}
		else if (access[i].indexOf("下載專區/") != -1) {
			$(".function_bt_h").show();
			if (i == 0) $(".function_bt_h").click();
		}
	}
}
var LogOutSecond = 60 * 60; // 60分鐘
function LogOutCount() {
	var chkpt1 = 5 * 60; // 檢查點1
	var chkpt2 = 1 * 60; // 檢查點2
	
	function countdown() {
		if (LogOutSecond <= 0) {
			alert("您閒置過久，請重新登入系統!");
			LogOut();
			return;
		}
		
		// 每20分鐘KEEPALIVE 1次 直到小於20分鐘
		if ((LogOutSecond > 1200) && (LogOutSecond % 1200) == 0) {
			// 展延
			$.ajax({
				url: ApiRequestURL + "UserAccount/Refresh",
				type: "POST",
				headers: { "Authorization": 'Bearer '+ localStorage.bearer },
				success: function(data) {
				}
			});
		}
		
		var mm = Math.floor(LogOutSecond / 60);
		var ss = LogOutSecond % 60;
		
		$("#logcount").text(mm.toString().padStart(2, "0") + ":" + ss.toString().padStart(2, "0"));
		
		LogOutSecond -= 1;
		
		if (LogOutSecond == chkpt1 || LogOutSecond == chkpt2) {
			$("#logoutchkpt").empty();
			
			if (LogOutSecond == chkpt1)
				$("#logoutchkpt").append("5分鐘");
			else
				$("#logoutchkpt").append("1分鐘");
			
			$("#LogOutCheckDialog").modal("show");
		}
		
		setTimeout(function() {
			countdown();
		}, 1000);
	}
	
	countdown();
	
	$.idleTimer(360000);
	
	var last_idle;
	var last_layoutsec;
	$(document).bind("idle.idleTimer", function(e) {
		last_idle = Math.floor(Date.now() / 1000);
		last_layoutsec = LogOutSecond;
		
		console.log("last_idle:" + last_idle);
		console.log("last_layoutsec:" + last_layoutsec);
	});
	
	$(document).bind("active.idleTimer", function(e) {
		var now_idle = Math.floor(Date.now() / 1000);
		
		var ttime = now_idle - last_idle;
		LogOutSecond = last_layoutsec - ttime;
		
		console.log("now_idle:" + now_idle);
		console.log("ttime:" + ttime);
		console.log("LogOutSecond:" + LogOutSecond);
		
		if (LogOutSecond > 0) {
			extendLogOutTime();
		}
	});
}

function closeLogOutCheckDialog() {
	$("#LogOutCheckDialog").modal("hide");
}

function extendLogOutTime() {
	$.ajax({
		url: ApiRequestURL + "UserAccount/Refresh",
		type: "POST",
		headers: { "Authorization": 'Bearer '+ localStorage.bearer },
		success: function(data) {
			LogOutSecond = 60 * 60; //RefreshSession
			closeLogOutCheckDialog();
		}
	});
}

//林業管理項目
function big_window()
{
	$("#big_window").on("click",function() {
		if ($(".detail_data_map, .fc_detail_data").hasClass ("big_window")) {
			$(".detail_data_map, .fc_detail_data").removeClass("big_window");
			$(this).children(). removeClass("fa-caret-square-up").addClass("fa-caret-square-down");
		}
		else {
			$(".detail_data_map, .fc_detail_data").addClass("big_window");
			$(this).children(). removeClass("fa-caret-square-down").addClass("fa-caret-square-up");
		}
		
		if (fi_tab1 && fi_tab1.map) fi_tab1.map.updateSize();
		if (fi_tab2 && fi_tab2.map) fi_tab2.map.updateSize();
		if (fi_tab3 && fi_tab3.map) fi_tab3.map.updateSize();
	});
	
	$("#big_window2").on("click",function() {
		if ($(".detail_data_map, .fi_detail").hasClass ("big_window2")) {
			$(".detail_data_map, .fi_detail").removeClass("big_window2");
			$(".map_detail2").removeClass("big_window_map2");
			$(this).children(). removeClass("fa-caret-square-left").addClass("fa-caret-square-right");
		}
		else {
			$(".detail_data_map, .fi_detail").addClass("big_window2");
			$(".map_detail2").addClass("big_window_map2");
			$(this).children(). removeClass("fa-caret-square-right").addClass("fa-caret-square-left");
		}
		
		if (fi_tab1 && fi_tab1.map) fi_tab1.map.updateSize();
		if (fi_tab2 && fi_tab2.map) fi_tab2.map.updateSize();
		if (fi_tab3 && fi_tab3.map) fi_tab3.map.updateSize();
	});
}

//地籍總攬
function big_window_fc()
{
	$("#big_window").on("click",function() {
		
		if ($(".fc_partA,.fc_detail_data_map").hasClass ("big_window")) {
			$(".fc_partA,.fc_detail_data_map").removeClass("big_window");
			$(this).children().removeClass("fa-caret-square-up").addClass("fa-caret-square-down");
		}
		else {
			$(".fc_partA,.fc_detail_data_map").addClass("big_window");
			$(this).children().removeClass("fa-caret-square-down").addClass("fa-caret-square-up");
		}
		
		if (fc_tab1 && fc_tab1.map) fc_tab1.map.updateSize();
	});
}

function WaitingShow(show) {
	if (show) {
		$("#pleaseWaitDialog").modal("show");
	}
	else {
		setTimeout(function() {
			$("#pleaseWaitDialog").modal("hide");
		}, 900);
	}
}
//寫LOG
function AddNewLog(model, subclass, bottom) {
	var lpost = {};
	lpost.Model = model;
	lpost.SubClass = subclass;
	lpost.ButtomName = bottom;
	
	$.ajax({
		url: ApiRequestURL + "LogManagement/AddNewLog",
		type: "Post",
		data: lpost,
		success: function(data) {
			var d = data.data;
		}
	});
}
//寫下載的LOG
function AddNewDownloadLog(model, subclass, datatype, subtitle) {
	var lpost = {};
	lpost.Model = model;
	lpost.SubClass = subclass;
	lpost.DataType = datatype;
	lpost.SubTitle = subtitle;
	
	$.ajax({
		url: ApiRequestURL + "LogManagement/AddNewDownloadLog",
		type: "Post",
		data: lpost,
		success: function(data) {
			var d = data.data;
		}
	});
}
//判斷權限
function CheckUserAccess(model, subclass, buttom) {
	var str = model + '/' + subclass + '/' + buttom;
	var access = Logindata.access;
	
	if (access.indexOf(str) > -1) {
		return true;
	}
	else {
		return false;
	}
}
// 隨機顏色
function random_rgba(a) {
    var o = Math.round, r = Math.random, s = 255;
	
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + a + ')';
}
// 面積四捨五入
function areaha_abs(val) {
	var v = Math.abs(val);
	
	return v.toFixed(2);
}
// 取得最新版本文字
function getnewestversionstring() {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetLastVersion",
		type: "Post",
		success: function(data) {
			var d = data.data;
			
			$("#ver_show").text(d);
		}
	});
}
// 公告Modal
function sys_ann_show_get(isLoginCheck) {
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetAnnounShowList",
		type: "Post",
		async: false,
		success: function(data) {
			var d = data.data;
			if (d != null) {
				$("#sys_announ_show_list").empty();
				for (var i = 0; i < d.length; i++) {
					var appendtr = "";
					appendtr += "<tr class=\"align-middle\">";
					appendtr += "<td style=\"width: 120px\">" + htmlEncode(d[i].date) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].note) + "</td>";
					appendtr += "</tr>";
					
					$("#sys_announ_show_list").append(appendtr);
				}
				if (isLoginCheck && d.length > 0) {
					$("#AnnounShow").modal("show");
				}
			}
		}
	});
}
function sys_ann_show_show() {
	sys_ann_show_get();
	$("#AnnounShow").modal("show");
}
function sys_ann_show_close() {
	$("#AnnounShow").modal("hide");
}
function htmlEncode(str) {
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(str).replace(/[&<>"']/g, function (s) {
    return entityMap[s];
  });
}