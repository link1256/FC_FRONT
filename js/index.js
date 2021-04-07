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
			map();
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

function tab(){
	//功能頁籤
	  $(".search_type.fc_manage .nav-item2").on("click",function(){
		  $(this).parent().children().children().removeClass("active");
		  $(this).children().addClass("active");
		  for(i = 1; i < 4; i++){
			  if($(this).hasClass("tab"+i)){
				  $(".tab_body_content").removeClass("active");
				  $(".tab_body_content.tab"+i).addClass("active");
				  resize();
			  }
		  }

	  });
	
}

function resize(){
	setTimeout( function(){ 
	   map();
	   }, 100);
}
     