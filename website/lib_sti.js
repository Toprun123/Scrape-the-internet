/*
 * Library based upon the funapi's api for scraping the internet.
 * Created by Syed Daanish.
 * this library works in coordination with funapi's site.
 * please visit https://funapi.eu5.org/ for more information.
 */
let element_by_class;
let first_element_by_property;
let contents_as_out;
if (navigator.onLine){
    element_by_class = function (class_name, addr, tag) {
    	(async () => {
        	let responseencryptedasunknown = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&by=true');
        	let text = await responseencryptedasunknown.text();
    		let hello = text.search('class="'+class_name+'"');
    		let output = text.slice(hello+8+class_name.length, text.length);
    		let output_search_num = output.search(">");
    		let final_out = output.slice(output_search_num+1, output.search("</"+tag+">"));
    		document.getElementById(this.out).innerHTML = "<"+tag+">"+final_out+"</"+tag+">";
        })()
    };
    
    first_element_by_property = function (property_input, addr, tag, property) {
    	(async () => {
        	let responseencryptedasunknown = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&by=true');
        	let text = await responseencryptedasunknown.text();
    		let hello = text.search(property+'="'+property_input+'"');
    		let output = text.slice(hello+8+property_input.length, text.length);
    		let output_search_num = output.search(">");
    		let final_out = output.slice(output_search_num+1, output.search("</"+tag+">"));
    		document.getElementById(this.out).innerHTML = "<"+tag+">"+final_out+"</"+tag+">";
        })()
    };
    
    contents_as_out = function (addr, tag, id, tt) {
    	(async () => {
    	  	let responseencryptedasunknown = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&id='+id+'&tag='+tag+'&tt='+tt);
          	let tzxtasabadoy = await responseencryptedasunknown.text();
          	document.getElementById(this.out).innerHTML = tzxtasabadoy;
      	})()
    };
    
    // BUG: Did not work!! Just returns Undefined!!
    /*
    function Sti(addr, tag, id, tt) {
      	let the;
      	(async () => {
          	let response = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&id='+id+'&tag='+tag+'&tt='+tt);
          	let text = await response.text();
    	  	// BUG: Undefined
        	the = text;
      	})()
      	return the;
    };
    */
}
else{
    element_by_class = function (class_name, addr, tag) {
    	document.getElementById(this.out).innerHTML = "<div style='color:red;'>Internet Not online!!</div>";
    };
    
    first_element_by_property = function (property_input, addr, tag, property) {
    	document.getElementById(this.out).innerHTML = "<div style='color:red;'>Internet Not online!!</div>";
    };
    
    contents_as_out = function (addr, tag, id, tt) {
    	document.getElementById(this.out).innerHTML = "<div style='color:red;'>Internet Not online!!</div>";
    };
    
    // BUG: Did not work!! Just returns Undefined!!
    /*
    function Sti(addr, tag, id, tt) {
      	let the;
      	(async () => {
          	let response = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&id='+id+'&tag='+tag+'&tt='+tt);
          	let text = await response.text();
    	  	// BUG: Undefined
        	the = text;
      	})()
      	return the;
    };
    */
}