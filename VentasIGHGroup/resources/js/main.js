$(document).ready(function () {

    $("#btnClienteNuevo").click(clienteNuevo);
    $("#btnClienteRefresh").click(clienteRefresh);
    
    
    $("#frmClienteNuevo").submit(function(event){
        event.preventDefault();        
        clienteGuardar();
    });        

});


function clienteNuevo() {

    window.location.href = "/clientes/cliente-nuevo.html";

}

function clienteRefresh() {

    var btn = $("#btnClienteRefresh");

    $.ajax({
        url: "http://dummy.restapiexample.com/api/v1/employees",
        type: "get",
        beforeSend: function() { 
            var loadingText = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            if ($(btn).html() !== loadingText) {
                $(btn).prop('disabled', true);
                $(btn).data('original-text', $(btn).html());
                $(btn).html(loadingText);
            }
        },
        complete: function() {
            $(btn).prop('disabled', false);
            $(btn).html($(btn).data('original-text'));
        },
        success: function (response) {
            $("tbody").children().remove();
            $.each(response.data, function (index, value) {
                var id="<td>" + value.id + "</td>";
                var name= "<td>" + value.employee_name + "</td>";
                var salary="<td>" + value.employee_salary + "</td>";
                var age="<td>" + value.employee_age + "</td>";
                
                $("tbody").append("<tr>" + id + name + salary + age +"<tr>");


                
            });
        }
    });
}

function clienteGuardar(){

    // API Ejemplos
    // http://dummy.restapiexample.com
    // https://reqres.in/
    
    /*
    var id = $("#txtId").val();
    var nombre = $("#txtNombre").val();
    var direccion = $("#txtDireccion").val();
    var telefono = $("#txtTelefono").val();
    */

   var name = "Test";
   var salary = "123";
   var age = "20";

   $.ajax({
       url: "http://dummy.restapiexample.com/api/v1/create",
       type: "post",
       contentType: 'application/json',
       data:  
            JSON.stringify({"name":name,"salary":salary,"age":age}),
          // JSON.stringify({"id":id,"nombre":nombre,"direccion":direccion,"telefono":telefono }),
       success: function (response) {
           
           $("#txtId").val("");
           $("#txtNombre").val("");
           $("#txtDireccion").val("");
           $("#txtTelefono").val("");
           $("#txtId").focus();

           $("#mensaje").show();
           window.setTimeout(function () {
               $("#mensaje").hide();
           }, 3000);   
       }
   });
}