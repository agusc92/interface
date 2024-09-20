class FiltroSepia extends Filtro{
    constructor(){
        super();
    }

    
    manipularPixel(rojo,verde,azul,data,index){
        data[index] = rojo * 0.45 + verde * 0.65 + azul * 0.2;
        data[index + 1] = rojo * 0.3 + verde * 0.55 + azul * 0.15;
        data[index + 2] = rojo * 0.2 + verde * 0.35 + azul * 0.05;
    }
}