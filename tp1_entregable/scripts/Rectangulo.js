import { Figura } from "./Figura.js";
export {Rectangulo};
class Rectangulo extends Figura{

    constructor(posX,posY,contexto,alto,ancho,relleno){
        super(posX,posY,contexto,relleno)
        this.ancho = ancho;
        this.alto = alto;
    }

    dibujar(){
        this.contexto.fillStyle = this.relleno;
        this.contexto.beginPath();
        this.contexto.rect(this.posX,this.posY,this.ancho,this.alto);
        this.contexto.fill();
        
    }

    estaElPunto(x,y){
        console.log('estaelpunto')
        return ((x > this.posX  && x < this.posX + this.ancho  && y > this.posY && y < this.posY + this.alto ));
       
    }
    moverFigura(posX,posY){
       
        this.posX = posX ;
        this.posY = posY ;
        
    
    }
}