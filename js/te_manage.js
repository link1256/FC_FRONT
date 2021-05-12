
function te_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab"+i).load("./views/te_manage_tab"+i+".html"); 
	
	
}

//子功能頁籤
function step_tab()
{
	$(".te_manage_tab2 .nav-item3").on("click",function(){
		 		  
		  for(j = 1; j < 4; j++){
			  if($(this).hasClass("tab"+j)){
				  if(j==1){				
					  create_step(2,j);						  
				  }
				  else if(j==2){
	
					  create_step(2,j);
				  }
				  else if(j==3){
                      create_step(2,j);
				  }				 
			  }
		  }		  
		  $(this).parent().children().removeClass("active");
		  $(this).addClass("active");
	  });		
}

function create_step(i,j)
{
	$("#te_step").empty();
	$("#te_step").load("./views/te_manage_tab"+i+"_step"+j+".html"); 
}

function checkSentApply(){
	if($("#te_data_basic_state").hasClass("state_type1")){
		$(".manage_bt_area").show();		
	}
	else {
		$(".manage_bt_area").hide();
	}
}

function loadDetialData(id){
	/* 先塞測試用資料，需要改寫 */
	//讀取資料
	switch (id){
		case "item1":		
		$(".data_frame").empty().load("./views/detail_data_temp.html"); //模板
		
		setTimeout(function(){
		//狀態
		$("#te_data_basic_state").addClass("state_type1").text("未送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510001");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	        "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item2":
		$(".data_frame").empty().load("./views/detail_data_temp.html");
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type1").text("未送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510002");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	      "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item3":
		$(".data_frame").empty().load("./views/detail_data_temp.html");
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type2").text("已送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510003");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	       "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item4":
		$(".data_frame").empty().load("./views/detail_data_temp.html");
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type1").text("未送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510004");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	       "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item5":
		$(".data_frame").empty().load("./views/detail_data_temp.html");
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type3").text("已完成");
	    //識別碼
		$("#te_data_basic_uid").text("1100510005");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	        "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item6":
		$(".data_frame").empty().load("./views/detail_data_temp.html");
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type2").text("已送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510006");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	        "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
	}
}

function loadListData(id){
	/* 先塞測試用資料，需要改寫 */
	//讀取資料
	switch (id){
		case "item1":		
		$(".list_frame").empty().load("./views/list_data_temp.html"); //模板
		
		setTimeout(function(){
		//狀態
		$("#te_data_basic_state").addClass("state_type1").text("未送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510001");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	       "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item2":
		$(".list_frame").empty().load("./views/list_data_temp.html"); //模板
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type1").text("未送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510002");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	       "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item3":
		$(".list_frame").empty().load("./views/list_data_temp.html"); //模板
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type2").text("已送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510003");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	      "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item4":
		$(".list_frame").empty().load("./views/list_data_temp.html"); //模板
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type1").text("未送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510004");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	       "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item5":
		$(".list_frame").empty().load("./views/list_data_temp.html"); //模板
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type3").text("已完成");
	    //識別碼
		$("#te_data_basic_uid").text("1100510005");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	       "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
		
		case "item6":
		$(".list_frame").empty().load("./views/list_data_temp.html"); //模板
		setTimeout(function(){
			//狀態
		$("#te_data_basic_state").addClass("state_type2").text("已送審");
	    //識別碼
		$("#te_data_basic_uid").text("1100510006");
		//建立者
		$("#te_data_basic_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	      "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete'>刪除</button>"+
	      "</div>"
						
		  $("#file_list").append(item);	
		}			
		},50);
				
		break;
	}
}