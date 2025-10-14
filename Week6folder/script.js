// === THEME SWITCHER ===
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
}

window.onload = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) document.body.className = savedTheme;

  // === CLEAR DATA BUTTON ===
  const clearDataBtn = document.getElementById('clearDataBtn');
  if (clearDataBtn) {
    clearDataBtn.addEventListener('click', () => {
      localStorage.clear();
      alert('Your data has been cleared.');
    });
  }
};

// === EXPAND EVENT DETAILS ON nav.html ===
const expandBtn = document.querySelector('.expand-btn');
if (expandBtn) {
  const details = document.querySelector('.details');
  expandBtn.addEventListener('click', () => {
    const isHidden = details.classList.toggle('hidden');
    expandBtn.textContent = isHidden ? '+' : '–';
    expandBtn.setAttribute('aria-expanded', !isHidden);
  });
}

// === NEWSLETTER FORM ===
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const successDiv = document.querySelector('.success-animation');
    successDiv.textContent = '🎉 Subscribed successfully!';
    successDiv.style.display = 'block';
    newsletterForm.reset();
  });
}

// === PROFILE FORM ===
const profileForm = document.getElementById('profile-form');
if (profileForm) {
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const successDiv = document.querySelector('.success-animation');
    successDiv.textContent = 'Profile posted successfully!';
    successDiv.style.display = 'block';
    profileForm.reset();
  });
}

// === EVENT FORM ===
const eventForm = document.getElementById('event-form');
if (eventForm) {
  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const successDiv = document.querySelector('.success-animation');
    successDiv.textContent = 'Event hosted successfully!';
    successDiv.style.display = 'block';
    eventForm.reset();
  });
}

// === RESOURCE SEARCH FILTER ===
const searchInput = document.getElementById('search');
if (searchInput) {
  const listItems = document.querySelectorAll('#resource-list li');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    listItems.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });
}

// === CONTACT FORM FEEDBACK ===
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    feedback.textContent = 'Thanks for reaching out! We’ll get back to you soon.';
    contactForm.reset();
  });
}
