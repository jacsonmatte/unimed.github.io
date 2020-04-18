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


$("#enviar").click(function(){
	var datatime = $("form").serializeArray();
	temp = datatime[0]['value']
	temp = temp.split("-")
	temp.push($("#selectName").val())

	

	t_dias.clear()


	$.ajax({
        url: "http://192.168.0.105:5000/get_monitor/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": temp})}).done(function(data){
        	console.log(data);
        	
        	if (data[0][0] != null){
        		$(".remove").remove()
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

    
});