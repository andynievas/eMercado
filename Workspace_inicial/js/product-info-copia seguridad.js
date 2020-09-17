

const fondoColor = "rgb(227,245,244)";

var productInfoResult;

var arrayDelNuevoComentario = [];

function setearColorFondo(){
    var largoG = document.getElementsByClassName("cambiarFondo");
    // document.getElementById("titulo").style = "background-color: " + fondoColor + ";";
    for(let i=0; i<largoG.length; i++){
        largoG[i].style.background = fondoColor ;
    }
}

function ponerNombre(product){

    let htmlContentToAppend = `
        <div class="border-top p-0 site-header posisionAbs alert-info" style="height: 50px; ">
            <h3 class="m-1 text-center" style="font-weight: bold;">` + product.name + `</h3>
        </div>
         ` ;
    
    document.getElementById("titulo").innerHTML += htmlContentToAppend;

}

function ponerBotonCollapsable(){

    let htmlToApend = `
        <p>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Ver +info
            </button>
        </p>

        <div class="collapse" id="collapseExample">

            <div style="display: flex;" id="carusel">
            </div>

        </div>` ;

    document.getElementById("contenedorImagenes").innerHTML += htmlToApend;
}

function ponerImagenes(product){
    var htmlContentToAppend = `
    <div class="p-0" style="width: 19%;">
        <div class=" p-0">
            <div class=" ">
                <img src="` + product.images[0] + `" alt="` + product.name + `" class="img-thumbnail">
            </div>`;
        
        if( product.images.length > 1 ){
            for(let h=1; h < product.images.length; h++ ){
                htmlContentToAppend += `
                <div class=" ">
                    <img src="` + product.images[h] + `" alt="` + product.name + `" class="img-thumbnail">
                </div>`;
            }
            
        }

    htmlContentToAppend += `
        </div>
    </div> ` ;
    document.getElementById("carusel").innerHTML += htmlContentToAppend;
}

function ponerPrecio(product){
    let htmlContentToAppend = `
    <div class="p-1 d-flex cambiarFondo">
        <h5 style="width: 30%">Categoría: ` + product.category + `</h5>
        <h4 class="text-center" style="font-size: 28px; font-weight: bold; width: 40%;" >` + product.currency + ` - ` + product.cost + `</h4>
        <h5 style="width: 30%; text-align: right;">` + product.soldCount + ` artículos vendidos</h5>
    </div>
    `;

    document.getElementById("Descripcion").innerHTML += htmlContentToAppend;
}

function ponerDescripcion(product){

    let htmlContentToAppend = `
        <div class="cambiarFondo border-top my-3">
            
            <div class=" justify-content-between">
                <h4 class="py-2" style="color: black;">Descripción del artículo: </h4>
                <h6 class="m-1 ">  ` + product.description + `</h6>
            </div>
                    
        </div>` ;
    
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
        estrellotas[g].innerHTML +=  `<span class="p-0 border-top" style=" display: block;">Fecha: ` + comentarios[g].dateTime + `</span> `; // Tambien queda lindo con:  "border-top: 1px black solid; border-bottom: 2px skyblue solid;"
    }
}

function ponerInfoDeRelated(arrayDeProducts){  //  Incluir nombre e imagen del producto relacionado
    var agregarARelated = ""; // productInfoResult = [1, 2, 3, 0, 1, 1];
    
    for(let n=0; n<productInfoResult.length; n++){
        agregarARelated += 
        
        `<div class="m-2" style="width: 165px; display: inline-block;">
            <a href="#" class="card p-1 list-group-item-action shadow col-12" style="min-width: 40px; display: inline-block;">
                <img style="width: 100%;" src=" ` + arrayDeProducts[ productInfoResult[n]].imgSrc + ` ">
                <h6 class="p-2 m-0" style="font-size: 20px;">`
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
    
    <div class="container p-0" id="productsRelacionados" ></div>
    
    `;
    // for(let jota=0; jota<productInfoResult.length; jota++){
        document.getElementById("Related").innerHTML += divToAppend;
    // }

    ponerInfoDeRelated(arrayDeProducts);
    // setearColorFondo();
}

//    col-md-6

function crearElemento(largo){
    var divToAppend ="";
    
    for(let jota=0; jota<largo; jota++){
        divToAppend = `
        <div class=" comentarioSuper  card px-3 py-1 mb-3 shadow " style="width: 49%; border: 2px rgb(255, 255, 255,) solid; border-radius: 10px; display: inline-block;">
            <div class="comentarios "></div>
        </div>
        `;
        document.getElementById("comentariosYpuntuacion").innerHTML += divToAppend;
    }
}


function ponerComentarios(comentarios, largo, resultComentarios){   // y tambien las estrellas
    crearElemento(largo);
    
    var estrelliitas = document.getElementsByClassName("comentarios");
    var estrellotas = document.getElementsByClassName("comentarioSuper");

    for(let j=0; j<largo; j++){
        ponerEstrellas(comentarios[j], j, estrelliitas);
    }

    ponerUserDeComentario(resultComentarios, estrelliitas, largo);

    ponerDescripcionDeComentario(resultComentarios, estrellotas, largo);
    ponerFechaDeComentario(resultComentarios, estrellotas, largo);
}

function showProductInfo(product){

    ponerNombre(product);
    ponerBotonCollapsable();
    ponerImagenes(product);

    let carrucel ="";

    carrucel = `
    
    <div class="pl-1 cambiarFondo" style="width: 100%; border-radius: 10px; z-index: 2;">

        <div id="carouselExampleControls" class=" carousel slide" data-ride="carousel" data-interval="0">
            <div class="carousel-inner img-thumbnail" style="border-radius: 10px;">
                <div class="carousel-item active">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[0] + ` " alt="First slide">
                </div>`;
        if(product.images.length > 1 ){
            for(let j=1; j<product.images.length; j++){
                carrucel += `
                <div class="carousel-item">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[j] + ` " alt="Second slide">
                </div>`;
            }
        }// podria poner un ELSE para que muestre una foto que diga que no hay mas fotos, o que luego se publicaran mas fotos
                
    carrucel +=`
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

    ponerPrecio(product);
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
    
    getJSONData(PRODUCTS_URL).then(function(resultObjRelated){
        if (resultObjRelated.status === "ok"){
            ponerProductosRelacionados(resultObjRelated.data);
        }

    });
}

//  Funcion para buscar el json correspondiente a cada producto por su identificador
function incluyeId(url){
    var urLdeBusqueda = url.href;
    var posIndex = "";


    if( urLdeBusqueda.includes( "?id" ) || urLdeBusqueda.includes( "&id" ) ){

        posIndex = urLdeBusqueda.indexOf("?id", 0);
        urLdeBusqueda = urLdeBusqueda.slice(posIndex+4, urLdeBusqueda.length);
        
        return urLdeBusqueda;
    }
}

function ponerEstrellasNewCom(score){
    var stars=""; //<span style='padding-left: 14px;'></span>

    for(let a=0; a<score ; a++){
        stars += `<span class="fa fa-star checked"></span>
        `;
    }
    for(let b=0; b<5-score; b++){
        stars += `<span class="fa fa-star" style="color: black;"></span>
        `;
    }
    return stars;
}

//  Añadir comentario nuevo
var comentarioNuevo = document.getElementById("sendComentario");
var contador = 4;

comentarioNuevo.addEventListener("click", function(){
    var comentarioToAppend = document.getElementById("textoDelComentario");
    var estrellotas = document.getElementsByClassName("comentarios");

    if(comentarioToAppend.value != ""){
        var comentaSuperr = document.getElementsByClassName("comentarioSuper");
        var hoy = new Date();
        crearElemento(1);
        
        arrayDelNuevoComentario[0] = {"user": localStorage.getItem("user") , "description": comentarioToAppend.value, "dateTime": hoy.getFullYear() + '-' + ( hoy.getMonth() +1 ) + '-' + hoy.getDay() + ' ' + hoy.getHours() + ':' + hoy.getMinutes() };
        estrellotas = [estrellotas[contador]];
        comentaSuperr = [comentaSuperr [contador] ];
        
        var score = document.querySelector('input[name = "rankingEstrellas"]:checked').value;
        
        var stars = ponerEstrellasNewCom(score);
        
        document.getElementsByClassName("comentarios")[contador].innerHTML += stars;
        
        ponerUserDeComentario(arrayDelNuevoComentario, estrellotas, 1);
        ponerDescripcionDeComentario(arrayDelNuevoComentario, comentaSuperr, 1);
        ponerFechaDeComentario(arrayDelNuevoComentario, comentaSuperr, 1);
        
        // document.getElementById
        contador += 1;
        comentarioToAppend.value = "";
    }

});
    
    
    
    
    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    var URLactual = window.location;
    var idProducto = incluyeId(URLactual);

    getJSONData(PRODUCTS_AWS_URL + idProducto).then(function(resultObj){
        if (resultObj.status === "ok"){

            showProductInfo(resultObj.data);
            productInfoResult = resultObj.data.relatedProducts;
        }

    });

});