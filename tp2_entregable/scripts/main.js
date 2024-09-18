/** @type {CanvasRenderingContext2D} */
/** @type { HTMLCanvasElement} */

let lapiz;
let btnColor;
let btnFuente;
let mouseAbajo = false;
let filtro;
let canvas = document.querySelector('canvas');
const anchoCanvas = canvas.width;
const altoCanvas = canvas.height;

let ctx = canvas.getContext('2d');

let btnLapiz = document.querySelector('#lapiz')
let btnGoma = document.querySelector('#btnGoma');
let btnFiltros = document.querySelector('#btnFiltros');
let btnGuardar = document.querySelector('#btnGuardar');
let btnCargar = document.querySelector('#btnCargar');

const barraAux = document.querySelector('#barraAux');
let filtros={
    monoCromo: aplicarMonoCromo,
    negativo: aplicarNegativo,
    sepia: aplicarSepia,
    brillo: aplicarBrillo,
}

canvas.addEventListener('mouseleave',()=>{
    mouseAbajo=false;
})
btnGuardar.addEventListener('click',()=>{
    const dataURL = canvas.toDataURL('image/png'); // Puedes cambiar 'image/png' a 'image/jpeg'
    btnGuardar.href = dataURL;
    
})
btnCargar.addEventListener('click',()=>{
    let imagen = new Imagen(ctx,anchoCanvas,altoCanvas)
    imagen.cargarImagen('./assets/ace.jpg')
    imagen.dibujar();
})
btnLapiz.addEventListener('click',()=>{
    lapiz = new Lapiz(ctx, null, null, 'black', 5)
    barraAux.innerHTML = '<li><input type="color" id="btnColor"></li> <li><input type="number" id="btnFuente" value="5"></li>';
    btnColor = document.querySelector('#btnColor');
    btnFuente = document.querySelector('#btnFuente');
    btnColor.addEventListener('input',(e)=>{
        lapiz.cambiarColor(e.target.value);
    })
    btnFuente.addEventListener('input',(e)=>{
        console.log(e.target.value);
        lapiz.cambiarGrosor(e.target.value);
    })
})
btnGoma.addEventListener('click',()=>{
    lapiz= new Lapiz(ctx, null, null, 'white', 5);
    barraAux.innerHTML = '<li><input type="number" id="btnFuente" value="5"></li>';
    btnFuente = document.querySelector('#btnFuente');
    btnFuente.addEventListener('input',(e)=>{
        
        lapiz.cambiarGrosor(e.target.value);
    })
})
btnFiltros.addEventListener('click',()=>{
    barraAux.innerHTML = '<li><button value="monoCromo"><img src="./assets/mono-cromo.png"></button></li>';
    barraAux.innerHTML += '<li><button value="negativo"><img src="./assets/negativo.png"></button></li>';
    barraAux.innerHTML += '<li><button value="sepia"><img src="./assets/sepia.png"></button></li>';
    barraAux.innerHTML += '<li><button value="brillo"><img src="./assets/brillo.png"></button><input type="number" value=100 id="brillo"></li>';

    let botones = [...barraAux.querySelectorAll('button')];
    botones.forEach(boton=>{
        boton.addEventListener('click',()=>{
            filtros[boton.value]();
        })
    })
})

canvas.addEventListener('mousedown',(e)=>{
    mouseAbajo = true;
    if(lapiz){
    let pos = posicionMouse(e);
    lapiz.asignarPosicion(pos.x, pos.y);
    lapiz.dibujar(pos.x, pos.y);
}
})
canvas.addEventListener('mouseup',()=>{
    mouseAbajo = false;
})
canvas.addEventListener('mousemove', (e) => {
    let pos = posicionMouse(e);
    
    if(mouseAbajo && lapiz) {
        
        lapiz.dibujar(pos.x, pos.y);
        lapiz.asignarPosicion(pos.x, pos.y);
    }
})
dibujarCanvas();



function dibujarCanvas(){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.rect(0,0,anchoCanvas,altoCanvas);
    ctx.fill();
}

function posicionMouse(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    return { x, y };
}

function aplicarMonoCromo(){
    filtro = new FiltroMonoCromo()
    let imageData = filtro.filtrar(ctx.getImageData(0, 0, canvas.width, canvas.height),anchoCanvas,altoCanvas)
    ctx.putImageData(imageData,0,0) 
}
function aplicarNegativo(){
    filtro = new FiltroNegativo()
    let imageData = filtro.filtrar(ctx.getImageData(0, 0, canvas.width, canvas.height),anchoCanvas,altoCanvas)
    ctx.putImageData(imageData,0,0) 
}
function aplicarSepia(){
    filtro = new FiltroSepia()
    let imageData = filtro.filtrar(ctx.getImageData(0, 0, canvas.width, canvas.height),anchoCanvas,altoCanvas)
    ctx.putImageData(imageData,0,0)
}
function aplicarBrillo(){
    let brillo;
    brillo = document.querySelector('#brillo');
         
    
    filtro = new FiltroBrillo(brillo.value/100)
    let imageData = filtro.filtrar(ctx.getImageData(0, 0, canvas.width, canvas.height),anchoCanvas,altoCanvas)
    ctx.putImageData(imageData,0,0)
}