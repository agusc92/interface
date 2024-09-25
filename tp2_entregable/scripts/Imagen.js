class Imagen{
     image;
    
    constructor(anchoCanvas,altoCanvas){
        
        
        this.image = new Image();
        this.anchoCanvas = anchoCanvas;
        this.altoCanvas = altoCanvas;
    }

    cargarImagen(url,ctx){
        this.image.src = url;
        this.image.onload=()=>{
            let anchoImagen = this.image.width;
            let altoImagen = this.image.height;

            // Calcular el factor de escala para ajustar la imagen al canvas
            const escala = Math.min(this.anchoCanvas / anchoImagen, this.altoCanvas / altoImagen);

            // Calcular las nuevas dimensiones de la imagen
            let nuevoAncho = anchoImagen * escala;
            let nuevoAlto = altoImagen * escala;
            this.dibujar(ctx,nuevoAncho,nuevoAlto)
        }
    }
    dibujar(ctx,nuevoAncho,nuevoAlto){
        // Dibujar la imagen en el canvas con las nuevas dimensiones
        ctx.drawImage(this.image, (this.anchoCanvas - nuevoAncho) / 2, 
        (this.altoCanvas - nuevoAlto) / 2, nuevoAncho, nuevoAlto);
        };
        
    }

