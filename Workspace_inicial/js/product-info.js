

const fondoColor = "rgb(227,245,244)";

var productInfoResult;

var arrayDelNuevoComentario = [{}];

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
        <a class="text-center responsiveFont d-block mx-4 p-0" title="El costo del producto puede variar según la ubicación del envío." data-toggle="popover" data-trigger="hover" data-content="" style="font-weight: bold; margin: auto; z-index: 1;">Precio: ` + product.currency + ` - `  + product.cost + `</a>
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
                <h5 class="card-title"><img src="https://thispersondoesnotexist.com/image" name="${array[posArray].user}" style="width: 50px; margin-right: 15px; border-radius: 50%;">` + array[posArray].user + `</h5>
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

function colorearEstrellas(id){
    id = id.slice( id.length - 1 , id.length );
    // var pintar = document.getElementsByClassName('checkmark');
    var pintar = document.getElementsByClassName('rating');
    for(let i=0; i<pintar.length; i++){
        if(i < id){
            // pintar[i].className = ' checkmark m-0 py-2 pintado ';
            pintar[i].className = ' fa fa-star checked rating animate__animated animate__flip ';
        }else{
            // pintar[i].className = 'checkmark m-0 py-2';
            pintar[i].className = ' fa fa-star rating nonChecked animate__animated animate__headShake ';
        }
    }
}

function modalDeSweetAlert(){
    // Mostrar modal de sweet Alert para nuevo comentario
    Swal.fire({
        title: '<strong>Que tal te pareció el producto?</strong>',
        icon: 'info',
        html:
          '<div class="mb-2" id="starRating"></div>' +
          '<div style="width: 100%;" id="textAreaParaComentarioNuevo" ></div> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Publicar',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          'Cerrar',
        cancelButtonAriaLabel: 'Thumbs down'
    }).then((result) => {
        if (result.isConfirmed){
            validarSiComentarioVacio();
        }

    });

    // Añadir estrellas en el modal
    let htmlToApend = `
    <div class="d-flex">
        <label class="container m-0 p-0 pointer" for="inlineRadio1">
            <input class="form-check-input d-none" type="radio" name="rankingEstrellas" id="inlineRadio1" value="1" onClick="colorearEstrellas(this.id)">
            <p class="checkmark m-0 py-2 sombraCaserita " style="height: 40px; border-radius: 10px 0px 0px 10px;" > <i class="fa fa-star checked rating"></i></p>
        </label>

        <label class="container m-0 p-0 pointer" for="inlineRadio2">
            <input class="form-check-input d-none" type="radio" name="rankingEstrellas" id="inlineRadio2" value="2" onClick="colorearEstrellas(this.id)">
            <p class="checkmark m-0 py-2 sombraCaserita " style="height: 40px;" > <i class="fa fa-star checked rating"></i></p>
        </label>

        <label class="container m-0 p-0 pointer" for="inlineRadio3">
            <input class="form-check-input d-none" type="radio" name="rankingEstrellas" id="inlineRadio3" value="3" onClick="colorearEstrellas(this.id)">
            <p class="checkmark m-0 py-2 sombraCaserita " style="height: 40px;" > <i class="fa fa-star checked rating"></i></p>
        </label>

        <label class="container m-0 p-0 pointer" for="inlineRadio4">
            <input class="form-check-input d-none" type="radio" name="rankingEstrellas" id="inlineRadio4" value="4" onClick="colorearEstrellas(this.id)">
            <p class="checkmark m-0 py-2 sombraCaserita " style="height: 40px;" > <i class="fa fa-star checked rating"></i></p>
        </label>

        <label class="container m-0 p-0 pointer" for="inlineRadio5">
            <input class="form-check-input d-none" type="radio" name="rankingEstrellas" id="inlineRadio5" value="5" checked="checked" onClick="colorearEstrellas(this.id)" >
            <p class="checkmark m-0 py-2 sombraCaserita " style="height: 40px; border-radius: 0px 10px 10px 0px;" > <i class="fa fa-star checked rating"></i></p>
        </label>
    </div>
    `;

    document.getElementById("starRating").innerHTML = htmlToApend;

    htmlToApend = `
        <textarea class="form-control btn-light mb-3 border" id="textoDelComentario" placeholder="Escribe tu comentario aquí..." value="" style="display: block; background-color: rgb(220,220,220); height: 70px;"></textarea>
    `;

    document.getElementById("textAreaParaComentarioNuevo").innerHTML = htmlToApend;

}

function validarSiComentarioVacio(){
    //  Añadir comentario nuevo
    var comentarioToAppend = document.getElementById("textoDelComentario");

    if(comentarioToAppend.value != ""){
        var hoy = new Date();
        var score = document.querySelector('input[name = "rankingEstrellas"]:checked').value;
        arrayDelNuevoComentario[0] = {"user": localStorage.getItem("user") , "description": comentarioToAppend.value, "dateTime": hoy.getFullYear() + '-' + ( hoy.getMonth() +1 ) + '-' + hoy.getDate() + ' ' + hoy.getHours() + ':' + hoy.getMinutes(), "score": score };

        addCardColumn(1, arrayDelNuevoComentario);  // Le paso el valor 1 como parametro porque es el largo del array con los detalles del nuevo comentario
        
        comentarioToAppend.value = "";

        ponerImgUserInComment();

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Comentario publicado',
            showConfirmButton: false,
            timer: 1500
        });

    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Comentario vacío',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function addNewUserComentStructure(){
    
    //  Añadir modal de Bootstrap para realizar un nuevo comentario
    let htmlToApend = `
        <!-- Comienza el modal -->    

      <!-- Termina el modal -->`;//data-dismiss="modal"

    // Añadir boton que activa el modal
    htmlToApend = `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" onClick="modalDeSweetAlert()">
      Presiona aquí para realizar un comentario
    </button>`;
    document.getElementById("seccionComentario").innerHTML += htmlToApend;
}

function saveId(id){
    localStorage.setItem("idProduct", id);
}

function ponerInfoDeRelated(arrayDeProducts){  //  Incluir nombre e imagen del producto relacionado
    var agregarARelated = "";
    
    for(let n=0; n<productInfoResult.length; n++){
        agregarARelated += 
        
        `<div class="m-1" style="width: 160px; display: inline-block;">
            <a href="product-info.html" id="` + arrayDeProducts[ productInfoResult[n] ].id + `" onclick="saveId(`+ arrayDeProducts[ productInfoResult[n] ].id +`)" class="card p-1 list-group-item-action shadow col-12" style="min-width: 40px; display: inline-block;">
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

function ponerProductosRelacionados(arrayDeProducts, arrProductsRel){    //  Incluir seccion y formato para los productos relacionados
    console.log(arrayDeProducts); // El array completo con todos los autos
    console.log(arrProductsRel); // El array con los autos relacionados
    var divToAppend = `
    
    <div class="container p-0" id="productsRelacionados" ></div>
    
    `;

    document.getElementById("Related").innerHTML += divToAppend;

    var agregarARelated = "";
    
    for(let n=0; n<arrProductsRel.length; n++){
        agregarARelated += 
        
        `<div class="m-1" style="width: 160px; display: inline-block;">
            <a href="product-info.html" id="` + arrayDeProducts[arrProductsRel[n]].id + `" onclick="saveId(`+ arrayDeProducts[arrProductsRel[n]].id +`)" class="card p-1 list-group-item-action shadow col-12" style="min-width: 40px; display: inline-block;">
                <img style="width: 100%;" src=" ` + arrayDeProducts[arrProductsRel[n]].imgSrc + ` ">
                <h6 class="p-2 m-0" style="font-size: 20px;">`
                    + arrayDeProducts[arrProductsRel[n]].name + 
                `</h6>
                <h6>
                    <span class=" p-2 m-0" style="font-size: 15px;">` + arrayDeProducts[arrProductsRel[n]].currency+` - `+arrayDeProducts[arrProductsRel[n]].cost + `</span>
                </h6>
            </a>
        </div>`;
    }
    document.getElementById("productsRelacionados").innerHTML = agregarARelated;
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
        }
    });

    addNewUserComentStructure();
    console.log(product.relatedProducts);
    getJSONData(PRODUCTS_AWS_URL + 'linkProducts.json').then(function(resultObjRelated){
        if (resultObjRelated.status === "ok"){
            ponerProductosRelacionados(resultObjRelated.data, product.relatedProducts);
        }

    });

}

function addPopOver(){
    let paraAnadir= `
    
    <h3>Popover Example</h3>
    <a href="#" autofocus="autofocus" id="popOver" title="Dismissible popover" data-toggle="popover" data-trigger="focus" data-content="Click anywhere in the document to close this popover">Click me</a>
    
    `;
    
    document.getElementById("addPopOver").innerHTML += paraAnadir;
}

function pintarImgProfile(){
    if( localStorage.getItem('imgProfile') ){
      return localStorage.getItem('imgProfile');
    }else{
      return 'https://thispersondoesnotexist.com/image';
    }
}

function ponerImgUserInComment(){
    let comentarioPersonal = document.getElementsByName(localStorage.getItem('user') );
    for(let i=0; i<comentarioPersonal.length; i++){
        comentarioPersonal[i].src = pintarImgProfile();
        console.log('Estoy dentro de poner img usuario en comentario nuevo');
    }
}

// Funcion que retorna la posicion del array en donde se encuentra una CLAVE
function encontrarID(array, id){
    for(let i=0; i<array.length; i++){
        if(array[i].id === id){
            console.log('entra en el if');
            return i;
        }
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    console.log( 'la URL esssssss: ' );
    console.log( PRODUCTS_AWS_URL + localStorage.getItem("idProduct") + '.json' );

    getJSONData(PRODUCTS_AWS_URL + localStorage.getItem("idProduct") + '.json' ).then(function(resultObj){
        if (resultObj.status === "ok"){

            console.log('resultObj.data es: ');
            console.log(resultObj.data);

            showProductInfo( resultObj.data );
            productInfoResult = resultObj.data.relatedProducts;

            /* Empieza una funcion para el pop OVER */

            setTimeout(function() {
                console.log("Esperar...");
          
                $(document).ready(function(){
                  $('[data-toggle="popover"]').popover('show');
              });
        
            //   userImage.load("img/cat9.jpg");
          
              }, 1000);
        
              setTimeout( () => {
                //   .popover('disable');
                  $(document).ready(function(){
                    $('[data-toggle="popover"]').popover('hide');
                });
        
              }, 5000);

            /* Termina la funcion */
        }

    });


});

function anadeUnDiv (){
    document.getElementById("Descripcion").innerHTML += `
    <p>Andy</p>
    <img src="https://thispersondoesnotexist.com/image" width="50%">
    `;
}