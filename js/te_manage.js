
function te_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab"+i).load("./views/te_manage_tab"+i+".html"); 
	
	
}

//子功能頁籤
function step_tab()
{
	$(".te_manage_tab2 .nav-item3:not(.active)").on("click",function(){
		 		  
		  for(j = 1; j < 4; j++){
			  if($(this).hasClass("tab"+j)){
				  if(j==1){
					  if($(this).parent().find(".active").hasClass("tab2")){
						  return;
					  }
					  else{
						  create_step(2,j);	
					  }
					  				  
				  }
				  else if(j==2){
					  if($(this).parent().find(".active").hasClass("tab2")){
						  return;
					  }
					  else{
						  if($(this).parent().find(".active").hasClass("tab3")){
							create_step(2,j);  
						  }
						  else{
							   if(confirm("是否建立新異動?")){
			                create_step(2,j);
						
		                  }
				          else{
					           return;
				              }
						  }						 		
					  }                 			  
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
		//所屬單位	
		$("#te_data_basic_deptart").text("新竹林區管理處");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//最後編輯者
		$("#te_data_basic_createuser").text("測試者1");
		//最後編輯時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
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
		//所屬單位	
		$("#te_data_basic_deptart").text("新竹林區管理處");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//最後編輯者
		$("#te_data_basic_createuser").text("測試者1");
		//最後編輯時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
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
		//所屬單位	
		$("#te_data_basic_deptart").text("新竹林區管理處");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//最後編輯者
		$("#te_data_basic_createuser").text("測試者1");
		//最後編輯時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
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
		//所屬單位	
		$("#te_data_basic_deptart").text("新竹林區管理處");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//最後編輯者
		$("#te_data_basic_createuser").text("測試者1");
		//最後編輯時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
		//附件列表
		var list_length = 2;
		for(i=0; i< list_length; i++){
		  var item =
		  "<div class='file_list_item'>"+
	       "<a href=''><i class='fas fa-file-alt'></i>"+ "測試檔案" + i +"</a>"+
		  "<button type='button' class='btn btn-danger file_list_item_delete '>刪除</button>"+
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
		//所屬單位	
		$("#te_data_basic_deptart").text("新竹林區管理處");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//最後編輯者
		$("#te_data_basic_createuser").text("測試者1");
		//最後編輯時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
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
		//所屬單位	
		$("#te_data_basic_deptart").text("新竹林區管理處");
		//標題
		$("#te_data_basic_title").val("");
		//說明
		$("#te_data_basic_note").val("");
		//最後編輯者
		$("#te_data_basic_createuser").text("測試者1");
		//最後編輯時間
		$("#te_data_basic_createtime").text("2021/05/10 22:00");
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

function loadListData(fmtid){
	/* 先塞測試用資料，需要改寫 */
	//讀取RELATION資料
		
		$(".list_frame").empty().load("./views/list_data_temp.html"); //模板
		
		let type1 = "國有林事業區";
		let type2 = "保安林";
		
		let edit_type1 = "新增";
		let edit_type2 = "編修";
		let edit_type3 = "刪除";

		setTimeout(function(){
			
		var rows;      
		var FM_ID;
		
		for(i=1;i < 4;i++){
			FM_ID = 'FM'+i;
		if(i==3){
			rows = "<tr id='"+ FM_ID +"'><td>"+ i +"</td>" +
	           "<td class='typeid'>"+ type1 +"</td>" +
		       "<td>"+ edit_type3 +"</td>"+
	           "<td><button type='button' class='btn btn-danger search_submit custom_bt3 manage_bt_area' onclick='doRemove("+ FM_ID +")'>移除</button></td></tr>";
             $("#list_table").append(rows);	
		}
		else{
			rows = "<tr id='"+ FM_ID +"'><td>"+ i +"</td>" +
	            "<td class='typeid'>"+ type1 +"</td>" +
		       "<td>"+ edit_type2 +"</td>"+
	           "<td><button type='button' class='btn btn-warning search_submit custom_bt3 manage_bt_area' onclick='doEdit("+ FM_ID +")'>編輯</button></td></tr>";
           $("#list_table").append(rows);	
		}
		
		}
		
		for(i=4;i < 7;i++){
			FM_ID = 'FM'+i;
		if(i==6){
			rows = "<tr id='"+ FM_ID +"'><td>"+ i +"</td>" +
	           "<td class='typeid'>"+ type2 +"</td>" +
		       "<td>"+ edit_type3 +"</td>"+
	           "<td><button type='button' class='btn btn-danger search_submit custom_bt3 manage_bt_area' onclick='doRemove("+ FM_ID +")'>移除</button></td></tr>";
             $("#list_table").append(rows);	
		}
		
		else{
			rows = "<tr id='"+ FM_ID +"'><td>"+ i +"</td>" +
	            "<td class='typeid'>"+ type2 +"</td>" +
		       "<td>"+ edit_type2 +"</td>"+
	           "<td><button type='button' class='btn btn-warning search_submit custom_bt3 manage_bt_area' onclick='doEdit("+ FM_ID +")'>編輯</button></td></tr>";
           $("#list_table").append(rows);	
		}
		}
		
		
		$("#list_table tr").on("click",function(){
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
	 	
        });
		
		//圖資列表點擊事件
		$("#list_table tr").on("click",function(){
			let fmid = $(this).attr('id');
			let typeid = $(this).find(".typeid").text();
			FM_detail(typeid,fmid);
		});
			
		},50);
				
}

function newApplyDetail(){
	    //建立者
		$("#te_data_basic_new_createuser").text("測試者1");
		//建立時間
		$("#te_data_basic_new_createtime").text("2021/05/13 11:00");
		//所屬單位	
		$("#te_data_basic_new_deptart").text("新竹林區管理處");
}

function FM_detail(typeid,fmid)//圖資屬性資料
{
	$("#list_detail").empty();
	//資料分成國有林事業區及保安林
	if(typeid === "國有林事業區"){
		let detail;
		detail = "<div></div>";
		
		
		
		
		
		
		$("#list_detail").append("<div>test1"+ fmid +"</div>");
		
	}
	else{
		$("#list_detail").append("<div>test2"+ fmid +"</div>");
	}
	
}

function doCreate()//新增圖資
{
	
}

function doEdit(fmid)//編輯圖資
{
	
}

function doRemove(fmid)//移除待異動圖資
{
	confirm("確定要移除本項異動?");
}