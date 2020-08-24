
var currentProductsArray = [];
var minCount = undefined;
var maxCount = undefined;

function showProductsList(){

    let htmlContentToAppend = "";
    let arrayTags_P5 = document.getElementsByClassName("container");
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.productCount) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description +`</p>
                        <p style="font-family: 'Audiowide'; font-weight: bold;"> ` + product.currency + ` - ` + product.cost + ` </p>
                    </div>
                </div>
            </a>
            `
        }

    }
    
    arrayTags_P5[1].innerHTML += htmlContentToAppend;

    arrayTags_P5[1].id = "p5";
}


function ShowProducts(productsArray){

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    //Muestro los productos
    showProductsList();
    
}

function ola(contenedor, contenedorParaBotones){
    getElementById("buscador").value; // Agarrar el valor del input buscador para ordenar los elementos
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            ShowProducts(resultObj.data);
            console.log(resultObj.data);
        }
    });
    
});
