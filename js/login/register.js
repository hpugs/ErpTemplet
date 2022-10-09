$(function(){
	init();
})

function init(){
	$(".login-submit").bind("click", function(){
		var name = document.getElementById("name").value;
		var pwd = document.getElementById("pwd").value;
		var passwd = document.getElementById("passwd").value;
		if(name.length == 0 || pwd.length == 0 || passwd.length == 0){
			myAlert("必要参数为空", 2);
			return;
		}

		if(pwd.length < 6 || pwd.length > 12){
			myAlert("密码长度请控制在6~12位之间", 2);
			return;
		}
		submit(name, pwd, passwd);
	});
}

function submit(name, pwd, passwd){
	var requestStatus = 0;
	var ajaxPara = {"name":name, "pwd":pwd, "passwd":passwd};
	$.ajax({
		type: "POST",
		url: "http://localhost:8888/projectname/user/register",
		data: JSON.stringify(ajaxPara),
		contentType:'application/json;charset=utf-8',
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
					document.location.href="index.html";
				}else{
					myAlert(jsonObjs.message, 2);
				}
			} else {
				myAlert("注册失败", 2);
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
