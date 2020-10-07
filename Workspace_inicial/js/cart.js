
const CART_INFO_TWO_PRODUCTS_URL = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';




function showCartInfo (infoCart) {
    var contentToAdd = `
    <div>
        <h3>Artículos a comprar</h3>
        <hr>`;

        // infoCart[i].src
        for(let i=0; i<infoCart.length; i++) {
            contentToAdd += `
            <div class="row my-3 mx-0">
                
                <img class="img-thumbnail mr-4" style="width: 100px;" src="` + infoCart[i].src + `" >    
                
                <div>
                    <h3 class="mt-2">` + infoCart[i].name + `.</h3>
                    <div class="row m-0">
                        <span class="mr-3 " style="font-size: 20px;">Cant.</span>
                        <input type="number" class="form-control mr-4 pb-0 pt-0" id="unitCount`+ i +`" min="0" value="`+ infoCart[i].count +`" style="width: 60px; height: 28px; font-size: 18px; font-family: 'Armata';" value="`+ infoCart.count +`" />
                        <span class="m-0 " style="font-size: 20px; width: 330px;">Costo por unidad (`+ infoCart[i].currency +`):  $` + infoCart[i].unitCost + ` </span>
                    </div>
            
                </div>
            
            </div>
            <hr>

            `;
        }
        
        contentToAdd += `
        
        <div class="d-flex">
            <div style="width: 50%;">
                <p style="margin: 8px; font-size: 20px;">Subtotal (USD)</p>
                <p style="margin: 8px; font-size: 20px;">Costo de envío (USD)</p>
                <p class="mb-0" style="margin: 8px; font-size: 20px;">Total (USD)</p>
            </div>

            <div style="width: 50%;">
                <div class=" text-right border btn-light shadow-sm" style="border-radius: 6px; width: 110px; margin-right: 0; margin-left: auto;"><p id="Subtotal" style="margin: 4px; font-size: 20px;" >0</p> </div>
                <div class=" text-right border btn-light shadow-sm" style="border-radius: 6px; width: 110px; margin-right: 0; margin-left: auto;"><p id="sendCost" style="margin: 4px; font-size: 20px;" >0</p></div>
                <div class=" text-right border btn-light shadow-sm" style="border-radius: 6px; width: 110px; margin-right: 0; margin-left: auto;"><p id="Total" style="margin: 4px; font-size: 20px;" >0</p></div> 
            </div>
        </div>

        <hr>
    
    </div>`;
    document.getElementById("contenedorPrincipal").innerHTML = contentToAdd;
    document.getElementById("unitCount1").max = 3;
}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData( CART_INFO_TWO_PRODUCTS_URL ).then(function(resultObj){
        if (resultObj.status === "ok"){

            var infoCart = resultObj.data.articles;
            console.log(infoCart);
            showCartInfo(infoCart);
            
        }

        var factorDolarUYU = 1/40;
        var inputCount0 = document.getElementById("unitCount0");
        var inputCount1 = document.getElementById("unitCount1");
        
        var sendCost = document.getElementById("sendCost").innerText;

        var subtotal = 0;
        subtotal = (inputCount0.value * (infoCart[0].unitCost * factorDolarUYU ) ) + (inputCount1.value * infoCart[1].unitCost);
        document.getElementById("Subtotal").innerHTML = subtotal;
        
        var total = 0;
        total = subtotal + parseInt(sendCost, 10);  //  Función parseInt()  necesaria para convertir un string a number
        document.getElementById("Total").innerHTML = total;
        

        inputCount0.addEventListener("change", ()=> {
            
            subtotal = (inputCount0.value * (infoCart[0].unitCost * factorDolarUYU ) ) + (inputCount1.value * infoCart[1].unitCost);
            document.getElementById("Subtotal").innerHTML = subtotal;
            total = subtotal + parseInt(sendCost, 10);
            document.getElementById("Total").innerHTML = total;

        });

        inputCount1.addEventListener("change", ()=> {
            
            subtotal = (inputCount0.value * (infoCart[0].unitCost * factorDolarUYU ) ) + (inputCount1.value * infoCart[1].unitCost);
            document.getElementById("Subtotal").innerHTML = subtotal;
            total = subtotal + parseInt(sendCost, 10);
            document.getElementById("Total").innerHTML = total;

        });

    });

});

