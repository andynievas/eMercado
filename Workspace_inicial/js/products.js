
var deRepuestoCurrentProductsArray = [];
var currentProductsArray = [];
var currentSortCriteria = undefined;

var minCount = undefined;
var maxCount = undefined;
var varParaBuscar = '';
var arrayParaBuscar = [];

var textBox = document.getElementById('buscador');
textBox.value = '';

function showProductsList(){

    let htmlContentToAppend = "";
    let arrayTags_P5 = document.getElementsByClassName("container");
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action" id="borrame`+i+`">
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

        arrayParaBuscar[i] = product.name;
        arrayParaBuscar[i] += '. ';
        arrayParaBuscar[i] += product.description;
    }
    
    arrayTags_P5[2].innerHTML = htmlContentToAppend;
}

function ordenarByPrecioAsc(array){
    
    var aux;
    var maximo = 0;
    
    for(let i=0; i<array.length; i++){

        maximo = i;
        
        for(let j=i; j<array.length; j++){
            if(array[j].cost > array[maximo].cost){
                maximo = j;
            }
        }

        aux = array[i];
        array[i] = array[maximo];
        array[maximo] = aux;
    }

    return array;
}

function ordenarByPrecioDesc(array){
    
    var aux;
    var minimo = array[0];
    
    for(let i=0; i<array.length; i++){

        minimo = i;
        
        for(let j=i; j<array.length; j++){
            if(array[j].cost < array[minimo].cost){
                minimo = j;
            }
        }
        aux = array[i];
        array[i] = array[minimo];
        array[minimo] = aux;
    }

    return array;
}

function ordnarByRelevancia(array){

    var aux;
    var masRelevante = array[0];
    
    for(let i=0; i<array.length; i++){

        masRelevante = i;
        
        for(let j=i; j<array.length; j++){
            if(array[j].soldCount > array[masRelevante].soldCount){
                masRelevante = j;
            }
        }
        aux = array[i];
        array[i] = array[masRelevante];
        array[masRelevante] = aux;
    }

    return array;
}

function sortProducts(criteria, array){
    let result = [];

    if(criteria === "price_asc"){
        result = ordenarByPrecioAsc(array);

    }else if(criteria === "price_desc"){
        result = ordenarByPrecioDesc(array);

    }else if(criteria === "by_relevancia"){
        result = ordnarByRelevancia(array);
    }
    

    return result;
}

function ShowProducts(productsArray){

    if(productsArray != undefined){    //  Si el Array tiene algo entra en el if
        deRepuestoCurrentProductsArray = currentProductsArray = productsArray;
    }

    //Muestro los productos
    showProductsList();
    
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = deRepuestoCurrentProductsArray;

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

function filtrarPrecioAsc(contenedor, contenedorParaBotones){
    getElementById("buscador").value; // Agarrar el valor del input buscador para ordenar los elementos
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            ShowProducts(resultObj.data);
            filtrarPorTecleo();
        }

    });

});

document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts("price_asc");
});

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts("price_desc");
});

document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProducts("by_relevancia");

});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList();
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showProductsList();
});

// Desafiate (Entrega 2) //  Buscador que muestra el resultado con cada letra que se oprime

//  Funcion que devuelve un array con unicamente el nombre y la descripcion de los articulos (para comparar)
function generarArrayFiltrado(){
    
    var arrayFiltrado = [];

    for(let j=0; j<deRepuestoCurrentProductsArray.length; j++){
    
        arrayFiltrado[j] = deRepuestoCurrentProductsArray[j].name + '. ' + deRepuestoCurrentProductsArray[j].description;
    }
    //console.log(arrayFiltrado[0].toLowerCase() );
    
    for(let i=0; i<arrayFiltrado.length; i++){
        arrayFiltrado[i] = arrayFiltrado[i].toLowerCase();
    }
    
    return arrayFiltrado;

}

function filtrarPorTecleo(){
    var h = 0;
    var arrayFiltrado = generarArrayFiltrado(); console.log(arrayFiltrado);
    currentProductsArray = [];
        
        for(let i=0; i<4; i++){  // Bucle para filtrar el array que verifica/compara si el texto buscado esta en

            if( arrayFiltrado[i].includes(textBox.value) ){  // Si se encuentra la busqueda se actualiza el array
                currentProductsArray[h] = deRepuestoCurrentProductsArray[i]; // Actualizo el array global
                h++;
            }
        }

}
    
    var nombre = "";
    
    textBox.addEventListener('keyup', function(){

        if( event.key !== 'Backspace' && event.key !== 'Enter'){
            nombre += event.key;
        }else if(event.key == 'Backspace'){
            nombre = nombre.slice(0, nombre.length-1);
        }
        
        filtrarPorTecleo();
        ShowProducts();
        
    });
