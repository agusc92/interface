class FiltroBrillo{
    constructor(brillo){
        this.brillo = brillo;
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
    
                
                data[index] = Math.min(255, red * this.brillo); // Rojo
                data[index + 1] = Math.min(255, green * this.brillo); // Verde
                 data[index + 2] = Math.min(255, blue * this.brillo); // Azul
                
                
            }
        }
        
        return imageData;
    }
    
}