function $import(script_name, sync=true, callback=()=>{}) {
    console.log('some');
    var url = script_name.replace(/\.\//g, './scripts/');
    if (sync) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send(null);
        if (xhttp.status === 200) {
            eval(xhttp.responseText);
            callback(false);
        }
        else {
            callback(true);
        }
    } else {
        var head = document.head;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);    
    }
}
