$(function(){
	init();
})

function init(){
	$(".login-submit").bind("click", function(){
		//showLoading(this);
		document.location.href="html/index.html";
	});
}
