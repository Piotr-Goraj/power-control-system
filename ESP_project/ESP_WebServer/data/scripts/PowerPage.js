import { socketTitle, onBtn, offBtn } from './UI/title.js';

// ---------------- SOCKET 1 ----------------\\
$(document).on('click', '#socket-1', () => {
  $('#socket-1').addClass('active-btn');
  $('*').not('#socket-1').removeClass('active-btn');

  const btnsSwitch = $('<div>')
    .addClass('btns-switch')
    .append(
      onBtn(1, () => {
        alert('Socket 1 turn on.');
      }),
      offBtn(1, () => {
        alert('Socket 1 turn off.');
      })
    );
  $('.content-wrapper').html(socketTitle('Battery (Socket 1)')).append(btnsSwitch);
});

// ---------------- SOCKET 2 ----------------\\
$(document).on('click', '#socket-2', () => {
  $('#socket-2').addClass('active-btn');
  $('*').not('#socket-2').removeClass('active-btn');

  const btnsSwitch = $('<div>')
    .addClass('btns-switch')
    .append(
      onBtn(2, () => {
        alert('Socket 2 turn on.');
      }),
      offBtn(2, () => {
        alert('Socket 2 turn off.');
      })
    );
  $('.content-wrapper').html(socketTitle('Socket 2')).append(btnsSwitch);
});

// ---------------- SOCKET 3 ----------------\\
$(document).on('click', '#socket-3', () => {
  $('#socket-3').addClass('active-btn');
  $('*').not('#socket-3').removeClass('active-btn');

  const btnsSwitch = $('<div>')
    .addClass('btns-switch')
    .append(
      onBtn(3, () => {
        alert('Socket 3 turn on.');
      }),
      offBtn(3, () => {
        alert('Socket 3 turn off.');
      })
    );
  $('.content-wrapper').html(socketTitle('Socket 3')).append(btnsSwitch);
});

// ---------------- SOCKET 4 ----------------\\
$(document).on('click', '#socket-4', () => {
  $('#socket-4').addClass('active-btn');
  $('*').not('#socket-4').removeClass('active-btn');

  const btnsSwitch = $('<div>')
    .addClass('btns-switch')
    .append(
      onBtn(4, () => {
        alert('Socket 4 turn on.');
      }),
      offBtn(4, () => {
        alert('Socket 4 turn off.');
      })
    );
  $('.content-wrapper').html(socketTitle('Socket 4')).append(btnsSwitch);
});
