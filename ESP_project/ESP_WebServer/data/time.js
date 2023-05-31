
function timer() {
    var current_time = new Date();

    var hour = current_time.getHours();
    if (hour < 10) hour = "0" + hour;
    var minute = current_time.getMinutes();
    if (minute < 10) minute = "0" + minute;
    var secound = current_time.getSeconds();
    if (secound < 10) secound = "0" + secound;

    document.querySelector("#time > div:nth-child(1)").innerHTML = hour + ":" + minute + ":" + secound;

}

setTimeout(() => {  timer(); }, 20);

setInterval(() => { timer(); }, 1000);

var today = new Date();

waitForElement('#time > div:nth-child(2)', function(){

    let today = new Date().toISOString().slice(0, 10);
    var finalDate = today.split("-").reverse().join("-").replaceAll('-', '.');

    document.querySelector("#time > div:nth-child(2)").innerHTML = finalDate;
})

//setTimeout(() => {  DATE(); }, 20);

function waitForElement(selector, callback){
    var interval = setInterval(function(){
        if(document.querySelector(selector)){
            callback()
            clearInterval(interval)
        }
    },300)
}