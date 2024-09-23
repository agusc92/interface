class EscritorHtml{

    constructor(){

    }

    menuDeLapiz(elemento,color,fuente){
        elemento.innerHTML = `<li><input type="color" id="btnColor" value="${color}"></li> <li><input type="range" id="btnFuente" value="${fuente}"></li>`;
    }
    menuDeGoma(elemento){
        elemento.innerHTML = '<li><input type="number" id="btnFuente" value="5"></li>'
    }
    menuDeFiltros(elemento){
    elemento.innerHTML = '<li><button value="monoCromo"><img src="./assets/mono-cromo.png"></button></li>';
    elemento.innerHTML += '<li><button value="negativo"><img src="./assets/negativo.png"></button></li>';
    elemento.innerHTML += '<li><button value="sepia"><img src="./assets/sepia.png"></button></li>';
    elemento.innerHTML += '<li><button value="brillo"><img src="./assets/brillo.png"></button><input type="number" value=100 id="brillo"></li>';
    elemento.innerHTML += '<li><button value="blur"><img src="./assets/blur.png"></button></li>';
    elemento.innerHTML += '<li><button value="saturacion"><img src="./assets/saturacion.png"></button></li>';
    elemento.innerHTML += '<li><button value="detectBordes"><img src="./assets/borde.png"></button></li>';
    elemento.innerHTML += '<li><button value="sharp"><img src="./assets/sharp.png"></button></li>';
    }
}