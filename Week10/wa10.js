const newQuoteButton = document.querySelector('#js-new-quote');
const tweetButton = document.querySelector('#js-tweet');
const quoteTextElement = document.querySelector('#js-quote-text');
const authorElement = document.querySelector('#js-author');
const loadingSpinner = document.querySelector('#loading');

const endpoint = 'https://zenquotes.io/api/random';

if (!newQuoteButton || !quoteTextElement) {
  console.error('Required elements for the quote generator are missing.');
} else {
  newQuoteButton.addEventListener('click', getQuote);
  tweetButton.addEventListener('click', tweetQuote);
  getQuote();
}

async function getQuote() {
  try {
    showLoading(true);
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    const quote = data[0].q;
    const author = data[0].a || 'Unknown';

    displayQuote(quote, author);
  } catch (error) {
    console.error('Failed to fetch a new quote.', error);
    alert('Unable to fetch a new quote right now. Please try again later.');
  } finally {
    showLoading(false);
  }
}

function displayQuote(quote, author) {
  quoteTextElement.textContent = `"${quote}"`;
  authorElement.textContent = `– ${author}`;
}

function tweetQuote() {
  const quote = quoteTextElement.textContent;
  const author = authorElement.textContent;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quote + ' ' + author
  )}`;
  window.open(tweetUrl, '_blank');
}

function showLoading(isLoading) {
  loadingSpinner.style.display = isLoading ? 'block' : 'none';
}


