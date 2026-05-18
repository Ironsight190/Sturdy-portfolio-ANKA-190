const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = 'Message sent! I\'ll get back to you soon.';
  form.reset();

  setTimeout(() => {
    status.textContent = '';
  }, 4000);
});