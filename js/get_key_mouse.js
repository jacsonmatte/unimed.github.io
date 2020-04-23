$(document).ready(function(){
	if (md5(Cookies.get('logado')) != Cookies.get('valido')) {
        $(location).attr('href', 'index.html');
    }
	$.ajax({
        url: "http://192.168.4.200:5000/get_mouse_key_users/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": ''})}).done(function(data){
        	//console.log(data);
        	$.each(data , function(index, val) { 
			  console.log(index, val)
			  $("#selectName").append('<option value='+val[0]+'>'+val[1]+'</option>');
			});

			
			$("head").append('<link rel="stylesheet" type="text/css" href="css/daterangepicker.css" /> ');
			$("head").append("<script type='text/javascript' src='js/daterangepicker.min.js'> <\/script>");
				
	  	$(function() {
	  		
			$('input[name="datetimes"]').daterangepicker({
				timePicker: true,
				"showDropdowns": true,
				startDate: moment().startOf('hour'),
				endDate: moment().startOf('hour').add(8, 'hour'),
				locale: {
					format: 'DD/M/YY hh:mm A',
					"daysOfWeek": [
						"Dom.",
						"Seg.",
						"Ter.",
						"Qua.",
						"Qui.",
						"Sex.",
						"Sáb."
					],
					
					"monthNames": [
						"Janeiro",
						"Fevereiro",
						"Março",
						"Abril",
						"Maio",
						"Junho",
						"Julho",
						"Agosto",
						"Setembro",
						"Outubro",
						"Novembro",
						"Dezembro"
					]
				}
			});
		});           
    });


});