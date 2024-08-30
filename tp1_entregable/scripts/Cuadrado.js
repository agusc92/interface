import { Figura } from "./Figura.js";
export {Cuadrado};
class Cuadrado extends Figura{
    constructor(posX,posY,contexto,lado,relleno){
        super(posX,posY,contexto,relleno)
        this.lado = lado;
        
    }

    dibujar(){
        this.contexto.fillStyle = this.relleno;
        this.contexto.beginPath();
        this.contexto.rect(this.posX,this.posY,this.lado,this.lado);
        this.contexto.fill();
        
    }
    estaElPunto(x,y){
        console.log('estaelpunto')
        return ((x > this.posX  && x < this.posX + this.lado  && y > this.posY && y < this.posY + this.lado )); 
    }
    moverFigura(posX,posY){
        this.posX = posX ;
        this.posY = posY ;
    }
}