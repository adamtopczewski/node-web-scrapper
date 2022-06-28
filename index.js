const PORT = 5000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");

const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const url = "https://r.pl/";
axios(url).then((res) => {
    const html_data = res.data;
    const $ = cheerio.load(html_data);
    // console.log($('.lista-kierunkow__row'));
    const kierunkiDiv = $('.lista-kierunkow__row');
})