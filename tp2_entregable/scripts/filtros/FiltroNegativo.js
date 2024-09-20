class FiltroNegativo extends Filtro{
    
    constructor(){
        super();
    }
    

    manipularPixel(rojo,verde,azul,data,index){
        data[index] = 255 - rojo;
        data[index + 1] = 255 - verde;
        data[index + 2] = 255 - azul;
    }
    
}