
const CART_INFO_TWO_PRODUCTS_URL = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
var subtotal = "";
var allSubtotals = [];




function showCartInfo (infoCart) {
    var contentToAdd = `
    <div>
        <h3>Artículos a comprar</h3>
        <hr>`;

        for(let i=0; i<infoCart.length; i++) {
            contentToAdd += `
            <div class="row my-3 mx-0">
                <div class="col-12 col-md-3 col-lg-2 p-0 pr-3">
                    <img class="img-thumbnail mr-4" style="width: 160px;" src="` + infoCart[i].src + `" >    
                </div>
                
                <div class="col-12 col-md-9 col-lg-10 p-0">
                    <h3 class="mt-2">` + infoCart[i].name + `.</h3>
                    <div class="row m-0">
                        <span class="mr-3 " style="font-size: 20px;">Cant.</span>
                        <input type="number" class="form-control mr-4 pb-0 pt-0" pos="${i}" id="productNumber`+ i +`" onChange="calcularSubtotal(this)" min="0" max="10" value="`+ infoCart[i].count +`" cost="`+ infoCart[i].unitCost +`" currency="${infoCart[i].currency}" style="width: 60px; height: 28px; font-size: 18px; font-family: 'Armata';" value="`+ infoCart.count +`" />
                        <span class="m-0 " style="font-size: 20px; width: 330px;">Costo por unidad (`+ infoCart[i].currency +`):  $` + infoCart[i].unitCost + ` </span>
                        <span class="col-12 my-1 py-1 px-0 border-top" style="font-size: 20px; font-weight: bold;">Subtotal(${infoCart[i].currency}): $<span id="subtotal_${i}">${parseInt( infoCart[i].unitCost) * parseInt( infoCart[i].count) }<span> </span>
                    </div>
            
                </div>
            
            </div>
            <hr>

            `;

            allSubtotals.push(infoCart[i].unitCost);
        }
        
        contentToAdd += `
        
        <div id="costos">
            <h3>Costos</h3>
            
            <div class="row m-0">
                
                <div class="col p-0">
                    <p class="responsiveFontV2 mx-0" style=" font-weight: bold;" >Subtotal (USD)</p>
                </div>
                <div class ="col-3 col-md-2 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="Subtotal" style=" font-weight: bold;">0</span></p> </div>

            </div>

            <div class="row m-0">
                
                <div class="col p-0">
                    <p class="responsiveFontV2 mx-0" style=" font-weight: bold;" >Costo de envío (USD)</p>
                </div>
                <div class ="col-3 col-md-2 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="sendCost" style=" font-weight: bold;">0</span></p></div>

            </div>

            <div class="row m-0">
                
                <div class="col p-0">
                    <p class="responsiveFontV2 mx-0" style=" font-weight: bold;" >Total (USD)</p>
                </div>
                <div class ="col-3 col-md-2 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="Total" style=" font-weight: bold;">0</span></p></div> 

            </div>
        </div>

        <hr>
    
    </div>
    
    <button class="btn btn-lg btn-primary">Finalizar compra</button>`;

    document.getElementById("contenedorPrincipal").innerHTML = contentToAdd;
    subtotal = document.getElementById("Subtotal");
    subtotal.innerHTML = sumatoriaSubtotales();
    document.getElementById("Total").innerHTML = subtotal.textContent;
}

//   Termina la parte de agregar la información al HTML
//   De aca para abajo está la parte del evento onChange

function subtotalPerElement(costo, unidad){
    return costo * unidad;
}

function sumatoriaSubtotales(){
    var suma = 0;
    for(let i=0; i<allSubtotals.length; i++ ){
        suma += allSubtotals[i];
    }
    return suma;
}

function calculoAux(unitCost, valor, pos){
    allSubtotals[pos] = unitCost * valor;
}

function convertirAdolar(unitCost, cantidad, pos){
    var factorDeConversion = 1/40;
    calculoAux( (unitCost * factorDeConversion) , cantidad , pos );
}

function calcularSubtotal(esteTag){

    if(esteTag.getAttribute("currency") === "USD" ){
        // calculoAux()
        // console.log("Es dolar");
        calculoAux(esteTag.getAttribute("cost"), document.getElementById(esteTag.id).value , esteTag.getAttribute("pos"));

    }else if(esteTag.getAttribute("currency") === "UYU" ){
        // convertir a dolar
        // console.log("Es UYU");
        convertirAdolar( esteTag.getAttribute("cost"), document.getElementById(esteTag.id).value , esteTag.getAttribute("pos")  );
    }
    
    document.getElementById("subtotal_" + esteTag.getAttribute("pos") ).innerHTML = subtotalPerElement(esteTag.getAttribute("cost") , document.getElementById(esteTag.id).value );
    subtotal.innerHTML = sumatoriaSubtotales();
    document.getElementById("Total").innerHTML = (sumatoriaSubtotales() ) + parseInt(document.getElementById("sendCost").textContent );
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData( CART_INFO_TWO_PRODUCTS_URL ).then(function(resultObj){
        if (resultObj.status === "ok"){

            showCartInfo(resultObj.data.articles);
        }

    });

});

