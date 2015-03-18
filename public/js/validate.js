//登录验证


$().ready(function() {
	// validate the form when it is submitted
	var validator1 = $("#signup").validate({
		rules: {
			email:{
				required: true,
				email: true
			},
			password:{
				minlength: 6,
				maxlength: 16,
				required: true
			},
			repassword:{
				minlength: 6,
				maxlength: 16,
				required: true,
				equalTo: "#signupPassword"
			},
			name:{				
				required: true,
				minlength: 2,
				maxlength: 18
			}
		},
		messages: {
			email:{
				required: "邮箱不能为空！",
				email: "邮箱格式不正确！"
			},
			password:{
				minlength: "请输入6-16位密码，区分大小写!",
				maxlength: "请输入6-16位密码，区分大小写!",
				required: "密码不能为空！"
			},
			repassword:{
				minlength: "请输入6-16位密码，区分大小写!",
				maxlength: "请输入6-16位密码，区分大小写!",
				required: "验证密码不能为空！",
				equalTo: "两次密码不一致"
			},
			name:{				
				required: "昵称不能为空！",
				minlength: "昵称2-18位中英文、数字及下划线！",
				maxlength: "昵称2-18位中英文、数字及下划线！"
			}
		}
	});

	var validator2 = $("#signin").validate({
		rules: {
			email:{
				required: true,
				email: true
			},
			password:{
				required: true
			}
		},
		messages: {
			email:{
				required: "邮箱不能为空！",
				email: "邮箱格式不正确！"
			},
			password:{
				required: "密码不能为空！"
			}
		}
	});

	var signupForm = $("#signup");
	var signinForm = $("#signin");
	var error1 = $("#errorSignup");
	var error2 = $("#errorSignin");

	signupForm.submit(function(){
		$("#signupButton").attr("disabled",true);
		error1.text("");
		$.post(signupForm.attr("action"),
			signupForm.serialize(),

			function(result,status){
				var msg = result.error;
				console.log(result.error);
				if(msg == "pass"){

					$("#signinEmail").val(result.user.email);
					$("#signinPassword").val(result.user.password);
					console.log($("#signinEmail").val());
					signinForm.submit();
					window.location.href = "/";

				}else{
					error1.text(result.error);	
				}

			},
			"json");


		return false;
	});

	signinForm.submit(function(){
		$("#signinButton").attr("disabled",true);
		error2.text("");
		$.post(signinForm.attr("action"),
			signinForm.serialize(),
			function(result,status){
				var msg = result.error;
				if(msg == "pass"){
					window.location.href='/';
				}else{
					error2.text(msg);
				}							
			},
			"json");

		return false;
	});

});