class FiltroBrillo extends Filtro{
    constructor(brillo){
        super();
        this.brillo = brillo;
    }

    
    manipularPixel(rojo,verde,azul,data,index){
        data[index] = Math.min(255, rojo * this.brillo); // Rojo
        data[index + 1] = Math.min(255, verde * this.brillo); // Verde
        data[index + 2] = Math.min(255, azul * this.brillo); // Azul
    }
}