import { Figura } from "./Figura.js";
export {Circulo};

class Circulo extends Figura{
    constructor(posX, posY, radio, relleno, contexto){
        super(posX,posY,contexto,relleno);
        this.radio = radio;
    }

    dibujar(){
        this.contexto.fillStyle = this.relleno;
        this.contexto.beginPath();
        this.contexto.arc(this.posX,this.posY,this.radio,0,2 * Math.PI);
        this.contexto.fill();
        
    }

    estaElPunto(x, y) {
        let xC = this.posX-x ;
        let yC = this.posY-y ;
        return ((Math.sqrt(xC * xC + yC * yC) < this.radio));
    }

    moverFigura(posX,posY){
        
        this.posX = posX;
        this.posY = posY;
        
        
    }
}