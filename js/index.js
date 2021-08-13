function main(){
	 $(".function_bt div").hover(function(){		 
	     $(this).addClass("line_bottom1");        
	    },function(){			
		 $(this).removeClass("line_bottom1");		
		});	
		
		
     	
     $(".function_bt div").click(function(){		 
	     $(".line_bottom2").removeClass("line_bottom2");
	     $(this).addClass("line_bottom2");        
	    });	
		
	//預設為綜合查詢
	$(".function_bt_a").click();
		
	//功能頁面切換
	  $(".function_bt_a").on("click",function(){
		  $(".second_item").text("綜合查詢");
		  $("#main_page").empty().load("./views/cs_manage.html");
		  setTimeout(function(){
			
	   },100);
		 
	  });
	  $(".function_bt_b").on("click",function(){
		  $(".second_item").text("地籍管理");
		  $("#main_page").empty().load("./views/fc_manage.html");
		  setTimeout(function(){
			
	   },100);
	  });
	  $(".function_bt_c").on("click",function(){
		  $(".second_item").text("林業項目管理");
		  $("#main_page").empty().load("./views/fi_manage.html");
		  setTimeout(function(){
			
	   },100);
	  }); 
	  $(".function_bt_d").on("click",function(){
		  $(".second_item").text("異動事件管理");
		  $("#main_page").empty().load("./views/te_manage.html");
		  setTimeout(function(){
			
	   },100);
	  });
	  $(".function_bt_e").on("click",function(){
		  $(".second_item").text("API服務");
		  $("#main_page").empty().load("./views/api_manage.html");
		  setTimeout(function(){
			
	   },100);
	  });
	  $(".function_bt_f").on("click",function(){
		  $(".second_item").text("系統管理");
		  $("#main_page").empty().load("./views/sys_manage.html");
		  setTimeout(function(){
			
	   },100);
	  }); 
	  
	  // openlayers 註冊3826座標系統用
	  proj4.defs(
        "EPSG:3826",
        "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
      )
	  ol.proj.proj4.register(proj4);
}	  

function tab(p){
	//功能頁籤
	  $(".search_type."+p+" .nav-item2").on("click",function(){
		  $(this).parent().children().children().removeClass("active");
		  $(this).children().addClass("active");
		  
		  for(i = 1; i < 5; i++){
			  if($(this).hasClass("tab"+i)){
				  $(".tab_body_content").removeClass("active");
				  $(".tab_body_content.tab"+i).addClass("active");
			  
				  if(p === "cs_manage")
			     {
				  cs_ini_page(i);
			     }
                  else if(p === "fc_manage")
			     {
				  fc_ini_page(i);
				  
			     }	
                  else if(p === "te_manage")
			     {
				  te_ini_page(i);
				  
			     }		
                   else if(p === "fi_manage")
			     {
				  fi_ini_page(i);
				  
			     }			
                   else if(p === "api_manage")
			     {
				  api_ini_page(i);
				  
			     }
                   else if(p === "sys_manage")
			     {
				  sys_ini_page(i);
				  
			     }						 
			  }
			  
		  }

	  });	
	   $(".nav-item2.tab1").click();
}


function resize(){
	setTimeout( function(){ 
	   map();
	   }, 100);
}

function upload_result_owner(){
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
	  type: "GET",
	  headers: { "Authorization": 'Bearer '+ localStorage.bearer },
	  error : function(err) {
		alert("請先登入系統!");
		window.location.href = "auth_page.html";
	  },
	  success: function(data) {
		if (data && data.data) {
			$("#account_name").html(data.data.name);
			Logindata = data.data;
		} else {
			alert("請先登入系統!");
			window.location.href = "auth_page.html";
		}
	  }
	});
}

function LogOut() {
	$.ajax({
	  url: ApiRequestURL + "UserAccount/SignOut",
	  type: "GET",
	  headers: { "Authorization": 'Bearer '+ localStorage.bearer },
	  success: function(data) {
		window.location.href = "auth_page.html";
	  }
	});
}

//林業管理項目
function big_window()
{
	$("#big_window").on("click",function(){
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
		if (fi_tab4 && fi_tab4.map) fi_tab4.map.updateSize();
	});
}

//地籍總攬
function big_window_fc()
{
	$("#big_window").on("click",function() {
		if($(".fc_partA,.fc_detail_data_map").hasClass ("big_window")) {
		   $(".fc_partA,.fc_detail_data_map").removeClass("big_window");
		   $(this).children(). removeClass("fa-caret-square-up").addClass("fa-caret-square-down");
		}
		else {
			$(".fc_partA,.fc_detail_data_map").addClass("big_window");
			$(this).children(). removeClass("fa-caret-square-down").addClass("fa-caret-square-up");
		}
		if (fc_tab1 && fc_tab1.map) fc_tab1.map.updateSize();
	});
}

function WaitingShow(show) {
	if (show)
		$("#pleaseWaitDialog").modal("show");
	else
		$("#pleaseWaitDialog").modal("hide");
}