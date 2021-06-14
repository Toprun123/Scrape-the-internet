element_by_class.apply({out: 'id'}, ['mln4 mb24 sm:d-none svg-spot spotCookieLg', 'https://stackoverflow.com', 'svg',"html"]);

// BUG: Returns "Undefined"
let then = Sti("https://stackoverflow.com", "div", "left-sidebar", "html");
document.getElementById('h3').innerHTML = then;
