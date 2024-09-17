/** @type {CanvasRenderingContext2D} */
/** @type { HTMLCanvasElement} */

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let btnLapiz = document.querySelector('#lapiz')
let btnGoma = document.querySelector('#btnGoma');
let btnGuardar = document.querySelector('#guardarImagen');
const anchoCanvas = canvas.width;
const altoCanvas = canvas.height;
const barraAux = document.querySelector('#barraAux')
let mouseAbajo = false;
let lapiz;
let btnColor;
let btnFuente;
btnGuardar.addEventListener('click',()=>{
    const dataURL = canvas.toDataURL('image/png'); // Puedes cambiar 'image/png' a 'image/jpeg'
    btnGuardar.href = dataURL;
    
})
btnLapiz.addEventListener('click',()=>{
    lapiz = new Lapiz(ctx, null, null, 'black', 5)
    barraAux.innerHTML = '<li><input type="color" id="btnColor"></li> <li><input type="number" id="btnFuente"></li>';
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
    barraAux.innerHTML = '<li><input type="number" id="btnFuente"></li>';
    btnFuente = document.querySelector('#btnFuente');
    btnFuente.addEventListener('input',(e)=>{
        
        lapiz.cambiarGrosor(e.target.value);
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
