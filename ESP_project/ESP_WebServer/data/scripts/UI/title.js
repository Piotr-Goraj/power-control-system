export const socketTitle = (text) => {
  const titleDiv = $('<h1>').addClass('content-title').text(text);

  return titleDiv;
};

export const onBtn = (socket = 0, callback = function () {}) => {
  const buttonOn = $('<button>')
    .attr('id', `btn-on-${socket}`)
    .text('ON')
    .toggleClass('switch-choice')
    .click(function () {
      callback();
    });

  return buttonOn;
};

export const offBtn = (socket = 0, callback = function () {}) => {
  const buttonOff = $('<button>')
    .attr('id', `btn-off-${socket}`)
    .text('OFF')
    .toggleClass('switch-choice')
    .click(function () {
      callback();
    });

  return buttonOff;
};
