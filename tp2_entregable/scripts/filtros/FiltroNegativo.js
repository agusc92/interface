class FiltroNegativo{
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
               
    
                data[index] = 255 - data[index];
                data[index + 1] = 255 - data[index + 1];
                data[index + 2] = 255 - data[index + 2];
                
            }
        }
        
        return imageData;
    }
    
}