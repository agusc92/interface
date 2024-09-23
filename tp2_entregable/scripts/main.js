// document.addEventListener('DOMContentLoaded',main)
// function main(){
/** @type {CanvasRenderingContext2D} */
/** @type { HTMLCanvasElement} */

let lapiz;
let color = '#000000';
let fuente = 5;

let btnColor;
let btnFuenteLapiz;
let btnFuenteGoma;
let mouseAbajo = false;
let filtro;
let canvas = document.querySelector('canvas');
const anchoCanvas = canvas.width;
const altoCanvas = canvas.height;
const escritor = new EscritorHtml();
let ctx = canvas.getContext('2d');

let btnHojaBlanca = document.querySelector('#hojaBlanca');
let btnLapiz = document.querySelector('#lapiz');
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
    blur : aplicarBlur,
    saturacion : aplicarSaturacion,
    detectBordes : aplicarDetecBordes,
    sharp : aplicarSharp,
}

//evento para cortar el trazo cuando el lapiz sale del canvas
canvas.addEventListener('mouseleave',()=>{
    mouseAbajo=false;
})
//evento para borra todo el contenido del canvas
btnHojaBlanca.addEventListener('click',()=>{
    dibujarCanvas();
})
//evento para guarda el contenido del canvas
btnGuardar.addEventListener('click',()=>{
    const dataURL = canvas.toDataURL('image/png'); 
    btnGuardar.href = dataURL;
    
})
//evento para cargar una imagen desde la computadora
btnCargar.addEventListener('change',(e)=>{
    let archivo = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload=(e)=>{
        dibujarCanvas()
        let imagen = new Imagen(ctx,anchoCanvas,altoCanvas);
        imagen.cargarImagen(e.target.result);
    }
        
        
})
// evento para mostrar opciones de lapiz y crearlo
btnLapiz.addEventListener('click',()=>{
    
    
    lapiz = new Lapiz(ctx, color, fuente);
    
    // funcion para escribir el menu del lapiz
    escritor.menuDeLapiz(barraAux,color,fuente);

    btnColor = document.querySelector('#btnColor');
    btnFuenteLapiz = document.querySelector('#btnFuente');
    //eventos para cambiar las propiedades del lapiz y actualizar variables auxiliares de memoria
        //cambiar color
    btnColor.addEventListener('input',(e)=>{
        color = e.target.value;
        lapiz.cambiarColor(color);
            
    })
    //cambiar grosor
    btnFuenteLapiz.addEventListener('input',(e)=>{
        fuente = e.target.value;
        lapiz.cambiarGrosor(fuente);
        
    })
    
})
// evento para mostrar opciones de la goma y crearla
btnGoma.addEventListener('click',()=>{
    lapiz = new Lapiz(ctx,'white',5)
    
    // funcion para escribir el menu de la goma
    escritor.menuDeGoma(barraAux);
    btnFuenteGoma = document.querySelector('#btnFuente');
    btnFuenteGoma.addEventListener('input',(e)=>{
        
        lapiz.cambiarGrosor(e.target.value);
    })
})
btnFiltros.addEventListener('click',()=>{
    //funcion para escribir el menu de os filtros.
    escritor.menuDeFiltros(barraAux);
    lapiz=null;
    //captura todos los elementos y le asigna eventos.
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

function aplicarBlur(){
    filtro = new FiltroBlur()
    let imageData = filtro.filtrar(ctx.getImageData(0, 0, canvas.width, canvas.height),anchoCanvas,altoCanvas);
    ctx.putImageData(imageData,0,0);
}
function aplicarSaturacion(){
    filtro = new FiltroSaturacion(2)
    let imageData = filtro.filtrar(ctx.getImageData(0, 0, canvas.width, canvas.height),anchoCanvas,altoCanvas);
    ctx.putImageData(imageData,0,0);
}
function aplicarDetecBordes(){
    filtro = new FiltroDetecBordes()
    let imageData = filtro.filtrar(ctx.getImageData(0, 0, canvas.width, canvas.height),anchoCanvas,altoCanvas);
    ctx.putImageData(imageData,0,0);
}

function aplicarSharp(){
    filtro = new FiltroSharp()
    let imageData = filtro.filtrar(ctx.getImageData(0, 0, canvas.width, canvas.height),anchoCanvas,altoCanvas);
    ctx.putImageData(imageData,0,0);
}
//}