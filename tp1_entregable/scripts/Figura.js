class Figura{

    constructor(posX,posY,contexto,ancho,alto,relleno,resaltada){
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
        this.relleno = relleno;
        this.resaltada = resaltada;
    }

    dibujar(){
        //manera de dibujar cada figura
    }

    moverFigura(posX,posY){
        this.posX = posX;
        this.posY = posY;
    }

    estaElPunto(){
        //codigo para saber si se clickeo dentro de la figura
    }
}