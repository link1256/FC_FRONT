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
	
	$(".function_bt_a").click();
	
	$(".search_a .nav-item > .nav-link").click(function(){
		$(".search_a .nav-item > .nav-link.active").removeClass("active");
		$(".search_sub1_content .tab-pane.active").removeClass("active");
		
		if($(this).hasClass("search_a_a")){
			$(".search_a_a").addClass("active");
		}
		if($(this).hasClass("search_a_b")){
			$(".search_a_b").addClass("active");
		}
		
	});
	
	$(".search_b .nav-item > .nav-link").click(function(){
		$(".search_b .nav-item > .nav-link.active").removeClass("active");
		$(".search_sub2_content .tab-pane.active").removeClass("active");
		
		if($(this).hasClass("search_b_a")){
			$(".search_b_a").addClass("active");
		}
		if($(this).hasClass("search_b_b")){
			$(".search_b_b").addClass("active");
		}
		if($(this).hasClass("search_b_c")){
			$(".search_b_c").addClass("active");
		}		
	});
	
	$(".search_type  .nav-item > .nav-link").click(function(){
		$(".search_type  .nav-item > .nav-link").removeClass("active");
		$(".main_tab").removeClass("active");
		if($(this).hasClass("search_a")){
			$(".search_a").addClass("active");
			$(".result_list").hide();
		}
		if($(this).hasClass("search_b")){
			$(".search_b").addClass("active");
			$(".result_list").show();
		}
	});
	
	$(".result_item").click(function(){
		$(".result_item").removeClass("select");
		$(this).addClass("select");
		$(".main_map").addClass("small_map");
		$(".main_detail").show();
	});
	
	$(".list_up").click(function(){
		
		if($(".fa-angle-up").hasClass("icon_hide")){
			$(".fa-angle-up").removeClass("icon_hide");
			$(".fa-angle-down").addClass("icon_hide");
			$(".result_list_content").removeClass("full_list_item");
			$(".result_list").removeClass("full_list");
		}
		else{
			$(".fa-angle-down").removeClass("icon_hide");
			$(".fa-angle-up").addClass("icon_hide");
			$(".result_list_content").addClass("full_list_item");
			$(".result_list").addClass("full_list");
		}
	});
	
	$(".search_b_bt").click(function(){
		$(".demo").show();
		$("#result_list_sum").text("10");
	});
	
	$(".search_b_reset_bt").click(function(){
		$(".demo").hide();
		$("#result_list_sum").text("0");
		$(".small_map").removeClass("small_map");
		$(".main_detail").hide();
	});
	
	//功能頁面切換
	  $(".function_bt_a").on("click",function(){
		  $("#main_page").empty().load("./views/cs_manage.html");
		  setTimeout(function(){
			map();
	   },100);
		 
	  });
	  $(".function_bt_b").on("click",function(){
		  $("#main_page").empty().load("./views/fc_manage.html");
		  setTimeout(function(){
			
	   },100);
	  });
	  $(".function_bt_c").on("click",function(){
		  $("#main_page").empty().load("./views/fi_manage.html");
		  setTimeout(function(){
			
	   },100);
	  }); 
	  $(".function_bt_d").on("click",function(){
		  $("#main_page").empty().load("./views/te_manage.html");
		  setTimeout(function(){
			
	   },100);
	  });
	  $(".function_bt_e").on("click",function(){
		  $("#main_page").empty().load("./views/api_manage.html");
		  setTimeout(function(){
			
	   },100);
	  });
	  $(".function_bt_f").on("click",function(){
		  $("#main_page").empty().load("./views/sys_manage.html");
		  setTimeout(function(){
			
	   },100);
	  }); 
	
}
     