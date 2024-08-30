import { Figura } from "./Figura.js";
import { Cuadrado } from "./Cuadrado.js";
import { Rectangulo } from "./Rectangulo.js";
import { Circulo } from "./Circulo.js";
/** @type {CanvasRenderingContext2D} */
/** @type { HTMLCanvasElement} */

let canvas = document.querySelector('#canvas');
let contexto = canvas.getContext('2d');

let anchoCanvas = canvas.width;
let altoCanvas = canvas.height;
let mouseApretado = false;

let figuraSeleccionada = null;

let figuras = [] ;
const CANTIDAD_FIGURAS = 30; //cantidad de figuras en el canvas


document.addEventListener('DOMContentLoaded',()=>{
    pintarCanvas(); //colorea el fondo del canvas
    dibujarFiguras(); //crea las figuras y las agrega al canvas
   
});

canvas.addEventListener('mouseenter',()=>{
    //deselecciona la figura para que no se mueva al entrar al canvas
    figuraSeleccionada = null;
})

document.addEventListener('keydown',(e)=>{
    if(figuraSeleccionada){
        let direccion = e.key; //captura la flecha apretada
        moverConFlechas(direccion) //realiza el movimiento a partir de la flecha apretada      
        actualizar();
    }
})

canvas.addEventListener('click',e=>{ //selecciona la figura para moverla con las flechas
    let pos = getMousePos(e); // obtiene la posicion actual del mouse
    seleccionarFigura(pos); // selecciona la figura señalada
    if(figuraSeleccionada)
        alert(`Hiciste click en la figura que se encuentra en ${pos.x}x ; ${pos.y}y. Puedes moverla con las flechas hasta que vuelvas a introducir el mouse en el canvas`);
})

canvas.addEventListener('mousedown', (e) => { // realiza, junto con mouse move, el moviomiento de la figura con el mouse
    let pos = getMousePos(e);
    mouseApretado = true;
    seleccionarFigura(pos);
   
});
canvas.addEventListener('mouseup',()=>{ //finaliza el movimiento de la figura con el mouse
   figuraSeleccionada = false;
})
canvas.addEventListener('mousemove',(e)=>{//se encarga de mover la figura con el mouse
    let pos = getMousePos(e);   
        if(figuraSeleccionada){ 
            figuraSeleccionada.moverFigura(pos.x,pos.y); //actualiza la posicion de la figura que se esta arrastrando    
            actualizar(); //redibuja el canvas y las figuras que no se mueven
        }    
    
    mouseApretado = false;
    
})
function dibujarFiguras(){ 
    if(figuras.length< CANTIDAD_FIGURAS){
        crearFiguras()
        figuras[figuras.length-1].dibujar();
        setInterval(dibujarFiguras,300);
        
    }
}

function crearFiguras(){ //crea las figuras
    let posX = Math.round(Math.random() * anchoCanvas) 
    let posY = Math.round(Math.random() * altoCanvas)
    let color ;
        if(figuras.length<CANTIDAD_FIGURAS * 0.3){
            color = generarColorAleatoreo(0,128) // genera los colores de las figuras a partir de un maximo y un minimo
            let circulo = new Circulo(posX, posY, Math.round(Math.random() * 50 + 5), color,contexto);
            figuras.push(circulo);   
        }else if(figuras.length>CANTIDAD_FIGURAS *0.3 && figuras.length<CANTIDAD_FIGURAS * 0.6){
            color = generarColorAleatoreo(128,255)
            let rectangulo = new Rectangulo(posX,posY,contexto,Math.round(Math.random() * 100 + 5),Math.round(Math.random() * 100 +5 ),color);
            figuras.push(rectangulo);
        }else if (figuras.length < CANTIDAD_FIGURAS){
            color = generarColorAleatoreo(128,255)
            let cuadrado = new Cuadrado(posX,posY,contexto,Math.round(Math.random() * 100 + 5),color);
            figuras.push(cuadrado);
        }
}

function generarColorAleatoreo(max,min){
    
    let r = Math.random() * (max - min) + min;;
    let g = Math.random() * (max - min) + min;;
    let b = Math.random() * (max - min) + min;;
    let a = 255;

    return `rgba( ${r} , ${g} , ${b} , ${a})`;
}


function pintarCanvas() { 
    let color = 'rgba(230,245,235,255)';
    let rect = new Rectangulo(0, 0, contexto,altoCanvas-1,anchoCanvas-1,  color);
    rect.dibujar();
}
function getMousePos(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    return { x, y };
}
function actualizar(){
    pintarCanvas();
    figuras.forEach(figura=>{
        figura.dibujar()
    })
}

function moverConFlechas(direccion){
    switch(direccion){
        case 'ArrowDown': figuraSeleccionada.moverFigura(figuraSeleccionada.posX,figuraSeleccionada.posY+2);                      
            break;
        case 'ArrowUp': figuraSeleccionada.moverFigura(figuraSeleccionada.posX,figuraSeleccionada.posY-2);                       
            break;
        case 'ArrowRight': figuraSeleccionada.moverFigura(figuraSeleccionada.posX+2,figuraSeleccionada.posY);
            break;
        case 'ArrowLeft': figuraSeleccionada.moverFigura(figuraSeleccionada.posX-2,figuraSeleccionada.posY);
            break;
    }
}

function seleccionarFigura(pos){
    if(mouseApretado)
        figuras.forEach(figura=>{
            if(figura.estaElPunto(pos.x,pos.y)){
                
                figuraSeleccionada = figura;
            }
        })
}