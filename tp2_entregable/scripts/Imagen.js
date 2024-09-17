class Imagen{
     image;
    constructor(url,ctx,anchoCanvas,altoCanvas){
        this.url = url;
        this.ctx = ctx;
        this.image = new Image();
        this.anchoCanvas = anchoCanvas;
        this.altoCanvas = altoCanvas;
    }

    dibujar(){
        this.image.src = this.url;
        this.image.onload=()=>{
            let anchoImagen = this.image.width;
            let altoImagen = this.image.height;

            // Calcular el factor de escala para ajustar la imagen al canvas
            const escala = Math.min(this.anchoCanvas / anchoImagen, this.altoCanvas / altoImagen);

            // Calcular las nuevas dimensiones de la imagen
            const nuevoAncho = anchoImagen * escala;
            const nuevoAlto = altoImagen * escala;

            // Dibujar la imagen en el canvas con las nuevas dimensiones
            ctx.drawImage(this.image, (this.anchoCanvas - nuevoAncho) / 2, 
            (this.altoCanvas - nuevoAlto) / 2, nuevoAncho, nuevoAlto);
        };
        }
    }

