
const searchInput = document.querySelector('#search');
const resourceList = document.querySelectorAll('#resource-list li');
const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    const value = this.value.toLowerCase();
    resourceList.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(value) ? '' : 'none';
    });
  });
}


if (form) {
  const savedForm = JSON.parse(localStorage.getItem('contactForm')) || {};
  form.name.value = savedForm.name || '';
  form.email.value = savedForm.email || '';

  form.addEventListener('input', () => {
    const data = { name: form.name.value, email: form.email.value, timestamp: Date.now() };
    localStorage.setItem('contactForm', JSON.stringify(data));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    if (!name || !email) {
      feedback.textContent = 'Please fill in all required fields.';
      feedback.style.color = 'red';
      return;
    }

    feedback.textContent = `Thanks, ${name}! We'll get back to you soon.`;
    feedback.style.color = '#FF69B4';
    form.reset();
  });
}

