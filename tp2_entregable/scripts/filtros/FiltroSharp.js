class FiltroSharp{
    constructor(){

    }

    filtrar(imageData,anchoCanvas,altoCanvas){
        let data = imageData.data;
        
        

        let kernel = [
            [1 / 9, 1 / 9, 1 / 9],
          [1 / 9, 1 / 9, 1 / 9],
          [1 / 9, 1 / 9, 1 / 9]
        ]
        

        for (let y = 0; y < altoCanvas; y++) {
            for (let x = 0; x < anchoCanvas; x++) {
                let rojo = 0;
                let verde = 0;
                let azul = 0;
                let indice = 0;
               
                for (let ky = 0; ky < 3; ky++) {
                    for (let kx = 0; kx < 3; kx++) {
                        const indice= (((y + ky) * anchoCanvas) + (x + kx)) * 4;

                            rojo += data[indice] *kernel[ky][kx];
                            verde += data[indice+1] *kernel[ky][kx];
                            azul += data[indice+2]*kernel[ky][kx] ;
                        
                    }
                } //doble for pixeles adyacentes
                
                indice = (x + (y * anchoCanvas)) * 4;

                data[indice] = data[indice] +(data[indice]-rojo) *2;
                data[indice+1] = data[indice +1] + (data[indice +1] -verde) *2;
                data[indice+2] = data[indice +2] + (data[indice +2] -azul) *2;
            }
        } // doble for del canvas

        return imageData;
    }
}