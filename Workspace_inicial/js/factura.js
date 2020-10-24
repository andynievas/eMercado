


function showInfo(){
    document.getElementById("contenedorPrincipal").innerHTML = `Hola lindo
    
    <nav class="site-header sticky-top py-1" style="background-color: rgb(0,0,0, 0.2);">
        <div class="container d-flex flex-column flex-md-row justify-content-between">
            <a class="p-2 d-none d-md-inline-block btn text-dark fonditoo" href="index.html"> Logotipo</a>
            <a class="p-2 d-none d-md-inline-block btn text-dark fonditoo" href="categories.html"> #Enlace1</a>
            <a class="p-2 d-none d-md-inline-block btn text-dark fonditoo" href="products.html"> #Enlace2</a>
            <a class="p-2 d-none d-md-inline-block btn text-dark fonditoo" href="sell.html"> Vender</a>
            <div class="d-flex">
                <input class="form-control" type="text" placeholder="Buscar">
                <input class="btn btn-secondary ml-3" type="button" value="Buscar">
            </div>
        </div>
    </nav>
  
  `;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    showInfo();

});

