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
