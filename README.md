# Html Scraping The Internet
Scrape the internet directly into your webpage in real time.
[![license-MIT](https://img.shields.io/github/license/Toprun123/Scrape-the-internet?style=plastic)](https://github.com/Toprun123/Scrape-the-internet/)
[![stars](https://img.shields.io/github/stars/Toprun123/Scrape-the-internet?style=plastic)](https://github.com/Toprun123/Scrape-the-internet/)
[![version](https://img.shields.io/badge/version-1.0.0-orange?style=plastic)](https://github.com/Toprun123/Scrape-the-internet/releases/tag/v1.0)
[![GitHub all releases](https://img.shields.io/github/downloads/Toprun123/Scrape-the-internet/total?style=plastic)](https://github.com/Toprun123/Scrape-the-internet/releases/tag/v1.0)

### Table of contents
* [General info](#general-info)
* [How to include](#how-to-include)
* [How To use](#how-to-use)

### General info
This JavaScript & PHP based Project that helps people Scrape the internet.

## How to:-
### How to include
Include it in your html file like this..
```html
<script src="https://raw.githubusercontent.com/Toprun123/Scrape-the-internet/main/src/lib.js?token=ARACNZ5B4T4UKCT7DUBZSLTB2ASCA" charset="utf-8"></script>
```
.. or just download the lib.js file and use it as:-
```html
<script src="lib.js" charset="utf-8"></script>
```
You can download the pakage from npm as
```
npm install scrapejs@latest
```
---
### How To Use
Use it as:-
```html
<p id="test1"></p>
<p id="test2"></p>
<p id="test3"></p>
<script src="lib.min.js" charset="utf-8"></script>
<script>
requestDataByClassname({class : 'maincounter-number',
                          address : 'https://www.worldometers.info/coronavirus/'},
                        scrapejs.HTML)
  .then(data => {
    // The returned value is a HTMLCollection.
    // If the mode is scrapejs.TEXT it returns a javascript array.
    console.log(data);
    document.getElementById('test1').innerHTML = data[0].outerHTML; // Prints the current covid cases
});
requestDataById({id : 'ip',
                  address : 'https://www.ip.fish/',
                  loadScripts : false, /* Determines whether to load scripts or
                                          not if the value is true then all script
                                          elements of the webpage will be included
                                          scripts with relative src attributes will
                                          also be corrected. */
                  loadStylesheets : false /* Determines whether to load the stylesheets
                                             or not if the value is true then all style
                                             elements of the webpage will be included. */
                },
                scrapejs.TEXT)
  .then(data => {
    // data is your ip address as a string scraped from https://www.ip.fish/
    // The returned value is a string as the mode is set as scrapejs.TEXT.
    // If the mode is scrapejs.HTML the returned data is a HTML element.
    // If loadScripts or loadStylesheets is enabled the the returned value
    // will be a div element.
    console.log(data);
    document.getElementById('test2').innerHTML = data;
});
getPage('https://duome.eu/toprun')
  .then(data => {
    // Returns a HTMLDocument
    // My duolingo status from duome.eu
    console.log(data);
    document.getElementById('test3').innerHTML = data.documentElement.innerHTML;
});
</script>
```
