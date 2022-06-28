const PORT = 5000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");

require('dotenv').config()
console.log(process.env)
const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const url1 = process.env.URL1;

function scrapeWebsiteDestinations(url) {
    axios(url).then((res) => {
        const html_data = res.data;
        const $ = cheerio.load(html_data);
        const destinationElements = $('.col-lg-6.col-md-6.col-sm-6.col-xs-12.kraj > div > a ~ a');
        const destinationHrefs = $('.col-lg-6.col-md-6.col-sm-6.col-xs-12.kraj > div > a.link');

        for(let i = 0; i< destinationElements.length; i++) {
            // console.log(destinationElements.eq(i).text())
            // console.log(destinationHrefs.eq(i).attr('href'))
        }
    })
}

scrapeWebsiteDestinations(url1);