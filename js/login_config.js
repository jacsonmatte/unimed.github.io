jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
var form = $( "form" );
form.validate({
	onsubmit: false,
  rules: {
    user_email: {
      required: true,
      email: true
    },
    login_password: {
      required: true,
      minlength: 4
    }
  },
  messages: {
      user_email: "Entre com um email válido",
      login_password: "Senha deve ter pelo menos 4 caracteres"
  }


});
