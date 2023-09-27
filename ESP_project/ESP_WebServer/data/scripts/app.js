import { time, randomQuote } from './HomePage.js';

//---------------- NAV OPTIONS -----------------\\
function loadContent(section) {
  $('#main-content').load(section);
}

const clockReload = () => {
  $('.time__hour').text(time().time);
};

const quoteShow = () => {
  setTimeout(() => {
    $('.content-wrapper__quote').text(`${randomQuote.text}`);
    $('.content-wrapper__author').text(`Author: ${randomQuote.author}`);
  }, 20);
};

$(document).ready(function () {
  quoteShow();
  setInterval(() => {
    clockReload();
  }, 1000);
  $('.time__date').text(time().date);

  $('#main-btn').click(function () {
    loadContent('contents/home-content.html');
    $('.mobile-logo').css('display', 'flex');
    quoteShow();
  });

  $('#power-btn').click(function () {
    loadContent('contents/power-content.html');
    $('.mobile-logo').css('display', 'none');
  });

  $('#cooling-btn').click(function () {
    loadContent('contents/cooling-content.html');
    $('.mobile-logo').css('display', 'none');
  });

  $('#analysys-btn').click(function () {
    loadContent('contents/analysys-content.html');
    $('.mobile-logo').css('display', 'none');
  });

  $('#settings-btn').click(function () {
    loadContent('contents/settings-content.html');
    $('.mobile-logo').css('display', 'none');
  });
});
