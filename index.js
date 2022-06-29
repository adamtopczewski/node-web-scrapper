const PORT = 5000;
const express = require("express");
const { response } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const excel = require('excel4node');
require('dotenv').config()

const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

let destinations = [];
// Excel Workbook
const workbook = new excel.Workbook();
//Excel Sheets
const worksheet = workbook.addWorksheet('Destinations');
const worksheetStyle = workbook.createStyle({
    font: {
        color: '#000000',
        size: 12
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -'
});
  

const scrapeWebsiteDestinations = () => {
    axios.all([
        axios.get(process.env.EuropeUrl), 
        axios.get(process.env.AfricaUrl), 
        axios.get(process.env.AsiaUrl), 
        axios.get(process.env.MiddleEastUrl), 
        axios.get(process.env.NorthAmericaUrl), 
        axios.get(process.env.CentralAmericaUrl), 
        axios.get(process.env.SouthAmericaaUrl), 
        axios.get(process.env.AustraliaUrl), 
      ])
      .then(axios.spread((...dataArr) => {
        dataArr.forEach(element => {
        const html_data = element.data;
        const $ = cheerio.load(html_data);
        const destinationElements = $('.col-lg-6.col-md-6.col-sm-6.col-xs-12.kraj > div > a ~ a');
        const destinationHrefs = $('.col-lg-6.col-md-6.col-sm-6.col-xs-12.kraj > div > a.link');
        for(let i = 0; i< destinationElements.length; i++) {
            destinations.push({
                href: destinationElements.eq(i).text(),
                text: destinationHrefs.eq(i).attr('href')
            });
        }

        });
        // console.log(destinations)
      }))
      .then(()=> {
        addDestinationsToXlsx(destinations);
        workbook.write('Excel-test.xlsx');
        console.log('written to excel')
      });

}

const addDestinationsToXlsx = (dest) => {
    for(let i = 1; i< dest.length + 1; i++) {
        worksheet.cell(i,1).string(dest[i - 1].href).style(worksheetStyle);
        worksheet.cell(i,2).string(dest[i - 1].text).style(worksheetStyle);
    }
}

const init = () => {
    scrapeWebsiteDestinations();
}

init();