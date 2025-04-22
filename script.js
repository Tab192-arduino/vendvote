const cards = document.querySelectorAll('.card');
let currentIndex = 0;

function setupCard(card) {
  let startX = 0;
  let isDragging = false;

  const onMouseDown = (e) => {
    startX = e.clientX || e.touches[0].clientX; // For touch or mouse
    isDragging = true;
    card.style.transition = 'none';
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = (e.clientX || e.touches[0].clientX) - startX; // For touch or mouse
    card.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`;
  };

  const onMouseUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = (e.clientX || e.changedTouches[0].clientX) - startX; // For touch or mouse
    if (Math.abs(deltaX) > 100) {
      swipeCard(deltaX > 0 ? 'right' : 'left');
    } else {
      card.style.transition = 'transform 0.3s';
      card.style.transform = 'translateX(0) rotate(0)';
    }
  };

  // Mouse events
  card.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  // Touch events for mobile
  card.addEventListener('touchstart', onMouseDown);
  window.addEventListener('touchmove', onMouseMove);
  window.addEventListener('touchend', onMouseUp);
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
    cards[currentIndex].style.display = 'block';
  }
}

// Setup all cards
cards.forEach((card, index) => {
  card.style.display = index === 0 ? 'block' : 'none';
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
