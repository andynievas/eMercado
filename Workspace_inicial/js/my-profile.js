


function completar(todosCompletos){
    if(todosCompletos){
        let perfil = JSON.parse( localStorage.getItem('userProfile') );
        console.log(perfil);
        document.getElementById("name").innerHTML = perfil['name'];
        document.getElementById("lastName").innerHTML = perfil['lastName'];
        document.getElementById("age").innerHTML = perfil['age'];
        document.getElementById("phone").innerHTML = perfil['phone'];
        document.getElementById("direction").innerHTML = perfil['direction'];
        document.getElementById("country").innerHTML = perfil['country'];
    }

}


function editarPerfil(){
    let newProfileData = document.getElementsByTagName("input");
    let nuevoJson = {
        "name": '',
        "lastName": '',
        "age": '',
        "phone": '',
        "direction": '',
        "country": ''
    };
    let todosCompletos = true;
    let i = 0;

    while(newProfileData[i] && todosCompletos){
        if(newProfileData[i].value === ""){
            todosCompletos = false;
            // alert(`Campo incompleto: ${i}`);
        }else {
            // alert(`Campo completo: ${i}`);
            console.log("Campo completo");
        }

        i++;
    }

    if(todosCompletos){
        nuevoJson['name'] = newProfileData[0].value;
        nuevoJson['lastName'] = newProfileData[1].value;
        nuevoJson['age'] = newProfileData[2].value;
        nuevoJson['phone'] = newProfileData[3].value;
        nuevoJson['direction'] = newProfileData[4].value;
        nuevoJson['country'] = newProfileData[5].value;
        localStorage.setItem('userProfile', JSON.stringify(nuevoJson) );
        completar(todosCompletos);
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Se ha guardado con éxito',
            showConfirmButton: false,
            timer: 1500
        });
    }
}


function showInfo(){

    var toAppend = `
        <div class="text-center p-2">
            <h2 style="font-family: 'Architects Daughter'; font-size: 40px; font-weight: bold;">Mi perfil</h2>
            <p class="lead" style="margin: 5px;">Verás aquí todos los datos guardados en tu perfil personal.</p>
        </div>
        

        <div>
            <div class="row m-0 p-0">
                <div class="col-lg-7 my-2">
                    
                    <img class="rounded-circle w-50 center mb-2" style="border: 3px grey solid;" src="https://i.ibb.co/fddDtz2/image-Prueba.jpg" alt="Imagen Linda" style="align: center;">

                    <h4 class="text-center" >Nombre de usuario: <span id="userName">${localStorage.getItem("user")}</span></h4>
                    <h5 class="text-center" >Nombre: <span id="name">[..............]</span></h5>
                    <h5 class="text-center" >Apellido: <span id="lastName">[..............]</span></h5>
                    <h5 class="text-center" >Edad: <span id="age">[..............]</span></h5>
                    <h5 class="text-center" >Teléfono: <span id="phone">[..............]</span></h5>
                    <h5 class="text-center" >Dirección: <span id="direction">[..............]</span></h5>
                    <h5 class="text-center" >País: <span id="country">[..............]</span></h5>
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
    editarPerfil();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    showInfo();
    if(localStorage.getItem('userProfile') != null ){
        completar(true);
    }

});