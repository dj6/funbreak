$(function(){

		var form = $("#commentForm");
		var content = $("#content");
		var name = $("#loginname").text();
		form.submit(function(){
			$.post(form.attr("action"),
			form.serialize(),
			function(result,status){					
					$("#commentUl").append("<li><p><span class='from'>"+name+"</span><span class='time'>"+result.dateString+"</span></p><p class='content'>"+result.content+"</p></li>");	
			},
			"json");
			content.val("");
			return false;
		});

		// $.ajax ({
		// 	type:'POST',
		// 	url:'/user/comment',
		// 	data: content,
		// 	dataType: json,
		// 	success: function(data,status){
		// 		console.log('status' + status);
		// 		alert(data.from);
		// 		li.val = data.from;
		// 	}
		// });



})