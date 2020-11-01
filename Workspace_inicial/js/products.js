
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
    let seccionProductos = document.getElementById("seccionProductos");
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <a href="product-info.html" class="mb-2 list-group-item list-group-item-action shadow" id="`+product.id+`" style="padding-left: 1vw; padding-right: 1vw;" onclick="saveId(this.id)">
                    <div class="row p-0 m-0">
                        <div class="p-0 col-12"><center>
                            <img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail" style="width: 96%;"></center>
                        </div>
                        <div class="px-2 col">
                            <div class=" w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name +`</h4>
                            </div>
                            <p class="mb-1">` + product.description +`</p>
                            <p class="m-0 p-0 text-muted">` + product.soldCount + ` vendidos</p>
                            <p class="m-0" style="font-family: 'Audiowide'; font-weight: bold;"> ` + product.currency + ` - ` + product.cost + ` </p>
                        </div>
                    </div>
                </a>
            </div>
            `
        }

        arrayParaBuscar[i] = product.name;
        arrayParaBuscar[i] += '. ';
        arrayParaBuscar[i] += product.description;
    }

    seccionProductos.innerHTML = htmlContentToAppend;
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


function saveId(id){
    localStorage.setItem("idProduct", id);
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_AWS_URL).then(function(resultObj){
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
    var arrayFiltrado = generarArrayFiltrado();
    currentProductsArray = [];
        
    for(let i=0; i<4; i++){  // Bucle para filtrar el array que verifica/compara si el texto buscado esta en

        if( arrayFiltrado[i].includes(textBox.value.toLowerCase() ) ){  // Si se encuentra la busqueda se actualiza el array
            currentProductsArray[h] = deRepuestoCurrentProductsArray[i]; // Actualizo el array global
            h++;
        }
    }

}
    
var nombre = "";
    
textBox.addEventListener('keyup', function(event){
    console.log(event);

    if( event.key !== 'Backspace' && event.key !== 'Enter'){
        console.log(event.code);
        nombre += event.key;
    }else if(event.key == 'Backspace'){
        nombre = nombre.slice(0, nombre.length-1);
    }
        
    filtrarPorTecleo();
    ShowProducts();   
});

document.getElementById("buscador").addEventListener("click", ()=> {
    setTimeout( ()=> {
        filtrarPorTecleo();
        ShowProducts();
    }, 100);
});

