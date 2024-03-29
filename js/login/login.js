$(function(){
	init();
})

function init(){
	$(".login-submit").bind("click", function(){
		var account = document.getElementById("account").value;
		var pwd = document.getElementById("pwd").value;
		if(account.length == 0 || pwd.length == 0){
			myAlert("请输入必要信息", 2);
			return;
		}
		login(account, pwd);
	});
}

function login(account, pwd){
	var requestStatus = 500;
	var ajaxPara = {"account":account, "password":pwd};
	$.ajax({
		type: "GET",
		url: "http://localhost:8888/projectname/user/login",
		data: ajaxPara,
		dataType: "json",
		beforeSend: function() {
			showLoading(this);
		},
		success: function(result) {
			requestStatus = 200;
			removeLoading(this);
			if (undefined != result && result !== "") {
				var jsonObjs = eval(result);
				console.info(jsonObjs);
				if(jsonObjs.status){
					document.location.href="html/index.html";
				}else{
					myAlert(jsonObjs.message, 2);
				}
			} else {
				myAlert("登录失败", 2);
			}
		},
		error: function() {
			requestStatus = 500;
			removeLoading(this);
			myAlert("服务异常，请稍后重试", 2);
		},
		complete: function() {
			window.setTimeout(function() {
				if(requestStatus == 0){
					removeLoading(this);
					myAlert("网络异常，请求超时", 2);
				}
			}, 5000);
		}
	});
}
