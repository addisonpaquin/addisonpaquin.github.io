//THEME//
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

//IMAGE//

function setHeroImage() {
  const hero = document.querySelector('.hero-image');
  if (!hero) return;

  const images = [
    'img/barbie-logo.png',
    'img/community1.jpg',
    'img/community2.jpg',
    'img/neighbors.jpg'
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];
  hero.src = randomImage;
}

//SCROLL//

function restoreScrollPosition() {
  const savedScroll = localStorage.getItem('scrollY');
  if (savedScroll) window.scrollTo(0, Number(savedScroll));
}

window.addEventListener('scroll', () => {
  localStorage.setItem('scrollY', window.scrollY);
});

//SITE TRACKS//

function registerSiteVisit() {
  let count = parseInt(localStorage.getItem('visits') || '0', 10);
  count++;
  localStorage.setItem('visits', String(count));

  const welcomeDiv = document.getElementById('welcome-back');
  if (!welcomeDiv) return;

  const username = localStorage.getItem('user_name');

  if (count > 1 && username) {
    welcomeDiv.textContent = `Welcome back, ${username}!`;
    welcomeDiv.style.display = 'block';
  } else if (count > 1) {
    welcomeDiv.textContent = `Welcome back! You've visited ${count} times!`;
    welcomeDiv.style.display = 'block';
  }
}

//PROFILES//

function getProfiles() {
  try {
    return JSON.parse(localStorage.getItem('profiles') || '[]');
  } catch {
    return [];
  }
}

function saveProfiles(list) {
  localStorage.setItem('profiles', JSON.stringify(list));
}

function renderNeighbors() {
  const container = document.getElementById('neighbor-list');
  if (!container) return;

  const currentId = localStorage.getItem('currentProfileId');
  let profiles = getProfiles();

 
  profiles.sort((a, b) => {
    if (a.id === currentId) return -1;
    if (b.id === currentId) return 1;
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  container.innerHTML = '';

  profiles.forEach((profile) => {
    const isCurrentUser = profile.id && profile.id === currentId;

    const card = document.createElement('article');
    card.className = 'neighbor-card' + (isCurrentUser ? ' neighbor-card--me' : '');

    const img = document.createElement('img');
    img.className = 'avatar';
    img.src = profile.photo || 'img/default-user.png';
    img.alt = profile.name
      ? `Profile photo of ${profile.name}`
      : 'Default profile placeholder';

    const info = document.createElement('div');
    info.className = 'neighbor-info';

    const nameLine = document.createElement('h4');
    nameLine.textContent = profile.name || 'Neighbor';

    if (isCurrentUser) {
      const badge = document.createElement('span');
      badge.className = 'badge-me';
      badge.textContent = 'You';
      nameLine.appendChild(document.createTextNode(' '));
      nameLine.appendChild(badge);
    }

    const bioP = document.createElement('p');
    bioP.textContent = profile.bio || '';

    info.appendChild(nameLine);
    info.appendChild(bioP);

    card.appendChild(img);
    card.appendChild(info);

    container.appendChild(card);
  });
}

//EVENT//

const defaultEvents = [
  {
    id: 'seed-1',
    title: 'Barbie Movie Marathon',
    summary: 'Movie Night at 1719 Marine Street!',
    when: 'Saturday, 9 PM',
    where: '1719 Marine Street',
    details: 'Bring snacks and friends!',
    host: 'Addison P.',
    image: 'img/barbie-logo.png'
  }
];

function getEvents() {
  try {
    return JSON.parse(localStorage.getItem('events') || '[]');
  } catch {
    return [];
  }
}

function saveEvents(list) {
  localStorage.setItem('events', JSON.stringify(list));
}

function renderEventsList() {
  const grid = document.querySelector('.events-grid');
  if (!grid) return;

  const storedEvents = getEvents();
  const allEvents = [...defaultEvents, ...storedEvents];

  grid.innerHTML = '';

  allEvents.forEach((ev) => {
    const article = document.createElement('article');
    article.className = 'card event-card';

    const media = document.createElement('div');
    media.className = 'event-media';

    const img = document.createElement('img');
    img.className = 'event-thumb';
    img.src = ev.image || 'img/default-event.png';
    img.alt = ev.title ? `${ev.title} event artwork` : 'Neighborhood event artwork';
    media.appendChild(img);

    const body = document.createElement('div');
    body.className = 'event-body';

    const header = document.createElement('div');
    header.className = 'card-header';

    const h3 = document.createElement('h3');
    h3.textContent = ev.title || 'Neighborhood Event';

    const btn = document.createElement('button');
    btn.className = 'expand-btn';
    btn.textContent = '+';
    btn.setAttribute('aria-expanded', 'false');

    header.appendChild(h3);
    header.appendChild(btn);

    const content = document.createElement('div');
    content.className = 'card-content';

    const summary = document.createElement('p');
    summary.className = 'summary';
    summary.textContent = ev.summary || ev.description || '';

    const details = document.createElement('div');
    details.className = 'details hidden';
    details.innerHTML = `
      <p><strong>When:</strong> ${ev.when || 'Date/time to be announced'}</p>
      <p><strong>Where:</strong> ${ev.where || 'Location to be announced'}</p>
      ${
        ev.details || ev.description
          ? `<p><strong>Details:</strong> ${ev.details || ev.description}</p>`
          : ''
      }
      ${ev.host ? `<p><strong>Host:</strong> ${ev.host}</p>` : ''}
    `;

    content.appendChild(summary);
    content.appendChild(details);

    body.appendChild(header);
    body.appendChild(content);

    article.appendChild(media);
    article.appendChild(body);

    grid.appendChild(article);
  });

  enableEventExpansion();
}



function enableEventExpansion() {
  const expandButtons = document.querySelectorAll('.expand-btn');

  expandButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      if (!card) return;
      const details = card.querySelector('.details');
      if (!details) return;

      const nowHidden = details.classList.toggle('hidden');
      btn.textContent = nowHidden ? '+' : '–';
      btn.setAttribute('aria-expanded', String(!nowHidden));
    });
  });
}

//CLEAR DATA//

function clearAllData() {
  const ok = confirm(
    'Are you sure? This will erase your own profile, preferences, and visit data — but NOT other neighbors.'
  );
  if (!ok) return;

  const currentId = localStorage.getItem('currentProfileId');
  if (currentId) {
    const allProfiles = getProfiles();
    const filtered = allProfiles.filter((p) => p.id !== currentId);
    saveProfiles(filtered);
  }

  const keysToRemove = [
    'currentProfileId',
    'user_name',
    'user_bio',
    'user_photo',
    'theme',
    'visits',
    'scrollY'
  ];
  keysToRemove.forEach((k) => localStorage.removeItem(k));

  alert('Your personal data has been erased.');

  applySavedTheme();
  renderNeighbors();
  renderEventsList();
  window.scrollTo(0, 0);
}



window.onload = () => {
  applySavedTheme();
  restoreScrollPosition();
  registerSiteVisit();
  setHeroImage();
  renderNeighbors();
  renderEventsList();

  const modeToggle = document.getElementById('modeToggle');
  if (modeToggle) modeToggle.addEventListener('click', toggleTheme);

  const clearDataBtn = document.getElementById('clearDataBtn');
  if (clearDataBtn) clearDataBtn.addEventListener('click', clearAllData);
};

//FORM//

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const value = emailInput ? emailInput.value.trim() : '';
    const successDiv = newsletterForm.querySelector('.success-animation');

    if (!value || !value.includes('@')) {
      if (successDiv) {
        successDiv.textContent = 'Please enter a valid email.';
        successDiv.style.display = 'block';
        successDiv.style.color = 'red';
      }
      return;
    }

    if (successDiv) {
      successDiv.textContent = '🎉 Subscribed successfully!';
      successDiv.style.display = 'block';
      successDiv.style.color = 'green';
    }

    newsletterForm.reset();
  });
}
//PROFILE//

const profileForm = document.getElementById('profile-form');
if (profileForm) {
 
  const storedName = localStorage.getItem('user_name');
  const storedBio = localStorage.getItem('user_bio');

  const nameInput = document.getElementById('name');
  const bioInput = document.getElementById('bio');

  if (storedName && nameInput) nameInput.value = storedName;
  if (storedBio && bioInput) bioInput.value = storedBio;

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const bio = bioInput.value.trim();
    const photoInput = document.getElementById('profile-photo');
    const file = photoInput && photoInput.files ? photoInput.files[0] : null;

    const currentId = localStorage.getItem('currentProfileId');

    
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_bio', bio);

    const saveProfile = (photoDataUrl) => {
      const profiles = getProfiles();
      let updatedProfiles;
      let profileId = currentId || String(Date.now());

      const existingIndex = profiles.findIndex((p) => p.id === profileId);

      const newProfile = {
        id: profileId,
        name,
        bio,
        photo: photoDataUrl || null
      };

      if (existingIndex > -1) {
        profiles[existingIndex] = newProfile;
        updatedProfiles = profiles;
      } else {
        updatedProfiles = [...profiles, newProfile];
      }

      saveProfiles(updatedProfiles);
      localStorage.setItem('currentProfileId', profileId);
      if (photoDataUrl) localStorage.setItem('user_photo', photoDataUrl);

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
      // keep old photo if exists
      const existingPhoto = localStorage.getItem('user_photo');
      saveProfile(existingPhoto || null);
    }
  });
}

//EVENT FORM//

const eventForm = document.getElementById('event-form');
if (eventForm) {
  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('event-title');
    const dateInput = document.getElementById('event-date');
    const locationInput = document.getElementById('event-location');
    const descInput = document.getElementById('event-description');
    const photoInput = document.getElementById('event-photo');

    const title = titleInput ? titleInput.value.trim() : '';
    const when = dateInput ? dateInput.value : '';
    const where = locationInput ? locationInput.value.trim() : '';
    const description = descInput ? descInput.value.trim() : '';

    const hostName = localStorage.getItem('user_name') || 'Neighbor host';

    const saveEvent = (photoDataUrl) => {
      const events = getEvents();
      const newEvent = {
        id: String(Date.now()),
        title,
        summary: description || title,
        when,
        where,
        description,
        host: hostName,
        image: photoDataUrl || null
      };
      saveEvents([...events, newEvent]);

      const successDiv = document.querySelector('.success-animation');
      if (successDiv) {
        successDiv.textContent = 'Event posted successfully!';
        successDiv.style.display = 'block';
      }

      eventForm.reset();
    };

    if (photoInput && photoInput.files && photoInput.files[0]) {
      const file = photoInput.files[0];
      const reader = new FileReader();
      reader.onload = () => saveEvent(reader.result);
      reader.readAsDataURL(file);
    } else {
      saveEvent(null);
    }
  });
}

//CONTACT FORM//

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
