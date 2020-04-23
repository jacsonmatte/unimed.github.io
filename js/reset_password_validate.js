jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
var form = $( "form" );
var validator = form.validate({
	onsubmit: false,
  rules: {
    user_email: {
      required: true,
      email: true
    },
    login_password: {
      required: true,
      minlength: 4
    },
    password_new1: {
      required: true,
        minlength: 4
    },
    password_new2: {
        equalTo: "#password_new1"
      }
  },
  messages: {
      user_email: "Entre com um email válido",
      login_password: "Senha deve ter pelo menos 4 caracteres",
      password_new1: "Senha deve ter pelo menos 4 caracteres",
      password_new2: "Senha informada não é a mesma"
  }

});



$("#reset_password").click(function(){
  var dataresetuser = $("form").serializeArray();
  console.log(dataresetuser[0]['value']);
  console.log(md5((dataresetuser[1]['value'])));
  dataresetuser[1]['value'] = md5(dataresetuser[1]['value'])+md5(dataresetuser[0]['value'])+md5('unimed');
  dataresetuser[2]['value'] = md5(dataresetuser[2]['value'])+md5(dataresetuser[0]['value'])+md5('unimed');
  dataresetuser[3]['value'] = md5(dataresetuser[3]['value'])+md5(dataresetuser[0]['value'])+md5('unimed');
    
  $.ajax({
        url: "http://192.168.4.200:5000/post_new_password/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"message": dataresetuser})}).done(function(data){
          console.log(data)
          if (data) {
            alert("Alterado com sucesso");
            $(location).attr('href', 'index.html');
          }else{
            alert("Não foi possível alterar a senha")
          }
    });   
});