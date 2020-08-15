async function dominantColor()  {
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    
    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';
    
    // Performs property detection on the local file
    const [result] = await client.imageProperties('./resources/ninja-catfoot.png');
    const colors = result.imagePropertiesAnnotation.dominantColors.colors;
    //colors.forEach(color => console.log(color)); 

    let maxscore,maxFraction;
    let maxscorered,maxscoregreen, maxscoreblue;
    let maxFractionred,maxFractiongreen,maxFractionblue;
    maxscore = 0;
    maxFraction = 0;
    colors.forEach(function(color){
        if(color.score >= maxscore){ //焦点に当てたい物のRGB値を格納
            maxscore = color.score;
            console.log("maxscore=" + maxscore);
            maxscorered = color.color.red;
            maxscoregreen = color.color.green;
            maxscoreblue = color.color.blue
        }
        if(color.pixelFraction >= maxFraction){
            maxFraction = color.pixelFraction;
            console.log("maxFraction=" + maxFraction);
            maxFractionred = color.color.red;
            maxFractiongreen = color.color.green;
            maxFractionblue = color.color.blue
        }
    });
    console.log(maxscorered);
    console.log(maxFractionred);
}

console.log("test");
dominantColor()
