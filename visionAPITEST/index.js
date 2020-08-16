/**
 * HTTP Cloud Function that counts how many times
 * it is executed within a specific instance.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

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
}
    
    exports.makeOGP = (req, res) => {
    
    let url = req.query.url;
    // let url = 'https://example.com';
    let imagepath = '/visionAPITEST/example.png';//imagepath：出力

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: imagepath});

    await browser.close();

    res.status(200).send("makeOGP finish");

}

makeOGP();