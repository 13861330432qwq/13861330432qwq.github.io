const emojis = ['picture/g1.png', 'picture/g2.png', 'picture/g3.png', 'picture/g4.png', 'picture/g5.png', 'picture/g6.png', 'picture/g7.png', 'picture/g8.png'];
let cards, flipped, matched, lockBoard;

function initGame() {
  cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  flipped = [];
  matched = 0;
  lockBoard = false;
  renderCards();
}

function renderCards() {
    const game = document.getElementById('game');
    game.innerHTML = '';
    cards.forEach((imgPath, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.index = index;
  
      // 卡片背面
      const back = document.createElement('div');
      back.className = 'card-face card-back';
      card.appendChild(back);
  
      // 卡片正面
      const front = document.createElement('div');
      front.className = 'card-face card-front';
      const img = document.createElement('img');
      img.src = imgPath;
      img.style.maxWidth = '90%';
      front.appendChild(img);
      card.appendChild(front);
  
      card.addEventListener('click', flipCard);
      game.appendChild(card);
    });
  }
  
function flipCard() {
    if (lockBoard || this.classList.contains('revealed') || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    flipped.push({ index: this.dataset.index, element: this });
  
    if (flipped.length === 2) checkMatch();
}


function checkMatch() {
    lockBoard = true;
    const [card1, card2] = flipped;
  
    if (cards[card1.index] === cards[card2.index]) {
      card1.element.classList.add('revealed');
      card2.element.classList.add('revealed');
      flipped = [];
      lockBoard = false;
      matched += 2;
      if (matched === cards.length) {
        setTimeout(() => alert('🎉 恭喜通关！'), 300);
      }
    } else {
      setTimeout(() => {
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
        flipped = [];
        lockBoard = false;
      }, 1000);
    }
  }
document.getElementById('restart').addEventListener('click', initGame);
initGame();