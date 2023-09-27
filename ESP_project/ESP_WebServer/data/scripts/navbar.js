//---------------- MOBILE BACKDROP NAV -----------------\\
// close backdrop
const closeBackdrop = () => {
  $('.backdrop').css('display', 'none');
  $('.mobile-nav').removeClass('open');
};

$('.backdrop').click(() => {
  closeBackdrop();
});

$('.nav-btn').click(() => {
  closeBackdrop();
});

// open backdrop
$('.toggle-button').click(() => {
  $('.backdrop').css('display', 'block');
  $('.mobile-nav').addClass('open');
});

//---------------- DESKTOP-MOBILE NAV CHANGE -----------------\\
window.addEventListener('DOMContentLoaded', function () {
  const navElement = document.querySelector('nav');

  function handleResize() {
    if (window.innerWidth < 650) {
      navElement.classList.remove('desktop-nav');
      navElement.classList.add('mobile-nav');
    } else {
      navElement.classList.remove('mobile-nav');
      navElement.classList.add('desktop-nav');
    }
  }

  handleResize();

  window.addEventListener('resize', handleResize);
});
