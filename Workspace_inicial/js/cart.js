
const CART_INFO_TWO_PRODUCTS_URL = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
const convertUYU_to_USD = 1/40;
var allSubtotals = [];
var subtotal = "";




function showCartInfo (infoCart) {
    var contentToAdd = `
    <div id="seccionDeProductos">
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

            if(infoCart[i].currency === "USD"){
                allSubtotals.push( infoCart[i].count * infoCart[i].unitCost);
            }else if(infoCart[i].currency === "UYU"){
                allSubtotals.push(convertUYU_to_USD * infoCart[i].count * infoCart[i].unitCost);
            }

        }
        
        contentToAdd += `
        
        <div id="costos">
            <h3 style=" font-weight: bold;" >Costos:</h3>
            
            <div class="row m-0">
                
                <div class="col p-0">
                    <p class="responsiveFontV2 mx-0">Subtotal (USD)</p>
                </div>
                <div class ="col-3 col-md-2 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="Subtotal" style=" font-weight: bold;">0</span></p> </div>

            </div>

            <div class="row m-0">
                
                <div class="col p-0">
                    <p class="responsiveFontV2 mx-0">Costo de envío (USD)</p>
                </div>
                <div class ="col-3 col-md-2 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="sendCost" style=" font-weight: bold;">0</span></p></div>

            </div>

            <div class="row m-0">
                
                <div class="col p-0">
                    <p class="responsiveFontV2 mx-0">Total (USD)</p>
                </div>
                <div class ="col-3 col-md-2 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="Total" style=" font-weight: bold;">0</span></p></div> 

            </div>
        </div>

        <hr>
    
    </div>

    <div id="seccionDePago">
    
        <!-- Comienza el modal -->    

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Forma de pago</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <div style="width: 100%;">
                        <input type="radio" id="credito" name="pago" onChange="anadirDetallesPago(this)">
                        <label for="credito" ><p style="font-size: 20px;">Tarjeta de crédito</p></label>
                        <br>

                        <input type="radio" id="transferencia" name="pago" onChange="anadirDetallesPago(this)" >
                        <label for="transferencia"><p style="font-size: 20px;">Transferencia bancaria</p></label>
                        <br>

                        <input type="radio" id="efectivo" name="pago" onChange="anadirDetallesPago(this)">
                        <label for="efectivo"><p style="font-size: 20px;">Efectivo</p></label>

                    </div>

                    <div id="detallesDePago" style="width: 100%;"></div>

                    <!-- Método de envío -->

                    <div class="d-none" style="width: 100%;">
                        <input type="radio" id="premium" name="pago">
                        <label for="premium"><p style="font-size: 20px;">Premium (2-5 días) - Costo del 15% sobre el subtotal</p></label>
                        <br>

                        <input type="radio" id="xpres" name="pago">
                        <label for="xpres"><p style="font-size: 20px;">Express (5-8 días) - Costo del 7% sobre el subtotal.</p></label>
                        <br>

                        <input type="radio" id="standard" name="pago">
                        <label for="standard"><p style="font-size: 20px;">Standard (12 a 15 días) - Costo del 5% sobre el subtotal.</p></label>

                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                </div>
                </div>
            </div>
            </div>
        <!-- Termina el modal -->


        <!-- Button trigger modal -->

        <div class="row justify-content-center">
            <div class="col-md-4">
                <p> <button type="button" class="btn btn-block btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Forma de pago
                </button> </p>
            </div>
            <div class="col-12 col-md-1"> <hr> </div>
            <div class="col-md-4">
                <p> <button type="button" class="btn btn-block btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Método de envío
                </button> </p>
            </div>
        </div>
        
        <hr>

    </div>
    
    <button class="btn btn-block btn-lg btn-primary">Finalizar compra</button>`;

    document.getElementById("contenedorPrincipal").innerHTML = contentToAdd;
    subtotal = document.getElementById("Subtotal");
    subtotal.innerHTML = sumatoriaSubtotales();
    document.getElementById("Total").innerHTML = subtotal.textContent;
}

//   Termina la parte de agregar la información al HTML

function tarjetaDeCredito(){
    var infoPago =
    `<div>

        <hr>
        <div class="row m-0">

            <div class="col-lg-4 m-0">
                <label class="m-0 pt-2" ><p>Número de tarjeta</p></label>
                <input type="number" class="form-control" name="formaDePago">
            </div>

            <div class="col-lg-4 m-0">
                <label class="m-0 pt-2"><p>Fecha vencimiento</p></label>
                <input type="date" class="form-control" name="formaDePago">
            </div>

            <div class="col-lg-4 m-0">
                <label class="m-0 pt-2"><p>Número de seguridad</p></label>
                <input type="text" class="form-control" name="formaDePago">
            </div>
        
        </div>

        <div class="row m-0">
            <div class="col m-0">
                <label class="col m-0 px-0 pt-2"><p>Nombre del titular</p></label>
                <input type="text" class="form-control" name="formaDePago">
            </div>
        </div>
        
    </div>`;

    document.getElementById("detallesDePago").innerHTML = infoPago;
}

function pagoTransferencia(){
    var infoPago =
    `<div>

        <hr>
        <div class="row m-0">

            <div class="col m-0">
                <label class="m-0 pt-2" ><p>Número de tarjeta de débito</p></label>
                <input type="number" class="form-control" name="formaDePago">
            </div>

            <div class="col-12 m-0">
                <label class="col m-0 px-0 pt-2"><p>Nombre del titular</p></label>
                <input type="text" class="form-control" name="formaDePago">
            </div>

            <div class="col-12 m-0">
                <label class="m-0 pt-2"><p>Tiene 7 días para realizar el pago</p></label>
            </div>
        
        </div>
        
    </div>`;

    document.getElementById("detallesDePago").innerHTML = infoPago;
}

function pagoEfectivo(){
    var infoPago =
    `<div>

        <hr>
        <div class="row m-0">

            <div class="col m-0">
                <label class="col m-0 px-0 pt-2"><p>Nombre</p></label>
                <input type="text" class="form-control" name="formaDePago">
            </div>

            <div class="col m-0">
                <label class="col m-0 px-0 pt-2"><p>Apellido</p></label>
                <input type="text" class="form-control" name="formaDePago">
            </div>

            <div class="col m-0">
                <label class="col m-0 px-0 pt-2"><p>Número de cédula</p></label>
                <input type="text" class="form-control" name="formaDePago">
            </div>

            <div class="col-12 m-0">
                <label class="m-0 pt-2"><p>Realice el pago en redes de cobranza (Abitab, Redpagos, etc) con su cédula</p></label>
            </div>
        
        </div>
        
    </div>`;

    document.getElementById("detallesDePago").innerHTML = infoPago;
}

function anadirDetallesPago(esteTag) {
    if(esteTag.id === "credito"){ tarjetaDeCredito();
    }else if(esteTag.id === "transferencia"){ pagoTransferencia();
    }else if(esteTag.id === "efectivo") { pagoEfectivo(); }
}


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
    calculoAux( (unitCost * convertUYU_to_USD) , cantidad , pos );
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

