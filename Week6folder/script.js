// ===========================
//  THEME HANDLING
// ===========================

function updateModeToggle(themeClass) {
  const toggle = document.getElementById('modeToggle');
  if (!toggle) return;

  const isDark = themeClass === 'mode-dark';
  toggle.textContent = isDark ? '🌙 Dark mode' : '🌞 Light mode';
  toggle.setAttribute('aria-pressed', String(isDark));
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeClass = savedTheme === 'mode-dark' ? 'mode-dark' : 'mode-light';
  document.body.classList.remove('mode-light', 'mode-dark');
  document.body.classList.add(themeClass);
  updateModeToggle(themeClass);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('mode-dark');
  const newTheme = isDark ? 'mode-light' : 'mode-dark';
  document.body.classList.remove('mode-light', 'mode-dark');
  document.body.classList.add(newTheme);
  localStorage.setItem('theme', newTheme);
  updateModeToggle(newTheme);
}

// ===========================
//  HERO IMAGE ROTATION
// ===========================

function setHeroImage() {
  const hero = document.querySelector('.hero-image');
  if (!hero) return;

  const images = [
    "img/barbie-logo.png",
    "img/default-user.png",
    "img/barbie-logo.png"
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];
  hero.src = randomImage;
}

// ===========================
// SCROLL POSITION MEMORY
// ===========================

function restoreScrollPosition() {
  const savedScroll = localStorage.getItem("scrollY");
  if (savedScroll) window.scrollTo(0, savedScroll);
}

window.addEventListener("scroll", () => {
  localStorage.setItem("scrollY", window.scrollY);
});

// ===========================
// TRACK SITE VISITS
// ===========================

function registerSiteVisit() {
  let count = parseInt(localStorage.getItem("visits") || "0");
  count++;
  localStorage.setItem("visits", count);

  const welcomeDiv = document.getElementById("welcome-back");
  if (!welcomeDiv) return;

  if (count > 1) {
    welcomeDiv.textContent = `Welcome back! You've visited ${count} times!`;
    welcomeDiv.style.display = "block";
  }
}

// ===========================
//  RENDER NEIGHBORS
// ===========================

function renderNeighbors() {
  const container = document.getElementById('neighbor-list');
  if (!container) return;

  const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
  container.innerHTML = '';

  profiles.forEach((profile) => {
    const card = document.createElement('article');
    card.className = 'neighbor-card';

    const img = document.createElement('img');
    img.className = 'avatar';
    img.src = profile.photo || 'img/default-user.png';
    img.alt = profile.name
      ? `Profile photo of ${profile.name}`
      : 'Default profile placeholder';

    const info = document.createElement('div');
    info.className = 'neighbor-info';
    info.innerHTML = `
      <h4>${profile.name || 'Neighbor'}</h4>
      <p>${profile.bio || ''}</p>
    `;

    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  });
}

// ===========================
//  EVENT EXPANSION
// ===========================

function enableEventExpansion() {
  const expandButtons = document.querySelectorAll('.expand-btn');

  expandButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const details = btn.closest('.card').querySelector('.details');
      const isHidden = details.classList.toggle('hidden');
      btn.textContent = isHidden ? '+' : '–';
      btn.setAttribute('aria-expanded', String(!isHidden));
    });
  });
}

// ===========================
// CLEAR MY DATA
// ===========================

function clearAllData() {
  const ok = confirm("Are you sure? This will erase ALL saved data.");
  if (!ok) return;

  localStorage.clear();
  alert("Your data has been erased.");

  applySavedTheme();
  renderNeighbors();
  window.scrollTo(0, 0);
}

// ===========================
// ON PAGE LOAD
// ===========================

window.onload = () => {
  applySavedTheme();
  restoreScrollPosition();
  registerSiteVisit();
  setHeroImage();
  renderNeighbors();
  enableEventExpansion();

  const modeToggle = document.getElementById('modeToggle');
  if (modeToggle) modeToggle.addEventListener('click', toggleTheme);

  const clearDataBtn = document.getElementById('clearDataBtn');
  if (clearDataBtn) clearDataBtn.addEventListener('click', clearAllData);
};

// ===========================
// NEWSLETTER FORM
// ===========================

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const successDiv = newsletterForm.querySelector('.success-animation');
    if (successDiv) {
      successDiv.textContent = '🎉 Subscribed successfully!';
      successDiv.style.display = 'block';
    }
    newsletterForm.reset();
  });
}

// ===========================
// PROFILE FORM
// ===========================

const profileForm = document.getElementById('profile-form');
if (profileForm) {
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const bioInput = document.getElementById('bio');
    const photoInput = document.getElementById('profile-photo');

    const name = nameInput.value.trim();
    const bio = bioInput.value.trim();
    const file = photoInput.files[0];

    const saveProfile = (photoDataUrl) => {
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
      profiles.push({ name, bio, photo: photoDataUrl || null });
      localStorage.setItem('profiles', JSON.stringify(profiles));

      const successDiv = document.querySelector('.success-animation');
      if (successDiv) {
        successDiv.textContent = 'Profile posted successfully!';
        successDiv.style.display = 'block';
      }
      profileForm.reset();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => saveProfile(reader.result);
      reader.readAsDataURL(file);
    } else {
      saveProfile(null);
    }
  });
}

// ===========================
// EVENT FORM
// ===========================

const eventForm = document.getElementById('event-form');
if (eventForm) {
  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const successDiv = document.querySelector('.success-animation');
    if (successDiv) {
      successDiv.textContent = 'Event posted successfully!';
      successDiv.style.display = 'block';
    }
    eventForm.reset();
  });
}

// ===========================
// CONTACT FORM FEEDBACK
// ===========================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    if (feedback) {
      feedback.textContent = 'Thanks for reaching out!';
    }
    contactForm.reset();
  });
}
