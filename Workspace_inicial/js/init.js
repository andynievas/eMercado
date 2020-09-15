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

  var icon = document.getElementsByTagName("head");
  icon[0].innerHTML += `
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

