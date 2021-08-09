  $(document).ready(function(){
	  captcha1();
	
    function scrollToAnchor(aid,n){
    <!-- var aTag = $("a[name='"+ aid +"']"); -->
	var aTag = $("#"+ aid);
    $('html').animate({scrollTop: (aTag.offset().top)- n},'slow');
     }

	 $('#u50').click(	 
	 function(){
	 scrollToAnchor('u16',260);	 
	 }); 	
	 
     $('#u12').click(
	 function(){
	 scrollToAnchor('u60',400);
	  }); 	  


	  $("#gotop").click(function(){
        jQuery("html,body").animate({
            scrollTop:0
        },500);
    });
	
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 50){
            $('#gotop').fadeIn("fast");
			$('#banner').removeClass('top_color').addClass('below_color');

        } else {
            $('#gotop').stop().fadeOut("fast");
			$('#banner').removeClass('below_color').addClass('top_color');
        }
    });
	
	$(".topic2_bt1").click(function(){
	  $(".topic2_select").removeClass("topic2_select");
	  $(this).addClass("topic2_select");
	  $(".tab1_content1").show();
	  $(".tab1_content2").hide();
	  $(".tab1_content3").hide();
     });
	 
	 $(".topic2_bt2").click(function(){
	  $(".topic2_select").removeClass("topic2_select");
	  $(this).addClass("topic2_select");
	  $(".tab1_content2").show();
	  $(".tab1_content1").hide();
	  $(".tab1_content3").hide();
     });
	 
	 $(".topic2_bt3 ").click(function(){
	  $(".topic2_select").removeClass("topic2_select");
	  $(this).addClass("topic2_select");
	  $(".tab1_content3").show();
	  $(".tab1_content2").hide();
	  $(".tab1_content1").hide();
		
     });
	 
	 $(".more1_click1,.more1_page3").hover(function(){
		$(".topic7_img21,.topic7_img2_page3").attr("src","image/pad_5case_arrow_hover.svg"); 		 
	 },function(){
		$(".topic7_img21,.topic7_img2_page3").attr("src","image/pad_5case_arrow.svg"); 		 
	 });
	 
	 $(".more1_click2,.more1_page3").hover(function(){
		$(".topic7_img22,.topic7_img2_page3").attr("src","image/pad_5case_arrow_hover.svg"); 		 
	 },function(){
		$(".topic7_img22,.topic7_img2_page3").attr("src","image/pad_5case_arrow.svg"); 		 
	 });
	 
	 $(".more1_click3,.more1_page3").hover(function(){
		$(".topic7_img23,.topic7_img2_page3").attr("src","image/pad_5case_arrow_hover.svg"); 		 
	 },function(){
		$(".topic7_img23,.topic7_img2_page3").attr("src","image/pad_5case_arrow.svg"); 		 
	 });
	 
	 
	
	$(".footer_icon1").hover(function(){
		$(this).attr("src","image/7footer_fb_hover.svg"); 		 
	 },function(){
		$(this).attr("src","image/7footer_fb.svg"); 		 
	 });
	
	$(".footer_icon2").hover(function(){
		$(this).attr("src","image/7footer_twitter_hover.svg"); 		 
	 },function(){
		$(this).attr("src","image/7footer_twitter.svg"); 		 
	 });
	 
	 $(".footer_icon3").hover(function(){
		$(this).attr("src","image/7footer_youtube_hover.svg"); 		 
	 },function(){
		$(this).attr("src","image/7footer_youtube.svg"); 		 
	 });
	 
	 $(".footer_icon4").hover(function(){
		$(this).attr("src","image/7footer_linkedin_hover.svg"); 		 
	 },function(){
		$(this).attr("src","image/7footer_linkedin.svg"); 		 
	 });
	 
	 $(".funbt1").hover(function(){		 
	     $(this).addClass("line_bottom1");        
	    },function(){
		 $(this).removeClass("line_bottom1");		
		});	 

		$(".funbt1").hover(function(){		 
	     $(this).addClass("line_bottom1");        
	    },function(){			
		 $(this).removeClass("line_bottom1");		
		});	
     	
     $(".funbt1").click(function(){		 
	     $(".line_bottom1").addClass("line_bottom1");
	     $(this).addClass("line_bottom1");        
	    });			
		
	function text1(){
		 $("#contact_page").hide();
		 $("#page1").hide();
		 $("#page2").hide();
		 $("#page3").hide();
		 $("#page4").hide();
		 $("#page5").show();		 
		 $(".line_bottom2").removeClass("line_bottom2");	
		 $(".banner").removeClass("below_color2");		
		 $(".banner_text1").addClass("line_bottom2");  
		 $(".banner").addClass("below_color2");
		 page5_show();
		 $(".topic11_container3_img1").click();		 
		 $(".side_list1_step1").click();
		 $(".footer_img").removeClass("contactnow_footer");
		 $(".footer_img_pad").removeClass("contactnow_footer");
		 $(".footer_img").css("top","2303px");
		 $(".footer_img_pad").css("top","2303px");
		 $(".footer_img_mobile").css("top","1525px");
		 $("#page1_footer").css("top","-1665px");
		 $("#page2_footer").css("top","-1665px");
		 $("#page3_footer").css("top","-2440px");
		 
	 }
	 
	 function text2(){
		  $("#contact_page").hide();
		 $("#page1").hide();
		 $("#page3").hide();
		 $("#page4").hide();
		 $("#page5").hide();
		 $("#page2").show();		 
		 $(".line_bottom2").removeClass("line_bottom2");	
		 $(".banner").removeClass("below_color2");		
		 $(".banner_text2").addClass("line_bottom2");  
		 $(".banner").addClass("below_color2");
		 $(".footer_img").removeClass("contactnow_footer");
		 $(".footer_img_pad").removeClass("contactnow_footer");
		 $(".footer_img").css("top","689px");
		 $(".footer_img_pad").css("top","1367px");
		 $(".footer_img_mobile").css("top","1060px");
		 $("#page1_footer").css("top","-3308px");
		 $("#page2_footer").css("top","-2660px");
		 $("#page3_footer").css("top","-2953px");
		 top();
	 }
	 
	 function text3(){
		 $("#contact_page").hide();
		 $("#page1").hide();
		 $("#page2").hide();
		 $("#page4").hide();
		 $("#page5").hide();
		 $("#page3").show();
		 $(".line_bottom2").removeClass("line_bottom2");	
		 $(".banner").removeClass("below_color2");				 
		 $(".banner_text3").addClass("line_bottom2");  
		 $(".banner").addClass("below_color2");
		 $(".footer_img").removeClass("contactnow_footer");
		 $(".footer_img_pad").removeClass("contactnow_footer");
		 $(".footer_img").css("top","1494px");
		 $(".footer_img_pad").css("top","1880px");
		 $(".footer_img_mobile").css("top","1369px");
		 $("#page1_footer").css("top","-3700px");
		  $("#page2_footer").css("top","-3709px");
		  $("#page3_footer").css("top","-3735px");
		 top();
	 }
		
	 $(".banner_text1").click(function(){
		 text1();
		 });	 		
     $(".banner_text2").click(function(){
		 text2();
		 });	 	 
	 $(".banner_text3").click(function(){
		 text3();
		 });
	 
	 $(".more1_click").click(function(){
		 $("#contact_page").hide();
		 $("#page1").hide();
		 $("#page2").hide();
		 $("#page3").hide();
		 $("#page5").hide();
		 $("#page4").show();
		 $(".line_bottom2").removeClass("line_bottom2");	
		 $(".banner").removeClass("below_color2");				 		 
		 $(".banner").addClass("below_color2");
		 $(".footer_img").removeClass("contactnow_footer");
		 $(".footer_img_pad").removeClass("contactnow_footer");
		 $(".footer_img").css("top","1907px");
		 $(".footer_img_pad").css("top","1975px");
		 $(".footer_img_mobile").css("top","2080px");
		 $("#page1_footer").css("top","-2114px");
		 $("#page2_footer").css("top","-2040px");
		 $("#page3_footer").css("top","-1958px");
		 top();
	 });
	 
	 $(".more1_click1").click(function(){
		 window.open("https://www.supergeotek.com/tw/index.php/aipoisition/");
		 
	 });
	 
	  $(".more1_click2").click(function(){
		 window.open("https://aihub.org.tw/ai_case/3021de70c05799091677f63c078b6b8a");
		 
	 });
	 
	  $(".more1_click3").click(function(){
		 window.open("https://ai.cisanet.org.tw/casecontent.php?id=145");
		 
	 });
	 
	 $(".Web_Logo").click(function(){
		 $("#contact_page").hide();
		 $("#page2").hide();
		 $("#page3").hide();
		 $("#page4").hide();
		 $("#page5").hide();
		 $("#page1").show();
         $(".line_bottom2").removeClass("line_bottom2");	
		 $(".banner").removeClass("below_color2");		
		 $(".footer_img").removeClass("contactnow_footer");
		 $(".footer_img_pad").removeClass("contactnow_footer");
		 $(".footer_img").css("top","4488px"); 
		 $(".footer_img_pad").css("top","7131px");
		 $(".footer_img_mobile").css("top","5628px");
		 $("#page1_footer").css("top","");
		 $("#page2_footer").css("top","");
		 $("#page3_footer").css("top","");
         top();
		 $(".close").click();
	 });
	 
	 $(".contactnow").click(function(){
		 window.open("https://www.supergeotek.com/tw/index.php/contact_us/","_blank")
		 // contact_page();
		 // $(".line_bottom2").removeClass("line_bottom2");	
		 // $(".banner").removeClass("below_color2");				 		 
		 // $(".banner").addClass("below_color2");
		 // $(".footer_img").addClass("contactnow_footer");
		 // $(".footer_img_pad").css("top","1604px");
		 // $(".footer_img_mobile").css("top","1366px");
		 // $("#page1_footer").css("top","-2870px");
		 // $("#page2_footer").css("top","-2364px");
		 // $("#page3_footer").css("top","-2600px");
		 // top();
		 // $(".close").click();
		 
	 });
	 
	  $(".tryitnow").click(function(){
		 contact_page();
		 $(".line_bottom2").removeClass("line_bottom2");	
		 $(".banner").removeClass("below_color2");				 		 
		 $(".banner").addClass("below_color2");
		 $(".footer_img").addClass("contactnow_footer");
		 $(".footer_img_pad").css("top","1604px");
		 $(".footer_img_mobile").css("top","1366px");
		 $("#page1_footer").css("top","-2870px");
		 $("#page2_footer").css("top","-2364px");
		 $("#page3_footer").css("top","-2600px");
		 top();
		 $(".close").click();
		 
	 });
	 
	 $(".side_list1_step1").click(function(){
		  list1();		 		
	 });
	  $(".side_list1_step2").click(function(){
		  list2();				
	 });
	  $(".side_list1_step3").click(function(){
		  list3();		  
	 });
	 
	 $(".topic11_container3_img1").click(function(){
		$(".topic11_container3_img1").attr("src","image/1standardization_column_selected.svg"); 		 
		$(".topic11_container3_img2").attr("src","image/1standardization_verify.svg"); 
		$(".topic11_container3_img3").attr("src","image/1standardization_format.svg");  
		
		$(".topic11_box_content1").show();
		$(".topic11_box_content2").hide();
		$(".topic11_box_content3").hide();
	 });
	  $(".topic11_container3_img2").click(function(){
		$(".topic11_container3_img1").attr("src","image/1standardization_column_unselected.svg"); 		 
		$(".topic11_container3_img2").attr("src","image/1standardization_verify_selected.svg"); 
		$(".topic11_container3_img3").attr("src","image/1standardization_format.svg");  
		
		$(".topic11_box_content2").show();
		$(".topic11_box_content1").hide();
		$(".topic11_box_content3").hide();
	 });
	  $(".topic11_container3_img3").click(function(){
		$(".topic11_container3_img1").attr("src","image/1standardization_column_unselected.svg"); 		 
		$(".topic11_container3_img2").attr("src","image/1standardization_verify.svg"); 
		$(".topic11_container3_img3").attr("src","image/1standardization_format_selected.svg"); 	
 		
		$(".topic11_box_content3").show();
		$(".topic11_box_content2").hide();
		$(".topic11_box_content1").hide();
	 });
	 
	 $(".usenow").click(function(){
		 window.open("https://42.supergeo.com.tw/address/");
		 
	 });
	 
	 $(".fb").click(function(){
		 window.open("https://www.facebook.com/supergeotw/");
		 
	 });
	 
	 $(".twitter").click(function(){
		 window.open("https://twitter.com/supergeotek");
		 
	 });
	 
	 $(".youtube").click(function(){
		 window.open("https://www.youtube.com/user/supergeotv/playlists");
		 
	 });
	 
	 $(".linkedin").click(function(){
		 window.open("https://www.linkedin.com/company/supergeo-technologies");
		 
	 });
	 
	 
	 
	 
		
	function top(){
		jQuery("html,body").animate({
         scrollTop:0
        },500);		
	}
	
	function list1(){
		jQuery("html,body").animate({
         scrollTop:0
        },500);		
	}
	
	function list2(){
		jQuery("html,body").animate({
         scrollTop: $(".list1_step2_background").prop("scrollHeight")
        },500);		
	}
	
	function list3(){
		jQuery("html,body").animate({
         scrollTop:1515
        },500);		
	}
	function page5_show(){
		let step1 = $("#topic11_pin1").offset().top;
		let step2 = $(".list1_step2_background").offset().top;
		
		$(window).scroll(function() {			
        if ( $(this).scrollTop() == 0 || $(this).scrollTop() < step1){
         $(".side_list1_step").removeClass("side_list1_focus");
		 $(".side_list1_step").children("img").attr("src","image/anchor_unselected.svg");
		 $(".side_list1_step1").addClass("side_list1_focus").children("img").attr("src","image/anchor_selected.svg");
		}
		else if ( $(this).scrollTop() > step1 && $(this).scrollTop() < step2){
         $(".side_list1_step").removeClass("side_list1_focus");
		 $(".side_list1_step").children("img").attr("src","image/anchor_unselected.svg");
		 $(".side_list1_step2").addClass("side_list1_focus").children("img").attr("src","image/anchor_selected.svg");
		}
		else if ( $(this).scrollTop() > step2 && $(this).scrollTop() < $("footer").prop("scrollHeight")){
           $(".side_list1_step").removeClass("side_list1_focus");
		  $(".side_list1_step").children("img").attr("src","image/anchor_unselected.svg");
		  $(".side_list1_step3").addClass("side_list1_focus").children("img").attr("src","image/anchor_selected.svg");
			
        } 
		else {
           $(".side_list1_step").removeClass("side_list1_focus");
		  $(".side_list1_step").children("img").attr("src","image/anchor_unselected.svg");
		  $(".side_list1_step3").addClass("side_list1_focus").children("img").attr("src","image/anchor_selected.svg");
			
        } 

    });
	}
	
	$(".link1").click(function(){
		text1(); 
		$(".close").click();
		});
	$(".link2").click(function(){
		text2(); 
		$(".close").click();
		}
		);
	$(".link3").click(function(){
		text3(); 
		$(".close").click();
		});
	$(".link4").click(function(){
	window.open("https://www.supergeotek.com/tw/index.php/company_profile-2/","_blank");}
		 );
	$(".link5").click();
	
	$(".open").click(function(){
		$(".banner_pad").show().addClass("trans");
		$(".banner").addClass("trans");
		$(".open").hide();
		$(".close").show();
	});
	
	$(".close").click(function(){
		$(".banner_pad").hide().removeClass("trans");
		$(".banner").removeClass("trans");
		$(".open").show();
		$(".close").hide();
	});
	
	function contact_page(){
		$("#page1").hide();
		$("#page2").hide();
		$("#page3").hide();
		$("#page4").hide();
		$("#page5").hide();
		$("#contact_page").show();
		
	}
	
	function captcha1(){
	 let captcha1 = new CaptchaMini({
        lineWidth: 1,   //线条宽度
        lineNum: 6,       //线条数量
        dotR: 2,          //点的半径
        dotNum: 25,       //点的数量
        preGroundColor: [10, 80],    //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 60,           //字体大小
        fontFamily: ['Microsoft JhengHei'],  //字体类型
        fontStyle: 'fill',      //字体绘制方法，有fill和stroke
        content: 'abcdefghijklmnopqrstuvwxyz',  //验证码内容
        length: 4   //验证码长度
    });
    captcha1.draw(document.querySelector('#captcha1'), r => {
	$(".captcha_a").val(r)});	
	}
	
	$(".captcha1_icon").click(function(){
		captcha1();		
	});
	
	$(".contact_page_bt1").on("click",function(){
		if($(".captcha").val() === $(".captcha_a").val()){
		$(".contact_page_bt1").attr("value","處理中...");	
		var data = {};
        
		data["userName"] = $("input[name='name']").val();
		data["password"] = $("input[name='password']").val();
		data["email"] = $("input[name='email']").val();
		data["userName"] = $("input[name='name']").val();
		data["companyName"] = $("input[name='company']").val();
		data["unitName"] = $("input[name='job_title']").val();
		data["tel"] = $("input[name='phone']").val();
		data["usage"] = $("input[name='note']").val();
				
		$.ajax({
		   url:"https://42.supergeo.com.tw/Address/Api/Apply",
		   method:"GET",
	       dataType:"json",
		   data:data,
		   
		   success:function(res){
			   if(res.Status === "OK"){
				   alert("申請成功!");
				   $(".contact_page_bt1").attr("value","送出");	
				   
				   setTimeout(function(){
					   $(".Web_Logo").click();
				   },100);
			   }
			   else if(res.Status === "Error"){
				    alert(res.Message);
					$(".contact_page_bt1").attr("value","送出");
			   }
			   			   
			   },		   
           error:function(err){
			   console.log(err)},
	   });
						
		}
		else{
			alert("驗證失敗");
		}
	});
	
	$("#emailCheck_bt").on("click",function(){
	   $(".ckResult").text("");
	   $("input[name='email']").css("border-color","black")
       var email = $("input[name='email']").val();
	   
	   $.ajax({
		   url:"https://42.supergeo.com.tw/Address/Api/EmailOK",
		   method:"GET",
	       dataType:"json",
		   data:"email="+ email,
		   
		   success:function(res){
			   if(res.Message === "Email 可用"){
				   $("input[name='email']").css("border-color","#77b419")
				   $(".ckResult").text("可註冊!");
			   }
			   else if(res.Message === "Email 已存在"){
				   $("input[name='email']").css("border-color","red");
				   $(".ckResult").text("已存在!");
			   }
			   else if(res.Message === "Email 格式有問題"){
				   $("input[name='email']").css("border-color","red");
				   $(".ckResult").text("格式有誤!");
			   }
			   
			   },		   
           error:function(err){
			   console.log(err)},
	   });
	});
	
	$("#emailCheck_bt").on("click",function(){
		
		
		
	});
	
	
  });
  