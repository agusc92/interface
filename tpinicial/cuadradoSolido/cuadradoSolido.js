/** @type {CanvasRenderingContext2D} */
/** @type { HTMLCanvasElement} */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let gr = 255;
let aum = 255/ canvas.width;

let imageData = ctx.createImageData(canvasWidth,canvasHeight);

//negro con gradiente

// function setPixel(imgData,x,y,r,g,b,a){
//     let index = (x + y * imgData.width) *4;
//     imgData.data[index + 0] = r;
//     imgData.data[index + 1] = g;
//     imgData.data[index + 2] = b;
//     imgData.data[index + 3] = a;
// }
// for(let y = 0 ;y < canvasHeight;y++){
    
//     for(let x =0 ; x< canvasWidth;x++){
        
//         setPixel(imageData,x,y,0,0,0,gr);
//     }
//     gr -= aum;
// }
// ctx.putImageData(imageData, 0, 0);



//negro amarillo y roj con gradiente
// let gradienteColorAmarillo = 0;
// function setPixel(imgData,x,y,r,g,b,a){
//     let index = (x + y * imgData.width) *4;
//     imgData.data[index + 0] = r;
//     imgData.data[index + 1] = g;
//     imgData.data[index + 2] = b;
//     imgData.data[index + 3] = a;
// }
// for(let y = 0 ;y < canvasHeight;y++){
    
//         for(let x =0 ; x< canvasWidth;x++){
            
//             if(x< canvasWidth/2){
//                 gradienteColorAmarillo += aum*2;
//             setPixel(imageData,x,y,gradienteColorAmarillo,gradienteColorAmarillo,0,gr);
            
//             }else{
//                 setPixel(imageData,x,y,255,gradienteColorAmarillo,0,gr);
//                 gradienteColorAmarillo -= aum*2;
//             }
            
//         }
        
//     gr -= aum;
// }
    ctx.putImageData(imageData, 0, 0);

let img = new Image();

let btn = document.querySelector('#load');

btn.addEventListener('change',(e)=>{
    let file = e.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = (e)=>{
        
        img.src = e.target.result;
        
    }
})

img.onload = ()=> {
    
    ctx.drawImage(img,0,0,canvasWidth,canvasHeight);
    
}

const grayscale = () => {
    
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) /3 ;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  let radios = document.querySelectorAll('.escalaGrises');

  radios.forEach(radio => {
    radio.addEventListener('change',(e)=>{
        switch(e.target.id){
            case 'gris':
                grayscale();
                break
            
            case 'normal' :
                ctx.drawImage(img,0,0,canvasWidth,canvasHeight);
        }
        
        
      })
  });
  