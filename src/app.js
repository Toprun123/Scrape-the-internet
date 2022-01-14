'use strict';
// http://localhost/our_api.php?addr=https://stackoverflow.com&by=true
// let he = new Scraper('https://stackoverflow.com/')
/*
requestDataByClassname({class : 'maincounter-number',
                          address : 'https://www.worldometers.info/coronavirus/'},
                        scrapejs.HTML)
  .then(data => {
    console.log(data);
    document.getElementById('id').innerHTML = data;
});
// */

/*
requestDataById({id : 'section-1',
                  address : 'https://my.alhudaonline.org/course/view.php?id=155',
                  src: 'src',
                  loadScripts : true,
                  loadStylesheets : true},
                scrapejs.HTML)
  .then(data => {
    console.log(data);
    document.getElementById('id').innerHTML = data.innerHTML;
});
// */


//*
getPage('https://duome.eu/aliza.d.grt')
  .then(data => {
    document.getElementById('id').innerHTML = data.documentElement.innerHTML;
});
//*/
// console.log(he.getData());
//contents_as_out.apply({out: 'id'}, ['https://pages.github.com/', 'div', 'slideshow', 'html']);

// BUG: Returns "Undefined"
//let then = Sti("https://stackoverflow.com", "div", "left-sidebar", "html");
//document.getElementById('h3').innerHTML = then;
