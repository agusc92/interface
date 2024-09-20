class FiltroMonoCromo extends Filtro{
    constructor(){
        super();
    }

    
    manipularPixel(rojo,verde,azul,data,index){
        let promedio = (rojo + verde + azul) / 3 >128? 255 : 0;
        
        data[index] = promedio;
        data[index + 1] = promedio;
        data[index + 2] = promedio;
    }
    
}