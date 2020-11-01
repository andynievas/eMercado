


function showInfo(){
    document.getElementById("BarraNav").innerHTML += `

        <a class="text-dark" href="index.html"> Logotipo</a>
        <a class="text-dark" href="categories.html"> #Enlace1</a>
        <a class="text-dark" href="products.html"> #Enlace2</a>
        
    `;

    document.getElementById("barraBusq").innerHTML = `
  
        <input class="col-8 form-control" type="text" placeholder="Buscar">
        <button class="btn btn-secondary mx-3">Buscar</button>

    `;

    document.getElementsByTagName("nav")[0].className = "d-none";

    //  Ahora si el contenido
    let paraMostrar = `
    
    <div class="container p-5">
        <h3>Factura</h3>

        <div class="row">
            <div class="col-3"> <p style="padding: 6px;" >Fecha</p> </div>
            <div class="col-9"> <input class="form-control" type="date"> </div>
        </div> <hr>

        <div class="row">
            <div class="col-3"> <p style="padding: 6px;" >Producto</p> </div>
            <div class="col-9"> <input class="form-control" type="text"> </div>
        </div> <hr>

        <div class="row">
            <div class="col-3"> <p style="padding: 6px;" >Precio</p> </div>
            <div class="col-9"> <input class="form-control" type="number"> </div>
        </div>

    </div>
    
    `;


    document.getElementById("contenedorPrincipal").innerHTML = paraMostrar;

}

// style="background-color: rgb(0,0,0, 0.2);"


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    showInfo();

});

