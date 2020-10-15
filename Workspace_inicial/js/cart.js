
const CART_INFO_TWO_PRODUCTS_URL = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
const convertUYU_to_USD = 1/40;
var allSubtotals = [];
var subtotal_TagHTML = "";
var subtotal = 0;
var costoDeEnvío = 0;
var porcentajdeCostoEnvio = 0;
var paymentMethod = "";
var paymentMethodChecked = false;
var todosLosInputs = [""];
var arrayDeArticulos = [];
var primeraVezQueSeMuestra = true;




function showCartInfo (infoCart) {
    var contentToAdd = `
    <div id="seccionDeProductos">
        <h3>Artículos a comprar</h3>
        <hr>`;

        for(let i=0; i<infoCart.length; i++) {
            contentToAdd += `
            <button class="btn btn-danger m-0 p-0" id="${i}" onClick="removerArticulo(this.id)" style="float: right; width: 30px;  height: 26px;" ><span class="material-icons" style="width: 24px;  height: 24px;">close</span></button>
            <div class="row my-3 mx-0">

                <div class="col-12 col-md-3 col-lg-2 p-0 pr-3">
                    <img class="img-thumbnail mr-4" style="width: 160px;" src="` + infoCart[i].src + `" >
                    
                </div>
                
                <div class="col-12 col-md-9 col-lg-10 p-0">
                    <div>
                        <h3 class="mt-2">` + infoCart[i].name + `.  </h3>
                        
                    </div>

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

            if(primeraVezQueSeMuestra){

                if(infoCart[i].currency === "USD"){
                    allSubtotals.push( infoCart[i].count * infoCart[i].unitCost);
                }else if(infoCart[i].currency === "UYU"){
                    allSubtotals.push(convertUYU_to_USD * infoCart[i].count * infoCart[i].unitCost);
                }
                
            }

        }
        
        contentToAdd += `

        <div id="seccionDePago">
    
        <!-- Comienza el modal de Forma de pago -->    

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabelFormaPago" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelFormaPago">Forma de pago</h5>
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

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                </div>
                </div>
            </div>
            </div>
        <!-- Termina el modal de Forma de pago -->

        <!-- Comienza el modal de Método de envío -->    

            <!-- Modal -->
            <div class="modal fade" id="exampleModalMetdoEnvio" tabindex="-1" aria-labelledby="exampleModalLabelMetodoEnvio" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelMetodoEnvio">Método de envío</h5>
                </div>

                <div class="modal-body">

                    <div style="width: 100%;">

                        <div class="row">

                            <div class="col-12">
                                <div class="d-flex"><input type="radio" class="my-2 mr-1" id="premium" name="envio" onChange="getPaymentMethod(this)">
                                <label for="premium"><p style="font-size: 20px;">Premium (2-5 días) - Costo del 15% sobre el subtotal</p></label></div>
                            </div>

                            <div class="col-12">
                                <div class="d-flex"><input type="radio" class="my-2 mr-1" id="xpres" name="envio" onChange="getPaymentMethod(this)" />
                                <label for="xpres"><p style="font-size: 20px;">Express (5-8 días) - Costo del 7% sobre el subtotal.</p></label></div>
                            </div>

                            <div class="col-12">
                                <div class="d-flex"><input type="radio" class="my-2 mr-1" id="standard" name="envio" onChange="getPaymentMethod(this)">
                                <label for="standard"><p style="font-size: 20px;">Standard (12 a 15 días) - Costo del 5% sobre el subtotal.</p></label></div>
                            </div>

                        </div>

                    </div>

                    <div id="detallesDeEnvio" style="width: 100%;"></div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                </div>
                </div>
            </div>
            </div>

        <!-- Termina el modal de Método de envío -->

        <!-- Comienza el 'Button trigger modal' de ambos modals Forma de pago y Método de envío -->

        <div class="row justify-content-center">
            <div class="col-md-4">
                <p> <button type="button" class="btn btn-block btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Forma de pago
                </button> </p>
            </div>
            <div class="col-12 col-md-1"> <hr> </div>
            <div class="col-md-4">
                <p> <button type="button" class="btn btn-block btn-primary" id="botonMetodoPago" data-toggle="modal" data-target="#exampleModalMetdoEnvio" disabled>
                    Método de envío
                </button> </p>
            </div>
        </div>

        <!-- Termina el Button trigger modal -->

        <hr>

    </div>
        
        <div id="costos">
            <h3 style=" font-weight: bold;" >Costos:</h3>
            
            <div class="row m-0">
                
                <div class="col p-0">
                    <p class="responsiveFontV2 mx-0">Subtotal (USD)</p>
                </div>
                <div class ="col-3 col-md-2 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="Subtotal" style=" font-weight: bold;">${subtotal}</span></p> </div>

            </div>

            <div class="row m-0">
                
                <div class="col p-0">
                    <p class="responsiveFontV2 mx-0">Costo de envío (USD)</p>
                </div>
                <div class ="col-3 col-md-2 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="sendCost" style=" font-weight: bold;">${costoDeEnvío}</span></p></div>

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

    <button id="confirmarCompra" class="btn btn-block btn-lg btn-primary" disabled onClick="confirmarCompra()">Confirmar compra</button>`;

    document.getElementById("contenedorPrincipal").innerHTML = contentToAdd;
    subtotal_TagHTML = document.getElementById("Subtotal");
    subtotal_TagHTML.innerHTML = sumatoriaSubtotales();
    document.getElementById("Total").innerHTML = total();
}

//   Termina la parte de agregar la información al HTML


function removerArticulo(tagId){
    arrayDeArticulos.splice(tagId, 1);
    console.log( arrayDeArticulos );
    console.log( allSubtotals );

    primeraVezQueSeMuestra = false;
    allSubtotals[tagId] = 0;
    console.log( allSubtotals );
    showCartInfo( arrayDeArticulos );

    calcularCostoEnvio( paymentMethod );
    document.getElementById("Total").innerHTML = total();
}

function tarjetaDeCredito(){
    var infoPago =
    `<div>

        <hr>
        
        <div class="row m-0">
        
            <div class="col-12 m-0">
                <label for="nombreTarjeta" class="col m-0 px-0 pt-2"><p>Nombre y Apellido</p></label>
                <input type="text" class="form-control" id="nombreTarjeta">
            </div>

            <div class="col-12 m-0">
                <label class="m-0 pt-2" ><p>Número de tarjeta</p></label>
                <input type="number" class="form-control" id="numeroTarjeta">
            </div>

            <div class="col-lg-6 m-0">
                <label class="m-0 pt-2"><p>Fecha vencimiento</p></label>
                <input type="date" class="form-control" id="fechaVence">
            </div>

            <div class="col-lg-6 m-0">
                <label class="m-0 pt-2"><p>Código de seguridad</p></label>
                <input type="text" class="form-control" id="codigoSeguridad">
            </div>


            <div class="col-12 m-0">
                <label class="col m-0 px-0 pt-2"><p>CI del titular de la tarjeta</p></label>
                <input type="text" class="form-control">
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

            <div class="col-12 m-0">
                <label class="m-0 pt-2" ><p>Número de cuenta a debitar</p></label>
                <input type="number" class="form-control">
            </div>

            <div class="col-md-7 m-0">
                <label class="m-0 px-0 pt-2"><p>Nombre del titular</p></label>
                <input type="text" class="form-control">
            </div>

            <div class="col-md-5 m-0">
                <label class="m-0 px-0 pt-2"><p>Número de cédula</p></label>
                <input type="text" class="form-control">
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

            <div class="col-md-7 m-0">
                <label class="m-0 px-0 pt-2"><p>Nombre y Apellido</p></label>
                <input type="text" class="form-control">
            </div>

            <div class="col-md-5 m-0">
                <label class="m-0 px-0 pt-2"><p>Número de cédula</p></label>
                <input type="text" class="form-control">
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
    for(let i=0; i<3; i++) {
        console.log(document.getElementsByName("envio")[i].checked );
        document.getElementsByName("envio")[i].checked = false;
    }
    document.getElementById("botonMetodoPago").disabled = false;
    document.getElementById("confirmarCompra").disabled = true;
}

// Empieza la parte de calcular costos y validaciones de inputs

function confirmarCompra(){
    alert("FELICIDADES HAS COMPRADO CON ÉXITO!");
}

function calcularCostoEnvio( paymentMethod ){
    if(paymentMethod === "premium"){
        porcentajdeCostoEnvio = 0.15;
    }else if(paymentMethod === "xpres"){
        porcentajdeCostoEnvio = 0.07;
    }else if(paymentMethod === "standard"){
        porcentajdeCostoEnvio = 0.05;
    }

    costoDeEnvío = Math.round( (subtotal * porcentajdeCostoEnvio) * 100) / 100 ;
    document.getElementById("sendCost").innerHTML = costoDeEnvío;
    document.getElementById("Total").innerHTML = total();
}

function validarCamposCompletos(){
    var completos = true;
    let i=0;
    while( completos && todosLosInputs[i] ){
        console.log(todosLosInputs[i]);
        if(todosLosInputs[i].value != ''){
            console.log("Este input está completo");
            completos = true;
        }else {
            console.log("Este input no está completo");
            completos = false;
        }
        
        i++;
    }

    return completos;
}

function getPaymentMethod(esteTag){
    
    paymentMethod = esteTag.getAttribute("id");
    calcularCostoEnvio( paymentMethod );
    todosLosInputs = document.getElementsByClassName("form-control");
    if( validarCamposCompletos() && arrayDeArticulos.length>0 ){
        document.getElementById("confirmarCompra").disabled = false;
    }
}

//   De aca para abajo está la parte que calcula el SUBTOTAL Y TOTAL mediante onChange

function subtotalPerElement(costo, unidad){
    return costo * unidad;
}

function total(){
    return  Math.round( (subtotal + costoDeEnvío) * 100) / 100 ;
}

function sumatoriaSubtotales(){
    var suma = 0;
    for(let i=0; i<allSubtotals.length; i++ ){
        suma += allSubtotals[i];
    }
    subtotal = suma;
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
    subtotal_TagHTML.innerHTML = sumatoriaSubtotales();
    costoDeEnvío = Math.round( (subtotal * porcentajdeCostoEnvio) * 100) / 100 ;
    document.getElementById("sendCost").innerHTML = costoDeEnvío;
    document.getElementById("Total").innerHTML = total();
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData( CART_INFO_TWO_PRODUCTS_URL ).then(function(resultObj){
        if (resultObj.status === "ok"){

            arrayDeArticulos = resultObj.data.articles;
            showCartInfo( arrayDeArticulos );
        }

    });

});

