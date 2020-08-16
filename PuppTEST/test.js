const puppeteer = require('puppeteer');

let url = 'http://www.google.com';
(async()=>{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({path: 'OGP.png'});
  await browser.close();
})();