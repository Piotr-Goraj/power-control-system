import { randomQuote } from './HomePage.js';

//---------------- NAV OPTIONS -----------------\\
function loadContent(section) {
  $('#main-content').load(section);
}

const quoteShow = () => {
  setTimeout(() => {
    $('.content-wrapper__quote').text(`${randomQuote.text}`);
    $('.content-wrapper__author').text(`Author: ${randomQuote.author}`);
  }, 20);
};

$(document).ready(function () {
  quoteShow();

  $('#main-btn').click(function () {
    loadContent('contents/home-content.html');
    quoteShow();
  });

  $('#power-btn').click(function () {
    loadContent('contents/power-content.html');
  });

  $('#cooling-btn').click(function () {
    loadContent('contents/cooling-content.html');
  });

  $('#analysys-btn').click(function () {
    loadContent('contents/analysys-content.html');
  });

  $('#settings-btn').click(function () {
    loadContent('contents/settings-content.html');
  });
});
