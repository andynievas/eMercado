

function ponerNombre(){
    htmlContentToAppend += `
        <div class="container breadcrumb ">
            <div class="row">
            
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + `</h4>
                    </div>
                    
                    
                    <p> Andy </p>
                    
                </div>
            </div>
        </div> ` ;
}

function ponerImagenes(product){
    var htmlContentToAppend = `
    <div class="" style="width: 15%;">
        <div class=" p-0">
            <div class=" ">
                <img src="` + product.images[0] + `" alt="` + product.name + `" class="img-thumbnail">
            </div>
            <div class=" ">
                <img src="` + product.images[3] + `" alt="` + product.name + `" class="img-thumbnail">
            </div>
            <div class="">
                <img src="` + product.images[2] + `" alt="` + product.name + `" class="img-thumbnail">
            </div>
            <div class="">
                <img src="` + product.images[1] + `" alt="` + product.name + `" class="img-thumbnail">
            </div>
            <div class="">
                <img src="` + product.images[4] + `" alt="` + product.name + `" class="img-thumbnail">
            </div>
        </div>
    </div> ` ;
    document.getElementsByClassName("container")[1].innerHTML += htmlContentToAppend;
}

function showProductInfo(product){

    ponerImagenes(product);

    let carrucel ="";

    carrucel = `
    
    <div class="container">

        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" src=" ` + product.images[0] + ` " alt="First slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src=" ` + product.images[3] + ` " alt="Second slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src=" ` + product.images[2] + ` " alt="Third slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src=" ` + product.images[1] + ` " alt="Third slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src=" ` + product.images[4] + ` " alt="Third slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div> 
    
    </div>`;

    document.getElementsByClassName("container")[1].innerHTML += carrucel;

    let htmlContentToAppend = "";
    let arrayTags_P5 = document.getElementsByClassName("container");
    
    /*htmlContentToAppend += `
        <div class="container breadcrumb ">
            <div class="row">
            
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + `</h4>
                    </div>
                    
                    
                    <p> Andy </p>
                    
                </div>
            </div>

            <div class="row">
                <div class="col-6 breadcrumb">
                    <img src="` + product.images[0] + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col-6 breadcrumb">
                    <img src="` + product.images[3] + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col-4">
                    <img src="` + product.images[2] + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col-4">
                    <img src="` + product.images[1] + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col-4">
                    <img src="` + product.images[4] + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="container">
                ` + product.cost + `

                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                    </div>
                    <p class="mb-1">Descripción: <br>`+ product.description +`</p>
                    <p style="font-family: 'Audiowide'; font-weight: bold;"> `  + ` - `  + ` </p>
                </div>
            </div>
        </div>
        `;
    
    
    arrayTags_P5[2].innerHTML += htmlContentToAppend;*/
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj.data);       
            showProductInfo(resultObj.data);     
        }

    });

});