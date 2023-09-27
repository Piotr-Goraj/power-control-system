//---------------- NAV OPTIONS -----------------\\
function loadContent(section) {
  $('#main-content').load(section);
}

$(document).ready(function () {
  $('#main-btn').click(function () {
    loadContent('contents/home-content.html');
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
