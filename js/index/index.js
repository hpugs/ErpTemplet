$(function(){
	init();
});

function init(){
	//展示检索框
	$(".main-search img").bind("mouseover", function(){
		if(!$(this).parent().hasClass("show")){
			$(this).parent().addClass("show");
			$(this).next().focus();
		}
	});
	//隐藏检索框
	$(".main-search input").bind("blur", function(){
		if(0 >= $(this).val().length){
			$(this).parent().removeClass("show");
		}
	});
	//监听检索框回车事件
	$(".main-search input").bind("keydown", function(event){
		if(13 == event.keyCode){
			console.info($(this).val());
    	}
	});
	//菜单展开/隐藏事件
	$(".nav .nav-title").bind("click", function(){
		if($(this).parent().hasClass("show")){
			$(this).parent().removeClass("show");
			$(this).next().slideUp();
		}else{
			$(".nav.show .nav-menu").slideUp();
			$(".nav.show").removeClass("show");
			
			$(this).parent().addClass("show");
			$(this).next().slideDown();	
		}
	});
	$(".transition li").bind("click", function(){
		myAlert($(this).html());
	});
	$(".register").bind("click", function(){
		document.location.href="../register.html";
	});
	$(".logout").bind("click", function(){
		$.get("http://localhost:8888/projectname/user/logout",
			function(result) {
				if (undefined != result && result !== "") {
					var jsonObjs = eval(result);
					document.location.href="../index.html";
				} else {
					myAlert("登出失败");
				}
			}
		);
	});
	//添加首页
	addTab(0, "首页", "data/index.html", false);
	//修改messager默认按钮文字
	$.extend($.messager.defaults,{
        ok: "确定",
        cancel: "取消"
    });
    //菜单点击事件添加
	$(".nav-menu li").click(function(){
		if(!$(this).hasClass("checked")){
			$(".nav-menu li.checked").removeClass();
			$(this).addClass("checked");
		}
		$(".nav li").each(function(index, item){
			if($(item).hasClass("checked")){
				openMenu(index+1,$(this).attr("title"),$(this).attr("url"),$(this).attr("menuId"));
				return;
			}
		});
	});
}

/**
 * 菜单打开事件
 */
function openMenu(index, text, url, menuId) {
	if(url.indexOf("?") != -1){
		addTab(index, text, url + "&menuId=" + menuId, true);
	}else{
		addTab(index, text, url + "?menuId=" + menuId, true);
	}
} 