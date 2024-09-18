class FiltroSepia{
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
    
                
                data[index] = red * 0.393 + green * 0.769 + blue * 0.189;
                data[index + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
                data[index + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
                
                
            }
        }
        
        return imageData;
    }
    
}