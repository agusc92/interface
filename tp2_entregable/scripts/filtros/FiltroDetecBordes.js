class FiltroDetecBordes{
    constructor(){

    }

    filtrar(imageData,anchoCanvas,altoCanvas){
        
        let data = imageData.data;

        const kernelx =
            [[-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]];
        const kernely =
            [[-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]];

        for (let y = 1; y < altoCanvas - 1; y++) {
            for (let x = 1; x < anchoCanvas - 1; x++) {

                let magX = 0, magY = 0;

                for (let ky = 0; ky < 3; ky++) {
                    for (let kx = 0; kx < 3; kx++) {
                        const index = (((y + ky) * anchoCanvas) + (x + kx)) * 4; 
                        const r = data[index];
                        const g = data[index + 1];
                        const b = data[index + 2];

                        // Convert to gray scale
                        const gray = (r + g + b) / 3;

                        magX += gray * kernelx[ky][kx];
                        magY += gray * kernely[ky][kx];
                    }
                }
                const color = Math.sqrt((magX * magX) + (magY * magY));

                const index = (x + (y * anchoCanvas)) * 4;
                data[index] = color;
                data[index + 1] = color;
                data[index + 2] = color;
            }
        }
        return imageData;
}
}