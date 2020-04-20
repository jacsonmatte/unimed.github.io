var t_horas = $('#table-dias').DataTable( {
        "language": {
            "lengthMenu": "Exibindo _MENU_ registro por página",
            "zeroRecords": "Nothing found - sorry",
            "info": "Exibindo _PAGE_ de _PAGES_ registros",
            "infoEmpty": "Nenhuma Entrada Encontrada",
            "infoFiltered": "(filtrado do total de _MAX_ registros)",
            "search":         "Pesquisar:",
            "zeroRecords":    "Nenhum registros Encontrado",
            "paginate": {
		        "first":      "Primeiro",
		        "last":       "Último",
		        "next":       "Próximo",
		        "previous":   "Anterior"
		    }
        },
        "pagingType": "full_numbers"
    });
var t_dias =$('#horas').DataTable({
	"language": {
            "lengthMenu": "Exibindo _MENU_ registro por página",
            "zeroRecords": "Nothing found - sorry",
            "info": "Exibindo _PAGE_ de _PAGES_ registros",
            "infoEmpty": "Nenhuma Entrada Encontrada",
            "infoFiltered": "(filtrado do total de _MAX_ registros)",
            "search":         "Pesquisar:",
             "zeroRecords":    "Nenhum registros Encontrado",
            "paginate": {
		        "first":      "Primeiro",
		        "last":       "Último",
		        "next":       "Próximo",
		        "previous":   "Anterior"
		    }
        },
        "pagingType": "full_numbers"
    });

$( "#btn-print" ).click(function() {
	$("#myTabContent").show();
	window.print();
		
});


$( "#sign_out" ).click(function() {
   Cookies.remove('logado');
   Cookies.remove('valido');
   $(location).attr('href', 'index.html');     
});

$("#enviar").click(function(){

    if (md5(Cookies.get('logado')) != Cookies.get('valido')) {
        $(location).attr('href', 'index.html');
    }
	var datatime = $("form").serializeArray();
	temp = datatime[0]['value']
    
	temp = temp.split("-")
	temp.push($("#selectName").val())

	

	t_dias.clear()
    t_horas.clear()

	$.ajax({
        url: "http://192.168.0.106:5000/get_monitor/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": temp})}).done(function(data){
        	console.log(data.length);
        	


        	if (data[0][0] != null){
        		
            	$.each(data , function(index, val) { 
				  	console.log(index, val)
				  	t_dias.row.add( [
						val[0][0],
						val[0][1],
						val[0][2],
						val[0][3],
						val[0][6]+" - "+val[0][7],
						val[0][4],
						val[0][5]
					] ).draw();

				});
        	}
           
    });

    $.ajax({
        url: "http://192.168.0.106:5000/get_monitor_dias/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": temp})}).done(function(data){
            console.log(data.length);
            


            if (data[0][0] != null){
                
                $.each(data , function(index, val) { 
                    console.log(index, val)
                    t_horas.row.add( [
                        val[0][0],
                        val[0][1],
                        val[0][2],
                        val[0][3],
                        val[0][4],
                        val[0][5]
                    ] ).draw();

                });
            }
           
    });

    
});