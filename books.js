const { Builder, By } = require('selenium-webdriver');
require('selenium-webdriver/chrome');
require('chromedriver');

//========= SELENIUM Strape ===================

async function OpenClosePage3(xUrl) {
  try {
    const driver = await GetSileniumDriver();
   
    await driver.sleep(500);

    await driver.get(xUrl); //('http://books.toscrape.com/');

    const elements = await driver.findElements(By.className('product_pod'));

    console.log('');
    console.log('Scraped BOOKS from the website:');
    console.log('');

    let ni = 0;

    for (const element of elements) {
      ni++;

      const image = await element.findElement(By.tagName('img')).getAttribute('src');
      const title = await element.findElement(By.tagName('h3')).getText();
      const link = await element.findElement(By.css('h3 > a')).getAttribute('href');
      const price = await element.findElement(By.css('p.price_color')).getText();;

      console.log('Position: '+ ni);
      console.log('Image:', image);
      console.log('Title:', title);
      console.log('Link: ', link);
      console.log('Price:', price);
      console.log('');
    }

    console.log('End of listing.');

    await driver.sleep(2000);

    await driver.quit();

  } catch (error) {
      console.log('JError: '+error);
  } finally {
  } 
};

async function GetSileniumDriver() {
  try {
    const driver = await new Builder().forBrowser('chrome').build();

    await driver.manage().window().setRect({ width: 1024, height: 768 });
    await driver.manage().window().setRect({ x: 180, y: 200 });

    await driver.sleep(200);

    return(driver);

  } catch (error) {
    console.log('JError: '+error);
    return(null);
  } 
};


OpenClosePage3('http://books.toscrape.com');
