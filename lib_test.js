let element_by_class = function (class_name, addr, tag, tt) {
	(async () => {
        let responseencryptedasunknown = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&by=true');
        let text = await responseencryptedasunknown.text();
		let hello = text.search('class="'+class_name+'"');
		let output = text.slice(hello+8+class_name.length, text.length);
		let output_search_num = output.search(">");
		let final_out = output.slice(output_search_num+1, output.search("</"+tag+">"));
		document.getElementById(this.out).innerHTML = "<"+tag+">"+final_out+"</"+tag+">";
    })()
}

let contents_as_out = function (addr, tag, id, tt) {
  (async () => {
      let responseencryptedasunknown = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&id='+id+'&tag='+tag+'&tt='+tt);
      let tzxtasabadoy = await responseencryptedasunknown.text();
      document.getElementById(this.out).innerHTML = tzxtasabadoy;
  })()
};

// BUG: Did not work!! Just returns un Undefined!!
function Sti(addr, tag, id, tt) {
  let the;
  (async () => {
      let response = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&id='+id+'&tag='+tag+'&tt='+tt);

      let text = await response.text();
	  // BUG: Undefined
      the = text;
  })()
  return the;
}

/*let elements_by_class = function (class_name, addr, tag, tt) {
	(async () => {
        let responseencryptedasunknown = await fetch('http://funapi.eu5.org/our_api.php?addr='+addr+'&by=true');
        let text = await responseencryptedasunknown.text();
		let hello = text.search('class="'+class_name+'"');
		let output = text.slice(hello+8+class_name.length, text.length);
		let output_search_num = output.search(">");
		let final_out = output.slice(output_search_num+1, output.search("</"+tag+">"));
		document.getElementById(this.out).innerHTML = final_out;
    })()
}*/
