tab("te_manage");
	 te_ini_drop();
	 $(document).ready(function(){
		var widthOfList = function(){
			var itemsWidth = 0;
			$('.navlist li').each(function(){
				var itemWidth = $(this).outerWidth();
				itemsWidth += itemWidth;
			});
			return itemsWidth;
		};

		var widthOfHidden = function(){
			var ww = 0 - $('.wrapper').outerWidth();
			var hw = (($('.wrapper').outerWidth()) - widthOfList() - getLeftPosi()) - 40;
			var rp = $(document).width() - ($('.navlist li').last().offset().left + $('.navlist li').last().outerWidth());
			
			if(ww > hw) {
				return (rp > ww ? rp : ww);
			}
			else {
				return (rp > hw ? rp : hw);
			}
		};

		var getLeftPosi = function(){
			var ww = 0 - $('.wrapper').outerWidth();
			var lp = $('.navlist').position().left;
			
			if(ww > lp) {
				return ww;
			}
			else {
				return lp;
			}
		};

		var reAdjust = function(){
			// check right pos of last nav item
			var rp = $(document).width() - ($('.navlist li').last().offset().left + $('.navlist li').last().outerWidth());
			if (($('.wrapper').outerWidth()) < widthOfList() && (rp<0)) {
				$('.scroller-right').show().css('display', 'flex');
			}
			else {
				$('.scroller-right').hide();
			}

			if (getLeftPosi()<0) {
				$('.scroller-left').show().css('display', 'flex');
			}
			else {
				$('.item').animate({left: "-=" + getLeftPosi() + "px"}, 'slow');
				$('.scroller-left').hide();
			}
		}

		reAdjust();

		$(window).on('resize',function(e){  
			reAdjust();
		});

		$('.scroller-right').click(function() {
			$('.scroller-left').fadeIn('slow');
			$('.scroller-right').fadeOut('slow');

			$('.navlist').animate({left:"+=" + widthOfHidden() + "px"}, 'slow',function(){
				reAdjust();
			});
		});

		$('.scroller-left').click(function() {
			$('.scroller-right').fadeIn('slow');
			$('.scroller-left').fadeOut('slow');
		  
			$('.navlist').animate({left:"-=" + getLeftPosi() + "px"}, 'slow',function(){
				reAdjust();
			});
		});
	});
	
	upload_result_owner();
	searchlistinit(); //初始化林區管理處選項
