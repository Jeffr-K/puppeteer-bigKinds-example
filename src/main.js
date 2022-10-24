const express = require("express");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const mongoose  = require('mongoose');
const { LatestNewsCrawler } = require("./crawler/latestNews/crawler");
const app = express();

mongoose.connect("mongodb://root:root@localhost:27017", {
    dbName: "test",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { console.log("mongodb connected"); })
    .catch(err => console.log(err));

(async () => {
    LatestNewsCrawler();
})()


app.listen(4000, () => {
    console.log("crawler listening on port 3000");
})
