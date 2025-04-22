const cards = document.querySelectorAll('.card');
let currentIndex = 0;

function setupCard(card) {
  let startX = 0;
  let isDragging = false;

  const onDragStart = (x) => {
    startX = x;
    isDragging = true;
    card.style.transition = 'none';
  };

  const onDragMove = (x) => {
    if (!isDragging) return;
    const deltaX = x - startX;
    card.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`;
  };

  const onDragEnd = (x) => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = x - startX;
    if (Math.abs(deltaX) > 100) {
      swipeCard(deltaX > 0 ? 'right' : 'left');
    } else {
      card.style.transition = 'transform 0.3s';
      card.style.transform = 'translateX(0) rotate(0)';
    }
  };

  // Mouse events
  card.addEventListener('mousedown', (e) => onDragStart(e.clientX));
  window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
  window.addEventListener('mouseup', (e) => onDragEnd(e.clientX));

  // Touch events
  card.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientX));
  card.addEventListener('touchmove', (e) => {
    onDragMove(e.touches[0].clientX);
    e.preventDefault();
  }, { passive: false });
  card.addEventListener('touchend', (e) => onDragEnd(e.changedTouches[0].clientX));
}

function swipeCard(direction) {
  const card = cards[currentIndex];
  if (!card) return;

  card.classList.add(direction === 'right' ? 'swipe-right' : 'swipe-left');
  setTimeout(() => {
    card.style.display = 'none';
    card.style.transform = 'translateX(0) rotate(0)';
    card.classList.remove('swipe-right', 'swipe-left');
    showNextCard();
  }, 300);
}

function showNextCard() {
  currentIndex++;
  if (currentIndex < cards.length) {
    cards[currentIndex].style.display = 'flex';
  }
}

// Initialize all cards
cards.forEach((card, index) => {
  card.style.display = index === 0 ? 'flex' : 'none';
  setupCard(card);
});

// Keyboard input
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    swipeCard('left');
  } else if (e.key === 'ArrowRight') {
    swipeCard('right');
  }
});
