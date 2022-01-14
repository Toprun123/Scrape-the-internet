/*
 * Library based upon the funapi's api for scraping the internet.
 * Created by Syed Daanish.
 * this library works in coordination with funapi's site.
 * please visit https://localhost/ for more information.
 */
let requestDataByClassname;
let getPage;
function parseHTML(sText){try{if(typeof window.DOMParser!=null){var parser=new DOMParser();var doc=parser.parseFromString(sText,"text/html");if(doc!=null){return doc}else{sText=sText.replace(/&/gi,"j!J!");var doc=parser.parseFromString(sText,"text/xml");return doc;}}else{doc=document.implementation.createHTMLDocument('');doc.write(sText);doc.close;return doc;}}catch(err){alert("Error parsing html:\n"+err.message);}}
const scrapejs = {HTML: '<mode=Html[object ScrapeJS]/>', TEXT: '<mode=Text[object ScrapeJS]/>'}
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
            let html = parseHTML(data)
            let final_out = html.getElementsByClassName(dict.class)
            let output = []
            if (mode == scrapejs.HTML) {} else if (mode == scrapejs.TEXT) {
              for (let i = 0; i < final_out.length; i++) {
                output.push(final_out[i].innerHTML.replace(/\<(\/?)(.*?)\>/g, ''));
              }
              resolve(output);
            } else {
              reject('mode is not one of scrapejs.TEXT or scrapejs.HTML')
            }
            resolve(final_out);
          }
        )
      })
    }
    requestDataById = function (dict, mode) {
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
            // console.log(html.documentElement.innerHTML);/*
            final_out = html.getElementById(dict.id)
            let text = '';
            if (dict.loadStylesheets) {
              var stylesheets = html.getElementsByTagName('style');
              for (var i = 0; i < stylesheets.length; i++) {
                text += stylesheets[i].outerHTML;
              }
            }
            if (dict.loadScripts) {
              var scripts = html.getElementsByTagName('script');
              for (var i = 0; i < scripts.length; i++) {
                // console.log(scripts[i]);
                if (scripts[i].src) {
                  if (scripts[i].src.charAt(0) == '/' || scripts[i].src.charAt(0) == '.') {
                    scripts[i].setAttribute('src', dict.address+'/'+scripts[i].src)
                    // console.log(dict.address+'/'+scripts[i].getAttribute('src'));
                  }
                }
                //*/
                text += scripts[i].outerHTML
              }
            }
            if (typeof(dict.src) == 'string') {
              if (final_out.hasAttribute(dict.src)) {
                if (final_out.getAttribute(dict.src).charAt(0) == '/' || final_out.getAttribute(dict.src).charAt(0) == '.') {
                  final_out.setAttribute(dict.src, dict.address+'/'+final_out.getAttribute(dict.src))
                }
              }
            }
            if (mode == scrapejs.HTML) {
              if (dict.loadScripts || dict.loadStylesheets) {
                resolve(parseHTML('<div id="scrapedContent">'+text+final_out.outerHTML+'</div>').getElementById('scrapedContent'));
              }
              resolve(final_out);
            } else if (mode == scrapejs.TEXT) {
              resolve(final_out.innerHTML.replace(/\<(\/?)(.*?)\>/g, ''));
            } else {
              reject('mode is not one of scrapejs.TEXT or scrapejs.HTML')
            }
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
          })
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
