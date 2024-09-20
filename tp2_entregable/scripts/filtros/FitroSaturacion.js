class FiltroSaturacion extends Filtro{
    constructor(saturacion){
        super();
        
        this.saturacion = saturacion;
    }

    
    manipularPixel(rojo,verde,azul,data,index){
        let lum = 0.2126 * rojo + 0.7152 * verde + 0.0722 * azul;
        data[index] = lum + this.saturacion * (rojo - lum);
        data[index + 1] = lum + this.saturacion * (verde - lum);
        data[index + 2] = lum + this.saturacion * (azul - lum);
    }
}