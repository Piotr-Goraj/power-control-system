import { socketTitle, onBtn, offBtn } from './UI/title.js';

// ---------------- SOCKET 1 ----------------\\
$(document).on('click', '#socket-1', () => {
  $('#socket-1').addClass('active-btn');
  $('*').not('#socket-1').removeClass('active-btn');

  const btnsSwitch = $('<div>')
    .addClass('btns-switch')
    .append(
      onBtn(1, async () => {
        alert('Socket 1 turn on.');

        try {
          const response = await fetch('/socket1-on');

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }),
      offBtn(1, async () => {
        alert('Socket 1 turn off.');

        try {
          const response = await fetch('/socket1-off');

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
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
      onBtn(2, async () => {
        alert('Socket 2 turn on.');

        try {
          const response = await fetch('/socket2-on');

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }),
      offBtn(2, async () => {
        alert('Socket 2 turn off.');

        try {
          const response = await fetch('/socket2-off');

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
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
      onBtn(3, async () => {
        alert('Socket 3 turn on.');

        try {
          const response = await fetch('/socket3-on');

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }),
      offBtn(3, async () => {
        alert('Socket 3 turn off.');

        try {
          const response = await fetch('/socket3-off');

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
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
      onBtn(4, async () => {
        alert('Socket 4 turn on.');

        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        try {
          const response = await fetch('/socket4-on', requestOptions);

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }),
      offBtn(4, async () => {
        alert('Socket 4 turn off.');

        try {
          const response = await fetch('/socket4-off');

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      })
    );
  $('.content-wrapper').html(socketTitle('Socket 4')).append(btnsSwitch);
});
