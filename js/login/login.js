$(function(){
	init();
})

function init(){
	$(".login-submit").bind("click", function(){
		login();
	});
}

function login(){
	var ajaxPara = {"name":"hpugs", "password":"52Hpugs@"};
	$.ajax({
		type: "GET",
		url: "http://localhost:8888/projectname/user/login",
		data: ajaxPara,
		dataType: "json",
		beforeSend: function() {
			showLoading(this);
		},
		success: function(result) {
			if (undefined != result && result !== "") {
				var jsonObjs = eval(result);
				document.location.href="html/index.html";
			} else {
				alter("登录失败");
			}
		},
		complete: function() {
			window.setTimeout(function() {
				requestStatus = 404; //请求完成
			}, 5000);
		}
	});
}
