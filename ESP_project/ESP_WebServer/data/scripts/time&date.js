var timeDOM = document.querySelector(
  'body > div.app-wrapper > header > div.header__time > div.time__hour'
);
var dateDOM = document.querySelector(
  'body > div.app-wrapper > header > div.header__time > div.time__date'
);
var timeAPI;

const sendAPI = async () => {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Warsaw');

    if (response.status === 404) {
      console.log('404 api time error');
      localDate();
    }

    timeAPI = await response.json();
  } catch (e) {
    alert('Post error! Failed attempt to get time.');
    // localDate();
  }
};

const localDate = () => {
  function timer() {
    var current_time = new Date();

    var hour = current_time.getHours();
    if (hour < 10) hour = '0' + hour;
    var minute = current_time.getMinutes();
    if (minute < 10) minute = '0' + minute;
    var secound = secoundLocal.getSeconds();
    if (secound < 10) secound = '0' + secound;

    timeDOM.innerHTML = hour + ':' + minute + ':' + secound;
  }

  setTimeout(() => {
    timer();
  }, 20);

  var today = new Date();

  waitForElement('#time > div:nth-child(2)', function () {
    let today = new Date().toISOString().slice(0, 10);
    var finalDate = today.split('-').reverse().join('-').replaceAll('-', '.');

    dateDOM.innerHTML = finalDate;
  });

  //setTimeout(() => {  DATE(); }, 20);

  function waitForElement(selector, callback) {
    var interval = setInterval(function () {
      if (document.querySelector(selector)) {
        callback();
        clearInterval(interval);
      }
    }, 300);
  }
};

localDate();
sendAPI();

const timeSet = () => {
  sendAPI();

  // Wyodrębnienie daty
  const dateRegex = /^\d{4}-\d{2}-\d{2}/;
  const dateMatch = timeAPI.datetime.match(dateRegex);
  const data = dateMatch[0].split('-').reverse().join('-').replaceAll('-', '.');

  // Wyodrębnienie czasu
  const timeRegex = /\d{2}:\d{2}/;
  const timeMatch = timeAPI.datetime.match(timeRegex);
  const time = timeMatch ? timeMatch[0] : null;

  timeDOM.innerHTML = time;
  dateDOM.innerHTML = data;
};

setTimeout(() => {
  timeSet();
}, 1000);

setInterval(() => {
  timeSet();
}, 60000);
