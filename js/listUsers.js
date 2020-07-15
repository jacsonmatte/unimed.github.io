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

	console.log(temp)
    dia_init = temp[0]

    dia_init_int = parseInt(dia_init.substring(0,2), 10)
    dia_last = temp[1]

    dia_last_int = parseInt(dia_last.substring(1,3),10)
    while(dia_init_int-1 < dia_last_int){
        data_init = Array()
        if (dia_init_int < 10){
            data_init.push("0" + dia_init_int + dia_init.substring(2,dia_init.length))
            data_init.push(" 0" + dia_init_int + dia_last.substring(3,dia_last.length))
        }else{
            data_init.push(dia_init_int + dia_init.substring(2,dia_init.length))
            data_init.push(" " + dia_init_int + dia_last.substring(3,dia_last.length))
        }
        data_init.push(temp[2])
        console.log("Construido")
        console.log(data_init)
        $.ajax({
            url: "http://192.168.0.106:5000/get_monitor_dias/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({"message": data_init})}).done(function(data){
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


        $.ajax({
        url: "http://192.168.0.106:5000/get_monitor/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": data_init})}).done(function(data){
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
        dia_init_int++;
    }

    
});