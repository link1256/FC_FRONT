  //地籍管理-功能頁籤
	  $("search_type.fc_manage").children().on("click",function(){
		  $(this).parent().children().removeClass("active");
		  $(this).addClass("active");
		  
	  });