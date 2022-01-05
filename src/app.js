// http://localhost/our_api.php?addr=https://stackoverflow.com&by=true
requestDataByClassname({class : 'contrast more',
                          address : 'https://ip.fish/'},
                        scrapejs.HTML)
  .then(data => {
    console.log(data[0].innerHTML);
});

getPage('http://stackoverflow.com/')
  .then(data => {
    console.log(data);
});
//contents_as_out.apply({out: 'id'}, ['https://pages.github.com/', 'div', 'slideshow', 'html']);

// BUG: Returns "Undefined"
//let then = Sti("https://stackoverflow.com", "div", "left-sidebar", "html");
//document.getElementById('h3').innerHTML = then;
