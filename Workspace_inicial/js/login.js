
function redirect(){
    location.replace("index.html");
};

function validar(){
    var correo = document.getElementById("inputEmail");
    var contraseña = document.getElementById("inputPass");

    if(correo.value.length != 0 && contraseña.value.length != 0){
        console.log("Sale si el validar");
        localStorage.setItem('user', correo.value);
        redirect();
    }else {
        incompletos(correo, contraseña);
    }
};

function incompletos(correo, contraseña){
    
    console.log("incompletos");

    if(correo.value.length === 0){

        correo.className += " is-invalid ";
        document.getElementById("inputEmail").placeholder="Email: Debe completar";

    }

    if(contraseña.value.length === 0){

        contraseña.className += " is-invalid ";
        document.getElementById("inputPass").placeholder="Contraseña: Debe completar";

    }
    
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    document.getElementById("botonn").addEventListener("click", function(){
        validar();
    });

});
