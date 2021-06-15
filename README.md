# Html Scraping The Internet

[![license-MIT](https://img.shields.io/github/license/Toprun123/Scrape-the-internet?style=plastic)](https://github.com/Toprun123/Scrape-the-internet/)
[![stars](https://img.shields.io/github/stars/Toprun123/Scrape-the-internet?style=plastic)](https://github.com/Toprun123/Scrape-the-internet/)
[![version](https://img.shields.io/badge/version-1.0.0-orange?style=plastic)](https://github.com/Toprun123/Scrape-the-internet/)

### Table of contents
* [General info](#general-info)
* [How to include](#how-to-include)
* [How To use](#how-to-use)

### General info
This JavaScript & PHP based Project that helps people Scrape the internet.

Visit my website [http://funapi.eu5.org/](http://funapi.eu5.org/)

## How to:-
### How to include
Include it in your html file like this..
```html
<script src="https://funapi.eu5.org/lib_test.js" charset="utf-8"></script>
```
.. or just download the lib.js file and use it as:-
```html
<script src="lib.js" charset="utf-8"></script>
```
---
### How To Use
Use it as:-
```html
<script>
// Instead of {out: 'id'} you can use your own div or p
element_by_class.apply({out: 'id'}, ['mln4 mb24 sm:d-none svg-spot spotCookieLg', 'https://stackoverflow.com', 'svg',"html"]);
// Or
first_element_by_property.apply({out: 'id'}, ['mln4 mb24 sm:d-none svg-spot spotCookieLg', 'https://stackoverflow.com', 'svg',"html" , 'class']);
// Or
contents_as_out.apply({out: 'id'}, 'https://pages.github.com/', 'div', 'slideshow', 'html');
</script>
```

<table>
	<tr>
		<td>Use</td>
		<td>Code</td>
		<td>Extra notes</td>
	</tr>
    <tr>
        <td>Scrape element from any website using it's class(this will get only the first one that matches the class)</td>
		<td><code>element_by_class.apply({out: id}, [Class_name, Addr, Tag, html_or_text]);</code></td>
		<td>Note you need to enter all of the classes! of the tag & check if it exists in the page source (Ctrl+U in windows)</td>
    </tr>
	<tr>
        <td>This one is similar to the first one but in this one You can define the property</td>
		<td><code>first_element_by_property.apply({out: id}, [Class_name, Addr, Tag, html_or_text, property]);</code></td>
		<td>No extra notes 😊👍!!</td>
    </tr>
	<tr>
        <td>Get element by id</td>
		<td><code>contents_as_out.apply({out: id}, addr, tag, id, html_or_text);</code></td>
		<td>Make sure the id exists!!</td>
    </tr>
</table>
