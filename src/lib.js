/*
 * Library based upon the funapi's api for scraping the internet.
 * Created by Syed Daanish.
 * this library works in coordination with funapi's site.
 * please visit https://localhost/ for more information.
 */
let requestDataByClassname;
let getPage;
function parseHTML(sText) {try {if (typeof window.DOMParser !=null) {var parser = new DOMParser();var doc = parser.parseFromString(sText, "text/html");if(doc != null){return doc}else{sText = sText.replace(/&/gi, "j!J!");var doc = parser.parseFromString(sText, "text/xml");return doc;}}else{doc= document.implementation.createHTMLDocument('');doc.write(sText);doc.close;return doc;}}catch(err){alert("Error parsing html:\n" + err.message);}}
let scrapejs = {HTML: '<mode=Html[object ScrapeJS]/>', TEXT: '<mode=Text[object ScrapeJS]/>'}
if (navigator.onLine){
    requestDataByClassname = function (dict, mode) {
      return new Promise((resolve, reject) => {
        if (typeof(dict.address) != 'string') {
          reject('address is not provided or is not a string type.')
        }
        let url = dict.address.replace('&', '[amp$').replace('=', '[equ$')
        fetch('http://localhost/our_api.php?addr='+url+'&by=true')
          .then(response => {
          return response.text();
          }).then(data_from_fetched => {
            let data = data_from_fetched;
            /*let hello = data.search('class="'+dict.class+'"');
            let output = data.slice(hello+8+dict.class.length, data.length);
            let output_search_num = output.search(">");
            let final_out = output.slice(output_search_num+1, output.search("</"+dict.tag+">"));*/
            html = parseHTML(data)
            final_out = html.getElementsByClassName(dict.class)
            if (mode == scrapejs.HTML) {} else if (mode == scrapejs.TEXT) {
              for (let i = 0; i < final_out.length; i++) {
                final_out[i] = final_out[i].replace(/\<(\/?)(.*?)\>/g, '');
              }
            } else {
              reject('mode is not one of scrapejs.TEXT or scrapejs.HTML')
            }
            resolve(final_out);
          }
        )
      })
    }
    getPage = function (url) {
      return new Promise((resolve, reject) => {
        url = url.replace('&', '[amp$').replace('=', '[equ$')
        fetch('http://localhost/our_api.php?addr='+url+'&by=true')
          .then(response => {
          return response.text();
          }).then(data_from_fetched => {
            let data = data_from_fetched;
            resolve(parseHTML(data));
          }
        )
      });
    };
}
else{
  requestDataByClassname = function (dict, mode) {
    return new Promise((resolve, reject) => {
      reject('No internet')
    });
  };
  getPage = function (dict, mode) {
    return new Promise((resolve, reject) => {
      reject('No internet')
    });
  };
}
