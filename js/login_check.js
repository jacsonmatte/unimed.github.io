$("#enviar_login").click(function(){
	var datatime = $("form").serializeArray();
	console.log(datatime[0]['value']);
	console.log(md5((datatime[1]['value'])));
    datatime[1]['value'] = md5(datatime[1]['value'])+md5(datatime[0]['value'])+md5('unimed');
    
	$.ajax({
        url: "http://192.168.4.200:5000/post_validator_login/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": datatime})}).done(function(data){
        	console.log(data)
        	if (data) {
        		Cookies.set('logado',  datatime[1]['value']);
        		Cookies.set('valido',  md5(datatime[1]['value']));
        		console.log(Cookies.get('logado'))
        		$(location).attr('href', 'app.html');
        	}    
    });   
});