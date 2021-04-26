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
		} else {
			debugger;
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