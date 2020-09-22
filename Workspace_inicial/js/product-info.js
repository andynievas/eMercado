

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

    var barNavv =  document.getElementsByTagName("nav");
    let htmlContentToAppend = `
    <div class="cambiarFondo" id="titulo" style="height: 30px;">
        <div class=" p-0 site-header  alert-info" style="height: 35px; ">
        <h3 class="m-1 text-center" style="font-weight: bold;">` + product.name + `</h3>
        </div>
    </div>` ;
    
    barNavv[0].innerHTML += htmlContentToAppend;

}

function ponerBotonCollapsable(){

    let htmlToApend = `
        <p >
            <button class="btn btn-info btn-block" id="botonModal" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Ver imágenes
            </button>
        </p>

        <div class="collapse" id="collapseExample">

            <div class="border-bottom pb-3" style="display: flex;" id="carusel">
            </div>

        </div>` ;

    document.getElementById("contenedorImagenes").innerHTML += htmlToApend;
}

function ponerImagenes(product){
    var htmlContentToAppend = `
    
        <div class="row py-1 my-1 mx-0"> `;
        
            for(let h=0; h < product.images.length; h++ ){
                htmlContentToAppend += `
                <div class="col p-1">
                    <img src="` + product.images[h] + `" alt="` + product.name + `" class="img-thumbnail" style="width: 120px;">
                </div>`;
            }

    htmlContentToAppend += `
        </div> ` ;
    document.getElementById("collapseExample").innerHTML += htmlContentToAppend;
}

function ponerPrecio(product){
    let htmlContentToAppend = `
    <h5 class="mx-0 my-1 responsiveAlign responsiveAlignLeft" style="width: 100%">Categoría: ` + product.category + `</h5>`;
    // <div class="pt-2 d-flex cambiarFondo border-top ">
            
    document.getElementById("categoria").innerHTML += htmlContentToAppend;
    
    
    htmlContentToAppend = `
        <a href="#" class="btn text-center responsiveFont p-0" autofocus="autofocus" title="El costo del producto puede variar según la ubicación del envío." data-toggle="popover" data-trigger="focus" data-content="Toca en cualquier lado para cerrar" style=" font-weight: bold; width: 100%;">Precio: ` + product.currency + ` - `  + product.cost + `</a>
        `;
    // </div>

    document.getElementById("popOver").innerHTML += htmlContentToAppend;

    htmlContentToAppend = `
        <h5 class="mx-0 my-1 responsiveAlign responsiveAlignRight" style="width: 100%;">` + product.soldCount + ` artículos vendidos</h5>
    `;

    document.getElementById("vendidos").innerHTML = htmlContentToAppend;
}

function ponerDescripcion(product){

    let htmlContentToAppend = `
        <div class="cambiarFondo border-top my-3">
            
            <div class=" justify-content-between">
                <h4 class="py-2 " style="color: black;">Descripción del artículo: </h4>
                <h6>  ` + product.description + `</h6>
            </div>
                    
        </div>` ;
    
    document.getElementById("Descripcion").innerHTML += htmlContentToAppend;

}

function addCardInGroup(array, posArray){

    let cardToApend = ` `;
        
        cardToApend = `
        <div class="card col-sm-12 col-md-6 col-lg-4 col-xl-3 px-0 mb-2">
            <div class="card-body px-4">
                <h5 class="card-title" >` + ponerEstrellas(array[posArray].score) + `</h5>
                <h5 class="card-title">` + array[posArray].user + `</h5>
                <p class="card-text">` + array[posArray].description + `.</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated ` + array[posArray].dateTime + `</small>
            </div>
        </div>`;
        
    document.getElementById("cardColumn").innerHTML += cardToApend;
}

function addCardColumn(largo, array){

    let htmlToApend = `<!-- Comienza una prueba de Card Column -->
    <div class="">
      <div class="row mx-1" id="cardColumn">
      </div>
    </div>
    <!-- Comienza una prueba de Card Column -->`;

    document.getElementById("comentariosYpuntuacion").innerHTML += htmlToApend;

    for(let u=0; u<largo; u++){
        
        addCardInGroup(array, u);
    }
}

function ponerEstrellas(score){
    var stars="";

    for(let a=0; a<score ; a++){
        stars += `<span class="fas fa-star checked"></span>
        `;
    }
    for(let b=0; b<5-score; b++){
        stars += `<span class="far fa-star" style="color: orange;"></span>
        `;
    }

    return stars;
}

function addNewUserComentStructure(){

    //  Añadir modal para escribir un comentario
    let htmlToApend = 
        `<!-- Comienza el modal -->    

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Comentario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <div class="form-check form-check-inline p-2" id="starRating">
                </div>
    
                <div style="width: 100%;">
                  <textarea class="form-control btn-light mb-3 border" id="textoDelComentario" placeholder="Escribe tu comentario aquí..." value="" style="display: block; width: 100%; height: 70px;"></textarea>
                  <button class="btn btn-primary" id="sendComentario" style="width: 100%;">Enviar</button>
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      <!-- Termina el modal -->`;

    document.getElementById("modalContainer").innerHTML += htmlToApend;

    // Añadir estrellas en el modal
    htmlToApend = `
    <div >
        <label class="form-check-label" for="inlineRadio1" style="padding-right: 30px; display: block;"><i class="fa fa-star checked"></i>1</label>
        <input class="form-check-input" type="radio" name="rankingEstrellas" id="inlineRadio1" value="1">
    </div>
    <div>
        <label class="form-check-label" for="inlineRadio2" style="padding-right: 30px; display: block;" ><i class="fa fa-star checked"></i>2</label>
        <input class="form-check-input" type="radio" name="rankingEstrellas" id="inlineRadio2" value="2">
    </div>
    <div>
        <label class="form-check-label" for="inlineRadio3" style="padding-right: 30px; display: block;" ><i class="fa fa-star checked"></i>3</label>
        <input class="form-check-input" type="radio" name="rankingEstrellas" id="inlineRadio3" value="3">
    </div>
    <div>
        <label class="form-check-label" for="inlineRadio4" style="padding-right: 30px; display: block;" ><i class="fa fa-star checked"></i>4</label>
        <input class="form-check-input" type="radio" name="rankingEstrellas" id="inlineRadio4" value="4">
    </div>
    <div>
        <label class="form-check-label" for="inlineRadio5" style="padding-right: 30px; display: block;" ><i class="fa fa-star checked"></i>5</label>
        <input class="form-check-input" type="radio" name="rankingEstrellas" id="inlineRadio5" value="5" checked>
    </div> ` ;

    document.getElementById("starRating").innerHTML = htmlToApend;

    // Añadir boton que activa el modal
    htmlToApend = `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Presiona aquí para realizar un comentario
    </button>`;
    document.getElementById("seccionComentario").innerHTML += htmlToApend;
}

function ponerInfoDeRelated(arrayDeProducts){  //  Incluir nombre e imagen del producto relacionado
    var agregarARelated = "";
    
    for(let n=0; n<productInfoResult.length; n++){
        agregarARelated += 
        
        `<div class="m-1" style="width: 160px; display: inline-block;">
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

function ponerComentarios(largo, resultComentarios){   // y tambien las estrellas

    addCardColumn(largo, resultComentarios);
    
}

function showProductInfo(product){

    ponerNombre(product);
    ponerBotonCollapsable();
    ponerImagenes(product);

    let carrucel ="";

    carrucel = `
    
    <div class="cambiarFondo" style="width: 100%; border-radius: 10px; z-index: 2;">

        <div id="carouselExampleControls" class=" carousel slide" data-ride="carousel" data-interval="0">
            <div class="carousel-inner img-thumbnail" style="border-radius: 10px;">
                <div class="carousel-item active">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[0] + ` " alt="First slide">
                </div>`;
        
            for(let j=1; j<product.images.length; j++){
                carrucel += `
                <div class="carousel-item">
                    <img class="d-block w-100" style="border-radius: 6px;" src=" ` + product.images[j] + ` " alt="Second slide">
                </div>`;
            }
        // podria poner un ELSE para que muestre una foto que diga que no hay mas fotos, o que luego se publicaran mas fotos
                
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
            ponerComentarios(largo, resultObjComentarios.data);
            console.log(resultObjComentarios.data);
        }
    });

    addNewUserComentStructure();
    
    getJSONData(PRODUCTS_URL).then(function(resultObjRelated){
        if (resultObjRelated.status === "ok"){
            ponerProductosRelacionados(resultObjRelated.data);
        }

    });

    //  Añadir comentario nuevo
    var comentarioNuevo = document.getElementById("sendComentario");

    comentarioNuevo.addEventListener("click", function(){
        var comentarioToAppend = document.getElementById("textoDelComentario");
        

        if(comentarioToAppend.value != ""){
            
            var hoy = new Date();
            
            var score = document.querySelector('input[name = "rankingEstrellas"]:checked').value;

            arrayDelNuevoComentario[0] = {"user": localStorage.getItem("user") , "description": comentarioToAppend.value, "dateTime": hoy.getFullYear() + '-' + ( hoy.getMonth() +1 ) + '-' + hoy.getDate() + ' ' + hoy.getHours() + ':' + hoy.getMinutes(), "score": score };

            addCardColumn(1, arrayDelNuevoComentario);  // Le paso el valor 1 como parametro porque es el largo del array con los detalles del nuevo comentario
            
            comentarioToAppend.value = "";
        }else alert("Comentario vacío");

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

function addPopOver(){
    let paraAnadir= `
    
    <h3>Popover Example</h3>
    <a href="#" autofocus="autofocus" id="popOver" title="Dismissible popover" data-toggle="popover" data-trigger="focus" data-content="Click anywhere in the document to close this popover">Click me</a>
    
    `;
    
    document.getElementById("addPopOver").innerHTML += paraAnadir;
}





    
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    var URLactual = window.location;
    var idProducto = incluyeId(URLactual);

    getJSONData(PRODUCTS_AWS_URL + localStorage.getItem("idProduct") ).then(function(resultObj){
        if (resultObj.status === "ok"){

            showProductInfo(resultObj.data);
            productInfoResult = resultObj.data.relatedProducts;
        }

    });
    
    //  Funcion para el POPOVER
    setTimeout(function() {
        console.log("Esperar...");
  
        $(document).ready(function(){
          $('[data-toggle="popover"]').popover('show');
      });
  
      }, 2000);

});

