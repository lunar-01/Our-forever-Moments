// Elements
const startBtn = document.getElementById('startBtn');
const landingScreen = document.getElementById('landingScreen');
const memoryGallery = document.getElementById('memoryGallery');
const audio = document.getElementById('audio');
const cards = document.querySelectorAll('.flashcard');
const finalMsg = document.getElementById('finalMessage');

let flippedCount = 0;

// Show flashcards with fade-in one by one
function fadeInCards() {
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.opacity = '1';
    }, i * 200);
  });
}

// Reset flashcards and final message (optional, if you want to allow restarting)
function resetGallery() {
  flippedCount = 0;
  finalMsg.style.display = 'none';
  cards.forEach(card => card.classList.remove('flipped'));
  cards.forEach(card => (card.style.opacity = '0'));
}

// Flip card on click
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('flipped')) return; // already flipped

    card.classList.add('flipped');
    flippedCount++;

    if (flippedCount === cards.length) {
      finalMsg.style.display = 'block';
    }
  });
});

// Function to ensure audio plays, retry if blocked
function ensureAudioPlaying() {
  if (audio.paused) {
    audio.play().catch(() => {
      setTimeout(ensureAudioPlaying, 1000); // retry every second
    });
  }
}

// Start button click handler
startBtn.addEventListener('click', () => {
  landingScreen.style.display = 'none';
  memoryGallery.style.display = 'block';

  fadeInCards();
  ensureAudioPlaying();
});