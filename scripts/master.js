window.onload = run();
function run() {
    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }    
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, function (e) {
        var message = e.data;
        var today = new Date();
        var date = today.getFullYear()+ '-' +(today.getMonth()+1)+ '-' +today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        dateTime = dateTime.length === 18 ? dateTime : dateTime + ' ';
        var code = `<div class="console-item"><span class="console-data">${message}</span><span class="console-timestamp"> ${dateTime}</span></div>`;
        document.getElementById('console-1').append(createElementFromHTML(code))
    });
    document.getElementsByClassName('run-test')[0].addEventListener('click', ()=>{
        var code = "requestDataByClassname({class:'"+$('#class-ipt').val()+"',address:'"+$('#address-ipt').val()+"'},scrapejs."+$('#mode-ipt').val()+").then(data=>{parent.postMessage(String(data),'*');document.getElementById('test').innerHTML=data[0].outerHTML;});";
        var frame = window.frames[0];
        frame.document.open();
        frame.document.write(`<!DOCTYPE html><script type="text/javascript" src="http://localhost/scripts/scrape.min.js"></script><p id="test"></p><script>${code}</script>`);
        frame.document.close()
    });
}
