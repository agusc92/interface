/** @type { HTMLCanvasElement} */
let canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d');


let mouseDown = false;

let lapiz = new Lapiz(ctx, 0, 0, 'blue', 15);

canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
    let pos = getMousePos(e);
    lapiz.setPosition(pos.x, pos.y);
})

canvas.addEventListener('mousemove', (e) => {
    let pos = getMousePos(e);
    if(mouseDown) {
        lapiz.draw(pos.x, pos.y);
        lapiz.setPosition(pos.x, pos.y);
    }
})

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
})

function getMousePos(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    return { x, y };
}




/**
 * Filtro escala de grises
 */

let img = new Image();

img.src = 'autos-2.jpg';
img.onload = () => {
    ctx.drawImage(img, 0, 0);
}

document.getElementById('filtro').addEventListener('click', () => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    let red = 0;
    let green = 0;
    let blue = 0;
    let promedio = 0;
    let index = 0;
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            
            index = (x + (y * canvas.width)) * 4;
            red = data[index];
            green = data[index + 1];
            blue = data[index + 2];

            promedio = (red + green + blue) / 3;

            data[index] = promedio;
            data[index + 1] = promedio;
            data[index + 2] = promedio;
            
        }
    }
    ctx.putImageData(imageData, 0, 0);

});


