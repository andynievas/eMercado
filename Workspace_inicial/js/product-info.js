

const fondoColor = "rgb(227,245,244)";

var productInfoResult;

function setearColorFondo(){
    var largoG = document.getElementsByClassName("cambiarFondo");console.log(largoG);
    document.getElementById("titulo").style = "background-color: " + fondoColor + ";";
    for(let i=0; i<largoG.length; i++){
        largoG[i].style.background = fondoColor ;
    }
}

function ponerNombre(product){

    let htmlContentToAppend = `
        <div class="">
            
            <div class="">
                <div class="d-flex justify-content-between">
                    <h4 class="m-1 ">Categoría: ` + product.category + `</h4>
                    <h4 class="m-1 ">` + product.name + `</h4>
                    <h4 class="m-1 ">` + product.soldCount + `</h4>
                </div>
                    
                <span> </span>
                    
            </div>
        </div>
         ` ;
    
    document.getElementById("titulo").innerHTML += htmlContentToAppend;

}

function ponerImagenes(product){
    var htmlContentToAppend = `
    <div class="p-1" style="width: 20%;">
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
    document.getElementById("carusel").innerHTML += htmlContentToAppend;
}

function ponerDescripcion(product){console.log(product);

    let htmlContentToAppend = `
        <div class="alert-info p-4" style="background-color:`+ fondoColor +`;">
            
            <div class=" justify-content-between">
                <span style="color: black; font-size: 24px;">Descripción del artículo: </span>  <br>
                <h6 class="m-1 ">  ` + product.description + `</h6>
            </div>
                    
            <span> </span>

        </div>
         ` ;
    
    document.getElementById("Descripcion").innerHTML += htmlContentToAppend;

}

function ponerEstrellas(score, f, estrelliitas){
    var stars=""; //<span style='padding-left: 14px;'></span>

    for(let a=0; a<score ; a++){
        stars += `<span class="fa fa-star checked"></span>
        `;
    }
    for(let b=0; b<5-score; b++){
        stars += `<span class="fa fa-star" style="color: black;"></span>
        `;
    }

    estrelliitas[f].innerHTML += stars;
}

// list-group-item  -  `<p>`

function ponerDescripcionDeComentario(comentarios, estrellotas, largo){
    for(let g=0; g<largo; g++){
        estrellotas[g].innerHTML += `<span class="p-0">` + comentarios[g].description + `.</span>` ;
    }
}
function ponerUserDeComentario(comentarios, estrellotas, largo){
    for(let g=0; g<largo; g++){
        estrellotas[g].innerHTML += `<strong class="pl-3 lead" style="font-weight: bold;">` + comentarios[g].user +`</strong>` ;
    }
}
function ponerFechaDeComentario(comentarios, estrellotas, largo){
    for(let g=0; g<largo; g++){
        estrellotas[g].innerHTML +=  `<span class="p-0" style="border-bottom: 3px skyblue solid;">` + comentarios[g].dateTime + `</span> `;
    }
}

function ponerInfoDeRelated(arrayDeProducts){  //  Incluir nombre e imagen del producto relacionado
    var agregarARelated = "";
    
    for(let n=0; n<productInfoResult.length; n++){
        agregarARelated += 
        
        `<div class="pb-2"> <a href="#" class="card p-1 list-group-item-action shadow-sm " style="min-width: 130px;width: 100%;">
            <img class="img-thumbnail" style="" src=" ` + arrayDeProducts[ productInfoResult[n]].imgSrc + ` ">
            <h6 class="p-2 m-0" style="font-size: 24px;">`
                + arrayDeProducts[ productInfoResult[n]].name + 
            `</h6>
            <h6>
                <span class=" p-2 m-0" style="font-size: 15px;">` + arrayDeProducts[ productInfoResult[n]].currency+` - `+arrayDeProducts[ productInfoResult[n]].cost + `</span>
            </h6>
        </a>
        </div>`;
        
    // arrayDeProducts[productInfoResult[n]]

    }
    document.getElementById("productsRelacionados").innerHTML = agregarARelated;
}

function ponerProductosRelacionados(arrayDeProducts){    //  Incluir seccion y formato para los productos relacionados
    var divToAppend = `
    
    <div class="container p-0" id="productsRelacionados" >    </div>
    
    `;
    // for(let jota=0; jota<productInfoResult.length; jota++){
        document.getElementById("Related").innerHTML += divToAppend;
    // }

    ponerInfoDeRelated(arrayDeProducts);
    setearColorFondo();
}

//    col-md-6

function ponerComentarios(comentarios, largo, resultComentarios){   // y tambien las estrellas
    var divToAppend ="";
    
    for(let jota=0; jota<largo; jota++){
        divToAppend = `
        <div class=" comentarioSuper card px-3 py-1 mb-3 shadow-sm" style="border: 2px rgb(255, 255, 255,) solid; border-radius: 10px; min-width: 360px;">
            <div class="comentarios "></div>
        </div>
        `;
        document.getElementById("comentariosYpuntuacion").innerHTML += divToAppend;
    }

    var estrellotas = document.getElementsByClassName("comentarioSuper");
    var estrelliitas = document.getElementsByClassName("comentarios");

    for(let j=0; j<largo; j++){
        ponerEstrellas(comentarios[j], j, estrelliitas);
    }

    ponerUserDeComentario(resultComentarios, estrelliitas, largo);

    ponerDescripcionDeComentario(resultComentarios, estrellotas, largo);
    ponerFechaDeComentario(resultComentarios, estrellotas, largo);
}

function showProductInfo(product){

    ponerNombre(product);
    ponerImagenes(product);

    let carrucel ="";

    carrucel = `
    
    <div class="container p-1 cambiarFondo" style="width: 100%; border-radius: 10px;">

        <div id="carouselExampleControls" class=" carousel slide" data-ride="carousel" data-interval="0">
            <div class="carousel-inner img-thumbnail" style="border-radius: 10px;">
                <div class="carousel-item active">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[0] + ` " alt="First slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[3] + ` " alt="Second slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[2] + ` " alt="Third slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[1] + ` " alt="Third slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[4] + ` " alt="Third slide">
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
    
    </div>

    `;

    document.getElementById("carusel").innerHTML += carrucel;

    ponerDescripcion(product);

    // Obtengo el objeto .json de los comentarios del producto
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObjComentarios){
        if (resultObjComentarios.status === "ok"){
            const largo = resultObjComentarios.data.length;
            
            var arrayDeScores = [];
            for(let arr=0; arr<largo; arr++){
                arrayDeScores[arr] = resultObjComentarios.data[arr].score;
            }
            ponerComentarios(arrayDeScores, largo, resultObjComentarios.data);
        }
    });

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){  
            showProductInfo(resultObj.data);
            console.log(resultObj.data);
            productInfoResult = resultObj.data.relatedProducts;
            console.log(productInfoResult);
        }

    });

    getJSONData(PRODUCTS_URL).then(function(resultObjRelated){
        if (resultObjRelated.status === "ok"){
            ponerProductosRelacionados(resultObjRelated.data);
        }

    });

});