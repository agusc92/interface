// document.addEventListener('DOMContentLoaded',main)
// function main(){
/** @type {CanvasRenderingContext2D} */
/** @type { HTMLCanvasElement} */
//variables de lapiz y goma
let lapiz;
let color = '#000000'; 
let fuente = 5;
let mouseAbajo = false;
//variables de canvas
let canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const anchoCanvas = canvas.width;
const altoCanvas = canvas.height;
const escritor = new EscritorHtml();
//variables de filtros
const btnFiltros = document.querySelector('#btnFiltros');
let filtro;
const filtros={//objeto que contiene ,como valor, la llamada a la funcion de los filtros.
            //y como clave, el  el atributo valor de cada boton en el dDOM.
           
    monoCromo: aplicarMonoCromo,
    negativo: aplicarNegativo,
    sepia: aplicarSepia,
    brillo: aplicarBrillo,
    blur : aplicarBlur,
    saturacion : aplicarSaturacion,
    detectBordes : aplicarDetecBordes,
    sharp : aplicarSharp,
}

const btnHojaBlanca = document.querySelector('#hojaBlanca');
const btnLapiz = document.querySelector('#lapiz');
const btnGoma = document.querySelector('#btnGoma');
const btnGuardar = document.querySelector('#btnGuardar');
const btnCargar = document.querySelector('#btnCargar');
const barraAux = document.querySelector('#barraAux');

///////////eventos sobre el canvas////////////
//evento para cortar el trazo cuando el lapiz sale del canvas
dibujarCanvas();//pinta el canvas de blanco
canvas.addEventListener('mouseleave',()=>{
    mouseAbajo=false;
});
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
//evento para capturar el movimiento del mouse sobre el canvas.
canvas.addEventListener('mousemove', (e) => {
    //pide la posicion del mouse y se lo pasa al lapiz para que se dibuje.
    let pos = posicionMouse(e);
    
    if(mouseAbajo && lapiz) {
        
        lapiz.dibujar(pos.x, pos.y);
        lapiz.asignarPosicion(pos.x, pos.y);
    }
})
///////////eventos sobre los botones de el menu superior////////////
//evento para borra todo el contenido del canvas.
btnHojaBlanca.addEventListener('click',()=>{
    //funcion para dar la opcion de guardar antes de borrar
    hojaBlanca();
})
//evento para guarda el contenido del canvas
btnGuardar.addEventListener('click',()=>{
    guardarImagen(btnGuargar);
    
})

//evento para cargar una imagen desde la computadora
btnCargar.addEventListener('change',(e)=>{
        cargarImagen(e);    
})
///////////eventos sobre los botones de herramientas principales////////////
// evento para mostrar opciones de lapiz y crearlo
btnLapiz.addEventListener('click',()=>{
    
    
    lapiz = new Lapiz(ctx, color, fuente);
    
    // funcion para escribir el menu del lapiz
    escritor.menuDeLapiz(barraAux,color,fuente);

    //eventos para cambiar las propiedades del lapiz y actualizar variables auxiliares de memoria
    
   cambiarValoresLapiz();
    
})
// evento para mostrar opciones de la goma y crearla
btnGoma.addEventListener('click',()=>{
    lapiz = new Lapiz(ctx,'white',5)
    
    // funcion para escribir el menu de la goma
    escritor.menuDeGoma(barraAux);
    const btnFuenteGoma = document.querySelector('#btnFuente');
    //evento para cambiar el grosor de la goma.
    btnFuenteGoma.addEventListener('input',(e)=>{
        
        lapiz.cambiarGrosor(e.target.value);
    })
})
btnFiltros.addEventListener('click',()=>{
    //funcion para escribir el menu de os filtros.
    escritor.menuDeFiltros(barraAux);
    lapiz=null;
    //captura todos los botones en un array.
    let botones = [...barraAux.querySelectorAll('button')];

    //recorre el array asignandole un evento a cada boton.
    botones.forEach(boton=>{
        boton.addEventListener('click',()=>{
            //el value de cada boton se corresponde con la llave del objeto que contiene las funciiones
            filtros[boton.value]();
        })
    })
})

////////////funciones///////////////


//obtiene la informacion de el archivo capturado por el input data y lo dibuja en el canvas.
function cargarImagen(e){
    let archivo = e.target.files[0];
    let reader = new FileReader();
    if(archivo){
        reader.readAsDataURL(archivo);
        reader.onload=(e)=>{

            let imagen = new Imagen(anchoCanvas,altoCanvas);
            imagen.cargarImagen(e.target.result,ctx);
        }
    }
}
function guardarImagen(boton){
    const dataURL = canvas.toDataURL('image/png'); 
    boton.href = dataURL;
}
function cambiarValoresLapiz(){
    //captura los botones y les asigna los eventos.
    const btnColor = document.querySelector('#btnColor');
    const btnFuenteLapiz = document.querySelector('#btnFuente');
    //cambiar color.
    btnColor.addEventListener('input',(e)=>{
        color = e.target.value;
        lapiz.cambiarColor(color);
            
    })

    //cambiar grosor.
    btnFuenteLapiz.addEventListener('input',(e)=>{
        fuente = e.target.value;
        lapiz.cambiarGrosor(fuente);
        
    })
}

function dibujarCanvas(){
    ctx.clearRect(0, 0, anchoCanvas, altoCanvas);
    //pinta el canvas de blanco
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.rect(0,0,anchoCanvas,altoCanvas);
    ctx.fill();
}
//obtiene la posicion del mouse y lo devuelve como objeto.
function posicionMouse(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    return { x, y };
}
function hojaBlanca(){
     //hace visible un cartel con botones.
     let ventanaEmergente = document.querySelector('#ventanaEmergente');
     ventanaEmergente.style.visibility = 'visible'
     let btnSi = document.querySelector('#btnSi');
     let btnNo = document.querySelector('#btnNo');
     
     //eventos para guardar la imagen antes de borrarla si asi lo desea.
     btnSi.addEventListener('click',(e)=>{
         guardarImagen(btnSi);
         dibujarCanvas();
         ventanaEmergente.style.visibility = 'hidden'
     })
     btnNo.addEventListener('click',(e)=>{
         dibujarCanvas();
         ventanaEmergente.style.visibility = 'hidden'
     })
}
////////////////funciones de los filtros//////////////////
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
    let saturacion;
    saturacion = document.querySelector('#saturacion')
    filtro = new FiltroSaturacion(saturacion.value/100)
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