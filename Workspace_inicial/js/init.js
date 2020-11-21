const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
// Nuevo link para products_Info que tiene el identificador:
// const PRODUCTS_AWS_URL = "http://ec2-18-191-222-30.us-east-2.compute.amazonaws.com:3000/product/";
// Ya que no funciona en GITHUB usaré uno casero:
const PRODUCTS_AWS_URL = 'https://andynievas.github.io/API-s/';

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
        <a class="p-2 d-none d-md-inline-block btn btn-eMercado colorClaro transicionDeColor sombraCaserita" href="categories.html"><i class="fas fa-th-large"></i> Categorías</a>
        <a class="p-2 d-none d-md-inline-block btn btn-eMercado colorClaro transicionDeColor sombraCaserita" href="products.html"><i class="fas fa-th-list"></i> Productos</a>
        <a class="p-2 d-none d-md-inline-block btn btn-eMercado colorClaro transicionDeColor sombraCaserita" href="sell.html"><i class="fas fa-dollar-sign"></i> Vender</a>
    </div>

  <div class="container my-1" id="menuDelCostado">

    <p class="d-flex m-0">
      <button class="btn btn-lg btn-secondary border" style="width: 70px; height: 50px;" type="button" data-toggle="collapse" data-target="#collapseExampleV2" aria-expanded="false" aria-controls="collapseExampleV2">
        <i class="fas fa-bars" style="font-size: 30px; padding-top: 1px;"></i>
      </button>
      <a href="index.html" class="text-right w-100"><button class="btn m-0 p-0 sombraCaserita" > <img src="img/icons/logo_reduced.png" class=" sombraCaserita" style="width: 70vw; max-width: 250px; height: 50px; border-radius: 8px;"> </button> </a>
    </p>
  
    <div class="collapse pt-2" id="collapseExampleV2">
      <a class="hamburgerMenu btn btn-dark my-0 py-0 textOscuro" href="categories.html"><i class="fas fa-th-large"></i> Categorías</a>
      <a class="hamburgerMenu btn btn-dark my-0 py-0 textOscuro" href="products.html"><i class="fas fa-th-list"></i> Productos</a>
      <a class="hamburgerMenu btn btn-dark my-0 py-0 textOscuro" href="sell.html"><i class="fas fa-dollar-sign"></i> Vender</a>
      <a class="hamburgerMenu btn btn-dark my-0 py-0 textOscuro" href="cart.html" id="miCarritoInHamburgerMenu"><i class="fas fa-shopping-cart"></i> Mi carrito </a>
      <a class="hamburgerMenu btn btn-dark my-0 py-0 textOscuro" href="my-profile.html"><i class="fas fa-user-circle"></i> Mi perfil</a>
      <a class="hamburgerMenu btn btn-danger my-0 py-0 textOscuro" href="#" onClick="cerrarSesion()"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>
    </div>

  </div>`;

  navBar.innerHTML = htmlToAppend;

  htmlToAppend = `<!-- Comienza el boton desplegable -->
  <div class="dropdown" id="nombreDeUsuario">
    <button class="btn btn-danger dropdown-toggle alert-info px-1 py-0" type="button" id="userSession" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Ingresar
    </button>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
      
      <a class="dropdown-item p-0 d-none d-md-inline-block " href="cart.html">
        <div class=" py-0 px-3 d-none d-md-inline-block btn btn-block btn-eMercado transicionDeColor text-left sombraCaserita" id="miCarritoInDropDown" >
          <span class="fas fa-shopping-cart text-right mr-1" style="width: 25px; font-size: 21px;"></span>
          <span style="width: 100%; font-size: 21px;"> Mi carrito</span>
        </div>
      </a>

      <a class="dropdown-item p-0 d-none d-md-inline-block " href="my-profile.html">
        <div class=" py-0 px-3 d-none d-md-inline-block btn btn-block btn-eMercado transicionDeColor text-left sombraCaserita">
          <span class="fas fa-user-circle text-right mr-1" style="width: 25px; font-size: 21px;"></span>
          <span style="width: 100%; font-size: 21px;"> Mi perfil</span>
        </div>
      </a>

      <a class="dropdown-item p-0 d-none d-md-inline-block " href="index.html" onClick="cerrarSesion()">
        <div class=" py-0 px-3 d-none d-md-inline-block btn btn-block btn-LogOut transicionDeColor text-left sombraCaserita">
          <span class="fas fa-sign-out-alt text-right mr-1" style="width: 25px; font-size: 21px;"></span>
          <span style="width: 80%; font-size: 21px;" >Cerrar sesión</span>
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

function pintarImgProfile(){
  if( localStorage.getItem('imgProfile') ){
    return localStorage.getItem('imgProfile');
  }else{
    return 'https://thispersondoesnotexist.com/image';
  }
}


function logOut_Animations(){



}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  var finalUser = localStorage.getItem('user');

  if(finalUser !== null){

    
    // El siguiente 'if' verifica si el correo ingresado contiene '.com' y lo quita
    // if( finalUser.includes('.com') ){
    //   finalUser = finalUser.slice(0,finalUser.length-4) ;
    // }

    if(finalUser.length >= 15){
      if( finalUser.includes('.com') ){
        finalUser = finalUser.slice(0,finalUser.length-4) ;
      }
      if( finalUser.includes('@') ){
        console.log(finalUser.indexOf('@'));
        finalUser = finalUser.slice( 0 , finalUser.indexOf('@') );
      }
      if(finalUser.length > 9){
        finalUser = finalUser.slice(0, 9) + '...'; /* + finalUser.slice(finalUser.length-6, finalUser.length); //Esto es para concatenarle la otra parte del correo (osea la parte del @)*/
      }
    }
  
    if( localStorage.getItem('user')!=null ){
      setTimeout(  ()=> {
        let currentUser = document.getElementById("userSession"); //console.log(currentUser);
        if(currentUser){
        currentUser.innerHTML = finalUser + `<img id="imgProfileInDropDown" src="${pintarImgProfile()}" alt="imgProfile" class="ml-2" style="width: 38px; border-radius: 50%; margin-top: 1px; margin-bottom: 1px;">
        `;
      }
    }, 100);

    }

  }

  var head = document.getElementsByTagName("head");
  head[0].innerHTML += `
  <link rel="shortcut icon" href="img/icons/e-Logo.png">` ; 

});

// var indicadorDeUserName = getElement("userSession");

function cerrarSesion(){

  //  Comienzan las animaciones para cerrar Sesion
  //  Terminan las animaciones

  if(localStorage.getItem("idProduct")){localStorage.removeItem("idProduct");}
  if(localStorage.getItem("user") ){localStorage.removeItem("user");}
  if(localStorage.getItem("userProfile") ){localStorage.removeItem("userProfile");}
  if( localStorage.getItem("imgProfile") ){localStorage.removeItem("imgProfile");}
  location.replace("index.html");
    
}


