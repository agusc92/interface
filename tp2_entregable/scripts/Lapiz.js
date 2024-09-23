class Lapiz {

    constructor(ctx, color, width) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = 'round';
    }

    asignarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }

    dibujar(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    cambiarColor(color){
        this.ctx.strokeStyle = color;
    }
    cambiarGrosor(valor){
        this.ctx.lineWidth = valor;
    }
}
