class FiltroMonoCromo{
    constructor(){
        
    }

    filtrar(imageData,anchoCanvas,altoCanvas){
        let data = imageData.data;
        let red = 0;
        let green = 0;
        let blue = 0;
        let promedio = 0;
        let index = 0;
        for (let y = 0; y < altoCanvas; y++) {
            for (let x = 0; x < anchoCanvas; x++) {
                
                index = (x + (y * anchoCanvas)) * 4;
                red = data[index];
                green = data[index + 1];
                blue = data[index + 2];
    
                promedio = (red + green + blue) / 3;
    
                data[index] = promedio;
                data[index + 1] = promedio;
                data[index + 2] = promedio;
                
            }
        }
        
        return imageData;
    }
    
}