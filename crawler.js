const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the target website
    const targetUrl = 'https://tailwindcss.com/'; // Replace with the URL you want to audit
    await page.goto(targetUrl);

    // SEO Audit Check 1: Verify Page Title
    const pageTitle = await page.title();
    console.log('Page Title:', pageTitle);

    // SEO Audit Check 2: Verify Meta Description
    const metaDescription = await page.$eval('meta[name="description"]', (element) => element.content);
    console.log('Meta Description:', metaDescription);

    // SEO Audit Check 3: Check for Broken Links
    const allLinks = await page.$$eval('a', (links) => links.map((link) => link.href));
    const brokenLinks = allLinks.filter((link) => !link || link.startsWith('javascript:') || link.startsWith('#'));
    console.log('Broken Links:', brokenLinks);

    // SEO Audit Check 4: Extract Images
    const images = await page.$$eval('img', (imgs) => imgs.map((img) => img.src));
    console.log('Images:', images);

    // SEO Audit Check 5: Extract HTML Structure
    const htmlStructure = await page.evaluate(() => {
      return document.documentElement.outerHTML;
    });
    // console.log('HTML Structure:', htmlStructure);

    // SEO Audit Check 6: Extract Forms
    const forms = await page.$$eval('form', (forms) => forms.map((form) => form.outerHTML));
    console.log('Forms:', forms);

    // SEO Audit Check 7: Extract Page Metrics
    const pageMetrics = await page.metrics();
    console.log('Page Metrics:', pageMetrics);

    // SEO Audit Check 8: Extract Social Media Data (if available)
    // This will require additional scraping and parsing based on the website's structure.

    // SEO Audit Check 9: Extract Email Addresses and Contact Information (if available)
    // This will require additional scraping and pattern matching for contact details.

    // SEO Audit Check 10: Extract JavaScript-Rendered Content (if applicable)
    // If using a headless browser like Puppeteer, interact with JavaScript-rendered content.

    await browser.close();
  } catch (err) {
    console.error('Error:', err);
  }
})();
