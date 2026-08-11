var entext;
function captcha1() 
{
	var post = {};
	post.getNewImg = "1";
	
	$.post(ApiRequestURL + "UserAccount/VerifyCaptcha", post)
		.done(function(data) {
			var d = data.data;
			if (d)
			{
				document.getElementById('captcha1').src = d.cpatchImg;
				entext = d.enyText;
			}
		});
}

function ini_login(){
	$(".captcha1_icon").click(function () {
        captcha1();
    });
	$("#refreshcapt").click(function () {
        captcha1();
    });
    $(".login_submit").click(function () {
		LoginCheck();
    });
	$(".login_submit2").click(function () {
		window.location.href = "https://eipdmzsso.forest.gov.tw/?app_id=345040000G000_9216";
    });
	$('#rescaptcha').on('keydown', function (e) {
	  if (e.key === 'Enter') {
		LoginCheck();
	  }
	})
	GetVersion();
}
function GetVersion() {
	var post = {};
	$.post(ApiRequestURL + "UserAccount/GetVersion", post)
		.done(function(data) {
			if (data && data.data)
			{
				$('#sversion').empty();
				$('#sversion').append('系統版本：' + data.data);
			}
		});
}
function logintypechange() {
	var val = $('input:radio[name="type"]:checked').val();
	
	if (val == "2")
	{
		$("#unit_show").show();
	}
	else
	{
		$("#unit_show").hide();
	}
}
var ischecking = false;
function LoginCheck()
{
	if (ischecking) return;
	
	var post = {};
	post.account = $("#account").val();
	post.password = $("#password").val();
	post.inputTest = $("#rescaptcha").val();
	post.enyText = entext;
	
	if (!post.account) {
		alert('請輸入帳號!');
		return;
	}
	else if (!post.password) {
		alert('請輸入密碼!');
		return;
	}
	else if (!post.inputTest) {
		alert('請輸入驗證碼!');
		return;
	}
	
	ischecking = true;
	post.type = '1';
	post.Oid = $("#ver_year1").val();
	
	WaitingShow2(true);
	
	$.post(ApiRequestURL + "UserAccount/SignIn", post)
		.done(function(data) {
			if (data && data.Data)
			{
				setTimeout(function() {
					WaitingShow2(false);
					ischecking = false;
					var d = data.Data;
					if (d.VerifyType == "0")
					{
						alert("驗證碼檢驗失敗" + d.TryCount + "次");
						document.getElementById('captcha1').src = d.CpatchImg;
						entext = d.EnyText;
					}
					else if (d.VerifyType == "-1")
					{
						alert("您已超過嘗試驗證碼次數，請等待5分鐘後再試");
					}
					else
					{
						alert("登入驗證發生錯誤，請聯絡管理員");
					}
					$(".captcha").val('');
				}, 500);
			}
			else
			{
				setTimeout(function() {
					WaitingShow2(false);
					ischecking = false;
					localStorage.setItem("bearer", data);
					window.location.href = "/Forest_ca/";
				}, 300);
			}
		}).fail(function(data) {
			alert(data.responseText);
			ischecking = false;
			setTimeout(function() {
				WaitingShow2(false);
				captcha1();
				$(".captcha").val('');
			}, 500);
		});
}

function WaitingShow2(show) {
	if (show)
		$("#pleaseWaitDialog2").modal("show");
	else
		$("#pleaseWaitDialog2").modal("hide");
}

function checkneed_login() {
	var urlParams = new URLSearchParams(window.location.search);
	var hasStr = urlParams.toString();
	if (hasStr != '') {
		var post = {};
		
		if (urlParams.has("jwt"))
		{
			post.jwt = urlParams.get("jwt");
			post.type = '3';
		}
		else if (urlParams.has("type"))
			post.type = '2';

		post.Oid = '';
		
		WaitingShow2(true);
	
		$.post(ApiRequestURL + "UserAccount/SignIn", post)
			.done(function(data) {
				if (data && data.Data)
				{
					setTimeout(function() {
						WaitingShow2(false);
						ischecking = false;
						var d = data.Data;
						if (d.VerifyType == "0")
						{
							alert("驗證碼檢驗失敗" + d.TryCount + "次");
							document.getElementById('captcha1').src = d.CpatchImg;
							entext = d.EnyText;
						}
						else if (d.VerifyType == "-1")
						{
							alert("您已超過嘗試驗證碼次數，請等待5分鐘後再試");
						}
						else
						{
							alert("登入驗證發生錯誤，請聯絡管理員");
						}
						$(".captcha").val('');
					}, 500);
				}
				else
				{
					setTimeout(function() {
						WaitingShow2(false);
						ischecking = false;
						localStorage.setItem("bearer", data);
						window.location.href = "/Forest_ca/";
					}, 300);
				}
			}).fail(function(data) {
				alert(data.responseText);
				ischecking = false;
				setTimeout(function() {
					WaitingShow2(false);
					captcha1();
					$(".captcha").val('');
				}, 500);
			});
	}
}