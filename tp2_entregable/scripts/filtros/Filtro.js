class Filtro{
    constructor(){

    }

    filtrar(imageData){
        // funcion generica para recorrer el image data y aplicar las modificaciones
        let data = imageData.data;
        let rojo = 0;
        let verde = 0;
        let azul = 0;
        let index = 0;
        for (let y = 0; y < altoCanvas; y++) {
            for (let x = 0; x < anchoCanvas; x++) {
                
                index = (x + (y * anchoCanvas)) * 4;
                rojo = data[index];
                verde = data[index + 1];
                azul = data[index + 2];
                this.manipularPixel(rojo,verde,azul,data,index)
                
                
            }
        }
        
        return imageData;
    }// fin de filtrar()

    manipularPixel(){
        //resuelven los hijos
    }
}
