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
		  for(i = 1; i < 5; i++){
			  if($(this).hasClass("tab"+i)){
				  $(".tab_body_content").removeClass("active");
				  $(".tab_body_content.tab"+i).addClass("active");
				  resize();
			  }
		  }

	  });
	
}

function upload_tab(){
	//上傳進度頁籤
	 
	
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

function city_result(){
	let y = document.getElementById("ver_year1").value;
	let m = document.getElementById("ver_month1").value;
	
	if(y == 0 || m == 0){
		alert("請選擇版次!");
		return;
	}
	$("#city_list").show();
	let t = document.getElementById("city_result");
	let c = ["台北市","新北市","桃園市","台中市","台南市","高雄市","基隆市","新竹市","嘉義市","新竹縣","苗栗縣","彰化縣","雲林縣","嘉義縣","屏東縣","南投縣","宜蘭縣","花蓮縣","台東縣","澎湖縣","金門縣","連江縣"];
    $(t).empty();
	for( i=0 ; i < 22; i++ ){
		let p = "<tr class='align-middle'>" +
		"<td>"+ (i + 1) + "</td>" +
		"<td>"+ c[i] +"</td>" +
		"<td>0</td>" +
		"<td>尚未執行</td>" +
		"<td></td></tr>"
		$(t).append(p);
	}
}

function new_city_result(){
	let y = document.getElementById("ver_year2").value;
	let m = document.getElementById("ver_month2").value;
	
	if(y == 0 || m == 0){
		alert("請選擇版次!");
		return;
	}
	
}