'use strict';
// http://localhost/our_api.php?addr=https://stackoverflow.com&by=true
// let he = new Scraper('https://stackoverflow.com/')
//*
requestDataByClassname({class : 'maincounter-number',
                          address : 'https://www.worldometers.info/coronavirus/'},
                        scrapejs.HTML)
  .then(data => {
    // The returned value is a HTMLCollection.
    // If the mode is scrapejs.TEXT it returns a javascript array.
    console.log(data);
    document.getElementById('id').innerHTML = data[0].outerHTML;
});
// */

/*
requestDataById({id : 'ip',
                  address : 'https://www.ip.fish/',
                  src: 'src',
                  loadScripts : false,
                  loadStylesheets : false},
                scrapejs.TEXT)
  .then(data => {
    // data is your ip address as a string scraped from https://www.ip.fish/
    // The returned value is a string as the mode is set as scrapejs.TEXT.
    // If the mode is scrapejs.HTML the returned data is a HTML element.
    console.log(data);
    document.getElementById('id').innerHTML = data.innerHTML;
});
// */
/*
getPage('https://duome.eu/toprun')
  .then(data => {
    // Returns a document
    console.log(data);
    document.getElementById('id').innerHTML = data;
});
//*/
// console.log(he.getData());
//contents_as_out.apply({out: 'id'}, ['https://pages.github.com/', 'div', 'slideshow', 'html']);

// BUG: Returns "Undefined"
//let then = Sti("https://stackoverflow.com", "div", "left-sidebar", "html");
//document.getElementById('h3').innerHTML = then;
