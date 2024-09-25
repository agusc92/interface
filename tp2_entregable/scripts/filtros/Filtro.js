class Filtro{
    constructor(){

    }

    // funcion generica para recorrer el image data y aplicar las modificaciones
    filtrar(imageData){
        let data = imageData.data;
        let rojo = 0;
        let verde = 0;
        let azul = 0;
        let index = 0;
        //recorre el ancho y alto del canvas
        for (let y = 0; y < altoCanvas; y++) {
            for (let x = 0; x < anchoCanvas; x++) {
                //toma cada pixel y le modifica los valores RGB.
                index = (x + (y * anchoCanvas)) * 4;
                rojo = data[index];
                verde = data[index + 1];
                azul = data[index + 2];
                //llama a la funcion para manipular los pixels que sera definida en las clases hijo.
                this.manipularPixel(rojo,verde,azul,data,index)
                
                
            }
        }
        
        return imageData;
    }// fin de filtrar()

    manipularPixel(){
        //resuelven los hijos
    }
}
