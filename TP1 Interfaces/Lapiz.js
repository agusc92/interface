class Lapiz {

    constructor(ctx, x, y, color, width) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = 'round';
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

}
