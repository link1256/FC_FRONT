$(".te_tab_list tr").on("click",function(){
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
	});
	te_manage_get_yearlist();
	// get_te_tab3_manage();
