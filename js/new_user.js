jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
var form = $( "form" );
var validator = form.validate({
	onsubmit: false,
  rules: {
    user_name: {
      required: true,
      minlength: 3
    },
    user_email: {
      required: true,
      email: true
    },
    login_password: {
      required: true,
      minlength: 4
    },
    login_password_repeat: {
        equalTo: "#login_password"
      }
  },
  messages: {
      user_name: "Deve ter pelo menos 3 caracteres",
      user_email: "Entre com um email válido",
      login_password: "Senha deve ter pelo menos 4 caracteres",
      login_password_repeat: "Senha informada não é a mesma"
  }

});



$("#new_user").click(function(){
  var dataresetuser = $("form").serializeArray();
  console.log(dataresetuser[0]['value']);
  dataresetuser[2]['value'] = md5(dataresetuser[2]['value'])+md5(dataresetuser[1]['value'])+md5('unimed');
  dataresetuser[3]['value'] = md5(dataresetuser[3]['value'])+md5(dataresetuser[1]['value'])+md5('unimed');
    
  $.ajax({
        url: "http://192.168.4.200:5000/post_new_user/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": dataresetuser})}).done(function(data){
          console.log(data)
          if (data) {
            alert("Cadastrado com sucesso");
            $(location).attr('href', 'index.html');
          }else{
            alert("Não foi possível cadastrar o usuário")
          }
    });   
});