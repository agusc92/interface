class FiltroBlur{
    constructor(){

    }

    filtrar(imageData,anchoCanvas,altoCanvas){
        let data = imageData.data;
        
        

        let kernel = [
            [1,1,1],
            [1,1,1],
            [1,1,1]
        ]
        let largoKernel = 3;

        for (let y = 0; y < altoCanvas; y++) {
            for (let x = 0; x < anchoCanvas; x++) {
                let rojo = 0;
                let verde = 0;
                let azul = 0;
                let indice = 0;
                let cont = 0;
                for(let i = 0 ; i < largoKernel;i++){
                    for(let j =0 ; j< largoKernel ; j++){
                        let nuevoIndiceX = x + i - Math.floor(largoKernel /2);
                        let nuevoIndiceY = y + i - Math.floor(largoKernel /2);

                        if(nuevoIndiceX >= 0 && nuevoIndiceX < anchoCanvas && nuevoIndiceY >= 0 && nuevoIndiceY < altoCanvas){
                            cont++;
                            indice = (nuevoIndiceX + (nuevoIndiceY * anchoCanvas)) * 4;

                            let m = kernel[i][j];

                            rojo += data[indice] * m;
                            verde += data[indice+1] * m;
                            azul += data[indice+2] * m;
                        }
                    }
                } //doble for pixeles adyacentes
                
                indice = (x + (y * anchoCanvas)) * 4;

                data[indice] = rojo / cont;
                data[indice +1] = verde / cont;
                data[indice +2] = azul / cont;
            }
        } // doble for del canvas

        return imageData;
    }
}