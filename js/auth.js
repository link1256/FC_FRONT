
function captcha1() 
{
        let captcha1 = new CaptchaMini({
            lineWidth: 1,   //線條寬度
            lineNum: 6,       //線條數量
            dotR: 2,          //點的半徑
            dotNum: 25,       //點的數量
            preGroundColor: [10, 80],    //前景色區間
            backGroundColor: [150, 250], //背景色區間
            fontSize: 60,           //字體大小
            fontFamily: ['Microsoft JhengHei'],  //字體類型
            fontStyle: 'fill',      //字體繪製方法，有fill和stroke
            content: 'abcdefghijklmnopqrstuvwxyz',  //驗證碼内容
            length: 4   //驗證碼
        });
        captcha1.draw(document.querySelector('#captcha1'), r => {
            $(".captcha_a").val(r)
        });
}

function ini_login(){
	 $(".captcha1_icon").click(function () {
        captcha1();
    });

    $(".login_submit").click(function () {
        if ($(".captcha").val() === $(".captcha_a").val()) {
            captcha1();
			LoginCheck();
        }
        else {
            alert("驗證失敗");
        }
    });
	
}

function LoginCheck()
{
	$.post(ApiRequestURL + "UserAccount/SignIn", { account: $("#account").val(), password: $("#password").val() })
		.done(function(data) {
			if (data)
			{
				localStorage.setItem("bearer", data);
				window.location.href = "index.html";
			}
		}).fail(function() {
			alert("找不到帳號或密碼錯誤.");
		});
}

		  	  

