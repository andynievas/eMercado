

const URL_IMAGEN = 'https://i.ibb.co/fddDtz2/image-Prueba.jpg';

var nuevoJson = [];
// localStorage.setItem('userProfile', JSON.stringify(nuevoJson) );



function completar(){
    let perfil = JSON.parse( localStorage.getItem('userProfile') );
    let showInfoUser = document.getElementsByName('showInfoUser');

    for(let i=0; i<showInfoUser.length; i++){
        
        if(perfil[i]){
            showInfoUser[i].innerHTML = perfil[i];
        }
        
    }

}


function editarPerfil(){
    let newProfileData = document.getElementsByTagName("input");
    let alMenosUnoCompleto = false;
    // let i = 0;
    let arrayAuxiliar = [];

    for(let i=0; i<newProfileData.length; i++ ){

        if(newProfileData[i].value === '' ){
            console.log('INPUT VACIO');
        }else{
            nuevoJson[i] = newProfileData[i].value;

        }

    }

    localStorage.setItem('userProfile', JSON.stringify(nuevoJson) );

    completar();
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Se ha guardado con éxito',
        showConfirmButton: false,
        timer: 1500
    });

}


function showInfo(){

    var toAppend = `
        <!-- <img id="imgProfile" crossorigin src="${URL_IMAGEN}" class="d-none" style="width: 50px;"> -->
        <div class="text-center p-2">
            <h2 style="font-family: 'Architects Daughter'; font-size: 40px; font-weight: bold;">Mi perfil</h2>
            <p class="lead" style="margin: 5px;">Verás aquí todos los datos guardados en tu perfil personal.</p>
        </div>
        

        <div>
            <div class="row m-0 p-0">
                <div class="col-lg-7 my-2">
                    <div id="seccionParaLaImagen">
                        <img id="imgProfileToSet" class="rounded-circle w-50 center mb-2" style="border: 3px grey solid;" src="" alt="Imagen Linda">
                    </div>

                    <h4 class="text-center" >Nombre de usuario: <span id="userName">${localStorage.getItem("user")}</span></h4>
                    <h5 class="text-center" >Nombre: <span name="showInfoUser" >[..............]</span></h5>
                    <h5 class="text-center" >Apellido: <span name="showInfoUser" >[..............]</span></h5>
                    <h5 class="text-center" >Edad: <span name="showInfoUser" >[..............]</span></h5>
                    <h5 class="text-center" >Teléfono: <span name="showInfoUser" >[..............]</span></h5>
                    <h5 class="text-center" >Dirección: <span name="showInfoUser" >[..............]</span></h5>
                    <h5 class="text-center" >País: <span name="showInfoUser" >[..............]</span></h5>
                </div>

                <div class="col"> 
                
                    <p>
                        <button class="btn btn-block btn-primary d-flex" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style="font-size: 22px;">
                            <span class="w-100">Editar Perfil</span>
                            <span>
                                <i class="fas fa-angle-down" ></i>
                            </span>
                        </button>
                    </p>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                            <div class="row">
                                <div class="col-12 py-1" >
                                    <input type="text" class="form-control" placeholder="Nombre" >
                                </div>
                                
                                <div class="col-12 py-1" >
                                    <input type="text" class="form-control" placeholder="Apellido" >
                                </div>
                                
                                <div class="col-12 py-1" >
                                    <input type="number" maxlength="2" size="2" class="form-control" placeholder="Edad">
                                </div>
                                
                                <div class="col-12 py-1" >
                                    <input type="number" class="form-control" placeholder="Teléfono">
                                </div>
                                
                                <div class="col-12 py-1" >
                                    <input type="text" class="form-control" placeholder="Direccion" >
                                </div>
                                
                                <div class="col-12 py-1" >
                                    <input type="text" class="form-control" placeholder="País" >
                                </div>
                                <div class="col-12 py-1" >
                                    <button class="btn btn-block btn-success" onClick="editarPerfil()" >Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("contenidoPrincipal").innerHTML = toAppend;
}


function guardarImagenEnStorage(){

    const imagen = `<img id="imgProfile" class="rounded-circle w-50 center mb-2" style="border: 3px grey solid;" crossorigin src="${URL_IMAGEN}" class="d-none" style="width: 50px;" alt="Imagen Linda" >`;

    document.getElementById("seccionParaLaImagen").innerHTML = imagen;


    // Get a reference to the image element
    var imgProfile = document.getElementById("imgProfile");

    // Take action when the image has loaded
    imgProfile.addEventListener("load", function () {
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");

        // Make sure canvas is as big as the picture
        imgCanvas.width = imgProfile.width;
        imgCanvas.height = imgProfile.height;

        // Draw image into canvas element
        imgContext.drawImage(imgProfile, 0, 0, imgProfile.width, imgProfile.height);

        // Get canvas contents as a data URL
        var imgAsDataURL = imgCanvas.toDataURL("image/png");

        // Save image into localStorage
        try {
            localStorage.setItem("imgProfile", imgAsDataURL);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
        console.log('Termina de poner la imagen');

        var imgProfileInDropdoun = document.getElementById("imgProfileInDropDown");
        console.log('Estoy dentro del pintarImgProfile');
        console.log(imgProfileInDropdoun);
        imgProfileInDropdoun.src = localStorage.getItem('imgProfile');

    });
}

function pintarImgProfile(){
    console.log('Estoy dentro del pintarImgProfile');
    setTimeout( ()=>{
        var imgProfile = document.getElementById("imgProfileToSet");
        imgProfile.src = localStorage.getItem('imgProfile');
        console.log('Estoy dentro del pintarImgProfile');
        var imgProfileInDropdoun = document.getElementById("imgProfileInDropDown");
        console.log('Estoy dentro del pintarImgProfile');
        console.log(imgProfileInDropdoun);
        imgProfileInDropdoun.src = localStorage.getItem('imgProfile');
    } , 200 );
}

function validar(){
    if(localStorage.getItem('imgProfile') ){
        pintarImgProfile();
    }else{
        const pruebaSincrona= guardarImagenEnStorage();
        pintarImgProfile();
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    showInfo();
    if(localStorage.getItem('userProfile') != null ){
        nuevoJson = JSON.parse( localStorage.getItem('userProfile') );
        completar();
    }

    validar();

});