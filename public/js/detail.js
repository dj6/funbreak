// navbar当前页面高亮
$(document).ready(function(){
	var url = window.location.pathname;
	$("ul.nav a").each(function(){
		$(this).removeClass('active');
	 	if($(this).attr('href')==url){
 			$(this).addClass('active');
 		}
 	});
});