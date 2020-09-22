const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
// Nuevo link para products_Info que tiene el identificador:
const PRODUCTS_AWS_URL = "http://ec2-18-191-222-30.us-east-2.compute.amazonaws.com:3000/product/";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function addUserDropdown(){

  var navBar = document.getElementsByTagName("nav");
  let htmlToAppend = `
  <div class="px-4" id="menuDelCostado">
  <p class="m-0" style="text-align: right;">
    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExampleV2" aria-expanded="false" aria-controls="collapseExampleV2">
      Ver más opciones
    </button>
  </p>

  <div class="collapse" id="collapseExampleV2">
    <div class="menuDelCostado">
      <a href="index.html">Inicio</a>
      <a href="categories.html">Categorías</a>
      <a href="products.html">Productos</a>
      <a href="sell.html">Vender</a>
      <a href="cart.html">Mi carrito</a>
      <a href="my-profile.html">Mi perfil</a>
    </div>
  </div>

  </div>`;

  navBar[0].innerHTML += htmlToAppend;

  htmlToAppend = `<!-- Comienza el boton desplegable -->
  <div class="dropdown" id="nombreDeUsuario">
    <button class="btn btn-secondary dropdown-toggle alert-info" type="button" id="userSession" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Ingresar
    </button>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
      
      <a class="dropdown-item p-1 d-none d-md-inline-block btn fonditoo" href="cart.html">
        <div class=" p-0 d-none d-md-inline-block btn">
          <span  class="fas fa-shopping-cart" style="width: 40px; font-size: 21px;"></span>
          <span style="width: 80%; font-size: 21px;"> Mi carrito</span>
        </div>
      </a>

      <a class="dropdown-item p-1 d-none d-md-inline-block btn fonditoo" href="my-profile.html">
        <div class=" p-0 d-none d-md-inline-block btn">
          <span  class="fas fa-user-circle" style="width: 40px; font-size: 21px;"></span>
          <span style="width: 80%; font-size: 21px;"> Mi perfil</span>
        </div>
      </a>

      <a class="dropdown-item p-1 d-none d-md-inline-block btn fonditoo" href="index.html" id="logOut">
        <div class=" p-0 d-none d-md-inline-block btn">
          <span  class="fas fa-sign-out-alt" style="width: 40px; font-size: 21px;"></span>
          <span style="width: 80%; font-size: 21px;">Cerrar sesión</span>
        </div>
      </a>
      
    </div>
  </div>
  <!-- Aqui termina el boton desplegable -->` ;

  document.getElementById("navBar").innerHTML += htmlToAppend;
}

addUserDropdown();

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  var currentUser = document.getElementById("userSession");
  var finalUser = localStorage.getItem('user');

  if(finalUser !== null){

    
    if( finalUser.includes('.com') ){
      finalUser = finalUser.slice(0,finalUser.length-4) ;
    }

    if(finalUser.length >= 15){
      finalUser = finalUser.slice(0, 8) + '...' + finalUser.slice(finalUser.length-6, finalUser.length);
    }
  
    if( localStorage.getItem('user')!=null ){
      if(currentUser != null){
        currentUser.innerHTML = finalUser;
      }
    }
  }

  var head = document.getElementsByTagName("head");
  head[0].innerHTML += `
  <link rel="shortcut icon" href="img/icons/e-Logo(max).png">` ; 

});

var cerrarSession = document.getElementById("logOut");
var indicadorDeUserName = document.getElementById("userSession");

if(indicadorDeUserName !== null){

  cerrarSession.addEventListener("click", function(){
    localStorage.removeItem("user");
    location.replace("index.html");
  });

}

