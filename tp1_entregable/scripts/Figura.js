export {Figura};

class Figura{

    constructor(posX,posY,contexto,relleno){
        this.posX = posX;
        this.posY = posY;
        this.contexto = contexto;
        this.relleno = relleno;
        
    }

    dibujar(){
        
    }

    moverFigura(posX,posY){
        this.posX = posX;
        this.posY = posY;
    }

    setSeleccionada(seleccionada){
        this.resaltada = seleccionada;
    }
    

    estaElPunto(){
        //codigo para saber si se clickeo dentro de la figura
    }
}