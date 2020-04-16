$( "#btn-print" ).click(function() {
	$("#myTabContent").show();
	window.print();
		
});


$("#enviar").click(function(){
	var datatime = $("form").serializeArray();
	temp = datatime[0]['value']
	temp = temp.split("-")
	temp.push($("#selectName").val())
	$.ajax({
        url: "http://192.168.0.106:5000/get_monitor/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": temp})}).done(function(data){
        	console.log(data);
        	$(".remove").remove()
        	if (data[0][0] != null){
            	$.each(data , function(index, val) { 
				  console.log(index, val)
				  $("#horas").append("<tr class='remove'>	<td>"+val[0][0]+"</td><td>"+val[0][1]+"</td><td>"+val[0][2]+"</td><td>"+val[0][3]+"</td><td>"+val[0][6]+" - "+val[0][7]+"</td><td>"+val[0][4]+"</td><td>"+val[0][5]+"</td></tr>");
				});
        	}
           
        });

});