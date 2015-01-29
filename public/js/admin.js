$(function(){
	$(".del").click(function(e) {
		/* Act on the event */
		var target = $(e.target);
		var id = target.data('id');
		console.log("delete id "+id);
		var tr = $('.item-id-'+id);

		$.ajax({
			type:'DELETE',
			url:'/admin/movie/delete?id=' + id
		})
		.done(function(results){
			if(results.success === 1){
				if(tr.length >0){
					tr.remove();
				}
			}	
		});
	});
})