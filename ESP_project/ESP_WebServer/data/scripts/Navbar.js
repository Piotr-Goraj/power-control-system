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
      $('.header__logo').addClass('mobile-logo');
    } else {
      navElement.classList.remove('mobile-nav');
      navElement.classList.add('desktop-nav');
      $('.header__logo').removeClass('mobile-logo');
      $('.header__logo').css('display', 'flex');
    }
  }

  handleResize();

  window.addEventListener('resize', handleResize);
});
