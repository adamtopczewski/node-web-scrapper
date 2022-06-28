const PORT = 5000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");

const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const url = "https://r.pl/europa";
// axios(url).then((res) => {
//     const html_data = res.data;
//     const $ = cheerio.load(html_data);
//     // console.log($('.lista-kierunkow__row'));
//     const kierunkiDiv = $('.lista-kierunkow__row');
// })

function getDataFromPage(url) {
    axios(url).then((res) => {
        const html_data = res.data;
        const $ = cheerio.load(html_data);
        // console.log($('.lista-kierunkow__row'));
        const kierunkiDiv = $('.col-lg-6.col-md-6.col-sm-6.col-xs-12.kraj > div > a ~ a');
        const formatedName = $('.col-lg-6.col-md-6.col-sm-6.col-xs-12.kraj > div > a.link');

        for(let i = 0; i< kierunkiDiv.length; i++) {
            console.log(kierunkiDiv.eq(i).text())
            console.log(formatedName.eq(i).attr('href'))
        }
        // kierunkiDiv.each( function(i, el) {
        //     console.log($(this).text())
        // })
        // formatedName.each( function(i, el) {
        //     console.log($(this).attr('href'))
        // })
    })
}

getDataFromPage(url);