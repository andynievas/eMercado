
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
var camposIncompletos = "";
var countArticlesToBuy = 0;




function showCartInfo (infoCart) {
    countArticlesToBuy = infoCart.length;

    var contentToAdd = `

    <div class="text-center p-2">
        <h2 style="font-family: 'Architects Daughter'; font-size: 40px; font-weight: bold;">Mi carrito</h2>
        <p class="lead" style="margin: 5px;">Verás aquí todos los productos cargados en tu carrito de compras.</p>
    </div>
    <br>

    <div id="seccionDeProductos">
        <h3>Artículos a comprar</h3>
        <hr>`;

        for(let i=0; i<infoCart.length; i++) {  // icono de una x <span class="material-icons" style="width: 24px;  height: 24px;">close</span>
            contentToAdd += `
        <div class="ComienzaElTemplate card" style="border-bottom: 2px red solid;">
            <button class="btn btn-danger m-0 p-0 sombraCaserita positionBotonClose" id="${i}" onClick="alertaDeBorrarArticulo(this.id)" style=" width: 48px;  height: 40px;" >
                <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>

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
        </div>
        <hr>
            `;

            console.log("Cuantas veces se muestra esto. Dentro de un for, dentro de showInfoCart.");

            if(primeraVezQueSeMuestra){

                if(infoCart[i].currency === "USD"){
                    allSubtotals.push( infoCart[i].count * infoCart[i].unitCost);
                }else if(infoCart[i].currency === "UYU"){
                    allSubtotals.push(convertUYU_to_USD * infoCart[i].count * infoCart[i].unitCost);
                }

                setBadgeElement();
                primeraVezQueSeMuestra = false;
                
            }else{

                if(infoCart[i].currency === "USD"){
                    allSubtotals[i] = ( infoCart[i].count * infoCart[i].unitCost);
                }else if(infoCart[i].currency === "UYU"){
                    allSubtotals[i] = (convertUYU_to_USD * infoCart[i].count * infoCart[i].unitCost);
                }

                updateBadgeElement();
                
            }

            }
        
            contentToAdd += `

        <div id="seccionDePago">
    
            <!-- Comienza el modal de Forma de pago -->    

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabelFormaPago" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabelFormaPago">Forma de pago</h5>
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
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="mostrarTodosLosInputs()" >Aceptar</button>
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
        
            <div id="costos">
                <h3 style=" font-weight: bold;" >Costos:</h3>
                <div class="row m-0">
                    <div class="col-8 p-0">
                        <p class="responsiveFontV2 mx-0">Subtotal (USD)</p>
                    </div>
                    <div class ="col-4 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="Subtotal" style=" font-weight: bold;">${subtotal}</span></p>
                    </div>
                </div><hr class="my-1">
                <div class="row m-0">                
                    <div class="col-8 p-0">
                        <p class="responsiveFontV2 mx-0">Costo de envío (USD)</p>
                    </div>
                    <div class ="col-4 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="sendCost" style=" font-weight: bold;">${costoDeEnvío}</span></p></div>
                </div><hr class="my-1">
                <div class="row m-0">
                    <div class="col-8 p-0">
                        <p class="responsiveFontV2 mx-0">Total (USD)</p>
                    </div>
                    <div class ="col-4 p-0"><p class="responsiveFontV2 mx-0 text-right" style=" font-weight: bold;" >$<span class="responsiveFontV2 mx-0 text-right" id="Total" style=" font-weight: bold;">0</span></p></div> 
                </div>
            </div><hr>
        </div>
    </div>

    <span class="d-block" tabindex="0" data-toggle="tooltip" id="tooltipDelBotonComprar"  title="Debe seleccionar una Forma de pago">
        <button class="btn btn-block btn-lg btn-primary" id="confirmarCompra" onClick="confirmarCompra()" style="pointer-events: none;" type="button" disabled>Confirmar compra</button>
    </span> <hr>

    `;

    document.getElementById("contenedorPrincipal").innerHTML = contentToAdd;
    subtotal_TagHTML = document.getElementById("Subtotal");
    subtotal_TagHTML.innerHTML = sumatoriaSubtotales();
    document.getElementById("Total").innerHTML = total();

    todosLosInputs = document.getElementsByClassName("form-control");
    console.log("Largo del array de artículos: " + infoCart.length + ", en showInfoCart");
    
    


    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

}

//   Termina la parte de agregar la información al HTML

function updateBadgeElement(){
    document.getElementById("badgeOnDropDown").innerHTML = `${countArticlesToBuy}`;

    document.getElementById("badgeOnHamburger").innerHTML = `${countArticlesToBuy}`;
}

function setBadgeElement(){
    document.getElementById("miCarritoInDropDown").innerHTML += `
        <span id="badgeOnDropDown" class="badge badge-danger" style="width: 20px; height: 22px; padding-top: 6px;">${countArticlesToBuy}</span>
    `;

    document.getElementById("miCarritoInHamburgerMenu").innerHTML += `
        <span id="badgeOnHamburger" class="badge badge-danger"> ${countArticlesToBuy} </span>
    `;
}

function removerArticulo(tagId){
    console.log(tagId);

    arrayDeArticulos.splice(tagId, 1);
    allSubtotals.splice(tagId, 1);

    primeraVezQueSeMuestra = false;
    // allSubtotals[tagId] = 0;
    showCartInfo( arrayDeArticulos );
    console.log("Cuantas veces se muestra esto(dentro de removerArticulo)");

    calcularCostoEnvio( paymentMethod );
    document.getElementById("Subtotal").innerHTML = sumatoriaSubtotales();
    document.getElementById("Total").innerHTML = total();
}

function tarjetaDeCredito(){
    var infoPago =
    `<div>

        <hr>
        
        <div class="row m-0">
        
            <div class="col-12 m-0">
                <label for="nombreTarjeta" class="col m-0 px-0 pt-2"><p>Nombre y Apellido</p></label>
                <input value="" type="text" class="form-control"  id="nombreTarjeta">
            </div>

            <div class="col-12 m-0">
                <label class="m-0 pt-2" ><p>Número de tarjeta</p></label>
                <input value="" type="number" class="form-control" id="numeroTarjeta">
            </div>

            <div class="col-lg-6 m-0">
                <label class="m-0 pt-2"><p>Fecha vencimiento</p></label>
                <input value="" type="date" class="form-control"  id="fechaVence">
            </div>

            <div class="col-lg-6 m-0">
                <label class="m-0 pt-2"><p>Código de seguridad</p></label>
                <input value="" type="text" class="form-control"  id="codigoSeguridad">
            </div>


            <div class="col-12 m-0">
                <label class="col m-0 px-0 pt-2"><p>CI del titular de la tarjeta</p></label>
                <input value="" type="text" class="form-control">
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

//  Funcion que es lanzada cuando se elige un MÉTODO DE PAGO
//  Y muestra los inputs correspondientes
function anadirDetallesPago(esteTag) {
    if(esteTag.id === "credito"){ tarjetaDeCredito();
    }else if(esteTag.id === "transferencia"){ pagoTransferencia();
    }else if(esteTag.id === "efectivo") { pagoEfectivo(); }
    for(let i=0; i<3; i++) {
        document.getElementsByName("envio")[i].checked = false;
    }
    document.getElementById("botonMetodoPago").disabled = false;
    document.getElementById("confirmarCompra").disabled = true;
}

function mostrarTodosLosInputs(){
    var i = todosLosInputs.length - 1;
    let tooltip = document.getElementById("tooltipDelBotonComprar");
    
    //  Este FOR es para dejar ningún metodo de envio seleccionado
    for(let i=0; i<3; i++) {
        document.getElementsByName("envio")[i].checked = false;
    }

    if(todosLosInputs[i].value != "" ){
        // console.log("inputsEnFormaDePagoCompletos");
        tooltip.setAttribute("data-original-title", "Seleccione Método de envío");
        return true;
    }else {
        // console.log("inputsEnFormaDePagoINCompletos");
        tooltip.setAttribute("data-original-title", "Faltan completar campos en Forma de Pago");
        return false;
    }
}

// Empieza la parte de calcular costos y validaciones de inputs

function confirmarCompra(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'FELICIDADES HAS COMPRADO CON ÉXITO!',
        showConfirmButton: false,
        timer: 2500
    });
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

//  Funcion que retorna TRUE si todos los inputs se encuentran con al menos un valor (no vacío)
function validarCamposCompletos(){
    var completos = true;
    var i=0;
    while( completos && todosLosInputs[i] ){
        console.log(todosLosInputs[i]);
        if(todosLosInputs[i].value != ''){
            console.log("Este input está completo");
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
    
    if( validarCamposCompletos() && arrayDeArticulos.length>0 ){
        let tooltip = document.getElementById("tooltipDelBotonComprar");
        document.getElementById("confirmarCompra").disabled = false;
        tooltip.removeAttribute("data-original-title");
        document.getElementById("confirmarCompra").style = "";
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


function alertaDeBorrarArticulo(elTag){

    Swal.fire({
        title: `Estás seguro de querer borrar el artículo: '${arrayDeArticulos[elTag].name}'?`,
        text: "No podrás deshacer este paso!",
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero borrarlo!'
    }).then((result) => {
        if (result.isConfirmed){
            removerArticulo(elTag);
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Se ha borrado con éxito',
                showConfirmButton: false,
                timer: 1000
            });
        }else{
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Nada borrado',
                showConfirmButton: false,
                timer: 1000
            });
        }

    });

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




