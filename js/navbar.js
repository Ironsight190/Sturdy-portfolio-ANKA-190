async function loadNavbar() {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  const response = await fetch('./navbar.html');
  if (!response.ok) return;

  placeholder.innerHTML = await response.text();

  const path = window.location.pathname.split('/').pop();
  const activeLink = placeholder.querySelector(`a[href="${path}"]`);
  if (activeLink) activeLink.classList.add('active');

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  const navbar = placeholder.querySelector('.navbar');
  const updateNavbarVisibility = () => {
    if (!navbar) return;
    if (window.scrollY === 0) {
      navbar.classList.remove('hidden');
    } else {
      navbar.classList.add('hidden');
    }
  };

  updateNavbarVisibility();
  window.addEventListener('scroll', updateNavbarVisibility);
}
loadNavbar();