const backdrop = document.querySelector('.backdrop');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');

backdrop.addEventListener('click', function () {
  backdrop.style.display = 'none';
  mobileNav.classList.remove('open');
});

toggleButton.addEventListener('click', function () {
  backdrop.style.display = 'block';
  mobileNav.classList.add('open');
});
