function api_ini_page(i)
{
	$(".tab_body_content").empty();
	$(".tab_body_content.tab"+i).load("./views/api_manage_tab"+i+".html"); 
	
	
}