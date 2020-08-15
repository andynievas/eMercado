//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

document.getElementById("botonn").addEventListener("click", function(){
    validar();
});

function validar(){
    var correo = document.getElementById("inputEmail");
    var contraseña = document.getElementById("inputPass");
    console.log(correo.value);
    if(correo.value.length != 0 && contraseña.value.length != 0){
        console.log("Sale si el validar");
        redirect();
        // return true;
    }else {
        incompletos(correo, contraseña);
        // return false;
    }
};

function incompletos(correo, contraseña){
    var contentToAppendCorreo = "";
    var contentToAppendPass = "";
    contentToAppendCorreo = '<img src="img/cruz_roja_error_jpg_nueva.png" alt="campo_incompleto" style="width: 30px; margin: 5px 0px 9px 0px;">';
    contentToAppendPass = '<img src="img/cruz_roja_error_jpg_nueva.png" alt="campo_incompleto" style="width: 30px; margin: 5px 0px 9px 0px;">';
    console.log(contentToAppendCorreo);
    
    console.log("incompletos");
    if(correo.value.length === 0){
        document.getElementById("styleCorreo").style="float: left; width: 89%;";
        correo.style = "border: #ff6a45 solid 2px;";
        document.getElementById("inputEmail").placeholder="Email: Debe completar";
        document.getElementById("img_correo").innerHTML = contentToAppendCorreo;
        document.getElementById("img_correo").style = "display: block";
        // document.getElementById('inputEmail').className += " is-invalid"; Esta opción es más estética, pero prefiero
        // dejar la que me inventé a palanca jaja
    }else{
        document.getElementById("styleCorreo").style="";
        correo.style = "border: 0px;";
        document.getElementById("img_correo").style = "display: none";
    }

    if(contraseña.value.length === 0){
        document.getElementById("stylePass").style="float: left; width: 89%;";
        contraseña.style = "border: #ff6a45 solid 2px;";
        document.getElementById("inputPass").placeholder="Contraseña: Debe completar";
        document.getElementById("img_password").innerHTML = contentToAppendPass;
        document.getElementById("img_password").style = "display: block";
        // document.getElementById('inputPass').className += " is-invalid"; Esta opción es más estética, pero prefiero
        // dejar la que me inventé a palanca jaja
    }else{
        document.getElementById("stylePass").style="";
        contraseña.style = "border: 0px;";
        document.getElementById("img_password").style = "display: none";
    }
}

function redirect(){
    location.replace("index.html");
};