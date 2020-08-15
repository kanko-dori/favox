async function dominantColor()  {
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    
    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';
    
    // Performs property detection on the local file
    const [result] = await client.imageProperties('./resources/durian.png');
    const colors = result.imagePropertiesAnnotation.dominantColors.colors;
    colors.forEach(color => console.log(color)); 

    let maxscore,maxFraction;
    let maxscorered,maxscoregreen, maxscoreblue;
    let downbrightR,downbrightG,downbrightB;
    // let maxFractionred,maxFractiongreen,maxFractionblue;
    maxscore = 0;
    maxFraction = 0;
    colors.forEach(function(color){
        if(color.score >= maxscore){ //焦点に当てたい物のRGB値を取得
            maxscore = color.score;
            console.log("maxscore=" + maxscore);
            maxscorered = color.color.red;
            maxscoregreen = color.color.green;
            maxscoreblue = color.color.blue
        }
        // if(color.pixelFraction >= maxFraction){ //一番使われている色のRGB値を取得
        //     maxFraction = color.pixelFraction;
        //     console.log("maxFraction=" + maxFraction);
        //     maxFractionred = color.color.red;
        //     maxFractiongreen = color.color.green;
        //     maxFractionblue = color.color.blue
        // }
    });
   // //補色の計算
    // let max = Math.max(maxFractionred, Math.max(maxFractiongreen, maxFractionblue));
    // let min = Math.min(maxFractionred, Math.min(maxFractiongreen, maxFractionblue));
    // let sum = max + min;
    // let compR = sum - maxFractionred;
    // let compG = sum - maxFractiongreen;
    // let compB = sum - maxFractionblue;

    //明度を落とした判定
    if((maxscorered-maxscoregreen) < 10 && (maxscorered - maxscoreblue) < 10 && maxscorered < 100 ){//黒っぽいか判定
        downbrightR = Math.round(2.5 * maxscorered);
        downbrightG = Math.round(2.5 * maxscoregreen);
        downbrightB = Math.round(2.5 * maxscoreblue);
    } 
    else{
        downbrightR = Math.round(maxscorered * 0.8);
        downbrightG = Math.round(maxscoregreen * 0.8);
        downbrightB = Math.round(maxscoreblue * 0.8);
    }
    

    

    // if(maxFraction > 0.1){
        console.log("背景色に明度を落とした色を提案｛R:"+ downbrightR + ",G:"+ downbrightG + ",B:"+ downbrightB + "}");
        
//         console.log("補色｛R:"+　compR + ",G:"+ compG + ",B:"+ compB + "}");
//     }
//     else{
//         console.log("背景色に補色を提案｛R:"+　compR + ",G:"+ compG + ",B:"+ compB + "}");
//         console.log("明度を落とした色｛R:"+ downbrightR + ",G:"+ downbrightG + ",B:"+ downbrightB + "}");
//     }
}

console.log("test");
dominantColor()
