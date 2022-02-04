/*
 * Library based upon my api for scraping the internet.
 * Created by Syed Daanish.
 * this library works in coordination with my site.
 * please visit https://localhost/ for more information.
 */
'use strict';
var requestDataByClassname;
var requestDataById;
var getPage;
var getData;
var requestDataByClassnameSync;
var requestDataByIdSync;
var getPageSync;
var getDataSync;
var scrapejs = {
    HTML: '<mode=Html[object ScrapeJS]/>',
    TEXT: '<mode=Text[object ScrapeJS]/>',
};
if (navigator.onLine) {
    requestDataByClassname = function (dict, mode, suppressErrors=false) {
        return new Promise((resolve, reject) => {
            if (typeof dict.address != 'string') {
                reject('address is not provided or is not a string type.');
            }
            if (typeof dict.class != 'string') {
                reject('class is not provided or is not a string type.');
            }
            let url = dict.address.replace('&', '[amp$').replace('=', '[equ$');
            fetch('http://localhost/api.php?addr=' + url + '&by=true')
                .then((response) => {
                    return response.text();
                })
                .then((data_from_fetched) => {
                    let data = data_from_fetched;
                    let err = ` />
<br />
<b>Warning</b>:`;
                    if (data.includes(err)) {
                        throw 'invalid request';
                    }
                    try {
                        if (typeof window.DOMParser != null) {
                            var parser = new DOMParser();
                            var doc = parser.parseFromString(data, 'text/html');
                            if (doc != null) {
                                var html = doc;
                            } else {
                                data = data.replace(/&/gi, 'and');
                                var doc = parser.parseFromString(data, 'text/xml');
                                var html = doc;
                            }
                        } else {
                            var doc = document.implementation.createHTMLDocument('');
                            doc.write(data);
                            doc.close;
                            var html = doc;
                        }
                    } catch (err) {
                        throw 'Error parsing html:\n' + err.message;
                    }
                    let final_out = html.getElementsByClassName(dict.class);
                    if (final_out == undefined && !suppressErrors) {
                        reject('No elements found by the class ' + dict.class)
                    }
                    else if (final_out == undefined && suppressErrors) {
                        resolve(undefined)
                    }
                    let output = [];
                    if (mode == scrapejs.HTML) {
                    } else if (mode == scrapejs.TEXT) {
                        for (let i = 0; i < final_out.length; i++) {
                            output.push(final_out[i].innerText);
                        }
                        resolve(output);
                    } else {
                        reject(
                            'mode is not one of scrapejs.TEXT or scrapejs.HTML'
                        );
                    }
                    resolve(final_out);
                });
        });
    };
    requestDataById = function (dict, mode) {
        return new Promise((resolve, reject) => {
            if (typeof dict.address != 'string') {
                reject('address is not provided or is not a string type.');
            }
            if (typeof dict.id != 'string') {
                reject('id is not provided or is not a string type.');
            }
            if (typeof dict.loadScripts != 'boolean' && dict.loadScripts != undefined) {
                reject('loadScripts should be boolean.');
            }
            if (typeof dict.loadStylesheets != 'boolean' && dict.loadStylesheets != undefined) {
                reject('loadStylesheets should be boolean.');
            }
            let url = dict.address.replace('&', '[amp$').replace('=', '[equ$');
            fetch('http://localhost/api.php?addr=' + url + '&by=true')
                .then((response) => {
                    return response.text();
                })
                .then((data_from_fetched) => {
                    let data = data_from_fetched;
                    let err = ` />
<br />
<b>Warning</b>:`;
                    if (data.includes(err)) {
                        throw 'invalid request';
                    }
                    let parseHTML = function(sText) {
                        try {
                            if (typeof window.DOMParser != null) {
                                var parser = new DOMParser();
                                var doc = parser.parseFromString(sText, 'text/html');
                                if (doc != null) {
                                    return doc;
                                } else {
                                    sText = sText.replace(/&/gi, 'and');
                                    var doc = parser.parseFromString(sText, 'text/xml');
                                    return doc;
                                }
                            } else {
                                var doc = document.implementation.createHTMLDocument('');
                                doc.write(sText);
                                doc.close;
                                return doc;
                            }
                        } catch (err) {
                            throw 'Error parsing html:\n' + err.message;
                        }
                    }
                    let html = parseHTML(data);
                    let final_out = html.getElementById(dict.id);
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
                            if (scripts[i].src) {
                                if (
                                    scripts[i].src.charAt(0) == '/' ||
                                    scripts[i].src.charAt(0) == '.'
                                ) {
                                    scripts[i].setAttribute(
                                        'src',
                                        dict.address + '/' + scripts[i].src
                                    );
                                }
                            }
                            text += scripts[i].outerHTML;
                        }
                    }
                    if (typeof dict.src == 'string') {
                        if (final_out.hasAttribute(dict.src)) {
                            if (
                                final_out.getAttribute(dict.src).charAt(0) ==
                                    '/' ||
                                final_out.getAttribute(dict.src).charAt(0) ==
                                    '.'
                            ) {
                                final_out.setAttribute(
                                    dict.src,
                                    dict.address +
                                        '/' +
                                        final_out.getAttribute(dict.src)
                                );
                            }
                        }
                    }
                    if (mode == scrapejs.HTML) {
                        if (dict.loadScripts || dict.loadStylesheets) {
                            resolve(
                                parseHTML(
                                    '<div id="scrapedContent">' +
                                        text +
                                        final_out.outerHTML +
                                        '</div>'
                                ).getElementById('scrapedContent')
                            );
                        }
                        resolve(final_out);
                    } else if (mode == scrapejs.TEXT) {
                        resolve(
                            final_out.innerHTML.replace(/\<(\/?)(.*?)\>/g, '')
                        );
                    } else {
                        reject(
                            'mode is not one of scrapejs.TEXT or scrapejs.HTML'
                        );
                    }
                });
        });
    };
    getPage = function (url) {
        return new Promise((resolve, reject) => {
            url = url.replace('&', '[amp$').replace('=', '[equ$');
            fetch('http://localhost/api.php?addr=' + url + '&by=true')
                .then((response) => {
                    return response.text();
                })
                .then((data_from_fetched) => {
                    let data = data_from_fetched;
                    let err = ` />
<br />
<b>Warning</b>:`;
                    if (data.includes(err)) {
                        throw 'invalid request';
                    }
                    try {
                        if (typeof window.DOMParser != null) {
                            var parser = new DOMParser();
                            var doc = parser.parseFromString(data, 'text/html');
                            if (doc != null) {
                                var html = doc;
                            } else {
                                data = data.replace(/&/gi, 'and');
                                var doc = parser.parseFromString(data, 'text/xml');
                                var html = doc;
                            }
                        } else {
                            var doc = document.implementation.createHTMLDocument('');
                            doc.write(data);
                            doc.close;
                            var html = doc;
                        }
                    } catch (err) {
                        throw 'Error parsing html:\n' + err.message;
                    }
                    resolve(html);
                });
        });
    };
    getData = function (url) {
        return new Promise((resolve, reject) => {
            url = url.replace('&', '[amp$').replace('=', '[equ$');
            fetch('http://localhost/api.php?addr=' + url + '&by=true')
                .then((response) => {
                    return response.text();
                })
                .then((data_from_fetched) => {
                    let data = data_from_fetched;
                    let err = ` />
<br />
<b>Warning</b>:`;
                    if (data.includes(err)) {
                        throw 'invalid request';
                    }
                    resolve(data);
                });
        });
    };
    requestDataByClassnameSync = function (dict, mode, suppressErrors=false) {
        if (typeof dict.address != 'string') {
            reject('address is not provided or is not a string type.');
        }
        if (typeof dict.class != 'string') {
            reject('class is not provided or is not a string type.');
        }
        let url = dict.address.replace('&', '[amp$').replace('=', '[equ$');
        let request = new XMLHttpRequest();
        request.open("GET", 'http://localhost/api.php?addr=' + url + '&by=true', false);
        request.send(null);
        if (request.status === 200) {
            let err = ` />
<br />
<b>Warning</b>:`;
            let data = request.responseText;
            if (data.includes(err)) {
                throw 'invalid request';
            }
            try {
                if (typeof window.DOMParser != null) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(data, 'text/html');
                    if (doc != null) {
                        var html = doc;
                    } else {
                        data = data.replace(/\&/gi, 'and');
                        var doc = parser.parseFromString(data, 'text/xml');
                        var html = doc;
                    }
                } else {
                    var doc = document.implementation.createHTMLDocument('');
                    doc.write(data);
                    doc.close;
                    var html = doc;
                }
            } catch (err) {
                throw 'Error parsing html:\n' + err.message;
            }
            let final_out = html.getElementsByClassName(dict.class);
            if (final_out == undefined && !suppressErrors) {
                throw 'No elements found by the class ' + dict.class;
            }
            else if (final_out == undefined && suppressErrors) {
                return undefined;
            }
            let output = [];
            if (mode == scrapejs.HTML) {
            } else if (mode == scrapejs.TEXT) {
                for (let i = 0; i < final_out.length; i++) {
                    output.push(final_out[i].innerText);
                }
                return output;
            } else {
                throw 'mode is not one of scrapejs.TEXT or scrapejs.HTML';
            }
            return final_out;
        }
        else {
            throw 'Unsuccessful request';
            return false;
        }
    }
    requestDataByIdSync = function (dict, mode) {
        if (typeof dict.address != 'string') {
            reject('address is not provided or is not a string type.');
        }
        if (typeof dict.id != 'string') {
            reject('id is not provided or is not a string type.');
        }
        if (typeof dict.loadScripts != 'boolean' && dict.loadScripts != undefined) {
            reject('loadScripts should be boolean.');
        }
        if (typeof dict.loadStylesheets != 'boolean' && dict.loadStylesheets != undefined) {
            reject('loadStylesheets should be boolean.');
        }
        let url = dict.address.replace('&', '[amp$').replace('=', '[equ$');
        let request = new XMLHttpRequest();
        request.open("GET", 'http://localhost/api.php?addr=' + url + '&by=true', false);
        request.send(null);
        if (request.status === 200) {
            let data = request.responseText;
            let err = ` />
<br />
<b>Warning</b>:`;
            if (data.includes(err)) {
                throw 'invalid request';
            }
            let parseHTML = function(sText) {
                try {
                    if (typeof window.DOMParser != null) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(sText, 'text/html');
                        if (doc != null) {
                            return doc;
                        } else {
                            sText = sText.replace(/&/gi, 'and');
                            var doc = parser.parseFromString(sText, 'text/xml');
                            return doc;
                        }
                    } else {
                        var doc = document.implementation.createHTMLDocument('');
                        doc.write(sText);
                        doc.close;
                        return doc;
                    }
                } catch (err) {
                    throw 'unknown error'
                }
            }
            let html = parseHTML(data);
            let final_out = html.getElementById(dict.id);
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
                    if (scripts[i].src) {
                        if (
                            scripts[i].src.charAt(0) == '/' ||
                            scripts[i].src.charAt(0) == '.'
                        ) {
                            scripts[i].setAttribute(
                                'src',
                                dict.address + '/' + scripts[i].src
                            );
                        }
                    }
                    text += scripts[i].outerHTML;
                }
            }
            if (typeof dict.src == 'string') {
                if (final_out.hasAttribute(dict.src)) {
                    if (
                        final_out.getAttribute(dict.src).charAt(0) ==
                            '/' ||
                        final_out.getAttribute(dict.src).charAt(0) ==
                            '.'
                    ) {
                        final_out.setAttribute(
                            dict.src,
                            dict.address +
                                '/' +
                                final_out.getAttribute(dict.src)
                        );
                    }
                }
            }
            if (mode == scrapejs.HTML) {
                if (dict.loadScripts || dict.loadStylesheets) {
                    return parseHTML(
                            '<div id="scrapedContent">' +
                                text +
                                final_out.outerHTML +
                                '</div>'
                        ).getElementById('scrapedContent')
                    ;
                }
                final_out;
            } else if (mode == scrapejs.TEXT) {
                return final_out.innerHTML.replace(/\<(\/?)(.*?)\>/g, '');
            } else {
                throw 'mode is not one of scrapejs.TEXT or scrapejs.HTML';
            }
        };
    };
    getPageSync = function (url) {
        url = url.replace('&', '[amp$').replace('=', '[equ$');
        let request = new XMLHttpRequest();
        request.open("GET", 'http://localhost/api.php?addr=' + url + '&by=true', false);
        request.send(null);
        if (request.status === 200) {
            let data = request.responseText;
            let err = ` />
<br />
<b>Warning</b>:`;
            if (data.includes(err)) {
                throw 'invalid request';
            }
            try {
                if (typeof window.DOMParser != null) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(data, 'text/html');
                    if (doc != null) {
                        var html = doc;
                    } else {
                        data = data.replace(/&/gi, 'and');
                        var doc = parser.parseFromString(data, 'text/xml');
                        var html = doc;
                    }
                } else {
                    var doc = document.implementation.createHTMLDocument('');
                    doc.write(data);
                    doc.close;
                    var html = doc;
                }
            } catch (err) {
                throw 'Error parsing html:\n' + err.message;
            }
            return html;
        } else {
            throw 'invalid request'
        }
    };
    getDataSync = function (url) {
        url = url.replace('&', '[amp$').replace('=', '[equ$');
        let request = new XMLHttpRequest();
        request.open("GET", 'http://localhost/api.php?addr=' + url + '&by=true', false);
        request.send(null);
        if (request.status === 200) {
            let data = request.responseText;
            let err = ` />
<br />
<b>Warning</b>:`;
            if (data.includes(err)) {
                throw 'invalid request';
            }
            return data;
        } else {
            throw 'invalid request'
        }
    };
} else {
    requestDataByClassname = function () {
        return new Promise((resolve, reject) => {
            reject('No internet');
        });
    };
    requestDataById = function () {
        return new Promise((resolve, reject) => {
            reject('No internet');
        });
    };
    getPage = function () {
        return new Promise((resolve, reject) => {
            reject('No internet');
        });
    };
    getData = function () {
        return new Promise((resolve, reject) => {
            reject('No internet');
        });
    };
    requestDataByClassnameSync = function () {
        throw 'no internet'
    };
    requestDataByIdSync = function () {
        throw 'no internet'
    };
    getPageSync = function () {
        throw 'no internet'
    };
    getDataSync = function () {
        throw 'no internet'
    };
}
