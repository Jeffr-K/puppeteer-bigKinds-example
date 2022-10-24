const puppeteer = require("puppeteer");
const LatestNews =require( "../../schema/latestNews");

const LatestNewsCrawler = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://www.bigkinds.or.kr/');

    await page.waitForSelector("#header > div.hd-gnb > div.inner > div.gnb-wp > div > div.nwm_top > div > ul > li:nth-child(3) > a");
    await new Promise(r => setTimeout(r, 2));

    await page.click("#header > div.hd-gnb > div.inner > div.gnb-wp > div > div.nwm_top > div > ul > li:nth-child(3) > a");
    await page.click("#header > div.hd-gnb > div.inner > div.gnb-wp > div > div.nwm_btm.m3 > div > div.m3 > ul > li:nth-child(1) > a");

    await page.waitForSelector("#cate-list > li:nth-child(1) > button");
    await page.waitForSelector("#cate-list > li:nth-child(2) > button");
    await page.waitForSelector("#cate-list > li:nth-child(3) > button");
    await page.waitForSelector("#cate-list > li:nth-child(4) > button");
    await page.waitForSelector("#cate-list > li:nth-child(5) > button");
    await page.waitForSelector("#cate-list > li:nth-child(6) > button");
    await page.waitForSelector("#cate-list > li:nth-child(7) > button");
    await page.waitForSelector("#cate-list > li:nth-child(8) > button");
    await page.waitForSelector("#cate-list > li:nth-child(9) > button");

    await page.click("#cate-list > li:nth-child(2) > button");

    let data = [];
    const articles = (await page.$$("#news-results > .news-item"));

    for (let i = 0; i < articles.length; i++) {
        const row = articles[i];
        const titleSelector = `#news-results > div:nth-child(${i+1}) > div > div > a > strong`;
        const contentSelector = `#news-results > div:nth-child(${i+1}) > div > div > a > p`;
        const originLinkSelector = `#news-results > div:nth-child(${i+1}) > div > div > div > div > a`;
        const authorSelector = `#news-results > div:nth-child(${i+1}) > div > div > div > p`;

        const title = await row.$eval(titleSelector, e => e.textContent);
        const content = await row.$eval(contentSelector, e => e.textContent);
        const origin = await row.$eval(originLinkSelector, e => e.getAttribute("href"));
        const author = await row.$eval(authorSelector, e => e.getAttribute("p"));

        let result = { title: title, content: content, origin: origin, author: author, writtenAt: new Date().toUTCString() };
        console.log(result);
        data.push(result);

        await data.forEach((data) => {
            const newLatestNewsDocument = new LatestNews({
                author: author,
                title: title,
                content: content,
                origin: origin,
                date: new Date().toUTCString(),
            });

            newLatestNewsDocument.save();
        })

        // await browser.close();//
    }
}

module.exports = { LatestNewsCrawler };






// await page.click("#cate-list > li:nth-child(2) > button");
    // await page.waitForSelector("#cate-list")
    // await page.click("#cate-list > li:nth-child(3) > button");
    // await page.waitForSelector("#cate-list")
    // await page.click("#cate-list > li:nth-child(4) > button");
    // await page.waitForSelector("#cate-list")
    // await page.click("#cate-list > li:nth-child(5) > button");
    // await page.waitForSelector("#cate-list")
    // await page.click("#cate-list > li:nth-child(6) > button");
    // await page.waitForSelector("#cate-list")
    // await page.click("#cate-list > li:nth-child(7) > button");
    // await page.waitForSelector("#cate-list")
    // await page.click("#cate-list > li:nth-child(8) > button");
    // await page.waitForSelector("#cate-list")
    // await page.click("#cate-list > li:nth-child(9) > button");
    // await page.waitForSelector("#cate-list")
