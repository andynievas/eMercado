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

  var navBar = document.getElementsByTagName("nav")[0];
  let htmlToAppend = `
    <!-- BARRA DE NAVEGACION -->
    <div class="container d-flex flex-column flex-md-row justify-content-between" id="navBar">
        <a href="index.html" class="d-none d-md-inline-block" ><button class="btn m-0 p-0 sombraCaserita" > <img src="img/icons/logo_reduced.png" class=" sombraCaserita" style="height: 40px; border-radius: 8px;"> </button> </a>
        <a class="p-2 d-none d-md-inline-block btn fonditoo sombraCaserita" href="categories.html"><i class="fas fa-th-large"></i> Categorías</a>
        <a class="p-2 d-none d-md-inline-block btn fonditoo sombraCaserita" href="products.html"><i class="fas fa-th-list"></i> Productos</a>
        <a class="p-2 d-none d-md-inline-block btn fonditoo sombraCaserita" href="sell.html"><i class="fas fa-dollar-sign"></i> Vender</a>
    </div>

  <div class="container my-1" id="menuDelCostado">

    <p class="d-flex m-0">
      <button class="btn btn-lg btn-secondary border" style="width: 70px; height: 50px;" type="button" data-toggle="collapse" data-target="#collapseExampleV2" aria-expanded="false" aria-controls="collapseExampleV2">
        <i class="fas fa-bars" style="font-size: 30px; padding-top: 1px;"></i>
      </button>
      <a href="index.html" class="text-right w-100"><button class="btn m-0 p-0 sombraCaserita" > <img src="img/icons/logo_reduced.png" class=" sombraCaserita" style="width: 250px; height: 50px; border-radius: 8px;"> </button> </a>
    </p>
  
    <div class="collapse" id="collapseExampleV2">
      <a class="hamburgerMenu bg-dark btn btn-primary" href="categories.html">Categorías</a>
      <a class="hamburgerMenu bg-dark btn btn-primary" href="products.html">Productos</a>
      <a class="hamburgerMenu bg-dark btn btn-primary" href="sell.html">Vender</a>
      <a class="hamburgerMenu bg-dark btn btn-primary" href="cart.html" id="miCarritoInHamburgerMenu" >Mi carrito </a>
      <a class="hamburgerMenu bg-dark btn btn-primary" href="my-profile.html">Mi perfil</a>
      <a class="hamburgerMenu bg-dark btn btn-primary" href="index.html">Cerrar sesión</a>
    </div>

  </div>`;

  navBar.innerHTML = htmlToAppend;

  htmlToAppend = `<!-- Comienza el boton desplegable -->
  <div class="dropdown" id="nombreDeUsuario">
    <button class="btn btn-primary dropdown-toggle alert-info px-1 py-0" type="button" id="userSession" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Ingresar
    </button>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
      
      <a class="dropdown-item p-1 d-none d-md-inline-block btn fonditoo sombraCaserita" href="cart.html">
        <div class=" p-0 d-none d-md-inline-block btn" id="miCarritoInDropDown" >
          <span class="fas fa-shopping-cart" style="width: 40px; font-size: 21px;"></span>
          <span style="width: 80%; font-size: 21px;"> Mi carrito</span>
        </div>
      </a>

      <a class="dropdown-item p-1 d-none d-md-inline-block btn fonditoo sombraCaserita" href="my-profile.html">
        <div class=" p-0 d-none d-md-inline-block btn">
          <span  class="fas fa-user-circle" style="width: 40px; font-size: 21px;"></span>
          <span style="width: 80%; font-size: 21px;"> Mi perfil</span>
        </div>
      </a>

      <a class="dropdown-item p-1 d-none d-md-inline-block btn fonditoo sombraCaserita" href="index.html" id="logOut">
        <div class=" p-0 d-none d-md-inline-block btn">
          <span  class="fas fa-sign-out-alt" style="width: 40px; font-size: 21px;"></span>
          <span style="width: 80%; font-size: 21px;">Cerrar sesión</span>
        </div>
      </a>
      
    </div>
  </div>
  <!-- Aqui termina el boton desplegable -->` ;

  setTimeout( ()=>{
    document.getElementById("navBar").innerHTML += htmlToAppend;
  } ,0);
  

  navBar.background = " rgb(30,70,90);";
  navBar.style = "background-color: rgb(30,70,90); z-index: 6";
  navBar.className = "site-header sticky-top py-1";

}

addUserDropdown();

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  var finalUser = localStorage.getItem('user');

  if(finalUser !== null){

    
    if( finalUser.includes('.com') ){
      finalUser = finalUser.slice(0,finalUser.length-4) ;
    }

    if(finalUser.length >= 15){
      finalUser = finalUser.slice(0, 8) + '...' + finalUser.slice(finalUser.length-6, finalUser.length);
    }
  
    if( localStorage.getItem('user')!=null ){
      setTimeout(  ()=> {
        var currentUser = document.getElementById("userSession");
        if(currentUser != null){
        currentUser.innerHTML = finalUser + `<img src="https://thispersondoesnotexist.com/image" class="ml-2" style="width: 38px; border-radius: 50%; margin-top: 1px; margin-bottom: 1px;">
        `;
      }
    }, 0);

    }

  }

  var head = document.getElementsByTagName("head");
  head[0].innerHTML += `
  <link rel="shortcut icon" href="img/icons/e-Logo.png">` ; 

});

var cerrarSession = document.getElementById("logOut");
var indicadorDeUserName = document.getElementById("userSession");

if(indicadorDeUserName !== null){

  cerrarSession.addEventListener("click", function(){
    localStorage.removeItem("user");
    location.replace("index.html");
  });

}

