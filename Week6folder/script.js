
const searchInput = document.querySelector('#search');
const resourceList = document.querySelectorAll('#resource-list li');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    const value = this.value.toLowerCase();
    resourceList.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(value) ? '' : 'none';
    });
  });
}


const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    
    if (!name || !email) {
      feedback.textContent = 'Please fill in all required fields.';
      feedback.style.color = 'red';
      return;
    }

    feedback.textContent = `Thank you, ${name}! We'll get back to you soon.`;
    feedback.style.color = 'green';
    form.reset();
  });
}
